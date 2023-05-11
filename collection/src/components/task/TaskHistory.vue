<template>
    <div id="taskOrder" class="m-taskOrder">
        <Form ref="task" :model="searchInfo" :label-width="150">
          <Row type="flex">
           <FormItem :label="$t('listModule.taskOrder.orderNo')">
              <Input v-model="searchInfo.orderNo" :placeholder="`${$t('inputPrefix')}${$t('listModule.taskOrder.orderNo')}`"></Input>
          </FormItem>
           <FormItem :label="$t('listModule.taskOrder.mobile')">
            <Input v-model="searchInfo.mobile" :placeholder="`${$t('inputPrefix')}${$t('listModule.taskOrder.mobile')}`"></Input>
          </FormItem>
          <FormItem :label="$t('listModule.taskOrder.city')">
            <Input v-model="searchInfo.city" :placeholder="`${$t('inputPrefix')}${$t('listModule.taskOrder.city')}`" ></Input>
          </FormItem>
          <FormItem  :label="$t('listModule.taskOrder.userName')">
            <Input v-model="searchInfo.userName" :placeholder="`${$t('inputPrefix')}${$t('listModule.taskOrder.userName')}`"></Input>
          </FormItem>
          <FormItem :label="$t('listModule.taskOrder.collectionDate')" :label-width="220">
            <DatePicker
              type="daterange"
              format="yyyy-MM-dd "
              :options="timeLimitConfig"
              @on-change="pickerChange"
              :placeholder="`${$t('selectPrefix')}${$t('listModule.taskOrder.collectionDate')}`">
            </DatePicker>
          </FormItem>
             <FormItem class="fix-form-btn" :label-width="90">
                  <Button slot="label" :loading="loading" type="primary" @click="handleSearch">{{$t('caseManage.serachBlock.search')}}</Button>
              </FormItem>
            </Row>
        </Form>
        <Table border v-if="showTable" :columns="tableHeader" :data="taskList" :loading="loading" ref="table">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
          <template slot="action" slot-scope="props" v-if="isCuishouAdmin||isDaihouAdmin">
            <Button type="text" class="fix-table-btn" :to="`/task/taskdetail?cuishouId=${encodeURIComponent(props.rowInfo.cuishouId)}&orderNo=${encodeURIComponent(props.rowInfo.orderNo)}`" target="_blank" icon="ios-eye" size="small">{{$t('listModule.viewBtn')}}</Button>
          </template>
        </Table>
        <Page
          show-total
          show-elevator
          :total="total"
          :page-size="size"
          :current.sync="searchInfo.page"
          class="m-pagination"
          v-if="total > size"
          @on-change="handlePage">
            {{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}
        </Page>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMyHistoryList } from '@/api/order'
export default {
  data () {
    return {
      isCuishouAdmin : /role_cuishou_admin/.test(localStorage.getItem('u.info')),
      isDaihouAdmin : /role_daihou_admin/.test(localStorage.getItem('u.info')),
      size: 10,
      total: 0,
      loading: false,
      searchInfo: {
        orderNo: '',
        mobile: '',
        city: '',
        userName: '',
        startTime: '',
        endTime: '',
        page: 1
      },
      timeLimitConfig: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      tableHeader: [
        {
          title: this.$t('listModule.taskOrder.orderNo'),
          key: 'orderNo',
          minWidth: 150,
          align: 'center'
        },
        {
          title: this.$t('listModule.taskOrder.userName'),
          key: 'userName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.taskOrder.city'),
          key: 'city',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.taskOrder.collectionDate'),
          key: 'outCuishouTime',
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
      taskList: [],
      showTable: true
    }
  },

  computed: {
    ...mapGetters(['listSelect'])
  },

  created () {
    this.handlePage()
  },

  methods: {
    pickerChange (date) {
      this.searchInfo.startTime = date[0]
      this.searchInfo.endTime = date[1]
    },
    handlePage (pageIndex) {
      this.searchInfo.page = pageIndex || 1
      this.loading = true
      getMyHistoryList({
        query: this.searchInfo
      }, (res) => {
        this.loading = false
        if (+res.status === 0) {
          const data = res.data
          this.taskList = data.historyList
          this.total = data.arrPager.count
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    },
    handleSearch () {
      this.handlePage()
    }
  }
}
</script>

<style lang="scss" scoped>
.m-taskOrder {
  .overdue-warp {
    white-space: nowrap;
    .overdue-input {
      width: 48%;
    }
  }
}
</style>
<style lang="scss">
.m-task {
  .ivu-form-item-content {
    width: 170px;
  }
}
</style>
