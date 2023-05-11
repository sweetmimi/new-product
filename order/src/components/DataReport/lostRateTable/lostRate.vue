<!-- zys -->
<template>
  <div class="repayWish">
    <div class="content">
      <div class="table">
        <Form inline :label-width="80" :model="searchForm">
          <div class="search-group-wrap">
            <div class="search-group">
              <FormItem :label="$t('dataReport.search.expireDate')">
                <DatePicker v-model="timeFrame" type="daterange"
                  :placeholder="$t('selectPrefix')+$t('dataReport.search.date')" @on-change="changeData"
                  format="yyyy-MM-dd"></DatePicker>
              </FormItem>
              <FormItem :label="$t('lostRateTable.label.type')">
                <Select v-model="searchForm.type">
                  <Option value="1">{{$t('lostRateTable.label.new')}}</Option>
                  <Option value="2">{{$t('lostRateTable.label.history')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="$t('lostRateTable.label.period')">
                <Select v-model="searchForm.periodNo">
                  <Option value="1">{{$t('lostRateTable.label.periodone')}}</Option>
                  <Option value="2">{{$t('lostRateTable.label.periodtwo')}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="$t('dataReport.search.loanType')">
                <Select v-model="searchForm.loanType">
                  <Option v-for="(item, index) in $t('dataReport.search.loanTypes')" :key="index" :value="index">
                    {{ item.value }}</Option>
                </Select>
              </FormItem>
              <FormItem class="fix-form-btn">
                <Button type="primary" slot="label" :loading="tableLoading"
                  @click="getTableData()">{{ $t("search") }}</Button>
              </FormItem>
            </div>
          </div>
        </Form>
        <Table border class="list-table" :data="tableData" size="small" :columns="tableHeader" :loading="tableLoading"
          @on-row-click="rowClick" :row-class-name="rowClassName">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
            <div>Loading</div>
          </Spin>
        </Table>
      </div>
      <div class="Chart">
        <div v-show="ChartLine" id="Chart_line" ref="myChart" style="width: 100%; height: 550px; "></div>
        <div v-show="!ChartLine" id="Chart_pie" ref="myChart1" style="width: 500px; height: 550px; "></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    apiDisconnectedRate,
  } from "@/api/dataReport";
  export default {
    name: "repayWish",
    components: {},

    data() {
      return {
        tableLoading: false,
        loading: false,
        ChartLine: true,
        date: "",
        timeFrame: "",
        selectRow: {},
        searchForm: {
          type: "1",
          periodNo: "1",
          loanType: 0,
        },

        tableData: [],
        tableHeader: [{
            title: this.$t("lostRateTable.tableHead.expireDate"),
            align: "center",
            key: "date",
            width: 120,
            fixed: 'left'
          },
          {
            title: this.$t("lostRateTable.tableHead.total"),
            align: "center",
            key: "total",
            width: 120,
          },
          {
            title: this.$t("lostRateTable.tableHead.canNotConnRate"),
            align: "center",
            key: "canNotConnRate",
            width: 120,
            render: (h, params) => {
              return h(
                "div", params.row.canNotConnRate + '%'
              );
            },
          },
          {
            title: this.$t("lostRateTable.tableHead.canConnRate"),
            align: "center",
            key: "canConnRate",
            width: 120,
            render: (h, params) => {
              return h(
                "div", params.row.canConnRate + '%'
              );
            },
          },
          {
            title: this.$t("lostRateTable.tableHead.notSolveRate"),
            align: "center",
            key: "notSolveRate",
            width: 120,
            render: (h, params) => {
              return h(
                "div", params.row.notSolveRate + '%'
              );
            },
          },
        ],
        optionLine: {
          title: {
            text: "", 
            style: {
              fontSize: "40px" 
            }
          },
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              var result = params[0].name + "<br>";
              params.forEach(function (item) {
                if (item.value) {
                  result +=
                    item.value +
                    "%</br>";
                } else {
                  result += "0%";
                }
              });
              return result;
            },
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: [{
            type: 'value',
            max : 100,
            min : 0,
            splitNumber : 10,
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %'
            },
            show: true
          }],
          series: [{
            data: [],
            type: 'line',
            color: "#0EDF99",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: "rgb(66,255,251,1)", // 0% 
                  },
                  {
                    offset: 1,
                    color: "rgb(66,255,251,0)", // 100% 
                  },
                ],
                global: false, // 
              },
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#000',
                formatter: function (params) { 
                  return params.value + '%'
                },
              }
            },
          }]
        },

        optionPie: {
          title: {
            text: "", 
            y: "top",
            x: "center", 
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : ({d}%)",
          },
          legend: {
            orient: "vertical",
            bottom: "bottom",
            data: [],
          },
          series: [{
            color: ['#4ecb73', '#fbd437', '#f2637b'],
            name: "",
            type: "pie",
            radius: ['60%', '70%'],
            data: [],
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
              }
            },
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: '',
                textStyle: {
                  fontSize: '20',
                  color: '#39CCCC'
                }
              }
            },
          }, ],
        },
      };
    },

    async created() {},

    computed: {},

    mounted() {
      this.getTableHeader();
      this.getTableData();
    },

    methods: {

      changeData(date) {
        this.searchForm.dueTimeStart = date[0];
        this.searchForm.dueTimeEnd = date[1];
      },
      getTableHeader() {
        for (let i = 0; i < this.tableHeader.length; i++) {
          this.tableHeader[i].tooltip = true; 
          if (i != 0 && i !=1) {
            this.optionPie.legend.data.push(this.tableHeader[i].title)
            this.tableHeader[i].renderHeader = (h, column) => {
              return h("div", {
                domProps: {
                  innerHTML: column.column.title, 
                },
                style: {
                  cursor: "pointer",
                },
                on: {
                  mousedown: (e) => {

                    this.headerClick(column, e);
                  },
                },
              });
            };
          }
        }
      },
      getTableData() {
        this.tableLoading = true
        this.tableData = [];
        apiDisconnectedRate(this.searchForm, (res) => {
          if (res.code == 0) {
            this.tableLoading = false;
            this.tableData = res.data.list;
            this.headerClick({
                column: {
                  key: "canNotConnRate",
                  title: this.$t("lostRateTable.tableHead.canNotConnRate"),
                },
                index: 2,
              },
              "e"
            );
          } else {
            this.tableLoading = false;
            this.$Message.error(res.msg)
          }
        });
      },
      headerClick(value, e) {
        this.ChartLine = true;
        this.optionLine.xAxis.data = []
        this.optionLine.series[0].data = []
        var myChart = this.$echarts.init(document.getElementById("Chart_line"));


        let oldTab = this.tableHeader; 
        this.tableHeader = []; 
        oldTab.map((item) => {
          if (item.className) {
            delete item.className; 
          }
        });
        let obj = oldTab[value.index]; 
        obj.className = "table-info-column"; 
        oldTab.splice(value.index, 1, obj); 
        this.tableHeader = oldTab; 


        var listKey = value.column.key;
        this.tableData.forEach((item, index) => {
          this.optionLine.xAxis.data.unshift(item.date);
          this.optionLine.series[0].data.unshift(Number(item[listKey]))
        });
        this.optionLine.title.text = value.column.title;
        window.addEventListener("resize", myChart.resize);
        myChart.setOption(this.optionLine, true);
      },
      rowClick(row, index) {
        this.ChartLine = false;
        this.optionPie.series[0].data = [];
        var myChart = this.$echarts.init(document.getElementById("Chart_pie"));
        this.tableHeader.map((item) => {
          if (item.className) {
            delete item.className; 
          }
        });
        this.selectRow = row 
        for (let i in row) {
          if (i == 'canNotConnRate' || i == 'canConnRate' || i == 'notSolveRate') {
            var obj = {}
            obj.value = row[i]
            this.tableHeader.forEach((item, index) => {
              if (item.key == i) {
                obj.name = item.title
              }
            })

            this.optionPie.series[0].data.push(obj)
          }
        }
        console.log(this.optionPie.series[0].data)
        var anjianNum = row.total
        this.optionPie.series[0].label.normal.formatter = [this.$t("lostRateTable.tableHead.total"), anjianNum].join('\n'),
          this.optionPie.title.text = row.date;

        window.addEventListener("resize", myChart.resize);
        myChart.setOption(this.optionPie, true);
      },
      rowClassName(row, index) {
        if (row.date == this.selectRow.date) { 
          return 'aa' 
        }
        return ''
      }
    },
  };
</script>
<style lang='less' scoped>
  /deep/ .aa {
    color: red;
  }

  /deep/ .table-info-column {
    background: #ccc;
  }

  .repayWish {
    .content {
      display: flex;
      justify-content: space-between;


      .table {
        width: 40%;
      }

      .Chart {
        width: 60%;
        height: 100%;
        text-align: center;
      }
    }
  }
</style>
