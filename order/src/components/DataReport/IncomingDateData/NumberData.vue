<template>
  <div class="m-number-data">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.search._incomingDate')">
              <DatePicker
                v-model="searchForm.timeFrame"
                type="daterange"
                :placeholder="$t('selectPrefix')+$t('dataReport.search.date')"
                style="width: 400px"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
            <FormItem :label="$t('dataReport.search.loanTerm')">
              <Select v-model="searchForm.loanPeriod" style="width:400px">
                <Option v-for="(item, key) in loanTerms" :key="key" :value="key">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.loanType')">
              <Select v-model="searchForm.loanType" style="width:400px">
                <Option v-for="(item, index) in loanTypes" :key="index" :value="index">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.channelSource')">
              <Select v-model="searchForm.channelSources" style="width:400px">
                <Option v-for="(item, index) in channelSources" :key="index" :value="index">{{item}}</Option>
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
import { Component, Vue } from 'vue-property-decorator'
import { getIncomingDateNumberData } from '@/api/dataReport'
import { Getter, Action } from 'vuex-class'
@Component
export default class NumberData extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  get channelSources() {
    return this.selectItems.channel || []
  }
  get loanTerms() {
    return this.selectItems.application_term_list || []
  }
  get loanTypes() {
    return this.selectItems.loan_type_list || []
  }
  searchForm = {
    timeFrame: [],
    loanPeriod: '0',
    loanType: '0',
    channelSources: '',
    page: 1
  }
  loading = false
  showTable = false
  searchLoading = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableData = []
  tableDefine = [
    { title: this.$t('dataReport.tableHead.incomingDate'), align: 'center', key: 'day', width: 130, fixed: 'left' },
    { title: this.$t('dataReport.tableHead.numberOfIncomingItems'), align: 'center', key: 'orderAllCount', width: 130 },
    { title: this.$t('dataReport.tableHead.numberOfPasses'), align: 'center', key: 'orderApprovePassNum', width: 130 },
    { title: this.$t('dataReport.tableHead.passingRate'), align: 'center', key: 'orderApprovePassRate', width: 130 },
    { title: this.$t('dataReport.tableHead.numberOfLoans'), align: 'center', key: 'loanOrderNum', width: 130 },
    { title: this.$t('dataReport.tableHead.advanceRate'), align: 'center', key: 'loanOrderRate', width: 130 },
    { title: this.$t('dataReport.tableHead.amountOfLoanContract'), align: 'center', key: 'loanAmount', width: 130 },
    { title: this.$t('dataReport.tableHead.actualLoanAmount'), align: 'center', key: 'loanActualAmount', width: 130 },
    { title: this.$t('dataReport.tableHead.allLoanItems'), align: 'center', key: 'loanAmountRate', width: 130 },
    { title: this.$t('dataReport.tableHead.numberOfMaturity'), align: 'center', key: 'dueTimeNum', width: 130 },
    { title: this.$t('dataReport.tableHead._numberOfIncomingItems'), align: 'center', key: 'inCuiShouNum', width: 130 },
    { title: this.$t('dataReport.tableHead.numberOfItemsInRushRate'), align: 'center', key: 'cuishouRate', width: 130 },
    { title: this.$t('dataReport.tableHead.theCurrentNumberOfBadDebts'), align: 'center', key: 'inCurrentCuiShouNum', width: 130 },
    { title: this.$t('dataReport.tableHead.overdueRateOfParts'), align: 'center', key: 'currentCuiShouRate', width: 130 },
    { title: this.$t('dataReport.tableHead._3number'), align: 'center', key: 'inCuiShou3DayNum', width: 130 },
    { title: this.$t('dataReport.tableHead._3numberOfPartsBadDebtRate'), align: 'center', key: 'inCuiShou3DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._3dayNumberRecoveryRate'), align: 'center', key: 'inCuiHui3DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._7number'), align: 'center', key: 'inCuiShou7DayNum', width: 130 },
    { title: this.$t('dataReport.tableHead._7numberOfPartsBadDebtRate'), align: 'center', key: 'inCuiShou7DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._7dayNumberRecoveryRate'), align: 'center', key: 'inCuiHui7DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._14number'), align: 'center', key: 'inCuiShou14DayNum', width: 130 },
    { title: this.$t('dataReport.tableHead._14numberOfPartsBadDebtRate'), align: 'center', key: 'inCuiShou14DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._14dayNumberRecoveryRate'), align: 'center', key: 'inCuiHui14DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._30number'), align: 'center', key: 'inCuiShou30DayNum', width: 130 },
    { title: this.$t('dataReport.tableHead._30numberOfPartsBadDebtRate'), align: 'center', key: 'inCuiShou30DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._30dayNumberRecoveryRate'), align: 'center', key: 'inCuiHui30DayRate', width: 130 },
    // { title: this.$t('dataReport.tableHead.badDebtRateOfCurrentParts'), align: 'center', key: 'inCurrentCuiShouRate', width: 130},
  ]
  formatDayTime(val: any): string {
    if (val) {
      const date: any = new Date(val)
      const Y: any = date.getFullYear()
      let M: any = date.getMonth() + 1
      let D: any = date.getDate()
      if (M < 10) {
        M = '0' + M
      }
      if (D < 10) {
        D = '0' + D
      }
      return Y + '-' + M + '-' + D
    } else {
      return ''
    }
  }
  get beginTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[0])
  }
  get endTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[1])
  }
  _getIncomingDateNumberData() {
    const data = {
      beginTime: this.beginTime,
      endTime: this.endTime,
      loanTerm: this.searchForm.loanPeriod,
      channel: this.searchForm.channelSources,
      loanType: this.searchForm.loanType
    }
    this.loading = true
    getIncomingDateNumberData(data, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
        this.tableData = res.data || []
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getIncomingDateNumberData()
  }
}
</script>
