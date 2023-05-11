<!-- zys -->
<template>
  <div>
    <Tabs @on-click="clickTabPane">
      <TabPane label="Task" name="1">
        <div class="search">
          <Form inline :label-width="80" :model="searchForm1">
            <div class="search-group-wrap">
              <div class="search-group">
                <FormItem :label="$t('dataReport.search.date')">
                  <DatePicker
                    type="daterange"
                    :placeholder="
                      $t('selectPrefix') + $t('dataReport.search.date')
                    "
                    format="yyyy-MM-dd"
                    @on-change="handleTimeChange1"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    style="margin-left: 40px"
                    @click="searchData('1')"
                    >{{ $t("search") }}</Button
                  >
                </FormItem>
              </div>
            </div>
          </Form>
        </div>
        <div class="table">
          <Table
            ref="table"
            border
            class="list-table"
            :data="tableData1"
            :columns="tableColumns1"
            :loading="loading1"
          >
          </Table>
        </div>
        <Page
          :total="total1"
          :page-size="pageSize"
          :current.sync="searchForm1.page"
          class-name="m-pagination"
          @on-change="handlePage1"
          show-total
          v-if="total1 > pageSize"
          show-elevator
        >
          {{ $t("pageSlot.total") }} {{ total1 }}
          {{ $t("pageSlot.count") }}</Page
        >
        <Modal
          v-model="showModal"
          title="ok?"
          ok-text="ok"
          cancel-text="cancel"
          @on-ok="sendEmail()"
        >
          <p>Whether it has been transferred to the corresponding lender?</p>
        </Modal>
      </TabPane>
      <TabPane label="Details" name="2">
        <div class="search">
          <Form inline :label-width="80" :model="searchForm2">
            <div class="search-group-wrap">
              <div class="search-group">
                <FormItem :label="$t('dataReport.search.date')">
                  <DatePicker
                    type="daterange"
                    :placeholder="
                      $t('selectPrefix') + $t('dataReport.search.date')
                    "
                    format="yyyy-MM-dd"
                    @on-change="handleTimeChange2"
                  ></DatePicker>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    style="margin-left: 40px"
                    @click="searchData('2')"
                    >{{ $t("search") }}</Button
                  >
                </FormItem>
              </div>
            </div>
          </Form>
        </div>
        <div class="table">
          <Table
            ref="table"
            border
            class="list-table"
            :data="tableData2"
            :columns="tableColumns2"
            :loading="loading2"
          >
          </Table>
        </div>
        <Page
          :total="total2"
          :page-size="pageSize"
          :current.sync="searchForm2.page"
          class-name="m-pagination"
          @on-change="handleTimeChange2"
          show-total
          v-if="total2 > pageSize"
          show-elevator
        >
          {{ $t("pageSlot.total") }} {{ total2 }}
          {{ $t("pageSlot.count") }}</Page
        >
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { formatDate } from "@/common/js/formatDate.js";
import {
  apifinStorebill,
  apifinWithdrawallist,
  apifinWdconfirm,
} from "@/api/dataReport";

