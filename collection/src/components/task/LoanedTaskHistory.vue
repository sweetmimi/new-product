<template>
  <div class="m-pastloan">

    <Form :model="searchInfo" :label-width="140">
      <Row type="flex">
        <FormItem :label="$t('listModule.loanedHistory.orderNo')">
          <Input v-model="searchInfo.orderNo" :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedHistory.orderNo')}`"></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedHistory.mobile')">
          <Input v-model="searchInfo.mobile" :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedHistory.mobile')}`"></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedHistory.dueTime')">
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd "
            @on-change="dueTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedHistory.dueTime')}`">
          </DatePicker>
        </FormItem>
        <FormItem :label="$t('listModule.loanedHistory.userName')">
          <Input v-model="searchInfo.userName" :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedHistory.userName')}`"></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedHistory.JinanTime')">
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd "
            @on-change="jinanTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedHistory.JinanTime')}`">
          </DatePicker>
        </FormItem>
        <FormItem class="fix-form-btn">
          <Button
            slot="label"
            type="primary"
            :loading="loading.tableLoading"
            @click="updateMyTaskList()">
              {{$t('listModule.loanedHistory.search')}}
          </Button>
        </FormItem>
      </Row>
    </Form>
    <!-- form block -->
    <Table border v-if="showTable" :columns="tableColums" :data="tableData" :loading="loading.tableLoading" ref="table">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
      <template slot="action" slot-scope="props" v-if="isCuishouAdmin||isDaihouAdmin">
        <Button type="text" class="fix-table-btn" :to="`/task/loaneddetail?daihouId=${encodeURIComponent(props.rowInfo.daihouTaskId)}&orderNo=${encodeURIComponent(props.rowInfo.orderNo)}`" target="_blank" icon="ios-eye" size="small">{{$t('listModule.viewBtn')}}</Button>
      </template>
    </Table>
    <!-- table block -->
    <Page
      show-total
      show-elevator
      :total="pagerData.count"
      :page-size="pagerData.pageSize"
      :current.sync="searchInfo.page"
      class="m-pagination"
      v-if="pagerData.count > pagerData.pageSize"
      @on-change="updateMyTaskList">
        {{$t('pageSlot.total')}} {{pagerData.count}} {{$t('pageSlot.count')}}
    </Page>
    <!-- page block -->
  </div>
</template>

<script>
import { getLoanedHistory } from '@/api/daihoutask'
export default {
  data() {
    return {
      isCuishouAdmin : /role_cuishou_admin/.test(localStorage.getItem('u.info')),
      isDaihouAdmin : /role_daihou_admin/.test(localStorage.getItem('u.info')),
      searchInfo: {
        page: 1,
        orderNo: '',
        mobile: '',
        startDueTime: '',
        endDueTime: '',
        followResult: '',
        userName: '',
        startJinanTime: '',
        endJinanTime: '',
        callTimesMin: '',
        callTimesMax: ''
      },
      loading: {
        tableLoading: false
      },
      timeLimitConfig: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      showTable: true,
      tableColums: [
        {
          key: 'orderNo',
          minWidth: 150,
          align: 'center',
          title: this.$t('listModule.loanedHistory.orderNo'),
        },
        {
          title: this.$t('listModule.loanedHistory.userName'),
          key: 'userName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.loanedHistory.JinanTime'),
          key: 'jinanTime',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.loanedHistory.dueTime'),
          key: 'dueTime',
          minWidth: 120,
          align: 'center'
        },
         {
          title: this.$t('listModule.loanedHistory.outTaskTime'),
          key: 'outTaskTime',
          minWidth: 120,
          align: 'center'
        },
         {
          title: this.$t('listModule.loanedHistory.outTaskDesc'),
          key: 'outTaskDesc',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.handle'),
          key: 'handle',
          align: 'center',
          fixed: 'right',
          minWidth: 120,
          render: (h, params) => {
            return h('div', this.$refs.table['$scopedSlots'].action({ rowInfo: params.row}))
          }
        }
      ],
      tableData: [],
      pagerData: {
        count: 0,
        pageSize: 10
      }
    }
  },
  created() {
    this.updateMyTaskList();
  },
  methods: {

    dueTimeChange (date) {
      this.searchInfo.startDueTime = date[0]
      this.searchInfo.endDueTime = date[1]
    },

    jinanTimeChange (date) {
      this.searchInfo.startJinanTime = date[0]
      this.searchInfo.endJinanTime = date[1]
    },

    updateMyTaskList(page = 1) {
      this.searchInfo.page = page;
      this.loading.tableLoading = true;
      getLoanedHistory({ query: this.searchInfo },  res => {
        this.loading.tableLoading = false;
        if(+res.status === 0) {
          const data = res.data;
          this.tableData = data.historyList;
          this.pagerData = data.arrPager;
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      })
    }
  }
}
</script>
