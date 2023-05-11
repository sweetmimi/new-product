<template>
  <div class="m-config">
    <Tabs @on-click="toggleTab" value="name1">
      <TabPane label="Operation log" name="name1">
        <Form ref="formInline" inline :model="searchFormInfo" :label-width="110">
          <FormItem label="Operation Time">
            <DatePicker
              class="m-date-picker"
              type="daterange"
              :options="timeLimitConfig"
              format="yyyy-MM-dd "
              v-model="initDate"
              @on-change="handleTimeChange"
            />
          </FormItem>
          <FormItem label="status">
            <Select
              v-if="listSelect.remitSelect"
              clearable
              transfer
              v-model="searchFormInfo.status"
              :placeholder="`${$t('selectPrefix')}`"
            >
              <Option
                v-for="(item, index) in listSelect.remitSelect"
                :value="item.key"
                :key="index"
              >{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem class="fix-form-btn">
            <span slot="label">
              <Button type="primary" @click="_fetchData();searchFormInfo.page=1">search</Button>
            </span>
          </FormItem>
        </Form>
        <Table border :data="tableData" :columns="tableDefine" :loading="tableLoading">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
        <Page
          :total="pageCount"
          :current.sync="searchFormInfo.page"
          :page-size="searchFormInfo.pageSize"
          class-name="m-pagination"
          show-total
          @on-change="handleUpdateTable"
          show-elevator
        >{{$t('pageSlot.total')}} {{pageCount}} {{$t('pageSlot.count')}}</Page>
      </TabPane>
      <TabPane label="money transfer" name="name2">
        <Form ref="formInline" inline :label-width="110">
          <FormItem label="status">
            <Select clearable transfer v-model="status" :placeholder="`${$t('selectPrefix')}`">
              <Option :value="1">RDL</Option>
            </Select>
          </FormItem>
          <FormItem class="fix-form-btn">
            <span slot="label">
              <Button type="primary" @click="getTransfer()">search</Button>
            </span>
          </FormItem>
        </Form>

        <Table
          ref="table"
          border
          class="list-table"
          :data="transferData"
          :columns="transferDefine"
          :loading="loading"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
            <div>Loading</div>
          </Spin>
          <template slot="action" slot-scope="props">
            <Button type="text" @click="searchBalance(props.rowInfo)">search balance</Button>
            <Button type="text" @click="withdraw(props.rowInfo)">withdraw</Button>
          </template>
        </Table>
        <Modal v-model="withdrawModal" title="withdraw">
          <Form ref="formInfo" :model="withdrawForm" :label-width="160" :rules="ruleValidate">
            <FormItem label="Withdraw account" prop="accountName">
              <Input disabled v-model="withdrawForm.accountName" placeholder="accountName"></Input>
            </FormItem>

            <FormItem label="Withdraw amount" prop="amount">
              <Input type="number" v-model="withdrawForm.amount" :placeholder="`Withdraw amount`"></Input>
            </FormItem>
            <FormItem label="Remittance account" prop="sourceType">
              <Input disabled v-model="withdrawForm.sourceType" placeholder="`Remittance account`"></Input>
            </FormItem>
            <FormItem label="Remark" prop="desc">
              <Input type="textarea" v-model="withdrawForm.desc" placeholder="Remark"></Input>
            </FormItem>
          </Form>
          <div slot="footer" class="footer">
            <Button class="fix-table-btn" @click="withdrawModal = false">{{ $t("cancelText") }}</Button>
            <Button
              :loading="subLoading"
              type="success"
              class="fix-table-btn"
              @click="isWithdraw('formInfo')"
            >{{ $t("okText") }}</Button>
          </div>
        </Modal>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { export_json_to_excel } from '@/assets/js/Export2Excel'
import { mapGetters } from 'vuex'
import {
  financeRemitrecord,
  financeGetrdlamount,
  financeGetaccount,
  financeApplyremit
} from '@/api/user.js'

export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      withdrawModal: false,
      tableLoading: false,
      subLoading: false,
      loading: false,
      transferData: [],
      status: 1,
      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        },
      },
      withdrawForm: {
        accountId: '',
        accountName: '',
        sourceType: 'RDL',
        amount: null,
        desc: '',
      },
      ruleValidate:{
      accountName: [{ required: true, trigger: 'blur' }],
      sourceType: [{ required: true, trigger: 'blur' }],
      amount: [{ required: true, trigger: 'blur' }],
      },
      initDate: [],
      pageCount: 0,
      searchFormInfo: {
        page: 1,
        pageSize: 10,
        startTime: '',
        endTime: '',
        status: '',
        export: 0,
      },
      tableData: [],
      tableDefine: [
        {
          title: 'ID',
          align: 'center',
          key: 'id',
          minWidth: 110,
        },
        {
          title: 'Operation time',
          align: 'center',
          key: 'create_time',
          minWidth: 110,
        },
        {
          title: 'lender name',
          align: 'center',
          key: 'source_name',
          minWidth: 110,
        },

        {
          title: 'remittance account',
          align: 'center',
          key: 'source_type',
          minWidth: 110,
        },
        {
          title: 'Accounts receivable',
          align: 'center',
          key: 'dest_account_name',
          minWidth: 110,
        },
        {
          title: 'Amount',
          align: 'center',
          key: 'amount',
          minWidth: 110,
        },
        {
          title: 'Remark',
          align: 'center',
          key: 'remark',
          minWidth: 110,
        },
        {
          title: 'Status',
          align: 'center',
          key: 'desc_st',
          minWidth: 110,
        },
      ],
      transferDefine: [
        {
          title: 'ID',
          align: 'center',
          key: 'id',
          minWidth: 110,
        },
        {
          title: 'lender name',
          align: 'center',
          key: 'source_name',
          minWidth: 110,
        },
        {
          title: 'RDL balance',
          align: 'center',
          key: 'rdlAmount',
          minWidth: 110,
        },
        {
          title: 'operate',
          align: 'center',
          key: 'option',
          fixed: 'right',
          minWidth: 180,
          render: (h, params) => {
            return h(
              'div',
              this.$refs.table['$scopedSlots'].action({
                rowInfo: params.row,
              })
            )
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['listSelect']),
  },
  watch: {},
  methods: {
    toggleTab(name) {
      if (name == 'name1') {
        this._fetchData()
      } else {
        this.getTransfer()
      }
    },
    searchBalance(row) {
      this.loading = true
      financeGetrdlamount({}, (res) => {
        this.loading = false
        this.transferData[0].rdlAmount = res.data.rdlAmount
      })
    },
    withdraw(row){
      this.withdrawForm={
        accountId: row.id,
        accountName: row.account_name,
        sourceType: 'RDL',
        amount: null,
        desc: '',
      }
      this.withdrawModal = true
    },
    isWithdraw(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          financeApplyremit( this.withdrawForm,res=>{
            this.$Message.success('success')
            this.withdrawModal = false
            this.getTransfer()
          })
        }})
    },
    handleTimeChange(date) {
      if(date&&date[0]){
        this.searchFormInfo.startTime = date[0]+'00:00:00'
        this.searchFormInfo.endTime = date[1]+'23:59:59'
      }else{
        this.searchFormInfo.startTime=""
        this.searchFormInfo.endTime=""
      }
    },
    _fetchData() {
      this.tableLoading = true
      financeRemitrecord(this.searchFormInfo, (res) => {
        this.tableData = res.data.list
        this.tableLoading = false
        this.pageCount = Number(res.data.arrPager.count)
      })
    },
    handleUpdateTable(pageIndex) {
      this.searchFormInfo.page = pageIndex || 1
      this._fetchData()
    },
    getTransfer() {
      this.loading = true
      financeGetaccount({}, (res) => {
        this.loading = false
        res.data.rdlAmount = '-'
        this.transferData = [res.data]
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    handleExpertData() {
      const tHeader = [
        'ID',
        'type',
        'body',
        'address',
        'date',
        'date_sent',
        'person',
      ]
      const filterVal = [
        '_id',
        'type',
        'body',
        'address',
        'date',
        'date_sent',
        'person',
      ]
      const list = this.totalSmsRecord

      //console.log(list)
      const data = this.formatJson(filterVal, list)
      //console.log(data)
      export_json_to_excel(tHeader, data, 'sms log')
    },
  },
  beforeCreate() {},
  created() {
    this._fetchData()
    this.getTransfer()
  },
  beforeMount() {},
  mounted() {},
}
</script>

<style scoped  lang='less'>
</style>
