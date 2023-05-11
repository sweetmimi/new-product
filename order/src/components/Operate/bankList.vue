<!-- zys -->
<template>
  <div class="m-bankList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem label="Jalur Pembayaran">
              <Input
                type="text"
                v-model="searchForm.bankCode"
                :placeholder="$t('inputPrefix')"
              />
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="handlePage()"
                >{{ $t("search") }}</Button
              >
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                icon="arrow-swap"
                type="success"
                class="batch-change"
                @click="add"
                >Tambah</Button
              >
            </FormItem>
          </div>
        </div>
      </Form>
    </div>
    <div class="table-wrap">
      <Table
        ref="table"
        border
        class="list-table"
        :data="tableData"
        :columns="tableDefine"
        :loading="loading"
      >
        <Spin slot="loading" fix class="m-loading">
          <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
          <div>Loading</div>
        </Spin>
        <!-- table loading -->
        <template slot="action" slot-scope="props">
          <Button
            type="text"
            class="fix-table-btn"
            @click="edit(props.rowInfo)"
            icon="ios-create-outline"
            size="small"
            >{{ $t("operate.editBtn") }}</Button
          >
        </template>
      </Table>
    </div>

    <!-- <Page :total="+total" :page-size="pageSize" :current.sync="searchForm.page" class-name="m-pagination"
            @on-change="handlePage" show-total v-if="pageCount > pageSize" show-elevator>{{$t('pageSlot.total')}}
            {{total}} {{$t('pageSlot.count')}}</Page> -->


    <Modal v-model="showModal" :title="modalTitle">
      <Form
        ref="form"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="Jalur Pembayaran" prop="bankCode">
          <Input
            v-model="formValidate.bankCode"
            :disabled="disabled"
           
            style="width: 250px"
          ></Input>
        </FormItem>
        <FormItem label="Jenis" prop="type">
          <RadioGroup v-model="formValidate.type">
            <Radio label="1" :disabled="disabled">Bank</Radio>
            <Radio label="2" :disabled="disabled">Gerai</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Status" prop="shelfStatus">
          <RadioGroup v-model="formValidate.shelfStatus">
            <Radio label="1">ON</Radio>
            <Radio label="2">OFF</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Maintenance" prop="mainStatus">
          <RadioGroup v-model="formValidate.mainStatus">
            <Radio label="1">Normal</Radio>
            <Radio label="2">Maintenance</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{ $t("cancelText") }}</Button>
        <Button type="success" :loading="btnLoading" @click="operate">{{
          $t("okText")
        }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  apiPayconfigBanklist,
  apiPayconfigCreatebank,
  apiPayconfigUpdatebank,
} from "@/api/user";

