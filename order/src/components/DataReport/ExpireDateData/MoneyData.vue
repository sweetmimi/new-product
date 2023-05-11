<template>
  <div class="m-money-data">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.search.expireDate')">
              <DatePicker
                v-model="searchForm.timeFrame"
                type="daterange"
                :placeholder="$t('selectPrefix')+$t('dataReport.search.date')"
                format="yyyy-MM-dd"
                :options="timeLimitConfig"
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
            >{{$t('dataReport.tableHead.moneyData')}}</Button>
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
  getExpireDateDataMoneyData,
  getchannel,
  Duetodiameterexcel
} from "@/api/dataReport";
import { Getter, Action } from "vuex-class";
import { export_json_to_excel } from "@/vendor/Export2Excel";
@Component
export default class MoneyData extends Vue {
  @Getter("selectItems") selectItems: any;
  @Action("getSelectList") getSelectList: any;
  searchForm = {
    timeFrame: [],
    loanPeriod: "0",
    loanType: 0,
    channelSources: 0,
    page: 1,
    Maturitys: "0"
  };
  channel = [];
  item = "";
  get channelSources() {
    return this.channel || [];
  }
  get loanTerms() {
    return this.selectItems.application_term_list || [];
  }
  get loanTypes() {
    return this.selectItems.loan_type_list || [];
  }
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
      title: this.$t("dataReport.tableHead.numberOfDefects"),
      align: "center",
      key: "dueTimeNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.expiredContractAmount"),
      align: "center",
      key: "dueTimeLoanMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.expiredParts"),
      align: "center",
      key: "loanAmountAvg",
      width: 130
    },

    {
      title: this.$t("dataReport.tableHead.initiationAmount"),
      align: "center",
      key: "inCuiShouMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.amountOfCredit"),
      align: "center",
      key: "cuishouMoneyRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._3amount"),
      align: "center",
      key: "inCuiShou3DayMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._3amountOfBadDebtRate"),
      align: "center",
      key: "inCuiShou3DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._3dayAmountRecoveryRate"),
      align: "center",
      key: "inCuiHui3DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._7amount"),
      align: "center",
      key: "inCuiShou7DayMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._7amountOfBadDebtRate"),
      align: "center",
      key: "inCuiShou7DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._7dayAmountRecoveryRate"),
      align: "center",
      key: "inCuiHui7DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._14amount"),
      align: "center",
      key: "inCuiShou14DayMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._14amountOfBadDebtRatea"),
      align: "center",
      key: "inCuiShou14DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._14dayAmountRecoveryRate"),
      align: "center",
      key: "inCuiHui14DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._30amount"),
      align: "center",
      key: "inCuiShou30DayMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._30amountOfBadDebtRatea"),
      align: "center",
      key: "inCuiShou30DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._30dayAmountRecoveryRate"),
      align: "center",
      key: "inCuiHui30DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.currentBadDebtAmount"),
      align: "center",
      key: "inCurrentCuiShouMoney",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.currentAmountBadDebtRate"),
      align: "center",
      key: "currentCuiShouRate",
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

  chioce(item: any) {
    this.item = item;
  }
  _getExpireDateDataMoneyData() {

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
    getExpireDateDataMoneyData(data, (res: any) => {
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
    this._getExpireDateDataMoneyData();
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
    getExpireDateDataMoneyData(data, res => {
      if (+res.code == 0) {
        if (res.data.length === 0) {
          this.$Message.info(this.$t("dataReport.tableHead.noMatching"));
        } else {


          const tHeader = [
            this.$t("dataReport.tableHead.expireDate"),
            this.$t("dataReport.tableHead.numberOfDefects"),
            this.$t("dataReport.tableHead.expiredContractAmount"),
            this.$t("dataReport.tableHead.expiredParts"),
            this.$t("dataReport.tableHead.initiationAmount"),
            this.$t("dataReport.tableHead.amountOfCredit"),
            this.$t("dataReport.tableHead._3amount"),
            this.$t("dataReport.tableHead._3amountOfBadDebtRate"),
            this.$t("dataReport.tableHead._3dayAmountRecoveryRate"),
            this.$t("dataReport.tableHead._7amount"),
            this.$t("dataReport.tableHead._7amountOfBadDebtRate"),
            this.$t("dataReport.tableHead._7dayAmountRecoveryRate"),
            this.$t("dataReport.tableHead._14amount"),
            this.$t("dataReport.tableHead._14amountOfBadDebtRatea"),
            this.$t("dataReport.tableHead._14dayAmountRecoveryRate"),
            this.$t("dataReport.tableHead._30amount"),
            this.$t("dataReport.tableHead._30amountOfBadDebtRatea"),
            this.$t("dataReport.tableHead._30dayAmountRecoveryRate"),
            this.$t("dataReport.tableHead.currentBadDebtAmount"),
            this.$t("dataReport.tableHead.currentAmountBadDebtRate")
          ];


          const filterVal = [
            "day",
            "dueTimeNum",
            "dueTimeLoanMoney",
            "loanAmountAvg",
            "inCuiShouMoney",
            "cuishouMoneyRate",
            "inCuiShou3DayMoney",
            "inCuiShou3DayRate",
            "inCuiHui3DayRate",
            "inCuiShou7DayMoney",
            "inCuiShou7DayRate",
            "inCuiHui7DayRate",
            "inCuiShou14DayMoney",
            "inCuiShou14DayRate",
            "inCuiHui14DayRate",
            "inCuiShou30DayMoney",
            "inCuiShou30DayRate",
            "inCuiHui30DayRate",
            "inCurrentCuiShouMoney",
            "currentCuiShouRate"
          ];
          const list = res.data;

          const data = this.formatJson(filterVal, list);
          export_json_to_excel({
            header: tHeader,
            data,
            filename:this.$t('dataReport.tableHead.moneyData')
          });
          this.$Message.success(this.$t('dataReport.tableHead.Successfulexport'));
        }
      } else {
        this.$Message.info(this.$t('dataReport.tableHead.noMatching'));
      }
    });
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
      console.log(tableData, 444);
    });

    this._getExpireDateDataMoneyData();
  }
}
</script>
