<template>
  <div class="m-orderList">
     <Tabs type="card" @on-click="clickTabPane" animated :value="TabsValue">
      <TabPane :label="item.label" :name="item.name" v-for="(item,index) in tabList" :key="index">
         <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
           <FormItem :label="`${$t('order.search.createTime')}`">
              <DatePicker
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd "
                v-model="time"
                @on-change="createTimeChange"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'order.search.createTime'
                )}`"
              >
              </DatePicker>
            </FormItem>
            <FormItem :label="`${$t('dataReport.search.loanType')}`">
              <Select
                clearable
                transfer
                v-model="searchForm.loanType"
                :placeholder="`${$t('selectPrefix')}${$t(
                  'dataReport.search.loanType'
                )}`"
              >
                <Option
                  v-for="(item, index) in loanTypes"
                  :key="index"
                  :value="index"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.channelSource')">
              <Select v-model="searchForm.source" clearable>
                <Option v-for="(item, index) in channelSources" :key="index" :value="item" >
                  {{item}}</Option>
              </Select>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="searchloading"
                @click="handlePage()"
                >{{ $t("search") }}</Button
              >
            </FormItem>
            <Button
              v-show="showTable && pageCount > 0"
              icon="ios-download-outline"
              style="margin-bottom: 10px"
              type="success"
              :loading="exportloading"
              @click="handleExpertData(item.name)"
            >
              {{ $t("order.search.exportloanProfit") }}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  <Alert v-show="item.name=='2'">The total balance of loan orders in the selected loan date range:Rp {{totalUnpayAmt}},total profit:Rp {{totalTotalProfit}}</Alert>
    <Table
      ref="table"
      border
      class="list-table"
      :data="tableData"
      :columns="tableHeader"
      :loading="searchloading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>


    <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
    >
      {{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page
    >

      </TabPane>
     </Tabs>
   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { apiLoanapertureprofit, apiAllLoanapertureprofit} from "@/api/dataReport";
import { getchannel } from "@/api/dataReport";
import { export_json_to_excel } from "@/vendor/Export2Excel";
@Component
export default class OrderList extends Vue {
  @Getter("selectItems") selectItems: any;
  @Action("getSelectList") getSelectList: any;
  $refs!: {
    table: HTMLFormElement;
  };
  searchloading = false;
  exportloading = false;
  showTable = false;
  tabList=[
    {label:'Data details',name:'1'},
    {label:'Data summary',name:'2'}
  ];
  totalUnpayAmt=0;
  totalTotalProfit=0;
  TabsValue="1";
  total = 0;
  pageCount = 0;
  pageSize = 10;
  tableData = [];
  tableHeader = [];
  repaystatusList = [
    {
      key: 1,
      value: "1",
    },
    {
      key: 2,
      value: "2",
    },
  ];
  time:""
  searchForm = {
    page: 1,
    loanTimeStart: "",
    loanTimeEnd: "",
    loanType: 0,
    source:"",
  };
  channel = [];
  orderStatus = [];
  channelSources=[];
  
  get loanTypes() {
    return this.selectItems.loan_type_list || [];
  }

  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now();
    },
  };

  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1;
    this._getList(this.TabsValue);
  }
  createTimeChange(date: any) {
    this.searchForm.loanTimeStart = date[0];
    this.searchForm.loanTimeEnd = date[1];
  }
  clickTabPane(name: any) {
      this.TabsValue =name;
      this._getList(name)
      if(name=='1'){
         this.getsource();
      }else{
        this.channelSources.splice(0,0,'all')
      }
      
    }

  _getList(name) {
    this.tableData =[];
    this.searchloading = true;
    var reApi = name=='1'?apiLoanapertureprofit:apiAllLoanapertureprofit;
    reApi(this.searchForm, (res: any) => {
      this.searchloading = false;
      if (+res.code === 0) {
        const data = res.data;
        this.tableHeader = data.list.header;
         for (let i = 0; i < this.tableHeader.length; i++) {
             this.tableHeader[i].align = "center";
             if(i===0){
                this.tableHeader[i].minWidth = 150;
                this.tableHeader[i].fixed = "left";
             }else{
                  this.tableHeader[i].minWidth = 120;
             }
         }
        this.tableData = data.list.body || [];
        this.total = Number(data.arrPager.count);
        this.pageCount = +data.arrPager.count;
        this.pageSize = +data.arrPager.pageSize||10;
        if(name =='2'){
           this.totalUnpayAmt = +data.collect.totalUnpayAmt || 0;
            this.totalTotalProfit = +data.collect.totalTotalProfit || 0;
        }
       
        this.showTable = true;
      } else {
        this.showTable = false;
        this.$Message.error(res.msg+'Screening time cannot exceed one month')
      }
    });
  }
  formatJson(filterVal, jsonData) {
    return jsonData.map((v) => filterVal.map((j) => v[j]));
  }
  handleExpertData(name) {
    this.exportloading = true;
    const payload = Object.assign({}, this.searchForm, {
      export: 1,
    });
     var reApi = name==1?apiLoanapertureprofit:apiAllLoanapertureprofit;
    reApi(payload, (res: any) => {
      if (res.code == 0) {
        this.exportloading = false;
        const list = res.data.list.body;
        var filterVal = [];
        var tHeader = [];
        res.data.list.header.forEach((item, index) => {
          filterVal.push(item.key);
          tHeader.push(item.title);
        });
        const data = this.formatJson(filterVal, list);

        export_json_to_excel({
          header: tHeader,
          data,
          filename: this.$t("order.search.exportloanProfit"),
        });
        this.$Message.success(this.$t("dataReport.tableHead.Successfulexport"));
      }
    });
  }
  getsource(){
        getchannel({}, (res: any) => {
      let tableData = [];
      if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
        for (let k in res.data.data) {
          tableData.push(res.data.data[k]);
        }
      } else {
        tableData = res.data.data;
      }
      this.channelSources = tableData;
    });
  }
  created() {
    this.getsource();
    this._getList('1');
  }
}
</script>
