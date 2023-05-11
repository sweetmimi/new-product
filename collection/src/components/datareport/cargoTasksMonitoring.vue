<template>
  <div class="collection-statistics">
    <div class="search-wrap">
      <Form inline :label-width="100" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('timeHorizon')">
              <!-- <DatePicker
                v-model="searchForm.timeFrame"
                type="date"
                placeholder="Select date and time"
                style="width: 400px"
                format="yyyy-MM-dd"
                :options="timeLimitConfig"
              ></DatePicker>-->
              <DatePicker
                type="date"
                placeholder="Select date"
                format="yyyy-MM-dd"
                v-model="searchForm.search_time"
                :options="timeLimitConfig"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem :label="$t('listModule.personnel.commodityPhase')">
              <Select v-model="searchForm.stage" style="width:200px">
                <Option
                  :value="item.index"
                  v-for="(item,index)  in $t('approvalDetail.result.TaskStages')"
                  :key="index"
                >{{item.value}}</Option>
>
              </Select>
            </FormItem>
            <FormItem :label="$t('listModule.personnel.commodityPersonnel')">
              <Select  v-model="searchForm.follower_name" style="width:200px">
                <Option :value="item" v-for="(item,index) in  personnel" :key="index">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label"  @click="handlePage()">Search</Button>
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
      :columns="tableDefine1"
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
import {
  getallfollowertaskstatuslist,
  getdaihoustafflist
} from "@/api/datareport";
import { getRatlist } from "../../common/js/common.js";

export default {
  data() {
    return {
      searchForm: {
        search_time: "",
        stage: 0,
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
          key: "report_date",
          fixed: "left"
        },
        {
          title: this.$t("listModule.personnel.compellation"),
          align: "center",
          key: "follower_name"
        },
        {
          title: this.$t("listModule.personnel.Task_number"),
          align: "center",
          key: "task_num"
        },
        {
          title: this.$t("listModule.personnel.unexecuted"),
          align: "center",
          key: "noexecuted_num"
        },
        {
          title: this.$t("listModule.personnel.implemented"),
          align: "center",
          key: "executed_num"
        },
        {
          title: this.$t("listModule.personnel.promiseRefund"),
          align: "center",
          key: "agree_num"
        },
        {
          title: this.$t("listModule.personnel.beenPayment"),
          align: "center",
          key: "repay_num"
        }
      ],
      tableData: []
    };
  },
  methods: {

    getinit() {
      getdaihoustafflist({}, res => {
        if (+res.status == 0) {
          let tableData = []

          tableData =res.data
           tableData.splice(0, 0, this.$t('all'));
          this.personnel = tableData;
        }
      });
    },

    _getData() {
      this.loading = true
      let  query = {
        search_time :this.formatDayTime(this.searchForm.search_time),
        follower_name: this.searchForm.follower_name ,
        stage:this.searchForm.stage,
        page:this.searchForm.page
      }


      getallfollowertaskstatuslist({ query: query }, res => {
         this.loading = false
        if (+res.status === 0) {
          const _data = res.data;
          this.tableData =
            _data.FollowerTaskList === null ? [] : _data.FollowerTaskList;

          this.total = +_data.arrPager.count;
          this.pageCount = +_data.arrPager.count;
          this.pageSize = +_data.arrPager.pageSize;

          this.showTable = true;
        } else {
          this.showTable = false;
        }
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
    }
  },
  computed: {
    search_time() {
      return this.formatDayTime(this.searchForm.search_time);
    }
  },
  created() {
    this.getinit();
    this._getData()
  }
};
</script>

<style lang="scss" scoped>
</style>
