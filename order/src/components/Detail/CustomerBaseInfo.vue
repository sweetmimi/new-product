<template>
  <div class="m-customerBaseInfo">
    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table">
      <tr>
        <td class="col title">{{$t('loan.baseInfo.uid')}}</td>
        <td class="col">{{data.uid}}</td>
      </tr>
      <tr>
        <td class="col title">{{$t('loan.baseInfo.userName')}}</td>
        <td class="col">{{data.name}}</td>
      </tr>
      <tr>
        <td class="col title">{{$t('loan.baseInfo.mobile')}}</td>
        <td class="col">{{data.phone&&data.phone}}</td>
      </tr>
      <tr>
        <td class="col title">{{$t('loan.baseInfo.idcard')}}</td>
        <td class="col">{{data.idcard&&data.idcard}}</td>
      </tr>
      <!-- <tr>
        <td class="col title">{{$t('loan.baseInfo.level')}}</td>
        <td class="col">{{data.level}}</td>
      </tr>-->
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class CustomerBaseInfo extends Vue {
  @Prop({ default: {}, type: Object }) data: any
}
</script>
