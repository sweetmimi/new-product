<template>
  <div class="m-customerList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <FormItem :label="`${$t('monitoring.search.usermatch')}`">
          <Select v-model="searchForm.channels" style="width:200px">
            <Option
              v-for="(item, index) in channels"
              :key="index"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
        </FormItem>
        <FormItem :label="`${$t('monitoring.search.time')}`">
          <DatePicker
          v-model="nowTime"
            transfer
            type="date"
            format="yyyy-MM-dd"
            @on-change="repayTimeChange"
            :placeholder="
              `${$t('selectPrefix')}${$t('order.search.repayTime')}`
            "
          >
          </DatePicker>
        </FormItem>
        <FormItem class="fix-form-btn" :label-width="100">
          <Button
            type="primary"
            slot="label"
            :loading="loading"
            @click="handlePage()"
            >{{ $t("search") }}</Button
          >
        </FormItem>
         <FormItem>
            <Button 
                    v-if="role"
                    icon="ios-download-outline"
                    style="margin-bottom: 10px"
                    type="success"
                    @click="handleExpertData">
              {{$t('monitoring.search.export')}}
            </Button>
         </FormItem>
      </Form>
    </div>

    <Table
      ref="selection"
      border
      class="list-table"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
      @on-select="handleSelect"
    >
    </Table>


    <Page
      :total="+total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
      >{{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page
    >

  </div>
</template>

<script>
import { getMonitor, postMonitor, exportWhitelist } from "../../api/customer";
import qs from "qs";
import moment from "moment";
import{export_json_to_excel}  from  "@/vendor/Export2Excel"
export default {
  data() {
    return {
      channels: [],
      tableData: [],
      pageCount: 0,
      pageSize: 10,
      showTable: false,
      loading: false,
      role:false,
      nowTime:'',
      searchForm: {
        channels: "",
        page: 1
      },
      tableDefine: [
        
        {
          title: this.$t('channel'),
          align: "center",
          key: "channel",
          minWidth: 150
        },
        {
          title: this.$t('updateTime'),
          align: "center",
          key: "create_time",
          minWidth: 150
        },
        // {

        //   align: "center",
        //   key: "mid",
        //   minWidth: 150
        // },
        {
          title: this.$t('wwhiteNum'),
          align: "center",
          key: "num",
          minWidth: 150
        }
      ]
    };
  },
  created() {
    let date = new Date();
    let year = date.getFullYear(); 
    let mon = date.getMonth() + 1; 
    let da = date.getDate(); 
    let nowTime = year + "-" + mon + "-" + da;
    
    this.nowTime =  nowTime;
    this.getData();
    this.handlePage();
    console.log(localStorage.getItem("role"))
    if(localStorage.getItem("role")=="role_super_admin"){
        this.role = true;
    }else{
      this.role = false;
    }
    

  },
  methods: {
    repayTimeChange(date) {
      this.selectTime = date;
    },
    formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleExpertData() {
      
      exportWhitelist({channel: this.searchForm.channels},res=>{
         if(+res.code == '0'){
           const datalist = res.data
           const tHeader = datalist.header;
           const column = datalist.column_map;
           const list =datalist.list
           let title=moment().format('YYYY-MM-DD')
           let filterVal=[]
           for(let key in column){
             filterVal.push(column[key])
           }
           const data = this.formatJson(filterVal, list);
           export_json_to_excel({
                        header: tHeader,
                         data,
                         filename: title,
                        });
            this.$Message.success('success');
         }if(+res.code == '40'){
           this.$Message.error('Coba lagi setelah memilih sistem!');
         } 
      })
  },
  
  handleSelect(){
    console.log(selection)
  },
    getData() {
      getMonitor({}, res => {
        if (+res.code === 0) {
          this.channels = res.data.channel;
          console.log(this.channels);
        } else {
          this.showTable = false;
        }
      });
    },
    handlePage() {
      
      postMonitor(
        {
          channel: this.searchForm.channels,
          page: this.searchForm.page,
          date:  this.selectTime || this.nowTime 
        },
        res => {
          if (+res.code === 0) {
            this.tableData = res.data.whitelist;
            this.pageCount = res. Number(data.arrPager.count) 
            console.log(this.pageCount);
            this.showTable = true;
          } else {
            this.showTable = false;
          }
        }
      );
    }
  }
};
</script>
