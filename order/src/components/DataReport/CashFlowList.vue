<template>
  <div class="m-orderList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('dataReport.search.date')}`">
              <DatePicker
                      type="daterange"
                      :options="timeLimitConfig"
                      format="yyyy-MM-dd"
                      @on-change="loanTimeChange"
                      :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.date')}`">
              </DatePicker>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label" :loading="loading" @click="handlePage()">{{$t('search')}}</Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>

    <Table
      ref="table"
      border
      class="list-table"
      v-show="showTable"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size=18 class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <Button type="text" class="fix-table-btn" @click="viewDetail(props.rowInfo.order_no)" icon="ios-eye" size="small">{{$t('operate.viewBtn')}}</Button>
      </template>
    </Table>
    <Alert v-show="!showTable">{{ $t('noData') }}</Alert>

    <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator> {{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { getReportFinance } from '@/api/dataReport'
@Component
export default class OrderList extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  $refs!: {
    table: HTMLFormElement
  }
  loading = false
  showTable = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableData:any [] = []
  searchForm = {
    page: 1,
    start: null,
    end: null,
  }
  timeLimitConfig = {
    disabledDate (date: any) {
      return date && date.valueOf() > Date.now()
    }
  }
  tableDefine = [
    { title: this.$t('dataReport.tableHead.contractAmount'), align: 'center', key: 'total_amount', fixed: 'left', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.actualLoanAmount'), align: 'center', key: 'actual_amount',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.repaymentAmount'), align: 'center', key: 'payoff_amount',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.penaltyInterest'), align: 'center', key: 'penalty_amount',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.interest'), align: 'center', key: 'interest_amount',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.service'), align: 'center', key: 'service_amount',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.loansNum'), align: 'center', key: 'loans',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.repaymentsNum'), align: 'center', key: 'payoffs',  minWidth: 150 },
  ]
  viewDetail(order_no: string) {
    this.$router.push({
      name: 'orderDetail',
      params: {
        orderNo: order_no
      }
    })
  }
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getList()
  }
  loanTimeChange(date: any) {
    this.searchForm.start = date[0]
    this.searchForm.end = date[1]
  }
  _getList() {
    this.loading = true
    getReportFinance(this.searchForm, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
        this.tableData=[]
        this.tableData.push(res.data)
        // this.total = res.arrPager.count
        // this.pageCount = +res.arrPager.count
        // this.pageSize = +res.arrPager.pageSize
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  created() {
    this._getList()
  }
}
</script>
