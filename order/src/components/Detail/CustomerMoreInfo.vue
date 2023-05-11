<template>
  <div class="m-customerMoreInfo">
    <Card class="m-card">
      <p slot="title" class="card-head">{{$t('loan.detailInfo.personal')}}</p>
      <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table">
        <tr>
          <td class="col title">{{$t('loan.detailInfo.userType')}}</td>
          <td class="col">{{data.user_type}}</td>
          <td class="col title">{{$t('loan.detailInfo.education')}}</td>
          <td class="col">{{data.education}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.loanPurpose')}}</td>
          <td class="col">{{data.loan_purpose}}</td>
          <td class="col title">{{$t('loan.detailInfo.monthPay')}}</td>
          <td class="col">{{data.month_pay}}</td>
        </tr>
        <tr>
          <!-- <td class="col title">{{$t('loan.detailInfo.religion')}}</td>
          <td class="col">{{data.religion}}</td> -->
         
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.maritalStatus')}}</td>
          <td class="col">{{data.marital_status}}</td>
          <td class="col title">{{$t('loan.detailInfo.sex')}}</td>
          <td class="col">{{data.sex}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.area')}}</td>
          <td class="col">{{data.area}}</td>
          <td class="col title">{{$t('loan.detailInfo.workType')}}</td>
          <td class="col">{{data.work_type}}</td>
        </tr>
        <tr>
          <!-- <td class="col title">{{$t('loan.detailInfo.company')}}</td>
          <td class="col">{{data.company}}</td> -->
           <td class="col title">{{$t('loan.detailInfo.birthday')}}</td>
          <td class="col">{{data.birthday}}</td>
          <td class="col title">{{$t('loan.detailInfo.emergs1Name')}}</td>
          <td class="col">{{data.emergs1_name}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.emergs1Phone')}}</td>
          <td class="col">{{data.emergs1_phone&&data.emergs1_phone}}</td>
          <td class="col title">{{$t('loan.detailInfo.emergs1Relation')}}</td>
          <td class="col">{{data.emergs1_relation}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.emergs2Name')}}</td>
          <td class="col">{{data.emergs2_name}}</td>
          <td class="col title">{{$t('loan.detailInfo.emergs2Phone')}}</td>
          <td class="col">{{data.emergs2_phone&&data.emergs2_phone}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.emergs2Relation')}}</td>
          <td class="col">{{data.emergs2_relation}}</td>
          <td class="col title"></td>
          <td class="col"></td>
        </tr>
      </table>
    </Card>
    <!-- <Card class="m-card" v-if="!isCustomer">
      <p slot="title" class="card-head">{{$t('loan.detailInfo.deviceInfo')}}</p>
      <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table">
        <tr>
          <td class="col title">{{$t('loan.detailInfo.gps')}}</td>
          <td class="col">{{data.gps}}</td>
          <td class="col title">{{$t('loan.detailInfo.imei')}}</td>
          <td class="col">{{data.imei}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.brand')}}</td>
          <td class="col">{{data.brand}}</td>
          <td class="col title">{{$t('loan.detailInfo.model')}}</td>
          <td class="col">{{data.model}}</td>
        </tr>
      </table>
    </Card> -->
    <!-- <Card class="m-card">
      <p slot="title" class="card-head">{{$t('loan.detailInfo.ocrInfo')}}</p>
      <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table">
        <tr>
          <td class="col title">{{$t('loan.detailInfo.passFacePhoto')}}</td>
          <td class="col">{{data.pass_face_photo}}</td>
          <td class="col title">{{$t('loan.detailInfo.samePerson')}}</td>
          <td class="col">{{data.same_person}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.confidenceScore')}}</td>
          <td class="col">{{data.confidence_score}}</td>
          <td class="col title">{{$t('loan.detailInfo.realnameStatus')}}</td>
          <td class="col">{{data.realname_status}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.ocrName')}}</td>
          <td class="col">{{data.ocr_name}}</td>
          <td class="col title">{{$t('loan.detailInfo.ocrCardno')}}</td>
          <td class="col">{{data.ocr_cardno}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.ocrArea')}}</td>
          <td class="col">{{data.ocr_area}}</td>
          <td class="col title">{{$t('loan.detailInfo.ocrStatus')}}</td>
          <td class="col">{{data.ocr_status}}</td>
        </tr>
        <tr v-if="!isCustomer">
          <td class="col title">{{$t('loan.detailInfo.checkAddress')}}</td>
          <td class="col">{{data.check_address}}</td>
          <td class="col title"></td>
          <td class="col"></td>
        </tr>
      </table>
    </Card> -->
       <!-- <Card class="m-card">
      
      <p slot="title" class="card-head">{{$t('loan.loanInfo.loanInfoTitle')}}</p>
      <div class="box" >
        <Row align="middle">
        <Col span="6" class-name="col-style title">Nilai kredit (Skor Total)</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.nilai_kredit}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">Rata-rata Skor - FDC</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.avg_kualitas}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">Total Pinjaman - FDC</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.pinjaman_num}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">DPD Max - FDC</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.dpd_max}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">Nilai Skor - Pefindo</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.pefindo_score}}</Col>
      </Row>
       <Row align="middle">
        <Col span="6" class-name="col-style title">Skor Internal</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.internal_score}}</Col>
      </Row>
      </div>

      </Card> -->
  </div>
</template>

<script lang="ts">
import { getfdcorderinfo } from '@/api/loan'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class CustomerMoreInfo extends Vue {
  @Prop({default: {}, type: Object }) data: any
  @Prop({default: false, type: Boolean }) isCustomer: any
  scoreInfo={}
  // getScoreInfp(){
  //        getfdcorderinfo(
  //           {
  //             order_no: this.orderNo
  //           },
  //           (res: any) => {
  //             this.scoreInfo = res.data
             
  //           })
  // }
}
</script>
<style scoped lang="scss">
$borderColor: #e9eaec;
  .box {
    border-left: 1px solid $borderColor;
    border-top: 1px solid $borderColor;
    margin-top: 24px;
    margin-bottom: 30px;
    .col-style {
      height: 40px;
      line-height: 40px;
      border-right: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      text-indent: 20px;
      &.title {
        padding-left: 0;
        text-align: left;
        color: #495060;
        font-weight: bold;
        background-color: #f8f8f9;
      }
      &.error {
        color: red;
      }
    }
  }
.SingleSelection{
  width: 300px;
 display: inline-block;
 position: relative;
   left:80%;
 span {
   padding-right:10px;
   display: inline-block;
   height: 22px;
  font-size: 14px;

 }
   
   
  
 
}
.m-orderDetail {
  /deep/
  .ivu-tabs {
    .ivu-tabs-nav {
      display:flex;
      width: 100%;
      .ivu-tabs-ink-bar{
         height: 0px;
      }
      .ivu-tabs-tab:nth-child(4) {
        position: absolute;
        right:0;
        border: 1px solid #3F90F3;
       background: #3F90F3;
        color: #fff;
      
        text-align:center;
        bottom: 5px;
      }
    }
  }
  /deep/
  .ivu-tabs-ink-bar {
    background-color:none;
  }
}
.meng{
  border: 1px solid #e8eaec;

   }
.pingzhang{
  padding-left: 100px;
   padding-bottom: 20px;
   font-size: 16px;
   li{
     list-style-type:none;
     
   }
 
}
.ivu-modal-footer{
  border-top: 0px solid #e8eaec;
}
.have_handled{
   color: red;
   font-size: 20px;
    text-align:center;
    padding-top: 100px;
    font-weight:700
}
</style>
