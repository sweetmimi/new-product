<template>
  <div class="m-productConfig">
    <div class="hd">
      <h2 class="title">{{$t('product.config.title')}}</h2>
     
    </div>
    <div class="bd bd-id">
      <Form ref="formDynamic" :model="formDynamic" :label-width="140">
        <Card class="m-card loan-count" v-for="(loanCount, index) in formDynamic.config" :key="index">
          <FormItem class="form-item">
            <Row>
              <Col span="4" style="margin-left: -100px;">
                <span class="red"></span>
                {{$t('product.config.loanCount')}}:
              </Col>
              <Col span="3">
                <FormItem 
                  :prop="`config[${index}].minLoanNum`"
                  :rules="{validator: validateNum, type: 'string', trigger: 'blur', msg: $t('product.config.minLoanCount')}">
                  <span style="width:50px;"  >{{loanCount.minLoanNum}}</span>
                </FormItem>
              </Col>
              <Col span="2" style="margin-right: -15px;">~</Col>
              <Col span="2">
                <FormItem 
                :prop="`config[${index}].maxLoanNum`"
                :rules="{validator: validateNum, type: 'string', params: 'maxLoanNum', ind: index, msg: $t('product.config.maxLoanCount'), trigger: 'blur'}">
                  <span style="width:50px;">{{loanCount.maxLoanNum}}</span> 
                </FormItem>
              </Col>
              <Col span="6">
                {{$t('product.config.loanCountTip')}}
              </Col>
             
            </Row>
            <div v-for="(loanTerms, key) in loanCount.loanData" :key="key" class="loan-term">
              <Row>
                <Col span="10">
                     <FormItem 
                      style="margin-left: 0px;" 
                    :label="`${$t('product.config.loanPeriods')}：`"
                    :prop="`config[${index}].loanData[${key}].loanPeriods`"
                    :rules="{required: true, type: 'string', message: `${$t('inputPrefix')}${$t('product.config.loanTerm')}`, trigger: 'blur'}">
                    <span style="width:100px" @on-change="changePeriod(index,key)">
                        {{loanTerms.loanPeriods}}
                  </span>
                  {{$t('product.config.qi')}}
                  </FormItem>
                 </Col>
              </Row>
              <Row>
                <Col span="15">
                  <FormItem 
                     style="margin-top: 20px;" 
                    :label="`${$t('product.config.loanTerm')}：`"
                    :prop="`config[${index}].loanData[${key}].loanTerm`"
                    :rules="{
                      required: true, 
                      type: 'string',
                      validator: validateFloatNum, 
                      params: 'loanTerm',
                      ind: `${index},${key}`, 
                      trigger: 'blur'}">
                    <span style="width:100px;">{{loanTerms.loanTerm}}</span> 
                    {{$t('product.config.unit')}} {{$t('product.config.loanTermTip')}}
                  </FormItem>
                </Col>
               
              </Row>
              <Row  v-for="(item,index) in loanTerms.periodsDis" :key="index">
                <Col span="10">
                 <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.di')}${item.num}${$t('product.config.qi')}`">
                     <span style="width:100px;" >{{item.dueDays}}</span>
                     {{$t('product.config.unit')}} 

                      <span style="width:100px;">{{item.rate}}</span>
                    %
                 </FormItem>
                </Col>
              </Row>
              <Row>
               
              </Row>
              <Row class="term-info">
                <Col>
                  <FormItem 
                    :label="`${$t('product.config.maxAmount')}：`"
                    style="margin-top: 20px;"
                    :prop="`config[${index}].loanData[${key}].loanMaxAmount`"
                    :rules="{required: true, validator: validateNum, type: 'string', params: 'loanMaxAmount',ind: `${index},${key}`,msg: $t('product.config.maxAmount'), trigger: 'blur'}">
                    <span  style="width: 200px;">{{loanTerms.loanMaxAmount}}</span>
                  </FormItem>
                  
                  <FormItem 
                    :label="`${$t('product.config.minAmount')}：`"
                    style="margin-top: 20px;"
                    :prop="`config[${index}].loanData[${key}].loanMinAmount`"
                    :rules="{required: true, validator: validateNum, type: 'string',params: 'loanMinAmount',ind: `${index},${key}`, msg: $t('product.config.minAmount'), trigger: 'blur'}">
                    <span   style="width: 200px;">{{loanTerms.loanMinAmount}}</span>
                  </FormItem>
                 
                  <FormItem 
                    :label="`${$t('product.config.loanAmountIncr')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].loanAmountIncr`"
                    :rules="{required: true, validator: validateNum, type: 'string', msg: $t('product.config.loanAmountIncr'), trigger: 'blur'}">
                    <span style="width: 200px;">{{loanTerms.loanAmountIncr}}</span>
                  </FormItem>
                  <FormItem 
                    :label="`${$t('product.config.interestRate')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].interestRate`"
                    :rules="{required: true, validator: validateFloatNum,ind: `${index},${key}`, type: 'string', msg: $t('product.config.interestRate'), trigger: 'blur'}">
                    <span style="width: 200px;">{{loanTerms.interestRate}}</span> %
                  </FormItem>
                  <FormItem 
                    :label="`${$t('product.config.serviceFeeRate')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].serviceFeeRate`"
                    :rules="{required: true, validator: validateFloatNum, ind: `${index},${key}`,type: 'string', msg: $t('product.config.serviceFeeRate'), trigger: 'blur'}">
                    <span >{{loanTerms.serviceFeeRate}}</span> %
                  </FormItem>
                  <FormItem 
                    :label="`${$t('product.config.allowPrepay')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].allowPrepay`"
                    :rules="{required: true, type: 'string', message: `${$t('selectPrefix')}${$t('product.config.allowPrepay')}`, trigger: 'change'}">
                    <span style="width: 200px;">
                      <span v-if="loanTerms.allowPrepay==1" value=1>{{$t('apply.tableHead.true')}}</span>
                      <span v-if="loanTerms.allowPrepay==2">{{$t('apply.tableHead.false')}}</span>
                    </span>
                  </FormItem>
                  <FormItem 
                    :label="`${$t('product.config.isPreDed')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].isPreDed`"
                    :rules="{required: true, type: 'string', message: `${$t('selectPrefix')}${$t('product.config.isPreDed')}`, trigger: 'change'}">
                     <span style="width: 200px;">
                      <span v-if="loanTerms.isPreDed==1" value=1>{{$t('apply.tableHead.true')}}</span>
                      <span v-if="loanTerms.isPreDed==2">{{$t('apply.tableHead.false')}}</span>
                    </span>
                  </FormItem>

                   <div style="width:100%;height:60px" v-for="(preDed, k) in loanTerms.preDedConfig" :key="k" > 
                      <div style="width:400px;display:block;float:left"> 
                   <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.validDays')}`"
                    >
                     <span style="width:200px;" >{{preDed.validDays}}</span>
                     {{$t('product.config.unit')}} 
                      <span >{{$t('product.config.loanAmountRate')}}{{preDed.loanAmountRate}}%</span>
                 </FormItem>
                  </div>
                   </div>
                 <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.rolloverTime')}`">
                     <span style="width:100px;" >{{loanTerms.rolloverTime.start}}</span>
                     - <span style="width:100px;" >{{loanTerms.rolloverTime.end}}</span>
                      {{$t('product.config.unit')}}
                 </FormItem>
                 <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.rolloverRate')}`">
                     <span style="width:100px;" >{{loanTerms.rolloverRate}}</span>
                     %
                 </FormItem>
                  <div style="margin-top: 20px;" >
                    <p style="margin-left: 124px;font-weight:600">{{$t('product.config.overdueConfig')}}</p>
                    <div v-for="(rules, cindex) in loanTerms.overdueConfig" :key="cindex">
                       <Row class="overdue-rules" style="margin-top: 20px;" >
                      <Col span="8" :class="['col-rule', `col-rule-${lang}`]">
                        <FormItem 
                          :label="`${$t('product.config.rules')}${cindex + 1}：`"
                          :prop="`config[${index}].loanData[${key}].overdueConfig[${cindex}].overdueDayMin`"
                          :rules="{required: true, validator: validateNum, type: 'string', msg: $t('product.config.overdueDayMin'), trigger: 'blur'}">
                          {{$t('product.config.overdueDay')}}
                          <span  style="width:50px; margin-left: 5px;" >{{rules.overdueDayMin}}</span>
                        </FormItem>
                      </Col>
                      <Col span="1" style="padding-left: 10px;">~</Col>
                      <Col span="2">
                        <FormItem
                          :prop="`config[${index}].loanData[${key}].overdueConfig[${cindex}].overdueDayMax`"
                          :rules="{required: true, validator: validateNum, type: 'string', params: 'overdueDayMax', ind: `${index},${key},${cindex}`,  msg: $t('product.config.overdueDayMax'), trigger: 'blur'}">
                          <span  style="width:50px;" >{{rules.overdueDayMax}}</span>
                        </FormItem>
                      </Col>
                     
                    </Row>
                    <Row class="rate-row">
                      <Col>
                        <FormItem 
                          :prop="`config[${index}].loanData[${key}].overdueConfig[${cindex}].overdueRate`"
                          :rules="{required: true, validator: validateFloatNum, ind: `${index},${key}`,type: 'string', msg: $t('product.config.overdueRate'), trigger: 'blur'}">
                          {{$t('product.config.overdueRateUnit')}}
                          <span style="width:50px;margin-left: 5px;" >{{rules.overdueRate}}</span> %
                        </FormItem>
                      </Col>
                    </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </FormItem>
        </Card>
      </Form>
      
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { productVersionHistory } from '@/api/config'
@Component
export default class ProductList extends Vue {
  $refs!: {
    config: HTMLFormElement,
    formDynamic: HTMLFormElement
  }
  loading = false
  showTable = false
  searchLoading = false
  showModal = false
  lang = 'zh'
  tableData = []
  productId = ''
  loanPeriodsList=['1','2','3','4','5','6','7','8']
  formDynamic = {
    config: [
      {
        minLoanNum: '',
        maxLoanNum: 'n',
        loanData: [
          {
            loanPeriods:'1',
            loanTerm: null,
            periodsDis:[{'num':1,'rate':100,'dueDays':null},],
            isPreDed:null,
            rolloverTime:{'start':null,'end':null},
            rolloverRate:null,
            preDedConfig:[{'validDays' : null,'loanAmountRate' : null}],
            loanMinAmount: null,
            loanMaxAmount: null,
            loanAmountIncr: null,
            serviceFeeRate: null,
            interestRate: null,
            allowPrepay: '',
            overdueConfig: [
              {
                overdueDayMin: null,
                overdueDayMax: null,
                overdueRate: null
              }
            ]
          }
        ]
      }
    ]
  }
  validateNum = (rule: any, value: any, callback: any) => {
    const { config } = this.formDynamic
    if (!value) {
      callback(new Error(`${this.$t('inputPrefix')}${rule.msg}`))
    } else {
      if (value !== 'n' && !/^[0-9]\d*$/.test(value)) {
        callback(new Error(`${rule.msg}${this.$t('product.config.numberMsg')}`))
      } else if (rule.params === 'maxLoanNum') {
        if (+config[rule.ind].maxLoanNum <= +config[rule.ind].minLoanNum) {
          callback(new Error(`${this.$t('product.config.loanCountMsg')}`))
        }
      }
       else if (rule.params === "loanMaxAmount" ||  rule.params ==="loanMinAmount") {
          var ruleInd = rule.ind.split(",");
          var loanMaxAmountvalue = Number(
            config[ruleInd[0]].loanData[ruleInd[1]].loanMaxAmount
          );
          var loanMinAmountvalue = Number(
            config[ruleInd[0]].loanData[ruleInd[1]].loanMinAmount
          );
          console.log(loanMaxAmountvalue)
          console.log(config[ruleInd[0]].maxLoanNum)
          if (loanMaxAmountvalue < loanMinAmountvalue) {
            callback(new Error(`${this.$t("product.config.loanAmountMsg")}`));

          }
        }
      callback()
    }
  }
  validateFloatNum = (rule: any, value: any, callback: any) => {
    const { config } = this.formDynamic
    const ruleInd = rule.ind.split(",");
    if (!value) {
      callback(new Error(`${this.$t('inputPrefix')}${rule.msg}`))
    } else {
      if (!/^\d+(\.\d+)?$/.test(value)) {
        callback(new Error(`${rule.msg}${this.$t('product.config.floatNumMsg')}`))
      }else if(rule.params === "loanAmountRate"){
          if (+config[ruleInd[0]].loanData[ruleInd[1]].preDedConfig[ruleInd[2]].loanAmountRate < 90) {
          callback(new Error("Rasio kontrak tidak boleh kurang dari 90"))
        }
         if (+config[ruleInd[0]].loanData[ruleInd[1]].preDedConfig[ruleInd[2]].loanAmountRate > 100) {
          callback(new Error("Rasio kontrak tidak boleh lebih besar dari 100"))
        }
      }else if(rule.params === "loanTerm"){
        var myterm = 0;
        var myrate =0;
        config[ruleInd[0]].loanData[ruleInd[1]].periodsDis.forEach((item,index)=>{
         myterm += Number(item.dueDays)  
         myrate += Number(item.rate)  
        })
       if (value != myterm ) {
          callback(new Error('Jumlah setiap periode sama dengan periode aplikasi'))
        }
         if ( myrate !=100) {
          callback(new Error('Periode Persentase Kumulatif 100%'))
        }
      }
    
      callback()
    }
  }
  created () {
    this.lang = window.lang
    this.productId = this.$route.params.productId
    this._productVersionHistory()
  }

