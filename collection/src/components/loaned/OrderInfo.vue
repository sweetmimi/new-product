<template>
  <div id="orderInfo" class="m-orderInfo">
    <Card class="card-gap" v-if="showBaseInfo">
      <p slot="title" class="card-head">{{ $t('taskDetail.baseInfo.orderBaseInfo') }}</p>
      <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table tab-warp">
        <tr align="middle" >
          <td class="col-style title">{{ $t('taskDetail.baseInfo.orderId') }}</td>
          <td class="col-style">{{orderInfo.orderNo}}</td>
          <td class="col-style title">{{ $t('taskDetail.baseInfo.applyProduct') }}</td>
          <td class="col-style">{{orderInfo.productName}}</td>

        </tr>
        <tr align="middle">
          <td class="col-style title">{{ $t('taskDetail.baseInfo.loanAmount') }}</td>
          <td class="col-style">{{orderInfo.loanAmount | moneyFormat}}</td>
          <td class="col-style title">{{ $t('taskDetail.baseInfo.loanTerm') }}</td>
          <td class="col-style">{{orderInfo.loanTerm}} {{orderInfo.loanTerm ? $t('day') : ''}}</td>

        </tr>
        <tr align="middle">
          <td class="col-style title">{{ $t('taskDetail.baseInfo.loanDate') }}</td>
          <td class="col-style">{{orderInfo.loanTime}}</td>
          <td class="col-style title">{{$t('taskDetail.collectRecordTab.repaymentPlan.loanAmount')}}</td>
          <td class="col-style">{{orderInfo.accountAmount | moneyFormat}}</td>
        </tr>
        <tr align="middle">
          <td class="col-style title">{{ $t('taskDetail.baseInfo.bankName') }}</td>
          <td class="col-style">{{orderInfo.bankAccount}}</td>
          <td class="col-style title">{{ $t('taskDetail.baseInfo.bankcard') }}</td>
          <td class="col-style">{{orderInfo.bankNo}}</td>
        </tr>
        <tr align="middle">
          <!-- <td class="col-style title">{{ $t('taskDetail.baseInfo.overDays') }}</td>
          <td class="col-style">{{orderInfo.dueTime}}</td> -->
          <td class="col-style title">{{ $t('taskDetail.baseInfo.repayVoucher') }}</td>
          <td class="col-style" v-if="orderInfo">
            <Button type="text" @click="isShowModal =true">
               {{ $t('taskDetail.baseInfo.voucherDetails') }}
            </Button>
           </td>
          <!-- <td class="col-style title">{{ $t('taskDetail.baseInfo.approvalType') }}</td>
          <td class="col-style">{{orderInfo.approveType}}</td> -->
        </tr>
        <tr align="middle">
          <td class="col-style title">{{ $t('taskDetail.baseInfo.orderChannel') }}</td>
          <td class="col-style">{{orderInfo.orderChannel}}</td>

        </tr>
        <!-- <tr align="middle">
          <td class="col-style title">{{ $t('taskDetail.baseInfo.approvalRemark') }}</td>
          <td class="col-style">{{orderInfo.approveRemark}}</td>
          <td class="col-style title">{{ $t('taskDetail.baseInfo.orderChannel') }}</td>
          <td class="col-style">{{orderInfo.orderChannel}}</td>
        </tr>
        <tr align="middle">
          <td class="col-style title">{{ $t('taskDetail.baseInfo.repayType') }}</td>
          <td class="col-style">{{orderInfo.repayType}}</td>
          <td class="col-style title">{{ $t('taskDetail.baseInfo.repayCode') }}</td>
          <td class="col-style">{{orderInfo.repayCode}}</td>
        </tr>
        <tr align="middle">
          <td class="col-style title">{{ $t('taskDetail.baseInfo.repayEndTime') }}</td>
          <td class="col-style">{{orderInfo.repayEndTime}}</td>
          <td class="col-style title">{{ $t('taskDetail.baseInfo.repayAccountNo') }}</td>
          <td class="col-style">{{orderInfo.repayAccountNo}}</td>
        </tr> -->
         <!-- <tr align="middle">
          <td class="col-style title">{{ $t('taskDetail.baseInfo.repayVoucher') }}</td>
          <td class="col-style" v-if="orderInfo">
            <Button type="text" @click="isShowModal =true">
               {{ $t('taskDetail.baseInfo.voucherDetails') }}
            </Button>
           </td>
        </tr> -->
      </table>
    </Card>
    <BillInfo  :orderNo="orderNo" ></BillInfo>

    <!-- <RolloverInfo ref="mychild" :orderNo="orderNo" ></RolloverInfo> -->
     <Modal :title="$t('taskDetail.baseInfo.voucherDetails')" v-model="isShowModal" footer-hide>
      <div class="box">
        <ul>
          <li>
             <div class="left">
              Transaction Amount
            </div>
             <div class="right number" >
              {{orderInfo.recipientAmount}}
            </div>
          </li>
          <li>
            <div class="left">
              Date Created
            </div>
            <div class="right">
              {{orderInfo.recipientDateTime}}
            </div>
          </li>
          <li>
            <div class="left">
              User Name
            </div>
            <div class="right">
              {{orderInfo.recipientName}}
            </div>
          </li>
           <li>
            <div class="left">
              Kode Bank
            </div>
            <div class="right">
              {{orderInfo.recipientBankName}}
            </div>
          </li>
           <li>
            <div class="left">
              Nomor Rekening
            </div>
            <div class="right">
              {{orderInfo.recipientBankCard}}
            </div>
          </li>
        </ul>

      </div>
     </Modal>
  </div>
