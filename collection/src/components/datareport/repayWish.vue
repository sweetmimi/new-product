<!-- zys -->
<template>
  <div class="repayWish">
    <Tabs type="card" @on-click="clickTabPane">
      <TabPane v-for="(item, index) in tabsList" :key="index" :name="item.name" :label="item.label">
        <div class="content">

          <div class="table">
            <Form inline :label-width="100">
              <div class="search-group-wrap">
                <div class="search-group">
                  <FormItem :label="$t('dataReport.search.expireDate')">
                    <DatePicker type="date" :placeholder="$t('dateTime')" format="yyyy-MM-dd" v-model="date"
                      @on-change="setOption"></DatePicker>
                  </FormItem>
                  <FormItem class="fix-form-btn">
                    <Button type="primary" slot="label" :loading="tableLoading"
                      @click="getTableHeader(item.name)">{{$t('search')}}</Button>
                  </FormItem>
                </div>
              </div>
            </Form>
            <Alert>{{tabTip}}</Alert>
             <Collapse style="margin-bottom:15px; list-style: none;">
              <Panel>
                {{$t('dataReport.repayWish.tips')}}
                <p slot="content">
                  <ul size="small" class="ul">
                    <li>{{$t('dataReport.repayWish.tip1')}}</li>
                    <li>{{$t('dataReport.repayWish.tip3')}}</li>
                    <li>{{$t('dataReport.repayWish.tip2')}}</li>
                    <li>{{$t('dataReport.repayWish.tip4')}}</li>
                    <li>{{$t('dataReport.repayWish.tip5')}}</li>
                    <li>{{$t('dataReport.repayWish.tip6')}}</li>
                    <li>{{$t('dataReport.repayWish.tip7')}}</li>
                    <li>{{$t('dataReport.repayWish.tip8')}}</li>
                    <li>{{$t('dataReport.repayWish.tip9')}}</li>
                  </ul>
                </p>
              </Panel>
            </Collapse>
            <Table border class="list-table" :data="tableData" size="small" :columns="tableHeader"
              :loading="tableLoading">
              <Spin slot="loading" fix class="m-loading">
                <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
                <div>Loading</div>
              </Spin>
            </Table>

          </div>
          <div class="pieChart">
            <div :id="item.ChartId" ref="myChart" style="width: 100%; height: 550px; padding-top: 0px;"></div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import {
    apiContactHeader,
    apiContactList,
    apiContactHistoryList
  } from "@/api/datareport";
  export default {
    name: "repayWish",
    components: {},

    data() {
      return {
        tableLoading: false,
        loading: false,
        date: "",
        tabTip:this.$t('dataReport.repayWish.tabTip1'),
        tabsList: [{
            label: this.$t('dataReport.repayWish.nowContact'),
            name: "1",
            ChartId: 'chartId1',
          },
          {
            label: this.$t('dataReport.repayWish.hisContact'),
            name: "2",
            ChartId: 'chartId2',
          },
        ],
        tableData: [],
        tableHeader: [],
        option: {
          title: {
            text: '',
            y: 'top',
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            bottom: "bottom",
            data: []
          },
          series: [{
            color: ['#51c8b1', '#0aa9e7', '#f6bb3c', '#FF8C00', '#FF0000', '#FE8463', '#6495ed', '#e691b6',
              '#ba55d3', '#FFC0CB',
              '#cd5c5c',
            ],
            name: '',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
      };
    },

    async created() {

    },

    computed: {},

    mounted() {
      this.getTableHeader('1');
    },

    methods: {
      setOption(date) {
        this.date = date;
      },
      clickTabPane(name) {
        this.getTableHeader(name);
        this.tabTip = name=='1'?this.$t('dataReport.repayWish.tabTip1'):this.$t('dataReport.repayWish.tabTip2')
      },
      getTableHeader(type) {
        this.tableHeader = [];
        this.tableLoading = true;
        apiContactHeader({
           mid:localStorage.getItem("mid"),
          dateTime: this.date
        }, res => {
          if (res.status == 0) {
            this.tableHeader = res.data;
            if (res.data) {
              for (let i = 0; i < this.tableHeader.length; i++) {
                this.tableHeader[i].align = "center";
                this.tableHeader[i].tooltip = true;
                if (i === 0) {
                  this.tableHeader[i].minWidth = 100;
                  this.tableHeader[i].fixed = "left";
                } else {
                  this.tableHeader[i].minWidth = 80;
                  if (!this.tableHeader[i].renderHeader) {
                    this.tableHeader[i].renderHeader = (h, column) => {
                      return h("div", {
                        domProps: {
                          innerHTML: column.column.title,
                        },
                        style: {
                          cursor: 'pointer'
                        },
                        on: {
                          mousedown: (e) => {

                            this.rightClick(column, e, type);
                          },
                        },
                      });
                    };
                  }
                }
              }
              this.getTableData(type)
            }


          }

        });
      },
      getTableData(type) {
        this.tableData = []
        apiContactList({
          mid:localStorage.getItem("mid"),
          dateTime: this.date,
          type:type
        }, res => {
          if (res.status == 0) {
            this.tableLoading = false;
            this.tableData = res.data;
            this.rightClick({
              column: {
                key: "total",
                title: this.$t('dataReport.repayWish.all')
              },
              index: 1
            }, 'e', type)
          }
        })

      },
      rightClick(value, e, type) {
        console.log(value)

        let oldTab = this.tableHeader;
        this.tableHeader = [];
        this.option.series[0].data = [];
        this.option.legend.data = [];
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
          if (item.name != 'ALL') {
            var list = {};
            list.name = item.name;
            list.value = item[listKey];
            this.option.series[0].data.push(list)
            this.option.legend.data.push(item.name)
          }});
        this.option.title.text = value.column.title;
        console.log(this.option.legend.data)
        console.log(this.option.series[0].data)
        var boxid = 'chartId' + type;
        var myChart = this.$echarts.init(document.getElementById(boxid));
        window.addEventListener("resize", myChart.resize);
        myChart.setOption(this.option, true);
      }

    },
  };

</script>
<style lang='less' scoped>

  /deep/ .table-info-column {
    background: #ccc;
  }
  ul{
    list-style: none;
    li{
      padding: 6px;
      border-bottom: 1px solid #f4f4f4;
    }
  }
  .repayWish {

    .content {
      display: flex;
      justify-content: space-between;

      .table {
        width: 45%;
      }

      .pieChart {
        width: 50%;
        text-align: center;
      }
    }
  }

</style>
