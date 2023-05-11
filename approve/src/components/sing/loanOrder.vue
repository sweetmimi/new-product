<template>
  <div class="m-invalid">
    <div class="search-wrap">
      <Form inline :label-width="120">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem label="Sortir Stats">
              <Select v-model="searchForm.order_status" clearable>
                <Option :value="80">Dalam Proses Transfer Dana</Option>
                <Option :value="85">Menunggu Pendanaan Ulang</Option>
                <Option :value="90">Berhasil Transfer Dana</Option>
                <Option :value="110">Proses Pengembalian Dana</Option>
                <Option :value="115">Dalam Proses Perpanjangan</Option>
                <Option :value="120">Sudah Terlambat</Option>
                <Option :value="130"> Proses Pelunasan Di Awal</Option>
                <Option :value="140">Lunas</Option>
                <Option :value="150">Lunas Di Awal</Option>
                <Option :value="160">Lunas Di Keterlambatan</Option>
                <Option :value="190">Hapus Buku</Option>

              </Select>
            </FormItem>
            <FormItem label="Waktu Dibuat">
              <DatePicker
                v-model="date"
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd"
                @on-change="timeChange"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.time')}`"
              ></DatePicker>
            </FormItem>
            <FormItem class="fix-form-btn">
              <Button type="primary" slot="label" @click="searchData()">{{ $t("search") }}</Button>
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
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <Button
          type="text"
          class="fix-table-btn"
          @click="viewDetail(props.rowInfo.order_no)"
          icon="ios-eye"
          size="small"
        >Periksa</Button>
        <Button type="text"    :disabled='!props.rowInfo.url'   @click="Contract(props.rowInfo.url)"
          size="small">Lender Kontrak</Button>
          <Button type="text"   :disabled='!props.rowInfo.borrowUrl'   @click="Contract(props.rowInfo.borrowUrl)"
          size="small">Borrower Kontrak</Button>
          <Button type="text"    :disabled='!props.rowInfo.authorizationUrl'   @click="Contract(props.rowInfo.authorizationUrl)"
          size="small">Surat Kuasa</Button>
      </template>
    </Table>
    <Page :total="total" :page-size="pageSize" :current.sync="searchForm.page" class-name="m-pagination"
      @on-change="handlePage" show-total  show-elevator>
      {{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page>

  </div>
</template>

<script>
import {
  getSingOrderList,
  } from '@/api/order'
export default {
  name: 'invalid',
  props: {},
  components: {},
  data() {
    return {
      total:0,
      pageSize:10,
      date:[],
      searchForm: {
        query_type:4,
        page:1,
        order_status: '',
        begin_time: '',
        end_time: '',
      },
      loading: false,
      tableData: [],
      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        },
      },
      tableDefine: [
        {
          title: 'Kode Pesanan',
          align: 'center',
          key: 'order_no',
          fixed: 'left',
          minWidth: 110,
        },
        {
          title: 'Nama',
          align: 'center',
          key: 'user_name',
          fixed: 'left',
          minWidth: 110,
        },
        {
          title: 'Nominal Pengajuan',
          align: 'center',
          key: 'application_amount',
          fixed: 'left',
          minWidth: 110,
        },
        {
          title: 'Waktu (hari)',
          align: 'center',
          key: 'application_term',
          fixed: 'left',
          minWidth: 110,
        },
        {
          title: 'Waktu Dibuat',
          align: 'center',
          key: 'create_time',
          fixed: 'left',
          minWidth: 110,
        },
        {
          title: 'Status',
          align: 'center',
          key: 'status',
          fixed: 'left',
          minWidth: 110,
        },
        {
          title: 'Operasi',
          align: 'center',
          key: 'option',
          fixed: 'right',
          minWidth: 380,
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
  computed: {},
  watch: {},
  methods: {
    timeChange(date) {
      if (date && date.length > 0) {
        this.searchForm.begin_time = date[0] + ' 00:00:00'
        this.searchForm.end_time = date[1] + ' 23:59:59'
      } else {
        this.searchForm.begin_time = ''
        this.searchForm.end_time = ''
      }
    },
    searchData() {
      this.loading = true
      getSingOrderList(this.searchForm, (res) => {
          this.loading = false
          if (+res.status === 0) {
            const data = res.data
            this.tableData = data.list || []
            this.total = Number(data.arrPager.count)
            this.pageCount = +Number(data.arrPager.count)
            this.pageSize = +data.arrPager.pageSize
          } else {
            this.loading = false
          }
        })
    },
    handlePage(pageIndex) {
        this.searchForm.page = pageIndex || 1
        this.searchData()
      },
    viewDetail(order_no) {
      let routeData = this.$router.resolve({
        name: 'loanDetail',
        params: {
          orderNo: order_no,
        },
      })
      window.open(routeData.href, '_blank')
    },
    urlConversion(path) {
        let reg = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
        path = path.replace(reg, "https://$2$3$4$5$6");
        return path
      },
    Contract(path){
        var url =  this.urlConversion(path)
        window.open(url, '_blank')
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    let largeDate = new Date()
    let nowDate = `${largeDate.getFullYear()}-${largeDate.getMonth()+1}-${largeDate.getDate()}`
    this.date = [nowDate+' 00:00:00',nowDate+' 23:59:59']
    this.searchForm.begin_time =this.date[0]
    this.searchForm.end_time =this.date[1]
    this.searchData()
  },
}
</script>

<style scoped  lang='less'>
</style>
