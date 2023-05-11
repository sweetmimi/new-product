<template>
  <div id="userInfo" class="m-userInfo">
    <div class="tab-warp" v-if="showTable">
      <Row align="middle">
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.userName') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.userName}}</Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.idCard') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.userIdNumber}}</Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.sex') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.sex}}</Col>
      </Row>
      <Row align="middle">
        <!-- <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.homeplace') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.birthPlace}}</Col> -->
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.presentAddress') }}</Col>
        <Col span="4" class-name="col-style loanRemark">
          <Poptip trigger="hover" :content="baseInfo.address" placement="top-start">
            {{baseInfo.address}}
          </Poptip>
        </Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.age') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.age}}</Col>

        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.jobType') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.workType}}</Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.loanUse') }}</Col>
        <Col span="4" class-name="col-style loanRemark">
          <Poptip trigger="hover" :content="baseInfo.loanRemark" placement="top-start">
            {{baseInfo.loanRemark}}
          </Poptip>
        </Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.maritalStatus') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.maritalStatus}}</Col>
        <!-- <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.religion') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.religion}}</Col> -->
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.eduStatus') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.education}}</Col>

        <!-- <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.companyName') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.corporateName}}</Col> -->
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.monthIncome') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.monthIncome | moneyFormat}}</Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.loanCount') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.loanCount}}</Col>
        <Col span="4" class-name="col-style title"></Col>
        <Col span="4" class-name="col-style"></Col>
        <Col span="4" class-name="col-style title"></Col>
        <Col span="4" class-name="col-style"></Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { getBaseInfo } from '@/api'
export default {
  name: 'userInfo',
  props: {
    daihouTaskId	: {
      type: String | Number
    },
    Uvr:{
       type: String | Number
    }
  },
  data () {
    return {
      baseInfo: {},
      showTable: true
    }
  },

  mounted () {
    this._getInfo()
  },

  methods: {
    _getInfo () {
     let  Info = this.Uvr == '2' ?  {ivrTaskId: this.daihouTaskId} :
     { daihouTaskId : this.daihouTaskId}
      getBaseInfo( Info, (res) => {
        if (+res.status === 0) {
          this.baseInfo = res.data
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.m-userInfo {
  padding-top: 10px;
  .loanRemark {
    white-space: nowrap;
    .ivu-poptip {
      width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
