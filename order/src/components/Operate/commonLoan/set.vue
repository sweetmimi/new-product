<template>
  <div>
    <h3>Konfigurasi otomatis daftar pinjaman bersama</h3>
    <Alert style="margin:20px 0">
      Tpis : Ketika pengguna memenuhi kondisi berikut untuk jumlah penyelesaian, mereka akan dapat melihat jumlah produk dan tampilan produk yang sesuai
       Ini akan ditampilkan dari rendah ke tinggi sesuai dengan nomor product_id
    </Alert>
    <Button
      type="primary"
      :loading="loading"
      style="margin-bottom:20px"
      @click="isEdit?isEdit=false:isEdit=true"
    >edit</Button>
    <div v-if="!isEdit">
      <Table border ref="table" :data="list" :columns="tableColums2" :loading="loading"></Table>
    </div>
    <div v-else>
      <Table border ref="table" :data="list" :columns="tableColums" :loading="loading"></Table>
      <div v-if="!isShowAdd" class="addBtn" @click="showAdd">add</div>
      <div v-else class="addInput">
        <div class="inputNum">
          <Input style="width: 80px" v-model="addForm.minPayoffNum" />--
          <Input style="width: 80px" v-model="addForm.maxPayoffNum" />
        </div>
        <div class="inputCount">
          <Input style="width: 80px" v-model="addForm.loanProductNum" />
        </div>
        <div class="inputBtn">
          <Button type="primary" style="margin-right:20px" @click="addData">save</Button>
          <Button @click="cnacel">cancel</Button>
        </div>
      </div>
      <div class="subform">
        <Button @click="cnacel" style="margin-right:20px">cancel</Button>
        <Button type="primary" @click="subData">save</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetinfobyname, apiSavemoduleconf } from '@/api/user'
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      isEdit: false,
      loading: false,
      isShowAdd: false,
      list: [],
      addForm: {
        minPayoffNum: '',
        maxPayoffNum: 'n',
        loanProductNum: '',
      },
      tableColums: [
        {
          key: 'id',
          align: 'center',
          title: 'Jumlah pemukiman',
          width: 300,
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  disabled: params.row.disabled,
                  value: params.row.minPayoffNum,
                },
                on: {
                  input: (e) => {
                    this.list[params.index].minPayoffNum = e
                  },
                },
                style: {
                  width: '80px',
                },
              }),
              h('span', '--'),
              h('Input', {
                props: {
                  disabled: params.row.disabled,
                  value: params.row.maxPayoffNum,
                },
                on: {
                  input: (e) => {
                    this.list[params.index].maxPayoffNum = e
                  },
                },
                style: {
                  width: '80px',
                },
              }),
            ])
          },
        },
        {
          key: 'loanProductNum',
          align: 'center',
          title: 'Jumlah maksimum produk yang terlihat',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.loanProductNum,
                },
                on: {
                  input: (e) => {
                    this.list[params.index].loanProductNum = e
                  },
                },
                style: {
                  width: '80px',
                },
              }),
            ])
          },
        },
        {
          key: 'loanProductNum',
          align: 'center',
          title: 'beroperasi',
          render: (h, params) => {
            if (params.index == this.list.length - 1) {
              return h(
                'Button',
                {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: 'red',
                  },
                  on: {
                    click: (e) => {
                      this.list.splice(params.index, 1)
                    },
                  },
                },
                'menghapus'
              )
            }
          },
        },
      ],
      tableColums2: [
        {
          key: 'id',
          align: 'center',
          title: 'Jumlah pemukiman',
          width: 300,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    width: '80px',
                  },
                },
                params.row.minPayoffNum
              ),
              h('span', '--'),
              h(
                'span',
                {
                  style: {
                    width: '80px',
                  },
                },
                params.row.maxPayoffNum
              ),
            ])
          },
        },
        {
          key: 'loanProductNum',
          align: 'center',
          title: 'Jumlah maksimum produk yang terlihat',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    getData() {
      this.loading = true
      apiGetinfobyname(
        {
          name: 'multi_loan_list',
        },
        (res) => {
          (this.list = res.data.params),
            (this.name = res.data.name),
            (this.loading = false)
        }
      )
    },
    editTable(row) {
      this.list.forEach((item) => {
        item.disabled = false
      })
    },
    showAdd() {
      this.isShowAdd = true
      this.addForm = {
        minPayoffNum: '',
        maxPayoffNum: '5000',
        loanProductNum: '',
      }
    },
    cnacel() {
      this.isShowAdd = false
      this.addForm = {
        minPayoffNum: '',
        maxPayoffNum: '',
        loanProductNum: '',
      }
      this.getData()
    },
    addData() {
      this.list.push(this.addForm)
      this.isShowAdd = false
      this.addForm = {
        minPayoffNum: '',
        maxPayoffNum: '',
        loanProductNum: '',
      }
    },
    subData() {
      var canSub = true
      console.log(this.list)

      for (let index = 0; index < this.list.length; index++) {
        if (
          this.list[index].minPayoffNum &&
          this.list[index].maxPayoffNum &&
          this.list[index].loanProductNum
        ) {
          if (Number(this.list[index].maxPayoffNum) > Number(this.list[index].minPayoffNum)) {
            if (
              index + 1 < this.list.length &&
              this.list[index].maxPayoffNum != this.list[index + 1].minPayoffNum
            ) {
              this.$Message.error('Harap pastikan kesinambungan berapa kali')
              canSub = false
              return
            } else {
              canSub = true
            }
          } else {
            this.$Message.error('Jumlah maksimum kali harus lebih besar dari jumlah minimum kali')
            canSub = false
            return
          }
        } else {
          this.$Message.error('Mohon diisi dengan lengkap')
          canSub = false
          return
        }
      }
      if (canSub) {
        apiSavemoduleconf(
          {
            name: this.name,
            params: this.list,
          },
          (res) => {
            this.isEdit = false
            this.getData()
          }
        )

        
      }

      console.log(this.list)
    },
  },
  beforeCreate() {},
  created() {
    this.getData()
  },
  beforeMount() {},
  mounted() {},
}
</script> 

<style lang="scss" scoped>
.addBtn {
  width: 100%;
  height: 40px;
  border: 1px dashed #ccc;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  margin-top: 10px;
}
.addBtn:hover {
  border: 1px dashed #000;
}
.addInput {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px 0;
}
.inputNum {
  display: inline-block;
  width: 300px;
  text-align: center;
}
.inputCount,
.inputBtn {
  text-align: center;
  display: inline-block;
  width: calc(50% - 150px);
}
.subform {
  margin-top: 50px;
  text-align: center;
}
</style>
