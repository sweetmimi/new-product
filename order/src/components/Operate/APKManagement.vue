<template>
  <div>
    <h3>{{ $t('dataReport.tableHead.APKManagement.downloadLink') }}</h3>
    <div class="APKManagement">
      <Button
        type="primary"
        class="establish"
        @click="establish"
      >{{ $t('dataReport.tableHead.APKManagement.establish') }}</Button>
    </div>

    <Table border ref="table" :data="list" :columns="tableColums" :loading="loading">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size="18" class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <Button
          type="text"
          class="fix-table-btn"
          @click="update(props.rowInfo)"
          icon="ios-create-outline"
          size="small"
        >{{$t('operate.editBtn')}}</Button>
      </template>
    </Table>

    <Modal
      :title="modalTitle"
      width="800"
      class="changModal m-modal"
      @on-visible-change="modalVisibleChange"
      v-model="showModal"
    >
      <div class="bd">
        <div class="m-card">
          <Form :model="formInfo" ref="form" :label-width="100" :rules="rules">
            <FormItem
              :label="$t('dataReport.tableHead.APKManagement.applyNames')"
              prop="mobile"
              style="width:400px"
            >
              <Input
                type="text"
                v-model="formInfo.mobile"
                placeholder="Please enter an app name"
                autocomplete="off"
              />
            </FormItem>
            <FormItem
              :label="$t('dataReport.tableHead.APKManagement.ChannelPackage')"
              prop="name"
              style="width:400px"
            >
              <AutoComplete
                v-model="formInfo.name"
                :data="cityList"
                placeholder="Please enter a channel pack name"
                style="width:200px"
              ></AutoComplete>
            </FormItem>
            <FormItem prop="uploadList" label="Upload APK package">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                v-model="formInfo.uploadList"
                :before-upload="handleUpload"
                name="file"
                ref="upload"
              >
                <Button icon="ios-cloud-upload-outline" style="width:100px">Upload</Button>
              </Upload>
              <div v-if="file !== null">{{ file }}</div>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel">{{$t('cancelText')}}</Button>
        <Button type="success" :loading="btnLoading" @click="operate">{{$t('okText')}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { apklinkmanageGet, apklinkmanagePost } from "@/api/order";
import axios from "axios";
export default {
  data() {
    const validateUpload = (rule, value, callback) => {
      if (this.uploadList && this.uploadList.length === 0) {
        callback(new Error("Please upload the apk package"));
      } else {
        callback();
      }
    };
    return {
      cityList: [],
      loading: false,

      uploadList: [],
      file: null,
      list: [],
      formInfo: {
        mobile: "",
        name: "",
        uploadList: null
      },
      tableColums: [
        {
          key: "application_name",
          Width: 120,

          align: "center",
          title: "application name"
        },
        {
          key: "apk_url",
          minWidth: 120,
          align: "center",
          title: "apk url"
        },
        {
          title: this.$t("operate.handle"),
          key: "handle",
          align: "center",

          Width: 120,
          render: (h, params) => {
            return h(
              "div",
              this.$refs.table["$scopedSlots"].action({ rowInfo: params.row })
            );
          }
        }
      ],

      rules: {
        mobile: [
          { required: true, message: "Please enter an app name", trigger: "blur" }
        ],
        name: [{ required: true, message: "Please enter an app name", trigger: "blur" }],
        uploadList: [
          { required: true, validator: validateUpload, trigger: "change" }
        ]
      },
      showModal: false,
      modalTitle: "Create APK package",
      btnLoading: false
    };
  },
  created() {
    this._apklinkmanageGet();
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    _apklinkmanageGet() {
      apklinkmanageGet({}, res => {
        if (+res.code === 0) {
          this.list = res.data.link_arr;
          let cityList = [];
          if (
            res.data.source_arr instanceof Object &&
            !Array.isArray(res.data.source_arr)
          ) {
            for (let k in res.data.source_arr) {
              cityList.push(res.data.source_arr[k]);
            }
          } else {
            this.cityList = res.data.source_arr;
          }

          this.cityList = cityList;
        }
      });
    },

    establish() {
      this.file = null;
      this.showModal = true;
    },

    update(item) {
      let arr = item.apk_url.split("/");
     
      this.formInfo = {
        mobile: item.application_name,
        name: item.source,
        uploadList: arr[arr.length - 1]
      };
      this.file = arr[arr.length - 1];

      this.showModal = true;
    },

    handleUpload(file) {
      this.uploadList = file;
      this.file = file.name;
      return false;
    },


    operate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnLoading = true;
          var formData = new window.FormData();
          formData.append("application_name", this.formInfo.mobile);
          formData.append("source", "package/" + this.formInfo.name);
          formData.append("apk_link", this.uploadList);

          let that = this; 
          axios({
            method: "post",
            url:
              process.env.NODE_ENV === "production"
                ? "/" + "package/apklinkmanage"
                : "/test/" + "order/apklinkmanage",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData
          }).then(function(res) {
            that.btnLoading = false;

            that.showModal = false;
            that._apklinkmanageGet();
            that.$Message.success("success");
          });
        }
      });
    },

    cancel() {
      this.showModal = false;
    },

    modalVisibleChange() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.APKManagement {
  margin-bottom: 20px;
}
.establish {
  width: 80px;
  position: relative;
  left: 85%;
}
</style>
