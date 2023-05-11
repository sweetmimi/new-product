<!-- zys -->
<template>
  <div>

     <Collapse class="collapse_ul" >
        <Panel >
          <span class="title">{{$t('loan.loanInfo.rolloverInfo')}}</span>
          <p slot="content" >
            <ul>
              <li>{{$t('loan.loanInfo.rolloverInfoTip')}}</li>

              <li><span class="stro">{{$t('loan.loanInfo.root_order_no')}} :</span> {{historyData.root_order_no}}</li>
              <li><span class="stro">{{$t('loan.loanInfo.higher_order_no')}} :</span> {{historyData.higher_order_no}}</li>
              <li><span class="stro">{{$t('loan.loanInfo.next_order_no')}} :</span> {{historyData.next_order_no}}</li>
            </ul>
          </p>
        </Panel>
     </Collapse>
  </div>
</template>

<script>
import { getOrderHistory } from '@/api/order'
export default {
  name:'' ,
  components: {},
  props: {
  orderNo: {
   type: String,
   default: ''
  }},
  data () {
    return {
      historyData: {},
      show:false,
    };
  },

  mounted () {
     this.getRolloverdata()
  },
  methods: {
  getRolloverdata() {
    getOrderHistory({
      order_no: this.orderNo
    }, (res) => {
      if (+res.code === 0) {
        this.show = true;
        this.historyData = res.data
      }
    })
  }
  }
}

</script>
<style lang='less' scoped>

</style>
