<template>

  <div class="m-orderList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('dataReport.search.date')}`">
              <DatePicker
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd"
                v-model="searchForm.timeFrame"
               
                :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.date')}`"
              ></DatePicker>
            </FormItem>
            <FormItem :label="`${$t('dataReport.search.loanType')}`">
              <Select
                clearable
                transfer
                v-model="searchForm.loan_type"
                :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.loanType')}`"
              >
                <Option v-for="(item, index) in loanTypes" :key="index" :value="index">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.channelSource')"  v-model="searchForm.channelSources">
             
                 <Cascader :data="data" v-model="value1"   @on-change="(value,selectedData)=>{handleListenCascader(value,selectedData)}"></Cascader>
              
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="handlePage"
              >{{$t('search')}}</Button>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="_getDailyNowdata()"
                style="width:200px"
              >{{$t('dataReport.search.realTimeData')}}</Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>
 
    <Table
      ref="table"
      border
      class="list-table"
      v-show="showTable"
      :data="tableData"
      :columns="tableColumns"
      :loading="loading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <Button
          type="text"
          class="fix-table-btn"
          @click="viewDetail(props.rowInfo.order_no)"
          icon="ios-eye"
          size="small"
        >{{$t('operate.viewBtn')}}</Button>
      </template>
    </Table>
    <Alert v-show="!showTable">{{ $t('noData') }}</Alert>

    <!-- <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page> -->

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { getReportProductConversion, getDailyNowdata,Reportgetchannel } from '../../api/dataReport'
import { getSelectItems } from '@/api/select'
import index from '@/router';
import {getRatlist} from   '../../common/js/until'
@Component
export default class OrderList extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  $refs!: {
    table: HTMLFormElement
  }
 
 value1= [0]
