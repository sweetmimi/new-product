<!-- zys -->
<template>
  <div class="m-lenderBalance">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem label="NIK">
              <Input type="text" clearable v-model="searchForm.idcard" placeholder="NIK" />
            </FormItem>

            <FormItem label="Nomor">
              <Input type="text" clearable v-model="searchForm.mobile" placeholder="Nomor" />
            </FormItem>

            <FormItem label="Waktu BL">
              <DatePicker
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd"
                @on-change="timeChange"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.time')}`"
              ></DatePicker>
            </FormItem>

            <FormItem label="Status">
              <Select v-model="searchForm.status" clearable>
                <Option value="0">Semua</Option>
                <Option value="1">BlackList</Option>
                <Option value="2">Invalid</Option>
              </Select>
            </FormItem>

            <FormItem class="fix-form-btn">
              <Button
                type="success"
                @click="getTableData"
                style="margin-bottom:20px"
              >{{$t('search')}}</Button>

              <Button
                type="warning"
                @click="exportData"
                style="margin-bottom:20px;margin-left:20px"
              >Tambah</Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>

    <Table
      ref="table"
      border
      class="list-table"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
    ></Table>
    <Page
      :total="total"
      :page-size="10"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
    <Modal v-model="showModal" title="Tambah">
      <Form :label-width="120">
        <FormItem label="Nomor /NIK">
          <Input
            style="width:80%"
            type="textarea"
            :rows="4"
            clearable
            v-model="exportForm.content"
            placeholder="Ketik di sini"
          />
        </FormItem>
        <FormItem label="Catatan">
          <Input
            style="width:80%"
            type="textarea"
            :rows="1"
            clearable
            v-model="exportForm.memo"
            placeholder="Ketik di sini"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showModal = false">{{ $t("cancelText") }}</Button>
        <Button type="success" :loading="btnLoading" @click="submitData">
          {{
          $t("okText")
          }}
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  ApicustomerBlacklist,
  ApicustomerBlacksave,
  ApicustomerBlackremove,
} from '@/api/monitor'
export default {
  name: '',
  components: {},

  data() {
    return {
      btnLoading: false,
      loading: false,
      showModal: false,
      editStatus: '',
      editId: '',
      total: 0,
      exportForm: {
        content: '',
        memo: '',
      },
      searchForm: {
        mobile: '',
        idcard: '',
        page: 1,
        status: '0',
        timeStart: undefined,
        timeEnd: undefined,
      },
      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        },
      },
      tableData: [],
      tableDefine: [
        {
          title: 'Nomor',
          align: 'center',
          key: 'mobile',
        },
        {
          title: 'NIK',
          align: 'center',
          key: 'idcard',
        },
        {
          title: 'Waktu Hapus',
          align: 'center',
          key: 'createTime',
        },
        {
          title: 'Waktu Hapus',
          align: 'center',
          key: 'removeTime',
        },
        {
          title: 'Status',
          align: 'center',
          key: 'statusDesc',
        },
        {
          title: 'Catatan',
          align: 'center',
          key: 'desc',
        },

        {
          title: this.$t('operate.handle'),
          key: 'handle',
          align: 'center',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    disabled: params.row.status == 2,
                    icon: 'md-remove-circle',
                    type: 'text',
                    size: 'small',
                  },

                  on: {
                    click: () => {
                      this.remove(params.row)
                    },
                  },
                },
                'Hapus'
              ),
            ])
          },
        },
      ],
    }
  },

  async created() {
    this.getTableData()
  },

  computed: {},

  mounted() {},

  methods: {
    timeChange(date) {
      this.searchForm.timeStart = date[0]
      this.searchForm.timeEnd = date[1]
    },
    getTableData() {
      this.loading = true
      ApicustomerBlacklist(this.searchForm, (res) => {
        if (res.code == 0) {
          this.loading = false
          this.tableData = res.data.list
          this.total = Number(res.data.arrPager.count)
        } else {
          this.loading = false
          this.$Message.error(res.msg)
        }
      })
    },
    handlePage(pageIndex) {
      this.searchForm.page = pageIndex || 1
      this.getTableData()
    },

    remove(row) {
      this.$Modal.confirm({
        title: 'remove',
        content: 'Hapus daftar hitam, pengguna dapat mengajukan pinjaman secara normal',
        loading: true,
        onOk: () => {
          ApicustomerBlackremove(
            {
              id: row.id,
            },
            (res) => {
              this.$Modal.remove()
              this.$Message.success(res.msg)
              this.getTableData()
            }
          )
        },
      })
    },
    exportData() {
      this.exportForm={}
      this.showModal = true
    },
    submitData() {
      if (!this.exportForm.content) {
        return this.$Message.error('Silakan masukkan nomor ponsel/nomor KTP yang diimpor')
      }
      try {
        this.exportForm.content = this.exportForm.content.replace(/\s+/gi, ';')
      } catch (error) {}
      this.btnLoading = true
      ApicustomerBlacksave(this.exportForm, (res) => {
        if (res.code == 0) {
          this.btnLoading = false
          this.showModal = false
          this.getTableData()
          this.$Message.success(res.msg+res.data.successNum+'num')
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
  },
}
</script>
<style lang='less' scoped>
</style>
