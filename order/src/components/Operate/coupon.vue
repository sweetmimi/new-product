<!-- zys -->
<template>
  <div class="m-coupon">
    <div class="search-wrap">
      <Form inline :label-width="0">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem class="fix-form-btn" :label-width="0">
              <Button
                icon="arrow-swap"
                type="info"
                class="batch-change"
                @click="add"
                >{{$t('coupon.add')}}</Button
              >
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="0">
              <Button
                icon="arrow-swap"
                type="error"
                class="batch-change"
                @click="setAll('0')"
                >{{$t('coupon.setFail')}}</Button
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
        @on-selection-change="selectionChange"
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
            @click="setFailorSuccess(props.rowInfo)"
            size="small"
            >{{$t('coupon.setFail')}}</Button
          >
        </template>
      </Table>
    </div>

    <Page
      :total="+total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
      >{{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page
    >


    <Modal v-model="showModal" :title="modalTitle">
      <Form
        ref="form"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="uid" prop="user_id">
          <Input
            v-model="formValidate.user_id"
            placeholder="uid"
            style="width: 250px"
          ></Input>
        </FormItem>
        <FormItem label="ID" prop="coupon_id">
          <Select v-model="formValidate.coupon_id">
            <Option
              :key="index"
              :value="item.id"
              v-for="(item, index) in couponlist"
              >{{ item.title }}</Option
            >
          </Select>
        </FormItem>

        <FormItem label="remark" prop="remark">
          <Input
            v-model="formValidate.remark"
            :disabled="disabled"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            style="width: 300px"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{ $t("cancelText") }}</Button>
        <Button
          type="success"
          :loading="btnLoading"
          @click="operate"
          :disabled="disabled"
          >{{ $t("okText") }}</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  apiUsercouponList,
  apiUsercouponAdd,
  apiUsercouponSetstatus,
  apiCouponopOption,
} from "@/api/user";
export default {
  name: "coupon",
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
      couponlist: [],
      searchForm: {
        page: 1,
      },
      formValidate: {
        user_id: "",
        coupon_id: "",

        remark: "",
      },
      selectionIds: [],

      total: 0,
      pageCount: 0,
      pageSize: 10,
      tableData: [],
      tableDefine: [
        {
          type: "selection",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          fixed: "left",
        },
        {
          title: this.$t('coupon.index'),
          align: "center",
          type: "index",
          minWidth: 60,
        },
        {
          title: "UID",
          align: "center",
          key: "user_id",
          minWidth: 60,
        },
        {
          title: this.$t('coupon.Voucherid'),
          align: "center",
          key: "coupon_id",
          minWidth: 60,
        },
        {
          title: this.$t('coupon.valid_start_time'),
          align: "center",
          key: "valid_start_time",
          minWidth: 150,
        },
        {
          title: this.$t('coupon.valid_end_time'),
          align: "center",
          key: "valid_end_time",
          minWidth: 150,
        },
        {
          title: this.$t('coupon.status'),
          align: "center",
          key: "status",
          minWidth: 100,
          render: (h, params) => {
            return h("div", params.row.status == 0 ? "to be used" : "Used");
          },
        },

        {
          title: this.$t('coupon.create_user_name'),
          align: "center",
          key: "create_user_name",
          minWidth: 100,
        },
        {
          title: this.$t('coupon.remark'),
          align: "center",
          key: "remark",
          minWidth: 150,
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
        user_id: [
          {
            required: true,
            message: "user_id",
            trigger: "blur",
          },
        ],
        coupon_id: [
          {
            required: true,
            message: "coupon_id",
            trigger: "change",
          },
        ],
      },
    };
  },

  async created() {
    this.getCouponopOption();
    this._getList();
  },

  computed: {},

  mounted() {},

  methods: {
    setAll(type) {
      var title = "";
      if (type == 1) {
        title = this.$t('coupon.setFail');
      } else {
        title = this.$t('coupon.setSucces');
      }
      if (this.selectionIds.length > 0) {
        this.$Modal.confirm({
          title: `ok ${title}?`,

          onOk: () => {
            apiUsercouponSetstatus(
              {
                id: this.selectionIds,
              },
              (res) => {
                if (res.code == 0) {
                  this.$Message.success(res.msg);
                  this._getList();
                }
              }
            );
          },
          onCancel: () => {
            this.$Message.info("Clicked cancel");
          },
        });
      } else {
        this.$Message.warning("choose");
        return;
      }
    },

    selectionChange(selection) {
      this.selectionIds = [];
      selection.forEach((item) => {
        this.selectionIds.push(item.id);
      });
      console.log(this.selectionIds);
    },
    getCouponopOption() {
      apiCouponopOption({}, (res) => {
        this.couponlist = res.data.list;
        // this.couponlist = [
        //   {
        //     key: "1",

        //   },
        // ];
      });
    },
    setFailorSuccess(row) {
      var ids = row.id.split(",");
      apiUsercouponSetstatus(
        {
          id: ids,
        },
        (res) => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this._getList();
          }
        }
      );
    },
    handlePage(pageIndex) {
      this.searchForm.page = pageIndex || 1;
      this._getList();
    },
    _getList() {
      this.loading = true;
      this.tableData = [];
      apiUsercouponList({page:this.searchForm.page}, (res) => {
        this.loading = false;
        if (+res.code === 0) {
          const data = res.data;
          this.tableData = data.list || [];
          this.total = Number(data.arrPager.count);
          this.pageCount = +Number(data.arrPager.count);
          this.pageSize = +data.arrPager.pageSize;
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      });
    },

    add() {
      this.modalTitle = "add";
      this.showModal = true;

      this.formValidate = {};
    },
    operate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          apiUsercouponAdd(this.formValidate, (res) => {
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
