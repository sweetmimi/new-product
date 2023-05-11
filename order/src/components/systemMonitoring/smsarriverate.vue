<template>
  <div class="m-customerList">
    <Table
      ref="table"
      border
      class="list-table"
     
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
    >
      
      <!-- table loading -->
     
    </Table>
    <!-- <Alert v-show="!(showTable && pageCount > 0)">{{ $t('noData') }}</Alert> -->

    <Page
      :total="+total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>

  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import qs from "qs";
import {Smsarriverate } from "../../api/customer";

@Component
export default class CustomerList extends Vue {
 
  loading = false;
  showTable = false;
  searchLoading = false;
  total = 0;
  pageCount = 0;
  pageSize = 10;
  tableData = [];
  searchForm = {
    page: 1,
   
  };
  
  
  tableDefine = [
    
    {
      title: this.$t("dataReport.tableHead.day"),
      align: "center",
      key: "hours",
     
      minWidth: 80
    },
    {
      title: this.$t("dataReport.tableHead.arrive_rate"),
      align: "center",
      key: "arrive_rate",
      minWidth: 80
    },
    {
      title: this.$t("dataReport.tableHead.hours_reg_num"),
      align: "center",
      key: "hours_reg_num",
      minWidth: 80
    },
     {
      title: this.$t("dataReport.tableHead.hours_sms_num"),
      align: "center",
      key: "hours_sms_num",
      minWidth: 80
    }
  ];
  handlePage(pageIndex: number) {
    console.log(222);
    this.searchForm.page = pageIndex || 1;
    this._getList();
  }
  view(id: any) {
    this.$router.push({
      name: "customerDetail",
      params: { id: id }
    });
  }
  _getList() {
      // this.loading = true;
    Smsarriverate({}, (res: any) => {
      // this.loading = false;
      if (+res.code === 0) {
         const data = res.data;
         let search ={
            hours:this.$t('nowDataALL'),
            arrive_rate:data.sum_up.arrive_rate,
            hours_reg_num:data.sum_up.all_reg_num,
            hours_sms_num:data.sum_up.all_sms_num,
        }
           this.tableData.splice(0,0,search)
          data.hour_list.map((item:any) =>{
             
           this.tableData.push(item)
          })
          
       
        

        
      } else {
        this.showTable = false
      }
    })

    
  }
  

  created() {
    this._getList()
  }
}
</script>
