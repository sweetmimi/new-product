<template>
  <div id="ApprovalList" class="m-approvalList">
    <Form ref="formInline" :model="searchFormInfo" :label-width="110">
      <Row type="flex" justify="start" align="middle">
        <FormItem :label="$t('approvalTask.serachBlock.orderNum')">
          <Input
            v-model="searchFormInfo.orderNo"
            :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.orderNum')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.customerName')">
          <Input
            v-model="searchFormInfo.name"
            :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.customerName')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.orderAmount')">
          <Input
            v-model="searchFormInfo.loanAmount"
            :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.orderAmount')}`"
          ></Input>
        </FormItem>
        <!-- <FormItem :label="$t('approvalTask.serachBlock.channel')">
          <Select
            v-if="listSelect.approveList"
            clearable
            transfer
            v-model="searchFormInfo.channel"
            :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.channel')}`"
          >
            <Option
              v-for="(item, index) in listSelect.approveList.channel"
              :value="item.key"
              :key="index"
            >{{item.value}}</Option>
          </Select>
        </FormItem> -->
        <FormItem :label="$t('approvalTask.serachBlock.productName')">
          <Select
            v-if="listSelect.approveList"
            clearable
            transfer
            v-model="searchFormInfo.productId"
            :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.productName')}`"
          >
            <Option
              v-for="(item, index) in listSelect.approveList.product"
              :value="item.key"
              :key="index"
            >{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.followStatus')">
          <Select
            v-if="listSelect.approveList"
            clearable
            transfer
            v-model="searchFormInfo.midStatus"
            :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.followStatus')}`"
          >
            <Option
              v-for="(item, index) in listSelect.approveList.midStatus"
              :value="item.key"
              :key="index"
            >{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.city')">
          <Input
            v-model="searchFormInfo.city"
            :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.city')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.approver')">
          <Input
            v-model="searchFormInfo.checkUserName"
            :placeholder="`${$t('inputPrefix')}${$t('approvalTask.serachBlock.approver')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.timeType')">
          <Select
            v-if="listSelect.approveList"
            clearable
            transfer
            v-model="searchFormInfo.timeType"
            :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.timeType')}`"
          >
            <Option
              v-for="(item, index) in listSelect.approveList.timeType"
              :value="item.key"
              :key="index"
            >{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('approvalTask.serachBlock.timeRange')">
          <DatePicker
            class="m-date-picker"
            type="daterange"
            :options="timeLimitConfig"
            format="yyyy-MM-dd"
            v-model="initDate"
            @on-change="handleTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('approvalTask.serachBlock.timeRange')}`"
          />
        </FormItem>
        <FormItem class="fix-form-btn">
          <span slot="label">
            <Button
              type="primary"
              :loading="loading.tableLoading"
              @click="searchData()"
            >{{$t('approvalTask.serachBlock.search')}}</Button>
          </span>
        </FormItem>
      </Row>
    </Form>
    <div v-if="showTable" class="approval-table-warp">
      <Button
        class="export-btn"
        icon="checkmark"
        type="success"
        @click="showApproverModal()"
      >{{$t('approvalTask.approverModal.batch')}}</Button>
      <!-- <Button
      class="batch-btn"
        class="export-btn"
        icon="ios-download-outline"
        type="success"
        @click="handleExpertData"
      >{{$t('approvalTask.serachBlock.export')}}</Button> -->
      <Table
        border
        :data="tableData"
        :columns="tableDefine"
        :row-class-name="rowClassName"
         @on-select="onSelectAll"
        @on-select-cancel='onSelectCancel'
        @on-select-all ='onSelectAll'
        @on-select-all-cancel='onSelectAllCancel'
        @on-selection-change="selectionChange"
        :loading="loading.tableLoading"
      >
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size="18" class="spin-icon"></Icon>
          <div>{{$t('loadingText')}}</div>
        </Spin>
      </Table>
    </div>
    <Page
      :total="pageCount"
      :current.sync="searchFormInfo.page"
      :page-size="size"
      v-if="pageCount > size"
      class-name="m-pagination"
      show-total
      @on-change="handleUpdateTable"
      show-elevator
    >{{$t('pageSlot.total')}} {{pageCount}} {{$t('pageSlot.count')}}</Page>

    <Modal align="left" class="m-modal" v-model="approverModal">
      <div slot="header" class="header">{{$t('approvalTask.tableBlock.changeOrder')}}</div>
      <p v-if="!count">{{`${$t('approvalTask.approverModal.curTip')}${curApprover}` }}</p>
      <p v-else>{{`${$t('approvalTask.approverModal.selectedNum')}${count}` }}</p>
      <Form ref="approverForm" :model="approverForm" :rules="modalRule">
        <FormItem :label="$t('approvalTask.approverModal.changeTip')" prop="checkUserId">
          <RadioGroup class="content" v-model="approverForm.checkUserId">
            <Row type="flex">
              <Col :key="key" class-name="radio-control" v-for="(principal, key) in  principalList">
                <Radio :label="principal.key">{{principal.value}}</Radio>
              </Col>
            </Row>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button @click="cancel" align="center">{{$t('cancelText')}}</Button>
        <Button
          type="success"
          align="center"
          :loading="loading.principalLoading"
          @click="handleChangeApprover"
        >{{$t('okText')}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import qs from "qs";
import { formatMoney } from "@/common/js/common";
import { getList, changeCheckUser, saveCheckUser } from "@/api/approval";
export default {
  data() {
    return {
      size: 10,
      pageCount: 0,
      count: 0,
      operationUser: -1,
      showTable: true,
      modalRule: {
        checkUserId: [
          {
            required: true,
            type: "number",
            message: this.$t("approvalTask.approverModal.approverTip")
          }
        ]
      },
      loading: {
        tableLoading: false,
        principalLoading: false
      },
      tableDefine: [
        {
          type: "selection",
          align: "center",
          key: "class_apply_date",
          fixed: "left",
          width: 60
        },
        {
          title: this.$t("approvalTask.tableBlock.orderId"),
          align: "center",
          key: "orderNo",
          minWidth: 150
        },
        // {
        //   title: this.$t("approvalTask.tableBlock.sourceChannel"),
        //   align: "center",
        //   key: "sourceChannel",
        //   minWidth: 100
        // },
        {
          title: this.$t("approvalTask.tableBlock.customerName"),
          align: "center",
          key: "name",
          minWidth: 100
        },
        {
          title: this.$t("approvalTask.tableBlock.repaymentsNum"),
          align: "center",
          key: "loanNum",
          minWidth: 100
        },
        {
          title: this.$t("approvalTask.tableBlock.city"),
          align: "center",
          key: "city",
          minWidth: 100
        },
        {
          title: this.$t("approvalTask.tableBlock.orderAmount"),
          align: "center",
          key: "loanAmount",
          minWidth: 100,
          render: (h, params) => {
            return h("span", null, formatMoney(params.row.loanAmount));
          }
        },
        {
          title: this.$t("approvalTask.tableBlock.applyTime"),
          align: "center",
          key: "applyTime",
          minWidth: 100
        },
        {
          title: this.$t("approvalTask.tableBlock.orderDistributionTime"),
          align: "center",
          key: "fendanTime",
          minWidth: 100
        },
        {
          title: this.$t("approvalTask.tableBlock.approveTime"),
          align: "center",
          key: "submitTime",
          minWidth: 120
        },
        {
          title: this.$t("approvalTask.tableBlock.followUpState"),
          align: "center",
          key: "midStatus",
          minWidth: 150
        },
        {
          title: this.$t("approvalTask.tableBlock.approver"),
          align: "center",
          key: "checkUserName",
          minWidth: 100
        },
        {
          title: this.$t("approvalTask.tableBlock.action"),
          key: "handle",
          align: "center",
          fixed: "right",
          width: window.lang === "zh-cn" ? 250 : 350,
          render: (h, params) => {
            let actions = [
              // h("div", { class: "fix-change-color" }, [
              //   h("Icon", {
              //     props: {
              //       type: "ios-eye-outline"
              //     },
              //     class: "ivu-btn-text fix-table-view-icon"
              //   }),
              //   h(
              //     "a",
              //     {
              //       class: "fix-table-view ivu-btn-text fix-table-btn",
              //       attrs: {
              //         href: `/approval/detail/view_${params.row.id}?isRecheck=${params.row.isRecheck}`,
              //         target: "_blank"
              //       }
              //     },
              //     this.$t("approvalTask.tableBlock.checkOrder")
              //   )
              // ]),

              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    icon: "ios-create-outline",
                    disabled: +params.row.canModify !== 1
                  },
                  class: "fix-table-btn action-left-border",
                  on: {
                    click: () => {
                      this.showApproverModal(params.row.id, "single");
                    }
                  }
                },
                this.$t("approvalTask.tableBlock.changeOrder")
              ),

               h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    icon: "ios-eye-outline",
                    disabled: !params.row.url
                  },
                  class: "fix-table-btn action-left-border",
                  on: {
                    click: () => {
                      window.open(params.row.url)
                      // this.showApproverModal(params.row.id, "single");
                    }
                  }
                },
                this.$t("approvalTask.tableBlock.contract")
              )
            ];
            return h("div", actions);
          }
        }
      ],
      searchFormInfo: {
        orderNo: "",
        name: "",
        city: "",
        loanAmount: "",
        midStatus: "",
        checkUserName: "",
        timeType: 1,
        startTime: "",
        endTime: "",
        channel: "",
        productId: "",
        page: 1
      },
      initDate: [],
      curApprover: "",
      approverForm: {
        approveId: [],
        checkUserId: "",
        checkUserName: ""
      },
      selectedData: [],
      arr1: [],
      arr2: [],
      tableData: [],
      principalList: [],
      approverModal: false,
      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      }
    };
  },

  computed: {
    ...mapGetters(["listSelect", "userInfo"])
  },

  mounted() {
    this._format(-6);
    this.searchData();
  },

  methods: {
    searchData(){
      this.arr2=[];
      this.approverForm.approveId = [];
      this.handleUpdateTable();
    },
    _fetchData(query) {
      this.loading.tableLoading = true;
      getList(
        {
          query: query
        },
        res => {
          this.loading.tableLoading = false;
          if (+res.status === 0) {
            const data = res.data;
            this.pageCount = +data.arrPager.count;
            this.tableData = data.arrApprove.sort((cur, next) => {
              return +next.isUrgent - cur.isUrgent;
            });
            this.showTable = true;
            this.tableData.forEach((item, index) => {
              if (+item.canModify !== 1) {
                item._disabled = true;
              }
              this.arr2.forEach(element => {
                if (element.id === item.id) {
                  this.$set(item, '_checked', true)
                }
              })
            });
          } else {
            this.showTable = false;
          }
        }
      );
    },
    _format(day) {
      let largeDate = new Date();
      let largeTime = `${largeDate.getFullYear()}-${largeDate.getMonth() +
        1}-${largeDate.getDate()}`;
      let smallDate = new Date(largeDate);

      smallDate.setDate(largeDate.getDate() + day);
      let smallTime = `${smallDate.getFullYear()}-${smallDate.getMonth() +
        1}-${smallDate.getDate()}`;
      this.searchFormInfo.startTime = `${smallTime} 00:00:00`;
      this.searchFormInfo.endTime = `${largeTime} 23:59:59`;
      this.initDate = [
        new Date(this.searchFormInfo.startTime),
        new Date(this.searchFormInfo.endTime)
      ];
    },
    showApproverModal(approveId, type) {
      if (type === "single") {
        this.count = 0;
      }
      this.$refs.approverForm.resetFields();
      if (approveId) {
        this.approverForm.approveId = [];
        this.approverForm.approveId.push(approveId);
      } else {
        if (!this.approverForm.approveId.length) {
          this.$Message.warning(
            this.$t("approvalTask.approverModal.selectTask")
          );
          return;
        }
      }
      changeCheckUser(
        {
          approveId: this.approverForm.approveId
        },
        res => {
          if (+res.status === 0) {
            const data = res.data;
            this.curApprover = data.checkUser.name;
            this.principalList = data.arrCheck;
            if (this.principalList.length) {
              this.approverModal = true;
            } else {
              this.$Message.warning(
                this.$t("approvalTask.tableBlock.noFollowUser")
              );
            }
          }
        }
      );
    },

    onSelectAll (selection) {

      this.arr1 = [...selection, ...this.selectedData]

      for (let val of this.arr1) {
        console.log(val)
        if (!this.arr2.some(item => item.id === val.id)) {
          this.arr2.push(val)
        }
      }

    },

    onSelectCancel (selection, row) {

      let result = this.arr2.findIndex((ele) => {
        return ele.id === row.id
      })
      this.arr2.splice(result, 1)
    },


    onSelectAllCancel () {
      this.arr2 = this.arr2.filter(item => {
        return this.tableData.every(item2 => {
          return item.id !== item2.id
        })
      })
    },

    selectionChange(selection) {
      this.approverForm.approveId = [];
      this.count = this.arr2.length;
      this.arr2.forEach(item => {
        this.approverForm.approveId.push(item.id);
      });
    },
    handleChangeApprover() {
      this.$refs.approverForm.validate(valid => {
        if (valid) {
          this.loading.principalLoading = true;
          const checkUserId = this.approverForm.checkUserId;
          const checkUserName = this.principalList.filter(
            user => +user.key === +checkUserId
          )[0];
          const paylaod = {
            checkUserId: checkUserId,
            approveId: this.approverForm.approveId,
            checkUserName: checkUserName.value
          };
          saveCheckUser(paylaod, res => {
            this.loading.principalLoading = false;
            if (+res.status === 0) {
              this.approverModal = false;
              this.approverForm.approveId = [];
              this.searchData();
              if (res.data.list.length) {
                this.$Modal.confirm({
                  content: `${res.data.list}${this.$t(
                    "approvalTask.approverModal.changeFail"
                  )}`
                });
              } else {
                this.$Message.success(
                  this.$t("approvalTask.approverModal.changeSuccess")
                );
              }
            }
          });
        }
      });
    },
    cancel() {
      this.approverModal = false;
      this.$refs.approverForm.resetFields();
    },
    handleTimeChange(date) {
      this.searchFormInfo.startTime = date[0];
      this.searchFormInfo.endTime = date[1];
    },

    handleExpertData() {
      const { startTime, endTime } = this.searchFormInfo;
      if (startTime && endTime) {
        const payload = Object.assign({}, this.searchFormInfo, {
          export: 1,
          lang: window.lang
        });
        window.open(
          window.location.origin + "/approve/list?" + qs.stringify(payload),
          "_blank"
        );
      } else {
        this.$Message.error({
          content: this.$t("approvalTask.serachBlock.exportErr")
        });
      }
    },

    handleUpdateTable(pageIndex) {
      this.searchFormInfo.page = pageIndex || 1;
      this._fetchData(this.searchFormInfo);
    },

    rowClassName(row) {
      return +row.isUrgent === 1 ? "m-table-top-row" : "";
    }
  }
};
</script>

<style scoped lang="scss">
.m-approvalList {
  .radio-control {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .approval-table-warp {
    position: relative;
    margin-top: 30px;
    .export-btn {
      position: absolute;
      right: 10px;
      top: -40px;
    }
    .batch-btn {
      position: absolute;
      right: 140px;
      top: -40px;
    }
  }
}
</style>
<style lang="scss">
.m-approvalList {
  .ivu-form-item-content {
    width: 170px;
  }
  .fix-table-view-icon {
    margin-left: 10px;
  }
  .fix-table-view {
    margin: 0 0 0 5px;
  }
  .fix-change-color {
    float: left;
    margin-left: 10px;
    &:hover {
      .ivu-btn-text {
        color: #2d8cf0;
      }
    }
  }
}
</style>
