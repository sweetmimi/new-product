<template>
  <div class="m-recover-rate">
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
                <Option v-for="item in $t('dataReport.search.loanTerms')" :key="item.key" :value="item.key">{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.loanType')">
              <Select v-model="searchForm.loanType" style="width:400px">
                <Option v-for="item in $t('dataReport.search.loanTypes')" :key="item.key" :value="item.key">{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.channelSource')">
              <Select v-model="searchForm.channelSources" style="width:400px">
                <Option v-for="item in $t('dataReport.search.channelSources')" :key="item.key" :value="item.key">{{item.value}}</Option>
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
import { getRecoverRateData } from '@/api/dataReport'

@Component
export default class RecoveryRate extends Vue {
  searchForm = {
    timeFrame: '',
    loanPeriod: '0',
    loanType: '0',
    channelSources: '',
    page: 1
  }
  tableData = []
  loading = false
  showTable = false
  searchLoading = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableDefine = [
    { title: this.$t('dataReport.tableHead.expireDate'), align: 'center', key: 'day' },
    { title: this.$t('dataReport.tableHead._1dayRecoveryRate'), align: 'center', key: 'inCuiHui1DayRate' },
    { title: this.$t('dataReport.tableHead._2dayRecoveryRate'), align: 'center', key: 'inCuiHui2DayRate' },
    { title: this.$t('dataReport.tableHead._3dayRecoveryRate'), align: 'center', key: 'inCuiHui3DayRate' },
    { title: this.$t('dataReport.tableHead._4dayRecoveryRate'), align: 'center', key: 'inCuiHui4DayRate' },
    { title: this.$t('dataReport.tableHead._7dayRecoveryRate'), align: 'center', key: 'inCuiHui7DayRate' },
    { title: this.$t('dataReport.tableHead._14dayRecoveryRate'), align: 'center', key: 'inCuiHui14DayRate' },
    { title: this.$t('dataReport.tableHead._30dayRecoveryRate'), align: 'center', key: 'inCuiHui30DayRate' },
    { title: this.$t('dataReport.tableHead._60dayRecoveryRate'), align: 'center', key: 'inCuiHui60DayRate' },
    { title: this.$t('dataReport.tableHead._120dayRecoveryRate'), align: 'center', key: 'inCuiHui120DayRate' },
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
  _getRecoverRateData() {
    const data = {
      beginTime: this.beginTime,
      endTime: this.endTime,
      loanType: this.searchForm.loanType
    }
    this.loading = true
    getRecoverRateData(data, (res: any) => {
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
    this._getRecoverRateData()
  }
}

</script>
