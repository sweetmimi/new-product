<template>
  <div class="m-productConfig">
    <div class="hd">
      <h2 class="title">{{$t('product.config.addproduct')}}</h2>
    
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
                    :label="`${$t('product.config.loanTerm')}：`"
                    :prop="`config[${index}].loanData[${key}].loanTerm`"
                    :rules="{required: true, type: 'string', message: `${$t('inputPrefix')}${$t('product.config.loanTerm')}`, trigger: 'blur'}">
                    <Input style="width:100px;" v-model="loanTerms.loanTerm"></Input> 
                    {{$t('product.config.unit')}}
                  </FormItem>
                </Col>
                <Col>
                  <Button icon="ios-add-circle" type="text" style="color: #2d8cf0" @click="addTerm(index, key)" v-if="key === (loanCount.loanData.length - 1)">{{$t('product.config.addTerm')}}</Button>
                  <Poptip confirm :title="`${$t('product.config.poptipMsg')}`" @on-ok="deleteTerm(index, key)">
                    <Button icon="ios-trash" type="text" style="color: #ed4014" v-if="loanCount.loanData.length > 1">{{$t('product.config.deleteTerm')}}</Button>
                  </Poptip>
                </Col>
              </Row>
              <Row>
                <Col class="term-tip">{{$t('product.config.loanTermTip')}}</Col>
              </Row>
              <Row class="term-info">
                <Col>
                  <FormItem 
                    :label="`${$t('product.config.maxAmount')}：`"
                    style="margin-top: 20px;"
                    :prop="`config[${index}].loanData[${key}].loanMaxAmount`"
                    :rules="{required: true, validator: validateNum, type: 'string', msg: $t('product.config.maxAmount'), trigger: 'blur'}">
                    <Input  v-model="loanTerms.loanMaxAmount" :placeholder="`${$t('inputPrefix')}${$t('product.config.maxAmount')}`" style="width: 200px;"></Input>
                  </FormItem>
                  <FormItem 
                    :label="`${$t('product.config.minAmount')}：`"
                    style="margin-top: 20px;"
                    :prop="`config[${index}].loanData[${key}].loanMinAmount`"
                    :rules="{required: true, validator: validateNum, type: 'string', msg: $t('product.config.minAmount'), trigger: 'blur'}">
                    <Input  v-model="loanTerms.loanMinAmount" :placeholder="`${$t('inputPrefix')}${$t('product.config.minAmount')}`" style="width: 200px;"></Input>
                  </FormItem>
                  <FormItem 
                    :label="`${$t('product.config.loanAmountIncr')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].loanAmountIncr`"
                    :rules="{required: true, validator: validateNum, type: 'string', msg: $t('product.config.loanAmountIncr'), trigger: 'blur'}">
                    <Input  v-model="loanTerms.loanAmountIncr" :placeholder="`${$t('inputPrefix')}${$t('product.config.loanAmountIncr')}`" style="width: 200px;"></Input>
                  </FormItem>
                  <FormItem 
                    :label="`${$t('product.config.interestRate')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].interestRate`"
                    :rules="{required: true, validator: validateFloatNum, type: 'string', msg: $t('product.config.interestRate'), trigger: 'blur'}">
                    <Input :min="0" :step="1.1" v-model="loanTerms.interestRate" :placeholder="`${$t('inputPrefix')}${$t('product.config.interestRate')}`" style="width: 200px;"></Input> %
                  </FormItem>
                  <FormItem 
                    :label="`${$t('product.config.serviceFeeRate')}：`"
                    style="margin-top: 20px;" 
                    :prop="`config[${index}].loanData[${key}].serviceFeeRate`"
                    :rules="{required: true, validator: validateFloatNum, type: 'string', msg: $t('product.config.serviceFeeRate'), trigger: 'blur'}">
                    <Input :min="0" :step="1.1" v-model="loanTerms.serviceFeeRate" :placeholder="`${$t('inputPrefix')}${$t('product.config.serviceFeeRate')}`" style="width: 200px;"></Input> %
                  </FormItem>
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
                          :rules="{required: true, validator: validateFloatNum, type: 'string', msg: $t('product.config.overdueRate'), trigger: 'blur'}">
                          {{$t('product.config.overdueRateUnit')}}
                          <Input style="width:50px;margin-left: 5px;" v-model="rules.overdueRate"></Input> %
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
          <Button type="primary" align="center" size="large" style="margin-left: 150px; width: 150px" @click="addLoanCount">{{$t('product.config.addLoanCount')}}</Button>
        <Button type="success" size="large" align="center" style="margin-left: 150px; width: 150px" @click="submit">{{$t('product.config.submit')}}</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getProductConfig, saveProductConfig } from '@/api/config'
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
  formDynamic = {
    config: [
      {
        minLoanNum: '',
        maxLoanNum: 'n',
        loanData: [
          {
            loanTerm: '',
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
      callback()
    }
  }
  validateFloatNum = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error(`${this.$t('inputPrefix')}${rule.msg}`))
    } else {
      if (!/^\d+(\.\d+)?$/.test(value)) {
        callback(new Error(`${rule.msg}${this.$t('product.config.floatNumMsg')}`))
      }
      callback()
    }
  }
  created () {
    this.lang = window.lang

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
              loanTerm: '',
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
      loanTerm: '',
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
  deleteLoanCount (index: number) {
    this.formDynamic.config.splice(index, 1)
  }
  deleteTerm(index: number, key: number) {
    this.formDynamic.config[index].loanData.splice(key, 1)
  }
  deleteRules(index: number, key: number, cindex: number) {
    this.formDynamic.config[index].loanData[key].overdueConfig.splice(cindex, 1)
  }
 
  _saveProductConfig () {
    Object.assign(this.formDynamic, {
      productId: 40000
    })
    saveProductConfig(this.formDynamic, (res: any) => {
      if (+res.code === 0) {
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
