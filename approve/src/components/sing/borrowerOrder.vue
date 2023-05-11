<template>
  <div class="m-invalid">
    <div class="search-wrap">
      <Form inline :label-width="120">
        <div class="search-group-wrap">
          <div class="search-group">
            <!-- <FormItem label="Sortir Stats">
              <Select v-model="searchForm.order_status" clearable>
                <Option :value="70">Membatalkan</Option>
                <Option :value="100">gagal</Option>
              </Select>
            </FormItem> -->
            <FormItem label="Waktu Dibuat">
              <DatePicker
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd"
                v-model="date"
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
          @click="viewDetail(props.rowInfo)"
          icon="ios-eye"
          size="small"
        >Periksa</Button>
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
        query_type:3,
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
    viewDetail(row) {
      let url = this.$router.resolve({
        name: "detail",
        params: { approveId: "view_" + row.approve_id },
        query:{
          isRecheck: row.isRecheck||1,

        }
      });
      window.open(url.href, "_blank");
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.searchData()
  },
}
</script>

<style scoped  lang='less'>
</style>
