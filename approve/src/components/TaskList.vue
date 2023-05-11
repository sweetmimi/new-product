<template>

  <div id="TaskList" class="m-taskList">

    <Form ref="formInline" :model="searchFormInfo" :label-width="120">
      <Row type="flex">
         <!-- <FormItem :label="$t('approvalTask.serachBlock.orderId')" prop="orderNo">
            <Input v-model="searchFormInfo.orderNo" :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.orderId')}`"></Input>
          </FormItem>
          <FormItem :label="$t('approvalTask.serachBlock.customerName')">
            <Input v-model="searchFormInfo.name" :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.customerName')}`"></Input>
          </FormItem>
          <FormItem :label="$t('approvalTask.serachBlock.channel')" >
            <Select v-if="listSelect.approveList" clearable transfer  v-model="searchFormInfo.channel" :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.channel')}`">
              <Option v-for="(item, index) in listSelect.approveList.channel" :value="item.key" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('approvalTask.serachBlock.productName')" >
            <Select v-if="listSelect.approveList" clearable transfer  v-model="searchFormInfo.productId" :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.productName')}`">
              <Option v-for="(item, index) in listSelect.approveList.product" :value="item.key" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('approvalTask.serachBlock.followUpState')">
            <Select v-if="listSelect.myTaskList" clearable transfer  v-model="searchFormInfo.midStatus" :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.followUpState')}`">
              <Option v-for="(item, index) in listSelect.myTaskList.midStatus" :value="item.key" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem  :label="$t('approvalTask.serachBlock.timeType')">
            <Select v-if="listSelect.myTaskList" clearable transfer  v-model="searchFormInfo.timeType" :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.timeType')}`">
              <Option v-for="(item, index) in listSelect.myTaskList.timeType" :value="item.key" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem> -->
          <FormItem :label="$t('approvalTask.serachBlock.timeRange')">
            <DatePicker
              style="width: 200px"
              class="m-date-picker"
              type="daterange"
              :options="timeLimitConfig"
              format="yyyy-MM-dd"
              v-model="initDate"
              @on-change="handleTimeChange"
              :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.timeRange')}`" />
          </FormItem>
          <FormItem class="fix-form-btn">

            <Button
              style="margin-left:200px"
              class="search-btn"
              slot="label"
              type="primary"
              :disabled="searching"
              @click="handleSearch">
                <span v-if="!searching">{{$t('approvalTask.serachBlock.search')}}</span>
                <span v-else>{{`${searchWait}${$t('approvalTask.serachBlock.remain')}`}}</span>
              </Button>
          </FormItem>
      </Row>
    </Form>
    <Table
      border
      v-if="showTable"
      :data="tableData"
      :columns="tableDefine"
      :loading="tableLoading"
      :row-class-name="rowClassName"
      :no-data-text="$t('approvalTask.tableBlock.noDataTip')">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
    <Page :total="total"
        :current.sync="searchFormInfo.page"
        :page-size="size"
        v-if="total > size"
        class-name="m-pagination"
        show-total
        @on-change="handleUpdateTable"
        show-elevator>{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
  </div>
</template>
<script>
import { getTaskList } from '@/api'
import { formatMoney } from '@/common/js/common'
import { mapGetters, mapActions } from 'vuex'
let timer = null
export default {
  data () {
    return {
      total: 0,
      size: 10,
      tableData: [],
      initDate: [],
      searchWait: 60,
      searching: false,
      showTable: true,
      tableLoading: false,
      tableDefine: [
        {
          title: this.$t('approvalTask.tableBlock.orderId'),
          align: 'center',
          key: 'orderNo',
          fixed: 'left',
          minWidth: 150
        },
        {
          title: this.$t('approvalTask.tableBlock.customerName'),
          align: 'center',
          key: 'name',
          minWidth: 150
        },
        // {
        //   title: this.$t('approvalTask.tableBlock.sourceChannel'),
        //   align: 'center',
        //   key: 'sourceChannel',
        //   minWidth: 150
        // },
        {
          title: this.$t('approvalTask.tableBlock.city'),
          align: 'center',
          key: 'city',
          minWidth: 150
        },
        {
          title: this.$t('approvalTask.tableBlock.orderAmount'),
          align: 'center',
          key: 'loanAmount',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.loanAmount))
          }
        },
        {
          title: this.$t('approvalTask.tableBlock.applyTime'),
          align: 'center',
          key: 'applyTime',
          minWidth: 150
        },
        // {
        //   title: this.$t('approvalTask.tableBlock.orderDistributionTime'),
        //   align: 'center',
        //   key: 'fendanTime',
        //   minWidth: 150
        // },
        {
          align: 'center',
          title: this.$t('approvalTask.tableBlock.followUpState'),
          key: 'midStatus',
          minWidth: 150
        },
        {
          title: this.$t('approvalTask.tableBlock.action'),
          key: 'handle',
          align: 'center',
          fixed: 'right',
          width: window.lang === "zh-cn" ? 180 : 220,
          render: (h, params) => {
            return h('div',[
            // h(
            //   'div',
            //   { class: 'fix-change-color' },
            //   [
            //     h(
            //       'Icon',
            //       {
            //         props: {
            //           type: 'eye'
            //         },
            //         class: 'fix-table-view-icon ivu-btn-text',
            //       }
            //     ),
            //     h(
            //       'a',
            //       {
            //         class: 'ivu-btn-text ivu-view-text',
            //         attrs: {
            //           'href':  `/approval/detail/view_${params.row.id}?isRecheck=${params.row.isRecheck}`,
            //           'target': '_blank'
            //         }
            //       },
            //       this.$t('approvalTask.tableBlock.view')
            //     ),
            //   ]
            //   ),
              // h('div', {
              //   class: ['border-line']
              // }),
              h('div',
              { class: 'fix-change-color' },
              [
                h(
                'Icon',
                {
                  props: {
                    type: 'edit'
                  },
                  class: 'fix-table-check-icon  ivu-btn-text',
                }
              ),
              h(
                'a',
                {
                  class: 'ivu-btn-text ivu-check-text',
                  attrs: {
                    'href':  `/approval/detail/check_${params.row.id}?isRecheck=${params.row.isRecheck}`,
                    'target': '_blank'
                  }
                },
                this.$t('approvalTask.tableBlock.approval')
              )
              ])

            ])
          }
        }
      ],
      timeLimitConfig: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      searchFormInfo: {
        orderNo: '',
        name: '',
        midStatus: '',
        timeType: 1,
        startTime: '',
        endTime: '',
        channel: '',
        productId: '',
        page: 1
      }
    }
  },
  computed: {
    ...mapGetters(['onlineStatus', 'listSelect', 'userInfo'])
  },
  methods: {
    ...mapActions(['setOnlineStatus']),

    _fetchData (query) {
      this.tableLoading = true
      getTaskList({
        query: query
      }, res => {
        this.tableLoading = false
        if (+res.status === 0) {
          this.total = +res.data.arrPager.count
          this.showTable = true
          this.tableData = res.data.arrApproveTask.sort((cur, next) => {
            return +next.isUrgent - cur.isUrgent
          })
        } else {
          clearInterval(timer)
          this.searchWait = 60
          this.searching = false
          this.showTable = false
        }
      })
    },
    _format(day) {
      let largeDate = new Date()
      let largeTime = `${largeDate.getFullYear()}-${largeDate.getMonth()+1}-${largeDate.getDate()}`
      let smallDate = new Date(largeDate)

      smallDate.setDate(largeDate.getDate() + day)
      let smallTime = `${smallDate.getFullYear()}-${smallDate.getMonth()+1}-${smallDate.getDate()}`
      this.searchFormInfo.startTime = `${smallTime} 00:00:00`
      this.searchFormInfo.endTime = `${largeTime} 23:59:59`
      this.initDate = [
        new Date(this.searchFormInfo.startTime),
        new Date(this.searchFormInfo.endTime),
      ]
    },

    handleTimeChange (date) {
      this.searchFormInfo.startTime = date[0]
      this.searchFormInfo.endTime = date[1]
    },

    handleSearch () {
      if (!this.searching) {
        this.handleUpdateTable()
        this.searching = true
        this.searchWait = 60
      }
      clearInterval(timer)
      timer = setInterval(() => {
        if (this.searchWait > 1) {
          this.searchWait--
        } else {
          clearInterval(timer)
          this.searching = false
        }
      }, 1000)
    },

    handleUpdateTable (pageIndex) {
      this.searchFormInfo.page = pageIndex || 1
      this._fetchData(this.searchFormInfo)
    },

    toCollection () {
      this.$router.push({
        name: 'tasklist'
      })
    },

    _showOnlineModal () {
      if ((this.userInfo.staffRole).indexOf('role_approver') > -1 && (this.userInfo.staffRole).indexOf('role_approve_admin') == -1){
      this.$Modal.warning({
        onOk: () => {
          const onlineFlag = 1
          this.setOnlineStatus({
            'onlineStatus': onlineFlag
          })
        },
        closable: true,
        content: this.$t('approvalTask.offlineBloack.tips')
      })
      }
    },

    rowClassName (row) {
      return +row.isUrgent === 1 ? 'm-table-top-row' : ''
    }
    ,
  },
  beforeRouteEnter (to, form, next) {
    next(vm => {
      if (+vm.onlineStatus === 0) {
        try {
          vm._showOnlineModal()
        } catch (error) {

        }

      }
    })
 },
  created () {
    this._format(-6)
    this._fetchData(this.searchFormInfo)
  },

  destroyed () {
    timer = null
  }
}
</script>

<style scoped lang="scss">
.m-taskList {
  .ivu-btn {
    border-color: none;
  }


}
</style>
<style lang="scss">
.m-taskList {
  .ivu-form-item-content {
    width:170px;
  }
  .fix-table-view-icon {
    margin-top: 3px;
    margin-left: 20px;
    float: left;
  }
  .fix-table-check-icon {
    margin-top: 3px;
    margin-left: 10px;
    float: left;
  }
  .ivu-check-text {
    margin-left: 5px;
    float: left;
  }
  .ivu-view-text {
    margin-right: 9px;
    margin-left: 5px;
    float: left;
  }
  .fix-change-color {
    &:hover {
      .ivu-btn-text {
        color: #2d8cf0;
      }
    }
  }
}
</style>
