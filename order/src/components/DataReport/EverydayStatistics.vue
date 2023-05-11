<template>
  <div class="m-everday-statistics">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.search.date')">
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
                <Option
                  v-for="item in $t('dataReport.search.loanTerms')"
                  :key="item.key"
                  :value="item.key"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.loanType')">
              <Select v-model="searchForm.loanType" style="width:400px">
                <Option
                  v-for="item in $t('dataReport.search.loanTypes')"
                  :key="item.key"
                  :value="item.key"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.channelSource')">
              <Select v-model="searchForm.channelSources" style="width:400px">
                <Option
                  v-for="item in $t('dataReport.search.channelSources')"
                  :key="item.key"
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
          </div>
        </div>
      </Form>
    </div>

    <Table
      border
      class="list-table"
      v-show="showTable && pageCount > 0"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>
    <Alert v-show="!(showTable && pageCount > 0)">{{ $t('noData') }}</Alert>
    <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { getEverydayStatistics } from '@/api/dataReport'

@Component
export default class EverydayStatistics extends Vue {
  searchForm = {
    timeFrame: '',
    loanPeriod: '0',
    loanType: '0',
    channelSources: '',
    page: 1
  }
  tableData: object[] = []
  historyData: object = {}
  loading = false
  showTable = false
  searchLoading = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableDefine = [
    { title: this.$t('dataReport.tableHead.time'), align: 'center', key: 'day', width: 150, fixed: 'left' },
    { title: this.$t('dataReport.tableHead.register_num'), align: 'center', key: 'register_num', width: 150 },
    { title: this.$t('dataReport.tableHead.login_num'), align: 'center', key: 'login_num', width: 150, render: (h: any, params: any) => { return h('span', '/') } },
    { title: this.$t('dataReport.tableHead.apply_num'), align: 'center', key: 'apply_num', width: 150 },
    { title: this.$t('dataReport.tableHead.loan_rate'), align: 'center', key: 'loan_rate', width: 150, render: (h: any, params: any) => { return h('span', params.row.loan_rate + '%') } },
    { title: this.$t('dataReport.tableHead.machine_refuse_num'), align: 'center', key: 'machine_refuse_num', width: 150, render: (h: any, params: any) => { return h('span', '/') } },
    { title: this.$t('dataReport.tableHead.lenders_order_num'), align: 'center', key: 'lenders_order_num', width: 150 },
    { title: this.$t('dataReport.tableHead.lenders_amount'), align: 'center', key: 'lenders_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.lenders_amount)}`) } },
    { title: this.$t('dataReport.tableHead.loan_actual_amount'), align: 'center', key: 'loan_actual_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.loan_actual_amount)}`) } },
    { title: this.$t('dataReport.tableHead.due_order_amount'), align: 'center', key: 'due_order_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.due_order_amount)}`) } },
    { title: this.$t('dataReport.tableHead.due_order_num'), align: 'center', key: 'due_order_num', width: 150 },
    { title: this.$t('dataReport.tableHead.early_settle_num'), align: 'center', key: 'early_settle_num', width: 150 },
    { title: this.$t('dataReport.tableHead.nomal_settle_num'), align: 'center', key: 'nomal_settle_num', width: 150 },
    { title: this.$t('dataReport.tableHead.overdue_order_num'), align: 'center', key: 'overdue_order_num', width: 150 },
    { title: this.$t('dataReport.tableHead.settle_order_amount'), align: 'center', key: 'settle_order_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.settle_order_amount)}`) } },
    { title: this.$t('dataReport.tableHead.pre_settle_amount'), align: 'center', key: 'pre_settle_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.pre_settle_amount)}`) } },
    { title: this.$t('dataReport.tableHead.normal_settle_amount'), align: 'center', key: 'normal_settle_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.normal_settle_amount)}`) } },
    { title: this.$t('dataReport.tableHead.overdue_settle_amount'), align: 'center', key: 'overdue_settle_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.overdue_settle_amount)}`) } },
    { title: this.$t('dataReport.tableHead.need_pay_order_num'), align: 'center', key: 'need_pay_order_num', width: 150 },
    { title: this.$t('dataReport.tableHead.pay_order_num'), align: 'center', key: 'pay_order_num', width: 150 },
    { title: this.$t('dataReport.tableHead.no_pay_order_num') , align: 'center', key: 'no_pay_order_num', width: 150 },
    { title: this.$t('dataReport.tableHead.pay_order_num_rate'), align: 'center', key: 'pay_order_num_rate', width: 150, render: (h: any, params: any) => { return h('span', params.row.pay_order_num_rate + '%') } },
    { title: this.$t('dataReport.tableHead.need_pay_amount'), align: 'center', key: 'need_pay_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.need_pay_amount)}`) } },
    { title: this.$t('dataReport.tableHead.pay_amount'), align: 'center', key: 'pay_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.pay_amount)}`) } },    
    { title: this.$t('dataReport.tableHead.no_pay_amount'), align: 'center', key: 'no_pay_amount', width: 150, render: (h: any, params: any) => { return h('span', `${this.toThousands(params.row.no_pay_amount)}`) } },
    { title: this.$t('dataReport.tableHead.pay_amount_rate'), align: 'center', key: 'pay_amount_rate', width: 150, render: (h: any, params: any) => { return h('span', params.row.pay_amount_rate + '%') } }
  ]
  toThousands(num: string): string {
    // if (!num) {
    //   return ''
    // }
    // let result: string = '';
    // while (num.length > 3) {
    //   result = '.' + num.slice(-3) + result;
    //   num = num.slice(0, num.length - 3);
    // }
    // if (num) { result = num + result; }
    return 'RP ' + num;
  }

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
  _getEverydayStatistics() {
    this.loading = true
    const data = {
      beginTime: this.beginTime,
      endTime: this.endTime,
      loanType: this.searchForm.loanType,
      loanTerm: this.searchForm.loanPeriod,
      channel: this.searchForm.channelSources,
      page: this.searchForm.page
    }
    getEverydayStatistics(data, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
        const _data: any = res.data
        this.tableData = _data.data.daily_data || []
        this.historyData = _data.data.his_data[0] || {}
        this.tableData.unshift ({
          ...this.historyData,
          day: this.$t('dataReport.tableHead.total')
        })

        // this.tableData = data.list || []
        this.total =Number(_data.arrPager.count) 
        this.pageCount = +_data.arrPager.count
        this.pageSize = +_data.arrPager.pageSize
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getEverydayStatistics()
  }
}
</script>
