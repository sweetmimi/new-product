<template>
  <div id="taskDetail" class="m-taskDetail">
    <Tabs @on-click="toggleTab" :class="{'topTab' : isTop}" :animated="false" name="outerTabs">


        <TabPane :label="$t('taskDetail.baseInfo.coustomBaseInfo')" tab="outerTabs">
          <UserInfo ref="userInfo" :cuishouId="cuishouId" ></UserInfo>
        </TabPane>


        <TabPane :label="$t('taskDetail.baseInfo.orderBaseInfo')" tab="outerTabs">
          <OrderInfo ref="orderInfo" :cuishouId="cuishouId" :orderNo="orderNo"></OrderInfo>
        </TabPane>


        <TabPane :label="$t('taskDetail.collectFollowUp.title')" tab="outerTabs">
          <CollectFollow ref="collectFollow" :calling="calling" @call="handleCalling" :cuishouId="cuishouId"></CollectFollow>
        </TabPane>



        <TabPane :label="$t('taskDetail.collectRecordTab.title')" tab="outerTabs">
          <CollectRecord ref="collectRecord" :activeTab.sync="logActiveTab" :cuishouId="cuishouId" :text='text'></CollectRecord>
        </TabPane>

       <!-- <TabPane :label="$t('taskDetail.contactInformationTab.title')">
        <ContactInformation ref="contactInformation" :cuishouId="cuishouId"></ContactInformation>
       </TabPane> -->


      <!-- <TabPane :label="$t('approvalDetail.telApproval.title')">
        <PhoneApproval ref="phoneApproval" :cuishouId="cuishouId" :phoneRecords="phoneRecords" ></PhoneApproval>
      </TabPane> -->


         <!--  v-if="type === 'view'" -->
      <!-- <TabPane :label="$t('approvalDetail.approvalConclusionHistory.title')">
        <ResultHistory ref="resultHistory" :cuishouId="cuishouId"></ResultHistory>
      </TabPane> -->

    </Tabs>
    <div class="hand-up" v-if="calling">
      <Button type="error" size="large" @click="handleHandUp">{{ $t('taskDetail.collectFollowUp.hangup') }}</Button>
    </div>
  </div>
</template>
<script>
import UserInfo from './UserInfo'
import OrderInfo from './OrderInfo'
import CollectFollow from './CollectFollow'
import CollectRecord from './collectRecord'
import ContactInformation  from './ContactInformation'
import PhoneApproval  from './PhoneApproval'
import ResultHistory  from './ResultHistory'

export default {
  data () {
    return {
      orderNo:'',
      cuishouId: '',
      text:'',
      isTop: false,
      calling: false,
      logActiveTab: 0,
       approveId: '',
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
    }
  },
  components: {
    UserInfo,
    OrderInfo,
    CollectFollow,
    CollectRecord,
    ContactInformation,
    PhoneApproval,
    ResultHistory,

  },
  created () {
    this.cuishouId = decodeURIComponent(this.$route.query.cuishouId)
    this.orderNo = decodeURIComponent(this.$route.query.orderNo)
    this.text =this.$route.query.text
    console.log(this.$route.query.text)
  },

  mounted () {
    let viewBox = document.getElementById('viewBox')
    viewBox.addEventListener('scroll', () => {
      !this.isTop && setTimeout(() => {
        if (viewBox.scrollTop >= 50 ) {
          this.isTop = true
        }
      }, 10)
    })
  },
   watch: {
    phoneRecords () {
      this.validate = Object.keys(this.phoneRecords).some(item => {
        return this.phoneRecords[item] !== ''
      })
    }
  },

  methods: {
    toggleTab (index) {
     console.log(index,666)
      switch (index) {


        case 1:

          this.$refs.orderInfo._getOrderInfo()
          this.$refs.orderInfo._getList()
          break
        case 2:

          this.$refs.collectFollow._getList()
           this.$refs.collectFollow._getOrderInfo()
          break
        case 3:
          this.logActiveTab = 0;
          this.$refs.collectRecord._getCollectRecord()
          break
          case 5:

          this.$refs.phoneApproval._getList()
          break
          case 6:

          this.$refs.resultHistory._getResultHistory()
          break
      }
    },
     saveRecord () {
      savePhoneReview({approveId: this.approveId, checkInfo: this.phoneRecords}, res => {
        if (+res.status === 0) {
          this.$Message.success(res.msg)
        }
      })
    },
    handleCalling (callFlag) {
      this.calling = callFlag
    },
    handleHandUp () {
      this.calling = false
    }

  }
}
</script>

<style lang="scss" scoped>
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
.m-taskDetail {
  position: relative;
  .call-modal {
    .ivu-modal-content {
      padding: 15px 0;
    }
  }
  .hand-up {
    display: inline-block;
    position: fixed;
    right: 50px;
    top: 69px;
    z-index: 11;
    button {
      font-size: 12px;
    }
  }
  .ivu-input-disabled {
    color: #666;
  }
  .ivu-form-item-content {
    width: auto;
  }
  .topTab {
  > .ivu-tabs-bar {
      .ivu-tabs-nav-container {
        .ivu-tabs-nav-wrap {
          .ivu-tabs-nav-scroll {
            position: fixed;
            width: 100%;
            z-index: 10;
            top: 64px;
            left: 50px;
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
}
</style>
