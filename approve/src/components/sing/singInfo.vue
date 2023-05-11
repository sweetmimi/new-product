<template>
  <div class="m-signInfo">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('loan.search.time')}`">
              <DatePicker
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd"
                @on-change="timeChange"
                :placeholder="`${$t('selectPrefix')}${$t('loan.search.time')}`"
              ></DatePicker>
            </FormItem>
            <FormItem :label="`${$t('loan.search.timeType')}`">
              <Select
                clearable
                transfer
                v-model="searchForm.time_type"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'loan.search.timeType'
                )}`"
              >
                <Option value="">{{ $t('sing.all') }}</Option>
                <Option value="1">{{ $t('sing.waitLender') }}</Option>
                <Option value="2">{{ $t('sing.waitUser') }}</Option>
                <Option value="3">{{ $t('sing.pass') }}</Option>
              </Select>
            </FormItem>

            <FormItem class="fix-form-btn">
              <Button
                type="primary"
                slot="label"

                @click="handlePage()"
              >{{ $t("search") }}</Button>
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
          @click="viewDetail(props.rowInfo.orderNo)"
          icon="ios-eye"
          size="small"
        >{{ $t("loan.tableHead.viewBtn") }}</Button>
        <Button
        type="text"
          @click="viewSign(props.rowInfo)"
          size="small"
        >{{ $t("sing.goSing")}}</Button>
        <Button
        type="text"
          @click="Insurance(props.rowInfo)"
          size="small"
        >
        <span v-if="props.rowInfo.insurance==1" >{{$t("sing.toubao")}}</span>
        <span v-if="props.rowInfo.insurance==3" >{{$t("sing.quxiao")}}</span>
        <span v-if="props.rowInfo.insurance==5" >{{$t("sing.toubao")}}</span>
        </Button>
      </template>
    </Table>

    <Page
      :total="+total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      show-sizer
      show-elevator
      @on-page-size-change="changePageSize"
    >{{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page>
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
  getSingList,
  getsignpage,
  commitsign,
  apiBatchsign,
  apiBatchInsurance,
  apiUnBatchInsurance
} from '@/api/index'
export default {
  name: 'singInfo',

  data() {
    return {
      orderNoS:[],
      approveIdArr:[],
      selection:[],
      topTitle:'',
      batchModalTitle:'',
      batchModal:false,
      batchModalTitle:'',
      loading: false,
      showTable: false,
      total: 0,
      pageCount: 0,
      pageSize: 10,
      tableData: [],
      SignModal: false,
      signUrl:"",
      searchForm: {
        begin_time:'',
        end_time:'',
      },
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
          title: this.$t('sing.orderNo'),
          align: 'center',
          key: 'orderNo',

          minWidth: 110,
        },
        {
          title: this.$t('sing.userName'),
          align: 'center',
          key: 'userName',
          minWidth: 100,
        },
        {
          title: this.$t('sing.cityName'),
          align: 'center',
          key: 'cityName',
          minWidth: 100,
        },
        {
          title: this.$t('sing.loanAmount'),
          align: 'center',
          key: 'loanAmount',
          minWidth: 100,
        },
        {
          title: this.$t('sing.createTime'),
          align: 'center',
          key: 'createTime',
          minWidth: 100,
        },
        {
          title: this.$t('sing.signStatusDesc'),
          align: 'center',
          key: 'signStatusDesc',
          minWidth: 100,
        },
        {
          title: this.$t('sing.insuranceDesc'),
          align: 'center',
          key: 'insurance',
          minWidth: 100,
          render: (h, params) => {
            if(params.row.insurance==1){
              return h(
              'div',{
                style:{

                }
              },this.$t('sing.waitInsurance')
            )
            }
            if(params.row.insurance==3){
              return h(
              'div',{
                style:{
                  color:'green'
                }
              },this.$t('sing.successInsurance')
            )
            }
            if(params.row.insurance==5){
              return h(
              'div',{
                style:{
                  color:'#ccc'
                }
              },this.$t('sing.cancelInsurance')
            )
            }
           }
        },
        {
          title: this.$t('loan.tableHead.operate'),
          align: 'center',
          key: 'option',
          fixed: 'right',
          minWidth: 300,
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
  methods: {
    viewDetail(orderNo) {
        let routeData = this.$router.resolve({
          name: 'loanDetail',
          params: {
            orderNo: orderNo
          }
        })
        window.open(routeData.href, '_blank');
      },
    urlConversion(path) {
        let reg = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
        path = path.replace(reg, "https://$2$3$4$5$6");
        return path
      },
    viewSign(row) {
      this.approveId = row.id
      getsignpage(
        {
          approveId: row.id,
        },
        (res) => {
          this.SignLoading = false;
          if(res.data.signIndex==1){
            if (res.data.signPage) {
              var url = this.urlConversion(res.data.signPage)
              window.open(url)
              // this.signUrl = res.data.signPage;
            }
          }else{
            if (res.data.signPage) {
              this.SignModal = true
              var url = this.urlConversion(res.data.signPage)
              this.signUrl = url;
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
      this.batchModalTitle=row.orderNo
      this.orderNoS = []
      this.orderNoS.push(row.orderNo)
      this.rowInsurance = row.insurance
      if(row.insurance==3){
        this.topTitle=this.$t('sing.isunInsurance')
      }else{
        this.topTitle=this.$t('sing.isInsurance')
      }
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
        var Api = this.rowInsurance==3?apiUnBatchInsurance:apiBatchInsurance
        Api({
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
    timeChange(date) {
      this.searchForm.begin_time = date[0] || ''
      this.searchForm.end_time = date[1] || ''
    },
    _getList() {
      this.loading = true
      getSingList(
        {startTime:this.searchForm.begin_time || "",
         endTime :this.searchForm.end_time||"",
         page:this.pageCount,
         pageSize:this.pageSize,
        }, (res) => {
        this.loading = false
        if (+res.status === 0) {
          const data = res.data
          this.tableData = data.list || []
          this.tableData.forEach(item=>{
            if (+item.insurance == 3) {
                item._disabled = true;
              }
          })

          this.total = Number(data.arrPager.count)
        } else {
        }
      })
    },
    handlePage(pageIndex) {
      this.pageCount = pageIndex || 1
      this._getList()
    },
    changePageSize(page) {
      this.pageSize = page;
      this._getList();
    },
  },
  created() {
    this._getList()
  },
}
</script>
