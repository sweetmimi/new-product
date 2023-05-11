<template>
  <div class="m-customerList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="`${$t('customer.phone')}`">
              
              <Input type="text" v-model="searchForm.phone" :placeholder="$t('inputPrefix')"/>
            </FormItem>

            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="handlePage()"
              >{{$t('search')}}</Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>

    <Table
      ref="table"
      border
      class="list-table"
      v-show="showTable && pageCount > 0"
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
          @click="view(props.rowInfo.uid)"
          icon="ios-eye"
          size="small"
        >{{$t('operate.viewBtn')}}</Button>
      </template>
    </Table>
    <Alert v-show="!(showTable && pageCount > 0)">{{ $t('noData') }}</Alert>

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
import {Request } from "../../api/customer";
// import HomeHeader from "../components/Base";
@Component
export default class CustomerList extends Vue {
  $refs!: {
    table: HTMLFormElement;
  };
  loading = false;
  showTable = false;
  searchLoading = false;
  total = 0;
  pageCount = 0;
  pageSize = 10;
  tableData = [];
  searchForm = {
    page: 1,
    idcard: "",
    phone: "",
    uid: "",
    time_start: "",
    time_end: ""
  };
  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now();
    }
  };
  tableDefine = [
    {
      title: this.$t("dataReport.tableHead.mobile"),
      align: "center",
      key: "phone_num",
      fixed: "left",
      minWidth: 150
    },
    {
      title: this.$t("dataReport.tableHead.vcode"),
      align: "center",
      key: "code",
      minWidth: 150
    },
    {
      title: this.$t("dataReport.tableHead.dateline"),
      align: "center",
      key: "send_time",
      minWidth: 150
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
    const phoneNum = { phoneNum: this.searchForm.phone }
    Request(phoneNum, (res: any) => {
      
      // this.loading = false;
      if (+res.code === 0) {
        const data = res.data;
        this.tableData = data.list || []
        this.total =  Number(data.arrPager.count) 
        this.pageCount = + Number(data.arrPager.count) 
        this.pageSize = +data.arrPager.pageSize
        this.showTable = true
      } else {
        this.showTable = false
      }
    })

    
  }
  timeChange(date: any) {
    this.searchForm.time_start = date[0]
    this.searchForm.time_end = date[1]
  }

  created() {
    this._getList()
  }
}
</script>


