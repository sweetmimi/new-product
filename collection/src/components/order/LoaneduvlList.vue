<template>
  <div class="m-loaned-list">

    <Form :model="searchInfo" :label-width="140">
      <Row type="flex">
        <FormItem :label="$t('listModule.loanedList.orderNo')">
          <Input
            v-model="searchInfo.orderNo"
            :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedList.orderNo')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedList.mobile')">
          <Input
            v-model="searchInfo.mobile"
            :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedList.mobile')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedList.dueTime')">
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd "
            @on-change="dueTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedList.dueTime')}`"
          ></DatePicker>
        </FormItem>

        <FormItem :label="$t('listModule.loanedList.userName')">
          <Input
            v-model="searchInfo.userName"
            :placeholder="`${$t('inputPrefix')}${$t('listModule.loanedList.userName')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('listModule.loanedList.JinanTime')">
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd "
            @on-change="jinanTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedList.JinanTime')}`"
          ></DatePicker>
        </FormItem>

        <FormItem :label="$t('listModule.loanedList.taskStatus')">
          <Select
            clearable
            transfer
            v-model="searchInfo.taskStatus"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.loanedList.taskStatus')}`"
          >
            <Option
              :key="index"
              :value="option.key"
              v-if="listSelect.daihouTaskInfo"
              v-for="(option, index) in listSelect.daihouTaskInfo.taskStatus"
            >{{option.value}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('listModule.loanedList.callTimes')">
          <div class="overdue-warp">
            <Input class="overdue-input" v-model="searchInfo.callTimesMin" style="width:80px;"></Input>-
            <Input class="overdue-input" v-model="searchInfo.callTimesMax" style="width:80px;"></Input>
          </div>
        </FormItem>
        <FormItem class="fix-form-btn">
          <Button
            slot="label"
            type="primary"
            :loading="loading.tableLoading"
            @click="updateMyTaskList()"
          >{{$t('listModule.loanedList.search')}}</Button>
        </FormItem>
      </Row>
    </Form>
    <!-- form block -->
    <div class="table-warp">
      <!-- <Button
        type="success"
        icon="arrow-swap"
        class="change-follow"
        @click="showBatchChange"
      >{{$t('caseManage.tableBlock.bathChangeUser')}}</Button> -->
      <Table
        border
        ref="table"
        v-if="showTable"
        :data="tableData"
        :columns="tableColums"
        :loading="loading.tableLoading"
        @on-selection-change="selectionChange"
      >
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size="18" class="spin-icon"></Icon>
          <div>{{$t('loadingText')}}</div>
        </Spin>
        <template slot="action" slot-scope="props">
          <Button
            type="text"
            class="fix-table-btn"
            :to="`/task/loanedUvldetail?daihouId=${encodeURIComponent(props.rowInfo.daihouTaskId)}&orderNo=${encodeURIComponent(props.rowInfo.orderNo)}+&index=2`"

            icon="ios-eye"
            size="small"
          >{{$t('listModule.viewBtn')}}</Button>
        </template>
      </Table>
    </div>
    <!-- table block -->
    <Page
      show-sizer
      show-total
      show-elevator
      class="m-pagination"
      :total="Number(pagerData.count)"
      :page-size="searchInfo.pageSize"
      :current.sync="searchInfo.page"
      @on-change="updateMyTaskList"
      @on-page-size-change="changePageSize"
      :page-size-opts="listSelect.common.pageSize"
      v-if="pagerData.count > searchInfo.pageSize"
    >{{$t('pageSlot.total')}} {{pagerData.count}} {{$t('pageSlot.count')}}</Page>
    <!-- page block -->
    <Modal
      class="changModal"
      v-model="changeModel.model"
      :width="changeModel.width"
      :title="$t('caseManage.tableBlock.bathChangeUser')"
    >
      <div class="hd">
        <p class="title">{{ $t('caseManage.tableBlock.inputExplain') }}：</p>
        <p
          class="text"
          v-for="(item, index) in $t('caseManage.tableBlock.explainContent')"
          :key="index"
        >{{item}}</p>
      </div>
      <div class="bd">
        <p class="text">{{ $t('caseManage.tableBlock.selectedOrder') }}：{{taskCount}}</p>
        <VTable
          :width="570"
          :min-height="200"
          is-vertical-resize
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :columns="changeModel.vTabelHead"
          :table-data="changeModel.vTabelData"
          :error-content="$t('noData')"
          :cell-edit-done="distributeTask"
        />
      </div>
      <div slot="footer">
        <Button @click="changeModel.model = false">{{$t('cancelText')}}</Button>
        <Button type="success" @click="hideBatchChange">{{$t('okText')}}</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VTable } from "vue-easytable";
import "vue-easytable/libs/themes-base/index.css";

import {
  IvrTaskList,
  getDaihouTaskList,
  getFollowUser,
  saveFollowUser
} from "@/api/daihoutask";

let orderTotal = 0;