export default {
  name: "",
  components: {},

  data() {
    return {
      loading1: false,
      loading2: false,
      showModal: false,
      sendId: "",
      searchForm1: {
        page: 1,
        beginTime: "",
        endTime: "",
      },
      searchForm2: {
        page: 1,
        beginTime: "",
        endTime: "",
      },
      total1: 0,
      total2: 0,
      pageCount: 0,
      pageSize: 10,
      tableData1: [],
      tableData2: [],
      tableColumns1: [
        {
          title: "date",
          align: "center",
          key: "name",
          minWidth: 80,
        },
        {
          title: "lender",
          align: "center",
          key: "lender_name",
          minWidth: 80,
        },
        {
          title: "amount",
          align: "center",
          key: "amount",
          minWidth: 80,
        },
        {
          title: "status",
          align: "center",
          key: "status",
          minWidth: 80,
          render: (h, params) => {
            return h("div", params.row.status == 0 ? "undone" : "It has been executed");
          },
        },
        {
          title: "create time",
          align: "center",
          key: "create_time",
          minWidth: 80,
          render: (h, params) => {
            return h("div", formatDate(params.row.create_time));
          },
        },
        {
          title: "update time",
          align: "center",
          key: "update_time",
          minWidth: 80,
          render: (h, params) => {
            return h("div", formatDate(params.row.update_time));
          },
        },

        {
          title: this.$t("operate.handle"),
          fixed: "right",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    disabled: params.row.status == 1 ? true : false,
                  },
                  on: {
                    click: () => {
                      this.oksend(params.row);
                    },
                  },
                },
                "Initiate a withdrawal"
              ),
            ]);
          },
        },
      ],
      tableColumns2: [],
    };
  },

  async created() {
    this.searchData("1");
  },

  computed: {},

  mounted() {},

  methods: {
    clickTabPane(name) {
      this.searchData(name);
    },
    searchData(type) {
      if (type == 1) {
        this.tableData1 = [];
        this.loading1 = true;
        apifinWithdrawallist(
          {
            pageSize: this.pageSize,
            page: this.searchForm1.page,
            beginTime: this.searchForm1.beginTime,
            endTime: this.searchForm1.endTime,
          },
          (res) => {
            if (res.code == 0) {
              this.loading1 = false;
              this.tableData1 = res.data.res;
              this.total1 = Number(res.data.cnt);
            } else {
              this.$Message.error(res.msg);
            }
          }
        );
      }
      if (type == 2) {
        this.loading2 = true;
        this.tableData2 = [];
        apifinStorebill(
          {
            page: this.searchForm2.page,
            beginTime: this.searchForm2.beginTime,
            endTime: this.searchForm2.endTime,
          },
          (res) => {
            if (res.code == 0) {
              this.tableColumns2 = [
                {
                  title: "day",
                  align: "center",
                  key: "day",
                  minWidth: 80,
                },
                {
                  title: "repay Amount",
                  align: "center",
                  key: "repayAmount",
                  minWidth: 80,
                },

                {
                  title: "admin Amount",
                  align: "center",
                  key: "adminAmount",
                  minWidth: 80,
                },
                {
                  title: "service Fee",
                  align: "center",
                  key: "serviceFee",
                  minWidth: 80,
                },
              ];
              var header = res.data.lender;
              if (res.data.lender) {
                header.forEach((item, index) => {
                  var obj = {};
                  obj.title = item.name;
                  obj.key = item.id;
                  obj.align = "center";
                  obj.minWidth = 80;
                  obj.render=(function (h,params) {
                    return h('div',params.row[item.id].lenderAmount)
                  })
                  this.tableColumns2.splice(2, 0, obj);
                });
              }
              console.log(this.tableColumns2);
              this.loading2 = false;
              this.tableData2 = res.data.list;
              this.total2 = Number(res.data.cnt);
            } else {
              this.$Message.error(res.msg);
            }
          }
        );
      }
    },
    handlePage1(pageIndex) {
      this.searchForm1.page = pageIndex || 1;
      this.searchData("1");
    },
    handlePage2(pageIndex) {
      this.searchForm2.page = pageIndex || 1;
      this.searchData("2");
    },
    oksend(row) {
      this.sendId = row.id;
      console.log(row);
      this.payID = row.pay_id;
      if (row.status != 0) {
        this.$Modal.error({
          title: "It has been executed!",
        });
      } else {
        this.showModal = true;
      }
    },
    sendEmail() {
      apifinWdconfirm(
        {
          id: this.sendId,
        },
        (res) => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.showModal = false;
            this.searchData("1");
          } else {
            this.$Message.error(res.msg);
            this.showModal = false;
          }
        }
      );
    },
    handleTimeChange1(date) {
      this.searchForm1.beginTime = date[0];
      this.searchForm1.endTime = date[1];
    },
    handleTimeChange2(date) {
      this.searchForm2.beginTime = date[0];
      this.searchForm2.endTime = date[1];
    },

    cancel() {
      this.showModal = false;
      this.showModal2 = false;
      this.showModal3 = false;
    },
  },
};
</script>
<style lang='less' scoped>
</style>
