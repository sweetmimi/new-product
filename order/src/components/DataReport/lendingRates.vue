<template>
  <div class="m-profit-data">
    <div class="search-wrap">
      <Form inline :label-width="120" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.search.ClosingTime')">
              <DatePicker
                v-model="searchForm.timeFrame"
                :options="timeLimitConfig"
                type="daterange"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
            <FormItem :label="$t('channel')">
              <Select v-model="searchForm.channel" >
                <Option v-for="(item, index) in channelSources" :key="index" :value="index" @click.native="chioce(item)">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.loanTerm')">
              <Select v-model="searchForm.loanTerm">
                <Option
                  v-for="(item, key) in loanTerms"
                  :key="key"
                  :value="key"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>

            <!-- <FormItem
              :label="`${$t('loan.search.productType')}`"
            
            >
              <Select
                clearable
                transfer
                v-if="selectItems.product_type"
                v-model="searchForm.product_type"
                :placeholder="`${$t('inputPrefix')}${$t(
                  'loan.search.productType'
                )}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.product_type"
                >
                  {{ option.value }}
                </Option>
              </Select>
            </FormItem> -->

            <FormItem :label="$t('dataReport.search.settleNum')">
              <Select v-model="searchForm.settleNum">
                <Option
                  v-for="item in $t('dataReport.search.settleNums')"
                  :key="item.key"
                  :value="item.key"
                  >{{ item.value }}</Option
                >
              </Select>
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
          </div>
        </div>
      </Form>
    </div>

    <Table
      border
     
      class="list-table"
      :data="tableData"
      :columns="tableDefine1"
     
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>
   
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

import { lendingRates, } from "@/api/customer";
import { getchannel } from "@/api/dataReport";
import { export_json_to_excel } from "@/vendor/Export2Excel";

@Component
export default class DailyData extends Vue {
  @Getter("selectItems") selectItems: any;
  @Action("getSelectList") getSelectList: any;
  searchForm = {
    timeFrame: [],
    // channel: 0,
    loanTerm: "0",
    settleNum: "0",
    product_type: "",
    page: 1,
    source: "",
  };
  channel = [];
  get channelSources() {
    return this.channel || [];
  }

