<template>
  <div class="m-amountStatistics">
    <div class="top">
      <Card class="myCard" bordered >
      <span class="title">DPD 31</span>
      <br />
      <br />
      <span class="num">{{formatMoney(allData.dpd1)}}</span>
    </Card>
    <Card class="myCard" bordered>
      <span class="title">DPD 31-90</span>
      <br />
      <br />
      <span class="num">{{formatMoney(allData.dpd2)}}</span>
    </Card>
    <Card class="myCard" bordered>
      <span class="title">DPD 90-N</span>
      <br />
      <br />
      <span class="num">{{formatMoney(allData.dpd3)}}</span>
    </Card>
    </div>
    <div class="table">
      <H3>write-off Order</H3>
      <Table :columns="tableDefine_WF" :loading="loading" :data="Data_WF" height="400">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
    </div>
    <div class="table">
      <H3>monthly account balance</H3>
      <Table :columns="tableDefine_MT" :loading="loading" :data="Data_MT" height="400">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
    </div>
    <div class="table">
      <H3>monthly lender profit</H3>
      <Table :columns="tableDefine_PT" :loading="loading" :data="Data_profit" height="400">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
    </div>
  </div>
</template>

<script>
import { formatMoney } from "@/common/js/common";
import { getMonthReport  } from "@/api/user.js";
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      formatMoney:formatMoney,
      loadingAmount:false,
      num:{
        totalAmount:null,
        Outstanding:null
      },
      loading:false,
      allData:{},
      Data_MT:[],
      Data_WF:[],
      tableDefine_WF:[
      {
        title: 'month',
        key: 'month',
        align: 'center'
      },
      {
        title: "WRITE-OFF Order",
        key: 'write_off_cnt',
        align: 'center'
      },
      {
        title: 'WRITE-OFF Amount',
        key: 'write_off_amount',
        align: 'center'
      },
      ],
      tableDefine_MT:[
      {
        title: 'month',
        key: 'month',
        align: 'center'
      },

      {
        title: 'balance',
        key: 'lender_balance',
        align: 'center'
      },
      ],
      tableDefine_PT:[
      {
        title: 'month',
        key: 'month',
        align: 'center'
      },

      {
        title: 'profit',
        key: 'lender_profit',
        align: 'center'
      },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    _getAllData(){
      this.$Spin.show();
      this.loading = true
      getMonthReport({
        type:1
      },res=>{
        this.$Spin.hide();
        this.allData =res.data
      })
      getMonthReport({
        type:2
      },res=>{
        this.loading = false
        this.Data_WF=res.data.table1
        this.Data_MT=res.data.table2
        this.Data_profit = res.data.table3

      })
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this._getAllData()
  },
}
</script>

<style scoped  lang='scss'>
.table{
  margin-bottom: 50px;
}
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
