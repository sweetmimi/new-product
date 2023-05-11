<template>
  <div id="collectRecord" class="m-collectRecord">
    <Tabs type="card" :value="activeTab" @on-click="toggleTab" class="smallTab" :animated="false" name="innerTabs">

      <TabPane :label="$t('taskDetail.collectRecordTab.contractRecord.title')" tab="innerTabs">
        <Table  border :columns="contractRecordColumns" v-if="showContractList" :loading="contractRecordLoading" :data="contractRecordList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
        <Page
          show-total
          show-elevator
          :total="operate.total"
          :page-size="operate.size"
          :current.sync="operate.page"
          class="m-pagination"
          v-if="operate.total > operate.size"
          @on-change="callHandlePage">
            {{$t('pageSlot.total')}} {{operate.total}} {{$t('pageSlot.count')}}
        </Page>
        <Modal
          align="left"
          :okText="$t('taskDetail.collectFollowUp.add')"
          :cancelText="$t('cancelText')"
          v-model="audioModal">
          <div slot="header" class="header">
            {{$t('taskDetail.modelMsg.audioTitle')}}
          </div>
          <Form ref="formInline" :label-width="75">
            <Row>
              <Col span="22">
                <FormItem>
                  <Col offset="1">
                    <audio :src="audioSrc" class="audio" controls="controls"></audio>
                  </Col>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div slot="footer" class="footer">
            <Button @click="cancelAudio" align="center">{{$t('cancelText')}}</Button>
          </div>
        </Modal>
      </TabPane>

      <TabPane :label="$t('taskDetail.collectRecordTab.approvalRecord.title')" tab="innerTabs">
        <Table  border :columns="approvalRecordColumns" v-if="showPathList" :loading="approvalRecordLoading" :data="approvalRecordList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
        <div class="tab-warp">
          <Row align="middle" >
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.otherMobile') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.otherMobile }}</Col>
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.currentAddr') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.currentAddr }}</Col>
          </Row>
          <Row align="middle" >
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.maritalStatus') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.maritalStatus }}</Col>
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.organization') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.organization }}</Col>
          </Row>
          <Row align="middle" >
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.monthlyIncome') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.monthlyIncome }}</Col>
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.repayDay') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.repayDay }}</Col>
          </Row>
          <Row align="middle" >
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.companyAddress') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.companyAddress }}</Col>
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.curWorkContactType') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.curWorkContactType }}</Col>
          </Row>
          <Row align="middle" >
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.hasOtherLoan') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.hasOtherLoan }}</Col>
            <Col span="6" class-name="col-style title">{{ $t('taskDetail.collectRecordTab.approvalRecord.totalAmount') }}</Col>
            <Col span="6" class-name="col-style">{{ phoneReviewInfo.totalAmount }}</Col>
          </Row>
        </div>
      </TabPane>

      <TabPane :label="$t('taskDetail.collectRecordTab.operateRecord.title')" tab="innerTabs">
        <Table  border :columns="operateHistoryColumns" v-if="showPathList" :loading="operateHistoryLoading" :data="operateHistoryList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
        <Page
          show-total
          show-elevator
          :total="operate.total"
          :page-size="operate.size"
          :current.sync="operate.page"
          class="m-pagination"
          v-if="operate.total > operate.size"
          @on-change="operateHandlePage">
            {{$t('pageSlot.total')}} {{operate.total}} {{$t('pageSlot.count')}}
        </Page>
      </TabPane>

      <TabPane :label="$t('taskDetail.collectRecordTab.daihouLog.title')" tab="innerTabs">
        <Table  border :columns="daihouLogColumns" v-if="showDaihouLogList" :loading="daihouLogLoading" :data="daihoulogList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
      </TabPane>

       <TabPane
        :label="$t('taskDetail.collectRecordTab.daihouHis.title')"
        tab="innerTabs"
      >
        <Table
          border
          :columns="daihouHistoryColumns"
          v-if="showdaihouHistoryList"
          :loading="daihouHistoryLoading"
          :data="daihouHistoryList"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{ $t("loadingText") }}</div>
          </Spin>
        </Table>
      </TabPane>

      <TabPane :label="$t('taskDetail.collectRecordTab.repaymentPlan.title')" tab="innerTabs">
        <Table  border :columns="repaymentColumns" v-if="showRepaymentList" :loading="repaymentLoading" :data="repaymentList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
      </TabPane>

    </Tabs>
  </div>
