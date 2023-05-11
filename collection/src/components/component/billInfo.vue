<!-- zys -->
<template>
  <div style="margin:20px 0">
    <Card class="card-gap" v-if="show">
      <p slot="title" style="color: #57a3f3;">{{ $t('billInfo.title') }}</p>
       <h3 style="margin: 0 0 5px 5px;color: #2d8cf0;">{{$t('billInfo.waitPayAmount')}} :{{waitPayAmount}}</h3>
     <Table ref="table" border class="list-table" :data="tableData" :columns="billDetailColumns"></Table>
    </Card>
  </div>
</template>

<script>
  import {
    getTaskBill
  } from "@/api/task";
  export default {
    name: '',
    components: {},
    props: {
      orderNo: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        waitPayAmount : 0,
        tableData: {},
        show: false,
        billDetailColumns :[{
            title: this.$t('billInfo.term'),
            align: 'center',
            key: 'type_str',
            fixed: 'left',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.dueTime'),
            align: 'center',
            key: 'due_time',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.successTime'),
            align: 'center',
            key: 'success_time',
            minWidth: 120,
          },
          {
            title: this.$t('billInfo.principal'),
            align: 'center',
            key: 'principal',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.interest'),
            align: 'center',
            key: 'interest',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.serviceFee'),
            align: 'center',
            key: 'service_fee',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.overdueInterest'),
            align: 'center',
            key: 'overdue_interest',
            minWidth: 120,
          },
          {
            title: this.$t('billInfo.shouldPayTotal'),
            align: 'center',
            key: 'should_pay_total',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.payedTotal'),
            align: 'center',
            key: 'payed_total',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.needPayTotal'),
            align: 'center',
            key: 'need_pay_total',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.status'),
            align: 'center',
            key: 'status_str',
            minWidth: 110,
          },
          {
            title: this.$t('billInfo.overdueDay'),
            align: 'center',
            key: 'overdue_day',
            minWidth: 120,
          },
          // {
          //   title: this.$t('billInfo.rolloverServiceFee'),
          //   align: 'center',
          //   key: 'rolloverServiceFee',
          //   minWidth: 120,
          // },

        ]
      };
    },

    mounted() {
      this.getTaskBillInfo()
    },
    methods: {
      getTaskBillInfo() {
        this.waitPayAmount = 0
        getTaskBill({
          orderNo: this.orderNo
        }, (res) => {
          if (+res.status === 0) {
            this.show = true;
            this.tableData = res.data
            var num = 0
             if(res.data && res.data.length){
              res.data.forEach(item => {
              num +=Number(item.need_pay_total.replace(/\./g,''))
            });
            this.waitPayAmount = num
          }
          }
        })
      }
    }
  }

</script>
<style lang='less' scoped>

</style>