export default {
  data() {
    return {
      searchInfo: {
        page: 1,
        pageSize: 10,
        orderNo: "",
        mobile: "",
        startDueTime: "",
        endDueTime: "",
        followResult: "",
        userName: "",
        startJinanTime: "",
        endJinanTime: "",
        callTimesMin: "",
        callTimesMax: "",
        followUser: "",
        taskStatus: ""
      },
      loading: {
        tableLoading: false
      },
      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      taskCount: 0,
      selectDaishouIds: [],
      showTable: true,
      tableColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          key: "orderNo",
          minWidth: 150,
          align: "center",
          title: this.$t("listModule.loanedList.orderNo")
        },
        {
          title: this.$t("listModule.loanedList.userName"),
          key: "userName",
          minWidth: 120,
          align: "center"
        },
        {
          title: this.$t("listModule.loanedList.JinanTime"),
          key: "createTime",
          minWidth: 120,
          align: "center"
        },
        {
          title: this.$t("listModule.loanedList.dueTime"),
          key: "dueTime",
          minWidth: 120,
          align: "center"
        },
        // {
        //   title: this.$t("listModule.loanedList.followResult"),
        //   key: "followResult",
        //   minWidth: 120,
        //   align: "center"
        // },
        // {
        //   title: this.$t("listModule.loanedList.followUser"),
        //   key: "followUser",
        //   minWidth: 120,
        //   align: "center"
        // },
        {
          title: this.$t("listModule.loanedList.taskStatus"),
          key: "taskStatus",
          minWidth: 120,
          align: "center"
        },
        {
          title: this.$t("listModule.loanedList.callTimes"),
          key: "followTimes",
          minWidth: 120,
          align: "center"
        },
        {
          title: this.$t("listModule.loanedList.lastFollowTime"),
          key: "lastFollwTime",
          minWidth: 160,
          align: "center"
        },
        {
          title: this.$t("listModule.handle"),
          key: "handle",
          align: "center",
          fixed: "right",
          minWidth: 120,
          render: (h, params) => {
            return h(
              "div",
              this.$refs.table["$scopedSlots"].action({ rowInfo: params.row })
            );
          }

        }
      ],
      tableData: [],
      pagerData: {
        count: 0
      },
      changeModel: {
        width: 610,
        model: false,
        vTabelHead: [
          {
            title: this.$t("caseManage.tableBlock.followName"),
            field: "staffName",
            titleAlign: "center",
            columnAlign: "center",
            width: 190
          },
          {
            title: this.$t("caseManage.tableBlock.followOrders"),
            field: "followNum",
            titleAlign: "center",
            columnAlign: "center",
            width: 190
          },
          {
            title: this.$t("caseManage.tableBlock.distributeOrderNum"),
            field: "num",
            titleAlign: "center",
            columnAlign: "center",
            isEdit: true,
            width: 190
          }
        ],
        vTabelData: []
      }
    };
  },
  computed: {
    ...mapGetters(["listSelect"])
  },
  components: {
    VTable
  },
  created() {
    this.updateMyTaskList();

  },
  methods: {

    dueTimeChange(date) {
      this.searchInfo.startDueTime = date[0];
      this.searchInfo.endDueTime = date[1];
    },

    jinanTimeChange(date) {
      this.searchInfo.startJinanTime = date[0];
      this.searchInfo.endJinanTime = date[1];
    },

    updateMyTaskList(page = 1) {
      this.searchInfo.page = page;
      this.loading.tableLoading = true;
      IvrTaskList({ query: this.searchInfo }, res => {
        this.loading.tableLoading = false;
        if (+res.status === 0) {
          const data = res.data;
          this.tableData = data.allTaskList;
          this.pagerData = data.arrPager;
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      });
    },

    selectionChange(selection) {
      this.taskCount = selection.length;
      this.selectDaishouIds = [];
      selection.forEach(item => {
        this.selectDaishouIds.push(item.daihouTaskId);
      });
    },

    changePageSize(page) {
      this.searchInfo.pageSize = page;
      this.updateMyTaskList();
    },

    showBatchChange() {
      if (!this.taskCount) {
        this.$Message.error({
          content: this.$t("caseManage.tableBlock.pleaseSelectTask")
        });
        return false;
      }
      getFollowUser(
        {
          arrDaihouTaskId: this.selectDaishouIds
        },
        res => {
          if (+res.status === 0) {
            const data = res.data;
            this.changeModel.model = true;
            this.changeModel.vTabelData = data.canChangeUserList.map(item => {
              item.num = "";
              return item;
            });
          }
        }
      );
    },

    hideBatchChange() {
      if (!orderTotal) {
        this.$Message.error({
          content: this.$t("caseManage.tableBlock.required")
        });
        return false;
      }
      if (orderTotal > this.taskCount) {
        this.$Message.error({
          content: this.$t("caseManage.tableBlock.greaterThan")
        });
        return false;
      }
      const changePost = this.changeModel.vTabelData.map(item => {

        return {
          staffId: item.staffId,
          staffName: item.staffName,
          num: item.num
        };
      });
      saveFollowUser(
        {
          arrDaihouTaskId: this.selectDaishouIds,
          arrChangePost: changePost
        },
        res => {
          if (+res.status === 0) {
            this.taskCount = 0;
            this.selectDaishouIds = [];
            this.changeModel.model = false;
            this.updateMyTaskList();
          }
        }
      );
    },

    distributeTask(newValue, oldValue, rowIndex, rowData, field) {
      orderTotal = 0;
      if (newValue !== "" && !/^[0-9]\d*$/.test(newValue)) {
        this.$Message.error({
          content: this.$t("caseManage.tableBlock.inputInteger")
        });
        return false;
      }
      this.changeModel.vTabelData[rowIndex][field] = newValue;
      this.changeModel.vTabelData.forEach(item => {
        orderTotal += +item.num;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.m-loaned-list {
  .table-warp {
    padding: 15px;
    border: 1px solid #e9eaec;
    border-radius: 4px;
    .change-follow {
      margin-bottom: 15px;
    }
  }
}

.changModal {
  .hd {
    .text {
      text-indent: 1em;
    }
  }
  .bd {
    margin-top: 15px;
    .text {
      margin-bottom: 10px;
      color: #ff9900;
    }
  }
}
</style>

