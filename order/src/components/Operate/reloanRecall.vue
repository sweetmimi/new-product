<!-- zys -->
<template>
  <div class="loanRecall">
    <div class="uploadBox">
      <uploadFile
        ref="mychild"
        :name="fileName"
        :action="action"
        accept=".csv"
        v-model="versionwareList"
        @submitUploadParent="formSubmit"
        @input="delUpload"
        :autoUpload="autoUpload"
        :limit="limit"
        :visible="visible"
        :disabled="disabled"
      >
      </uploadFile>
      <div class="btn">
        <Button
          class="down"
          :disabled="!disabled"
          :loading="exportLoading"
          icon="ios-download-outline"
          type="primary"
          @click="downLoad"
          >{{ this.$t("export") }}</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import uploadFile from "@/common/vue/uploadFile";
import { ApiexportReloanrecall } from "@/api/customer";
import { export_json_to_excel } from "@/vendor/Export2Excel";
export default {
  name: "",
  components: {
    uploadFile,
  },

  data() {
    return {
      fileName: "file",
      action: "",
      exportLoading: false,
      limit: 1,
      versionwareList: [],
      autoUpload: "1",
      visible: false,
      disabled: false,
    };
  },

  async created() {
    this.action =
      process.env.NODE_ENV === "production"
        ? "/site/uploadfile"
        : "/test/site/uploadfile";
  },

  computed: {},

  mounted() {},

  methods: {
    delUpload() {},
    formSubmit(res) {
      this.refileName = res.data.file_url || "";
      this.$Message.success(res.msg || "Berhasil diunggah");
      this.submitLoading = true;
      this.disabled = true;

      this.$refs.mychild.submitUpload();
      // this.submitLoading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    downLoad() {
      this.exportLoading = true;

      ApiexportReloanrecall(
        {
          fileName: this.refileName,
        },
        (res) => {
          if (res.code == 0) {
            this.exportLoading = false;
            const tHeader = [];
            const filterVal = [];
            const exportData = res.data.body;
            res.data.header.forEach((item, index) => {
              tHeader.push(item);
              filterVal.push(item);
            });
            const data = this.formatJson(filterVal, exportData);
            export_json_to_excel({
              header: tHeader,
              data,
              filename: "Formulir Penarikan Kembali Pinjaman",
            });
            this.$Message.success("success");
          } else {
            this.exportLoading = false;
          }
        }
      );
    },
  },
};
</script>
<style lang='less' scoped>
.uploadBox {
  height: 400px;
  width: 60%;
  margin: 20px auto;

  .btn {
    width: 100%;
    height: 50px;

    .down {
      margin-top: 40px;
      float: right;
    }
  }
}
</style>
