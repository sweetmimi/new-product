<template>
  <div id="TaskHistory" class="m-taskHistory">
    <Form ref="taskHistory" :model="searchFormInfo" :label-width="120">
      <Row type="flex">
        <FormItem :label="$t('approvalTask.serachBlock.orderId')" prop="orderNo">
          <Input v-model="searchFormInfo.orderNo" :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.orderId')}`"></Input>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.customerName')">
          <Input v-model="searchFormInfo.name" :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.customerName')}`"></Input>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.orderAmount')" prop="loanAmount">
          <Input v-model="searchFormInfo.loanAmount" :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.orderAmount')}`"></Input>
        </FormItem>
        <!-- <FormItem :label="$t('approvalTask.serachBlock.channel')" >
            <Select v-if="listSelect.approveList" clearable transfer  v-model="searchFormInfo.channel" :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.channel')}`">
              <Option v-for="(item, index) in listSelect.approveList.channel" :value="item.key" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem> -->
          <FormItem :label="$t('approvalTask.serachBlock.productName')" >
            <Select v-if="listSelect.approveList" clearable transfer  v-model="searchFormInfo.productId" :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.productName')}`">
              <Option v-for="(item, index) in listSelect.approveList.product" :value="item.key" :key="index">{{item.value}}</Option>
            </Select>
          </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.followUpState')">
          <Select v-if="listSelect.taskHistoryList" clearable transfer  v-model="searchFormInfo.midStatus" :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.followUpState')}`">
            <Option v-for="(item, index) in listSelect.taskHistoryList.midStatus" :value="item.key" :key="index">{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.timeType')">
          <Select v-if="listSelect.taskHistoryList" clearable transfer  v-model="searchFormInfo.timeType" :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.timeType')}`" >
            <Option v-for="(item, index) in listSelect.taskHistoryList.timeType" :value="item.key" :key="index">{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.timeRange')">
          <DatePicker
            class="m-date-picker"
            type="daterange"
            :options="timeLimitConfig"
            format="yyyy-MM-dd"
            v-model="initDate"
            @on-change="handleTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.timeRange')}`" />
        </FormItem>
        <FormItem class="fix-form-btn" :label-width="100">
          <Button type="primary" slot="label" :loading="loading" @click="handlePage()">{{$t('approvalTask.serachBlock.search')}}</Button>
        </FormItem>
      </Row>
    </Form>
    <Table
      border
      v-if="showTable"
      :columns="historyList"
      :data="historyOrderList"
      :loading="loading">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
    <Page
    :total="total"
    :page-size="size"
    :current.sync="searchFormInfo.page"
    class-name="m-pagination"
    @on-change="handlePage"
    show-total
    show-elevator>{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { formatMoney } from '@/common/js/common'
import {gethistoryTaskList} from '../api/index'
export default {
  name: 'history',
  data () {
    return {
      total: 0,
      size: 10,
      loading: true,
      showTable: true,
      orderStatusList: [],
      initDate: [],
      productList: [],
      searchFormInfo: {
        orderNo: '',
        name: '',
        timeType: 1,
        loanAmount: '',
        startTime: '',
        endTime: '',
        channel: '',
        productId: '',
        followUpState: '',
        page: 1
      },
      historyList: [
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
          minWidth: 120
        },
        {
          title: this.$t('approvalTask.tableBlock.city'),
          align: 'center',
          key: 'city',
          minWidth: 150
        },
        {
          title: "Ganti Ke Jumlah Pendanaan",
          align: 'center',
          key: 'loanAmount',
          minWidth: 120,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.loanAmount))
          }
        },
        {
          title: this.$t('approvalTask.tableBlock.applyTime'),
          align: 'center',
          key: 'applyTime',
          minWidth: 120
        },
        // {
        //   title: this.$t('approvalTask.tableBlock.orderDistributionTime'),
        //   align: 'center',
        //   key: 'fendanTime',
        //   minWidth: 120
        // },
        {
          title: this.$t('approvalTask.tableBlock.approveTime'),
          align: 'center',
          key: 'submitTime',
          minWidth: 120
        },
        {
          title: this.$t('approvalTask.tableBlock.followUpState'),
          align: 'center',
          key: 'midStatus',
          minWidth: 120
        },
        // {
        //   title: this.$t('listModule.handle'),
        //   key: 'handle',
        //   align: 'center',
        //   fixed: 'right',
        //   minWidth: 120,
        //   render: (h, params) => {
        //     return h('div', { class: 'fix-change-color'
        //     },[
        //       h(
        //         'Icon',
        //         {
        //           props: {
        //             type: 'eye'
        //           },
        //           class: 'fix-table-btn ivu-btn-text',
        //         }
        //       ),
        //       h('a', {
        //         class: 'ivu-btn-text fix-table-btn',
        //         attrs: {
        //             'href':  `/approval/detail/view_${params.row.id}`,
        //             'target': '_blank'
        //         }
        //       }, this.$t('listModule.viewBtn'))
        //     ])
        //   }
        // }
      ],
      historyOrderList: [],
      timeLimitConfig: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },

  computed: {
    ...mapGetters(['onlineStatus', 'listSelect'])
  },

  mounted () {
    this._format(-6)
    this.handlePage()
  },

  methods: {
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
    handlePage (pageIndex) {
      this.searchFormInfo.page = pageIndex || 1
      this.loading = true
      gethistoryTaskList({
        query: this.searchFormInfo
      }, (data) => {
        this.loading = false
        if (+data.status === 0) {
          this.historyOrderList = data.data.arrApproveHistory
          this.total = +data.data.arrPager.count
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.m-taskHistory {
  .m-page {
    margin-top: 40px;
    text-align: center;
  }
  .search {
    margin-left: 68px;
  }
  .align-right {
    text-align: right;
  }
  .margin-bottom {
    margin-top: 10px;
  }
  .ivu-modal-footer {
    text-align: center;
  }
}
</style>
<style lang="scss">
.m-taskHistory {
  .ivu-form-item-content {
    width:170px;
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
