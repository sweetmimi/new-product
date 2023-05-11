<template>
  <div class="m-money-data">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.search.expireDate')">
              <DatePicker
                v-model="searchForm.timeFrame"
                type="daterange"
                :placeholder="$t('selectPrefix')+$t('dataReport.search.date')"
               
                format="yyyy-MM-dd"
                :options="timeLimitConfig"
              ></DatePicker>
            </FormItem>
          
         
            <FormItem :label="$t('dataReport.search.channelSou')">
              <Select v-model="searchForm.channelSources" >
                <Option
                  v-for="(item, index) in channelSources"
                  :key="index"
                  :value="index"
                  @click.native="chioce(item)"
                >{{item}}</Option>
              </Select>
            </FormItem>

            <FormItem :label="$t('dataReport.search.loanType')">
              <Select v-model="searchForm.loanType" >
                <Option v-for="(item, index) in loanTypes" :key="index" :value="index">{{item}}</Option>
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
              <Button
                type="primary"
                slot="label"
                style="width:120px"
                :loading="loading"
                @click="_rtincomelist()"
              >{{$t('dataReport.search.realTimeData')}}</Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>

    <Table
      border
      class="list-table"
      v-show="showTable"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>
    <Alert v-show="!(showTable)">{{ $t('noData') }}</Alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { repaymentlist,getappchannel,rtrepaymentlist } from '@/api/dataReport'
import { Getter, Action } from 'vuex-class'
import{export_json_to_excel}  from  "@/vendor/Export2Excel"
@Component
export default class MoneyData extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  searchForm = {
    timeFrame: [],
    loanPeriod: '0',
    loanType: 1,
    channelSources: 0,
    page: 1
  }
   channel = []
   item = ''
  get channelSources() {
    return this.channel || []
  }
  get loanTerms() {
    return this.selectItems.application_term_list || []
  }
  get loanTypes() {
    return this.selectItems.loan_type_list || []
  }
  loading = false
  showTable = false
  searchLoading = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableData = []
  tableDefine = [
    { title: this.$t('dataReport.tableHead.day'), align: 'center', key: 'days', width: 130, fixed: 'left' },
    { title: this.$t('dataReport.tableHead.repay_pageview_num'), align: 'center', key: 'repay_pageview_num', width: 130 },
    { title: this.$t('dataReport.tableHead.repay_detail_pageview_num'), align: 'center', key: 'repay_detail_pageview_num', width: 130 },
    { title: this.$t('dataReport.tableHead.repay_detail_pageview_rate'), align: 'center', key: 'repay_detail_pageview_rate', width: 130 },
    
    { title: this.$t('dataReport.tableHead.repay_detail_bottiom_click_num'), align: 'center', key: 'repay_detail_bottiom_click_num', width: 130 },
    { title: this.$t('dataReport.tableHead.repay_detail_bottiom_click_rate'), align: 'center', key: 'repay_detail_bottiom_click_rate', width: 130 },
    { title: this.$t('dataReport.tableHead.order_extension_bottiommm_click_num'), align: 'center', key: 'order_extension_bottiommm_click_num', width: 130 },
    { title: this.$t('dataReport.tableHead.extension_bottiom_button_click_num'), align: 'center', key: 'extension_bottiom_button_click_num', width: 130 },
    { title: this.$t('dataReport.tableHead.extension_bottiom_button_click_rate'), align: 'center', key: 'extension_bottiom_button_click_rate', width: 130 },
    { title: this.$t('dataReport.tableHead.order_extension_bottiommm_click_rate'), align: 'center', key: 'order_extension_bottiommm_click_rate', width: 130 },
    { title: this.$t('dataReport.tableHead.repay_bottiom_method_click_num'), align: 'center', key: 'repay_bottiom_method_click_num', width: 130 },
    { title: this.$t('dataReport.tableHead.repay_bottiom_method_click_rete'), align: 'center', key: 'repay_bottiom_method_click_rete', width: 130 },
    { title: this.$t('dataReport.tableHead.repay_get_repaycode_num'), align: 'center', key: 'repay_get_repaycode_num', width: 130 },
    { title: this.$t('dataReport.tableHead.repay_get_repaycode_rate'), align: 'center', key: 'repay_get_repaycode_rate', width: 130 },
   
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
  get beginTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[0])
  }
  get endTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[1])
  }

  timeLimitConfig = {
    disabledDate(date: any) {
       
      return date && date.valueOf() > Date.now()
    }
  }
 
  chioce(item:any){
      this.item =item
}
_rtincomelist(){
  const data = {

      beginDate: this.beginTime,

      endDate: this.endTime,
      resource:this.item == 'all'? '' : 'app',

      source:this.item == 'all' ? '' : this.item ,

      loanType:this.searchForm.loanType
    }
  this.loading = true
  rtrepaymentlist(data,res=>{
     this.loading = false
      if (+res.code === 0) {
       
        this.tableData = res.data.data.reverse() || []
        this.showTable = true
      } else {
        this.showTable = false
      }
  })

}
  _getExpireDateDataMoneyData() {

     const Thatday = this.formatDayTime(new Date());

     const  weekago =  this.formatDayTime(+new Date()-604800000);
    const data = {

     beginDate: this.beginTime == ''? weekago : this.beginTime,

     endDate: this.endTime == '' ? Thatday: this.endTime,
     resource:this.item == 'all' || '' ? '' : 'app',

     source:this.item == 'all' ? '' : this.item ,
      loanType:this.searchForm.loanType
    }
    let shiji = this.searchForm.timeFrame[1] -this.searchForm.timeFrame[0]
       if(shiji > 604800000){
  
         this.$Message.warning('The selection time cannot be greater than one week')
             return
       }
    this.loading = true
    repaymentlist(data, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
				
        this.tableData = res.data.data.reverse() || []
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getExpireDateDataMoneyData()
  }

created() {
getappchannel({},(res:any)=>{

       let tableData = []
        if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
          for (let k in res.data.data) {
            tableData.push(res.data.data[k])
            
          }
        } else {
           tableData = res.data.data[0].data
        }
        this.channel=tableData
       
    })

  this._getExpireDateDataMoneyData()
  }
}
</script>
