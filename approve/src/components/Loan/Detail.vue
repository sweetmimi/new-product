<template>
  <div class="m-loanDetail">
    <Tabs :animated="false">


      <TabPane :label="$t('loan.loanInfo.loanInfoTitle')">
        <LoanInfo ref="loanInfo" :data="loanInfo" />
      </TabPane>

      <TabPane :label="$t('loan.loanInfo.baseInfoTitle')">
        <CustomerBaseInfo ref="baseInfo" :data="baseInfo" />
      </TabPane>

      <TabPane :label="$t('loan.loanInfo.detailInfoTitle')" v-show="lender!=1">
        <CustomerMoreInfo ref="detailInfo" :isCustomer="false" :data="detailInfo" />
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {
    Component,
    Vue
  } from 'vue-property-decorator'
  import LoanInfo from '../detail/LoanInfo.vue'
  import CustomerBaseInfo from '../detail/CustomerBaseInfo.vue'
  import CustomerMoreInfo from '../detail/CustomerMoreInfo.vue'
  import {
    getOrderInfo
  } from '@/api/order'

  // @Component({
  //   components: {
  //     LoanInfo: LoanInfo,
  //     CustomerBaseInfo: CustomerBaseInfo,
  //     CustomerMoreInfo: CustomerMoreInfo
  //   }
  // })
  export default {
    name: "loanDetail",

    data() {
      return {
        lender : localStorage.getItem('lender'),
        orderNo: '',
        loanInfo: {},
        baseInfo: {},
        detailInfo: {},
        materialInfo: {},
        contractInfo: '',
      }
    },
     components:{
       LoanInfo: LoanInfo,
      CustomerBaseInfo: CustomerBaseInfo,
      CustomerMoreInfo: CustomerMoreInfo
     },
    methods: {
      _getOrderInfo() {
        getOrderInfo({
          order_no: this.orderNo,
          mid:localStorage.getItem('mid')
        }, (res) => {
          if (+res.status === 0) {
            this.loanInfo = res.data.order_info
            this.baseInfo = res.data.base_info
            this.detailInfo = res.data.detail_info
            this.materialInfo = res.data.material_info
            this.contractInfo = res.data.contract
          }
        })
      }
    },
    created() {
      this.orderNo = this.$route.params.orderNo
      this._getOrderInfo()
    }
  }

</script>
