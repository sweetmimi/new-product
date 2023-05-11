<template>
  <div class="m-loanInfo">
    <Card class="m-card">
      <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table">
        <tr>
          <td class="col title">{{$t('loan.loanInfo.userName')}}</td>
          <td class="col">{{data.user_name}}</td>
          <td class="col title">{{$t('loan.loanInfo.uid')}}</td>
          <td class="col">{{data.user_id}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.loanInfo.orderNo')}}</td>
          <td class="col">{{data.order_no}}</td>
          <td class="col title">{{$t('loan.loanInfo.productId')}}</td>
          <td class="col">{{data.product_id}}</td>
        </tr>
        <!-- <tr>
          <td class="col title">{{$t('loan.loanInfo.channel')}}</td>
          <td class="col">{{data.channel}}</td>
          <td class="col title">{{$t('loan.loanInfo.loanNum')}}</td>
          <td class="col">{{data.num_loan}}</td>
        </tr> -->
        <tr>
          <td class="col title">{{$t('loan.loanInfo.createTime')}}</td>
          <td class="col">{{data.create_time}}</td>
          <td class="col title">{{$t('loan.loanInfo.applyTime')}}</td>
          <td class="col">{{data.confirm_time}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('loan.loanInfo.applyNum')}}</td>
          <td class="col">{{data.application_amount}}</td>
          <td class="col title">{{$t('loan.loanInfo.applyTerm')}}</td>
          <td class="col">{{data.application_term}}</td>
        </tr>
        <!-- <tr>
          <td class="col title">{{$t('loan.loanInfo.appName')}}</td>
          <td class="col">{{data.app_name}}</td>
          <td class="col title"></td>
          <td class="col"></td>
        </tr> -->
        <tr>
          <td class="col title">{{$t('loan.loanInfo.loanNum')}}</td>
          <td class="col">{{data.num_loan}}</td>
        </tr>
         
      </table>
    </Card>

     <!-- <Card class="m-card">
      <p slot="title" class="card-head">{{$t('loan.loanInfo.failedLog')}}</p>
      <Table
        ref="table"
        border
        class="list-table"
        :data="data.failed_log"
        :columns="tableFailedHead"
        >
      </Table>
    </Card> -->
   <RolloverInfo ref="mychild" :orderNo="orderNo" ></RolloverInfo>
    <!-- <Card class="m-card">
      <p slot="title" class="card-head">{{$t('loan.loanInfo.orderLog')}}</p>
      <Table
        ref="table"
        border
        class="list-table"
        :data="data.status_log"
        :columns="tableStatusHead"
        >
      </Table>
    </Card> -->
    <!-- <Card class="m-card">
      <p slot="title" class="card-head">{{$t('loan.approvInfo.conclusion')}}</p>
      <Table
        ref="table"
        border
        class="list-table"
        :data="data.approve_log"
        :columns="tableApproveHead"
        >
      </Table>
    </Card> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
 import  RolloverInfo  from "@/common/vue/rolloverInfo.vue";
@Component({
  components: {
    RolloverInfo
  }
})

export default class LoanInfo extends Vue {
  @Prop({default: {}, type: Object}) data: any
  orderNo=""
  historyData={}
  tableStatusHead = [
    { title: this.$t('loan.loanInfo.confirmTime'), align: 'center', key: 'create_time', fixed: 'left', minWidth: 110 },
    { title: this.$t('loan.loanInfo.stayTime'), align: 'center', key: 'stay_time', minWidth: 110 },
    { title: this.$t('loan.loanInfo.status'), align: 'center', key: 'status', minWidth: 110 },
    { title: this.$t('loan.loanInfo.operator'), align: 'center', key: 'create_user_name', minWidth: 110 },
    { title: this.$t('loan.loanInfo.remark'), align: 'center', key: 'remark', fixed: 'right', minWidth: 110 }
  ]
  tableApproveHead = [
    { title: this.$t('loan.approvInfo.approvalTime'), align: 'center', key: 'approveType', minWidth: 110, fixed: 'left' },
    { title: this.$t('loan.approvInfo.approver'), align: 'center', key: 'approver', minWidth: 110 },
    { title: this.$t('loan.approvInfo.approvalTime'), align: 'center', key: 'approvalTime', minWidth: 110 },
    { title: this.$t('loan.approvInfo.conclusion'), align: 'center', key: 'conclusion', fixed: 'right', minWidth: 110 }
  ]
  tableFailedHead= [
    { title: this.$t('loan.failedInfo.create_time'), align: 'center', key: 'create_time', minWidth: 110,  },
    { title: this.$t('loan.failedInfo.pay_msg'), align: 'center', key: 'pay_msg', minWidth: 110 },
  ]
    created() {
       this.orderNo = this.$route.params.orderNo
  }

}
</script>
