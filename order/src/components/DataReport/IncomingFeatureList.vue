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
            <FormItem :label="`${$t('dataReport.search.loanType')}`">
              <Select
                      clearable
                      transfer
                      v-model="searchForm.product_id"
                      :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.loanType')}`">
                <Option
                        :key="index"
                        :value="option.key"
                        v-for="(option, index) in $t('dataReport.search.loanTypes')">
                  {{option.value}}
                </Option>
              </Select>
            </FormItem>
            <FormItem :label="`${$t('dataReport.search.channelSource')}`">
              <Select
                      clearable
                      transfer
                      v-model="searchForm.channel"
                      :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.channelSource')}`">
                <Option
                        :key="index"
                        :value="option.key"
                        v-for="(option, index) in $t('dataReport.search.channelSources')">
                  {{option.value}}
                </Option>
              </Select>
            </FormItem>
            <FormItem :label="`${$t('dataReport.search.isLend')}`">
              <Select
                      clearable
                      transfer
                      v-model="searchForm.product_id"
                      :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.isLend')}`">
                <Option
                        :key="index"
                        :value="option.key"
                        v-for="(option, index) in $t('dataReport.search.isLends')">
                  {{option.value}}
                </Option>
              </Select>
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
import { getLoanList, getLoanInfo } from '@/api/loan'
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
  tableData = []
  searchForm = {
    page: 1,
    order_no: '',
    user_id: '',
    user_name: '',
    product_id: '',
    order_status: '',
    loan_begin_time: null,
    loan_end_time: null,
    application_term_min: null,
    application_term_max: null,
    term_unit: '',
    payoff_begin_time: '',
    payoff_end_time: ''
  }
  timeLimitConfig = {
    disabledDate (date: any) {
      return date && date.valueOf() > Date.now()
    }
  }
  tableDefine = [
    { title: this.$t('dataReport.tableHead.date'), align: 'center', key: 'registration', fixed: 'left', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.averageAge'), align: 'center', key: 'registration',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.maleRatio'), align: 'center', key: 'registration',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.averageCreditScore'), align: 'center', key: 'registration',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.averageFraud'), align: 'center', key: 'registration',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.averageTelScore'), align: 'center', key: 'registration',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.averageLongScore'), align: 'center', key: 'registration',  minWidth: 150 },
    { title: this.$t('dataReport.tableHead.averageBlackScore'), align: 'center', key: 'registration',  minWidth: 150 },
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
    this.searchForm.loan_begin_time = date[0]
    this.searchForm.loan_end_time = date[1]
  }
  _getList() {
    this.loading = true
    getLoanList(this.searchForm, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
        this.tableData = res.data
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
