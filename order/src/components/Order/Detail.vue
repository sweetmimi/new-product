<template>
  <div class="m-orderDetail">
    <Card class="m-card">
      <div slot="title" class="card-head">
        <strong>{{$t('loan.loanInfo.loanInfoTitle')}}</strong>
        <div style="float:right;margin-top:-10px">
          <Button
            type="primary"
            style="margin-right:20px"
            @click="addRemark()"
          >{{$t('order.orderInfo.addRemark')}}</Button>
          <Button
            type="primary"
            v-if="loanInfo.contract_url"
            style="margin-right:20px"
            @click="openContract()"
          >{{$t('order.orderInfo.contract')}}</Button>
          <Button
            v-if="loanInfo.order_no"
            type="primary"
            @click="loanProof(loanInfo.order_no)"
          >{{$t('order.orderInfo.proof')}}</Button>
        </div>
      </div>
      <table width="100%" border="1" cellspacing="0" cellpadding="0" class="m-table">
        <tr>
          <td class="col title">{{$t('order.orderInfo.userName')}}</td>
          <td class="col">{{loanInfo.user_name}}</td>
          <td class="col title">{{$t('order.orderInfo.userId')}}</td>
          <td class="col">{{loanInfo.user_id}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('order.orderInfo.orderNo')}}</td>
          <td class="col">{{loanInfo.order_no}}</td>
          <td class="col title">{{$t('order.orderInfo.productName')}}</td>
          <td class="col">{{loanInfo.product_name}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('order.orderInfo.numLoan')}}</td>
          <td class="col">{{loanInfo.num_loan}}</td>
          <td class="col title">{{$t('order.orderInfo.createTime')}}</td>
          <td class="col">{{loanInfo.create_time}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('order.orderInfo.confirmTime')}}</td>
          <td class="col">{{loanInfo.confirm_time}}</td>
          <td class="col title">{{$t('order.orderInfo.applicationAmount')}}</td>
          <td class="col">{{loanInfo.application_amount}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('order.orderInfo.applicationTerm')}}</td>
          <td class="col">{{loanInfo.application_term}}</td>
          <td class="col title">{{$t('order.orderInfo.loan_actualAmount')}}</td>
          <td class="col">{{loanInfo.loan_actual_amount}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('order.orderInfo.pay_channel_num')}}</td>
          <td class="col">{{loanInfo.external_id}}</td>
          <td class="col title">{{$t('order.orderInfo.bank_card')}}</td>
          <td class="col">{{loanInfo.bank_card}}</td>
        </tr>
        <tr>
          <td class="col title">lender ID</td>
          <td class="col">{{loanInfo.lender_id}}</td>
          <td class="col title">{{$t('order.orderInfo.lender_name')}}</td>
          <td class="col">{{loanInfo.lender_name}}</td>
        </tr>
        <tr>
          <td class="col title">{{$t('order.orderInfo.orderChannel')}}</td>
          <td class="col">{{loanInfo.channel}}</td>
          <td class="col title">{{$t('order.orderInfo.loan_mch_channel')}}</td>
          <td class="col">{{loanInfo.loan_mch_channel}}</td>
        </tr>
      </table>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Card>
    <Card class="m-card">
      <p slot="title" class="card-head">{{$t('order.orderInfo.remarkTitle')}}</p>
      <div class="box">
        <Table
          ref="remarktable"
          border
          class="list-table"
          :data="loanInfo.customer_comment"
          :columns="remarkColumns"
        ></Table>
      </div>
    </Card>
    <Card class="m-card">
      <p slot="title" class="card-head">{{$t('loan.loanInfo.loanInfoTitle')}}</p>
      <div class="box">
        <Row align="middle">
          <Col span="6" class-name="col-style title">Nilai kredit (Skor Total)</Col>
          <Col span="18" class-name="col-style">{{scoreInfo.nilai_kredit}}</Col>
        </Row>
        <Row align="middle">
          <Col span="6" class-name="col-style title">Rata-rata Skor - FDC</Col>
          <Col span="18" class-name="col-style">{{scoreInfo.avg_kualitas}}</Col>
        </Row>
        <Row align="middle">
          <Col span="6" class-name="col-style title">Total Pinjaman - FDC</Col>
          <Col span="18" class-name="col-style">{{scoreInfo.pinjaman_num}}</Col>
        </Row>
        <Row align="middle">
          <Col span="6" class-name="col-style title">DPD Max - FDC</Col>
          <Col span="18" class-name="col-style">{{scoreInfo.dpd_max}}</Col>
        </Row>
        <Row align="middle">
          <Col span="6" class-name="col-style title">Nilai Skor - Pefindo</Col>
          <Col span="18" class-name="col-style">{{scoreInfo.pefindo_score}}</Col>
        </Row>
        <Row align="middle">
          <Col span="6" class-name="col-style title">Skor Internal</Col>
          <Col span="18" class-name="col-style">{{scoreInfo.internal_score}}</Col>
        </Row>
      </div>
    </Card>
    <RolloverInfo ref="mychild" :orderNo="orderNo"></RolloverInfo>

    <div class="SingleSelection">
      <!-- <span> {{$t('order.orderInfo.Transfer')}}</span>
      <i-Switch v-model="switch1" @on-change="change" />-->
    </div>

    <Tabs>
      <TabPane :label="$t('order.orderInfo.billDetail')">
        <h3
          style="margin: 0 0 5px 5px;color: #2d8cf0;"
        >{{$t('order.orderInfo.billInfo.waitPayAmount')}} :{{waitPayAmount}}</h3>
        <Table
          ref="table"
          border
          class="list-table"
          :data="loanInfo.bill_detail"
          :columns="billDetailColumns"
        ></Table>
      </TabPane>

      <TabPane :label="$t('order.orderInfo.repayDetail')">
        <Table
          ref="table"
          border
          class="list-table"
          :data="loanInfo.repay_detail"
          :columns="repayDetailColumns"
        ></Table>
      </TabPane>

     <TabPane
        :label="$t('Pingzhang')"
        class="meng"
        v-if="loanInfo.status ==110 ||loanInfo.status ==120 ||loanInfo.status ==130 ||loanInfo.status ==190 "
      >
        <ul class="pingzhang" v-if="loanInfo.status !=190">
          <li style="padding-bottom: 10px;padding-top: 10px">
            <span>{{$t('order.orderInfo.billInfo.Lendingaccount')}}:</span>
            <span>{{loanInfo.loan_actual_amount}}</span>
            <span style="padding-left:50px;">{{$t('order.orderInfo.billInfo.needPayTotal')}}:</span>
            <span>{{loanInfo.bill_detail[0].need_pay_total}}</span>
          </li>
          <Form ref="pingzhangForm" :rules="validationLogin" :model="searchForm" :label-width="80">
            
            <FormItem :label="$t('order.orderInfo.billInfo.Doubleloan')">
              <Select v-model="searchForm.channelSources" style="width: 160px;">
                <Option
                  v-for="item in $t('dataReport.search.afterloans')"
                  :key="item.key"
                  :value="item.key"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
          </Form>

          <li>
            <Button class="sun" type="primary" slot="label" @click="handlePage()">{{$t('okText')}}</Button>
          </li>
        </ul>

        <p
          v-if="loanInfo.status ==190"
          class="have_handled"
        >{{$t('order.orderInfo.billInfo.oprated')}}</p>
      </TabPane>
    </Tabs>

    <Modal v-model="contract_modal" fullscreen footer-hide>
      <div v-if="loanInfo.contractHtml">
      <p slot="header" style="heigth:50px">
        <strong>{{$t('order.orderInfo.contract')}}</strong>
        <Icon
          type="md-download"
          style="float:right;margin-right:30px;font-size:28px;cursor: pointer;"
          @click="downloadContract()"
        />
      </p>
      <div v-if="contract_modal">
        <div class="contract" style="padding:10px;" id="contract" v-html="loanInfo.contractHtml"></div>
      </div>
    </div>
    <div v-else>
      
      <!-- <iframe :src="loanInfo.contract_url" frameborder="0" width="100%" style="height:100%"></iframe> -->
    </div>
    </Modal>

    <Modal
      v-model="remark_modal"
      :loading="remark_loading"
      @on-ok="subRemark"
      :title="$t('order.orderInfo.addRemark')"
    >
      <Form>
        <FormItem prop="loan_type" :label="$t('order.orderInfo.remark')">
          <Input clearable :rows="4" type="textarea" v-model="remark_comment" style="width:80%" />
        </FormItem>
      </Form>
    </Modal>

    <loanProof ref="proof"></loanProof>
  </div>
