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

            <FormItem :label="$t('listModule.personnel.userQuery')">
              <Select   v-model="searchForm.col_company" style="width:400px">

                <Option :value="item"  v-for="(item,index) in  personnel" :key = 'index'>{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label" :loading="loading" @click="handlePage()">Search</Button>
            </FormItem>
             <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label" :loading="loading" @click="exportTable()">Export</Button>
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
import { apidaihoulist,daihoutaskornamelist,exportDaihoulist} from '@/api/datareport'
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
      tabType: '1',
      loading: false,
      showTable: false,
      total: 0,
      pageCount: 0,
      pageSize: 10,
      tableDefine1: [
         { title: this.$t("listModule.personnel.follower_name"), align: 'center', key: 'follower_name', width: 130,fixed: 'left' },
        { title: this.$t("listModule.personnel.date"), align: 'center', key: 'days', width: 130, fixed: 'left'  },
         { title: this.$t("listModule.personnel.total"), align: 'center', key: 'num', width: 130 },

        { title: this.$t("listModule.personnel.H3_recycle"), align: 'center', key: 'H3', width: 130, },
        { title: this.$t("listModule.personnel.H3_rate"), align: 'center', key: 'H3Rate', width: 130 },
        { title: this.$t("listModule.personnel.H2_recycle"), align: 'center', key: 'H2', width: 130 },
        { title: this.$t("listModule.personnel.H2_rate"), align: 'center', key: 'H2Rate', width: 130 },
        { title: this.$t("listModule.personnel.H1_recycle"), align: 'center', key: 'H1', width: 130 },
        { title: this.$t("listModule.personnel.H1_rate"), align: 'center', key: 'H1Rate', width: 130 },
        { title: this.$t("listModule.personnel.H0_recycle"), align: 'center', key: 'H0', width: 130 },
        { title: this.$t("listModule.personnel.H0_rate"), align: 'center', key: 'H0Rate', width: 130 },

        { title: this.$t("listModule.personnel.taskPhase"), align: 'center', key: 'recycle_total', width: 150 },
        { title: this.$t("listModule.personnel.rushnumber"), align: 'center', key: 'incuishou_total', width: 130 },
         { title: this.$t("listModule.personnel.taskPhase_recycle"), align: 'center', key: 'recycle_rate', width: 130 },
      ],
      tableDefine2: [],
      tableData: []
    }
  },
  methods: {

   getinit(){
       daihoutaskornamelist({},res=>{
        if(+res.status== 0){
         this.personnel =res.data
        console.log(res,88)
      }
  })

     },

    _getData() {

      const query = []
      query['query[start_time]'] = this.beginTime
      query['query[end_time]'] = this.endTime

      query['query[page]'] = this.searchForm.page
      query['query[follower_name]'] = this.searchForm.col_company
      apidaihoulist(query, res => {
          if (+res.status === 0) {
            console.log(res)
            const _data = res.data
            this.tableData =[]
            getRatlist(_data.list,['H3Rate','H2Rate','H1Rate','H0Rate','recycle_rate'])


              console.log( _data.list.sort(this.compare('date')))
            this.tableData = _data.list == 'null'? [] : _data.list

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
      query['query[page]'] =""
      query['query[follower_name]'] = this.searchForm.col_company
     const payload = Object.assign({}, query, {
      lang: window.lang
    })
    window.open(window.location.origin + '/achievement/apidaihoulist?' + qs.stringify(payload), '_blank')
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
