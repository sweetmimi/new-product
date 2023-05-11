<!-- zys -->
<template>
  <div class="ExpireDateTable">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.Pnlreport.month')">
              <DatePicker
                format="yyyy-MM"
                type="month"
                :options="startMonthOptions"
                @on-change="beginTimeChange"
                :placeholder="$t('dataReport.search.satrtMonth')"
              ></DatePicker>
              -
              <DatePicker
                format="yyyy-MM"
                type="month"
                :options="endMonthOptions"
                @on-change="endTimeChange"
                :placeholder="$t('dataReport.search.endMonth')"
              ></DatePicker>
            </FormItem>

            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="getTableData()"
                >{{ $t("search") }}</Button
              >
            </FormItem>
            <!-- <Button type="success" slot="label" icon="ios-download-outline" :loading="exploading"
                  @click="excelHandlePage(t.key)">{{$t('exportExcel')}}</Button> -->
          </div>
        </div>
      </Form>
    </div>

    <Table
      border
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
    >
    </Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { apiPnlreport } from "@/api/dataReport";
import { Getter, Action } from "vuex-class";
@Component
export default class MoneyData extends Vue {
  @Getter("selectItems") selectItems: any;
  @Action("getSelectList") getSelectList: any;
  searchForm = {
    beginTime: "",
    endTime: "",
  };

  tableDefine = [
    {
      title: this.$t("dataReport.Pnlreport.expireDate"),
      align: "center",
      key: "month",
      width: 120,
      fixed: "left",
    },
  ];
  loading = false;
  searchLoading = false;
  month = "";
  tableData = [];
  getDate(strDate: any) {
    let monthStr = strDate.split("-")[1];
    let newMonthStr = parseInt(monthStr) + "";
    strDate = strDate.split("-")[0] + "-" + newMonthStr + "-1";
    var date = eval(
      "new Date(" +
        strDate
          .replace(/\d+(?=-[^-]+$)/, function (a) {
            return parseInt(a, 10) - 1;
          })
          .match(/\d+/g) +
        ")"
    );
    return date;
  }
  startMonthOptions = {
    disabledDate: (date) => {
      if (this.searchForm.endTime) {
        let endDate = this.getDate(this.searchForm.endTime);
        return (date && date > endDate) || date > new Date();
      } else {
        return date && date > new Date();
      }
    },
  };

  endMonthOptions = {
    disabledDate: (date) => {
      if (this.searchForm.beginTime) {
        let beginDate = this.getDate(this.searchForm.beginTime);
        return (date && date < beginDate) || date > new Date();
      } else {
        return date && date > new Date();
      }
    },
  };
  beginTimeChange(date: any) {
    this.searchForm.beginTime = date;
  }
  endTimeChange(date: any) {
    this.searchForm.endTime = date;
  }
  getTableHeader() {
    let newtableDefine = [];
    let TableHeaderKey = [
      "loanNum",
      "loanAmount",
      "serviceIncome",
      "serviceIncomeRate",
      "feeIncome",
      "feeIncomeRate",
      "overdueIncome",
      "overdueIncomeRate",
      "rolloverIncome",
      "rolloverIncomeRate",
      "totalIncome",
      "totalIncomeRate",
      "deadExpense",
      "deadExpenseRate",
      "deductionExpense",
      "deductionExpenseRate",
      "flatExpense",
      "flatExpenseRate",
      "loanChargeExpense",
      "loanChargeExpenseRate",
      "paymentChargeExpense",
      "paymentChargeExpenseRate",
      "thousandRoundExpense",
      "thousandRoundExpenseRate",
      "guestCostExpense",
      "guestCostExpenseRate",
      "rcCostExpense",
      "rcCostExpenseRate",
      "mannualCheckCostExpense",
      "mannualCheckCostExpenseRate",
      "mannualCollectCostExpense",
      "mannualCollectCostExpenseRate",
      "customerCostExpense",
      "customerCostExpenseRate",
      "sysTransExpense",
      "sysTransExpenseRate",
      "communicationCostExpense",
      "communicationCostExpenseRate",
      "capitalCostExpense",
      "capitalCostExpenseRate",
      "overheadCostExpense",
      "overheadCostExpenseRate",
      "totalExpense",
      "totalExpenseRate",
      "pureIncome",
      "pureIncomeRate",
    ];
    for (let index = 0; index < TableHeaderKey.length; index++) {
      newtableDefine.push({
        title: `${this.$t(`dataReport.Pnlreport.${TableHeaderKey[index]}`)}`,
        align: "center",
        key: TableHeaderKey[index],
        width: 100,
      });
    }
    newtableDefine.unshift({
      title: this.$t("dataReport.Pnlreport.month"),
      align: "center",
      key: "month",
      width: 120,
      fixed: "left",
    });
    this.tableDefine = newtableDefine;
  }
  getTableData() {
    this.loading = true;
    this.tableData = [];
    apiPnlreport(this.searchForm, (res: any) => {
      this.loading = false;
      if (+res.code === 0) {
        this.tableData = res.data;
      }else{
        this.$Message.error(res.msg)
      }
    });
  }

  created() {
    this.getTableData();
    this.getTableHeader();
  }
}
</script>
<style lang='less' scoped>
</style>