  get loanTerms() {
    // console.log(this.selectItems.application_term_list)
    return this.selectItems.application_term_list || [];
  }
  chioce(item: any) {
    this.searchForm.source = item == "all" ? "" : item;
  }
  loading = false;
  showTable = false;
  searchLoading = false;
  exportLoading = false;
  total = 0;
  pageCount = 0;
  pageSize = 10;
  tableData = [];
  tableDefine1 = [
    {
      title: this.$t("dataReport.tableHead.payoff_time"),
      align: "center",
      width:'140',
      key: "payoff_time",
      fixed: "left",
    },
    {
      title: this.$t("dataReport.tableHead.one_payoff_num"),
      align: "center",
      width:'140',
      key: "one_payoff_num",
    },
    {
      title: this.$t("dataReport.tableHead.can_reloan_num"),
      align: "center",
      width:'140',
      key: "can_reloan_num",
    },
    {
      title: this.$t("dataReport.tableHead.one_reloan_rate"),
      align: "center",
      width:'140',
      key: "one_reloan_rate",
      renderHeader: (h, params) => {
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                wordWrap:true,
                placement: "top",
                transfer: false,
              
              },


            },
            [
              h("span", params.column.title),
              h("Icon", {
                props: {
                  type: "ios-help-circle",
                  size: "18",
                },
              }),
            ]
          ),
        ]);
      },
    },
    {
      title: this.$t("dataReport.tableHead.three_reloan_rate"),
      align: "center",
      key: "three_reloan_rate",
      width:'140',
      renderHeader: (h, params) => {
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                placement: "top",
                transfer: false,
                
              },
            },
            [
              h("span", params.column.title),
              h("Icon", {
                props: {
                  type: "ios-help-circle",
                  size: "18",
                },
              }),
            ]
          ),
        ]);
      },
    },
    {
      title: this.$t("dataReport.tableHead.sev_reloan_rate"),
      align: "center",
      key: "sev_reloan_rate",
      width:'140',
      renderHeader: (h, params) => {
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                placement: "top",
                transfer: false,
               
              },
            },
            [
              h("span", params.column.title),
              h("Icon", {
                props: {
                  type: "ios-help-circle",
                  size: "18",
                },
              }),
            ]
          ),
        ]);
      },
    },
    {
      title: this.$t("dataReport.tableHead.all_reloan_rate"),
      align: "center",
      key: "all_reloan_rate",
      width:'140',
      renderHeader: (h, params) => {
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                placement: "top",
                transfer: false,
               
              },
            },
            [
              h("span", params.column.title),
              h("Icon", {
                props: {
                  type: "ios-help-circle",
                  size: "18",
                },
              }),
            ]
          ),
        ]);
      },
    },
    {
      title: this.$t("dataReport.tableHead.one_reloan_succ_rate"),
      align: "center",
      key: "one_reloan_succ_rate",
      width:'140',
      renderHeader: (h, params) => {
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                placement: "top",
                transfer: false,
               
              },
            },
            [
              h("span", params.column.title),
              h("Icon", {
                props: {
                  type: "ios-help-circle",
                  size: "18",
                },
              }),
            ]
          ),
        ]);
      },
    },
    {
      title: this.$t("dataReport.tableHead.three_reloan_succ_rate"),
      align: "center",
      key: "three_reloan_succ_rate",
      width:'140',
      renderHeader: (h, params) => {
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                placement: "top",
                transfer: false,
               
              },
            },
            [
              h("span", params.column.title),
              h("Icon", {
                props: {
                  type: "ios-help-circle",
                  size: "18",
                },
              }),
            ]
          ),
        ]);
      },
    },
    {
      title: this.$t("dataReport.tableHead.sev_reloan_succ_rate"),
      align: "center",
      key: "sev_reloan_succ_rate",
      width:'140',
      renderHeader: (h, params) => {
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                placement: "top",
                transfer: false,
                
              },
            },
            [
              h("span", params.column.title),
              h("Icon", {
                props: {
                  type: "ios-help-circle",
                  size: "18",
                },
              }),
            ]
          ),
        ]);
      },
    },
    {
      title: this.$t("dataReport.tableHead.all_reloan_succ_rate"),
      align: "center",
      key: "all_reloan_succ_rate",
      width:'140',
      renderHeader: (h, params) => {
        return h("div", [
          h(
            "Tooltip",
            {
              props: {
                placement: "top",
                transfer: false,
                
              },
            },
            [
              h("span", params.column.title),
              h("Icon", {
                props: {
                  type: "ios-help-circle",
                  size: "18",
                },
              }),
            ]
          ),
        ]);
      },
    },
  ];
  tableDefine2 = [];
  tableColumns: Array<any> = [];
  formatDayTime(val: any): string {
    if (val) {
      const date: any = new Date(val);
      const Y: any = date.getFullYear();
      let M: any = date.getMonth() + 1;
      let D: any = date.getDate();
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

  get beginTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[0]);
  }
  get endTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[1]);
  }
  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now();
    },
  };
  _getDailyData() {
    const data = {
      mid:localStorage.getItem("mid"),
      beginTime: this.beginTime,
      endTime: this.endTime,
      product_type: this.searchForm.product_type,
      // channel: this.searchForm.channel,
      source: this.searchForm.source,
      loanTerm: this.searchForm.loanTerm,
      settleNum: this.searchForm.settleNum,

      page: this.searchForm.page,
    };

    this.loading = true;
    lendingRates(data, (res: any) => {
      this.loading = false;
      if (+res.code === 0) {
        const data = res.data;
        this.tableData = res.data.list;
        this.total = data.arrPager.count;
        this.pageCount = +data.arrPager.count;
        this.pageSize = +data.arrPager.pageSize;
        this.showTable = true;
      } else {
        this.$Message.error(res.msg);
        this.showTable = false;
      }
    });
  }

  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1;
    this._getDailyData();
  }
  export_table() {
    this.exportLoading = true;
    const data = {
      beginTime: this.beginTime,
      endTime: this.endTime,
      export: 1,
    };

  }
  created() {
    getchannel({}, (res: any) => {
      let tableData = [];
      if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
        for (let k in res.data.data) {
          tableData.push(res.data.data[k]);
        }
      } else {
        tableData = res.data.data;
      }
    tableData.splice(0, 0,this.$t("dataReport.search.complete"),);
      this.channel = tableData;
      //console.log(tableData,444)
    });
    this._getDailyData();
    if (!Object.keys(this.selectItems).length) {
      this.getSelectList();
    }
  }
}
</script>
<style >
.ivu-tooltip-inner{
  white-space:inherit
}
</style>