  cancel () {
    this.$router.push({
      name: 'productList'
    })
  }
  addLoanCount () {
    this.$refs.formDynamic.validate((valid: any) => {
      if (valid) {
        this.formDynamic.config.push({
          minLoanNum: '',
          maxLoanNum: '',
          loanData: [
            {
              loanPeriods:'1',
              loanTerm: null,
              periodsDis:[{'num':1,'rate':100,'dueDays':null},],
              isPreDed:null,
              rolloverTime:{'start':null,'end':null},
              rolloverRate:null,
              preDedConfig:[{'validDays' : null,'loanAmountRate' : null}],
              loanMinAmount: null,
              loanMaxAmount: null,
              loanAmountIncr: null,
              serviceFeeRate: null,
              interestRate: null,
              allowPrepay: '',
              overdueConfig: [
                {
                  overdueDayMin: null,
                  overdueDayMax: null,
                  overdueRate: null
                }
              ]
            }
          ]
        })
      }
    })
  }
  addTerm (index: number, key: string) {
    this.formDynamic.config[index].loanData.push({
      loanPeriods:'1',
      loanTerm: null,
      periodsDis:[{'num':1,'rate':100,'dueDays':null},],
      isPreDed:null,
      rolloverTime:{'start':null,'end':null},
      rolloverRate:null,
      preDedConfig:[{'validDays' : null,'loanAmountRate' : null}],
      loanMinAmount: null,
      loanMaxAmount: null,
      loanAmountIncr: null,
      serviceFeeRate: null,
      interestRate: null,
      allowPrepay: '',
      overdueConfig: [
        {
          overdueDayMin: null,
          overdueDayMax: null,
          overdueRate: null
        }
      ]
    })
  }
  addRules (index: number, key: number, cindex: string) {
    this.formDynamic.config[index].loanData[key].overdueConfig.push({
      overdueDayMin: null,
      overdueDayMax: null,
      overdueRate: null
    })
  }
  changePeriod(index: number, key: string){
   var num =Number(this.formDynamic.config[index].loanData[key].loanPeriods) 
   console.log(num)
   var arr =[];
  for (let i = 1; i <= num; i++) {
      arr.push(
      {'num':i,'rate':null,'dueDays':null}
    )
  }
  console.log(arr)
  this.formDynamic.config[index].loanData[key].periodsDis = arr;
  }
  deleteLoanCount (index: number) {
    this.formDynamic.config.splice(index, 1)
  }
  deleteTerm(index: number, key: number) {
    this.formDynamic.config[index].loanData.splice(key, 1)
  }
  deleteRules(index: number, key: number, cindex: number) {
    this.formDynamic.config[index].loanData[key].overdueConfig.splice(cindex, 1)
  }
  _productVersionHistory () {
    productVersionHistory({
      version: this.$route.params.version,
      productId:this.$route.params.productId,
    }, (res: any) => {
      if (+res.code === 0) {
        if(res.data.length>0){
          this.formDynamic.config = res.data
        }
        
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.m-productConfig {
  .hd {
    overflow: hidden;
    .title {
      font-size: 18px;
      font-weight: bold;
      float: left;
    }
    .add-loan-count {
      float: right;
    }
    
  }
  .loan-count {
    margin-top: 20px;
    .loan-term {
      margin: 30px 0 0 -100px;
      .term-info {
        margin-left: 20px;
      }
    }
  }
  .ft {
    text-align: center;
  }
}
</style>
<style lang="scss">
.m-productConfig {
  .ivu-input, .ivu-input-string {
    z-index: 2;
  }
  .loan-term {
    .ivu-form-item-error-tip {
      left: 150px;
    }
  }
  .overdue-rules {
    .col-rule {
      width: 260px;
      .ivu-form-item-error-tip {
        left: 150px;
      }
    }
    .col-rule-id-ID {
      width: 350px;
    }
    .ivu-form-item-error-tip {
      left: 0;
    }
  }
}
.rate-row {
  margin: 25px 0 0 140px;
  .ivu-form-item-error-tip {
    left: 75px !important;
  }
}
.red {
  &:before {
      content: '*';
      display: inline-block;
      margin-right: 4px;
      line-height: 1;
      font-family: SimSun;
      font-size: 12px;
      color: #ed4014;
  }
}
.count-tip {
  line-height: 1.2;
  margin: 15px 0 0 40px;
  vertical-align: middle;
}
.term-tip {
  line-height: 1.2;
  margin: 15px 0 0 120px;
  vertical-align: middle;
}
</style>
