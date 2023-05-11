<template>
  <div class="m-number-data">
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
            >{{$t('dataReport.tableHead.numberData')}}</Button>
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
  getExpireDateDataNumberData,
  getchannel,
  Duetodiameterexcel
} from "@/api/dataReport";
import { Getter, Action } from "vuex-class";
import { export_json_to_excel } from "@/vendor/Export2Excel";
@Component
export default class NumberData extends Vue {
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

  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now();
    }
  };
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
      title: this.$t("dataReport.tableHead.numberOfDefects"),
      align: "center",
      key: "dueTimeNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H3Numberoutstanding"),
      align: "center",
      key: "advance3DayNoRepaymentNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H2Numberoutstanding"),
      align: "center",
      key: "advance2DayNoRepaymentNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H1Numberoutstanding"),
      align: "center",
      key: "advance1DayNoRepaymentNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H0Numberoutstanding"),
      align: "center",
      key: "advance0DayNoRepaymentNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H3rate"),
      align: "center",
      key: "advance3DayNoRepaymentNumRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H3recovery"),
      align: "center",
      key: "advance3DayRepaymentNumRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H2rate"),
      align: "center",
      key: "advance2DayNoRepaymentNumRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H2recovery"),
      align: "center",
      key: "advance2DayRepaymentNumRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H1rate"),
      align: "center",
      key: "advance1DayNoRepaymentNumRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H1recovery"),
      align: "center",
      key: "advance1DayRepaymentNumRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H0rate"),
      align: "center",
      key: "advance0DayNoRepaymentNumRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.H0recovery"),
      align: "center",
      key: "advance0DayRepaymentNumRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.rolloverNum"),
      align: "center",
      key: "rolloverNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.rolloverRate"),
      align: "center",
      key: "rolloverRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._numberOfIncomingItems"),
      align: "center",
      key: "inCuiShouNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.numberOfItemsInRushRate"),
      align: "center",
      key: "inCuishouRate",
      width: 130
    },

    {
      title: this.$t("dataReport.tableHead._1number"),
      align: "center",
      key: "inCuiShou1DayNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._1numberOfPartsBadDebtRate"),
      align: "center",
      key: "inCuiShou1DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._1dayNumberRecoveryRate"),
      align: "center",
      key: "inCuiHui1DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._2number"),
      align: "center",
      key: "inCuiShou2DayNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._2numberOfPartsBadDebtRate"),
      align: "center",
      key: "inCuiShou2DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._2dayNumberRecoveryRate"),
      align: "center",
      key: "inCuiHui2DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._3number"),
      align: "center",
      key: "inCuiShou3DayNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._3numberOfPartsBadDebtRate"),
      align: "center",
      key: "inCuiShou3DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._3dayNumberRecoveryRate"),
      align: "center",
      key: "inCuiHui3DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._4number"),
      align: "center",
      key: "inCuiShou4DayNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._4numberOfPartsBadDebtRate"),
      align: "center",
      key: "inCuiShou4DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._4dayNumberRecoveryRate"),
      align: "center",
      key: "inCuiHui4DayRate",
      width: 130
    },

    {
      title: this.$t("dataReport.tableHead._5number"),
      align: "center",
      key: "inCuiShou5DayNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._5numberOfPartsBadDebtRate"),
      align: "center",
      key: "inCuiShou5DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._5dayNumberRecoveryRate"),
      align: "center",
      key: "inCuiHui5DayRate",
      width: 130
    },

    {
      title: this.$t("dataReport.tableHead._6number"),
      align: "center",
      key: "inCuiShou6DayNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._6numberOfPartsBadDebtRate"),
      align: "center",
      key: "inCuiShou6DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._6dayNumberRecoveryRate"),
      align: "center",
      key: "inCuiHui6DayRate",
      width: 130
    },

    {
      title: this.$t("dataReport.tableHead._7number"),
      align: "center",
      key: "inCuiShou7DayNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._7numberOfPartsBadDebtRate"),
      align: "center",
      key: "inCuiShou7DayRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead._7dayNumberRecoveryRate"),
      align: "center",
      key: "inCuiHui7DayRate",
      width: 130
    },

    {
      title: this.$t("dataReport.tableHead.theCurrentNumberOfBadDebts"),
      align: "center",
      key: "inCurrentCuiShouNum",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.badDebtRateOfCurrentParts"),
      align: "center",
      key: "inCurrentCuiShouRate",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.expiredContractAmount"),
      align: "center",
      key: "loanAmount",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.expiredParts"),
      align: "center",
      key: "loanAmountAvg",
      width: 130
    },
    {
      title: this.$t("dataReport.tableHead.repayNum"),
      align: "center",
      key: "repayNum",
      width: 130
    }
  ];


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

  chioce(item: any) {
    this.item = item;
  }

  formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]));
  }
  excelHandlePage() {
    
    const Thatday = this.formatDayTime(new Date());

    const weekago = this.formatDayTime(+new Date() - 604800000);
     if(this.item == 'all' || this.item == 'Semua'){
          this.item =""
      }else {
        this.item = this.item
      }
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
    getExpireDateDataNumberData(data, res => {
      if (+res.code == 0) {
        if (res.data.length == 0) {
          this.$Message.info(this.$t("dataReport.tableHead.noMatching"));
        } else {

          const tHeader = [
            this.$t("dataReport.tableHead.expireDate"),
            this.$t("dataReport.tableHead.numberOfDefects"),
            this.$t("dataReport.tableHead.H3Numberoutstanding"),
            this.$t("dataReport.tableHead.H2Numberoutstanding"),
            this.$t("dataReport.tableHead.H1Numberoutstanding"),
            this.$t("dataReport.tableHead.H0Numberoutstanding"),
            this.$t("dataReport.tableHead.H3rate"),
            this.$t("dataReport.tableHead.H3recovery"),
            this.$t("dataReport.tableHead.H2rate"),
            this.$t("dataReport.tableHead.H2recovery"),
            this.$t("dataReport.tableHead.H1rate"),
            this.$t("dataReport.tableHead.H1recovery"),
            this.$t("dataReport.tableHead.H0rate"),
            this.$t("dataReport.tableHead.H0recovery"),
            this.$t("dataReport.tableHead.rolloverNum"),
            this.$t("dataReport.tableHead.rolloverRate"),
            this.$t("dataReport.tableHead._numberOfIncomingItems"),
            this.$t("dataReport.tableHead.numberOfItemsInRushRate"),
            this.$t("dataReport.tableHead._1number"),
            this.$t("dataReport.tableHead._1numberOfPartsBadDebtRate"),
            this.$t("dataReport.tableHead._1dayNumberRecoveryRate"),
            this.$t("dataReport.tableHead._2number"),
            this.$t("dataReport.tableHead._2numberOfPartsBadDebtRate"),
            this.$t("dataReport.tableHead._2dayNumberRecoveryRate"),
            this.$t("dataReport.tableHead._3number"),
            this.$t("dataReport.tableHead._3numberOfPartsBadDebtRate"),
            this.$t("dataReport.tableHead._3dayNumberRecoveryRate"),
            this.$t("dataReport.tableHead._4number"),
            this.$t("dataReport.tableHead._4numberOfPartsBadDebtRate"),
            this.$t("dataReport.tableHead._4dayNumberRecoveryRate"),
            this.$t("dataReport.tableHead._5number"),
            this.$t("dataReport.tableHead._5numberOfPartsBadDebtRate"),
            this.$t("dataReport.tableHead._5dayNumberRecoveryRate"),
            this.$t("dataReport.tableHead._6number"),
            this.$t("dataReport.tableHead._6numberOfPartsBadDebtRate"),
            this.$t("dataReport.tableHead._6dayNumberRecoveryRate"),
            this.$t("dataReport.tableHead._7number"),
            this.$t("dataReport.tableHead._7numberOfPartsBadDebtRate"),
            this.$t("dataReport.tableHead._7dayNumberRecoveryRate"),
            this.$t("dataReport.tableHead.theCurrentNumberOfBadDebts"),
            this.$t("dataReport.tableHead.badDebtRateOfCurrentParts"),
            this.$t("dataReport.tableHead.expiredContractAmount"),
            this.$t("dataReport.tableHead.expiredParts"),
            this.$t("dataReport.tableHead.repayNum")
          ];
          const meng = [
            "day",
            "dueTimeNum",
            "advance3DayNoRepaymentNum",
            "advance2DayNoRepaymentNum",
            "advance1DayNoRepaymentNum",
            "advance0DayNoRepaymentNum",
            "advance3DayNoRepaymentNumRate",
            "advance3DayRepaymentNumRate",
            "advance2DayNoRepaymentNumRate",
            "advance2DayRepaymentNumRate",
            "advance1DayNoRepaymentNumRate",
            "advance1DayRepaymentNumRate",
            "advance0DayNoRepaymentNumRate",
            "advance0DayRepaymentNumRate",
            "rolloverNum",
            "rolloverRate",
            "inCuiShouNum",
            "inCuishouRate",
            "inCuiShou1DayNum",
            "inCuiShou1DayRate",
            "inCuiHui1DayRate",
            "inCuiShou2DayNum",
            "inCuiShou2DayRate",
            "inCuiHui2DayRate",
            "inCuiShou3DayNum",
            "inCuiShou3DayRate",
            "inCuiHui3DayRate",
            "inCuiShou4DayNum",
            "inCuiShou4DayRate",
            "inCuiHui4DayRate",
            "inCuiShou5DayNum",
            "inCuiShou5DayRate",
            "inCuiHui5DayRate",
            "inCuiShou6DayNum",
            "inCuiShou6DayRate",
            "inCuiHui6DayRate",
            "inCuiShou7DayNum",
            "inCuiShou7DayRate",
            "inCuiHui7DayRate",
            "inCurrentCuiShouNum",
            "inCurrentCuiShouRate",
            "loanAmount",
            "loanAmountAvg",
            "repayNum"
          ];

          const filterVal = meng;
          const list = res.data;
          const data = this.formatJson(filterVal, list);
          
          export_json_to_excel({
            header: tHeader,
            data,
            filename: this.$t('dataReport.tableHead.numberData')
          });
          this.$Message.success(this.$t('dataReport.tableHead.Successfulexport'));
        }
      } else {
        this.$Message.info(this.$t('dataReport.tableHead.noMatching'));
      }
    });
  }

  _getExpireDateDataNumberData() {

    let shiji = this.searchForm.timeFrame[1] - this.searchForm.timeFrame[0];

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

    if (shiji > 604800000) {
      this.$Message.warning(this.$t('oversevenDays'));
      return;
    }
    this.loading = true;
    getExpireDateDataNumberData(data, (res: any) => {
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
    this._getExpireDateDataNumberData();
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
    });

    this._getExpireDateDataNumberData();
  }
}
</script>
