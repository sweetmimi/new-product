<template>
  <div class="m-productConfig">
    <div class="hd">
      <h2 class="title">{{productId}}{{$t('product.config.title')}}</h2>
     
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
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
                  <Input style="width:50px;"  v-model="loanCount.minLoanNum"></Input>
                </FormItem>
              </Col>
              <Col span="2" style="margin-right: -15px;">~</Col>
              <Col span="2">
                <FormItem 
                :prop="`config[${index}].maxLoanNum`"
                :rules="{validator: validateNum, type: 'string', params: 'maxLoanNum', ind: index, msg: $t('product.config.maxLoanCount'), trigger: 'blur'}">
                  <Input style="width:50px;" v-model="loanCount.maxLoanNum"></Input> 
                </FormItem>
              </Col>
              <Col span="6">
                {{$t('product.config.loanCountTip')}}
              </Col>
              <Col style="text-align: center">
                <Poptip confirm :title="`${$t('product.config.poptipMsg')}`" @on-ok="deleteLoanCount(index)">
                  <Button style="float: right;" type="error" v-if="formDynamic.config.length > 1">{{$t('operate.del')}}</Button>
                </Poptip>
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
                    <Select v-model="loanTerms.loanPeriods" style="width:100px" @on-change="changePeriod(index,key)">
                        <Option v-for="(i,v) in loanPeriodsList" :value="i" :key="v+'1'">{{ i }}</Option>
                  </Select>
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
                    <Input style="width:100px;" v-model="loanTerms.loanTerm"></Input> 
                    {{$t('product.config.unit')}} {{$t('product.config.loanTermTip')}}
                  </FormItem>
                </Col>
                <Col span="5">
                  <Button icon="ios-add-circle" type="text" style="color: #2d8cf0" @click="addTerm(index, key)" v-if="key === (loanCount.loanData.length - 1)">{{$t('product.config.addTerm')}}</Button>
                  <Poptip confirm :title="`${$t('product.config.poptipMsg')}`" @on-ok="deleteTerm(index, key)">
                    <Button icon="ios-trash" type="text" style="color: #ed4014" v-if="loanCount.loanData.length > 1">{{$t('product.config.deleteTerm')}}</Button>
                  </Poptip>
                </Col>
              </Row>
              <Row  v-for="(item,index) in loanTerms.periodsDis" :key="index">
                <Col span="10">
                 <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.di')}${item.num}${$t('product.config.qi')}`">
                     <Input style="width:100px;" v-model="item.dueDays"></Input>
                     {{$t('product.config.unit')}} 

                      <Input style="width:100px;" v-model="item.rate">
                     </Input>%
                    
                 </FormItem>
                </Col>
              </Row>
              <Row>
               
              </Row>
              <Row class="term-info">
                <Col>
                <div style="width:100%;height:60px;disp"> 
                <div style="width:400px;display:block;float:left"> 
                   <FormItem 
                    :label="`${$t('product.config.maxAmount')}：`"
                    style="margin-top: 20px;"
                    :prop="`config[${index}].loanData[${key}].loanMaxAmount`"
                    :rules="{required: true, validator: validateNum, type: 'string', params: 'loanMaxAmount',ind: `${index},${key}`,msg: $t('product.config.maxAmount'), trigger: 'blur'}">
                    <Input  @on-blur="inputMoney($event,index,key,'loanMaxAmount')" v-model.trim="loanTerms.loanMaxAmount" :placeholder="`${$t('inputPrefix')}${$t('product.config.maxAmount')}`" style="width: 200px;">
                     <span slot="append">{{getInputValue(loanTerms.loanMaxAmount)}}</span></Input>
                  </FormItem>
                </div>
                  <div style="width:400px;display:block;float:left"> 
                  
                  <FormItem 
                    :label="`${$t('product.config.minAmount')}：`"
                    style="margin-top: 20px;"
                    :prop="`config[${index}].loanData[${key}].loanMinAmount`"
                    :rules="{required: true, validator: validateNum, type: 'string',params: 'loanMinAmount',ind: `${index},${key}`, msg: $t('product.config.minAmount'), trigger: 'blur'}">
                    <Input  v-model="loanTerms.loanMinAmount" :placeholder="`${$t('inputPrefix')}${$t('product.config.minAmount')}`" style="width: 200px;">
                    <span slot="append">{{getInputValue(loanTerms.loanMinAmount)}}</span></Input>
                  </FormItem>
                  </div>
                  </div>
                   <div style="width:100%;height:60px"> 
                <div style="width:400px;display:block;float:left"> 
                  <FormItem 
                    :label="`${$t('product.config.loanAmountIncr')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].loanAmountIncr`"
                    :rules="{required: true, validator: validateNum, type: 'string', params: 'loanAmountIncr',ind: `${index},${key}`,msg: $t('product.config.loanAmountIncr'), trigger: 'blur'}">
                    <Input  v-model="loanTerms.loanAmountIncr" :placeholder="`${$t('inputPrefix')}${$t('product.config.loanAmountIncr')}`" style="width: 200px;">
                    <span slot="append">{{getInputValue(loanTerms.loanAmountIncr)}}</span>
                     </Input>
                   
                  </FormItem>
                  </div>
                   <div style="width:400px;display:block;float:left"> 
                  <FormItem 
                    :label="`${$t('product.config.interestRate')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].interestRate`"
                    :rules="{required: true, validator: validateFloatNum,ind: `${index},${key}`, type: 'string', msg: $t('product.config.interestRate'), trigger: 'blur'}">
                    <Input :min="0" :step="1.1" v-model="loanTerms.interestRate" :placeholder="`${$t('inputPrefix')}${$t('product.config.interestRate')}`" style="width: 200px;">
                    <span slot="append">%</span></Input> 
                  </FormItem>
                   </div>
                    </div>
                    <div style="width:100%;height:60px;disp"> 
                <div style="width:400px;display:block;float:left"> 
                  <FormItem 
                    :label="`${$t('product.config.serviceFeeRate')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].serviceFeeRate`"
                    :rules="{required: true, validator: validateFloatNum, ind: `${index},${key}`,type: 'string', msg: $t('product.config.serviceFeeRate'), trigger: 'blur'}">
                    <Input :min="0" :step="1.1" v-model="loanTerms.serviceFeeRate" :placeholder="`${$t('inputPrefix')}${$t('product.config.serviceFeeRate')}`" style="width: 200px;">
                    <span slot="append">%</span></Input> 
                  </FormItem>
                  </div>
                   <div style="width:400px;display:block;float:left"> 
                  <FormItem 
                    :label="`${$t('product.config.allowPrepay')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].allowPrepay`"
                    :rules="{required: true, type: 'string', message: `${$t('selectPrefix')}${$t('product.config.allowPrepay')}`, trigger: 'change'}">
                    <Select v-model="loanTerms.allowPrepay" clearable transfer :placeholder="`${$t('selectPrefix')}${$t('product.config.allowPrepay')}`" style="width: 200px;">
                      <Option value=1>{{$t('apply.tableHead.true')}}</Option>
                      <Option value=2>{{$t('apply.tableHead.false')}}</Option>
                    </Select>
                  </FormItem>
                   </div>
                    </div>
                    <div style="width:100%;height:60px"> 
                <div style="width:400px;display:block;float:left"> 
                  <FormItem 
                    :label="`${$t('product.config.isPreDed')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].isPreDed`"
                    :rules="{required: true, type: 'string', message: `${$t('selectPrefix')}${$t('product.config.isPreDed')}`, trigger: 'change'}">
                    <Select v-model="loanTerms.isPreDed" clearable transfer :placeholder="`${$t('selectPrefix')}${$t('product.config.isPreDed')}`" style="width: 200px;">
                      <Option value=1>{{$t('apply.tableHead.true')}}</Option>
                      <Option value=0>{{$t('apply.tableHead.false')}}</Option>
                    </Select>
                  </FormItem>
                </div>
                   </div>

                   <div style="width:100%;height:90px" v-for="(preDed, k) in loanTerms.preDedConfig" :key="k" > 
                      <div style="width:400px;display:block;float:left"> 
                   <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.validDays')}`"
                    :prop="`config[${index}].loanData[${key}].preDedConfig[${k}].validDays`"
                     :rules="{
                        required: true, 
                        validator: validateFloatNum, 
                        type: 'string', 
                        params: 'validDays',
                        ind: `${index},${key},${k}`,
                        msg: $t('product.config.validDays'), 
                        trigger: 'blur',
                        }">
                     <Input style="width:200px;" v-model="preDed.validDays"></Input>
                     {{$t('product.config.unit')}} 
                 </FormItem>
                  </div>
                  <div style="width:250px;display:block;float:left"> 
                    <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.loanAmountRate')}`"
                     :prop="`config[${index}].loanData[${key}].preDedConfig[${k}].loanAmountRate`"
                     :rules="{
                        required: true, 
                        validator: validateFloatNum, 
                        type: 'string', 
                        params: 'loanAmountRate',
                        ind: `${index},${key},${k}`,
                        msg: $t('product.config.loanAmountRate'), 
                        trigger: 'blur',
                        }">
                     <Input style="width:100px;" v-model="preDed.loanAmountRate">
                     <span slot="append">%</span></Input>
                     
                 </FormItem>
                  </div>
                  
                   <div style="width:150px;display:block;float:left;margin-top:20px">
                     <FormItem >
                     <Button icon="ios-add-circle" type="text" style="color: #2d8cf0" @click="addPreDedConfig(index, key, k)" v-if="k === (loanTerms.preDedConfig.length - 1)">Tambahkan waktu yang valid</Button>
                        <Poptip confirm title="Tentukan waktu efektif penghapusan" @on-ok="deletePreDedConfig(index, key, k)" v-if="loanTerms.preDedConfig.length > 1">
                          <Button icon="ios-trash" type="text" style="color: #ed4014" >hapus waktu yang valid</Button>
                        </Poptip>
                     </FormItem>
                   </div>
                   </div>
                  <div style="width:100%;height:60px">
                         <div style="width:400px;display:block;float:left">
                             <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.rolloverTime')}`">
                     <Input style="width:100px;" v-model="loanTerms.rolloverTime.start"></Input>
                     - <Input style="width:100px;" v-model="loanTerms.rolloverTime.end"></Input>
                      {{$t('product.config.unit')}}
                      </FormItem>
                         </div>
                         <div style="width:400px;display:block;float:left">
                           <FormItem 
                     style="margin:20px 0 0 0px;" 
                    :label="`${$t('product.config.rolloverRate')}`">
                     <Input style="width:100px;" v-model="loanTerms.rolloverRate">
                     <span slot="append">%</span></Input>
                     
                 </FormItem>
                         </div>
                  </div>
               
                 
                  <div style="margin-top: 20px;" >
                    <p style="margin-left: 54px;">{{$t('product.config.overdueConfig')}}:</p>
                    <div v-for="(rules, cindex) in loanTerms.overdueConfig" :key="cindex">
                       <Row class="overdue-rules" style="margin-top: 20px;" >
                      <Col span="8" :class="['col-rule', `col-rule-${lang}`]">
                        <FormItem 
                          :label="`${$t('product.config.rules')}${cindex + 1}：`"
                          :prop="`config[${index}].loanData[${key}].overdueConfig[${cindex}].overdueDayMin`"
                          :rules="{required: true, validator: validateNum, type: 'string', msg: $t('product.config.overdueDayMin'), trigger: 'blur'}">
                          {{$t('product.config.overdueDay')}}
                          <Input  style="width:50px; margin-left: 5px;" v-model="rules.overdueDayMin"></Input>
                        </FormItem>
                      </Col>
                      <Col span="1" style="padding-left: 10px;">~</Col>
                      <Col span="2">
                        <FormItem
                          :prop="`config[${index}].loanData[${key}].overdueConfig[${cindex}].overdueDayMax`"
                          :rules="{required: true, validator: validateNum, type: 'string', params: 'overdueDayMax', ind: `${index},${key},${cindex}`,  msg: $t('product.config.overdueDayMax'), trigger: 'blur'}">
                          <Input  style="width:50px;" v-model="rules.overdueDayMax"></Input>
                        </FormItem>
                      </Col>
                      <Col>
                        <Button icon="ios-add-circle" type="text" style="color: #2d8cf0" @click="addRules(index, key, cindex)" v-if="cindex === (loanTerms.overdueConfig.length - 1)">{{$t('product.config.addRules')}}</Button>
                        <Poptip confirm :title="$t('product.config.rulePoptipMsg')" @on-ok="deleteRules(index, key, cindex)" v-if="loanTerms.overdueConfig.length > 1">
                          <Button icon="ios-trash" type="text" style="color: #ed4014" >{{$t('product.config.deleteRules')}}</Button>
                        </Poptip>
                      </Col>
                    </Row>
                    <Row class="rate-row">
                      <Col>
                        <FormItem 
                          :prop="`config[${index}].loanData[${key}].overdueConfig[${cindex}].overdueRate`"
                          :rules="{required: true, validator: validateFloatNum, ind: `${index},${key}`,type: 'string', msg: $t('product.config.overdueRate'), trigger: 'blur'}">
                          {{$t('product.config.overdueRateUnit')}}
                          <Input-number style="width:50px;margin-left: 5px;" :min="0" :max="5" v-model="rules.overdueRate">
                          </Input-number> %
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
      <div class="ft">
        <Button align="center" size="large" style="width: 150px" @click="cancel">{{$t('cancelText')}}</Button>
         <Button type="primary" align="center" size="large" style="margin-left: 100px;" @click="addLoanCount">{{$t('product.config.addLoanCount')}}</Button>
        <Button type="primary" align="center" size="large" style="margin-left: 100px; " @click="CopyLoanCount">Produk duplikat</Button>
        <Button type="success" size="large" align="center" style="margin-left: 100px; " @click="submit">{{$t('product.config.submit')}}</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getProductConfig, saveProductConfig } from '@/api/config'
