c<template>
  <div class="m-orderList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('order.search.orderNo')}`">
              <Input
                type="text"
                v-model="searchForm.orderNo"
                :placeholder="`${$t('inputPrefix')}${$t(
                  'order.search.orderNo'
                )}:`"
              />
            </FormItem>
            <FormItem :label="`${$t('loan.search.mobile')}`">
              <Input
                type="text"
                v-model="searchForm.mobile"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.mobile')}`"
              />
            </FormItem>
            <FormItem :label="`${$t('order.search.userId')}`">
              <Input
                type="text"
                v-model="searchForm.uid"
                :placeholder="`${$t('inputPrefix')}${$t(
                  'order.search.userId'
                )}`"
              />
            </FormItem>
            <FormItem :label="`${$t('dataReport.search.loanType')}`">
              <Select
                clearable
                transfer
                v-model="searchForm.loanType"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'dataReport.search.loanType'
                )}`"
              >
                <Option v-for="(item, index) in loanTypes" :key="index" :value="index">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem
              :label="`${$t('loan.search.orderStatus')}`"
              v-if="selectItems.order_daihou_status"
            >
              <Select
                clearable
                transfer
                v-model="searchForm.orderStatus"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'loan.search.orderStatus'
                )}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems
                    .order_daihou_status"
                >{{ option.value }}</Option>
              </Select>
            </FormItem>
            <FormItem :label="`${$t('order.search.repaystatus')}`">
              <Select
                clearable
                transfer
                v-if="selectItems.plan_status_list"
                v-model="searchForm.planStatus"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'order.search.repaystatus'
                )}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.plan_status_list"
                >{{ option.value }}</Option>
              </Select>
            </FormItem>

            <FormItem :label="`${$t('order.search.planStatus')}`">
              <Select
                clearable
                transfer
                v-model="searchForm.planPeriod"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'order.search.planStatus'
                )}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in repaystatusList"
                >{{ option.value }}</Option>
              </Select>
            </FormItem>

            <FormItem :label="`${$t('order.search.createTime')}`">
              <DatePicker
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd "
                @on-change="createTimeChange"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'order.search.createTime'
                )}`"
              ></DatePicker>
            </FormItem>
            <FormItem :label="`${$t('order.search.dueTime')}`">
              <DatePicker
                v-model="date"
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd "
                @on-change="dueTimeChange"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'order.search.dueTime'
                )}`"
              ></DatePicker>
            </FormItem>

            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="searchloading"
                @click="handlePage()"
              >{{ $t("search") }}</Button>
            </FormItem>
            <Button
              v-show="showTable && pageCount > 0"
              icon="ios-download-outline"
              style="margin-bottom: 10px"
              type="success"
              :loading="exportloading"
              @click="handleExpertData"
            >{{ $t("order.search.exportreRayList") }}</Button>
          </div>
        </div>
      </Form>
    </div>

    <Table
      ref="table"
      border
      class="list-table"
      :data="tableData"
      :columns="tableHader"
      :loading="searchloading"
    ></Table>

    <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
    >{{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { getRepayList } from '@/api/dataReport'
import { getchannel } from '@/api/dataReport'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import moment from 'moment'
@Component
export default class OrderList extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  $refs!: {
    table: HTMLFormElement
  }
  searchloading = false
  exportloading = false
  showTable = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableData = []
  tableHader = []
  repaystatusList = [
    {
      key: 0,
      value: '0',
    },
    {
      key: 1,
      value: '1',
    },
    {
      key: 2,
      value: '2',
    },
    {
      key: 3,
      value: '3',
    },
    {
      key: 4,
      value: '4',
    },
    {
      key: 5,
      value: '5',
    },
    {
      key: 6,
      value: '6',
    },
    {
      key: 7,
      value: '7',
    },
  ]
  date = [
    moment(new Date()).format('YYYY-MM-DD'),
    moment(new Date()).format('YYYY-MM-DD'),
  ]
  searchForm = {
    page: 1,
    orderNo: '',
    mobile: '',
    uid: '',
    planStatus: '',
    planPeriod: '',
    loanTimeStart: '',
    loanTimeEnd: '',
    dueTimeStart: moment(new Date()).format('YYYY-MM-DD'),
    dueTimeEnd: moment(new Date()).format('YYYY-MM-DD'),
    loanType: 0,
  }
  channel = []
  orderStatus = []
  get channelSources() {
    return this.channel || []
  }
  get loanTypes() {
    return this.selectItems.loan_type_list || []
  }

  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now()
    },
  }

  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getList()
  }
  createTimeChange(date: any) {
    this.searchForm.loanTimeStart = date[0]
    this.searchForm.loanTimeEnd = date[1]
  }
  dueTimeChange(date: any) {
    this.searchForm.dueTimeStart = date[0]
    this.searchForm.dueTimeEnd = date[1]
  }

  _getList() {
    this.searchloading = true
    getRepayList(this.searchForm, (res: any) => {
      this.searchloading = false
      if (+res.code === 0) {
        const data = res.data
        this.tableHader = data.list.header
        this.tableHader.forEach((item, index) => {
          item.align = 'center'
          if (item.key == 'orderNo') {
            item.minWidth = 150
            item.fixed = 'left'
          } else {
            item.minWidth = 120
          }
        })
        this.tableData = data.list.body || []
        this.total = Number(data.arrPager.count)
        this.pageCount = +data.arrPager.count
        this.pageSize = +data.arrPager.pageSize
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  formatJson(filterVal, jsonData) {
    return jsonData.map((v) => filterVal.map((j) => v[j]))
  }
  handleExpertData() {
    this.exportloading = true
    const payload = Object.assign({}, this.searchForm, {
      export: 1,
    })
    getRepayList(payload, (res: any) => {
      if (res.code == 0) {
        this.exportloading = false
        const list = res.data.list.body
        var filterVal = []
        var tHeader = []
        res.data.list.header.forEach((item, index) => {
          filterVal.push(item.key)
          tHeader.push(item.title)
        })
        const data = this.formatJson(filterVal, list)

        export_json_to_excel({
          header: tHeader,
          data,
          filename: this.$t('order.search.exportreRayList'),
        })
        this.$Message.success(this.$t('dataReport.tableHead.Successfulexport'))
      }
    })
  }
  created() {
    this._getList()
  }
}
</script>
