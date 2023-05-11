c<template>
  <div class="m-orderList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('order.search.orderNo')}`">
              <Input
                type="text"
                v-model="searchForm.order_no"
                :placeholder="`${$t('inputPrefix')}${$t('order.search.orderNo')}:`"
              />
            </FormItem>
            <FormItem :label="`${$t('loan.search.mobile')}`">
              <Input
                type="text"
                v-model="searchForm.user_mobile"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.mobile')}`"
              />
            </FormItem>
            <FormItem :label="`${$t('order.search.userId')}`">
              <Input
                type="text"
                v-model="searchForm.user_id"
                :placeholder="`${$t('inputPrefix')}${$t('order.search.userId')}`"
              />
            </FormItem>
            <FormItem :label="`${$t('order.search.userName')}`">
              <Input
                type="text"
                v-model="searchForm.user_name"
                :placeholder="`${$t('inputPrefix')}${$t('order.search.userName')}`"
              />
            </FormItem>
            <FormItem :label="`${$t('order.search.productId')}`">
              <Select
                clearable
                transfer
                v-if="selectItems.product_name_map"
                v-model="searchForm.product_id"
                :placeholder="`${$t('inputPrefix')}${$t('order.search.productId')}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.product_name_map"
                >{{option.value}}</Option>
              </Select>
            </FormItem>
            
            <FormItem :label="`${$t('loan.search.orderStatus')}`">
              <Select
                clearable
                transfer
                v-if="selectItems.loan_list"
                v-model="searchForm.order_status"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.orderStatus')}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.loan_list.loan_status"
                >{{option.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('loan.search.applicationAmount')">
              <div class="overdue-warp">
                <InputNumber
                  class="overdue-input"
                  :min="1"
                  v-model="searchForm.application_amount_min"
                  placeholder="min"
                ></InputNumber>-
                <InputNumber
                  class="overdue-input"
                  :min="1"
                  v-model="searchForm.application_amount_max"
                  placeholder="Maks"
                ></InputNumber>
              </div>
            </FormItem>
            <FormItem :label="`${$t('order.search.loanTime')}`">
              <DatePicker
                v-model="date"
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd "
                @on-change="loanTimeChange"
                :placeholder="`${$t('selectPrefix')}${$t('order.search.loanTime')}`"
              ></DatePicker>
            </FormItem>
            <FormItem :label="`${$t('order.search.repayTime')}`">
              <DatePicker
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd "
                @on-change="repayTimeChange"
                :placeholder="`${$t('selectPrefix')}${$t('order.search.repayTime')}`"
              ></DatePicker>
            </FormItem>

            <!-- <FormItem :label="`${$t('order.tableHead.due_time')}`"> -->
            <!-- <DatePicker
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd HH:mm:ss"
                @on-change="repayTimeChange"
                :placeholder="`${$t('selectPrefix')}${$t('order.search.repayTime')}`">
            </DatePicker>-->
            <!-- <DatePicker type="date"
               :placeholder="`${$t('selectPrefix')}${$t('order.tableHead.due_time')}`"
                @on-change="due_time"
                 style="width: 200px">
            </DatePicker>-->
            <!-- </FormItem> -->

            <FormItem :label="$t('order.search.applicationTerm')">
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

            <!-- <FormItem :label="$t('order.search.channel')">
              <Select v-model="searchForm.channel" >
                <Option v-for="(item, index) in channelSources" :key="index" :value="index" @click.native="chioce(item)">{{item}}</Option>
              </Select>
            </FormItem>-->
            <FormItem :label="`${$t('loan.search.termUnit')}`">
              <Select
                clearable
                transfer
                v-if="selectItems.order_list"
                v-model="searchForm.term_unit"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.termUnit')}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.order_list.term_unit"
                >{{option.value}}</Option>
              </Select>
            </FormItem>

            <!-- <FormItem :label="`${$t('loan.search.insureStatus')}`" v-if="infoData.insureCompany">
              <Select
                clearable
                transfer
                v-if="infoData.insureCompany"
                v-model="searchForm.insureCompanyName"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.insureStatus')}`">
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in infoData.insureCompany">
                    {{option.value}}
                </Option>
              </Select>
            </FormItem>-->

            <FormItem
              :label="`${$t('loan.search.lenderList')}`"
              v-if="infoData.lenderList&&role.indexOf('role_super_admin') > -1"
            >
              <Select
                clearable
                transfer
                v-if="infoData.lenderList"
                v-model="searchForm.lenderId"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.lenderList')}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in infoData.lenderList"
                >{{option.value}}</Option>
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
            <Button
              v-if="role.indexOf('role_super_admin') > -1"
              slot="label"
              @click="batchInsure()"
            >{{$t('operate.goInsure')}}</Button>
            <!-- <Button v-show="showTable && pageCount > 0"
                    icon="ios-download-outline"
                    style="margin-bottom: 10px"
                    type="success"
                    @click="handleExpertData">
              {{$t('order.search.export')}}
            </Button>-->
          </div>
        </div>
      </Form>
    </div>

    <Table
      ref="table"
      border
      class="list-table"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
      @on-selection-change="selectionChange"
    >
      <template slot="action" slot-scope="props">
        <Button
          type="text"
          class="fix-table-btn"
          @click="viewDetail(props.rowInfo.order_no)"
          icon="ios-eye"
          size="small"
        >{{$t('operate.viewBtn')}}</Button>

        <Button
          v-if="role.indexOf('role_super_admin') > -1"
          :disabled="props.rowInfo.canInsure==1"
          type="text"
          class="fix-table-btn"
          icon="ios-medkit"
          size="small"
          @click="showInsure(props.rowInfo)"
        >{{ $t("operate.goInsure") }}</Button>
      </template>
    </Table>

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

    <Modal v-model="modal_Insure" :title="editTitle">
      <RadioGroup v-model="insureCompany">
        <Radio :label="item.key" v-for="(item,index) in insureCompanyOp" :key="index">{{item.value}}</Radio>
      </RadioGroup>
      <div slot="footer" class="footer">
        <Button
          type="text"
          align="center"
          style="margin-right:5px"
          @click="modal_Insure = false"
        >{{ $t("cancelText") }}</Button>
        <Button type="text" align="center" @click="goInsure()">
          {{
          $t("okText")
          }}
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import qs from 'qs'
import { Getter, Action } from 'vuex-class'
import { getLoanList, getLoanInfo, commitinsure } from '@/api/loan'
import { getchannel } from '../../api/dataReport'
import { orderStatus } from '../../api/select'
import moment from 'moment'
@Component
export default class OrderList extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  $refs!: {
    table: HTMLFormElement
  }
  role = localStorage.getItem('role')
  loading = false
  showTable = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableData = []
  orderNoS = []
  editTitle = ''
  editType = ''
  infoData = {
    insureCompany: [],
  }
  modal_Insure = false
  insureCompany = ''
  insureCompanyOp = []
  rowInfo = {
    order_no: '',
  }
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
    loan_begin_time: moment(new Date()).format('YYYY-MM-DD'),
    loan_end_time: moment(new Date()).format('YYYY-MM-DD'),
    application_term_min: null,
    application_term_max: null,
    application_amount_min: null,
    application_amount_max: null,
    term_unit: '',
    payoff_begin_time: '',
    payoff_end_time: '',
    source: '',
    channel: 0,
    due_time: '',
  }
  channel = []
  orderStatus = []
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
    { type: 'selection', width: 60, align: 'center', fixed: 'left' },
    {
      title: this.$t('order.tableHead.orderNo'),
      align: 'center',
      key: 'order_no',
      fixed: 'left',
      minWidth: 110,
    },
    {
      title: this.$t('order.tableHead.userName'),
      align: 'center',
      key: 'user_name',
      minWidth: 100,
    },
    { title: 'UID', align: 'center', key: 'user_id', minWidth: 100 },
    { title: 'product ID', align: 'center', key: 'product_id', minWidth: 100 },
    { title: 'lender ID', align: 'center', key: 'lenderId', minWidth: 100 },
    // { title: this.$t('order.tableHead.productId'), align: 'center', key: 'product_name', minWidth: 100 },
    {
      title: this.$t('order.tableHead.applicationAmount'),
      align: 'center',
      key: 'application_amount',
      minWidth: 100,
    },
    {
      title: this.$t('order.tableHead.applicationTerm'),
      align: 'center',
      key: 'term_unit',
      minWidth: 100,
    },
    // { title: this.$t('order.tableHead.source'), align: 'center', key: 'source', minWidth: 100 },
    {
      title: this.$t('order.tableHead.loanTime'),
      align: 'center',
      key: 'loan_time',
      minWidth: 100,
    },
    {
      title: this.$t('order.tableHead.repayTime'),
      align: 'center',
      key: 'payoff_time',
      minWidth: 100,
    },
    {
      title: this.$t('order.tableHead.due_time'),
      align: 'center',
      key: 'due_time',
      minWidth: 100,
    },
    {
      title: this.$t('order.tableHead.orderStatus'),
      align: 'center',
      key: 'status',
      minWidth: 100,
    },
    {
      title: this.$t('order.tableHead.insureStatusDesc'),
      align: 'center',
      key: 'insureStatusDesc',
      minWidth: 100,
    },

    {
      title: this.$t('operate.handle'),
      align: 'center',
      key: 'option',
      fixed: 'right',
      minWidth: 180,
      render: (h: any, params: any) => {
        return h(
          'div',
          this.$refs.table['$scopedSlots'].action({ rowInfo: params.row })
        )
      },
    },
  ]
  viewDetail(order_no: string) {
    let routeData = this.$router.resolve({
      name: 'orderDetail',
      params: {
        orderNo: order_no,
      },
    })
    window.open(routeData.href, '_blank')
  }
  showInsure(row) {
    this.editType = '1'
    this.editTitle = this.$t('loan.search.insureStatus').toString()
    this.modal_Insure = true
    this.insureCompanyOp = row.insureCompany
    this.insureCompany = ''
    this.rowInfo = row
  }
  goInsure(type: any) {
    var orderNoS = []
    if (this.editType == '2') {
      orderNoS = this.orderNoS
    } else {
      orderNoS = this.rowInfo.order_no.split(',')
    }

    commitinsure(
      {
        orderNoS: orderNoS,
        insureCompanyName: this.insureCompany,
      },
      (res) => {
        this.modal_Insure = false
        this.$Message.success(res.msg)
        this._getList()
      }
    )
  }
  selectionChange(row: any) {
    var orderNoS = []
    if (row) {
      row.forEach((item) => {
        orderNoS.push(item.order_no)
      })
    }
    this.orderNoS = orderNoS
  }
  batchInsure() {
    if (this.orderNoS.length > 0) {
      this.modal_Insure = true
      this.insureCompanyOp = this.infoData.insureCompany
      this.editTitle = this.$t('loan.search.batchinsureStatus').toString()
      this.editType = '2'
      //   commitinsure({
      //   orderNoS:this.orderNoS
      // },res=>{
      //   this.$Message.success(res.msg)
      //   this.orderNoS = []
      //   this._getList()
      // })
    } else {
      this.$Message.error('Silakan centang tertanggung')
    }
  }
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getList()
  }
  loanTimeChange(date: any) {
    this.searchForm.loan_begin_time = date[0]
    this.searchForm.loan_end_time = date[1]
  }
  repayTimeChange(date: any) {
    this.searchForm.payoff_begin_time = date[0]
    this.searchForm.payoff_end_time = date[1]
  }

  due_time(date: any) {
    console.log(date)
    this.searchForm.due_time = date
  }
  _getList() {
    this.loading = true
    getLoanList(this.searchForm, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
        const data = res.data
        this.infoData = data
        data.list.forEach((item, index) => {
          item.visiblePoptip = false
          item._disabled = item.canInsure == 1 ? true : false
        })
        this.tableData = data.list || []

        this.total = Number(Number(data.arrPager.count))
        this.pageCount = +Number(data.arrPager.count)
        this.pageSize = +data.arrPager.pageSize
        this.showTable = true
        this.orderNoS = []
      } else {
        this.showTable = false
      }
    })
  }
  handleExpertData() {
    const payload = Object.assign({}, this.searchForm, {
      export: 1,
      lang: window.lang,
    })
    window.open(
      window.location.origin + '/loan/list?' + qs.stringify(payload),
      '_blank'
    )
  }
  created() {

    this._getList()
  }
}
</script>
