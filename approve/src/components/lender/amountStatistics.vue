<template>
  <div class="m-amountStatistics">
    <div class="top">
      <Card class="myCard" bordered >
      <span class="title">Saldo Tersedia</span>
      <br />
      <br />
      <span class="num">{{num.totalAmount}}</span>
    </Card>
    <Card class="myCard" bordered>
      <span class="title">Sisa Tagihan</span>
      <br />
      <br />
      <span class="num">{{num.Outstanding}}</span>
    </Card>
    </div>

  </div>
</template>

<script>
import { formatMoney } from "@/common/js/common";
import { getallbalance  } from "@/api/user.js";
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      loadingAmount:false,
      num:{
        totalAmount:null,
        Outstanding:null
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    _getallbalance(){
      this.$Spin.show();
      getallbalance({},res=>{
        this.$Spin.hide();
        this.num.totalAmount =formatMoney(res.data.totalAmount)
      })
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this._getallbalance()
  },
}
</script>

<style scoped  lang='scss'>
.top{
  margin: 30px auto;
  display: flex;
  justify-content: center;
}
.myCard {
  margin-right: 120px;
  width: 320px;
  text-align: center;
  .title {
    font-weight: 600;
    font-size: 16px;
  }
  .num {
    font-weight: 600;
    font-size: 18px;
    color: #57a3f3;
  }
}
</style>
