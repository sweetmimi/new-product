<!-- zys -->
<template>
  <div>
    <Tabs type="card" @on-click="clickTabPane">
      <TabPane :label="$t('dataReport.search.nowDayError')" name="1">
        <div class="mytable">
          <div class="search-wrap">
            <Form inline :label-width="80" :model="searchForm">
              <div class="search-group-wrap">
                <div class="search-group">

                  <FormItem :label="$t('dataReport.search.date')">
                    <DatePicker
                      v-model="searchForm.timeFrame"
                      :options="timeLimitConfig"
                      type="date"
                      :placeholder="$t('dateTime')"
                      format="yyyy-MM-dd"
                    ></DatePicker>
                  </FormItem>

                  <FormItem :label="$t('dataReport.search.time')">
                    <TimePicker
                      @on-clear="clearTime"
                      v-model="searchForm.time"
                      format="HH:mm"
                      type="timerange"
                      placement="bottom-end"
                      :placeholder="$t('dataReport.search.time')"
                    ></TimePicker>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.loanType')">
                    <Select v-model="searchForm.loanType">
                      <Option
                        v-for="(item, index) in $t(
                          'dataReport.search.loanTypes'
                        )"
                        :key="index"
                        :value="index"
                        >{{ item.value }}</Option
                      >
                    </Select>
                  </FormItem>

                  <FormItem :label="$t('dataReport.search.version')">
                    <Select v-model="searchForm.version" clearable >
                      <Option
                        v-for="(item, index) in versionlist"
                        :key="index"
                        :value="item.version"
                        >{{ item.version }}</Option
                      >
                    </Select>
                  </FormItem>

                  <FormItem class="fix-form-btn">
                    <Button
                      type="primary"
                      slot="label"
                      :loading="loading"
                      @click="gettableData('1')"
                      >{{ $t("search") }}</Button
                    >
                  </FormItem>
                </div>
              </div>
            </Form>
          </div>

          <Table
            border
            class="list-table"
            :data="tableData"
            :columns="TableDefine"
            :loading="loading"
          >
            <Spin slot="loading" fix class="m-loading">
              <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
              <div>Loading</div>
            </Spin>
          </Table>
        </div>
      </TabPane>

      <TabPane :label="$t('dataReport.search.errorqushi')" name="2">

        <div class="mychart">
          <div class="search-wrap">
            <Form inline :label-width="80" :model="searchForm">
              <div class="search-group-wrap">
                <div class="search-group">

                  <FormItem :label="$t('dataReport.search.date')">
                    <DatePicker
                      v-model="searchForm.timeRange"
                      :options="timeLimitConfig"
                      type="daterange"
                      :placeholder="$t('dateTime')"
                      format="yyyy-MM-dd"
                    ></DatePicker>
                  </FormItem>
                  <FormItem :label="$t('dataReport.search.loanType')">
                    <Select v-model="searchForm.loanType">
                      <Option
                        v-for="(item, index) in $t(
                          'dataReport.search.loanTypes'
                        )"
                        :key="index"
                        :value="index"
                        >{{ item.value }}</Option
                      >
                    </Select>
                  </FormItem>

                 <FormItem :label="$t('dataReport.search.version')">
                    <Select v-model="searchForm.version" clearable >
                      <Option
                        v-for="(item, index) in versionlist"
                        :key="index"
                        :value="item.version"
                        >{{ item.version }}</Option
                      >
                    </Select>
                  </FormItem>

                  <FormItem class="fix-form-btn">
                    <Button
                      type="primary"
                      slot="label"
                      :loading="loading"
                      @click="gettableData('2')"
                      >{{ $t("search") }}</Button
                    >
                  </FormItem>
                </div>
              </div>
            </Form>
          </div>
          <Row>
            <div
              id="main"
              ref="numberChart"
              style="width: 90%; height: 550px; padding-top: 40px"
            ></div>
          </Row>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { apiErrcodeList ,apiErrcodeMap,apiVersionlist} from "@/api/dataReport";
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
      tableData: [],
      moneytableData: [],
      mytotal: "",
      versionlist:[],
      searchForm: {
        product_type: "",
        loanType: 0,
        version: "",
        timeFrame: new Date(),
        time: ["00:00", new Date()],
        page: "",
      },
      TableDefine: [
        {
          title: this.$t('dataReport.search.date') ,
          key: "days",
          align: "center",
        },
        {
          title: this.$t('dataReport.search.errorCode') ,
          key: "status",
          align: "center",
        },
        {
          title: this.$t('dataReport.search.miaoshu'),
          key: "desc",
          align: "center",
        },
        {
          title: this.$t('dataReport.search.errorCount'),
          key: "errTCount",
          align: "center",
          render: (h, params) => {
            if (params.row.errRate > 0) {
              return h("div", [
                h("span", params.row.errTCount),
                h("icon", {
                  props: {
                    type: "md-arrow-dropup",
                    size: "20",
                  },
                  style: {
                    color: "#d81e06",
                  },
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#d81e06",
                    },
                  },
                  params.row.errRate +"%"
                ),
              ]);
            } else {
              return h("div", [
                h("span", params.row.errTCount),
                h("icon", {
                  props: {
                    type: "md-arrow-dropdown",
                    size: "20",
                  },
                  style: {
                    color: "#07a35a",
                  },
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#07a35a",
                    },
                  },
                  params.row.errRate+"%"
                ),
              ]);
            }
          },
        },
        {
          title: this.$t('dataReport.search.userNum'),
          key: "uidTCount",
          align: "center",
          render: (h, params) => {
            if (params.row.uidRate > 0) {
              return h("div", [
                h("span", params.row.uidTCount),
                h("icon", {
                  props: {
                    type: "md-arrow-dropup",
                    size: "20",
                  },
                  style: {
                    color: "#d81e06",
                  },
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#d81e06",
                    },
                  },
                  params.row.uidRate +"%"
                ),
              ]);
            } else {
              return h("div", [
                h("span", params.row.uidTCount),
                h("icon", {
                  props: {
                    type: "md-arrow-dropdown",
                    size: "20",
                  },
                  style: {
                    color: "#07a35a",
                  },
                }),
                h(
                  "span",
                  {
                    style: {
                      color: "#07a35a",
                    },
                  },
                  params.row.uidRate +"%"
                ),
              ]);
            }
          },
        },
      ],

      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
      },
      option: {
        color: ["#37A2FF", "#FFBF00"],
        title: {
          text: this.$t('dataReport.search.UatasERR'),
          left: 10,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [this.$t('dataReport.search.errorCount'), this.$t('dataReport.search.yinxiang')],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          nameTextStyle: {
            fontSize: 15,
            color: "red",
          },
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [],
      },
    };
  },

  async created() {},

  computed: {
    dueTime() {
      return this.formatDayTime(this.searchForm.timeFrame);
    },


    beginTime() {
      return (
        this.formatDayTime(this.searchForm.timeFrame) +
        " " +
        this.searchForm.time[0]
      );
    },

    endTime() {
      return (
        this.formatDayTime(this.searchForm.timeFrame) +
        " " +
       this.searchForm.time[1]
      );
    },
    beginDay() {
      return this.formatDayTime(this.searchForm.timeRange[0]);
    },
    endDay() {
      return this.formatDayTime(this.searchForm.timeRange[1]);
    },
   
  },

  mounted() {
    this.gettableData("1");
    this.getversionlist()
  },

  methods: {

    clearTime(){
      this.searchForm.time=["00:00","23:59"]
    },

    getversionlist(){
      apiVersionlist({},res=>{
        this.versionlist = res.data;
      })
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


    clickTabPane(name) {
      this.gettableData(name);
    },

     sortErrRate(a,b){  
       return b.errRate-a.errRate  
    },

    gettableData(type) {
      if (type == "2") {
        console.log(type);
        this.myNumberEcharts();
      }
      if (type == "1") {
        this.loading = true;
        this.tableData = [];
        this.mytotal = "";
        apiErrcodeList(
          {
            version:this.searchForm.version,
            beginTime: this.beginTime,
            endTime: this.endTime,
            loanType: this.searchForm.loanType,
          },
          (res) => {
            if (res.code == 0) {
             
              this.loading = false;
               let tableData = [];
              if (
                res.data instanceof Object &&
                !Array.isArray(res.data)
              ) {
                for (let k in res.data) {
                  tableData.push(res.data[k]);
                }
              } else {
                tableData = res.data;
              }
              this.tableData = tableData.sort(this.sortErrRate);

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
      this.gettableData();
    },

    myNumberEcharts() {


      this.loading = true;
      var main = this.$refs.numberChart;
      if (main) {
        var myChart = this.$echarts.init(main);
        window.addEventListener("resize", myChart.resize);
        this.option.series = [];
        this.option.xAxis.data = [];
        apiErrcodeMap(
          {
            version:this.searchForm.version,
            loanType: this.searchForm.loanType,
            beginTime: this.beginDay,
            endTime: this.endDay,
          },
          (res) => {
            if (res.code == 0) {
              this.loading = false;
              var oldData = res.data;
              var errTCountList = [];
              var uidTCountList = [];
              oldData.forEach((item, index) => {
                this.option.xAxis.data.push(item.days);
                errTCountList.push(item.errCount);
                uidTCountList.push(item.uidCount);
              });
              var arr = [
                {
                  name: this.$t('dataReport.search.errorCount'),
                  type: "line",
                  data: errTCountList,
                  smooth: true,
                  label: {
                    normal: {
                      show: true,
                      position: "top",
                    },
                  },
                },
                {
                  name: this.$t('dataReport.search.yinxiang'),
                  type: "line",
                  data: uidTCountList,
                  smooth: true,
                  label: {
                    normal: {
                      show: true,
                      position: "bottom",
                    },
                  },
                },
              ];

              console.log(arr);
              this.option.series = arr;
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
