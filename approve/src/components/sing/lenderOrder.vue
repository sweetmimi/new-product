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
                @on-change="timeChange"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.time')}`"
              ></DatePicker>
            </FormItem>
            <FormItem class="fix-form-btn">
              <Button type="primary" slot="label" @click="searchData()">{{ $t("search") }}</Button>
            </FormItem>
            <Button
                type="success"
                slot="label"
                @click="batchInsurance()"
              >{{ $t("sing.batchInsurance") }}</Button>
              <Button
                type="success"
                slot="label"
                @click="batchSing()"
              >{{ $t("sing.batchSing") }}</Button>
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
      @on-selection-change="selectionChange"
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
        <Button
        type="text"
          @click="viewSign(props.rowInfo)"
          size="small"
        >{{ $t("sing.goSing")}}</Button>
         <Button
        type="text"
         :disabled="props.rowInfo.insurance==3"
          @click="Insurance(props.rowInfo)"
          size="small"
        >{{ $t("sing.Insurance")}}</Button>
      </template>
    </Table>
    <Page :total="total" :page-size="pageSize" :current.sync="searchForm.page" class-name="m-pagination"
      @on-change="handlePage" show-total  show-elevator>
      {{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page>

      <Modal
      v-model="SignModal"
      :title="$t('approvalTask.tableBlock.Sign')"
      width="1200"
    >
      <iframe
        :src="signUrl"
        frameborder="0"
        width="100%"
        height="600px"
      ></iframe>
      <div slot="footer" class="footer">
        <Button
          class="fix-table-btn"
          @click="SignModal = false"
        >{{ $t("cancelText") }}</Button>
        <Button
          type="success"
          class="fix-table-btn"
          @click="isSing"
        >{{ $t("sing.isSing") }}</Button>
      </div>
    </Modal>
    <!-- suer  -->
    <Modal
        v-model="batchModal"
        :title="topTitle"
        >
        <span>{{batchModalTitle}}</span>
        <div slot="footer" class="footer">
        <Button
          class="fix-table-btn"
          @click="batchModal = false"
        >{{ $t("cancelText") }}</Button>
        <Button
          type="success"
          class="fix-table-btn"
          @click="isBatch"
        >{{ $t("okText") }}</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import {
  getSingOrderList,
  } from '@/api/order'
  import {
  getsignpage,
  commitsign,
  apiBatchsign,
  apiBatchInsurance
} from '@/api/index'
export default {
  name: 'invalid',
  props: {},
  components: {},
  data() {
    return {
      orderNoS:[],
      approveIdArr:[],
      selection:[],
      topTitle:'',
      batchModalTitle:'',
      batchModal:false,
      batchModalTitle:'',
      SignModal: false,
      signUrl:"",
      total:0,
      pageSize:10,
      searchForm: {
        query_type:2,
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
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left',
        },
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
          minWidth: 250,
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
        params: { approveId: "view_" + row.approve_id }
      });
      window.open(url.href, "_blank");
    },
    viewSign(row) {
      this.approveId = row.approve_id
      getsignpage(
        {
          approveId: row.approve_id,
        },
        (res) => {
          this.SignLoading = false;
          if(res.data.signIndex==1){
            if (res.data.signPage) {
              window.open(res.data.signPage)
              this.signUrl = res.data.signPage;
            }
          }else{
            if (res.data.signPage) {
              this.SignModal = true
              this.signUrl = res.data.signPage;
            }
          }

        }
      );
    },

    isSing(){
      commitsign({
        approveId:this.approveId
      },res=>{
        this.SignModal = false
        this._getList()
        // window.open(res.signPage)
      })
    },
    selectionChange(selection) {
      this.selection = selection
      console.log(selection)
      this.orderNoS = []
      this.approveIdArr = []
      selection.forEach(item=>{
        this.orderNoS.push(item.orderNo)
        this.approveIdArr.push(item.id)
      })
    },
    Insurance(row){
      // this.$refs.table.selectAll(false);
      this.subType='Insurance'
      this.batchModal=true
      this.batchModalTitle=row.order_no,
      this.topTitle=this.$t('sing.isInsurance')

      this.orderNoS = []
      this.orderNoS.push(row.order_no)

    },
    batchInsurance(){

      this.subType='Insurance'
      if(this.orderNoS&&this.orderNoS.length){
        this.batchModal=true,
        this.batchModalTitle=this.$t('sing.isInsurance')
        this.topTitle =this.$t('sing.chooseIsSing',{num:this.orderNoS.length})
      }else{
        this.$Message.warning(this.$t('sing.choose'))
      }
    },
    batchSing(){
      this.subType='sing'
      if(this.approveIdArr&&this.approveIdArr.length){
        this.batchModal=true,
        this.batchModalTitle=this.$t('sing.batchSing')
        this.topTitle =this.$t('sing.chooseIsSing',{num:this.approveIdArr.length})
      }else{
        this.$Message.warning(this.$t('sing.choose'))
      }
    },
    isBatch(){

      if(this.subType=='Insurance'){
        apiBatchInsurance({
          orderNoS:this.orderNoS.toString()
        },(res)=>{

          if(res.status==0){
            this.batchModal=false
            this.$Message.success(res.msg||'success')
            this._getList()
             this.$refs.table.selectAll(false);
          }

        })
      }
      if(this.subType=='sing'){
        apiBatchsign({
          approveIdArr:this.approveIdArr
        },(res)=>{

          if(res.status==0){
            this.batchModal=false
            this._getList()
            if(res.data.failCommitNumber){
              this.$Message.warning("fail id" + res.failCommitApproveIdStr)
            }else{
              this.$Message.success("success")
            }

             this.$refs.table.selectAll(false);
          }

        })
      }
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
