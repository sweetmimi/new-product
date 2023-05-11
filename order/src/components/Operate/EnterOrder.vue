<template>
  <div class="m-enterOrder">
    <Table
      ref="table"
      border
      class="list-table"
      v-show="showTable"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size=18 class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <Button type="text" class="fix-table-btn" :disabled="!props.rowInfo.is_super" @click="edit(props.rowInfo)" icon="ios-create-outline" size="small">{{$t('operate.editBtn')}}</Button>
      </template>
    </Table>
    <Alert v-show="!showTable">{{ $t('noData') }}</Alert>
    <Modal
    v-model="show"
    width="800"
    @on-visible-change="visibleChange"
    :title="$t('apply.editConfig.editTitle')">
      <Form :label-width="120" ref="form" :rules="rules" :model="formInfo">
        <FormItem :label="$t('apply.editConfig.channel')">
          {{formInfo.channel}}
        </FormItem>
        <FormItem :label="$t('apply.editConfig.applyTime')">
          <TimePicker 
            format="HH:mm"
            type="timerange"
            placement="bottom-end"
            v-model="formInfo.applyTime"
            @on-change="pickerTime"
          >
          </TimePicker>
        </FormItem>
        <FormItem :label="$t('apply.editConfig.applyLimit')" 
        :prop="'apply_limit'"
        :rules="{required: true, type: 'number', message: $t('inputPrefix'), trigger: 'change' }">
          <InputNumber :min=0 v-model="formInfo.apply_limit"></InputNumber>
        </FormItem>
        <FormItem>
          <div class="term-config" v-for="(v, k) in formInfo.apply_term_config" :key="k">
            <FormItem 
            :prop="`apply_term_config[${k}].term`"
            :rules="{required: true, type: 'string', message: $t('selectPrefix'), trigger: 'change'}">
            <span class="red"></span>
              <Select style="width:100px;" clearable v-model="formInfo.apply_term_config[k].term" >
                <Option v-for="(item, index) in termMap" :key="index" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
            <div class="term-limit">
              {{$t('apply.editConfig.termLimt')}}：
            </div>
            <FormItem 
            :prop="`apply_term_config[${k}].limit`"
            :rules="{required: true, type: 'number', message: $t('inputPrefix'), trigger: 'blur'}">
              <InputNumber :min=0 v-model="formInfo.apply_term_config[k].limit"></InputNumber>
            </FormItem> 
            <Poptip
              confirm
              v-if="formInfo.apply_term_config.length > 1"
              :title="$t('apply.editConfig.delConfirmMsg')"
              @on-ok="delTerm(k)">
              <Button class="fix-table-btn" type="text">{{$t('operate.del')}}</Button>
          </Poptip>
          <Button v-if="k === formInfo.apply_term_config.length - 1" class="fix-table-btn" type="text" @click="addTerm">{{$t('operate.add')}}</Button>
          </div>
        </FormItem>
        <Alert>{{$t('apply.editConfig.notice')}}</Alert>

        <FormItem :label="$t('apply.editConfig.flow')">
           <i-Switch v-model="push_switch" @on-change="change" />
           </FormItem>
          <FormItem  :label="$t('apply.editConfig.sign')">
           <i-Switch v-model="digisign_switch" @on-change="signature" />
           </FormItem>
        <FormItem :label="$t('apply.editConfig.orderSwitch')" 
        :prop="'order_switch'"
        :rules="{required: true, message: $t('selectPrefix'), trigger: 'change'}">
          <RadioGroup v-model="formInfo.order_switch">
            <Radio label="1">
              <span>{{$t('apply.tableHead.true')}}</span>
            </Radio>
            <Radio label="0">
              <span>{{$t('apply.tableHead.false')}}</span>
            </Radio>
          </RadioGroup>
         </FormItem>
         <FormItem :label="$t('apply.editConfig.applySwitch')" 
         :prop="'apply_switch'"
         :rules="{required: true, message: $t('selectPrefix'), trigger: 'change'}">
          <RadioGroup v-model="formInfo.apply_switch">
            <Radio label="1">
              <span>{{$t('apply.tableHead.true')}}</span>
            </Radio>
            <Radio label="0">
              <span>{{$t('apply.tableHead.false')}}</span>
            </Radio>

            
          </RadioGroup>
            
            
         </FormItem> 
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{$t('cancelText')}}</Button>
        <Button type="success" :loading="btnLoading" @click="saveConfig">{{$t('okText')}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getApplyConfigList, saveApplyConfig } from '@/api/monitor'
