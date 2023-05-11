<template>
  <div class="m-loanInfo">
    <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table">
      <tr>
        <td class="col title">{{$t('loan.contractInfo.conractName')}}</td>
        <td class="col"><a :href="data" target="_blank">{{$t('loan.contractInfo.conractName')}}</a></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class LoanInfo extends Vue {
  @Prop({default: '', type: String }) data: any
}
</script>