</template>

<script lang="ts">
import { downloadPDF } from '@/common/js/html_pdf'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import loanProof from './loanProof.vue'
import {
  getLoanInfo,
  pingzhang,
  opentransferaccount,
  getfdcorderinfo,
  remarkSaveComment,
} from '@/api/loan'
import RolloverInfo from '@/common/vue/rolloverInfo.vue'
@Component({
  components: {
    RolloverInfo: RolloverInfo,
    loanProof: loanProof,
  },
})
export default class OrderDetail extends Vue {
  @Prop({ default: '', type: String }) propOrderNo: any
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  $refs!: {
    table: HTMLFormElement
    pingzhangForm: HTMLFormElement
    proof: HTMLFormElement
  }
  loanInfo = {
    order_no: '',
    contract_url:'',
    contractHtml:'',
  }
  waitPayAmount = 0
  spinShow = false
  remark_loading = true
  remark_modal = false
  remark_comment = ''
  remarkColumns = [
    {
      title: this.$t('order.orderInfo.remarkSort'),
      align: 'center',
      key: 'id',
    },
    {
      title: this.$t('order.orderInfo.remarkTxt'),
      align: 'center',
      key: 'comment',
    },
    {
      title: this.$t('order.orderInfo.remarkTime'),
      align: 'center',
      key: 'dateTime',
    },
    {
      title: this.$t('order.orderInfo.operatorName'),
      align: 'center',
      key: 'operatorName',
    },
  ]