import {getInputValue} from   '../../common/js/thousand'
@Component
export default class ProductList extends Vue {
  $refs!: {
    config: HTMLFormElement,
    formDynamic: HTMLFormElement
  }
  spinShow = false
  loading = false
  showTable = false
  searchLoading = false
  showModal = false
  lang = 'zh'
  tableData = []
  productId = ''
  is_commercial_product = localStorage.getItem('is_commercial_product')
  getInputValue = getInputValue
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
         
          if (loanMaxAmountvalue < loanMinAmountvalue) {
            callback(new Error(`${this.$t("product.config.loanAmountMsg")}`));

          }
          if(this.is_commercial_product == 'false' &&loanMaxAmountvalue>8000000 ){
            callback(new Error('Jumlah maksimum tidak boleh lebih besar dari 8000000'));
          }
         
          if(this.is_commercial_product == 'true' &&loanMaxAmountvalue>80000000 ){
            callback(new Error('Jumlah maksimum pinjaman komersial tidak boleh lebih dari 80000000'));
          }
        }else if(rule.params === "loanAmountIncr" ) {
           var ruleInd = rule.ind.split(",");
          // console.log(config[ruleInd[0]].loanData[ruleInd[1]])
          var loanAmountIncr = Number(config[ruleInd[0]].loanData[ruleInd[1]].loanAmountIncr);
          console.log(this)
           if(this.is_commercial_product == 'false' &&loanAmountIncr>8000000 ){
            callback(new Error('Jumlah maksimum tidak boleh lebih besar dari 8000000'));
          }
         
          if(this.is_commercial_product == 'true' &&loanAmountIncr>80000000 ){
            callback(new Error('Jumlah maksimum pinjaman komersial tidak boleh lebih dari 80000000'));
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

  mounted(){
   
    
  }
  created () {
    this.lang = window.lang
    this.productId = this.$route.params.id
    this._getProductConfig()
  }
  // $event,index,key,'loanMaxAmount'
  inputMoney(el:any,index:any,key:any,name:any) {
  //  var a= this.formDynamic.config[index].loanData[key][name] =  getInputValue(el);
  //  console.log(a)
  }
  submit () {
    const { config } = this.formDynamic
    this.$refs.formDynamic.validate((valid: any) => {
      if (valid) {
        const maxLoanNum: any[] = []
        config.forEach((item, index) => {
          maxLoanNum.push(item.maxLoanNum)
        })
        if (maxLoanNum.indexOf('n') < 0) {
          this.$Message.error(`${this.$t('product.config.allowMaxLoanNum')}`)
          return false
        }
        this.$Modal.confirm({
          content: `${this.$t('product.config.confirmMsg')}`,
          okText: `${this.$t('okText')}`,
          cancelText: `${this.$t('cancelText')}`,
          onOk: () => {
            this._saveProductConfig()
          }
        })
      }
    })
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
  CopyLoanCount() {
    this.$refs.formDynamic.validate((valid: any) => {
      if (valid) {
        if(this.formDynamic.config&&this.formDynamic.config.length>0){
          var len = this.formDynamic.config.length
          var config =JSON.parse(JSON.stringify(this.formDynamic.config[len-1]))
         if(config.maxLoanNum!='n'){
           var maxLoanNum = Number(config.maxLoanNum)
          config.minLoanNum=maxLoanNum
          config.maxLoanNum=maxLoanNum+=1
          this.formDynamic.config.push(config)
         }else{
           this.$Message.error("Terakhir kali adalah n!")
         }
          
        }
        
        
        
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
  addPreDedConfig(index: number, key: number, k: number){
     this.formDynamic.config[index].loanData[key].preDedConfig.push({
      validDays: null,
      loanAmountRate: null,
    })
  }
  deletePreDedConfig(index: number, key: number, K: number) {
    this.formDynamic.config[index].loanData[key].preDedConfig.splice(K, 1)
  }
  _getProductConfig () {
    this.spinShow = true
    getProductConfig({
      productId: this.productId
    }, (res: any) => {
      if (+res.code === 0) {
        this.spinShow = false
        if(res.data.length>0){
          this.formDynamic.config = res.data
        }
        
      }
    })
  }
  _saveProductConfig () {
    console.log(this.formDynamic)
    Object.assign(this.formDynamic, {
      productId: this.productId
    })
    saveProductConfig(this.formDynamic, (res: any) => {
      if (+res.code === 0) {
        this.$Modal.remove();
        this.$Message.success({
          content: `${this.$t('product.config.submitSuccess')}`,
          onClose: (): void => {
            this.$router.push({
              name: 'productList'
            })
          }
        })
      }else{
        this.$Message.error(res.msg)
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
