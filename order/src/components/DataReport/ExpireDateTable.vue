<!-- zys -->
<template>
  <div class="ExpireDateTable">
    <Tabs v-model="searchForm.tab" @on-click="changeTab">
      <TabPane v-for="(t,index) in tabLists" :key="index" :label="t.name" :name="t.key">
        <div class="search-wrap">
          <Form inline :label-width="80" :model="searchForm">
            <div class="search-group-wrap">
              <div class="search-group">
                <FormItem :label="$t('dataReport.search.expireDate')">
                  <DatePicker v-model="searchForm.timeFrame" type="daterange"
                    :placeholder="$t('selectPrefix')+$t('dataReport.search.date')" format="yyyy-MM-dd"
                    ></DatePicker>
                </FormItem>
                <FormItem :label="$t('dataReport.search.loanTerm')">
                  <Select clearable v-model="searchForm.loanPeriod">
                    <Option v-for="(item, key) in loanTerms" :key="key" :value="key">
                      {{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem :label="$t('dataReport.search.loanType')" >
                  <Select v-model="searchForm.loanType" :disabled="disLoanType">
                    <Option v-for="(item, index) in newloanTypes" :key="index" :value="index">
                      {{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem :label="$t('dataReport.search.channelSou')">
                  <Select v-model="searchForm.channelSources">
                    <Option v-for="(item, index) in channelSources" :key="index" :value="index"
                      @click.native="chioce(item)">{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem :label="$t('dataReport.search.Maturity')">
                  <Select v-model="searchForm.Maturitys">
                    <Option v-for="(item, index) in $t('dataReport.search.Maturitys')" :key="index" :value="item.key">
                      {{item.value}}</Option>
                  </Select>
                </FormItem>
                 <!-- <FormItem :label="$t('dataReport.search.newLoanType')">
                  <Select v-model="searchForm.newLoanType" :disabled="disnewLoanType">
                    <Option v-for="(item, index) in $t('dataReport.search.newLoanTypes')" :key="index" :value="index">
                      {{item.value}}</Option>
                  </Select>
                </FormItem> -->
                <FormItem class="fix-form-btn" :label-width="100">
                  <Button type="primary" slot="label" :loading="loading"
                    @click="handlePage(t.key)">{{$t('search')}}</Button>
                </FormItem>
                <Button type="success" slot="label" icon="ios-download-outline" :loading="exploading"
                  @click="excelHandlePage(t.key)">{{$t('exportExcel')}}</Button>

              </div>
            </div>
          </Form>
        </div>

        <Table border  :data="tableData" :columns="tableDefine" :loading="loading">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
            <div>Loading</div>
          </Spin>
        </Table>

      </TabPane>

    </Tabs>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Watch
  } from "vue-property-decorator";
  import {
    ApiExpireDateData,
    getchannel,
    Duetodiameterexcel
  } from "@/api/dataReport";
  import {
    Getter,
    Action
  } from "vuex-class";

  import {
    export_json_to_excel
  } from "@/vendor/Export2Excel";
  @Component
  export default class MoneyData extends Vue {
    @Getter("selectItems") selectItems: any;
    @Action("getSelectList") getSelectList: any;
    @Watch('searchForm', { immediate: true, deep: true })
    onSearchFormChanged(val: any, oldVal: any) {
    console.log(val, oldVal);
    if(val.newLoanType==1){
      this.searchForm.Maturitys ="normal"
      this.searchForm.loanType =1
    }
    if(val.newLoanType==2){
      this.searchForm.Maturitys = "rollover";
      this.searchForm.loanType =2
    }
    // if (val.loanType ==0) {
    //   this.disnewLoanType  = false
    // }else{
    //   this.disnewLoanType  = true
    // }
    // if(val.newLoanType ==0){
    //   this.disLoanType = false
    // }else{
    //   this.disLoanType = true
    // }
  }

    tabLists = [{
        key: '1',
        name: this.$t("dataReport.phaseOne"),
      },
      {
        key: '2',
        name: this.$t("dataReport.phaseTwo"),
      },
    ]
    searchForm = {
      tab: '1',
      timeFrame: [],
      loanPeriod: "0",
      loanType: 0,
      newLoanType:0,
      channelSources: 0,
      page: 1,
      Maturitys: "0"
    };
    channel = [];
    item = "";
    get channelSources() {
      return this.channel || [];
    }
    get loanTerms() {
      return this.selectItems.application_term_list || [];
    }
    get loanTypes() {
      return this.selectItems.loan_type_list || [];
    }
    get newloanTypes() {
      return this.selectItems.loan_type_multi_list || [];
    }
    loading = false;
    exploading = false;
    showTable = false;
    searchLoading = false;
    disnewLoanType=false;
    disLoanType = false;
    total = 0;
    pageCount = 0;
    pageSize = 10;
    tableData = [];
    tabName = '1';
    tableDefine = [];
    tableDefine1 = [{
        title: this.$t("dataReport.tableHead.expireDate"),
        align: "center",
        key: "day",
        width: 130,
        fixed: "left"
      },
      {
        title: this.$t("dataReport.tableHead.allOrderNum"),
        align: "center",
        key: "allOrderNum",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.advanceRepaymentNum"),
        align: "center",
        key: "advanceRepaymentNum",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.advanceRepaymentRate"),
        align: "center",
        key: "advanceRepaymentRate",
        width: 130
      },

      {
        title: this.$t("dataReport.tableHead.rolloverNum"),
        align: "center",
        key: "rolloverNum",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.rolloverRate"),
        align: "center",
        key: "rolloverRate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.oneRepaymentNum"),
        align: "center",
        key: "oneRepaymentNum",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.oneRepaymentRate"),
        align: "center",
        key: "oneRepaymentRate",
        width: 130
      },
       {
        title: this.$t("dataReport.tableHead.h3Before"),
        align: "center",
        key: "h3Before",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.h3BeforeRate"),
        align: "center",
        key: "h3BeforeRate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.h1AndH3"),
        align: "center",
        key: "h1AndH3",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.h1AndH3Rate"),
        align: "center",
        key: "h1AndH3Rate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.h0"),
        align: "center",
        key: "h0",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.h0Rate"),
        align: "center",
        key: "h0Rate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.penagihanNum"),
        align: "center",
        key: "penagihanNum",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.penagihanRate"),
        align: "center",
        key: "penagihanRate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.s1AndS3"),
        align: "center",
        key: "s1AndS3",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.s1AndS3Rate"),
        align: "center",
        key: "s1AndS3Rate",
        width: 130
      },
       {
        title: this.$t("dataReport.tableHead.s3After"),
        align: "center",
        key: "s3",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.s3AfterRate"),
        align: "center",
        key: "s3Rate",
        width: 130
      },
       {
        title: this.$t("dataReport.tableHead.allRecycle"),
        align: "center",
        key: "allRecycle",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.allRecycleRate"),
        align: "center",
        key: "allRecycleRate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.inCuiShouNum"),
        align: "center",
        key: "inCuiShouNum",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.inCuiShouRate"),
        align: "center",
        key: "inCuiShouRate",
        width: 130
      }
    ];
    tableDefine2 = [{
        title: this.$t("dataReport.tableHead.expireDate"),
        align: "center",
        key: "day",
        width: 140,
        fixed: "left"
      },
      {
        title: this.$t("dataReport.tableHead.allOrderNum"),
        align: "center",
        key: "allOrderNum",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.h3Before"),
        align: "center",
        key: "h3Before",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.h3BeforeRate"),
        align: "center",
        key: "h3BeforeRate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.h1AndH3"),
        align: "center",
        key: "h1AndH3",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.h1AndH3Rate"),
        align: "center",
        key: "h1AndH3Rate",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.h0"),
        align: "center",
        key: "h0",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.h0Rate"),
        align: "center",
        key: "h0Rate",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.penagihanNum"),
        align: "center",
        key: "penagihanNum",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.penagihanRate"),
        align: "center",
        key: "penagihanRate",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.s1AndS3"),
        align: "center",
        key: "s1AndS3",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.s1AndS3Rate"),
        align: "center",
        key: "s1AndS3Rate",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.s3After"),
        align: "center",
        key: "s3",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.s3AfterRate"),
        align: "center",
        key: "s3Rate",
        width: 130
      },
       {
        title: this.$t("dataReport.tableHead.allRecycle"),
        align: "center",
        key: "allRecycle",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.allRecycleRate"),
        align: "center",
        key: "allRecycleRate",
        width: 130
      },
      {
        title: this.$t("dataReport.tableHead.inCuiShouNum"),
        align: "center",
        key: "inCuiShouNum",
        width: 140
      },
      {
        title: this.$t("dataReport.tableHead.inCuiShouRate"),
        align: "center",
        key: "inCuiShouRate",
        width: 140
      }
    ];
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

    changeTab(name) {
      this.tabName = name;
      name == '1' ? this.tableDefine = this.tableDefine1 : this.tableDefine = this.tableDefine2;
      this.getTableData()

    }
    chioce(item: any) {
      this.item = item;
    }
    getTableData() {
       this.tableData=[];
      const Thatday = this.formatDayTime(new Date());
      const weekago = this.formatDayTime(+new Date() - 604800000);
      const data = {
        beginTime: this.beginTime == "" ? weekago : this.beginTime,
        endTime: this.endTime == "" ? Thatday : this.endTime,
        loanTerm: this.searchForm.loanPeriod,
        channel: this.searchForm.channelSources,
        loanType: this.searchForm.loanType,
        periodNo: this.searchForm.tab,
        source: this.item == "all" || this.item == 'Semua' ? "" : this.item,
        expire_type: this.searchForm.Maturitys == "0" ? "" : this.searchForm.Maturitys
      };
      let shiji = this.searchForm.timeFrame[1] - this.searchForm.timeFrame[0];
      if (shiji > 604800000) {
        this.$Message.warning(this.$t('oversevenDays'));
        return;
      }
      this.loading = true;
      ApiExpireDateData(data, (res: any) => {
        this.loading = false;
        if (+res.code === 0) {
          let tableData = [];
          if (res.data instanceof Object && !Array.isArray(res.data)) {
            for (let k in res.data) {
              res.data[k].allRecycle =Number(res.data[k].h3Before) + Number(res.data[k].h1AndH3) +Number(res.data[k].h0)
                +Number(res.data[k].s1AndS3) + Number(res.data[k].s3);
              res.data[k].allRecycleRate = (100*res.data[k].allRecycle /res.data[k].allOrderNum).toFixed(2)+'%';
              tableData.push(res.data[k]);
            }
          } else {
            tableData = res.data.data;
          }
          try {
          this.tableData = tableData.reverse();
          console.log(this.tableData)
          } catch (error) {
            
          }
        }
      });
    }
    handlePage(pageIndex: number) {
      this.searchForm.page = pageIndex || 1;
      this.getTableData();
    }
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
    excelHandlePage() {
      const Thatday = this.formatDayTime(new Date());
      const weekago = this.formatDayTime(+new Date() - 604800000);
      let data = {
        beginTime: this.beginTime == "" ? weekago : this.beginTime,
        endTime: this.endTime == "" ? Thatday : this.endTime,
        loanTerm: this.searchForm.loanPeriod,
        channel: this.searchForm.channelSources,
        loanType: this.searchForm.loanType,
        periodNo: this.searchForm.tab,
        export: 1,
        source: this.item == "all" || this.item == 'Semua' ? "" : this.item,
        expire_type: this.searchForm.Maturitys == "0" ? "" : this.searchForm.Maturitys
      };
      let shiji = this.searchForm.timeFrame[1] - this.searchForm.timeFrame[0];
      if (shiji > 2592000000) {
        this.$Message.warning(this.$t('overOneMonth'));
        return;
      }
      this.exploading = true;
      ApiExpireDateData(data, res => {
        if (+res.code == 0) {
          this.exploading = false;
          if (res.data.length === 0) {
            this.$Message.info(this.$t("dataReport.tableHead.noMatching"));
          } else {
            if (this.tabName == '1') {
              let tHeader = [
                this.$t("dataReport.tableHead.expireDate"),
                this.$t("dataReport.tableHead.allOrderNum"),
                this.$t("dataReport.tableHead.advanceRepaymentNum"),
                this.$t("dataReport.tableHead.advanceRepaymentRate"),
                this.$t("dataReport.tableHead.rolloverNum"),
                this.$t("dataReport.tableHead.rolloverRate"),
                this.$t("dataReport.tableHead.oneRepaymentNum"),
                this.$t("dataReport.tableHead.oneRepaymentRate"),
                this.$t("dataReport.tableHead.h3Before"),
                this.$t("dataReport.tableHead.h3BeforeRate"),
                this.$t("dataReport.tableHead.h1AndH3"),
                this.$t("dataReport.tableHead.h1AndH3Rate"),
                this.$t("dataReport.tableHead.h0"),
                this.$t("dataReport.tableHead.h0Rate"),
                this.$t("dataReport.tableHead.penagihanNum"),
                this.$t("dataReport.tableHead.penagihanRate"),
                this.$t("dataReport.tableHead.s1AndS3"),
                this.$t("dataReport.tableHead.s1AndS3Rate"),
                this.$t("dataReport.tableHead.s3After"),
                this.$t("dataReport.tableHead.s3AfterRate"),
                this.$t("dataReport.tableHead.allRecycle"),
                this.$t("dataReport.tableHead.allRecycleRate"),
                this.$t("dataReport.tableHead.inCuiShouNum"),
                this.$t("dataReport.tableHead.inCuiShouRate")
              ];

              let filterVal = [
                "day",
                "allOrderNum",
                "advanceRepaymentNum",
                "advanceRepaymentRate",
                "rolloverNum",
                "rolloverRate",
                "oneRepaymentNum",
                "oneRepaymentRate",
                "h3Before",
                "h3BeforeRate",
                "h1AndH3",
                "h1AndH3Rate",
                "h0",
                "h0Rate",
                "penagihanNum",
                "penagihanRate",
                "s1AndS3",
                "s1AndS3Rate",
                "s3",
                "s3Rate",
                "allRecycle",
                "allRecycleRate",
                "inCuiShouNum",
                "inCuiShouRate"
              ];
              let tableData = [];
              if (res.data instanceof Object && !Array.isArray(res.data)) {
                for (let k in res.data) {
                   res.data[k].allRecycle =Number(res.data[k].h3Before) + Number(res.data[k].h1AndH3) +Number(res.data[k].h0)
                +Number(res.data[k].s1AndS3) + Number(res.data[k].s3);
                res.data[k].allRecycleRate = (100*res.data[k].allRecycle /res.data[k].allOrderNum).toFixed(2)+'%';
                  tableData.push(res.data[k]);
                  
                }
              } else {
                tableData = res.data.data;
              }


              const data = this.formatJson(filterVal, tableData.reverse());
              export_json_to_excel({
                header: tHeader,
                data,
                filename: "Expiration Date Caliber Table (Phase 1)"
              });
              this.$Message.success(this.$t('dataReport.tableHead.Successfulexport'));
            } else {
              let tHeader = [
                this.$t("dataReport.tableHead.expireDate"),
                this.$t("dataReport.tableHead.allOrderNum"),
                this.$t("dataReport.tableHead.h3Before"),
                this.$t("dataReport.tableHead.h3BeforeRate"),
                this.$t("dataReport.tableHead.h1AndH3"),
                this.$t("dataReport.tableHead.h1AndH3Rate"),
                this.$t("dataReport.tableHead.h0"),
                this.$t("dataReport.tableHead.h0Rate"),
                this.$t("dataReport.tableHead.penagihanNum"),
                this.$t("dataReport.tableHead.penagihanRate"),
                this.$t("dataReport.tableHead.s1AndS3"),
                this.$t("dataReport.tableHead.s1AndS3Rate"),
                this.$t("dataReport.tableHead.s3After"),
                this.$t("dataReport.tableHead.s3AfterRate"),
                this.$t("dataReport.tableHead.allRecycle"),
                this.$t("dataReport.tableHead.allRecycleRate"),
                this.$t("dataReport.tableHead.inCuiShouNum"),
                this.$t("dataReport.tableHead.inCuiShouRate")
              ];

              let filterVal = [
                "day",
                "allOrderNum",
                "h3Before",
                "h3BeforeRate",
                "h1AndH3",
                "h1AndH3Rate",
                "h0",
                "h0Rate",
                "penagihanNum",
                "penagihanRate",
                "s1AndS3",
                "s1AndS3Rate",
                "s3",
                "s3Rate",
                "allRecycle",
                "allRecycleRate",
                "inCuiShouNum",
                "inCuiShouRate"
              ];
              let tableData = [];
              if (res.data instanceof Object && !Array.isArray(res.data)) {
                for (let k in res.data) {
                    res.data[k].allRecycle =Number(res.data[k].h3Before) + Number(res.data[k].h1AndH3) +Number(res.data[k].h0)
                +Number(res.data[k].s1AndS3) + Number(res.data[k].s3);
                res.data[k].allRecycleRate = (100*res.data[k].allRecycle /res.data[k].allOrderNum).toFixed(2)+'%';
                  tableData.push(res.data[k]);
                }
              } else {
                tableData = res.data.data;
              }

              const data = this.formatJson(filterVal, tableData.reverse());
              export_json_to_excel({
                header: tHeader,
                data,
               filename: "Expiration Date Caliber Table (Phase 1)"
              });
              this.$Message.success(this.$t('dataReport.tableHead.Successfulexport'));
            }


          }
        } else {
          this.$Message.info(this.$t('dataReport.tableHead.noMatching'));
        }
      });
    }
    created() {
      this.tableDefine = this.tableDefine1;
      getchannel({}, (res: any) => {
        let tableData = [];
        if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
          for (let k in res.data.data) {
            tableData.push(res.data.data[k]);
          }
        } else {
          tableData = res.data.data;
        }
        tableData.splice(0, 0, this.$t("dataReport.search.complete"));
        this.channel = tableData;
      });

      this.getTableData();
    }
  }
</script>
<style lang='less' scoped>

</style>
