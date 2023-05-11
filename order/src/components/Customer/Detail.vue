<template>
  <div class="m-customerDetail">
    <Tabs :animated="false">

      <TabPane :label="$t('loan.loanInfo.baseInfoTitle')">
        <CustomerBaseInfo ref="baseInfo" :data="customerBaseInfo"/>
      </TabPane>

      <TabPane :label="$t('loan.loanInfo.detailInfoTitle')">
        <CustomerMoreInfo ref="moreInfo" :isCustomer="true" :data="customerMoreInfo"/>
      </TabPane>

      <TabPane :label="$t('loan.loanInfo.materialInfoTitle')">
        <CustomerMaterialInfo ref="materialInfo" :data="customerMaterialInfo"/>
      </TabPane>

      <!-- <TabPane :label="$t('loan.loanInfo.businessInfo')" v-if="userType==1">
        <businessInfo ref="businessInfo"  :data="businessInfo"/>
      </TabPane> -->

      <!-- <TabPane :label="$t('loan.loanInfo.businessPic')" v-if="userType==1">
        <businessPic ref="businessPic" :data="businessPic"/>
      </TabPane> -->

    </Tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CustomerBaseInfo from '../Detail/CustomerBaseInfo.vue'
import CustomerMoreInfo from '../Detail/CustomerMoreInfo.vue'
import CustomerMaterialInfo from '../Detail/CustomerMaterialInfo.vue'
import businessInfo from '../Detail/businessInfo.vue'
import businessPic from '../Detail/businessPic.vue'
import { getDetail } from '@/api/customer'

@Component({
  components: {
    CustomerBaseInfo,
    CustomerMoreInfo,
    CustomerMaterialInfo,
    businessInfo,
    businessPic,
  }
})
export default class CustomerDetailComponent extends Vue {
  uid = ''
  userType=2
  customerBaseInfo = {}
  customerMoreInfo = {}
  customerMaterialInfo = {}
  _getDetail() {
    getDetail({ uid: this.uid }, (res: any) => {
      if (+res.code === 0) {
        const data = res.data
        this.userType = data.type
        Object.assign(this, {
          customerBaseInfo: data.user_base_info || {},
          customerMoreInfo: data.user_detail_info || {},
          customerMaterialInfo: data.user_material_info || {},
          businessInfo: data.businessInfo || {},
          businessPic: data.businessPic || {},
        })
      }
    })
  }
  created() {
    this.uid = this.$route.params.id
    this._getDetail()
  }
}
</script>
