<template>
    <div id="ApprovalList" class="m-approvalList">
  
      <Form ref="formInline" :model="searchFormInfo" :label-width="110">
        <Row type="flex" justify="start" align="middle">
          <FormItem :label="$t('approvalDetail.dataReport.loverallData.searchBlock.phone')" v-show="false">
            <Input v-model="searchFormInfo.phone" :placeholder="`${$t('inputPrefix')}${$t('approvalDetail.dataReport.loverallData.searchBlock.phone')}`" />
          </FormItem>
          <FormItem :label="$t('approvalDetail.dataReport.loverallData.searchBlock.name')">
            <Input v-model="searchFormInfo.name" :placeholder="`${$t('inputPrefix')}${$t('approvalDetail.dataReport.loverallData.searchBlock.name')}`" />
          </FormItem>
          <FormItem :label="$t('approvalDetail.dataReport.loverallData.searchBlock.date')">
            <DatePicker
              class="m-date-picker"
              type="daterange"
              :options="timeLimitConfig"
              format="yyyy-MM-dd "
              v-model="initDate"
              @on-change="handleTimeChange"
              :placeholder="`${$t('selectPrefix')}${$t('approvalDetail.dataReport.loverallData.searchBlock.date')}`" />
          </FormItem>
          <FormItem  class="fix-form-btn" >
            <span slot="label">
              <Button type="primary" :loading="loading.tableLoading" @click="handleUpdateTable()">{{$t('approvalTask.serachBlock.search')}}</Button>
            </span>
          </FormItem>
        </Row>
      </Form>
      <div v-if="showTable" class="approval-table-warp">
        <Table
          border
          :data="tableData"
          :columns="tableDefine"
          :row-class-name="rowClassName"
          :loading="loading.tableLoading">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
      </div>
      <Page :total="pageCount"
        :current.sync="searchFormInfo.page"
        :page-size="size"
        v-if="pageCount > size"
        class-name="m-pagination"
        show-total
        @on-change="handleUpdateTable"
        show-elevator>{{$t('pageSlot.total')}} {{pageCount}} {{$t('pageSlot.count')}}</Page>

    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/datareport'
export default {
  data () {
    return {
      size: 10,
      pageCount: 0,
      showTable: true,
      loading: {
        tableLoading: false,
        principalLoading: false
      },
      tableDefine: [
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.name'),
          align: 'center',
          key: 'userName',
          minWidth: 150
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.phone'),
          align: 'center',
          key: 'mobile',
          minWidth: 100
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.firstNum'),
          align: 'center',
          key: 'approveCount',
          minWidth: 100
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.firstRefuse'),
          align: 'center',
          key: 'approveReject',
          minWidth: 100
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.firstPass'),
          align: 'center',
          key: 'approvePass',
          minWidth: 100
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.loanNum'),
          align: 'center',
          key: 'paySuccess',
          minWidth: 100
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.loanRate'),
          align: 'center',
          key: 'loanRate',
          minWidth: 100
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.refundedNum'),
          align: 'center',
          key: 'repayTotal',
          minWidth: 100
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.refundsNum'),
          align: 'center',
          key: 'repayCount',
          minWidth: 100
        },
        {
          title: this.$t('approvalDetail.dataReport.loverallData.tableBlock.refundsRate'),
          align: 'center',
          key: 'repayRate',
          minWidth: 100
        }
      ],
      searchFormInfo: {
        phone: '',
        name: '',
        startTime: '',
        endTime: '',
        page: 1
      },
      initDate: [],
      curApprover: '',
      approverForm: {
        approveId: [],
        checkUserId: '',
        checkUserName: ''
      },
      tableData: [],
      principalList: [],
      approverModal: false,
      timeLimitConfig: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },

  computed: {
    ...mapGetters(['listSelect', 'userInfo'])
  },

  mounted () {
    this._format(-6)
    this.handleUpdateTable()
  },

  methods: {
    _fetchData (query) {
      this.loading.tableLoading = true
      getList({
        ...query
      }, res => {
        this.loading.tableLoading = false
        if (+res.status === 0) {
          this.tableData = res.data
          // this.pageCount = +res.arrPager.count
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    },
    _format (day) {
      let largeDate = new Date()
      let largeTime = `${largeDate.getFullYear()}-${largeDate.getMonth() + 1}-${largeDate.getDate()}`
      let smallDate = new Date(largeDate)

      smallDate.setDate(largeDate.getDate() + day)
      let smallTime = `${smallDate.getFullYear()}-${smallDate.getMonth() + 1}-${smallDate.getDate()}`
      this.searchFormInfo.startTime = `${smallTime} 00:00:00`
      this.searchFormInfo.endTime = `${largeTime} 23:59:59`
      this.initDate = [
        new Date(this.searchFormInfo.startTime),
        new Date(this.searchFormInfo.endTime)
      ]
    },
    handleTimeChange (date) {
      this.searchFormInfo.startTime = date[0]
      this.searchFormInfo.endTime = date[1]
    },
    handleUpdateTable (pageIndex) {
      this.searchFormInfo.page = pageIndex || 1
      this._fetchData(this.searchFormInfo)
    },

    rowClassName (row) {
      return +row.isUrgent === 1 ? 'm-table-top-row' : ''
    }
  }
}
</script>

<style scoped lang="scss">
.m-approvalList {
  .radio-control {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .approval-table-warp {
    position: relative;
    margin-top: 30px;
    .export-btn {
      position: absolute;
      right: 10px;
      top: -40px;
    }
    .batch-btn {
      position: absolute;
      right: 140px;
      top: -40px;
    }
  }
}
</style>
<style lang="scss">
.m-approvalList {
  .ivu-form-item-content {
    width:170px;
  }
  .fix-table-view-icon {
    margin-left: 10px;
  }
  .fix-table-view {
    margin: 0 0 0 5px;
  }
  .fix-change-color {
    float: left;
    margin-left: 10px;
    &:hover {
      .ivu-btn-text {
        color: #2d8cf0;
      }
    }
  }
}
</style>
