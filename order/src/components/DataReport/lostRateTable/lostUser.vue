<!-- zys -->
<template>
    <div class="repayWish">
        <div class="content">
            <div class="table">
                <Form inline :label-width="80" :model="searchForm">
                    <div class="search-group-wrap">
                        <div class="search-group">
                            <FormItem :label="$t('dataReport.search.expireDate')">
                                <DatePicker v-model="timeFrame" type="daterange" :placeholder="
                    $t('selectPrefix') + $t('dataReport.search.date')
                  " @on-change="changeData" format="yyyy-MM-dd"></DatePicker>
                            </FormItem>
                            <FormItem :label="$t('lostRateTable.label.type')">
                                <Select v-model="searchForm.type">
                                    <Option value="2">{{$t('lostRateTable.label.payRate')}}</Option>
                                    <Option value="3">{{$t('lostRateTable.label.unPayRate')}}</Option>
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
                                    <Option v-for="(item, index) in $t('dataReport.search.loanTypes')" :key="index"
                                        :value="index">{{ item.value }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem class="fix-form-btn">
                                <Button type="primary" slot="label" :loading="tableLoading"
                                    @click="getTableData()">{{ $t("search") }}</Button>
                            </FormItem>
                        </div>
                    </div>
                </Form>
                <Table border class="list-table" :data="tableData" size="small" :columns="tableHeader"
                    :loading="tableLoading">
                    <Spin slot="loading" fix class="m-loading">
                        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
                        <div>Loading</div>
                    </Spin>
                </Table>
            </div>
            <div class="Chart">
                <div v-show="ChartLine" id="Chart_line" ref="myChart" style="width: 100%; height: 550px"></div>
                <div v-show="!ChartLine" id="Chart_pie" ref="myChart1" style="width: 500px; height: 550px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        apiDisconnectedCanRate
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
                    canType: "2",
                    dueTimeStart: "",
                    dueTimeEnd: "",
                    type: "2",
                    periodNo: "1",
                    loanType: 0,
                },

                tableData: [],
                tableHeader: [{
                        title: this.$t("dataReport.tableHead.expireDate"),
                        align: "center",
                        key: "days",
                        width: 120,
                        fixed: 'left'
                    },
                    {
                        title: "H0",
                        align: "center",
                        key: "h0Rate",
                        width: 90,
                    },
                    {
                        title: "s1",
                        align: "center",
                        key: "oneRate",
                        width: 90,
                    },
                    {
                        title: "s2",
                        align: "center",
                        key: "twoRate",
                        width: 90,
                    },
                    {
                        title: "s3",
                        align: "center",
                        key: "threeRate",
                        width: 90,
                    },
                    {
                        title: "s4",
                        align: "center",
                        key: "fourRate",
                        width: 90,
                    },
                    {
                        title: "s5",
                        align: "center",
                        key: "fiveRate",
                        width: 90,
                    },
                    {
                        title: "s6",
                        align: "center",
                        key: "sixRate",
                        width: 90,
                    },
                    {
                        title: "s7",
                        align: "center",
                        key: "sevenRate",
                        width: 90,
                    },
                    {
                        title: this.$t("lostRateTable.tableHead.currentRate"),
                        align: "center",
                        key: "numRate",
                        width: 90,
                    },
                ],
                optionLine: {
                    title: {
                        text: "", 
                        style: {
                            fontSize: "40px", 
                        },
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
                        type: "category",
                        data: [],
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            var result = params[0].name + "<br>";
                            params.forEach(function (item) {
                                if (item.value) {
                                    result += item.marker + " " + item.seriesName + " : " + item.value +
                                        "%</br>";
                                } else {
                                    result += item.marker + " " + item.seriesName + " :  - </br>";
                                }
                            });
                            return result;
                        }
                    },
                    yAxis: [{
                        type: "value",
                        max : 100,
                        min : 0,
                        splitNumber : 10,
                        axisLabel: {
                            show: true,
                            interval: "auto",
                            formatter: "{value} %",
                        },
                        show: true,
                    }, ],
                    series: [{
                        data: [],
                        type: "line",
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
                                        color: "rgb(66,255,251,1)", 
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(66,255,251,0)", 
                                    },
                                ],
                                global: false, 
                            },
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "top",
                                color: "#000",
                                formatter: function (params) {

                                    return params.value + "%";
                                },
                            },
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
                    if (i != 0 ) {
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
                this.tableLoading = true;
                this.tableData = [];
                apiDisconnectedCanRate(this.searchForm, (res) => {
                    if (res.code == 0) {
                        this.tableLoading = false;
                        this.tableData = res.data;
                        this.headerClick({
                                column: {
                                    key: "h0Rate",
                                    title: "H0",
                                },
                                index: 1,
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
                this.optionLine.xAxis.data = [];
                this.optionLine.series[0].data = [];
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
                var chartData = JSON.parse(JSON.stringify(this.tableData));
                chartData.forEach((item, index) => {
                    //  item.days= item.days.replace(/-/g,"/");
                    this.optionLine.xAxis.data.unshift(item.days);
                    if (item[listKey] == "/") {
                        item[listKey] = 0;
                    } else {
                        console.log(item[listKey]);
                        item[listKey] = item[listKey].replace("%", "");
                    }
                    this.optionLine.series[0].data.unshift(Number(item[listKey]));
                });
                this.optionLine.title.text = value.column.title;
                window.addEventListener("resize", myChart.resize);
                myChart.setOption(this.optionLine, true);
            },
        },
    };
</script>
<style lang='less' scoped>
    /deep/ .table-info-column {
        background: #ccc;
    }

    .repayWish {
        .content {
            display: flex;
            justify-content: space-between;

            .table {
                width: 50%;
            }

            .Chart {
                width: 60%;
                height: 100%;
                text-align: center;
            }
        }
    }
</style>
