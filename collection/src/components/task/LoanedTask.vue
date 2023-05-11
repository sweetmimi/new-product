<template>
  <div class="m-pastloan">

    <Form :model="searchInfo" :label-width="140">
      <Row type="flex">
        <FormItem :label="$t('listModule.loanedTask.orderNo')">
          <Input v-model="searchInfo.orderNo" :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedTask.orderNo')}`"></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedTask.mobile')">
          <Input v-model="searchInfo.mobile" :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedTask.mobile')}`"></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedTask.dueTime')">
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd"
            @on-change="dueTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedTask.dueTime')}`">
          </DatePicker>
        </FormItem>
        <!-- <FormItem :label="$t('listModule.loanedTask.followResult')">
          <Select
            clearable
            transfer
            v-model="searchInfo.followResult"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedTask.followResult')}`"
          >
            <Option
              :key="index"
              :value="option.key"
               v-if="listSelect.daihouTaskInfo.contactResult.can_contact"
              v-for="(option, index) in followResultList"
            >{{option.value}}</Option>
          </Select>
        </FormItem> -->

         <FormItem :label="$t('listModule.loanedList.repayWill')">
          <Select
            clearable
            transfer
            v-model="searchInfo.followRepayWish"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedList.repayWill')}`"
          >
            <Option
              :key="index"
              :value="option.key"
              v-if="listSelect.daihouTaskInfo"
              v-for="(option, index) in listSelect.daihouTaskInfo.contactRepaymentWish"
            >{{option.value}}</Option>
          </Select>
        </FormItem>

        <FormItem :label="$t('listModule.loanedTask.userName')">
          <Input v-model="searchInfo.userName" :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedTask.userName')}`"></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedTask.JinanTime')">
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd"
            @on-change="jinanTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedTask.JinanTime')}`">
          </DatePicker>
        </FormItem>

        <FormItem :label="$t('approvalDetail.result.TaskStage')">
          <Select
            clearable
            transfer

            v-model="searchInfo.taskPhase"
            :placeholder="`${$t('selectPrefix')}${$t('approvalDetail.result.TaskStage')}`"
          >
            <Option
              :key="index"
              :value="option.index"

              v-for="(option, index) in $t('approvalDetail.result.TaskStages')"
            >{{option.value}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('listModule.loanedTask.callTimes')">
          <div class="overdue-warp">
            <Input class="overdue-input" v-model="searchInfo.callTimesMin" style="width:80px;"></Input> -
            <Input class="overdue-input" v-model="searchInfo.callTimesMax" style="width:80px;"></Input>
          </div>
        </FormItem>
        <FormItem class="fix-form-btn">
          <Button
            slot="label"
            type="primary"
            :loading="loading.tableLoading"
            @click="updateMyTaskList()">
              {{$t('listModule.loanedTask.search')}}
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
      <template slot="action" slot-scope="props">
        <Button type="text" class="fix-table-btn" :to="`/task/loaneddetail?daihouId=${encodeURIComponent(props.rowInfo.daihouTaskId)}&orderNo=${encodeURIComponent(props.rowInfo.orderNo)}`" target="_blank" icon="ios-eye" size="small">{{$t('listModule.dealWith')}}</Button>
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
import { mapGetters } from 'vuex'
import { getLoanedList } from '@/api/daihoutask'
export default {
  data() {
    return {
      followResultList:[],
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
        callTimesMax: '',
        taskPhase:'',
        followRepayWish:'',
      },
      loading: {
        tableLoading: false
      },
      showTable: true,
      tableColums: [
        {
          key: 'orderNo',
          minWidth: 150,
          align: 'center',
          title: this.$t('listModule.loanedTask.orderNo'),
        },
        {
          title: this.$t('listModule.loanedTask.userName'),
          key: 'userName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.loanedTask.JinanTime'),
          key: 'jinanTime',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.loanedTask.dueTime'),
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
          minWidth: 140,
          align: 'center'
        },
        {
          title: this.$t('listModule.loanedTask.followResult'),
          key: 'followResult',
          minWidth: 140,
          align: 'center'
        },
         {
          title: this.$t('listModule.loanedList.repayWill'),
          key: 'followRepayWish',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.loanedTask.callTimes'),
          key: 'callTimes',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.loanedTask.lastFollowTime'),
          key: 'lastFollowTime',
          minWidth: 160,
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
  computed: {
    ...mapGetters(['listSelect'])
  },
  created() {
    this.updateMyTaskList();
    try {
       this.followResultList = this.listSelect.daihouTaskInfo.contactResult.can_contact.value.concat(this.listSelect.daihouTaskInfo.contactResult.can_not_contact.value)
    } catch (error) {

    }
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
      getLoanedList({ query: this.searchInfo },  res => {
        this.loading.tableLoading = false;
        if(+res.status === 0) {
          const data = res.data;
          this.tableData = data.myTaskList;
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