</template>
<script>
import  RolloverInfo  from "@/components/component/rolloverInfo.vue";
import  BillInfo  from "@/components/component/billInfo.vue";
import { formatMoney } from '@/common/js/common'
import { getOrderInfo } from '@/api'
export default {
  name: 'orderInfo',
   components: {
    RolloverInfo,
    BillInfo
  },
  props: {
    daihouTaskId: {
      type: String | Number
    },
    Uvr:{
       type: String | Number
    },
    orderNo: {
      type: String
    }
  },
  data () {
    return {
      loading: false,
      showBaseInfo: true,
      isShowModal:false,
      columns: [
        {
          title: this.$t('taskDetail.overdueCondition.periodNo'),
          key: 'periodNo',
          align: 'center',
          fixed: 'left',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.overdueCondition.dateOfReturn'),
          key: 'dueTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.overdueCondition.principal'),
          key: 'principal',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.principal))
          }
        },
        {
          title: this.$t('taskDetail.overdueCondition.interest'),
          key: 'interest',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.interest))
          }
        },
        {
          title: this.$t('taskDetail.overdueCondition.managementExpense'),
          key: 'oneTimeManagementFee',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.oneTimeManagementFee))
          }
        },
        {
          title: this.$t('taskDetail.overdueCondition.overdueNewCost'),
          key: 'overdueInterest',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.overdueInterest))
          }
        },
         {
          title: this.$t('taskDetail.overdueCondition.rolloverServiceFee'),
          key: 'rolloverServiceFee',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.rolloverServiceFee))
          }
        },
        {
          title: this.$t('taskDetail.overdueCondition.amountReturned'),
          key: 'repayedAmount',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.repayedAmount))
          }
        },
        {
          title: this.$t('taskDetail.overdueCondition.receivables'),
          key: 'currentPlanAllAmount',
          align: 'center',
          fixed: 'right',
          minWidth: 150,
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.currentPlanAllAmount))
          }
        },
        {
          title: this.$t('taskDetail.overdueCondition.status'),
          key: 'repayStatus',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.baseInfo.overDays'),
          key: 'dueDate',
          align: 'center',
          fixed: 'right',
          minWidth: 150
        }
      ],
      orderInfo: {}
    }
  },

  methods: {
    _getOrderInfo () {
      let  Info = this.Uvr == '2' ?  {ivrTaskId: this.daihouTaskId} :
     { daihouTaskId : this.daihouTaskId}
      getOrderInfo(Info, (res) => {
        if (+res.status === 0) {
          this.showBaseInfo = true
          this.orderInfo = res.data
        } else {
          this.showBaseInfo = false
        }
      })
    },


  }
}
</script>

<style lang="scss" scoped>
$borderColor: #e9eaec;
.m-orderInfo {
  padding-top: 10px;
  .card-gap {
    margin-bottom: 20px;
    .card-head {
      color: #57a3f3;
    }
  }
  .m-table {
    border: 1px solid $borderColor;
    border-collapse:collapse;
    .col-style {
      line-height: 1.5;
      width: 30%;
      border-left: 1px solid $borderColor;
      border-top: 1px solid $borderColor;
      padding: 10px 15px;
      &.title {
        width: 20%;
      }
    }
  }
}
  .box{
    width: 80%;
    margin-left: 10%;
    ul >li{
      list-style: none;
      display: inline-block;
      width: 100%;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      padding-bottom:10px ;
      .left{
        font-weight: 600;
        float: left;
      }
       .number{
          font-size: 22px;
          font-weight: 600;
        }
      .right{
        float: right;
      }
    }
  }
</style>
