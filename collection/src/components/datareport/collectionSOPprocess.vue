<template>
  <div class="collection-statistics">
    <div class="search-wrap">
      <Form inline :label-width="100" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('listModule.personnel.date')">
              <DatePicker
                v-model="searchForm.timeFrame"
                type="daterange"
                placeholder="Select date and time"
                style="width: 400px"
                format="yyyy-MM-dd"
                :options="timeLimitConfig"
                  
              ></DatePicker>
            </FormItem>
            <FormItem :label="$t('listModule.personnel.follower_name')">
              <Select v-model="searchForm.follower_name" style="width:400px">
                <Option :value="item" v-for="(item,index) in  Phase" :key="index">{{item}}</Option>
>
              </Select>
            </FormItem>

            <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label" :loading="loading" @click="handlePage()">Search</Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>

    <Table
      border
      class="list-table"
      v-show="showTable"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>
    <Alert v-show="!(showTable)">{{ $t('noData') }}</Alert>
    <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
  </div>
</template>

<script>
import { getcuishoustafflist, getusertaskstatuslist } from "@/api/datareport";
import { getRatlist } from "../../common/js/common.js";

export default {
  data() {
    return {
      searchForm: {
       start_time:'',
       end_time:'',
        col_company: "",
        follower_name: "",
        page: 1
      },
      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },

      Phase: {},
      personnel: [],
      tabType: "1",
      loading: false,
      showTable: false,
      total: 0,
      pageCount: 0,
      pageSize: 10,
      tableDefine1: [
        {
          title: this.$t("listModule.personnel.date"),
          align: "center",
          key: "snapshot_time",
          width: 130,
          fixed: "left"
        },
        {
          title: this.$t("listModule.personnel.follower_name"),
          align: "center",
          key: "follower_name",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.Task_number"),
          align: "center",
          key: "total",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.unexcuted_num"),
          align: "center",
          key: "unexcuted_num",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.excuted_num"),
          align: "center",
          key: "excuted_num",
          width: 130
        },

        {
          title: this.$t("listModule.personnel.call_num"),
          align: "center",
          key: "call_num",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.agree_num"),
          align: "center",
          key: "agree_num",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.repay_num"),
          align: "center",
          key: "repay_num",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.connect_num"),
          align: "center",
          key: "connect_num",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.callback_answer"),
          align: "center",
          key: "callback_answer",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.unconnect_num"),
          align: "center",
          key: "unconnect_num",
          width: 130
        },
        {
          title: this.$t("listModule.personnel.callback_unanswer"),
          align: "center",
          key: "callback_unanswer",
          width: 130
        },

        // {
        //   title: this.$t("listModule.personnel.sop_num"),
        //   align: "center",
        //   key: "sop_num",
        //   width: 130
        // }
      ],
      tableDefine2: [],
      tableData: []
    };
  },
  methods: {

    getinit() {
      getcuishoustafflist({}, res => {
        if (+res.status == 0) {
          this.Phase = res.data;
         //console.log(res, 888);
        }
      });
    },

    _getData() {
      this.loading = true;
      const mydate = new Date()
      const mon = mydate.getMonth() + 1;
      const day = mydate.getDate();
      const nowDay = mydate.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
      var beginTime;
      var endTime;
      try{
         beginTime = this.beginTime;
         endTime = this.endTime;
      }catch(err){
        beginTime = nowDay;
        endTime = nowDay;

      }
      const query = []
      query["query[start_time]"] = beginTime || nowDay;
      query["query[end_time]"] =  endTime || nowDay;
      query["query[page]"] = this.searchForm.page || "";
      query["query[follower_name]"] = this.searchForm.follower_name || "";
      
      
      getusertaskstatuslist(query, res => {
       
        if (+res.status === 0) {
          console.log(res);
          const _data = res.data;
          this.tableData = [];
          this.tableData = _data.list == "null" ? [] : _data.list;

          this.total = +_data.arrPager.count;
          this.pageCount = +_data.arrPager.count;
          this.pageSize = +_data.arrPager.pageSize;
          this.showTable = true;
        } else {
          this.showTable = false;
        }
        this.loading = false;
      });
    },
    handlePage(pageIndex) {
      this.searchForm.page = pageIndex || 1;
      this._getData();
    },
    compare(value) {
      return function(a, b) {
        var aaa = a[value];
        var bbb = b[value];
        return aaa - bbb;
      };
    },
    formatDayTime(val) {
      if (val) {
        const date = new Date(val);
        const Y = date.getFullYear();
        let M = date.getMonth() + 1;
        let D = date.getDate();
        if (M < 10) {
          M = "0" + M;
        }
        if (D < 10) {
          D = "0" + D;
        }
        return Y + "-" + M + "-" + D;
      } else {
        return "";
      }
    },
    initSearchForm() {
      this.searchForm = {
        ...this.searchForm,
        page: 1
      };
      this.loading = false;
      this.showTable = false;
      this.total = 0;
      this.pageCount = 0;
      this.pageSize = 10;
      this.tableData = [];
    }
  },
  watch: {
    tabType(newType) {
      this.initSearchForm();
    }
  },
  computed: {
    beginTime() {
      return this.formatDayTime(this.searchForm.timeFrame[0]);
    },
    endTime() {
      return this.formatDayTime(this.searchForm.timeFrame[1]);
    },
    tableDefine() {
      return this.tabType === "1" ? this.tableDefine1 : this.tableDefine2;
    }
  },
  created() {
    this.getinit();
    
    this.handlePage();
  }
};
</script>

<style lang="scss" scoped>
</style>