  historyData = {}
  validateUserName = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(
        new Error('' + `${this.$t('order.orderInfo.billInfo.Flatbookvalue')}`)
      )
    } else {
      callback()
    }
  }
  validationLogin = {
    loan_type: { validator: this.validateUserName, trigger: 'blur' },
  }
  scoreInfo = {}
  switch1 = false
  contract_modal = false
  orderNo = ''
  idcard = ''
  userId = ''

  needPayTotal = ''

  searchForm: any = {
    // loan_type: '',
    channelSources: '0',
  }
  isRouterAlive = true
  reload() {
    this.isRouterAlive = false

    this.$nextTick(function () {
      this.isRouterAlive = true
    })
  }

  billDetailColumns = [
    // {
    //   title: this.$t('order.orderInfo.billInfo.term'),
    //   align: 'center',
    //   key: 'type_str',
    //   fixed: 'left',
    //   minWidth: 110,
    // },
    {
      title: this.$t('order.orderInfo.billInfo.dueTime'),
      align: 'center',
      key: 'due_time',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.billInfo.successTime'),
      align: 'center',
      key: 'success_time',
      minWidth: 120,
    },
    {
      title: this.$t('order.orderInfo.billInfo.principal'),
      align: 'center',
      key: 'principal',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.billInfo.interest'),
      align: 'center',
      key: 'interest',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.billInfo.serviceFee'),
      align: 'center',
      key: 'service_fee',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.billInfo.overdueInterest'),
      align: 'center',
      key: 'overdue_interest',
      minWidth: 120,
    },
    {
      title: this.$t('order.orderInfo.billInfo.shouldPayTotal'),
      align: 'center',
      key: 'should_pay_total',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.billInfo.payedTotal'),
      align: 'center',
      key: 'payed_total',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.billInfo.needPayTotal'),
      align: 'center',
      key: 'need_pay_total',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.billInfo.status'),
      align: 'center',
      key: 'status_str',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.billInfo.overdueDay'),
      align: 'center',
      key: 'overdue_day',
      minWidth: 120,
    },
    // {
    //   title: this.$t('order.orderInfo.billInfo.rolloverServiceFee'),
    //   align: 'center',
    //   key: 'rolloverServiceFee',
    //   minWidth: 120,
    // },
    {
      title: this.$t('order.orderInfo.billInfo.remark'),
      align: 'center',
      key: 'remark',
      fixed: 'right',
      minWidth: 110,
    },
  ]
  repayDetailColumns = [
    {
      title: this.$t('order.orderInfo.repayInfo.startTime'),
      align: 'center',
      key: 'start_time',
      fixed: 'left',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.repayInfo.updateTime'),
      align: 'center',
      key: 'update_time',
      minWidth: 110,
    },
    // {
    //   title: this.$t('order.orderInfo.repayInfo.payChannel'),
    //   align: 'center',
    //   key: 'pay_channel',
    //   minWidth: 110,
    // },
    {
      title: this.$t('order.orderInfo.repayInfo.payType'),
      align: 'center',
      key: 'pay_type',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.repayInfo.repay_method_type'),
      align: 'center',
      key: 'repay_method_type',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.repayInfo.amount'),
      align: 'center',
      key: 'amount',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.repayInfo.va_creater'),
      align: 'center',
      key: 'va_creater',
      minWidth: 110,
    },
    {
      title: this.$t('order.orderInfo.repayInfo.status'),
      align: 'center',
      key: 'status',
      fixed: 'right',
      minWidth: 110,
    },
    // {
    //   title: this.$t('order.orderInfo.repayInfo.failDesc'),
    //   align: 'center',
    //   key: 'fail_desc',
    //   fixed: 'right',
    //   minWidth: 110,
    // },
  ]
  get channelSources() {
    return this.selectItems.channel || []
  }

  created() {
    this.orderNo = this.$route.params.orderNo || this.propOrderNo
    this._getLoanInfo()
  }
  change(status) {
    let data = {
      order_no: this.orderNo,
      status: this.switch1 == true ? '1' : '0',
    }
    console.log(data, 333)
    opentransferaccount(data, (res) => {
      if (+res.code == 0) {
        if (data.status === '1') {
          this.$Message.info('Buka rekening transfer')
        } else {
          this.$Message.info('tutup akun transfer')
        }
      }
    })
  }
  _getLoanInfo() {
    this.spinShow = true
    this.waitPayAmount = 0
    getLoanInfo(
      {
        order_no: this.orderNo,
      },
      (res: any) => {
        if (+res.code === 0) {
          this.spinShow = false
          this.loanInfo = res.data
          this.userId = res.data.user_id
          this.switch1 = res.data.is_open_transfer == '0' ? false : true
          var num = 0
          if (res.data.bill_detail && res.data.bill_detail.length) {
            res.data.bill_detail.forEach((item) => {
              num += Number(item.need_pay_total.replace(/\./g, ''))
            })
            this.waitPayAmount = num
          }
        } else {
          this.spinShow = false
        }
      }
    )
    getfdcorderinfo(
      {
        order_no: this.orderNo,
      },
      (res: any) => {
        this.scoreInfo = res.data
      }
    )
  }

  handlePage() {
    this.$Modal.confirm({
      content: '<p> Anda yakin ?</p>',
      onOk: () => {
        const data = {
          // repayMoney:this.searchForm.loan_type,
          orderNo: this.orderNo,

          isLoan: this.searchForm.channelSources,
          userId: this.userId,
        }

        pingzhang(data, (res: any) => {
          console.log(res)
          if (+res.code === 0) {
            this.$Message.info({
              content: res.msg,
              onClose: () => {
                this.$router.go(0)
              },
            })
          } else {
            this.$Message.info(res.msg)
          }
        })
      },
    })
  }
  openContract() {
    if(this.loanInfo.contractHtml){
      this.contract_modal = true
    }else{
      window.open(this.loanInfo.contract_url)
    }
    
  }
  async downloadContract() {
    let iframe = document.getElementById('contract')
    downloadPDF(iframe, this.loanInfo.order_no)
  }
  addRemark() {
    this.remark_comment = ''
    this.remark_modal = true
  }
  subRemark() {
    remarkSaveComment(
      {
        orderNo: this.orderNo,
        comment: this.remark_comment,
      },
      (res) => {
        this._getLoanInfo()
        this.$Message.success(res.msg)
        this.remark_modal = false
      }
    )
  }
  loanProof(order_no: any) {
    this.$refs.proof.loanProof(order_no)
  }
}
</script>
<style scoped lang="scss">
$borderColor: #e9eaec;
.box {
  border-left: 1px solid $borderColor;
  border-top: 1px solid $borderColor;
  margin-top: 24px;
  margin-bottom: 30px;
  .col-style {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    text-indent: 20px;
    &.title {
      padding-left: 0;
      text-align: left;
      color: #495060;
      font-weight: bold;
      background-color: #f8f8f9;
    }
    &.error {
      color: red;
    }
  }
}
.SingleSelection {
  width: 300px;
  display: inline-block;
  position: relative;
  left: 80%;
  span {
    padding-right: 10px;
    display: inline-block;
    height: 22px;
    font-size: 14px;
  }
}
.m-orderDetail {
  /deep/ .ivu-tabs {
    .ivu-tabs-nav {
      display: flex;
      width: 100%;
      .ivu-tabs-ink-bar {
        height: 0px;
      }
      .ivu-tabs-tab:nth-child(4) {
        position: absolute;
        right: 0;
        border: 1px solid #3f90f3;
        background: #3f90f3;
        color: #fff;

        text-align: center;
        bottom: 5px;
      }
    }
  }
  /deep/ .ivu-tabs-ink-bar {
    background-color: none;
  }
}
.meng {
  border: 1px solid #e8eaec;
}
.pingzhang {
  padding-left: 100px;
  padding-bottom: 20px;
  font-size: 16px;
  li {
    list-style-type: none;
  }
}
.ivu-modal-footer {
  border-top: 0px solid #e8eaec;
}
.have_handled {
  color: red;
  font-size: 20px;
  text-align: center;
  padding-top: 100px;
  font-weight: 700;
}
</style>

