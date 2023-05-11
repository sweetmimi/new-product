<template>
<div>
  <div class="search">
    <Alert >{{$t('order.search.vaTips')}}</Alert>
    VA <Input clearable type="text" v-model="va_no" style="margin-left:10px" :placeholder="`${$t('inputPrefix')} VA`" />
    <Button type="primary" slot="label" style="margin-left:10px" :loading="loading" @click="searchData()">{{$t('search')}}</Button>
    <Button  slot="label"  style="margin-left:10px" @click="reset()">{{$t('resetBtn')}}</Button>
    
  </div>
  <OrderDetail v-if="showData" :propOrderNo="order_no"></OrderDetail>
</div>
</template>

<script>
import OrderDetail from "../Order/Detail.vue"
import { getLoanInfo } from '@/api/loan'
export default {
  name: '',
  props: {},
  components: {
    OrderDetail
  },
  data () {
    return {
      loading:false,
      showData:false,
      va_no:"",
      order_no:""
    }
  },
  computed: {},
  watch: {},
  methods: {
    searchData(){
      if(this.va_no){
        this.showData = false;
         this.loading = true;
         getLoanInfo({
           vaCode:this.va_no
         },res=>{
           if(res.code==0){
              this.showData = true;
               this.loading = false;
              this.order_no = res.data.order_no
           }else{
             this.loading = false;
           }
         })
       
         
      }else{
        this.$Message.error(this.$t('inputPrefix')+' VA')
      }
     
      
    },
    reset(){
      this.va_no = ""
      this.loading = false;
         this.showData = false;
    }
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
}
</script> 

<style scoped  lang='less'>
.search{
  margin-bottom: 20px;
}
</style>
