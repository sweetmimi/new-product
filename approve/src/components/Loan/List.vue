<template>
  <div class="m-loanList">

    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <!-- <FormItem :label="`${$t('loan.search.orderNo')}`">
              <Input clearable type="text" v-model="searchForm.order_no" :placeholder="`${$t('inputPrefix')}${$t(
                  'loan.search.orderNo'
                )}`" />
            </FormItem>
            <FormItem :label="`${$t('loan.search.mobile')}`">
              <Input clearable type="text" v-model="searchForm.user_mobile"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.mobile')}`" />
            </FormItem>
            <FormItem :label="`${$t('loan.search.userId')}`">
              <Input clearable type="text" v-model="searchForm.user_id"
                :placeholder="`${$t('inputPrefix')}${$t('loan.search.userId')}`" />
            </FormItem>
            <FormItem :label="`${$t('loan.search.userName')}`">
              <Input clearable type="text" v-model="searchForm.user_name" :placeholder="`${$t('inputPrefix')}${$t(
                  'loan.search.userName'
                )}`" />
            </FormItem>
            <FormItem :label="`${$t('loan.search.productId')}`">
              <Select clearable transfer v-if="selectItems.product_name_map" v-model="searchForm.product_id"
                :placeholder="`${$t('inputPrefix')}${$t(
                  'loan.search.productId'
                )}`">
                <Option :key="index" :value="option.key" v-for="(option, index) in selectItems.product_name_map">
                  {{ option.value }}
                </Option>
              </Select>
            </FormItem> -->

            <!-- <FormItem :label="$t('loan.search.channelSource')">
              <Select v-model="searchForm.channel">
                <Option v-for="(item, index) in channelSources" :key="index" :value="index"
                  @click.native="chioce(item)">{{ item }}</Option>
              </Select>
            </FormItem> -->
            <!-- <FormItem :label="`${$t('loan.search.orderStatus')}`">
              <Select clearable transfer v-if="selectItems.order_list" v-model="searchForm.arr_status" :placeholder="`${$t('selectPrefix')}${$t(
                  'loan.search.orderStatus'
                )}`">
                <Option :key="index" :value="option.key" v-for="(option, index) in selectItems.order_list.order_status">
                  {{ option.value }}
                </Option>
              </Select>
            </FormItem> -->
            <!-- <FormItem :label="$t('loan.search.applicationAmount')">
              <div class="overdue-warp">
                <InputNumber class="overdue-input" :min="1" v-model="searchForm.application_amount_min"></InputNumber>
                -
                <InputNumber class="overdue-input" :min="1" v-model="searchForm.application_amount_max"></InputNumber>
              </div>
            </FormItem>
            <FormItem :label="$t('loan.search.applicationTerm')">
              <div class="overdue-warp">
                <InputNumber class="overdue-input" :min="1" v-model="searchForm.application_term_min"></InputNumber>
                -
                <InputNumber class="overdue-input" :min="1" v-model="searchForm.application_term_max"></InputNumber>
              </div>
            </FormItem>
            <FormItem :label="`${$t('loan.search.termUnit')}`">
              <Select clearable transfer v-if="selectItems.order_list" v-model="searchForm.term_unit" :placeholder="`${$t('selectPrefix')}${$t(
                  'loan.search.termUnit'
                )}`">
                <Option :key="index" :value="option.key" v-for="(option, index) in selectItems.order_list.term_unit">
                  {{ option.value }}
                </Option>
              </Select>
            </FormItem>

            <FormItem :label="`${$t('loan.search.timeType')}`">
              <Select clearable transfer v-if="selectItems.order_list" v-model="searchForm.time_type" :placeholder="`${$t('selectPrefix')}${$t(
                  'loan.search.timeType'
                )}`">
                <Option :key="index" :value="option.key" v-for="(option, index) in selectItems.order_list.time_type">
                  {{ option.value }}
                </Option>
              </Select>
            </FormItem> -->
            <FormItem :label="`${$t('loan.search.time')}`">
              <DatePicker transfer type="daterange" :options="timeLimitConfig" format="yyyy-MM-dd"
                @on-change="timeChange" :placeholder="`${$t('selectPrefix')}${$t('loan.search.time')}`">
              </DatePicker>
            </FormItem>
            <FormItem class="fix-form-btn">
              <Button type="primary" slot="label" :loading="loading" @click="handlePage()">{{ $t("search") }}</Button>
            </FormItem>
            <!-- <Button v-show="showTable && pageCount > 0" icon="ios-download-outline" style="margin-bottom: 10px;"
              type="success" @click="handleExpertData">
              {{ $t("loan.search.export") }}
            </Button> -->
          </div>
        </div>
      </Form>
    </div>
    <Table ref="table" border class="list-table" v-show="showTable && pageCount > 0" :data="tableData"
      :columns="tableDefine" :loading="loading">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <!-- <Button type="text" class="fix-table-btn" @click="viewDetail(props.rowInfo.order_no)" icon="ios-eye"
          size="small">{{ $t("loan.tableHead.viewBtn") }}</Button> -->
           <Button type="dashed"    :disabled='!props.rowInfo.url'   @click="Contract(props.rowInfo.url)"
          size="small">Lender Kontrak</Button>
          <Button type="dashed"   :disabled='!props.rowInfo.borrowUrl'   @click="Contract(props.rowInfo.borrowUrl)"
          size="small">Borrower Kontrak</Button>
          <Button type="dashed"    :disabled='!props.rowInfo.authorizationUrl'   @click="Contract(props.rowInfo.authorizationUrl)"
          size="small">Surat Kuasa</Button>
        <!-- <Poptip confirm transfer :title="$t('loan.tableHead.confirmLoanTip')" @on-ok="confirm(props.rowInfo.order_no)">
          <Button type="text" class="fix-table-btn" v-if="props.rowInfo.status_value == 85" icon="md-checkmark"
            size="small">{{ $t("loan.tableHead.confirmLoan") }}</Button>
        </Poptip>
        <Poptip confirm transfer :title="$t('loan.tableHead.setFailTip')" @on-ok="setFail(props.rowInfo.order_no)">
          <Button type="text" class="fix-table-btn" v-if="props.rowInfo.status_value == 85" icon="md-close"
            size="small">{{ $t("loan.tableHead.setFail") }}</Button>
        </Poptip> -->

      </template>
    </Table>
    <Alert v-show="!(showTable && pageCount > 0)">{{ $t("noData") }}</Alert>

    <Page :total="+total" :page-size="pageSize" :current.sync="searchForm.page" class-name="m-pagination"
      @on-change="handlePage" show-total v-if="pageCount > pageSize" show-elevator>
      {{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page>

  </div>
</template>

<script>
  // import {
  //   Component,
  //   Vue
  // } from 'vue-property-decorator'
  import qs from 'qs'

  // import {
  //   getList
  // } from '@/api/datareport'

  import {
    getchannel,
    getOrderList,
    getOrderInfo,
    retryLoan,
    loanFail,
    getOrderSelect
  } from '@/api/order'
  export default {
    name: "Base",

    data() {
      return {
        loading: false,
        showTable: false,
        total: 0,
        pageCount: 0,
        pageSize: 10,
        tableData: [],
        selectItems: "",
        searchForm: {
          mid: localStorage.getItem('mid'),
          lender_id: localStorage.getItem("userId"),
          page: 1,
          order_no: '',
          user_mobile: '',
          user_id: '',
          user_name: '',
          product_id: '',
          arr_status: ['40','55','60','80','90','110','120','130','140','150','160','190'],
          application_amount_min: null,
          application_amount_max: null,
          application_term_min: null,
          application_term_max: null,
          term_unit: '',
          time_type: '',
          begin_time: '',
          end_time: '',
          channel: 0,
          source: '',
        },
        channel: [],
        timeLimitConfig: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now()
          }
        },
        tableDefine: [{
            title: this.$t('loan.tableHead.orderNo'),
            align: 'center',
            key: 'order_no',
            fixed: 'left',
            minWidth: 110
          },
          // {
          //   title: this.$t('loan.tableHead.userName'),
          //   align: 'center',
          //   key: 'user_name',
          //   minWidth: 100
          // },
          // {
          //   title: this.$t('loan.tableHead.productId'),
          //   align: 'center',
          //   key: 'productName',
          //   minWidth: 100
          // },
          {
            title: this.$t('loan.tableHead.applicationAmount'),
            align: 'center',
            key: 'application_amount',
            minWidth: 100,
            // render: (h, params) =>{
            // return h('span',null,
            //   "Rp 5,490,464,607"
            // )
           // }
          },
          // {
          //   title: this.$t('loan.tableHead.applicationTerm'),
          //   align: 'center',
          //   key: 'application_term',
          //   minWidth: 100
          // },
          {
            title: this.$t('loan.tableHead.createTime'),
            align: 'center',
            key: 'create_time',
            minWidth: 100
          },
          {
            title: this.$t('loan.tableHead.applyTime'),
            align: 'center',
            key: 'confirm_time',
            minWidth: 100
          },
          {
            title: this.$t('loan.tableHead.orderStatus'),
            align: 'center',
            key: 'status',
            minWidth: 100
          },
          {
            title: this.$t('loan.tableHead.operate'),
            align: 'center',
            key: 'option',
            fixed: 'right',
            minWidth: 280,
            render: (h, params) => {
              return h('div', this.$refs.table['$scopedSlots'].action({
                rowInfo: params.row
              }))
            }
          }
        ],
        get channelSources() {
          return this.channel || []
        }
      }
    },
    methods: {
      getSelectList() {
        getOrderSelect({
          mid: localStorage.getItem('mid'),

        }, res => {
          if (+res.status === 0) {
            this.selectItems = res.data
          }
        })
      },
      chioce(item) {

        this.searchForm.source = item == 'all' ? '' : item
        console.log(item, 2222);
      },

      handlePage(pageIndex) {
        this.searchForm.page = pageIndex || 1
        this._getList()
      },
      Contract(url){
        window.open(url)
      },
      viewDetail(order_no) {
        let routeData = this.$router.resolve({
          name: 'loanDetail',
          params: {
            orderNo: order_no
          }
        })
        window.open(routeData.href, '_blank');
      },
      confirm(orderNo) {
        retryLoan({

          order_no: orderNo
        }, (res) => {
          if (+res.code === 0) {
            this.$Message.success({
              content: `${res.msg}`,
              onClose: () => {
                this._getList()
              }
            })
          }
        })
      },
      setFail(orderNo) {
        loanFail({

          order_no: orderNo
        }, (res) => {
          if (+res.code === 0) {
            this.$Message.success({
              content: `${res.msg}`,
              onClose: () => {
                this._getList()
              }
            })
          }
        })
      },
      _getList() {
        this.loading = true
        getOrderList(this.searchForm, (res) => {
          this.loading = false
          if (+res.status === 0) {
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
      },

      timeChange(date) {
        if(date&&date.length>0){
          this.searchForm.begin_time = date[0]+' 00:00:00'
          this.searchForm.end_time = date[1]+' 23:59:59'
        }
      },
      handleExpertData() {
        const payload = Object.assign({}, this.searchForm, {
          export: 1,
          lang: window.lang
        })
        window.open(window.location.origin + '/order/list?' + qs.stringify(payload), '_blank')
      },
    },
    created() {
      getchannel({}, (res) => {


        let tableData = []
        if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
          for (let k in res.data.data) {
            tableData.push(res.data.data[k])

          }
        } else {
          tableData = res.data.data
        }
        tableData.splice(0, 0, this.$t('all'))
        this.channel = tableData
        console.log(tableData, 444)

      })

      this.getSelectList()

      this._getList()
    }



  }

</script>