data = []
  loading = false
  showTable = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableData: Array<any> = []
  channel = []
  searchForm = {
    timeFrame: [],
    page: 1,
    start: null,
    end: null,
    loan_type: 0,
    channelSources: 0
  }
  resource= ''
  source=''
  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now()
    }
  }
   handleListenCascader(value, selectedData){
     if(selectedData.length == 1){
        this.resource = selectedData[0].label
     } if(selectedData.length == 2){
           this.resource = selectedData[0].label
          this.source =selectedData[1].label;
          
    }
      console.log(selectedData[0].label,this.source,777)
   }
  tableColumns: Array<any> = []
  tableDefine1 = [
    { title: this.$t('dataReport.tableHead.day'), align: 'center', key: 'day', fixed: 'left', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.activate'), align: 'center', key: 'active_num', minWidth: 150 },

    { title: this.$t('dataReport.tableHead.zhuce_num'), align: 'center', key: 'zhuce_num', minWidth: 150 },
    // { title: this.$t('dataReport.tableHead.zhuce_rate'), align: 'center', key: 'zhuce_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.base_num'), align: 'center', key: 'base_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.base_rate'), align: 'center', key: 'base_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.emergs_num'), align: 'center', key: 'emergs_num', minWidth: 150 },
   
    { title: this.$t('dataReport.tableHead.emergs_base_rate'), align: 'center', key: 'emergs_base_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.emergs_register_rate'), align: 'center', key: 'emergs_register_rate', minWidth: 200 },
    { title: this.$t('dataReport.tableHead.ktp_num'), align: 'center', key: 'ktp_num', minWidth: 200 },
    { title: this.$t('dataReport.tableHead.ktp_base_rate'), align: 'center', key: 'ktp_base_rate', minWidth: 200 },
    { title: this.$t('dataReport.tableHead.ktp_register_rate'), align: 'center', key: 'ktp_register_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.shiming_num'), align: 'center', key: 'shiming_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.shiming_ktp_rate'), align: 'center', key: 'shiming_ktp_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.shiming_register_rate'), align: 'center', key: 'shiming_register_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ocr_num'), align: 'center', key: 'ocr_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ocr_shiming_rate'), align: 'center', key: 'ocr_shiming_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ocr_register_rate'), align: 'center', key: 'ocr_register_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.face_num'), align: 'center', key: 'face_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.face_ocr_rate'), align: 'center', key: 'face_ocr_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.face_register_rate'), align: 'center', key: 'face_register_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.bank_card_num'), align: 'center', key: 'bank_card_num', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.bank_face_rate'), align: 'center', key: 'bank_face_rate', minWidth: 150 },

     { title: this.$t('dataReport.tableHead.bank_face_register_rate'), align: 'center', key: 'bank_face_register_rate', minWidth: 150 },

     { title: this.$t('dataReport.tableHead.order_num'), align: 'center', key: 'order_num', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.order_bank_card_rate'), align: 'center', key: 'order_bank_card_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.order_register_rate'), align: 'center', key: 'order_register_rate', minWidth: 150 },


     { title: this.$t('dataReport.tableHead.loan_num'), align: 'center', key: 'loan_num', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.loan_register_rate'), align: 'center', key: 'loan_register_rate', minWidth: 160 },
     
  ]
 tableDefine2 = [
    { title: this.$t('dataReport.tableHead.day'), align: 'center', key: 'time_interval', fixed: 'left', minWidth: 150 },
    // { title: this.$t('dataReport.tableHead.activate'), align: 'center', key: 'registration', minWidth: 150 },

    { title: this.$t('dataReport.tableHead.zhuce_num'), align: 'center', key: 'zhuce_num', minWidth: 150 },
    // { title: this.$t('dataReport.tableHead.zhuce_rate'), align: 'center', key: 'zhuce_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.base_num'), align: 'center', key: 'base_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.base_rate'), align: 'center', key: 'base_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.emergs_num'), align: 'center', key: 'emergs_num', minWidth: 150 },
   
    { title: this.$t('dataReport.tableHead.emergs_base_rate'), align: 'center', key: 'emergs_base_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.emergs_register_rate'), align: 'center', key: 'emergs_register_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ktp_num'), align: 'center', key: 'ktp_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ktp_base_rate'), align: 'center', key: 'ktp_base_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ktp_register_rate'), align: 'center', key: 'ktp_register_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.shiming_num'), align: 'center', key: 'shiming_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.shiming_ktp_rate'), align: 'center', key: 'shiming_ktp_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.shiming_register_rate'), align: 'center', key: 'shiming_register_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ocr_num'), align: 'center', key: 'ocr_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ocr_shiming_rate'), align: 'center', key: 'ocr_shiming_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.ocr_register_rate'), align: 'center', key: 'ocr_register_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.face_num'), align: 'center', key: 'face_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.face_ocr_rate'), align: 'center', key: 'face_ocr_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.face_register_rate'), align: 'center', key: 'face_register_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.bank_card_num'), align: 'center', key: 'bank_card_num', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.bank_face_rate'), align: 'center', key: 'bank_face_rate', minWidth: 150 },

     { title: this.$t('dataReport.tableHead.bank_face_register_rate'), align: 'center', key: 'bank_face_register_rate', minWidth: 150 },

     { title: this.$t('dataReport.tableHead.order_num'), align: 'center', key: 'order_num', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.order_bank_card_rate'), align: 'center', key: 'order_bank_card_rate', minWidth: 180 },
     { title: this.$t('dataReport.tableHead.order_register_rate'), align: 'center', key: 'order_register_rate', minWidth: 180 },


     { title: this.$t('dataReport.tableHead.loan_num'), align: 'center', key: 'loan_num', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.loan_register_rate'), align: 'center', key: 'loan_register_rate', minWidth: 160 },
     
  ]
  formatDayTime(val: any): string {
    if (val) {
      const date: any = new Date(val)
      const Y: any = date.getFullYear()
      let M: any = date.getMonth() + 1
      let D: any = date.getDate()
      if (M < 10) {
        M = '0' + M
      }
      if (D < 10) {
        D = '0' + D
      }
      return Y + '-' + M + '-' + D
    } else {
      return ''
    }
  }
  get channelSources() {
    return this.channel || []
  }
 
  get loanTerms() {
    return this.selectItems.application_term_list || []
  }
  get loanTypes() {
    return this.selectItems.loan_type_list || []
  }
  get beginTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[0])
  }
  get endTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[1])
  }
  viewDetail(order_no: string) {
    this.$router.push({
      name: 'orderDetail',
      params: {
        orderNo: order_no
      }
    })
  }
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getList()
  }
  loanTimeChange(date: any) {
    this.searchForm.start = date[0]
    this.searchForm.end = date[1]
  }
  _Reportgetchannel(){
     Reportgetchannel({},(res:any)=>{

        if (+res.code === 0){
         
           let tableData =[] 
          res.data.data.map(function(value,index){
             let  children =[]
             tableData.push({
               value:index, 
               label:value.name,
               children:children
             })
            if(index >= 1){
              value.data.map(function(value,index){
               children.push({
                  value:index, 
                  label:value
               })
              })
            }
              
          })
           console.log
          this.data =tableData
        }
     
    })
  }




  _getList() {
    this.loading = true
    const data = {
      
      
      beginDate: this.beginTime,
      endDate: this.endTime,
     
      source:this.source == 'all'? '':this.source,
      resource:this.resource=='all'? '':this.resource,
      loanType: this.searchForm.loan_type,
    }
    
    getReportProductConversion(data, (res: any) => {
      
      
      this.loading = false
      if (+res.code === 0) {
       
      let tableData = []
        if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
          for (let k in res.data.data) {
            tableData.push(res.data.data[k])
          
          }
        } else {
          tableData = res.data.data
        }
       
        this.tableColumns = this.tableDefine1
          getRatlist(tableData,['base_rate','emergs_base_rate','emergs_register_rate',
          'ktp_base_rate','ktp_register_rate','shiming_ktp_rate','shiming_register_rate','ocr_shiming_rate',
          'ocr_register_rate','face_ocr_rate','face_register_rate','bank_face_rate','bank_face_register_rate',
          'order_bank_card_rate','order_register_rate','loan_register_rate'
          
          ])
        this.tableData = tableData.reverse() || []
        

        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  _getDailyNowdata() {

    
    const data = {
      source:this.source,
      resource:this.resource,
      loanType: this.searchForm.loan_type,
    }
    let shiji = this.searchForm.timeFrame[1] -this.searchForm.timeFrame[0]
       if(shiji > 604800000){
  
         this.$Message.warning(this.$t('oversevenDays'));
             return
       }
    this.loading = true;
    
    getDailyNowdata(data, (res: any) => {
      this.loading = false
     
      if (+res.code === 0) {
        console.log(2222)
        let tableData = []
        if (res.data.nowData instanceof Object && !Array.isArray(res.data.nowData)) {
          for (let k in res.data.nowData) {
            tableData.push(res.data.nowData[k])
          }
        } else {
          tableData = res.data.nowData
        }
        this.tableColumns = this.tableDefine2
        getRatlist(tableData,['base_rate','emergs_base_rate','emergs_register_rate',
          'ktp_base_rate','ktp_register_rate','shiming_ktp_rate','shiming_register_rate','ocr_shiming_rate',
          'ocr_register_rate','face_ocr_rate','face_register_rate','bank_face_rate','bank_face_register_rate',
          'order_bank_card_rate','order_register_rate','loan_register_rate'
          
          ])
        this.tableData = tableData.reverse() || []
        this.total = 0
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  created() {
  
  this._Reportgetchannel()
    this._getList()
  }
}
</script>


