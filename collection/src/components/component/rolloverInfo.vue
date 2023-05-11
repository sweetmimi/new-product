<!-- zys -->
<template>
  <div>

     <Collapse class="collapse_ul" v-if="show">
        <Panel >
          <span class="title">{{$t('taskDetail.baseInfo.rolloverInfo')}}</span>
          <p slot="content" >
            <ul>
              <li>{{$t('taskDetail.baseInfo.rolloverInfoTip')}}</li>

              <li><span class="stro">{{$t('taskDetail.baseInfo.root_order_no')}} :</span> {{historyData.root_order_no}}</li>
              <li><span class="stro">{{$t('taskDetail.baseInfo.higher_order_no')}} :</span> {{historyData.higher_order_no}}</li>
              <li><span class="stro">{{$t('taskDetail.baseInfo.next_order_no')}} :</span> {{historyData.next_order_no}}</li>
            </ul>
          </p>
        </Panel>
     </Collapse>
  </div>
</template>

<script>
import { getRolloverInfo } from "@/api/daihoutask";
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
    getRolloverInfo({
      order_no: this.orderNo
    }, (res) => {
      if (+res.status === 0) {
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
