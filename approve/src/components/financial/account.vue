<template>
  <div class="m-acount">
    <div class="btn" style="margin-bottom:20px">
      <Button v-if="showAdd" type="primary" slot="label" @click="addAccount()">Add account</Button>
    </div>
    <Table
      ref="table"
      border
      class="list-table"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>
    <Modal v-model="AddModal" title="Add account">
      <Form ref="formInfo" :model="addForm" :label-width="110" :rules="ruleValidate">
        <FormItem label="Account name" prop="name">
          <Input v-model="addForm.name" :placeholder="`${$t('inputPrefix')}Account name`"></Input>
        </FormItem>

        <FormItem label="Bank name" prop="bank">
          <Input v-model="addForm.bank" :placeholder="`${$t('inputPrefix')}Bank name`"></Input>
        </FormItem>
        <FormItem label="Account number" prop="card">
          <Input v-model="addForm.card" :placeholder="`${$t('inputPrefix')}Account number`"></Input>
        </FormItem>
        <FormItem label="Payee" prop="holdCardName">
          <Input v-model="addForm.holdCardName" :placeholder="`${$t('inputPrefix')}Payee`"></Input>
        </FormItem>
        <FormItem label="Remark" prop="desc">
          <Input v-model="addForm.desc" :placeholder="`${$t('inputPrefix')}Remark`"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button class="fix-table-btn" @click="AddModal = false">{{ $t("cancelText") }}</Button>
        <Button
        :loading="subLoading"
          type="success"
          class="fix-table-btn"
          @click="submitData('formInfo')"
        >{{ $t("okText") }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { formatMoney } from '@/common/js/common'
import { financeGetaccount, financeSaveaccount } from '@/api/user.js'
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      loading: false,
      AddModal: false,
      subLoading:false,
      showAdd:false,
      tableData: [],
      addForm: {
        name: '',
        bank: '',
        card: '',
        holdCardName: '',
        desc: '',
      },
      ruleValidate: {
        name: [{ required: true, trigger: 'blur' }],
        bank: [{ required: true, trigger: 'blur' }],
        card: [{ required: true, trigger: 'blur' }],
        holdCardName: [{ required: true, trigger: 'blur' }],
      },
      tableDefine: [
        {
          title: 'Account name',
          align: 'center',
          key: 'account_name',
          minWidth: 110,
        },
        {
          title: 'Bank name',
          align: 'center',
          key: 'bank_code',
          minWidth: 110,
        },
        {
          title: 'Account number',
          align: 'center',
          key: 'card_number',
          minWidth: 110,
        },
        {
          title: 'payee',
          align: 'center',
          key: 'holder_name',
          minWidth: 110,
        },
        {
          title: 'Remark',
          align: 'center',
          key: 'remark',
          minWidth: 110,
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    getData() {
      this.loading = true
      financeGetaccount({}, (res) => {
        this.loading = false
        this.showAdd = true
        if(JSON.stringify(res.data) != "{}"){
          this.showAdd = false
          this.tableData = [res.data]
        }
      })
    },
    addAccount() {
      this.addForm = {
        name: '',
        bank: '',
        card: '',
        holdCardName: '',
        desc: '',
      }
      this.AddModal = true
    },
    submitData(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.subLoading = true
          financeSaveaccount(this.addForm,res=>{
            this.subLoading = false
            this.AddModal = false
            this.getData()
          })
        }
      })
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getData()
  },
}
</script>

<style scoped  lang='less'>
</style>
