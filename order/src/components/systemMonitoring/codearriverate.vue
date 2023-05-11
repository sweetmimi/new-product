<template>
  <div class="m-customerList">
    <div class="button">
      <Button class="magR" :class="isClick ? YES : NO" @click="clickNow"
        >{{$t('order.search.realTimeData')}}</Button
      >
      <Button :class="isClick ? NO : YES" @click="clickHistory"
        >{{$t('order.search.historyData')}}</Button
      >
      <Form inline :label-width="100" class="fr">
     <FormItem :label="`${$t('order.search.historyTime')}`">
              <DatePicker
                transfer
                type="daterange"
                :options="timeLimitConfig"
                format="yyyy-MM-dd "
                @on-change="repayTimeChange"
                :placeholder="`${$t('selectPrefix')}${$t('order.search.chosehistoryTime')}`">
              </DatePicker>
    </FormItem>
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
    </Table>
    <!-- <Alert v-show="!(showTable && pageCount > 0)">{{ $t('noData') }}</Alert> -->


  </div>
</template>

<script >

import { Component, Vue } from "vue-property-decorator";
import qs from "qs";
import { Codearriverate } from "../../api/customer";

@Component
export default class CustomerList extends Vue {
  isClick = false;
  YES = "classYes";
  NO = "classNo";
  loading = false;
  showTable = false;
  reData="";
  begin_time= "";
  end_time = "";
  searchLoading = false;
  total = 0;
  pageCount = 0;
  pageSize = 10;
  tableData = [];
  searchForm = {
    page: 1
  };
      timeLimitConfig = {
    disabledDate (date) {
      return date && date.valueOf() > Date.now()
    }
  }
  tableDefine = [
    {
      title: this.$t("dataReport.tableHead.hours"),
      align: "center",
      key: "date_time",

      minWidth: 80
    },
    {
      title: this.$t("dataReport.tableHead.rate"),
      align: "center",
      key: "rate",
      minWidth: 80
    },
    {
      title: this.$t("dataReport.tableHead.recv_num"),
      align: "center",
      key: "recv_num",
      minWidth: 80
    },
    {
      title: this.$t("dataReport.tableHead.reg_num"),
      align: "center",
      key: "reg_num",
      minWidth: 80
    },
    {
      title: this.$t("dataReport.tableHead.send_num"),
      align: "center",
      key: "send_num",
      minWidth: 80
    }
  ];

  view(id) {
    this.$router.push({
      name: "customerDetail",
      params: { id: id }
    });
  }
  repayTimeChange(date) {
    this.begin_time = date[0]
    this.end_time = date[1]
  }
  _getList(type) {

     this.loading = true;
    Codearriverate({
        request_type :2,
    }, (res) => {
        this.begin_time = "";
        this.end_time = "";
       this.loading = false;
      if (+res.code === 0) {
        const data = res.data;
        let search = {
          date_time: data.total.date_time,
          rate: data.total.rate,
          recv_num: data.total.recv_num,
          reg_num: data.total.reg_num,
          send_num: data.total.send_num
        };
        this.tableData.splice(0, 0, search);
        data.list.map((item) => {
          this.tableData.push(item);
        });
      } else {
        this.$Message.error(res.msg);
        this.showTable = false;
      }
    });
  }

    _getHistoryList() {
     this.loading = true;
    Codearriverate({
            request_type :1,
            begin_time:this.begin_time,
            end_time:this.end_time
    }, (res) => {
       this.loading = false;
      if (+res.code === 0) {
        const data = res.data;
        let search = {
          date_time: data.total.date_time,
          rate: data.total.rate,
          recv_num: data.total.recv_num,
          reg_num: data.total.reg_num,
          send_num: data.total.send_num
        };
        this.tableData.splice(0, 0, search);
        data.list.map((item) => {
          this.tableData.push(item);
        });
      } else {
        this.showTable = false;
        this.$Message.error(res.msg);
      }
    });
  }
  clickNow() {

      this.isClick = false;


    this.tableData = [];
    this._getList();
  }
  clickHistory() {

      this.isClick = true;

    this.tableData = [];
    this._getHistoryList();
  }
  created() {
    this._getList();
  }
}
</script>
<style  scoped>
.button {
  margin-bottom: 10px;
}
.fr{
    float: right;
    display: contents;
}
.magR {
  margin-right: 20px;
}
.classYes {
  background-color: #ccc;
  color: #fff;
}
.classNo {
  background-color: #2d8cf0;
  color: #fff;
}
</style>
