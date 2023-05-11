<template>

  <div class="m-orderCase">
    <Form ref="searchForm" :model="searchFormInfo" :label-width="140" :rules="ruleInfo">
      <Row type="flex">
        <FormItem :label="$t('caseManage.serachBlock.orderNum')" >
            <Input v-model="searchFormInfo.orderNo" :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.orderNum')}`"></Input>
          </FormItem>
        <FormItem :label="$t('listModule.taskList.overDays')" >
          <div class="overdue-warp">
            <InputNumber class="overdue-input" v-model="searchFormInfo.startOverdueDate" style="width:85px;"></InputNumber> -
            <InputNumber class="overdue-input" v-model="searchFormInfo.endOverdueDate" style="width:85px;"></InputNumber>
          </div>
        </FormItem>
        <FormItem  :label="$t('caseManage.serachBlock.phone')" >
            <Input v-model="searchFormInfo.mobile" :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.phone')}`"></Input>
          </FormItem>
        <!-- <FormItem :label="$t('caseManage.serachBlock.city')" >
          <Input v-model="searchFormInfo.city" :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.city')}`"></Input>
        </FormItem> -->
        <FormItem :label="$t('caseManage.serachBlock.userName')" >
          <Input v-model="searchFormInfo.userName" :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.userName')}`"></Input>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.belongTask')" >
          <Select v-if="listSelect.anJianList" clearable transfer v-model="searchFormInfo.mission"  :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.belongTask')}`">
            <Option
              :key="index"
              :value="option.key"
              v-for="(option, index) in listSelect.anJianList.mission">
                {{option.value}}
            </Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.principal')" >
          <Select v-if="listSelect.anJianList" filterable clearable transfer  v-model="searchFormInfo.followUser"  :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.principal')}`">
            <Option
                :key="index"
                :value="option.key"
                v-for="(option, index) in listSelect.anJianList.followUser">
                  {{option.value}}
              </Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.contactResult')" >
          <Select v-if="listSelect.anJianList" clearable transfer v-model="searchFormInfo.contactStatus"  :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.contactResult')}`">
            <Option
              :key="index"
              :value="option.key"
              v-for="(option, index) in listSelect.anJianList.contactStatus.slice(0,6)">
                {{option.value}}
            </Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.repaymentWillingness')">
          <Select v-if="listSelect.anJianList" clearable transfer v-model="searchFormInfo.repaymentWish"  :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.repaymentWillingness')}`">
            <Option
              :key="index"
              :value="option.key"
              v-for="(option, index) in listSelect.anJianList.repaymentWish">
                {{option.value}}
            </Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.followUpTimes')" >
          <div class="overdue-warp">
            <InputNumber class="overdue-input" v-model="searchFormInfo.startFollowTimes" style="width:85px;"></InputNumber> -
            <InputNumber class="overdue-input" v-model="searchFormInfo.endFollowTimes" style="width:85px;"></InputNumber>
          </div>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.createCollectionTime')" >
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd"
            :options="timeLimitConfig"
            @on-change="pickerChange"
            :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.createCollectionTime')}`">
          </DatePicker>


        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.productId')" >
          <Select  clearable transfer v-model="searchFormInfo.product_id"  :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.repaymentWillingness')}`">
            <Option
              :key="index"
              :value="option"
              v-for="(option, index) in productList">
                {{option}}
            </Option>
          </Select>
        </FormItem>
        <!-- <FormItem :label="$t('caseManage.serachBlock.orderstatus')" >
          <Select  clearable transfer v-model="searchFormInfo.isRollover"  :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.orderstatus')}`">
            <Option value=""> {{$t('caseManage.serachBlock.all')}} </Option>
            <Option value="1"> {{$t('caseManage.serachBlock.isRollover')}} </Option>
            <Option value="2"> {{$t('caseManage.serachBlock.unRollover')}} </Option>
          </Select>
        </FormItem> -->
        <!-- <FormItem :label="$t('caseManage.serachBlock.groupId')" >
          <Select  clearable transfer v-model="searchFormInfo.groupId"  :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.groupId')}`">
            <Option
              :key="index"
              :value="option.id"
              v-for="(option, index) in GroupList">
                {{option.name}}
            </Option>
          </Select>
        </FormItem> -->
        <FormItem class="fix-form-btn">
          <Button
            slot="label"
            type="primary"
            @click="searchData()">
              {{$t('caseManage.serachBlock.search')}}
          </Button>
        </FormItem>
      </Row>
    </Form>

    <div class="table-wrap" v-if="showTable" >
      <Button icon="arrow-swap" type="success" class="batch-change" @click="showBatchChange">{{$t('caseManage.tableBlock.bathChangeUser')}}</Button>
      <Table
        border
        ref="selection"
        :data="tableData"
        :columns="tableDefine"
        :loading="loading.tableLoading"
        @on-select="onSelectAll"
        @on-select-cancel='onSelectCancel'
        @on-select-all ='onSelectAll'
        @on-select-all-cancel='onSelectAllCancel'
        @on-selection-change="selectionChange">

        <template slot="action" slot-scope="props">
          <Button type="text" class="fix-table-btn"
           :to="`/task/taskdetail?cuishouId=${encodeURIComponent(props.rowInfo.cuishouId)}&orderNo=${encodeURIComponent(props.rowInfo.orderNo)}&text=0`"
           target="_blank" icon="ios-person" size="small">
          {{$t('caseManage.tableBlock.collection')}}</Button>
          <Button type="text" class="fix-table-btn action-left-border" icon="md-create" size="small" @click="showPrincipalModal(props.rowInfo.cuishouId, props.rowInfo.staffId)">{{$t('caseManage.tableBlock.changePrincipal')}}</Button>
        </template>
      </Table>
    </div>
    <Page :total="totalList"
      :current.sync="searchFormInfo.page"
      :page-size="searchFormInfo.pageSize"
      class-name="m-pagination"
      show-total
      show-elevator
      show-sizer
      :page-size-opts=[10,20,50,300]
      @on-page-size-change="changePageSize"
      @on-change="handleUpdateTable">{{$t('pageSlot.total')}} {{totalList}} {{$t('pageSlot.count')}}</Page>
    <Modal
      align="left"
      class="m-modal"
      v-model="principalModal">
      <div slot="header" class="header">
        {{$t('caseManage.tableBlock.changePrincipal')}}
      </div>
      <Form ref="followForm" :model="followForm">
        <FormItem>
          <RadioGroup class="content" v-model="followForm.staffId">
            <Row type="flex" >
              <Col class-name="radio-control" v-for="(principal, index) in  principalList" :key="index">
                <Radio size="large" :label="principal.staffId">{{principal.staffName}}</Radio>
              </Col>
            </Row>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button @click="principalModal = false" align="center">{{$t('cancelText')}}</Button>
        <Button type="primary"
          align="center"
          :loading="loading.principalLoading"
          @click="handleChangePrincipal">
          {{$t('okText')}}
        </Button>
      </div>
    </Modal>
    <Modal
      :title="$t('caseManage.tableBlock.bathChangeUser')"
      class="changModal"
      width='610'
      v-model="changModal">
      <div class="hd">
        <p class="title">{{ $t('caseManage.tableBlock.inputExplain') }}：</p>
        <p class="text" v-for="(item, index) in $t('caseManage.tableBlock.explainContent')" :key="index">{{item}}</p>
      </div>
      <div class="bd">
        <p class="text">{{ $t('caseManage.tableBlock.selectedOrder') }}：{{taskCount}}</p>
        <VTable
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :min-height='200'
          :width='570'
          is-vertical-resize
          :table-data="vTabelData"
          :cell-edit-done="distributeTask"
          :error-content="$t('noData')"
          :columns="vTabelHead" />
      </div>
      <div slot="footer">
        <Button @click="changModal = false">{{$t('cancelText')}}</Button>
        <Button type="success" @click="setBatchChangeFollowUser">{{$t('okText')}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { VTable } from 'vue-easytable'
import 'vue-easytable/libs/themes-base/index.css'

import {
  getOrderList,
  getChangeFollowUser,
  getBatchChangeFollowUser,
  batchChangeFollowUser,
  changeFollowUser,
  getProductId,
  getGroupList,
  } from '@/api/order'
let orderTotal = 0
export default {
  data () {
    return {
      GroupList:[],
      productList:{},
      value1:'',
      value2:'',
      num: 1,
      ruleInfo: {},
      loading: {
        tableLoading: false,
        principalLoading: false
      },
      tableDefine: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: this.$t('caseManage.tableBlock.orderId'),
          key: 'orderNo',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('caseManage.serachBlock.orderstatus'),
          key: 'isRollover',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
             return h('span', null,params.row.isRollover==1?this.$t('caseManage.serachBlock.isRollover'):
             this.$t('caseManage.serachBlock.unRollover'))
          }
        },
        {
          title: this.$t('caseManage.tableBlock.userName'),
          key: 'userName',
          align: 'center',
          minWidth: 100
        },
        // {
        //   title: this.$t('caseManage.tableBlock.city'),
        //   key: 'city',
        //   align: 'center',
        //   minWidth: 150
        // },
        {
          title: this.$t('caseManage.tableBlock.followUser'),
          key: 'followUser',
          align: 'center',
          minWidth: 120
        },
        {
          title: this.$t('caseManage.tableBlock.belongTask'),
          key: 'mission',
          align: 'center',
          minWidth: 100
        },
        {
          title: this.$t('caseManage.tableBlock.overdueRange'),
          key: 'overdueDate',
          align: 'center',
          minWidth: 140
        },
        {
          title: this.$t('caseManage.serachBlock.createCollectionTime'),
          key: 'createTime',
          align: 'center',
          minWidth: 150
        },
        // {
        //   title: this.$t('caseManage.tableBlock.principal'),
        //   key: 'followUser',
        //   align: 'center',
        //   minWidth: 150
        // },
        // {
        //   title: this.$t('caseManage.tableBlock.contactResult'),
        //   key: 'contactStatus',
        //   align: 'center',
        //   minWidth: 150
        // },
        // {
        //   title: this.$t('caseManage.tableBlock.repaymentWillingness'),
        //   key: 'repaymentWish',
        //   align: 'center',
        //   minWidth: 180
        // },
        {
          title: this.$t('caseManage.tableBlock.contactNum'),
          key: 'followTimes',
          align: 'center',
          minWidth: 100
        },
         {
          title: this.$t('caseManage.tableBlock.repaymentWish'),
          key: 'repaymentWish',
          align: 'center',
          minWidth: 100
        },
        {
          title: this.$t('caseManage.tableBlock.contactStatus'),
          key: 'contactStatus',
          align: 'center',
          minWidth: 150
        },
        // {
        //   title: this.$t('caseManage.tableBlock.lastCallTime'),
        //   key: 'lastCallTime',
        //   align: 'center',
        //   minWidth: 150
        // },
        // {
        //   title: this.$t('caseManage.tableBlock.todayCallCount'),
        //   key: 'callTimes',
        //   align: 'center',
        //   minWidth: 150
        // },
        {
          title: this.$t('caseManage.tableBlock.action'),
          key: 'handle',
          align: 'center',
          fixed: 'right',
          width: 280,
          render: (h, params) => {
            return h('div', this.$refs.selection['$scopedSlots'].action({ rowInfo: params.row}))
          }
        }
      ],
      operationUser: -1,
      searchFormInfo: {
        page: 1,
        pageSize: 10,
        orderNo: '',
        startOverdueDate: null,
        endOverdueDate: null,
        mobile: '',
        city: '',
        userName: '',
        mission: '',
        followUser: '',
        contactStatus: '',
        repaymentWish: '',
        startFollowTimes: null,
        endFollowTimes: null,
        startCreateTime: '',
        endCreateTime: '',
        product_id:"",
        isRollover:'',
        groupId:'',
      },
      followForm: {
        cuishouId: null,
        staffId: null
      },
      selectedData: [],
      arr1: [],
      arr2: [],
      totalList: 0,
      tableData: [],
      principal: '',
      principalList: [],
      principalModal: false,
      showTable: true,
      changModal: false,
      taskCount: 0,
      vTabelData: [],
      changeInfo: {
        cuishouIds: []
      },
      vTabelHead: [
        {
          title: this.$t('caseManage.tableBlock.userName'),
          field: 'staffName',
          titleAlign: 'center',
          columnAlign:'center',
          width: 190
        },
        {
          title: this.$t('caseManage.tableBlock.existOrders'),
          field: 'followNum',
          titleAlign: 'center',
          columnAlign:'center',
          width: 190
        },
        {
          title: this.$t('caseManage.tableBlock.distributeOrderNum'),
          field: 'num',
          titleAlign: 'center',
          columnAlign:'center',
          isEdit: true,
          width: 190
        },
      ],
      timeLimitConfig: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      }
    }
  },

  components: {
    VTable
  },

  computed: {
    ...mapGetters(['listSelect'])
  },

  methods: {
    _getGroupList(){
      getGroupList({},res=>{
        this.GroupList = res.data
      })
    },
    _getProductId(){
      getProductId({},res=>{
        this.productList = res.data
      })
    },
    handleChange(value) {
        console.log(value);
      },
      searchData(){
        this.arr2=[];
        this.changeInfo.cuishouIds = [];
        this.handleUpdateTable();
      },
    fetchData (query) {
      this.loading.tableLoading = true
      this.tableData = []
      getOrderList({
        query: query
      }, res => {
        const data = res.data
        this.loading.tableLoading = false
        if (+res.status === 0) {
          data.arrAnJianList.forEach(item => {
              this.arr2.forEach(element => {
                if (element.cuishouId === item.cuishouId) {
                  this.$set(item, '_checked', true)
                }
              })
            })
          this.totalList = Number(data.arrPager.count)
          this.tableData = data.arrAnJianList
          this.showTable = true
        } else {
          this.showTable = false;
        }
      })
    },

    showPrincipalModal (cuishouId, staffId) {
      this.followForm.cuishouId = cuishouId
      getChangeFollowUser({
        cuishouId: cuishouId
      }, res => {
        if (+res.status === 0) {
          this.principalList = res.data.canChangeList
          if (this.principalList.length) {
            this.principalModal = true
          } else {
            this.$Message.warning(this.$t('caseManage.serachBlock.noFollowUser'))
          }
        }
      })
    },

    handleChangePrincipal () {
      if (this.followForm.staffId) {
        this.loading.principalLoading = true
        changeFollowUser(this.followForm, res => {
          this.loading.principalLoading = false
          if (+res.status === 0) {
            this.followForm.staffId = ''
            this.fetchData(this.searchFormInfo)
            this.principalModal = !this.principalModal
          }
        })
      } else {
        this.$Message.error({
          content: this.$t('caseManage.serachBlock.changeFollowTip')
        })
      }
    },

    showBatchChange() {
      if (!this.taskCount) {
        this.$Message.error({
          content: this.$t('caseManage.tableBlock.pleaseSelectTask')
        })
        return false
      }
      getBatchChangeFollowUser({
        arrCuishouId: this.changeInfo.cuishouIds
      }, res => {
        if (+res.status === 0) {
          const data = res.data.canChangeUserList
          this.changModal = true
          data.forEach((item) => {
            item.num = ''
          })
          this.vTabelData = data
        }
      })
    },

    changePageSize(page) {
      console.log(page,7)
      this.searchFormInfo.pageSize = page
      this.handleUpdateTable()
    },

    onSelectAll (selection) {

      this.arr1 = [...selection, ...this.selectedData]

      for (let val of this.arr1) {
        console.log(val)
        if (!this.arr2.some(item => item.cuishouId === val.cuishouId)) {
          this.arr2.push(val)
        }
      }

    },

    onSelectCancel (selection, row) {

      let result = this.arr2.findIndex((ele) => {
        return ele.cuishouId === row.cuishouId
      })
      this.arr2.splice(result, 1)
    },


    onSelectAllCancel () {
      this.arr2 = this.arr2.filter(item => {
        return this.tableData.every(item2 => {
          return item.cuishouId !== item2.cuishouId
        })
      })
    },
    selectionChange (selection) {
      this.taskCount = this.arr2.length
      this.changeInfo.cuishouIds = [];
      this.arr2.forEach((item) => {
        this.changeInfo.cuishouIds.push(item.cuishouId)
      })
    },

    distributeTask(newValue, oldValue, rowIndex, rowData, field) {
      orderTotal = 0
      if(newValue !== '' && !/^[0-9]\d*$/.test(newValue)) {
        this.$Message.error({
          content: this.$t('caseManage.tableBlock.inputInteger')
        })
        return false
      }
      this.vTabelData[rowIndex][field] = newValue;
      this.vTabelData.forEach((item) => {
        orderTotal += +item.num
      })
    },

    setBatchChangeFollowUser() {
      if (!orderTotal) {
        this.$Message.error({
          content: this.$t('caseManage.tableBlock.required')
        })
        return false
      }
      if (orderTotal > this.taskCount) {
        this.$Message.error({
          content: this.$t('caseManage.tableBlock.greaterThan')
        })
        return false
      }
      batchChangeFollowUser({
        arrCuishouId: this.changeInfo.cuishouIds,
        arrChangePost: this.vTabelData
      }, res => {
        if (+res.status === 0) {
          this.changModal = false;
          this.searchData();
        }
      })
    },

    handleUpdateTable (pageIndex) {
      this.searchFormInfo.page = pageIndex || 1
      this.fetchData(this.searchFormInfo)
    },

    pickerChange (date) {
      this.searchFormInfo.startCreateTime = date[0]
      this.searchFormInfo.endCreateTime = date[1]
      console.log(typeof(date[1]) )
    }
  },
  created () {
    this._getGroupList()
    this._getProductId()
    this.searchData()
  }
}
</script>

<style lang="scss" scoped>
.m-orderCase {
  .radio-control {
    text-align: left;
  }
  .overdue-warp {
    white-space: nowrap;
    .overdue-input {
      width: 48%;
    }
  }
  .table-wrap {
    padding: 15px;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    .batch-change {
      margin-bottom: 15px;
    }
  }
}
.changModal {
  .hd {
    .text {
      text-indent: 1em;
    }
  }
  .bd {
    margin-top: 15px;
    .text {
      margin-bottom: 10px;
      color: #ff9900;
    }
  }
}
</style>
