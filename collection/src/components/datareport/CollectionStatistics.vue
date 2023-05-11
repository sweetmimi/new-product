<template>
  <div class="collection-statistics">

    <div class="search-wrap">
      <Form inline :label-width="100" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('timeHorizon')">
              <DatePicker
                v-model="searchForm.timeFrame"
                type="daterange"
                placeholder="Select date and time"
                style="width: 400px"
                format="yyyy-MM-dd"
                :options="timeLimitConfig"
              ></DatePicker>
            </FormItem>
            <FormItem :label="$t('listModule.personnel.collectionPhase')">
              <Select v-model="searchForm.stage" style="width:400px">
                <Option :value ="item" v-for="(item,index) in  Phase" :key = 'index'>{{item}}</Option>>

              </Select>
            </FormItem>
            <FormItem :label="$t('listModule.personnel.collectionPersonnel')">
              <Select   v-model="searchForm.col_company" style="width:400px">

                <Option :value="item"  v-for="(item,index) in  personnel" :key = 'index'>{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label" :loading="loading" @click="handlePage()">Search</Button>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label" :loading="loading" @click="exportTable()">export</Button>
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
    <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
  </div>
</template>

<script>
import { getCumulativeData, getcuishoustafflist,apiachievement,exportAchievement} from '@/api/datareport'
import { getRatlist
  } from '../../common/js/common.js'
import qs from 'qs'
export default {
  data() {
    return {
      searchForm: {
        timeFrame: [],
        col_company:'',
        stage: 'S1',
        page: 1
      },
      timeLimitConfig:{
          disabledDate(date) {
          return date && date.valueOf() > Date.now()
          }
          },

      Phase:{},
      personnel:[],

      //z tabType=1,
      //y tabType=2
      tabType: '1',
      //y
      //tabType: '1',
      loading: false,
      showTable: false,
      total: 0,
      pageCount: 0,
      pageSize: 10,
      tableDefine1: [
        { title: this.$t("listModule.personnel.date"), align: 'center', key: 'date',  fixed: 'left' },
         { title: this.$t("listModule.personnel.total"), align: 'center', key: 'total',  },
        { title: this.$t("listModule.personnel.follower_name"), align: 'center', key: 'follower_name',  },
        // { title: this.$t("listModule.personnel.t1_recycle"), align: 'center', key: 't1_recycle', width: 130, },
        // { title: this.$t("listModule.personnel.t1_rate"), align: 'center', key: 't1_rate', width: 130 },
        // { title: this.$t("listModule.personnel.t2_recycle"), align: 'center', key: 't2_recycle', width: 130 },
        // { title: this.$t("listModule.personnel.t2_rate"), align: 'center', key: 't2_rate', width: 130 },
        // { title: this.$t("listModule.personnel.t3_recycle"), align: 'center', key: 't3_recycle', width: 130 },
        // { title: this.$t("listModule.personnel.t3_rate"), align: 'center', key: 't3_rate', width: 130 },
        // { title: this.$t("listModule.personnel.t4_recycle"), align: 'center', key: 't4_recycle', width: 130 },
        // { title: this.$t("listModule.personnel.t4_rate"), align: 'center', key: 't4_rate', width: 130 },
        // { title: this.$t("listModule.personnel.t5_recycle"), align: 'center', key: 't5_recycle', width: 130 },
        // { title: this.$t("listModule.personnel.t5_rate"), align: 'center', key: 't5_rate', width: 130 },
        // { title: this.$t("listModule.personnel.t6_recycle"), align: 'center', key: 't6_recycle', width: 130 },
        // { title: this.$t("listModule.personnel.t6_rate"), align: 'center', key: 't6_rate', width: 130 },
        // { title: this.$t("listModule.personnel.t7_recycle"), align: 'center', key: 't7_recycle', width: 130 },
        // { title: this.$t("listModule.personnel.t7_rate"), align: 'center', key: 't7_rate', width: 130 },
        { title: this.$t("listModule.personnel.totalAllNumber"), align: 'center', key: 'cuishou_total',  },
        { title: this.$t("listModule.personnel.unrecycle"), align: 'center', key: 'unrecycle', },
        { title: this.$t("listModule.personnel.recycle_rate"), align: 'center', key: 'recycle_rate',  },
        { title: this.$t("listModule.personnel.settleContractAmount"), align: 'center', key: 'payoff_loan_amount',  },
        { title: this.$t("listModule.personnel.extensionContractAmount"), align: 'center', key: 'rollover_loan_amount',  },
      ],
      tableDefine2: [],
      tableData: []
    }
  },
  methods: {

   getinit(){
       apiachievement({},res=>{
        if(+res.status== 0){
         this.Phase =res.data.type_list

      }
  })
   getcuishoustafflist({},res=>{
    if(+res.status== 0){
        this.personnel = res.data
         }
      })
     },

    _getData() {
      const query = []
      query['query[start_time]'] = this.beginTime
      query['query[end_time]'] = this.endTime
      query['query[type]'] = this.searchForm.stage
      query['query[page]'] = this.searchForm.page
      query['query[follower_name]'] = this.searchForm.col_company
      apiachievement(query, res => {
          if (+res.status === 0) {
            console.log(res)
            const _data = res.data
            this.tableData =[]
            getRatlist(_data.list,['t1_rate','t2_rate','t3_rate','t4_rate','t5_rate','t6_rate','t7_rate','recycle_rate'])

             //console.log(_data.list)
              //console.log( _data.list.sort(this.compare('date')))
            this.tableData = _data.list == 'null'? [] : _data.list
            res.data.header.forEach((item,index)=>{
              if(index==0){
                item.fixed='left';
              }

              item.width=130;
              item.align='center'
            })

          this.tableDefine2 =res.data.header
        // console.log(this.tableDefine2)
            this.total = +_data.arrPager.count
            this.pageCount = +_data.arrPager.count
            this.pageSize = +_data.arrPager.pageSize
            this.showTable = true
          } else {
            this.showTable = false
          }
        })

    },
    handlePage(pageIndex) {

      this.searchForm.page = pageIndex || 1
      this._getData()
    },

    exportTable(){
      const query = []
      query['query[export]'] = 1
      query['query[start_time]'] = this.beginTime
      query['query[end_time]'] = this.endTime
      query['query[type]'] = this.searchForm.stage
      query['query[page]'] = ""
      query['query[follower_name]'] = this.searchForm.col_company
     const payload = Object.assign({}, query,{

      lang: window.lang
    })
    window.open(window.location.origin + '/apiachievement/list?' + qs.stringify(payload), '_blank')
    },
    compare(value){
    return function(a,b){
        var aaa = a[value];
        var bbb = b[value];
        return aaa - bbb;
    }
},
    formatDayTime(val) {
      if (val) {
        const date = new Date(val)
        const Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
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
    },
    initSearchForm() {
      this.searchForm = {
        ...this.searchForm,
        page: 1
      }
      this.loading = false
      this.showTable = false
      this.total = 0
      this.pageCount = 0
      this.pageSize = 10
      this.tableData = []
    }
  },
  watch: {
    tabType(newType) {
      this.initSearchForm()
    }
  },
  computed: {
    beginTime() {
      return this.formatDayTime(this.searchForm.timeFrame[0])
    },
    endTime() {
      return this.formatDayTime(this.searchForm.timeFrame[1])
    },
    tableDefine() {
      return this.tabType === '1' ? this.tableDefine1 : this.tableDefine2
    }
  },
  created(){
    this.getinit()
  }
}
</script>

<style lang="scss" scoped>
</style>
