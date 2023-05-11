<template>
  <div class="m-loanList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('loan.search.orderNo')}`">
              <Input
                type="text"
                v-model="searchForm.order_no"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.orderNo')}`"
              />
            </FormItem>
            <FormItem :label="`${$t('loan.search.mobile')}`">
              <Input
                type="text"
                v-model="searchForm.user_mobile"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.mobile')}`"
              />
            </FormItem>
            <FormItem :label="`${$t('loan.search.userId')}`">
              <Input
                type="text"
                v-model="searchForm.user_id"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.userId')}`"
              />
            </FormItem>
            <FormItem :label="`${$t('loan.search.userName')}`">
              <Input
                type="text"
                v-model="searchForm.user_name"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.userName')}`"
              />
            </FormItem>
            <FormItem :label="`${$t('loan.search.productId')}`">
              <Select
                clearable
                transfer
                v-if="selectItems.product_name_map"
                v-model="searchForm.product_id"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.productId')}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.product_name_map"
                >{{option.value}}</Option>
              </Select>
            </FormItem>

            <!-- <FormItem :label="$t('dataReport.search.channelSource')">
              <Select v-model="searchForm.channel" >
                <Option v-for="(item, index) in channelSources" :key="index" :value="index" @click.native="chioce(item)">{{item}}</Option>
              </Select>
            </FormItem>-->
            <FormItem :label="`${$t('order.search.orderStatus')}`">
              <Select
                clearable
                transfer
                v-if="selectItems.order_list"
                v-model="searchForm.order_status"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.orderStatus')}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.order_list.order_status"
                >{{option.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('loan.search.applicationAmount')">
              <div class="overdue-warp">
                <InputNumber
                  class="overdue-input"
                  :min="1"
                  v-model="searchForm.application_amount_min"
                  placeholder="Min"
                ></InputNumber>-
                <InputNumber
                  class="overdue-input"
                  :min="1"
                  v-model="searchForm.application_amount_max"
                  placeholder="Maks"
                ></InputNumber>
              </div>
            </FormItem>
            <FormItem :label="$t('loan.search.applicationTerm')">
              <div class="overdue-warp">
                <InputNumber
                  class="overdue-input"
                  :min="1"
                  v-model="searchForm.application_term_min"
                  placeholder="Min"
                ></InputNumber>-
                <InputNumber
                  class="overdue-input"
                  :min="1"
                  v-model="searchForm.application_term_max"
                  placeholder="Maks"
                ></InputNumber>
              </div>
            </FormItem>
            <!-- <FormItem :label="`${$t('loan.search.termUnit')}`">
              <Select
                clearable
                transfer
                v-if="selectItems.order_list"
                v-model="searchForm.term_unit"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.termUnit')}`">
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.order_list.term_unit">
                    {{option.value}}
                </Option>
              </Select>
            </FormItem>-->

            <FormItem :label="`${$t('loan.search.timeType')}`">
              <Select
                clearable
                transfer
                v-if="selectItems.order_list"
                v-model="searchForm.time_type"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.timeType')}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.order_list.time_type"
                >{{option.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="`${$t('loan.search.time')}`">
              <DatePicker
                v-model="date"
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd"
                @on-change="timeChange"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.time')}`"
              ></DatePicker>
            </FormItem>
            <FormItem class="fix-form-btn">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="handlePage()"
              >{{$t('search')}}</Button>
            </FormItem>
            <!-- <Button v-show="showTable && pageCount > 0"
                    icon="ios-download-outline"
                    style="margin-bottom: 10px"
                    type="success"
                    @click="handleExpertData">
              {{$t('loan.search.export')}}
            </Button>-->
          </div>
        </div>
      </Form>
    </div>
    <Table
      ref="table"
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
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <Button
          type="text"
          class="fix-table-btn"
          @click="viewDetail(props.rowInfo.order_no)"
          icon="ios-eye"
          size="small"
        >{{$t('operate.viewBtn')}}</Button>
        <Poptip
          confirm
          transfer
          :title="$t('order.tableHead.confirmLoanTip')"
          @on-ok="confirm(props.rowInfo.order_no)"
        >
          <Button
            type="text"
            class="fix-table-btn"
            v-if="props.rowInfo.is_super && +props.rowInfo.status_value === 85"
            icon="md-checkmark"
            size="small"
          >{{$t('order.tableHead.confirmLoan')}}</Button>
        </Poptip>
        <Poptip
          confirm
          transfer
          :title="$t('order.tableHead.setFailTip')"
          @on-ok="setFail(props.rowInfo.order_no)"
        >
          <Button
            type="text"
            class="fix-table-btn"
            v-if="props.rowInfo.is_super && +props.rowInfo.status_value === 85"
            icon="md-close"
            size="small"
          >{{$t('order.tableHead.setFail')}}</Button>
        </Poptip>
      </template>
    </Table>
    <Alert v-show="!(showTable && pageCount > 0)">{{ $t('noData') }}</Alert>

    <Page
      :total="+total"
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import qs from 'qs'
import { Getter, Action } from 'vuex-class'
import { getchannel } from '../../api/dataReport'
import { getOrderList, getOrderInfo, retryLoan, loanFail } from '@/api/order'
import moment from 'moment'
@Component
export default class LoanList extends Vue {
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
  date = [
    moment(new Date()).format('YYYY-MM-DD'),
    moment(new Date()).format('YYYY-MM-DD'),
  ]
  searchForm = {
    page: 1,
    order_no: '',
    user_mobile: '',
    user_id: '',
    user_name: '',
    product_id: '',
    order_status: '',
    application_amount_min: null,
    application_amount_max: null,
    application_term_min: null,
    application_term_max: null,
    term_unit: '',
    time_type: '',
    begin_time: moment(new Date()).format('YYYY-MM-DD'),
    end_time: moment(new Date()).format('YYYY-MM-DD'),
    channel: 0,
    source: '',
  }
  channel = []
  get channelSources() {
    return this.channel || []
  }
  chioce(item: any) {
    this.searchForm.source = item == 'all' ? '' : item
    console.log(item, 2222)
  }
  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now()
    },
  }
  tableDefine = [
    {
      title: this.$t('loan.tableHead.orderNo'),
      align: 'center',
      key: 'order_no',
      fixed: 'left',
      minWidth: 110,
    },
    {
      title: this.$t('loan.tableHead.userName'),
      align: 'center',
      key: 'user_name',
      minWidth: 100,
    },
    { title: 'UID', align: 'center', key: 'user_id', minWidth: 100 },
    {
      title: this.$t('loan.search.productId'),
      align: 'center',
      key: 'product_id',
      minWidth: 100,
    },
    // { title: this.$t('loan.tableHead.productId'), align: 'center', key: 'productName', minWidth: 100 },
    {
      title: this.$t('loan.tableHead.applicationAmount'),
      align: 'center',
      key: 'application_amount',
      minWidth: 100,
    },
    {
      title: this.$t('loan.tableHead.applicationTerm'),
      align: 'center',
      key: 'application_term',
      minWidth: 100,
    },
    // { title: this.$t('loan.tableHead.source'), align: 'center', key: 'source', minWidth: 100 },
    // { title: this.$t('loan.tableHead.createTime'), align: 'center', key: 'create_time', minWidth: 100 },
    {
      title: this.$t('loan.tableHead.applyTime'),
      align: 'center',
      key: 'confirm_time',
      minWidth: 100,
    },
    {
      title: this.$t('loan.tableHead.orderStatus'),
      align: 'center',
      key: 'status',
      minWidth: 100,
    },
    {
      title: this.$t('operate.handle'),
      align: 'center',
      key: 'option',
      fixed: 'right',
      minWidth: 250,
      render: (h: any, params: any) => {
        return h(
          'div',
          this.$refs.table['$scopedSlots'].action({ rowInfo: params.row })
        )
      },
    },
  ]
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getList()
  }
  viewDetail(order_no: string) {
    let routeData = this.$router.resolve({
      name: 'loanDetail',
      params: {
        orderNo: order_no,
      },
    })
    window.open(routeData.href, '_blank')
  }
  confirm(orderNo: string) {
    retryLoan({ order_no: orderNo }, (res: any) => {
      if (+res.code === 0) {
        this.$Message.success({
          content: `${res.msg}`,
          onClose: (): void => {
            this._getList()
          },
        })
      }
    })
  }
  setFail(orderNo: string) {
    loanFail({ order_no: orderNo }, (res: any) => {
      if (+res.code === 0) {
        this.$Message.success({
          content: `${res.msg}`,
          onClose: (): void => {
            this._getList()
          },
        })
      }
    })
  }
  _getList() {
    this.loading = true
    getOrderList(this.searchForm, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
        const data = res.data
        this.tableData = data.list || []
        this.total = Number(data.arrPager.count)
        this.pageCount = +Number(data.arrPager.count)
        this.pageSize = +data.arrPager.pageSize
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  created() {

    if (!Object.keys(this.selectItems).length) {
      this.getSelectList()
    }
    this._getList()
  }
  timeChange(date: any) {
    this.searchForm.begin_time = date[0]
    this.searchForm.end_time = date[1]
  }
  handleExpertData() {
    const payload = Object.assign({}, this.searchForm, {
      export: 1,
      lang: window.lang,
    })
    window.open(
      window.location.origin + '/order/list?' + qs.stringify(payload),
      '_blank'
    )
  }
}
</script>