export default {
  name: "bankList",
  components: {},

  data() {
    return {
      disabled: false,
      showModal: false,
      loading: false,
      searchLoading: false,
      btnLoading: false,
      modalTitle: "",
      id: "",

      searchForm: {
        bankCode: "",
      },
      formValidate: {
        bankCode: "",
        type: "",
        shelfStatus: "",
        mainStatus: "",
      },
      total: 0,
      pageCount: 0,
      pageSize: 10,
      tableData: [],
      tableDefine: [
        {
          title: "Nomor",
          align: "center",
          key: "id",
          minWidth: 100,
        },
        {
          title: "Jenis",
          align: "center",
          key: "type",
          minWidth: 100,
          render: (h, params) => {
            return h("div", params.row.type == 1 ? "bank" : "store");
          },
        },
        {
          title: "Jalur Pembayaran",
          align: "center",
          key: "bank_code",
          minWidth: 100,
        },
        {
          title: "Logo",
          align: "center",
          key: "icon_url",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h("img", {
                style: {
                  width: "60px",
                  verticalAlign: "middle",
                },
                attrs: {
                  src: params.row.icon_url,
                },
              }),
            ]);
          },
        },
        {
          title: "Status",
          align: "center",
          key: "is_on_shelf",
          minWidth: 100,
          render: (h, params) => {
            return h("div", params.row.is_on_shelf == 1 ? "normal" : "has been removed");
          },
        },
        {
          title: "Maintenance ",
          align: "center",
          key: "is_in_maintenance",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              params.row.is_in_maintenance == 1 ? "normal" : "In maintenance"
            );
          },
        },
        {
          title: "Waktu Tambah",
          align: "center",
          key: "create_time",
          minWidth: 150,
          render: (h, params) => {
            return h("div", this.getLocalTime(params.row.create_time));
          },
        },
        {
          title: "Update Terakhir",
          align: "center",
          key: "update_time",
          minWidth: 150,
          render: (h, params) => {
            return h("div", this.getLocalTime(params.row.update_time));
          },
        },
        {
          title: this.$t("operate.handle"),
          align: "center",
          key: "option",
          fixed: "right",
          minWidth: 120,
          render: (h, params) => {
            return h(
              "div",
              this.$refs.table["$scopedSlots"].action({
                rowInfo: params.row,
              })
            );
          },
        },
      ],
      ruleValidate: {
        type: [
          {
            required: true,
            message: "choose",
            trigger: "change",
          },
        ],
        bankCode: [
          {
            required: true,
            message: "choose",
            trigger: "blur",
          },
        ],
        shelfStatus: [
          {
            required: true,
            message: "choose",
            trigger: "change",
          },
        ],
        mainStatus: [
          {
            required: true,
            message: "choose",
            trigger: "change",
          },
        ],
      },
    };
  },

  async created() {
    this._getList();
  },

  computed: {},

  mounted() {},

  methods: {
    getLocalTime(timestamp) {
      var date = new Date(timestamp * 1000); 
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() + 1 < 10
          ? "0" + (date.getDate() + 1)
          : date.getDate() + 1) + "-";
      var h =
        (date.getHours() + 1 < 10
          ? "0" + (date.getHours() + 1)
          : date.getHours() + 1) + ":";
      var m =
        (date.getMinutes() + 1 < 10
          ? "0" + (date.getMinutes() + 1)
          : date.getMinutes() + 1) + ":";
      var s =
        date.getSeconds() + 1 < 10
          ? "0" + (date.getSeconds() + 1)
          : date.getSeconds() + 1;
      return Y + M + D + h + m + s;
    },

    handlePage(pageIndex) {
      this.searchForm.page = pageIndex || 1;
      this._getList();
    },
    _getList() {
      this.loading = true;
      this.tableData = [];
      apiPayconfigBanklist(this.searchForm, (res) => {
        this.loading = false;
        if (+res.code === 0) {
          const data = res.data;
          this.tableData = data || [];
          //   this.total = Number(data.arrPager.count);
          //   this.pageCount = +Number(data.arrPager.count);
          //   this.pageSize = +data.arrPager.pageSize;
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      });
    },

    edit(row) {
      this.subType = "edit";
      this.modalTitle = "Ubah";
      this.showModal = true;
      this.disabled = true;
      this.formValidate.type = row.type;
      this.formValidate.bankCode = row.bank_code;
      this.formValidate.shelfStatus = row.is_on_shelf;
      this.formValidate.mainStatus = row.is_in_maintenance;
      this.formValidate.id = row.id;
    },
    add() {
      this.subType = "add";
      this.modalTitle = "Tambah";
      this.showModal = true;
      this.disabled = false;
      this.formValidate.type = "";
      this.formValidate.bankCode = "";
      this.formValidate.shelfStatus = "";
      this.formValidate.mainStatus = "";
      this.formValidate.id = "";
    },
    operate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          let data = {};
          var API = "";
          if (this.subType == "add") {
            API = apiPayconfigCreatebank;
            data = {
              type: this.formValidate.type,
              bankCode: this.formValidate.bankCode,
              shelfStatus: this.formValidate.shelfStatus,
              mainStatus: this.formValidate.mainStatus,
            };
          } else {
            API = apiPayconfigUpdatebank;
            data = {
              id: this.formValidate.id,
              shelfStatus: this.formValidate.shelfStatus,
              mainStatus: this.formValidate.mainStatus,
            };
          }
          API(data, (res) => {
            this.btnLoading = false;
            if (res.code == 0) {
              this.showModal = false;
              this._getList();
              this.$Message.success(res.msg);
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },
    cancel() {
      this.showModal = false;
    },
  },
};
</script>
<style lang='scss' scoped>
.appPush {
  .table-wrap {
    border-radius: 4px;
    text-align: right;

    .batch-change {
      margin-bottom: 15px;
    }
  }
}
</style>
