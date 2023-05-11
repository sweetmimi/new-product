

<template>
  <div class="hello">
    <Form inline :label-width="100" :model="searchForm">
      <FormItem :label="$t('dataReport.search.expireDate')">
        <DatePicker
          v-model="searchForm.timeFrame"
          type="daterange"
          :placeholder="$t('selectPrefix')+$t('dataReport.search.date')"
          style="width: 200px"
          format="yyyy-MM-dd"
          :options="timeLimitConfig"
        ></DatePicker>
      </FormItem>
      <FormItem :label="$t('dataReport.search.loanType')">
        <Select v-model="searchForm.loanType" style="width:200px">
          <Option
            v-for="(item, index) in $t('dataReport.search.loanTypes')"
            :key="index"
            :value="index"
          >{{item.value}}</Option>
        </Select>
      </FormItem>

      <FormItem :label="$t('dataReport.search.channelType')">
        <Select v-model="searchForm.channelSources" style="width:200px">
          <Option
            v-for="(item, index) in channelSources"
            :key="index"
            :value="index"
            @click.native="chioce(item)"
          >{{item}}</Option>
        </Select>
      </FormItem>

      <FormItem class="fix-form-btn" :label-width="100">
        <Button type="primary" slot="label" @click="handlePage()">{{$t('search')}}</Button>
      </FormItem>
    </Form>
    <div class="x-bar" id="XChart" style="height:600px;">
      <div :id="id" :option="option" style="height:600px;"></div>
    </div>
  </div>
</template>
 
<script>

// import XChart from "./comp.vue";
import { getExpireDateDataNumberData,getchannel } from "@/api/dataReport";
import HighCharts from "highcharts";
export default {
  data() {
    return {
      channelSources: [],
      optionDate: {

        expireDate: [],

        inCuiShouNum: [],

        inCuishouRate: [],

        inCurrentCuiShouNum: [],
        inCurrentCuiShouRate: [],

        dueTimeNum: []
      },

     
        channel : [],
        searchForm: {
        timeFrame: [],
        loanType: 0,
        channelSources: 0,
      },
      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      id: "charts",
      option: {
        chart: {
          zoomType: "xy"
        },
        title: {
          text: "Expiration date caliber", 
          style: {
            fontSize: "40px" 
          }
        },
        credits: {
          enabled: false
        },

        xAxis: [
          {
            categories: [],
            crosshair: true
          }
        ],

        yAxis: [
          {

            labels: {
              format: "{value}%",
              style: {
                color: "#000000"
              }
            },
            title: {
              text: "",
              style: {
                color: "#000000"
              }
            },
            plotLines: [
              {
                color: "red",
                dashStyle: "longdashdot",
                value: 30,
                width: 3
              }
            ]
          },
          {

            title: {
              text: "",
              style: {
                color: ""
              }
            },
            //          plotLines: [{
            //     color: 'red',
            //     dashStyle: 'solid',
            //     value: 30,
            //     width: 3
            // }],

            labels: {
              format: "{value} num ",
              style: {
                color: "#7CB5EC"
              }
            },
            opposite: true
          }
        ],

        tooltip: {
          shared: true
        },
        legend: {
          layout: "vertical",
          align: "left",
          x: 80,
          verticalAlign: "top",
          y: -15,
          floating: true,
          backgroundColor: "#FFFFFF"
        },
        series: [
          {
            name: "Expired pieces",
            type: "column",
            yAxis: 1,
            data: [],
            tooltip: {
              valueSuffix: "number of pieces"
            }
          },
          {
            name: "Number of reminders",
            type: "column",
            yAxis: 1,
            data: [],
            tooltip: {
              valueSuffix: "Number"
            }
          },
          {
            name: "Number of overdue pieces",
            type: "column",
            yAxis: 1,
            data: [],
            tooltip: {
              valueSuffix: "Number"
            }
          },
          {
            name: "Entry rate",
            type: "spline",
            data: [],
            tooltip: {
              valueSuffix: "%"
            }
          },
          {
            name: "overdue rate",
            type: "spline",
            data: [],
            tooltip: {
              valueSuffix: "%"
            }
          }
        ]
      }
    };
  },

  created() {
    getchannel({}, res => {
      let tableData = [];
      if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
        for (let k in res.data.data) {
          tableData.push(res.data.data[k]);
        }
      } else {
        tableData = res.data.data;
        
      }
      tableData.splice(0, 0,this.$t("dataReport.search.complete"),);
      this.channelSources = tableData;
    });

    this._getExpireDateDataNumberData();
  },
  methods: {
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

    handlePage() {
      this._getExpireDateDataNumberData();
    },
    chioce(item) {
    this.item = item;
  },
    _getExpireDateDataNumberData() {
      let shiji = this.searchForm.timeFrame[1] - this.searchForm.timeFrame[0];
      if (shiji > 604800000) {
        this.$Message.warning(this.$t('oversevenDays'));
        return;
      }
      const Thatday = this.formatDayTime(new Date());
      const weekago = this.formatDayTime(+new Date() - 604800000);
      const data = {
        beginTime: this.beginTime == "" ? weekago : this.beginTime,
        endTime: this.endTime == "" ? Thatday : this.endTime,
        channel: this.searchForm.channelSources,
        loanType: this.searchForm.loanType,
        source: this.item  == "all" || this.item =='Semua'? "" : this.item,
        expire_type: "",
      };
     
      getExpireDateDataNumberData(data, res => {
        if (+res.code == 0) {
          let _date = res.data.reverse() || [];
          this.optionDate.expireDate = [];
          this.optionDate.inCuiShouNum = [];
          this.optionDate.inCuishouRate = [];
          (this.optionDate.inCurrentCuiShouNum = []),
            (this.optionDate.inCurrentCuiShouRate = []),
            (this.optionDate.dueTimeNum = []),
            _date.map(item => {
              this.optionDate.inCuiShouNum.push(item.inCuiShouNum);
              this.optionDate.expireDate.push(item.day);
              let inCuishouRate = +item.inCuishouRate.replace(/%/g, "");
              this.optionDate.inCuishouRate.push(inCuishouRate);
              this.optionDate.inCurrentCuiShouNum.push(
                item.inCurrentCuiShouNum
              );
              this.optionDate.dueTimeNum.push(item.dueTimeNum);

              let inCurrentCuiShouRate = +item.inCurrentCuiShouRate.replace(
                /%/g,
                ""
              );
              this.optionDate.inCurrentCuiShouRate.push(inCurrentCuiShouRate);
            });

          this.option.xAxis[0].categories = this.optionDate.expireDate;

          this.option.series[0].data = this.optionDate.dueTimeNum;
          this.option.series[1].data = this.optionDate.inCuiShouNum;
          this.option.series[2].data = this.optionDate.inCurrentCuiShouNum;

          this.option.series[3].data = this.optionDate.inCuishouRate;
          this.option.series[4].data = this.optionDate.inCurrentCuiShouRate;

          HighCharts.chart(this.id, this.option);
        }
      });
      
    }
  },
  mounted() {
    HighCharts.chart(this.id, this.option);
  },

  computed: {
    beginTime() {
      return this.formatDayTime(this.searchForm.timeFrame[0]);
    },
    endTime() {
      return this.formatDayTime(this.searchForm.timeFrame[1]);
    }
  }
};
</script>

