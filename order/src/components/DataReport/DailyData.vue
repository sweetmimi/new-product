<template>
  <div class="m-profit-data">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.search.date')">
              <DatePicker v-model="searchForm.timeFrame" :options="timeLimitConfig" type="daterange"
                :placeholder="$t('selectPrefix')+$t('dataReport.search.date')" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
            <FormItem :label="$t('dataReport.search.loanType')">
              <Select v-model="searchForm.loanType">
                <Option v-for="item in $t('dataReport.search.loanTypes')" :key="item.key" :value="item.key">
                  {{item.value}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.channelSource')">
              <Select v-model="searchForm.channelSources" clearable>
                <Option v-for="(item, index) in channelSources" :key="index" :value="item" @click.native="chioce(item)">
                  {{item}}</Option>
              </Select>
            </FormItem>

            <!-- <FormItem :label="$t('dataReport.search.productType')">
              <Select v-model="searchForm.producType" >
                <Option
                  v-for="(item, index) in producSelect"
                  :key="index"
                  :value="item.key"
                  @click.native="chioce(item)"
                >{{item.title}}</Option>
              </Select>
            </FormItem> -->
            <FormItem class="fix-form-btn" :label-width="100">
              <Button type="primary" slot="label" @click="handlePage()">{{$t('search')}}</Button>
            </FormItem>
            <Button type="success" slot="label" icon="ios-download-outline"
              @click="excelHandlePage()">{{$t('dataReport.tableHead.derivedaily')}}</Button>
          </div>
        </div>
      </Form>
    </div>

    <Table border class="list-table" :data="tableData" :columns="tableColumns" :loading="loading">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>

    <Page :total="Number(total)" :page-size="pageSize" :current.sync="searchForm.page" class-name="m-pagination"
      @on-change="handlePage" show-total v-if="pageCount > pageSize" show-elevator>{{$t('pageSlot.total')}} {{total}}
      {{$t('pageSlot.count')}}</Page>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from "vue-property-decorator";
  import {
    Getter,
    Action
  } from "vuex-class";
  import {
    getchannel,
    getDailyNowdata,
    getDailyData
  } from "../../api/dataReport";

  import {
    getRatlist,
    getRate
  } from "../../common/js/until";

  import {
    export_json_to_excel
  } from "@/vendor/Export2Excel";
  @Component
  export default class DailyData extends Vue {
    @Getter("selectItems") selectItems: any;
    @Action("getSelectList") getSelectList: any;

    searchForm = {
      timeFrame: [

        `${this.formatDayTime(+new Date() - 604800000)}`,
        `${this.formatDayTime(+new Date())}`,
      ],
      loanPeriod: "0",
      loanType: "0",
      producType: 0,
      channelSources: 0,
      page: 1,

    };
    producSelect: Array < any > = [];
    item = "";
    channel = [];
    zhuce = 0;
    loading = false;
    showTable = false;
    searchLoading = false;
    total = 0;
    pageCount = 0;
    pageSize = 10;
    tableData = [];
    register_num = "";
    tableDefine1 = [{
        title: this.$t("dataReport.tableHead.date"),
        align: "center",
        key: "day",
        width: 112,
        fixed: "left"
      },
      {
        title: this.$t("dataReport.tableHead.active_num"),
        align: "center",
        key: "active_num",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.register_num"),
        align: "center",
        key: "register_num",
        width: 130
      },
      // { title: this.$t('dataReport.tableHead.register_rate'), align: 'center', key: 'register_rate', width: 130,},
      {
        title: this.$t("dataReport.tableHead.request_num"),
        align: "center",
        key: "apply_num",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.jinjian_rate"),
        align: "center",
        key: "jinjian_rate",
        width: 130
      },
      // {
      //   title: this.$t("dataReport.tableHead.qz_refuse_num"),
      //   align: "center",
      //   key: "qz_refuse_num",
      //   width: 130
      // },
      // {
      //   title: this.$t("dataReport.tableHead.qz_refuse_rate"),
      //   align: "center",
      //   key: "qz_refuse_rate",
      //   width: 130
      // },

      // {
      //   title: this.$t("dataReport.tableHead.machine_all_num"),
      //   align: "center",
      //   key: "machine_all_num",
      //   width: 130
      // },

      {
        title: this.$t("dataReport.tableHead.machine_refuse_num"),
        align: "center",
        key: "machine_refuse_num",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.machine_pass_num"),
        align: "center",
        key: "machine_pass_num",
        width: 140
      },

      // {
      //   title: this.$t("dataReport.tableHead.machine_refuse_rate"),
      //   align: "center",
      //   key: "machine_refuse_rate",
      //   width: 130
      // },
      {
        title: this.$t("dataReport.tableHead.machine_pass_rate"),
        align: "center",
        key: "machine_pass_rate",
        width: 140
      },

      {
        title: this.$t("dataReport.tableHead.people_all_num"),
        align: "center",
        key: "machine_pass_inrenshen_num",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.people_refuse_num"),
        align: "center",
        key: "people_refuse_num",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.people_pass_num"),
        align: "center",
        key: "people_pass_num",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.people_refuse_rate"),
        align: "center",
        key: "people_refuse_rate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.approve_all_num"),
        align: "center",
        key: "approve_all_num",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.approve_pass_rate"),
        align: "center",
        key: "approve_pass_rate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.lenders_order_num"),
        align: "center",
        key: "lenders_order_num",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.loan_pass_rate"),
        align: "center",
        key: "loan_pass_rate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.lenders_amount"),
        align: "center",
        key: "lenders_amount",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.loan_actual_amount"),
        align: "center",
        key: "loan_actual_amount",
        width: 130
      },
      // ,{ title: this.$t('dataReport.tableHead.need_pay_order_num'), align: 'center', key: 'need_pay_order_num', width: 130 }
      // ,{ title: this.$t('dataReport.tableHead.col_order_num'), align: 'center', key: 'col_order_num', width: 130 }
      //  ,{ title: this.$t('dataReport.tableHead.col_order_amount'), align: 'center', key: 'col_order_amount', width: 130 }
      //   ,{ title: this.$t('dataReport.tableHead.col_rate'), align: 'center', key: 'col_rate', width: 130 }
      // ,{ title: this.$t('dataReport.tableHead.rollover_order_num'), align: 'center', key: 'rollover_order_num', width: 130 }
      // {
      //   title: this.$t("dataReport.tableHead.rollover_num"),
      //   align: "center",
      //   key: "rollover_num",
      //   width: 130
      // },
      // {
      //   title: this.$t("dataReport.tableHead.rollover_amount"),
      //   align: "center",
      //   key: "rollover_amount",
      //   width: 130
      // }
      // ,{ title: this.$t('dataReport.tableHead.rollover_rate'), align: 'center', key: 'rollover_rate', width: 130 }
    ];
    tableDefine2 = [{
        title: this.$t("dataReport.tableHead.lenders_amount"),
        align: "center",
        key: "lenders_amount",
        fixed: "left",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.loan_actual_amount"),
        align: "center",
        key: "loan_actual_amount",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.profileSubmit"),
        align: "center",
        key: "profile_submit",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.profileSubmitSuccess"),
        align: "center",
        key: "profile_submit_success",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.profileSubmitSuccessRatio"),
        align: "center",
        key: "profile_submit_success_ratio",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.contactSubmitAccess"),
        align: "center",
        key: "contact_submit_success",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.ktpFrontSubmit"),
        align: "center",
        key: "ktp_front_submit",
        minWidth: 200
      },
      {
        title: this.$t("dataReport.tableHead.ktpFrontSubmitSuccess"),
        align: "center",
        key: "ktp_front_submit_success",
        minWidth: 200
      },
      {
        title: this.$t("dataReport.tableHead.ktpFrontSubmitSuccessRatio"),
        align: "center",
        key: "ktp_front_submit_success_ratio",
        minWidth: 200
      },
      {
        title: this.$t("dataReport.tableHead.ktpHandSubmitSuccess"),
        align: "center",
        key: "ktp_hand_submit_success",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.faceSubmit"),
        align: "center",
        key: "face_submit",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.faceSubmitSuccess"),
        align: "center",
        key: "face_submit_success",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.faceSubmitSuccessRatio"),
        align: "center",
        key: "face_submit_success_ratio",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.bankSubmit"),
        align: "center",
        key: "bank_submit",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.bankSubmitSuccess"),
        align: "center",
        key: "bank_submit_success",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.bankSubmitSuccessRatio"),
        align: "center",
        key: "bank_submit_success_ratio",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.orders"),
        align: "center",
        key: "orders",
        minWidth: 150
      },
      {
        title: this.$t("dataReport.tableHead.ordersPerRegistration"),
        align: "center",
        key: "orders_per_registration",
        minWidth: 150
      }
    ];
    tableColumns: Array < any > = [];
    formatDayTime(val: any): string {
      if (val) {
        const date: any = new Date(val);
        const Y: any = date.getFullYear();
        let M: any = date.getMonth() + 1;
        let D: any = date.getDate();
        if (M < 10) {
          M = "0" + M;
        }
        if (D < 10) {
          D = "0" + D;
        }
        return Y + "-" + M + "-" + D;
      } else {
        return "";
      }
    }
    get channelSources() {
      return this.channel || [];
    }
    get beginTime(): string {
      return this.formatDayTime(this.searchForm.timeFrame[0]);
    }
    get endTime(): string {
      return this.formatDayTime(this.searchForm.timeFrame[1]);
    }
    timeLimitConfig = {
      disabledDate(date: any) {
        return date && date.valueOf() > Date.now();
      }
    };
    chioce(item: any) {
      this.item = item;
      // console.log(item, 2222);
    }
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
    excelHandlePage() {
      const data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        loanType: this.searchForm.loanType,
        channel: this.searchForm.channelSources,
        productId: String(this.searchForm.producType),
        page: this.searchForm.page
      };
      var start = new Date(this.searchForm.timeFrame[0]).getTime();
      var end = new Date(this.searchForm.timeFrame[1]).getTime();
      if ((end - start) > 604800000) {
        this.$Message.warning(this.$t('oversevenDays'));
        return;
      }

      getDailyData(data, res => {
        if (+res.code == 0) {
          if (res.data.length == 0) {
            this.$Message.info(this.$t("dataReport.tableHead.noMatching"));

          } else {
            let tableData = [];
            if (
              res.data.data instanceof Object &&
              !Array.isArray(res.data.data)
            ) {
              for (let k in res.data.data) {
                tableData.push(res.data.data[k]);

              }
            } else {
              tableData = res.data.data;
            }

            var myDate = new Date();

            if (
              tableData[tableData.length - 1].day == this.formatDayTime(myDate)
            ) {
              tableData[tableData.length - 1].day =
                tableData[tableData.length - 1].day + this.$t('Previoushour');
            }

            getRatlist(tableData, [
              "jinjian_rate",
              "qz_refuse_rate",
              "people_refuse_rate",
              "approve_pass_rate",
              "loan_pass_rate",
              "col_rate",
              "machine_refuse_rate",
              "rollover_rate",
              "machine_pass_rate",
            ]);

            const tHeader = [
              this.$t("dataReport.tableHead.date"),
              this.$t("dataReport.tableHead.active_num"),
              this.$t("dataReport.tableHead.register_num"),
              this.$t("dataReport.tableHead.apply_num"),
              this.$t("dataReport.tableHead.jinjian_rate"),
              // this.$t("dataReport.tableHead.qz_refuse_num"),
              // this.$t("dataReport.tableHead.qz_refuse_rate"),
              // this.$t("dataReport.tableHead.machine_all_num"),
              this.$t("dataReport.tableHead.machine_refuse_num"),
              this.$t("dataReport.tableHead.machine_pass_num"),
              this.$t("dataReport.tableHead.machine_pass_rate"),

              // this.$t("dataReport.tableHead.machine_refuse_rate"),
              this.$t("dataReport.tableHead.people_all_num"),
              this.$t("dataReport.tableHead.people_refuse_num"),
              this.$t("dataReport.tableHead.people_pass_num"),
              this.$t("dataReport.tableHead.people_refuse_rate"),
              this.$t("dataReport.tableHead.approve_all_num"),
              this.$t("dataReport.tableHead.approve_pass_rate"),
              this.$t("dataReport.tableHead.lenders_order_num"),
              this.$t("dataReport.tableHead.loan_pass_rate"),
              this.$t("dataReport.tableHead.lenders_amount"),
              this.$t("dataReport.tableHead.loan_actual_amount"),
              // this.$t("dataReport.tableHead.rollover_num"),
              // this.$t("dataReport.tableHead.rollover_amount")
            ];
            const filterVal = [
              "day",
              "active_num",
              "register_num",
              "apply_num",
              "jinjian_rate",
              // "qz_refuse_num",
              // "qz_refuse_rate",
              // "machine_all_num",
              "machine_refuse_num",
              "machine_pass_num",
              "machine_pass_rate",
              // "machine_refuse_rate",
              "machine_pass_inrenshen_num",
              "people_refuse_num",
              "people_pass_num",
              "people_refuse_rate",
              "approve_all_num",
              "approve_pass_rate",
              "lenders_order_num",
              "loan_pass_rate",
              "lenders_amount",
              "loan_actual_amount",
              // "rollover_num",
              // "rollover_amount"
            ];

            const list = tableData.reverse();
            const data = this.formatJson(filterVal, list);

            export_json_to_excel({
              header: tHeader,
              data,
              filename: this.$t("dataReport.tableHead.derivedaily")
            });
            this.$Message.success(
              this.$t("dataReport.tableHead.Successfulexport")
            );
          }
        } else {
          this.$Message.info(this.$t("dataReport.tableHead.noMatching"));
        }
      });
    }

    _getDailyData() {
      const data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        loanType: this.searchForm.loanType,
        channel: this.searchForm.channelSources,
        productId: String(this.searchForm.producType),
        page: this.searchForm.page
      };
      var start = new Date(this.searchForm.timeFrame[0]).getTime();
      var end = new Date(this.searchForm.timeFrame[1]).getTime();
      if ((end - start) > 604800000) {
        this.$Message.warning(this.$t('oversevenDays'));
        return;
      }

      this.loading = true;
      getDailyData(data, (res: any) => {
        this.loading = false;
        if (+res.code === 0) {
          let tableData = [];
          if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
            for (let k in res.data.data) {
              tableData.push(res.data.data[k]);
            }
          } else {
            tableData = res.data.data;
          }
          this.tableColumns = this.tableDefine1;
          this.producSelect = res.data.producSelect
          var myDate = new Date();

          if (tableData[tableData.length - 1].day == this.formatDayTime(myDate)) {
            tableData[tableData.length - 1].day =
              tableData[tableData.length - 1].day + this.$t('Previoushour');
          }
          getRatlist(tableData, [
            "jinjian_rate",
            "qz_refuse_rate",
            "people_refuse_rate",
            "approve_pass_rate",
            "loan_pass_rate",
            "col_rate",
            "machine_refuse_rate",
            "rollover_rate",
            "machine_pass_rate",
          ]);

          this.tableData = tableData.reverse() || [];

          this.total = Number(res.data.arrPager.count);
          this.pageCount = Number(res.data.arrPager.count);
          this.pageSize = +res.data.arrPager.pageSize;
          this.searchForm.page = +res.data.arrPager.page;

          this.showTable = true;
        } else {
          this.showTable = false;
        }
      });
    }
    _getDailyNowdata() {
      this.loading = true;
      getDailyNowdata(this.searchForm, (res: any) => {
        this.loading = false;
        if (+res.code === 0) {
          let tableData = [];
          if (
            res.data.nowData instanceof Object &&
            !Array.isArray(res.data.nowData)
          ) {
            for (let k in res.data.nowData) {
              tableData.push(res.data.nowData[k]);
            }
          } else {
            tableData = res.data.nowData;
            this.total = Number(res.data.arrPager.count);
            this.pageCount = Number(res.data.arrPager.count);
            this.pageSize = +res.data.arrPager.pageSize;
          }
          this.tableColumns = this.tableDefine2;
          this.tableData = tableData || [];
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      });
    }
    handlePage(pageIndex: number) {
      this.searchForm.page = pageIndex || 1;
      this._getDailyData();
    }
    created() {
      getchannel({}, (res: any) => {
        let tableData = [];
        if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
          for (let k in res.data.data) {
            tableData.push(res.data.data[k]);
          }
        } else {
          tableData = res.data.data;
        }
        this.channel = tableData;
      });
      this._getDailyData();
    }
  }
</script>
