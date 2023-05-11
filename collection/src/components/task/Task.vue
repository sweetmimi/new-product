<template>
    <div id="task" class="m-task">
        <Form ref="task" :model="searchInfo" :label-width="150">
          <Row type="flex">
            <FormItem :label="$t('listModule.taskList.orderId')" :label-width="100">
                <Input v-model="searchInfo.orderNo" :placeholder="`${$t('selectPrefix')}${$t('listModule.taskList.orderId')}`"></Input>
            </FormItem>
            <FormItem :label="$t('listModule.taskList.customerName')" :label-width="120">
                <Input v-model="searchInfo.userName" :placeholder="`${$t('selectPrefix')}${$t('listModule.taskList.customerName')}`"></Input>
            </FormItem>
            <FormItem :label="$t('listModule.taskList.city')" :label-width="60">
              <Input v-model="searchInfo.city"  :placeholder="`${$t('selectPrefix')}${$t('listModule.taskList.city')}`"></Input>
            </FormItem>
            <FormItem  :label="$t('listModule.taskList.mobile')" :label-width="110">
              <Input type="text" v-model="searchInfo.mobile"  :placeholder="`${$t('selectPrefix')}${$t('listModule.taskList.mobile')}`"></Input>
            </FormItem>
            <FormItem :label="$t('listModule.taskList.contactResult')" :label-width="100">
              <Select v-if="listSelect.myTaskList" clearable transfer v-model="searchInfo.contactStatus" :placeholder="`${$t('selectPrefix')}${$t('listModule.taskList.contactResult')}`" style="width:200px;">
                  <Option
                      :key="index"
                      :value="option.key"
                      v-for="(option, index) in listSelect.myTaskList.contactStatus.slice(0,6)">
                      {{option.value}}
                  </Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('listModule.taskList.repaymentWillingness')" :label-width="200">
                <Select v-if="listSelect.myTaskList" clearable transfer v-model="searchInfo.repaymentWish" :placeholder="`${$t('selectPrefix')}${$t('listModule.taskList.repaymentWillingness')}`" style="width:305px">
                    <Option
                        :key="index"
                        :value="option.key"
                        v-for="(option, index) in listSelect.myTaskList.repaymentWish">
                        {{option.value}}
                    </Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('listModule.taskList.overDays')" :label-width="300">
              <div class="overdue-warp">
                <Input class="overdue-input" number v-model="searchInfo.startOverdueDate" style="width:50px;"></Input> -
                <Input class="overdue-input" number v-model="searchInfo.endOverdueDate" style="width:50px;"></Input>
              </div>
            </FormItem>
             <FormItem class="fix-form-btn" :label-width="90">
                  <Button slot="label" :loading="loading" type="primary" @click="handleSearch">{{$t('caseManage.serachBlock.search')}}</Button>
              </FormItem>
            </Row>
        </Form>
        <Table border
          v-if="showTable"
          ref="table"
          :columns="tableHeader"
          :data="taskList"
          :loading="loading"
          :row-class-name="rowClassName">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
          <template slot="action" slot-scope="props">
            <Button type="text" class="fix-table-btn" :to="`/task/taskdetail?cuishouId=${encodeURIComponent(props.rowInfo.cuishouId)}&orderNo=${encodeURIComponent(props.rowInfo.orderNo)}`" target="_blank" icon="ios-person" size="small">{{$t('caseManage.tableBlock.collection')}}</Button>
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
import { getTaskList } from '@/api/task'
export default {
  data () {
    return {
      size: 10,
      total: 0,
      loading: false,
      searchInfo: {
        orderNo: '',
        mobile: '',
        city: '',
        userName: '',
        contactStatus: '',
        repaymentWish: '',
        startOverdueDate: '',
        endOverdueDate: '',
        sortLoanTerm: '',
        sortFollowTime: '',
        sortOperateTime: '',
        page: 1
      },
      tableHeader: [
        {
          title: this.$t('listModule.taskList.orderId'),
          key: 'orderNo',
          minWidth: 150,
          align: 'center'
        },
        {
          title: this.$t('listModule.taskList.customerName'),
          key: 'userName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.taskList.city'),
          key: 'city',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.taskList.overDays'),
          key: 'overdueDate',
          minWidth: 120,
          align: 'center'
        },
        // {
        //   title: this.$t('listModule.taskList.contactResult'),
        //   key: 'contactStatus',
        //   minWidth: 120,
        //   align: 'center'
        // },
        {
          title: this.$t('listModule.taskList.repaymentWillingness'),
          key: 'repaymentWish',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.taskList.loanTerm'),
          key: 'loanTerm',
          minWidth: 150,
          align: 'center',
          renderHeader: (h, params) => {
            return h('div', [h('span', {
              class: ['ivu-table-cell-sort']
            }, this.$t('listModule.taskList.loanTerm')),
            h('span', {class: ['ivu-table-sort']},
              [h('Icon', {
                props: {
                  type: 'arrow-up-b'
                },
                on: {
                  click: () => {
                    this.searchInfo.sortLoanTerm = 'asc'
                    this.searchInfo.sortFollowTime = ''
                    this.searchInfo.sortOperateTime = ''
                    this.handlePage()
                  }
                }
              }),
              h('Icon', {
                props: {
                  type: 'arrow-down-b'
                },
                on: {
                  click: () => {
                    this.searchInfo.sortLoanTerm = 'desc'
                    this.searchInfo.sortFollowTime = ''
                    this.searchInfo.sortOperateTime = ''
                    this.handlePage()
                  }
                }
              })])])
          }
        },
        {
          title: this.$t('listModule.taskList.followUpTime'),
          key: 'followTime',
          minWidth: 150,
          renderHeader: (h, params) => {
            return h('div', [h('span', {
              class: ['ivu-table-cell-sort']
            }, this.$t('listModule.taskList.followUpTime')),
            h('span', {class: ['ivu-table-sort']},
              [h('Icon', {
                props: {
                  type: 'arrow-up-b'
                },
                on: {
                  click: () => {
                    this.searchInfo.sortFollowTime = 'asc'
                    this.searchInfo.sortOperateTime = ''
                    this.searchInfo.sortLoanTerm = ''
                    this.handlePage()
                  }
                }
              }),
              h('Icon', {
                props: {
                  type: 'arrow-down-b'
                },
                on: {
                  click: () => {
                    this.searchInfo.sortFollowTime = 'desc'
                    this.searchInfo.sortOpreateTime = ''
                    this.searchInfo.sortLoanTerm = ''
                    this.handlePage()
                  }
                }
              })])])
          }
        },
        {
          title: this.$t('listModule.taskList.updateTime'),
          key: 'operateTime',
          minWidth: 150,
          renderHeader: (h, params) => {
            return h('div', [h('span', {
              class: ['ivu-table-cell-sort']
            }, this.$t('listModule.taskList.updateTime')),
            h('span', {class: ['ivu-table-sort']},
              [h('Icon', {
                props: {
                  type: 'arrow-up-b'
                },
                on: {
                  click: () => {
                    this.searchInfo.sortOperateTime = 'asc'
                    this.searchInfo.sortLoanTerm = ''
                    this.searchInfo.sortFollowTime = ''
                    this.handlePage()
                  }
                }
              }),
              h('Icon', {
                props: {
                  type: 'arrow-down-b'
                },
                on: {
                  click: () => {
                    this.searchInfo.sortOperateTime = 'desc'
                    this.searchInfo.sortLoanTerm = ''
                    this.searchInfo.sortFollowTime = ''
                    this.handlePage()
                  }
                }
              })])])
          }
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
    handlePage (pageIndex) {
      this.searchInfo.page = pageIndex || 1
      this.loading = true
      getTaskList({
        query: this.searchInfo
      }, (res) => {
        this.loading = false
        if (+res.status === 0) {
          const data = res.data
          this.taskList = data.myTaskList
          this.taskList = data.myTaskList.sort((cur, next) => {
            return +next.toTop - cur.toTop
          })
          this.total = data.arrPager.count
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    },
    handleSearch () {
      this.handlePage()
    },
    rowClassName (row) {
      return +row.toTop === 1 ? 'm-table-top-row' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.m-task {
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
