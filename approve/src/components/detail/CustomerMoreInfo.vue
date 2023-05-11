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
          <td class="col title">{{$t('loan.detailInfo.religion')}}</td>
          <td class="col">{{data.religion}}</td>
          <td class="col title">{{$t('loan.detailInfo.birthday')}}</td>
          <td class="col">{{data.birthday}}</td>
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
          <td class="col title">{{$t('loan.detailInfo.company')}}</td>
          <td class="col">{{data.company}}</td>
          <td class="col title">{{$t('loan.detailInfo.emergs1Name')}}</td>
          <td class="col">{{data.emergs1_name}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.emergs1Phone')}}</td>
          <td class="col">{{data.emergs1_phone}}</td>
          <td class="col title">{{$t('loan.detailInfo.emergs1Relation')}}</td>
          <td class="col">{{data.emergs1_relation}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.emergs2Name')}}</td>
          <td class="col">{{data.emergs2_name}}</td>
          <td class="col title">{{$t('loan.detailInfo.emergs2Phone')}}</td>
          <td class="col">{{data.emergs2_phone}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.emergs2Relation')}}</td>
          <td class="col">{{data.emergs2_relation}}</td>
          <td class="col title"></td>
          <td class="col"></td>
        </tr>
      </table>
    </Card>
    <Card class="m-card" v-if="!isCustomer">
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
    </Card>
    <Card class="m-card">
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
    </Card>
  </div>
</template>

<script >
export default {
  props:{
  data:Object,
  isCustomer:Boolean,
},
}

// import { Component, Prop, Vue } from 'vue-property-decorator'
// @Component
// export default class CustomerMoreInfo extends Vue {
//   @Prop({default: {}, type: Object }) data: any
//   @Prop({default: false, type: Boolean }) isCustomer: any
// }
</script>
