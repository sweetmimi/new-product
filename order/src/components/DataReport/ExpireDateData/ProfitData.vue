<template>
  <div class="m-profit-data">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.search.expireDate')">
              <DatePicker
                :options="timeLimitConfig"
                v-model="searchForm.timeFrame"
                type="daterange"
                :placeholder="$t('selectPrefix')+$t('dataReport.search.date')"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
            <FormItem :label="$t('dataReport.search.loanTerm')">
              <Select v-model="searchForm.loanPeriod">
                <Option
                  v-for="(item, key) in $t('dataReport.search.loanTerms')"
                  :key="key"
                  :value="item.key"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.loanType')">
              <Select v-model="searchForm.loanType">
                <Option
                  v-for="(item, index) in $t('dataReport.search.loanTypes')"
                  :key="index"
                  :value="index"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.channelSou')">
              <Select v-model="searchForm.channelSources">
                <Option
                  v-for="(item, index) in channelSources"
                  :key="index"
                  :value="index"
                  @click.native="chioce(item)"
                >{{item}}</Option>
              </Select>
            </FormItem>

            <FormItem :label="$t('dataReport.search.Maturity')">
              <Select v-model="searchForm.Maturitys">
                <Option
                  v-for="(item, index) in $t('dataReport.search.Maturitys')"
                  :key="index"
                  :value="item.key"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="handlePage()"
              >{{$t('search')}}</Button>
            </FormItem>

            <Button
              type="success"
              slot="label"
              icon="ios-download-outline"
              @click="excelHandlePage()"
            >{{$t('dataReport.tableHead.profitData')}}</Button>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getExpireDateDataProfitData,
  getchannel,
  Duetodiameterexcel
} from "@/api/dataReport";
import { Getter, Action } from "vuex-class";
import { export_json_to_excel } from "@/vendor/Export2Excel";
@Component
export default class ProfitData extends Vue {
  @Getter("selectItems") selectItems: any;
  @Action("getSelectList") getSelectList: any;
  get channelSources() {
    return this.channel || [];
  }
  get loanTerms() {
    return this.selectItems.application_term_list || [];
  }
  get loanTypes() {
    return this.selectItems.loan_type_list || [];
  }
  channel = [];
  searchForm = {
    timeFrame: [],
    loanPeriod: "0",
    loanType: 0,
    channelSources: 0,
    page: 1,
    Maturitys: "0"
  };
  item = "";
  loading = false;
  showTable = false;
  searchLoading = false;
  total = 0;
  pageCount = 0;
  pageSize = 10;
  tableData = [];
  tableDefine = [
    {
      title: this.$t("dataReport.tableHead.expireDate"),
      align: "center",
      key: "day",
      width: 130,
      fixed: "left"
    },
    {
      title: this.$t("dataReport.tableHead.contractAmount"),
      align: "center",
      key: "loanAmount",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.actualLoanAmount"),
      align: "center",
      key: "loanActualAmount",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.preInterestAmount"),
      align: "center",
      key: "preMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.preInterestRate"),
      align: "center",
      key: "preMoneyRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.postInterestAmount"),
      align: "center",
      key: "rolloverProfitMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.postInterestRate"),
      align: "center",
      key: "rolloverPreMoneyRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.rolloverLoanAmount"),
      align: "center",
      key: "rolloverLoanAmount",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.rolloverLoanAmountRate"),
      align: "center",
      key: "rolloverLoanAmountRate",
      width: 130
    },

    {
      title: this.$t("dataReport.tableHead.currentPaidInContractAmount"),
      align: "center",
      key: "inCurrentLoanAmount",
      width: 130
    },
    {
      title: this.$t(
        "dataReport.tableHead.currentPaymentRateOfPaymentContracts"
      ),
      align: "center",
      key: "inCurrentLoanAmountRate",
      width: 130
    },
    // {
    //   title: this.$t("dataReport.tableHead.currentPostpaidInterestCharges"),
    //   align: "center",
    //   key: "inCurrentSuffixMoney",
    //   width: 130
    // },
    // {
    //   title: this.$t("dataReport.tableHead.currentPostCollectionInterestRate"),
    //   align: "center",
    //   key: "inCurrentSuffixMoneyRate",
    //   width: 130
    // },
    {
      title: this.$t("dataReport.tableHead.currentPenalty"),
      align: "center",
      key: "currentPenaltyMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.currentPayablePenaltyRate"),
      align: "center",
      key: "currentPenaltyMoneyRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.actualProfit"),
      align: "center",
      key: "actualProfitMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.realProfitability"),
      align: "center",
      key: "actualProfitMoneyRate",
      width: 130
    }
  ];
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


  removeByValue(arr, val) {
    val.map(item => {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
          console.log(arr[i], item);
          arr.splice(i, 1);
        }
      }
    });
    return arr;
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
    }
  };
  chioce(item: any) {
    this.item = item;
  }
  formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]));
  }
  excelHandlePage() {
    const Thatday = this.formatDayTime(new Date());

    const weekago = this.formatDayTime(+new Date() - 604800000);
    let data = {
      beginTime: this.beginTime == "" ? weekago : this.beginTime,
      endTime: this.endTime == "" ? Thatday : this.endTime,
      loanTerm: this.searchForm.loanPeriod,
      channel: this.searchForm.channelSources,
      loanType: this.searchForm.loanType,

    source: this.item  == "all" || this.item =='Semua'? "" : this.item,
      expire_type:
        this.searchForm.Maturitys == "0" ? "" : this.searchForm.Maturitys
    };
     let shiji = this.searchForm.timeFrame[1] - this.searchForm.timeFrame[0];
    if (shiji > 2592000000) {
      this.$Message.warning(this.$t('overOneMonth'));
      return;
    }
    getExpireDateDataProfitData(data, res => {
      if (+res.code == 0) {
        if (res.data.length == 0) {
          this.$Message.info(this.$t("dataReport.tableHead.noMatching"));
        } else {

          const tHeader = [
           this.$t("dataReport.tableHead.expireDate"),
            this.$t("dataReport.tableHead.contractAmount"),
            this.$t("dataReport.tableHead.actualLoanAmount"),
            this.$t("dataReport.tableHead.preInterestAmount"),
           this.$t("dataReport.tableHead.preInterestRate"),
           this.$t("dataReport.tableHead.postInterestAmount"),
          this.$t("dataReport.tableHead.postInterestRate"),
           this.$t("dataReport.tableHead.rolloverLoanAmount"),
           this.$t("dataReport.tableHead.rolloverLoanAmountRate"),
           this.$t("dataReport.tableHead.currentPaidInContractAmount"),
           this.$t("dataReport.tableHead.currentPaymentRateOfPaymentContracts"
      ),


            this.$t("dataReport.tableHead.currentPenalty"),
           this.$t("dataReport.tableHead.currentPayablePenaltyRate"),
           this.$t("dataReport.tableHead.actualProfit"),
           this.$t("dataReport.tableHead.realProfitability"),
            
          ];

          const filterVal = [
            "day",
            "loanAmount",
            "loanActualAmount",
            "preMoney",
            "preMoneyRate",
            "rolloverProfitMoney",
            "rolloverPreMoneyRate",
            "rolloverLoanAmount",
            "rolloverLoanAmountRate",
            "inCurrentLoanAmount",
            "inCurrentLoanAmountRate",
            // "inCurrentSuffixMoney",
            // "inCurrentSuffixMoneyRate",
            "currentPenaltyMoney",
            "currentPenaltyMoneyRate",
            "actualProfitMoney",
            "actualProfitMoneyRate"
          ];
          const list = res.data;

          const data = this.formatJson(filterVal, list);
          export_json_to_excel({
            header: tHeader,
            data,
            filename:this.$t('dataReport.tableHead.profitData')
          });
          this.$Message.success(this.$t("dataReport.tableHead.Successfulexport"));
        }
      } else {
        this.$Message.info(this.$t("dataReport.tableHead.noMatching"));
      }
    });
  }
  _getExpireDateDataProfitData() {

    const Thatday = this.formatDayTime(new Date());

    const weekago = this.formatDayTime(+new Date() - 604800000);

    const data = {
      beginTime: this.beginTime == "" ? weekago : this.beginTime,
      endTime: this.endTime == "" ? Thatday : this.endTime,
      loanTerm: this.searchForm.loanPeriod,
      channel: this.searchForm.channelSources,
      loanType: this.searchForm.loanType,

      source: this.item  == "all" || this.item =='Semua'? "" : this.item,
      expire_type:
        this.searchForm.Maturitys == "0" ? "" : this.searchForm.Maturitys
    };

    let shiji = this.searchForm.timeFrame[1] - this.searchForm.timeFrame[0];
    if (shiji > 604800000) {
      this.$Message.warning(this.$t('oversevenDays'));
      return;
    }
    this.loading = true;
    getExpireDateDataProfitData(data, (res: any) => {
      this.loading = false;
      if (+res.code === 0) {
        this.tableData = res.data || [];
        this.showTable = true;
      } else {
        this.showTable = false;
      }
    });
  }
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1;
    this._getExpireDateDataProfitData();
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
      tableData.splice(0, 0, this.$t("dataReport.search.complete"));
      this.channel = tableData;
    });
    this._getExpireDateDataProfitData();
  }
}
</script>
