<template>
  <div>
    <div class="search">
      <h4 style="margin:20px 0">FDC {{$t('search')}}</h4>
      <span>{{$t('operateAmount.tableHead.order')}}</span>
      <Input
        clearable
        type="text"
        v-model="order_no"
        style="margin-left:10px"
        :placeholder="`${$t('inputPrefix') }${$t('operateAmount.tableHead.order') }`"
      />
      <Button
        type="primary"
        slot="label"
        style="margin-left:10px"
        @click="_getList();page=1"
      >{{$t('search')}}</Button>
    </div>
    <div class="table-wrap">
      <Table border ref="table" :data="list" :columns="tableColums" :loading="loading">
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size="18" class="spin-icon"></Icon>
          <div>{{$t('loadingText')}}</div>
        </Spin>
        <!-- table loading -->
        <template slot="action" slot-scope="props">
          <Button
            type="text"
            class="fix-table-btn"
            @click="detail(props.rowInfo)"
            icon="ios-create-outline"
            size="small"
          >{{$t('rdl.detail')}}</Button>
        </template>
      </Table>
    </div>
    <!-- table -->
    <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
    <!-- page -->
    <Modal :title="$t('rdl.detail')" width="800" class="changModal m-modal" v-model="showModal">
      <div class="bd">
        <ul>
          <li v-for="(item,index) in detailList" :key="index">
          <strong>{{index}}:</strong>  {{detailList[index]}}
          </li>
        </ul>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getFdcList } from '@/api/loan'
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      loading: false,
      showModal: false,
      order_no: '',
      pageSize: 10,
      page: 1,
      total: 0,
      list: [],
      detailList:{},
      tableColums: [
        {
          key: 'order_no',
          minWidth: 150,
          fixed: 'left',
          align: 'center',
          title: this.$t('operateAmount.tableHead.order'),
        },
        {
          key: 'user_idcard',
          minWidth: 150,
          fixed: 'left',
          align: 'center',
          title: this.$t('customer.idcard'),
          render: (h, params) => {
            return h('div',params.row.user_idcard)
          }
        },
        {
          key: 'user_name',
          minWidth: 150,
          fixed: 'left',
          align: 'center',
          title: this.$t('operateAmount.tableHead.name'),
        },
        {
          key: 'user_mobile',
          minWidth: 150,
          fixed: 'left',
          align: 'center',
          title: this.$t('operateAmount.tableHead.mobile'),
         
        },
        {
          title: this.$t('operate.handle'),
          key: 'handle',
          align: 'center',
          fixed: 'right',
          minWidth: 200,
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
    _getList() {
      this.list = []
        this.loading = true
        getFdcList(
          {
            page: this.page,
            order_no: this.order_no,
          },
          (res) => {
            if (res.code == 0) {
              this.loading = false
              this.list = res.data.list
              this.total =  Number(res.data.arrPager.count) 
            } else {
              this.loading = false
            }
          }
        )
      
    },
    handlePage(pageIndex) {
      this.page = pageIndex || 1
      this._getList()
    },
    detail(row){
      this.showModal = true
      this.detailList = JSON.parse(row.order_info); 
      console.log(this.detailList)
    }
  },
  beforeCreate() {},
  created() {
    // this._getList()
  },
  beforeMount() {},
  mounted() {},
}
</script> 

<style scoped  lang='less'>
.search {
  margin-bottom: 20px;
}
</style>
