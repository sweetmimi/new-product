<template>
  <div class="m-customerList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('customer.idcard')}`">
              <Input type="text" v-model="searchForm.idcard" :placeholder="$t('inputPrefix')" />
            </FormItem>
            <FormItem :label="`${$t('customer.phone')}`">
              <Input type="text" v-model="searchForm.phone" :placeholder="$t('inputPrefix')" />
            </FormItem>
            <FormItem label="UID">
              <Input type="text" v-model="searchForm.uid" :placeholder="$t('inputPrefix')" />
            </FormItem>
            <!-- <FormItem :label="$t('dataReport.search.channelSource')">
              <Select v-model="searchForm.channel" style="width:150px">
                <Option v-for="(item, index) in channelSources" :key="index" :value="index" @click.native="chioce(item)">{{item}}</Option>
              </Select>
            </FormItem> -->
            <FormItem :label="`${$t('dataReport.search.date')}`">
              <DatePicker
                     v-model="date"
                      type="daterange"
                      :options="timeLimitConfig"
                      format="yyyy-MM-dd"
                      @on-change="timeChange"
                      :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.date')}`">
              </DatePicker>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label" :loading="loading" @click="handlePage()">{{$t('search')}}</Button>
            </FormItem>
            <!-- <Button v-show="showTable && pageCount > 0"
                    icon="ios-download-outline"
                    style="margin-bottom: 10px"
                    type="success"
                    @click="handleExpertData">
              {{$t('customer.export')}}
            </Button> -->
          </div>
        </div>
      </Form>
    </div>

    <Table
      ref="table"
      border
      class="list-table"
    
      :data="tableData"
      :columns="tableDefine"
      :loading="loading">
 
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <Button type="text" class="fix-table-btn" @click="view(props.rowInfo.uid)" icon="ios-eye" size="small">{{$t('operate.viewBtn')}}</Button>
        <Button
            type="text"
            class="fix-table-btn"
            icon="ios-trash-outline"
            size="small"
            @click="destroy(props.rowInfo.uid)"
            >{{ $t("operate.destroyBtn") }}</Button
          >
      </template>
    </Table>
  
    <Page
      :total="+total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator> {{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
 
     <Modal v-model="modal" :title="$t('customer.isDestroy')" >
     
      <Form ref="formDynamic" :model="formInfo" :rules="rules" :label-width="80" >
        <FormItem>
            <p>{{$t('customer.tips')}}</p>
        </FormItem>
        <FormItem
          prop="remark"
          :label="$t('customer.remark')"
        >
          <Input
            type="text"
            v-model="formInfo.remark"
            :placeholder="$t('customer.remark')"
           
          ></Input>
        </FormItem>
        </Form>
         <div slot="footer">
        <Button @click="modal = false">{{$t('cancelText')}}</Button>
        <Button type="success" :loading="btnLoading" @click="isdestroy('formDynamic')">{{$t('okText')}}</Button>
      </div>
        </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import qs from 'qs'
import { getList, getDetail ,customerDestroy} from '@/api/customer'
import { getchannel} from '../../api/dataReport'
import moment from "moment";
@Component
export default class CustomerList extends Vue {
  $refs!: {
    table: HTMLFormElement
  }
  modal=false
  btnLoading = false
  formInfo={
    remark:"",
    uid:"",
  }
  addStartTime=""
  addEndTime=""
  loading = false
  showTable = false
  searchLoading = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableData = []
  date= [moment(new Date()).format("YYYY-MM-DD"),moment(new Date()).format("YYYY-MM-DD")]
  searchForm = {
    page: 1,
    idcard: '',
    phone: '',
    uid: '',
    time_start:moment(new Date()).format("YYYY-MM-DD"),
    time_end:moment(new Date()).format("YYYY-MM-DD"),
    channel: 0,
    source:''
  }
  rules={
    remark:[
       { required: true, message:this.$t('customer.remark'), trigger: "blur" }
    ]
  }
  channel =[]
  get channelSources() {
     return this.channel || []
  }
  chioce(item:any){
  
this.searchForm.source  = item == 'all'? '' : item
console.log(item,2222);


         }
  timeLimitConfig = {
    disabledDate (date: any) {
      return date && date.valueOf() > Date.now()
    }
  }
  tableDefine = [
    { title: 'UID', align: 'center', key: 'uid', fixed: 'left', minWidth: 150 },
    { title: this.$t('customer.name'), align: 'center', key: 'name', minWidth: 150 },
    { title: this.$t('customer.phone'), align: 'center', key: 'phone', minWidth: 150,
     render: (h, params) => {
      return h('div',params.row.phone)
    }
      },
    { title: this.$t('customer.idcard'), align: 'center', key: 'idcard', minWidth: 150 ,
     render: (h, params) => {
      return h('div',params.row.idcard)
    }
    },
    { title: this.$t('customer.createTime'), align: 'center', key: 'create_time', minWidth: 150 },
    // { title: this.$t('customer.authTime'), align: 'center', key: 'auth_time', minWidth: 150 },
    // { title: this.$t('customer.incomingNum'), align: 'center', key: 'incoming_num', minWidth: 150 },
    { title: this.$t('customer.loanNum'), align: 'center', key: 'loan_num', minWidth: 150 },
    // { title: this.$t('customer.settleNum'), align: 'center', key: 'settle_num', minWidth: 150 },
    { title: this.$t('operate.handle'), align: 'center', key: 'option', fixed: 'right', minWidth: 180,
    render: (h: any, params: any) => {
        return h('div', this.$refs.table['$scopedSlots'].action({ rowInfo: params.row}))
      }
    }
  ]
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getList()
  }
  view (id: any) {
    this.$router.push({
      name: 'customerDetail',
      params: {id: id}
    })
  }
  destroy(uid:any){
    this.formInfo.uid= uid
    this.formInfo.remark = ""
    this.modal = true
  }
  isdestroy(name:string){
     this.$refs[name].validate(valid => {
    if (valid) {
      this.btnLoading = true
      customerDestroy(this.formInfo,(res:any)=>{
      if(res.code==0){
        this.$Message.success(res.msg)
        this.btnLoading = false
        this.modal = false
        this._getList()
        
      }else{
        this.btnLoading = false
        this.modal = false
        this.$Message.error(res.msg)
      }
    })
  }})
  }
  _getList() {
    this.loading = true
    getList(this.searchForm, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
        const data = res.data
        this.tableData = data.list || []
        this.total =  Number(data.arrPager.count) 
        this.pageCount = + Number(data.arrPager.count) 
        this.pageSize = +data.arrPager.pageSize
        this.showTable = true
      } else {
        this.showTable = false
      }
    })
  }
  timeChange(date: any) {
    this.searchForm.time_start = date[0]
    this.searchForm.time_end = date[1]
  }
  handleExpertData() {
    const payload = Object.assign({}, this.searchForm, {
      export: 1,
      lang: window.lang
    })
    window.open(window.location.origin + '/exportreport/customershow?' + qs.stringify(payload), '_blank')
  }
  created() {
    
    this._getList()
  }
}
</script>
