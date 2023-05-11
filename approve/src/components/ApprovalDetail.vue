

<template>

  <div id="ApprovalDetail" class="m-approvalDetail">

    <Tabs @on-click="toggleTab"  :class="{'topTab' : isTop}" :animated="false">


      <TabPane :label="$t('approvalDetail.baseInfo.title')" name="0">
        <BaseInfo ref="baseInfo" :approveId="approveId" :pageType="type"></BaseInfo>
      </TabPane>


      <!-- <TabPane :label="$t('approvalDetail.msgRemind.title')" name="1" v-if="isRecheck!=1">
        <MsgRemind ref="msgRemind" :approveId="approveId"></MsgRemind>
      </TabPane> -->


      <TabPane :label="$t('approvalDetail.telApproval.title')" name="2" v-if="isRecheck!=1">
        <PhoneApproval ref="phoneApproval" :approveId="approveId" :phoneRecords="phoneRecords" :type="type"></PhoneApproval>
      </TabPane>


      <!-- <TabPane :label="$t('approvalDetail.followUpStatus.title')" name="3" v-if="isRecheck!=1">
        <FollowStatus ref="followStatus" :approveId="approveId" :pageType="type"></FollowStatus>
      </TabPane> -->


      <TabPane :label="$t('approvalDetail.approvalConclusionHistory.title')" name="4" v-if="type === 'view'">
        <ResultHistory ref="resultHistory" :approveId="approveId"></ResultHistory>
      </TabPane>


      <TabPane :label="$t('approvalDetail.approvalConclusionHistory.mineConclusion')" name="4" v-if="type !== 'view'&&isRecheck!=1">
        <SelfResult ref="selfResult" :approveId="approveId"></SelfResult>
      </TabPane>

    </Tabs>

    <div class="tools">
      <div class="call" v-if="type === 'check'">
           <!-- <div class="whatsapp-weiyi">

             <img src="../assets/whatsapp@2x.png" alt="" class="whatsapp" @click ='whatsapp' >
           </div> -->

        <!-- <Button  class="btn dial" v-if="isShowDial && lender!=1" @click="dialModal = true" size="large" type="success" shape="circle">
          <Icon type="ios-call"></Icon>
        </Button>
        <Button class="btn hungup" v-show="lender!=1" @click="toHangUp" v-else  size="large" type="error" shape="circle">
          <Icon type="ios-telephone"></Icon>
        </Button> -->
        <Button class="btn edit" @click="open" v-show="lender!=1" size="large" type="warning" shape="circle">
          <Icon type="md-create"></Icon>
        </Button>
        <!-- <Button class="btn message" @click="showSendMsg" v-show="lender!=1" size="large" type="warning" shape="circle">
          <Icon type="ios-chatboxes"></Icon>
        </Button> -->
        <!-- <Button class="btn dial"  @click="dialModal = true" size="large"  shape="circle"> -->


      </div>
    </div>

    <Modal
      v-model="sendMsgModal"
      :title="$t('approvalDetail.msgRemind.sendMsgRemind')">
      <Input v-model="sendMsgContent" type="textarea" :autosize="{minRows: 3,maxRows: 5}" readonly></Input>
      <div slot="footer">
        <Button type="success" size="large" @click="sendMsg">{{ $t('approvalDetail.msgRemind.send') }}</Button>
      </div>
    </Modal>

    <Modal
      v-model="dialModal"
      :title="$t('approvalDetail.telApproval.dialCall')">
      <Row align="middle">
        <Col span="6" :style="{margin: '5px 15px 0',textAlign: 'right'}">{{ $t('approvalDetail.telApproval.dialCall') }}</Col>
        <Col span="12">
          <Input v-model="mobile" class="disabled-btn" :placeholder="$t('approvalDetail.telApproval.placeholder')" :style="{color: '#333'}"></Input>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="success" size="large"  @click="toDial">{{ $t('approvalDetail.telApproval.dial') }}</Button>
      </div>
    </Modal>
    <div
      class="record-box"
      id="recordBox"
      v-if="showRecords && type === 'check'"
      @mouseover="drag"
      :style="{left: `${initPosition.left}px`, top: `${initPosition.top}px`}">
      <div class="ivu-modal-close close" @click.prevent="close"><Icon type="ios-close"></Icon></div>
      <div class="phoneRecords">
        <div class="box">
          <Row align="middle" id="dragTitle" class-name="box-title">
            <Col span="24" class-name="col-style-title title">
              {{ $t('approvalDetail.associatedOrderInfo.phoneRecords.title') }}
            </Col>
          </Row>
          <div class="box-info">
            <Row align="middle">
            <Col span="12" class-name="col-style-title">
              {{ $t('approvalDetail.associatedOrderInfo.check') }}
            </Col>
            <Col span="12" class-name="col-style-title">
              {{ $t('approvalDetail.associatedOrderInfo.record') }}
            </Col>
          </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.isSelf') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.isSelf"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.idcard') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.idcard"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.idcardName') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.idcardName"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.birthday') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.birthday"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.idcardAddress') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.idcardAddress"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.othermobile') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.othermobile"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.curAddress') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.curAddress"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.curAddressOwn') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.curAddressOwn"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.loanUse') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.loanUse"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.maritalStatus') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.maritalStatus"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.legend') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.legend"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.organization') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.organization"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.monthlyIncome') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.monthlyIncome"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.repayDay') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.repayDay"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.companyAddress') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.companyAddress"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.workType') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.workType"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.curWorkTime') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.curWorkTime"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.curWorkContactType') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.curWorkContactType"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.hasOtherLoan') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.hasOtherLoan"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.totalAmount') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.totalAmount"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.canRepayAmount') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.canRepayAmount"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactName') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.contactName"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactRelationship') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.contactRelationship"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactPhone') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.contactPhone"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactKnown') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.contactKnown"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.relationship') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.relationship"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactCheck') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.contactCheck"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.workInfoCheck') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" :readonly="type !== 'check'" v-model="phoneRecords.workInfoCheck"></Input>
              </Col>
            </Row>
          </div>
          <div class="save" v-if="type === 'check'">
            <Button type="primary" @click="saveRecord">{{$t('approvalDetail.approvalConclusionHistory.save')}}</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BaseInfo from './detail/BaseInfo'
