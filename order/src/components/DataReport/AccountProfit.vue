<!-- zys -->
<template>
  <div class="ExpireDateTable">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('dataReport.search.date')}`">
              <DatePicker
                type="daterange"
                :options="timeLimitConfig"
                v-model="date"
                format="yyyy-MM-dd"
                @on-change="timeChange"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'dataReport.search.date'
                )}`"
              >
              </DatePicker>
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

    <Table border :data="tableData" :columns="tableDefine" :loading="loading">
    </Table>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";
import { apiAccountprofit } from "@/api/dataReport";
import { Getter, Action } from "vuex-class";
@Component
export default class MoneyData extends Vue {
  @Getter("selectItems") selectItems: any;
  @Action("getSelectList") getSelectList: any;
  searchForm = {
    beginTime: "",
    endTime: "",
  };
  date = [];
  tableDefine = [];
  loading = false;
  searchLoading = false;
  month = "";
  tableData = [];

  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now();
    },
  };
  timeChange(date: any) {
    this.searchForm.beginTime = date[0];
    this.searchForm.endTime = date[1];
  }

  beginTimeChange(date: any) {
    this.searchForm.beginTime = date;
  }
  endTimeChange(date: any) {
    this.searchForm.endTime = date;
  }
  getTableHeader() {
    let newtableDefine = [];
    let TableHeaderKey = [
      "lender_id",
      "loan_fee_amount",
      "repay_fee_amount",
      "total_profit",
      "principal_amount",
      "can_withdrawals_amount",
      "had_withdrawals_amount",
      "diff_withdrawal_amount",
    ];
    for (let index = 0; index < TableHeaderKey.length; index++) {
      newtableDefine.push({
        title: `${this.$t(`dataReport.Accountprofit.${TableHeaderKey[index]}`)}`,
        align: "center",
        key: TableHeaderKey[index],
      });
    }

    this.tableDefine = newtableDefine;
  }
  getCurrentMonthTime() {
    var startDay1 = moment().startOf("month").format("YYYY-MM-DD");
    var endDay1 = moment(new Date()).format("YYYY-MM-DD");
    this.date = [startDay1, endDay1];
    this.searchForm.beginTime = startDay1;
    this.searchForm.endTime = endDay1;
    // return [startDay1, endDay1];
  }

  getTableData() {
    this.loading = true;
    this.tableData = [];
    apiAccountprofit(this.searchForm, (res: any) => {
      this.loading = false;
      if (+res.code === 0) {
        this.tableData = res.data;
      } else {
        this.$Message.error(res.msg);
      }
    });
  }

  created() {
    this.getCurrentMonthTime();
    this.getTableData();
    this.getTableHeader();
  }
}
</script>
<style lang='less' scoped>
</style>
