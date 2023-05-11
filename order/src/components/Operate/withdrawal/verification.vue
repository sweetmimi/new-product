<!-- zys -->
<template>
  <div class="m-verification">
    
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
            @click="showcheckModal(props.rowInfo)"
            size="small"
            >Check</Button
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
      show-elevator
      >{{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page
    >


    <Modal v-model="showModal" :title="title">
     
        <h5>{{minTitle}}</h5>
      <div slot="footer">
        <Button @click="checkStatus(2)">Reject</Button>
        <Button
          type="success"
          :loading="btnLoading"
          @click="checkStatus(1)"
          > Pass </Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  apiRemitTask,
  apiRemitCommitconclusion,
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
      title:'',
      minTitle:'',
      rowInfo:{
        id:'',
      },
      tableDefine: [
      
        {
          title: "ID",
          align: "center",
          key: "id",
        },
        {
          title: "remittance account",
          align: "center",
          key: "source_name",
        },
        {
          title: "Accounts receivable",
          align: "center",
          key: "dest_account_name",
        },
        {
          title: "Starting time",
          align: "center",
          key: "create_time",
        },
        {
          title: "Status",
          align: "center",
          key: "desc_st",
        },
        {
          title: this.$t("operate.handle"),
          align: "center",
          key: "option",
          fixed: "right",
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
    this._getList();
  },

  computed: {},

  mounted() {},

  methods: {
 
   showcheckModal(row){
    this.rowInfo = row
    this.title=row.status==3?'Withdrawal verification':'Audit verification'
    this.minTitle=row.status==3?'Confirm the transfer?':'Is it verified?'
    this.showModal = true
   },
    checkStatus(type) {
      this.btnLoading = true
      apiRemitCommitconclusion(
        {
          opId: this.rowInfo.id,
          conclusion:type
        },
        (res) => {
          if (res.code == 0) {
            this.btnLoading = false
            this.showModal = false
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
      apiRemitTask({page:this.searchForm.page}, (res) => {
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