import MsgRemind from './detail/MsgRemind'
import PhoneApproval from './detail/PhoneApproval'
import FollowStatus from './detail/FollowStatus'
import ResultHistory from './detail/ResultHistory'
import SelfResult from './detail/SelfResult'
import { Drag } from '../common/js/drag.js'
import { showSendMsg, sendMsg, dialCall, hangUp } from '@/api'
import { getBaseInfo, getAssociatedOrder } from "@/api";
import { getPhoneReview, savePhoneReview } from '@/api/approval'
export default {
  data () {
    return {
      tabname:"0",
      lender : localStorage.getItem('lender'),
      type: '',
      isShowDial: true,
      sendMsgContent: '',
      sendMsgModal: false,
      dialModal: false,
      validate: false,
      showRecords: false,
      approveId: '',
      isTop: false,
      mobile: '',
      phoneRecord:[],
      phoneRecords: {
        isSelf: '',
        idcard: '',
        idcardName: '',
        birthday: '',
        idcardAddress: '',
        othermobile: '',
        curAddress: '',
        curAddressOwn: '',
        loanUse: '',
        maritalStatus: '',
        legend: '',
        organization: '',
        monthlyIncome: '',
        repayDay: '',
        companyAddress: '',
        workType: '',
        curWorkTime: '',
        curWorkContactType: '',
        hasOtherLoan: '',
        totalAmount: '',
        canRepayAmount: '',
        contactName: '',
        contactPhone: '',
        contactRelationship: '',
        contactKnown: '',
        relationship: '',
        contactCheck: '',
        workInfoCheck: ''
      },
      initPosition: {
        left: 300,
        top: 300
      }
    }
  },
  components: {
    BaseInfo,
    MsgRemind,
    PhoneApproval,
    FollowStatus,
    ResultHistory,
    SelfResult
  },
  created () {
    this._getRouterParams()
    this.type === 'check' && this._getSendMsg()
    this._getPhoneReview()
  },
  mounted () {
    let viewBox = document.getElementById('viewBox')
    viewBox.addEventListener('scroll', () => {
      !this.isTop && setTimeout(() => {
        if (viewBox.scrollTop >= 50) {
          this.isTop = true
        }
      }, 10)
    })
  },

  computed: {
    ...mapGetters(['listSelect'])
  },
  watch: {
    phoneRecords () {
      this.validate = Object.keys(this.phoneRecords).some(item => {
        return this.phoneRecords[item] !== ''
      })
      // handler:function(val,oldval){
      //     console.log(val.name)
      // },




    }
  },
  methods: {
    toHangUp () {
      console.log('ppp')
      hangUp({
        approveId: this.approveId
      }, (res) => {
        if (+res.status === 0) {

          this.isShowDial = true
          this.$Message.warning({
            content: this.$t('approvalDetail.msgList.hungUpSuccess'),
            duration: 2
          })
        }
      })
    },
    toDial () {
      if (!this.mobile) {
        this.$Message.error(this.$t('approvalDetail.msgList.hasMobile'))
        return
      }
      dialCall({
        approveId: this.approveId,
        called: this.mobile
      }, (res) => {
        this.dialModal = false
        if (+res.status === 0) {
          this.isShowDial = false
          const msg = this.$Message.loading({
            content: this.$t('approvalDetail.msgList.dialSuccess'),
            duration: 0
          })
          setTimeout(msg, 3000)
        }
      })
    },
    showSendMsg () {
      this.sendMsgModal = true
    },
    whatsapp(){
        getBaseInfo({
          approveId: this.approveId,
          type:  "check"
        },res=>{
           if (+res.status === 0){
            if(res.data.baseInfo.mobile !== ''){
               let sun = 'http://api.whatsapp.com/send?phone=62'+res.data.baseInfo.mobile
                window.open(sun,'_blank')
            }

           }
        })
    },
    sendMsg () {
      sendMsg({
        approveId: this.approveId
      }, (res) => {
        if (+res.status === 0) {
          this.sendMsgModal = false
          this.$Message.success(this.$t('approvalDetail.msgRemind.sendSuccess'))
          this.$refs.msgRemind._getList()
        }
      })
    },
    toggleTab (name) {
     var tabname = Number(name)
      switch (tabname) {
        // case 1:
        //   this.$refs.msgRemind._getList()
        // break;
        case 1:
          this.$refs.phoneApproval._getList()
        break;
        // case 3:
        //   this.$refs.followStatus._getList()
        // break;
        case 2:
          if (this.type === 'view') {
            this.$refs.resultHistory._getResultHistory()
          } else {
            this.$refs.selfResult._getSaveConclusion()
          }
          break
      }
    },
    saveRecord () {
      savePhoneReview({approveId: this.approveId, checkInfo: this.phoneRecords}, res => {
        if (+res.status === 0) {

          this.$Message.success(res.msg)
          this.showRecords = false
        }
      })
    },
    _getSendMsg () {
      showSendMsg({ approveId: this.approveId }, (res) => {
        if (+res.status === 0) {
          this.sendMsgContent = res.data.msgContent
        }
      })
    },
    _getPhoneReview () {
      getPhoneReview({ approveId: this.approveId }, res => {
        if (+res.status === 0) {

          this.phoneRecords = res.data.detailInfo
        }
      })
    },
    _getRouterParams () {
      const isRecheck = this.$route.query.isRecheck
      const params = this.$route.params.approveId.indexOf('_') > -1 ? this.$route.params.approveId.split('_') : ''
      if (!params[0] || !params[1]) {
        this.$router.push({name: 'noFound'})
        return
      }
      Object.assign(this, {
        type: params[0],
        approveId: params[1],
        isRecheck:isRecheck
      })
      console.log(isRecheck)
    },
    open () {
      this.showRecords = !this.showRecords
    },
    close () {
      this.showRecords = false
    },
    drag (e) {
      Drag('dragTitle')
    }
  }
}
</script>
<style lang="scss" scoped>
.whatsapp {
  width: 65px;
  //  position: absolute
}
.whatsapp-weiyi {
  display: -webkit-inline-box;
  position: relative;
  right: 20%;
}
.m-approvalDetail {
  .ivu-radio-wrapper {
    margin-left: 10px;
  }
  .ivu-tabs-tabpane {
    margin-top: 25px;
  }
  .modal-Loading {
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .tools {
    position: fixed;
    bottom: 25px;
    right: 48px;
    z-index: 20;
    padding: 10px;
    border-radius: 4px;
    width: 70px;
    .btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding: 0;
      -webkit-box-shadow: #bbbec4 0px 0px 20px;
      -moz-box-shadow: #bbbec4 0px 0px 20px;
      box-shadow: #bbbec4 0px 0px 20px;
      .ivu-icon {
        font-size: 32px;
      }
    }
    .hungup {
      -ms-transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      transform: rotate(135deg);
      display: inline-block;
      box-shadow: #ccc 0px 0px 2px;
    }
    .edit {
      margin: 20px 0 10px;
    }
    .message {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 10px;
      padding: 0;
      border: 0;
      -webkit-box-shadow: #bbbec4 0px 0px 20px;
      -moz-box-shadow: #bbbec4 0px 0px 20px;
      box-shadow: #bbbec4 0px 0px 20px;
      background: -webkit-linear-gradient(#ff9900, #ec6708);
    }
    .disabledMsg {
      box-shadow: #bfbcb7 0px 0px 5px;
      background: -webkit-linear-gradient(#f7efef, #bfbcb7);
    }
  }
}
.m-spin {
  text-align: left;
  float: left;
  .spin-icon {
    animation: ani-demo-spin 1s linear infinite;
  }
}
.spin-text {
  margin-left: 30px;
}
.ivu-form-item-content {
  width: auto;
}
.call-modal {
  .ivu-modal-content {
    padding: 15px 0;
  }
}
.ivu-table td {
  &.col-hd {
    background-color: #f8f8f9;
    span {
      color: #17233d;
      font-weight: bold;
    }
  }
}
.topTab {
  .ivu-tabs-bar {
    .ivu-tabs-nav-container {
      .ivu-tabs-nav-wrap {
        .ivu-tabs-nav-scroll {
          position: fixed;
          width: 100%;
          z-index: 9;
          top: 64px;
          left: 60px;
          &:after {
            content: "";
            background: #fff;
            width: 24px;
            height: 37px;
            position: absolute;
            left: 224px;
            top: 0;
            z-index: 10;
          }
          .ivu-tabs-nav {
            background: #fff;
            display: block;
            float: none;
            margin: 0 24px 0 248px;
            position: relative;
            border-bottom: 1px solid #f5f7f9;
          }
        }
      }
    }
  }
}
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
$borderColor: #e9eaec;
.box {
  border-left: 1px solid $borderColor;
  border-top: 1px solid $borderColor;
  position: relative;
  .box-title {
    width: 797px;
    position: fixed;
    z-index: 999;
    margin-top: -1px;
  }
  .box-info {
    margin-top: 40px;
  }
  .col-style {
    height: 70px;
    line-height: 70px;
    border-right: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    text-align: center;
    .short {
      width: 70%;
    }
    &.title {
      padding-left: 0;
      text-align: center;
      color: #495060;
      font-weight: bold;
      background-color: #f8f8f9;
    }
    &.error {
      color: red;
    }
  }
  .col-style-title {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    text-align: center;
    &.title {
      padding-left: 0;
      text-align: center;
      color: #495060;
      font-weight: bold;
      background-color: #f8f8f9;
    }
  }
}
.record-box {
  position: absolute;
  width: 800px;
}
.phoneRecords {
  width: 800px;
  position: absolute;
  background-color: #fff;
  z-index: 999;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid $borderColor;
}
.close {
  position: absolute;
  width: 30px;
  text-align: center;
  right: 4px;
  top: 4px;
  z-index: 9999;
}
.save {
  margin: 10px 0;
  text-align: center;
}
</style>
