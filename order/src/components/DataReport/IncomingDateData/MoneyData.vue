<template>
  <div class="m-money-data">
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
import { getIncomingDateMoneyData } from '@/api/dataReport'
import { Getter, Action } from 'vuex-class'

@Component
export default class MoneyData extends Vue {
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
    { title: this.$t('dataReport.tableHead.initiationAmount'), align: 'center', key: 'inCuiShouMoney', width: 130 },
    { title: this.$t('dataReport.tableHead.amountOfCredit'), align: 'center', key: 'cuishouMoneyRate', width: 130 },
    { title: this.$t('dataReport.tableHead._3amount'), align: 'center', key: 'inCuiShou3DayMoney', width: 130 },
    { title: this.$t('dataReport.tableHead._3amountOfBadDebtRate'), align: 'center', key: 'inCuiShou3DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._3dayAmountRecoveryRate'), align: 'center', key: 'inCuiHui3DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._7amount'), align: 'center', key: 'inCuiShou7DayMoney', width: 130 },
    { title: this.$t('dataReport.tableHead._7amountOfBadDebtRate'), align: 'center', key: 'inCuiShou7DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._7dayAmountRecoveryRate'), align: 'center', key: 'inCuiHui7DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._14amount'), align: 'center', key: 'inCuiShou14DayMoney', width: 130 },
    { title: this.$t('dataReport.tableHead._14amountOfBadDebtRatea'), align: 'center', key: 'inCuiShou14DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._14dayAmountRecoveryRate'), align: 'center', key: 'inCuiHui14DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._30amount'), align: 'center', key: 'inCuiShou30DayMoney', width: 130 },
    { title: this.$t('dataReport.tableHead._30amountOfBadDebtRatea'), align: 'center', key: 'inCuiShou30DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead._30dayAmountRecoveryRate'), align: 'center', key: 'inCuiHui30DayRate', width: 130 },
    { title: this.$t('dataReport.tableHead.currentBadDebtAmount'), align: 'center', key: 'inCurrentCuiShouMoney', width: 130 },
    { title: this.$t('dataReport.tableHead.currentAmountBadDebtRate'), align: 'center', key: 'currentCuiShouRate', width: 130 }
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
  _getIncomingDateMoneyData() {
    const data = {
      beginTime: this.beginTime,
      endTime: this.endTime,
      loanTerm: this.searchForm.loanPeriod,
      channel: this.searchForm.channelSources,
      loanType: this.searchForm.loanType
    }
    this.loading = true
    getIncomingDateMoneyData(data, (res: any) => {
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
    this._getIncomingDateMoneyData()
  }
}
</script>