</template>
<script>
import { formatMoney } from '@/common/js/common'
import { getCuiShouList, getCollectRecord, getRepaymenPlanList, getCallList } from '@/api'
import { getApproveList, getOperateList, getPhoneReview } from '@/api/task'
import {getIvrLogList,getDaihouHistoryList} from '@/api/daihoutask'
export default {
  name: 'taskRecord',
  props: {
    activeTab: {
      type: Number
    },
    daihouTaskId	: {
      type: String | Number
    },
    Uvr:{
       type: String | Number
    }
  },
  data () {
    return {
      audioSrc: '',
      audioModal: false,
      repaymentLoading: false,
      recordLoading: false,
      contractRecordLoading: false,
      collectionPathLoading: false,
      approvalRecordLoading: false,
      operateHistoryLoading: false,
      daihouLogLoading: false,
      repaymentLoading: false,
      daihouHistoryLoading: false,
      // showRecordList: true,
      showRepaymentList: true,
      showContractList: true,
      showPathList: true,
      showApprovalList: true,
      showOperateList: true,
      showDaihouLogList: true,
      showRepaymentList: true,
      showdaihouHistoryList: true,

      recordList: [],
      repaymentList: [],
      contractRecordList: [],
      collectionPathList: [],
      approvalRecordList: [],
      operateHistoryList: [],
      daihouHistoryList:[],
      daihoulogList: [],
      repaymentList: [],

      operate: {
        total: '',
        size: 10,
        page: 1
      },


      contractRecordColumns: [
        {
          title: this.$t('taskDetail.collectRecordTab.contractRecord.startTime'),
          key: 'startTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.contractRecord.endTime'),
          key: 'endTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.contractRecord.whoCall'),
          key: 'whoCall',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.contractRecord.callMonthod'),
          key: 'callType',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.contractRecord.callStatus'),
          key: 'callStatus',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.contractRecord.dialPerson'),
          key: 'createUser',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.contractRecord.dialNumber'),
          key: 'called',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectFollowUp.relationship'),
          key: 'contactType',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('listModule.handle'),
          key: 'handle',
          align: 'center',
          fixed: 'right',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                  icon: 'volume-low',
                  disabled: !params.row.recordUrl
                },
                class: 'fix-table-btn',
                on: {
                  click: () => {
                    this._playaudio(params.row)
                  }
                }
              }, params.row.recordUrl
              ? this.$t('taskDetail.collectRecordTab.contractRecord.record')
              : this.$t('taskDetail.collectRecordTab.approvalRecord.noRecord'))
            ])
          }
        }
      ],
      approvalRecordColumns: [
        {
          title: this.$t('taskDetail.collectRecordTab.approvalRecord.callNo'),
          key: 'callNo',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.approvalRecord.callStatus'),
          key: 'callStatus',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.approvalRecord.startTime'),
          key: 'startTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.approvalRecord.endTime'),
          key: 'endTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('listModule.handle'),
          key: 'handle',
          align: 'center',
          fixed: 'right',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                  icon: 'volume-low',
                  disabled: !params.row.recordUrl
                },
                class: 'fix-table-btn',
                on: {
                  click: () => {
                    this._playaudio(params.row)
                  }
                }
              }, params.row.recordUrl
              ? this.$t('taskDetail.collectRecordTab.approvalRecord.playRecord')
              : this.$t('taskDetail.collectRecordTab.approvalRecord.noRecord'))
            ])
          }
        }
      ],
      operateHistoryColumns: [
        {
          title: this.$t('taskDetail.collectRecordTab.operateRecord.operateTime'),
          key: 'operateTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.operateRecord.operateType'),
          key: 'operateType',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.operateRecord.content'),
          key: 'content',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.operateRecord.operators'),
          key: 'opChannel',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.operateRecord.operateor'),
          key: 'operateor',
          align: 'center',
          minWidth: 150
        }
      ],
      daihouLogColumns: [
        {
          title: this.$t('taskDetail.collectRecordTab.daihouLog.contactTime'),
          key: 'contactTime',
          align: 'center',
          minWidth: 120
        },
        {
          title: this.$t('taskDetail.collectRecordTab.daihouLog.update_time'),
          key: 'update_time',
          align: 'center',
          minWidth: 120
        },
        {
          title: this.$t('taskDetail.collectRecordTab.daihouLog.followResult'),
          key: 'followResult',
          align: 'center',
          minWidth: 100
        },
        {
          title: this.$t('taskDetail.collectRecordTab.daihouLog.remark'),
          key: 'call_times',
          align: 'center',
          minWidth: 120
        },
        {
          title: this.$t('taskDetail.collectRecordTab.daihouLog.operateUser'),
          key: 'operateUser',
          align: 'center',
          minWidth: 120
        }
      ],
        daihouHistoryColumns: [
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.changeTime"),
          key: "changeTime",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.contactUser"),
          key: "contactUser",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.contactRelation"),
          key: "contactRelation",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.followResult"),
          key: "followResult",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.followRepayWish"),
          key: "followRepayWish",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.remark"),
          key: "remark",
          align: "center",
          minWidth: 150
        },
         {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.createUser"),
          key: "createUser",
          align: "center",
          minWidth: 150
        }

      ],
      repaymentColumns: [
        {
          title: this.$t('taskDetail.overdueCondition.periodNo'),
          key: 'periodNo',
          align: 'center',
          fixed: 'left',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.receivableDate'),
          key: 'dueTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.paymentDate'),
          key: 'repayDate',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.corpus'),
          key: 'principal',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.principal))
          }
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.interest'),
          key: 'interest',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.interest))
          }
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.managementCost'),
          key: 'oneTimeManagementFee',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.oneTimeManagementFee))
          }
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.overdueNewCost'),
          key: 'overdueInterest',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.overdueInterest))
          }
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.rolloverServiceFee'),
          key: 'rolloverServiceFee',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.rolloverServiceFee))
          }
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.amountReturned'),
          key: 'repayedAmount',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.repayedAmount))
          }
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.receivableAmount'),
          key: 'currentPlanAllAmount',
          align: 'center',
          minWidth: 160,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.currentPlanAllAmount))
          }
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.remainAmount'),
          key: 'remainAmount',
          align: 'center',
          minWidth: 160,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.remainAmount))
          }
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.status'),
          key: 'repayStatus',
          align: 'center',
          minWidth: 160
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.overDays'),
          key: 'dueDate',
          align: 'center',
          fixed: 'right',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectRecordTab.repaymentPlan.remark'),
          key: 'remark',
          align: 'center',
          minWidth: 160
        }
      ],
      phoneReviewInfo: {
        otherMobile: '',
        currentAddr: '',
        maritalStatus: '',
        organization: '',
        monthlyIncome: '',
        repayDay: '',
        companyAddress: '',
        curWorkContactType: '',
        hasOtherLoan: '',
        totalAmount: ''
      }
    }
  },

  methods: {
    cancelAudio() {
      this.audioSrc = ''
      this.audioModal = false
    },
    operateHandlePage() {
      this._getOperateList();
    },
    callHandlePage() {
      this._getCallList();
    },
    _playaudio (item) {
      this.audioSrc = item.recordUrl
      this.audioModal = true
    },
    _getOperateList () {
      this.operateHistoryLoading = true
       let  Info = this.Uvr == '2' ?  {ivrTaskId: this.daihouTaskId,page: this.operate.page,} :
     { daihouTaskId : this.daihouTaskId,page: this.operate.page,}
      getOperateList(Info, (res) => {
        if (+res.status === 0) {
          const data = res.data
          this.operateHistoryLoading = false
          if (data.operateList) {
            this.operateHistoryList = data.operateList
            this.operate.total = data.arrPager.count
            this.showoperateList = true
          }
        } else {
          this.showoperateList = false
        }
      })
    },
    _getApproveList () {
      this.approvalRecordLoading = true
       let  Info = this.Uvr == '2' ?  {ivrTaskId: this.daihouTaskId} :
     { daihouTaskId : this.daihouTaskId}
      getApproveList(Info
       , (res) => {
        if (+res.status === 0) {
          const data = res.data
          this.approvalRecordLoading = false
          if (data.approveList) {
            this.approvalRecordList = data.approveList
            this.showApprovalList = true
          }
        } else {
          this.showApprovalList = false
        }
      })
    },
    _getCallList () {
      this.contractRecordLoading = true
       let  Info = this.Uvr == '2' ?  {ivrTaskId: this.daihouTaskId, page: this.operate.page,} :
     { daihouTaskId : this.daihouTaskId, page: this.operate.page,}
      getCallList(Info, (res) => {
        this.contractRecordLoading = false
        if (+res.status === 0) {
          const data = res.data
          this.contractRecordList = data.callList ? data.callList : []
          this.operate.total = data.arrPager && data.arrPager.count ? data.arrPager.count : 0
          this.showContractList = true
        } else {
          this.showContractList = false
        }
      })
    },
    _getPhoneReview() {
      getPhoneReview({ ivrTaskId: this.daihouTaskId }, res => {
        if(+res.status === 0) {
          const data = res.data;
          Object.assign(this.phoneReviewInfo, data)
        }
      })
    },
    _getDaihouLogList () {
      this.daihouLogLoading = true
       let  Info = this.Uvr == '2' ?  {ivrTaskId: this.daihouTaskId} :
     { daihouTaskId : this.daihouTaskId}
     getIvrLogList(Info, (res) => {
        if (+res.status === 0) {
          this.daihouLogLoading = false
          this.daihoulogList = res.data.daihouLogList
          this.showDaihouLogList = true
        } else {
          this.showDaihouLogList = false
        }
      })
    },
     _getDaihouListoryList(){
       this.daihouHistoryLoading = true;
      getDaihouHistoryList(
        {
          daihouTaskId: this.daihouTaskId
        },
        res => {
          if (+res.status === 0) {
            this.daihouHistoryLoading = false;
            this.daihouHistoryList = res.data.daihouList;
            this.showDaihouHistoryList = true;
          } else {
            this.showDaihouHistoryList = false;
          }
        }
      );
    },
    _getRepaymenPlanList () {
      this.repaymentLoading = true
       let  Info = this.Uvr == '2' ?  {ivrTaskId: this.daihouTaskId} :
     { daihouTaskId : this.daihouTaskId}
      getRepaymenPlanList(Info, (res) => {
        this.repaymentLoading = false
        if (+res.status === 0) {
          this.repaymentList = res.data.repaymentPlanList
          this.showRepaymentList = true
        } else {
          this.showRepaymentList = false
        }
      })
    },
    toggleTab(index) {
      this.operate.total = 0;
      this.operate.page = 1;
      this.$emit("update:activeTab", index);
      switch (index) {
        case 0:
          this._getCallList();
          break;
        case 1:
          this._getApproveList();
          this._getPhoneReview();
          break;
        case 2:
          this._getOperateList();
          break;
        case 3:
          this._getDaihouLogList();
          break;
        case 4:
          this._getDaihouListoryList();
          break;
        case 5:
          this._getRepaymenPlanList();
          break;
        case 6:
          this._getrepaymentrecordlist();
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-collectRecord {
  padding-top: 10px;
  .audio {
    margin-top: 15px;
  }
}
.footer {
  text-align: center;
  button {
    margin: 0 20px;
  }
}
</style>
<style lang="scss">
.ivu-layout-sider-collapsed {
  & + .ivu-layout {
    .topTab {
      .ivu-tabs-bar {
        .ivu-tabs-nav-container {
          .ivu-tabs-nav-wrap {
            .ivu-tabs-nav-scroll {
              .ivu-tabs-nav {
                margin: 0 24px 0 48px;
              }
            }
          }
        }
      }
    }
  }
}
.m-taskDetail{
  .m-collectRecord {
  .ivu-tabs-bar {
    .ivu-tabs-nav-container {
      .ivu-tabs-nav-wrap {
        .ivu-tabs-nav-scroll {
          position: static;
        }
      }
    }
  }
  .tab-warp {
    margin-top: 20px;
  }
}
}
</style>
