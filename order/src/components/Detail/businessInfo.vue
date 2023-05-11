<template>
  <div class="m-customerMoreInfo">
    <Card class="m-card">
      <p slot="title" class="card-head">{{$t('loan.detailInfo.business')}}</p>
      <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table">
        <tr>
          <td class="col title">{{$t('loan.detailInfo.businessName')}}</td>
          <td class="col">{{data.businessName}}</td>
          <td class="col title">{{$t('loan.detailInfo.businessIncome')}}</td>
          <td class="col">{{data.businessIncome}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.businessOwner')}}</td>
          <td class="col">{{data.businessOwner}}</td>
          <td class="col title">{{$t('loan.detailInfo.businessCreateTime')}}</td>
          <td class="col">{{data.businessCreateTime}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.businessType')}}</td>
          <td class="col">{{data.businessType}}</td>
          <td class="col title">{{$t('loan.detailInfo.businessPhone')}}</td>
          <td class="col">{{data.businessPhone}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.detailInfo.businessAddress')}}</td>
          <td class="col">{{data.businessAddress}}</td>
          
        </tr>
      
       
      </table>
    </Card>
   
   
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class CustomerMoreInfo extends Vue {
  @Prop({default: {}, type: Object }) data: any
  @Prop({default: false, type: Boolean }) isCustomer: any
}
</script>
