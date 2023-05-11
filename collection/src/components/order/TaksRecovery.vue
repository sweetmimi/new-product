<template>
  <div>
    <Form inline ref="searchForm" :model="searchFormInfo" :label-width="100" >
      <!-- <FormItem v-if="isCuishouAdmin&&isDaihouAdmin" :label="$t('caseManage.serachBlock.organization')">
        <Input

          v-model="searchFormInfo.organization"
          :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.organization')}`"
        ></Input>
      </FormItem> -->
      <FormItem v-if="isCuishouAdmin||isDaihouAdmin" label="Staff">
        <Select
          v-if="listSelect.anJianList"
          filterable
          clearable
          transfer
          v-model="searchFormInfo.followName"
          :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.principal')}`"
        >
          <Option
            :key="index"
            :value="option.key"
            v-for="(option, index) in listSelect.anJianList.followUser"
          >{{option.value}}</Option>
        </Select>
      </FormItem>
      <FormItem label="Waktu">
        <DatePicker
          type="daterange"
          format="yyyy-MM-dd"
          :clearable="false"
          v-model="date"
          @on-change="pickerChange"
          :placeholder="`${$t('selectPrefix')}Waktu`"
        ></DatePicker>
      </FormItem>
      <FormItem class="fix-form-btn">
        <Button
          slot="label"
          type="primary"
          @click="searchData()"
        >{{$t('caseManage.serachBlock.search')}}</Button>
      </FormItem>
    </Form>
    <Table border ref="selection" :data="tableData" :columns="tableDefine" :loading="tableLoading"></Table>
      <Page :total="total"
      :current.sync="page"
      :page-size="pageSize"
      class-name="m-pagination"
      show-total
      show-elevator
      show-sizer
      :page-size-opts=[10,20,50,300]
      @on-page-size-change="changePageSize"
      @on-change="handleUpdateTable">{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRecoveryRate } from '@/api/order'
import moment from "moment"
import { formatMoney,getRatlist } from "@/common/js/common";
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      isCuishouAdmin : /role_cuishou_admin/.test(localStorage.getItem('u.info')),
      isDaihouAdmin : /role_daihou_admin/.test(localStorage.getItem('u.info')),

      date:[

      ],
      page:1,
      pageSize:10,
      total:0,
      searchFormInfo: {
        startDate: '',
        endDate: '',
        organization: '',
        followName: '',
      },
      tableLoading: false,
      tableData: [],
      tableDefine: [
        {
          title: "Staff",
          key: 'follow_name',
          align: 'center',
          minWidth: 150,
        },
        // {
        //   title: this.$t('caseManage.serachBlock.organization'),
        //   key: 'organization',
        //   align: 'center',
        //   minWidth: 100,
        // },
        {
          title: this.$t('caseManage.serachBlock.recoveryAmount'),
          key: 'collect_amount',
          align: 'center',
          minWidth: 100,
           render: (h, params) => {
            return h("span", null, formatMoney(params.row.collect_amount));
          }
        },
        {
          title: this.$t('caseManage.serachBlock.fenanAmount'),
          key: 'division_amount',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h("span", null, formatMoney(params.row.division_amount));
          }
        },
        {
          title: this.$t('caseManage.serachBlock.recoveryRate'),
          key: 'collect_rate',
          align: 'center',
          minWidth: 100,
           render: (h, params) => {
            return h("span", null, params.row.collect_rate+"%");
          }
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['listSelect']),
  },
  watch: {},
  methods: {
    pickerChange(date) {

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
    pageFun(pageNo = 1, pageSize = 10, array) {
        let offset = (pageNo - 1) * pageSize
        if (!array) {
          return []
        }
        return offset + pageSize >= array.length ?
          array.slice(offset, array.length) :
          array.slice(offset, offset + pageSize)
     },
    changePageSize(size){
      this.pageSize = size || 10
        this.tableData = this.pageFun(
          this.page,
          this.pageSize,
          this.totalData
        )
    },
    handleUpdateTable(page){
      this.page = page || 1
        this.tableData = this.pageFun(
          this.page,
          this.pageSize,
          this.totalData
        )
    },
    searchData() {
      this.tableData = []
      if(this.date&&this.date.length>0){
        this.searchFormInfo.startDate =this.formatDayTime(this.date[0])  || ''
        this.searchFormInfo.endDate = this.formatDayTime(this.date[1]) || ''
      }
      this.tableLoading = true
      getRecoveryRate(this.searchFormInfo, (res) => {
        if(res.status==99){
          this.tableLoading = true
          setTimeout(()=>{
            getRecoveryRate(this.searchFormInfo, (res) => {
               this.totalData = res.data
               this.total = this.totalData ? this.totalData.length : 0
               this.tableLoading = false
               this.handleUpdateTable()
               return
           })
          },1000)

        }
         this.totalData = res.data
         this.total = this.totalData ? this.totalData.length : 0
         this.tableLoading = false
         this.handleUpdateTable()

      })
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.date = [
      moment(new Date()).format('YYYY-MM-DD'),
      moment(new Date()).format('YYYY-MM-DD'),
    ]
    this.searchData()
  },
}
</script>

<style scoped  lang='scss'>
</style>
