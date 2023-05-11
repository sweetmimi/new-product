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
                style="width:300px;"
                :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.date')}`"
              ></DatePicker>
            </FormItem>
            <FormItem :label="`${$t('dataReport.search.loanType')}`" style="width:300px;">
              <Select
                clearable
                transfer
                v-model="searchForm.loan_type"
                :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.loanType')}`"
              >
                <Option v-for="(item, index) in loanTypes" :key="index" :value="index">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.channelSource')" style="width:300px;">
              <Select v-model="searchForm.channelSources">
                <Option v-for="(item, index) in channelSources" @click.native="chioce(item) "    :key="index" :value="index" >{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="handlePage()"
              >{{$t('search')}}</Button>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <!-- <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="_getDailyNowdata()"
              >{{$t('dataReport.search.realTimeData')}}</Button> -->
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
import { getDailyData,getchannel } from '../../api/dataReport'
import { getSelectItems } from '../../api/select'
import {getRatlist} from   '../../common/js/until'
@Component
export default class OrderList extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  $refs!: {
    table: HTMLFormElement
  }
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
  item = ''
  timeLimitConfig = {
    disabledDate(date: any) {
     
      return date && date.valueOf() > Date.now()
    }
  }
  tableColumns: Array<any> = []
  tableDefine1 = [
    { title: this.$t('dataReport.tableHead.houthrow_in.date'), align: 'center', key: 'day', fixed: 'left', minWidth: 110 },
    { title: this.$t('dataReport.tableHead.houthrow_in.active_num'), align: 'center', key: 'active_num',  minWidth: 110 },
    { title: this.$t('dataReport.tableHead.houthrow_in.register'), align: 'center', key: 'register_num', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.houthrow_in.register_rate'), align: 'center', key: 'register_rate', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.houthrow_in.Into_a'), align: 'center', key: 'apply_num', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.houthrow_in.Loan_success'), align: 'center', key: 'lenders_order_num', minWidth: 150 },
    { title: this.$t('dataReport.tableHead.houthrow_in.lregister_aInto'), align: 'center', key: 'jinjian_rate', minWidth: 150 },
     { title: this.$t('dataReport.tableHead.houthrow_in.Into_Loan_success'), align: 'center', key: 'loan_pass_rate', minWidth: 150 },
   

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
 
   chioce(item){
           this.item =item
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
 
  
  _getList() {

   
    const data = {
      

      loanType: this.searchForm.loan_type,
  
      beginTime: this.beginTime,

      endTime: this.endTime,

      channel: this.searchForm.channelSources,

      source:this.item == 'all' ? '':this.item,
    }
      var myDate = new Date();
      let shiji = this.searchForm.timeFrame[1] -this.searchForm.timeFrame[0]
       if(shiji > 604800000){
  
         this.$Message.warning('The selection time cannot be greater than one week');
             return
       }
     this.loading = true
    getDailyData(data, (res: any) => {
      
      
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
        if(tableData[tableData.length-1].day ==this.formatDayTime(myDate) ){
          tableData[tableData.length-1].day = tableData[tableData.length-1].day + "(this.$t('Previoushour'))"
        }
        getRatlist(tableData,['loan_pass_rate','jinjian_rate','register_rate'])
        this.tableData = tableData.reverse() || []
        

        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
 
  created() {
getchannel({},(res:any)=>{
        
       let tableData = []
        if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
          for (let k in res.data.data) {
            tableData.push(res.data.data[k])
            
          }
        } else {
          tableData = res.data.data
        }
         tableData.splice(0,0,this.$t('all'))
         this.channel=tableData
        
       
       
    })

    this._getList()
  }
}
</script>
