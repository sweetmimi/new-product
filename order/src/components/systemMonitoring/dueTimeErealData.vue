<!-- zys -->
<template>
  <div>
    <Tabs type="card" @on-click="clickTabPane">
      <TabPane :label="$t('dataReport.search.numberChart')" name="1">

        <div class="mychart">
          <div class="search-wrap">
            <Form inline :label-width="80" :model="searchForm">
              <div class="search-group-wrap">
                <div class="search-group">

                  <FormItem :label="$t('dataReport.search.date')">
                    <DatePicker v-model="searchForm.timeRange" :options="timeLimitConfig" type="daterange"
                      :placeholder="$t('dateTime')" format="yyyy-MM-dd"></DatePicker>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.phases')" >
                    <Select v-model="searchForm.periodNo">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                    </Select>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.loanType')">
                    <Select v-model="searchForm.loanType" @on-change="changeLoanType">
                      <Option v-for="(item, index) in $t(
                          'dataReport.search.loanTypes'
                        )" :key="index" :value="index">{{ item.value }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.Maturity')">
                    <Select v-model="searchForm.expireType">
                      <Option v-for="(item, index) in $t(
                          'dataReport.search.Maturitys'
                        )" :key="index" :value="item.key">{{ item.value }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.channelSource')">
                    <Select v-model="searchForm.source" clearable>
                      <Option v-for="(item, index) in channelSources" :key="index" :value="item">
                        {{item}}</Option>
                    </Select>
                  </FormItem>


                  <FormItem class="fix-form-btn">
                    <Button type="primary" slot="label" :loading="loading"
                      @click="getTableData('1')">{{ $t("search") }}</Button>
                  </FormItem>
                </div>
              </div>
            </Form>
          </div>
          <Row>
              <div id="main" ref="numberChart" style=" height: 550px; padding-top: 40px;"></div>

            
          </Row>
        </div>
      </TabPane>

      <TabPane :label="$t('dataReport.search.numberTable')" name="2">
        <div class="mytable">
          <div class="search-wrap">
            <Form inline :label-width="80" :model="searchForm">
              <div class="search-group-wrap">
                <div class="search-group">

                  <FormItem :label="$t('dataReport.search.date')">
                    <DatePicker v-model="searchForm.timeFrame" :options="timeLimitConfig" type="date"
                      :placeholder="$t('dateTime')" format="yyyy-MM-dd"></DatePicker>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.phases')" >
                    <Select v-model="searchForm.periodNo">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                    </Select>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.loanType')">
                    <Select v-model="searchForm.loanType" @on-change="changeLoanType">
                      <Option v-for="(item, index) in $t(
                          'dataReport.search.loanTypes'
                        )" :key="index" :value="index">{{ item.value }}</Option>
                    </Select>
                  </FormItem>

                  <FormItem :label="$t('dataReport.search.Maturity')">
                    <Select v-model="searchForm.expireType">
                      <Option v-for="(item, index) in $t(
                          'dataReport.search.Maturitys'
                        )" :key="index" :value="item.key">{{ item.value }}</Option>
                    </Select>
                  </FormItem>

                  <FormItem class="fix-form-btn">
                    <Button type="primary" slot="label" :loading="loading"
                      @click="getTableData('2')">{{ $t("search") }}</Button>
                  </FormItem>
                </div>
              </div>
            </Form>
          </div>
          <Alert>{{$t('dataReport.search.shouldrecycleNumber')}} {{ mytotal }}</Alert>

          <Table border class="list-table" :data="numberTableData" :columns="numberTableDefine" :loading="loading">
            <Spin slot="loading" fix class="m-loading">
              <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
              <div>Loading</div>
            </Spin>
          </Table>

        </div>
      </TabPane>
      <TabPane :label="$t('dataReport.search.amountChart')" name="3">

        <div class="mychart">
          <div class="search-wrap">
            <Form inline :label-width="80" :model="searchForm">
              <div class="search-group-wrap">
                <div class="search-group">

                  <FormItem :label="$t('dataReport.search.date')">
                    <DatePicker v-model="searchForm.timeRange" :options="timeLimitConfig" type="daterange"
                      :placeholder="$t('dateTime')" format="yyyy-MM-dd"></DatePicker>
                  </FormItem>
                   <FormItem :label="$t('dataReport.search.phases')" >
                    <Select v-model="searchForm.periodNo">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                    </Select>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.loanType')">
                    <Select v-model="searchForm.loanType" @on-change="changeLoanType">
                      <Option v-for="(item, index) in $t(
                          'dataReport.search.loanTypes'
                        )" :key="index" :value="index">{{ item.value }}</Option>
                    </Select>
                  </FormItem>

                  <FormItem :label="$t('dataReport.search.Maturity')">
                    <Select v-model="searchForm.expireType">
                      <Option v-for="(item, index) in $t(
                          'dataReport.search.Maturitys'
                        )" :key="index" :value="item.key">{{ item.value }}</Option>
                    </Select>
                  </FormItem>


                  <FormItem class="fix-form-btn">
                    <Button type="primary" slot="label" :loading="loading"
                      @click="getTableData('3')">{{ $t("search") }}</Button>
                  </FormItem>
                </div>
              </div>
            </Form>
          </div>
          <Row>
            <div id="main" ref="moneyChart" style="height: 550px; padding-top: 40px;"></div>
          </Row>
        </div>
      </TabPane>

      <TabPane :label="$t('dataReport.search.amountTable')" name="4">
        <div class="mytable">
          <div class="search-wrap">
            <Form inline :label-width="80" :model="searchForm">
              <div class="search-group-wrap">
                <div class="search-group">

                  <FormItem :label="$t('dataReport.search.date')">
                    <DatePicker v-model="searchForm.timeFrame" :options="timeLimitConfig" type="date"
                      :placeholder="$t('dateTime')" format="yyyy-MM-dd"></DatePicker>
                  </FormItem>
                   <FormItem :label="$t('dataReport.search.phases')" >
                    <Select v-model="searchForm.periodNo">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                    </Select>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.loanType')">
                    <Select v-model="searchForm.loanType" @on-change="changeLoanType">
                      <Option v-for="(item, index) in $t(
                          'dataReport.search.loanTypes'
                        )" :key="index" :value="index">{{ item.value }}</Option>
                    </Select>
                  </FormItem>

                  <FormItem :label="$t('dataReport.search.Maturity')">
                    <Select v-model="searchForm.expireType">
                      <Option v-for="(item, index) in $t(
                          'dataReport.search.Maturitys'
                        )" :key="index" :value="item.key">{{ item.value }}</Option>
                    </Select>
                  </FormItem>

                  <FormItem class="fix-form-btn">
                    <Button type="primary" slot="label" :loading="loading"
                      @click="getTableData('4')">{{ $t("search") }}</Button>
                  </FormItem>
                </div>
              </div>
            </Form>
          </div>
          <Alert>{{$t('dataReport.search.shouldrecycleamount')}} {{ mytotal }}</Alert>

          <Table border class="list-table" :data="moneyTableData" :columns="moneyTableDefine" :loading="loading">
            <Spin slot="loading" fix class="m-loading">
              <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
              <div>Loading</div>
            </Spin>
          </Table>

        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {
    h0Amount,
    duetimerealrangedata
  } from "@/api/dataReport";
  import {
    getSelectItems
  } from "@/api/select";
  import {
    getchannel
  } from "@/api/dataReport";
  export default {
    name: "",
    components: {},

    data() {
      return {
        role: false,
        show: false,
        loading: false,
        total: 0,
        pageSize: 10,
        pageCount: "",
        numberTableData: [],
        moneyTableData: [],
        mytotal: "",
        channelSources: [],
        searchForm: {
          periodNo: "1",
          loanType: 0,
          expireType: "0",
          timeFrame: "",
          timeRange: "",
          page: "",
          source: "",
        },
        numberTableDefine: [{
            title: this.$t('dataReport.search.date'),
            key: "realTime",
            align: "center",
          },
          {
            title: this.$t('dataReport.search.currentRepayNumber'),
            key: "huishoucount",
            align: "center",
          },
          {
            title: this.$t('dataReport.search.nowRate'),
            key: "rate",
            align: "center",
          },
        ],
        moneyTableDefine: [{
            title: this.$t('dataReport.search.date'),
            key: "realTime",
            align: "center",
          },
          {
            title: this.$t('dataReport.search.currentRepayAmount'),
            key: "currentRepayAmount",
            align: "center",
          },
          {
            title: this.$t('dataReport.search.nowRate'),
            key: "rate",
            align: "center",
          },
        ],

        timeLimitConfig: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          },
        },
        option: {
          width:'auto',
          height:'auto',
          title: {
             text: this.$t('dataReport.search.h0recycleData'),
            subtext: this.$t('dataReport.search.oneHoursbeforeData'),
            textStyle:{
              fontSize: 12,
            },
            subtextStyle: {
              color: "red",
              fontSize: 10,
            },
           textAlign:'left',
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              var result = params[0].name + "<br>";
              params.forEach(function (item) {
                if (item.value) {
                  result +=
                    item.marker +
                    " " +
                    item.seriesName +
                    " : " +
                    item.value +
                    "%</br>";
                } else {
                  result += item.marker + " " + item.seriesName + " :  - </br>";
                }
              });
              return result;
            },
          },
          legend: {
            icon: "circle",
            textStyle: {
              fontSize: 8,
            },
            data: [],
          },
          grid: {
            left: "6%",
            right: "6%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            name: this.$t('dataReport.search.IndonesiaTime'),
            nameTextStyle: {
              fontSize: 10,
              color: "red",
              margin:5,
            },
            type: "category",
            boundaryGap: false,
            data: [
              "0:00",
              "1:00",
              "2:00",
              "3:00",
              "4:00",
              "5:00",
              "6:00",
              "7:00",
              "8:00",
              "9:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
            ],
          },
          yAxis: {
            type: "value",
            max: 100,
            min: 0,
            splitNumber: 10,
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: "{value}%",
            },
          },
          series: [],
        },
      };
    },
     created() {
      this.getsource();

    },
    computed: {
      dueTime() {
        return this.formatDayTime(this.searchForm.timeFrame);
      },

      beginTime() {
        return this.formatDayTime(this.searchForm.timeRange[0]);
      },

      endTime() {
        return this.formatDayTime(this.searchForm.timeRange[1]);
      },
    },
  
    mounted() {
      
      this.getTableData("1");

    },
    methods: {

      getsource() {
        getchannel({}, (res) => {
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
      },
      formatDayTime(val) {
        if (val) {
          const date = new Date(val);
          const Y = date.getFullYear();
          let M = date.getMonth() + 1;
          let D = date.getDate();
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
      },

      changeLoanType() {
        if (this.searchForm.loanType == 1) {
          this.searchForm.expireType = "normal";
        } else {
          this.searchForm.expireType = "0";
        }
      },
      clickTabPane(name) {
        this.getTableData(name)
      },
      getTableData(type) {
        if (type == "1") {
          this.myNumberEcharts();
        }
        if (type == "2") {
          this.loading = true;
          this.numberTableData = [];
          this.mytotal = "";
          duetimerealrangedata({
              source: this.searchForm.source,
              periodNo: this.searchForm.periodNo,
              beginTime: this.dueTime,
              endTime: this.dueTime,
              loanType: this.searchForm.loanType,
              expireType: this.searchForm.expireType,
            },
            (res) => {
              if (res.code == 0) {
                this.loading = false;
                let numberTableData = [];
                for (let k in res.data.rangeData) {
                  numberTableData.push(res.data.rangeData[k]);
                  this.mytotal = res.data.rangeData[k][0].total;
                }
                //console.log(numberTableData)
                if (numberTableData[0]) {
                  this.numberTableData = numberTableData[0].reverse();
                }
              } else {
                this.loading = false;
                this.$message.error(res.msg);
              }
            }
          );
        }
        if (type == "3") {
          this.myMoneyEcharts();
        }
        if (type == "4") {
          this.loading = true;
          this.moneyTableData = [];
          this.mytotal = "";
          h0Amount({
              source: this.searchForm.source,
              periodNo: this.searchForm.periodNo,
              beginTime: this.dueTime,
              endTime: this.dueTime,
              loanType: this.searchForm.loanType,
              expireType: this.searchForm.expireType,
            },
            (res) => {
              if (res.code == 0) {
                this.loading = false;
                let moneyTableData = [];
                for (let k in res.data.rangeData) {
                  moneyTableData.push(res.data.rangeData[k]);
                  this.mytotal = res.data.rangeData[k][0].total;
                }
                //  console.log(moneyTableData)
                if (moneyTableData[0]) {
                  this.moneyTableData = moneyTableData[0].reverse();
                }
              } else {
                this.loading = false;
                this.$message.error(res.msg);
              }
            }
          );
        }
      },
      handlePage(pageIndex) {
        this.searchForm.page = pageIndex || 1;
        this.getTableData();
      },

      myNumberEcharts() {


        this.loading = true;
        var main = this.$refs.numberChart;
        if (main) {
          var myChart = this.$echarts.init(main);
          window.addEventListener("resize", myChart.resize);
          this.option.series = [];
          myChart.setOption(this.option, true);
         
          duetimerealrangedata({
              loanType: this.searchForm.loanType,
              expireType: this.searchForm.expireType,
              beginTime: this.beginTime,
              endTime: this.endTime,
              source: this.searchForm.source,
              periodNo: this.searchForm.periodNo
            },
            (res) => {
              if (res.code == 0) {
                this.loading = false;
                this.option.legend.data = res.data.rangeTime;
                var oldData = res.data.rangeData;
                var chartsData = [];

                if (oldData instanceof Object && !Array.isArray(oldData)) {
                  for (var i in oldData) {
                    if (oldData[i] !== null) {
                      // console.log(oldData[i]);
                      var province = {};
                      province.data = [];
                      province.name = i;
                      province.type = "line";
                      province.smooth = true;
                      for (var v in oldData[i]) {
                        ///console.log(oldData[i][v].rate);
                        province.data.push(oldData[i][v].rate.replace("%", ""));
                      }
                      chartsData.push(province);
                      // console.log(province)
                    }
                  }
                } else {
                  chartsData = oldData;
                }

                this.option.series = chartsData;
                myChart.setOption(this.option, true);
                //
              } else {
                this.$Message.error(res.msg);
                this.option.series = "";
                this.loading = false;
              }
            }
          );
        }
      },

      myMoneyEcharts() {
        this.loading = true;
        var main = this.$refs.moneyChart;
        if (main) {
          var myChart = this.$echarts.init(main);
          window.addEventListener("resize", myChart.resize);
          this.option.series = [];
          // myChart.setOption(this.option, true);
          h0Amount({
              loanType: this.searchForm.loanType,
              expireType: this.searchForm.expireType,
              beginTime: this.beginTime,
              endTime: this.endTime,
              source: this.searchForm.source,
              periodNo: this.searchForm.periodNo

            },
            (res) => {
              if (res.code == 0) {
                this.loading = false;
                this.option.legend.data = res.data.rangeTime;
                var oldData = res.data.rangeData;
                var chartsData = [];

                if (oldData instanceof Object && !Array.isArray(oldData)) {
                  for (var i in oldData) {
                    if (oldData[i] !== null) {
                      // console.log(oldData[i]);
                      var province = {};
                      province.data = [];
                      province.name = i;
                      province.type = "line";
                      province.smooth = true;
                      for (var v in oldData[i]) {
                        ///console.log(oldData[i][v].rate);
                        province.data.push(oldData[i][v].rate.replace("%", ""));
                      }
                      chartsData.push(province);
                      // console.log(province)
                    }
                  }
                } else {
                  chartsData = oldData;
                }
                if (chartsData) {
                  this.option.series = chartsData.sort((a, b) => {
                    return b.name > a.name ? -1 : 1;
                  })
                }
                myChart.setOption(this.option, true);

              } else {
                this.$Message.error(res.msg);
                this.option.series = "";
                this.loading = false;
              }
            }
          );
        }
      },
    },
  };
</script>
<style lang='less' scoped>
  .Echarts {
    width: 70%;
    min-height: 500px;
    max-height: 600px;
  }
</style>
