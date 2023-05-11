<template>
  <div class="m-loanDetail">
    <Tabs :animated="false">

      
      <TabPane :label="$t('loan.loanInfo.loanInfoTitle')">
        <LoanInfo ref="loanInfo" :data="loanInfo"/>
      </TabPane>

      <TabPane :label="$t('loan.loanInfo.baseInfoTitle')">
        <CustomerBaseInfo ref="baseInfo" :data="baseInfo"/>
      </TabPane>

      <TabPane :label="$t('loan.loanInfo.detailInfoTitle')">
        <CustomerMoreInfo ref="detailInfo" :isCustomer="false" :data="detailInfo"/>
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoanInfo from '../Detail/LoanInfo.vue'
import CustomerBaseInfo from '../Detail/CustomerBaseInfo.vue'
import CustomerMoreInfo from '../Detail/CustomerMoreInfo.vue'
import { getOrderInfo } from '@/api/order'

@Component({
  components: {
    LoanInfo: LoanInfo,
    CustomerBaseInfo: CustomerBaseInfo,
    CustomerMoreInfo: CustomerMoreInfo
  }
})
export default class LoanDetailComponent extends Vue {
  orderNo = ''
  loanInfo = {}
  baseInfo = {}
  detailInfo = {}
  materialInfo = {}
  contractInfo = ''
  created() {
    this.orderNo = this.$route.params.orderNo
    this._getOrderInfo()
  }
  _getOrderInfo() {
    getOrderInfo({
      order_no: this.orderNo
    }, (res: any) => {
      if (+res.code === 0) {
        this.loanInfo = res.data.order_info
        this.baseInfo = res.data.base_info
        this.detailInfo = res.data.detail_info
        this.materialInfo = res.data.material_info
        this.contractInfo = res.data.contract
      }
    })
  }
}
</script>