import { loanApi } from '@/constants/api'
@Component
export default class EnterOrder extends Vue {
  $refs!: {
    form: HTMLFormElement,
    table: HTMLFormElement
  }

  
  tableData = []
  loading = false
  btnLoading = false
  show = false
  showTable = false
  termLength = 0
  termMap = {}
   push_switch :any =''
   digisign_switch: any =''
  formInfo = {
   push_switch:null,
   digisign_switch:null,
    id: '',
    channel: '',
    apply_start_time: '',
    apply_end_time: '',
    apply_limit: null,
    apply_term_config: [{
      limit: null,
      term: ''
    }],
    apply_switch: null,
    order_switch: null,
    applyTime: []
  }

  
  rules = {
    applyTime: [{ validator: this.validatePass, trigger: 'change' }]
  }
  tableDefine = [
    { title: this.$t('apply.tableHead.channel'), align: 'center', key: 'channel', fixed: 'left', minWidth: 110 },
    { title: this.$t('apply.tableHead.applyTime'), align: 'center', key: 'apply_time', minWidth: 100 },
    { title: this.$t('apply.tableHead.applyAmount'), align: 'center', key: 'apply_limit', minWidth: 100 },
    { title: this.$t('apply.tableHead.canApplyOrder'), align: 'center', key: 'apply_switch_desc', minWidth: 100 },
    { title: this.$t('apply.tableHead.canApply'), align: 'center', key: 'order_switch_desc', minWidth: 100 },
    { title: this.$t('operate.handle'), align: 'center', key: 'option', fixed: 'right', minWidth: 100,
    render: (h: any, params: any) => {
        return h('div', this.$refs.table['$scopedSlots'].action({ rowInfo: params.row}))
      }
    }
  ]
  validatePass(rule: any, value: any, callback: Function) {
    let valid = false
    value.every((item: any, index: number) => {
      if (item) {
        valid = true
      } else {
        valid = false
      }
    })
    if (!valid) {
      callback(new Error(`${this.$t('selectPrefix')}${this.$t('apply.editConfig.applyTime')}`))
    }
  }
  pickerTime(date: any) {
    this.formInfo.apply_start_time = date[0]
    this.formInfo.apply_end_time = date[1]
  }
   change (status) {

                if(status == 1){
                    this.$Message.info('Open the bottom of traffic');
                }else{
                 this.$Message.info('Turn off traffic');
                }
                
               
            }
  signature (status) {

                if(status == 1){
                    this.$Message.info('Enable e-signature');
                }else{
                 this.$Message.info('Turn off e-signatures');
                }
                
               
            }
  addTerm() {
    if (this.formInfo.apply_term_config.length >= this.termLength) {
      return
    }
    this.formInfo.apply_term_config.push({
      limit: null,
      term: ''
    })
  }
  delTerm(index: number) {
    if (this.formInfo.apply_term_config.length === 1) {
      return
    }
    this.formInfo.apply_term_config.splice(index, 1)
  }
  edit(rowInfo: any) {
    this.show = true
    this.termLength = Object.keys(rowInfo.config_term).length
    this.termMap = rowInfo.config_term
     this.push_switch =rowInfo.push_switch  == 0 ? false :true
    this.digisign_switch =rowInfo.digisign_switch  == 0 ? false :true
    //console.log(rowInfo.digisign_switch)
    Object.assign(this.formInfo, {
      id: rowInfo.id,
      apply_end_time: rowInfo.apply_end_time,
      apply_start_time: rowInfo.apply_start_time,
      apply_limit: +rowInfo.apply_limit,
      apply_switch: rowInfo.apply_switch,
      apply_term_config: JSON.parse(JSON.stringify(rowInfo.apply_term_config)),
      channel: rowInfo.channel,
      order_switch: rowInfo.order_switch,
      applyTime: [rowInfo.apply_start_time, rowInfo.apply_end_time],
     
    })
  }
  visibleChange(status: boolean) {
    if (!status) {
      this.$refs.form.resetFields()
    }
  }
  saveConfig() {
    this.$refs.form.validate((valid: any) => {
      if (valid) {
        this.$Modal.confirm({
          content: `${this.$t('apply.editConfig.confirmMsg')}？`,
          okText: `${this.$t('okText')}`,
          cancelText: `${this.$t('cancelText')}`,
          onOk: () => {
            this.btnLoading = true
            // console.log(this.push_switch==  true ? 1:0 ,77777 )
             let push_switch =  this.push_switch==  true ? 1:0;
             let digisign_switch =  this.digisign_switch==  true ? 1:0;
                   this.formInfo.push_switch = push_switch
                   this.formInfo.digisign_switch = digisign_switch
            saveApplyConfig(this.formInfo, (res: any) => {
              this.btnLoading = false
              if (+res.code === 0) {
                this.show = false
                this.$Message.success(this.$t('editSuccess'))
                this._getList()
              }
            })
          }
        })
      }
    })
  }
  cancel() {
    this.show = false
  }
  _getList() {
    this.loading = true
    getApplyConfigList((res: any) => {
      this.loading = false
      if (+res.code === 0) {
        const data = res.data
       
        // this.push_switch = res.data[0].push_switch  == 0 ? false :true
        // this.digisign_switch = res.data[0].digisign_switch  == 0 ? false :true
        data.map((item: any, index: number) => {
          item.apply_time = this._formatTime(item.apply_start_time, item.apply_end_time)
          item.apply_switch_desc = +item.apply_switch === 1 ? this.$t('apply.tableHead.true') : this.$t('apply.tableHead.false')
          item.order_switch_desc = +item.order_switch === 1 ? this.$t('apply.tableHead.true') : this.$t('apply.tableHead.false')
        })
        this.tableData = data || []
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  _formatTime(beginTime: any, endTime: any) {
    return `${beginTime} - ${endTime}`
  }
  created() {
    this._getList()
  }
}
</script>

<style lang="scss" scoped>
.term-config {
  display: flex;
  margin-top: 20px;
  .term-limit {
    margin-left: 10px;
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
</style>
