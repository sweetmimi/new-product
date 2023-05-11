<template>
  <div id="orderHistory">

    <Form ref="order" :model="searchInfo" :label-width="140">
      <Row type="flex">
        <FormItem :label="$t('caseManage.serachBlock.orderNum')" >
          <Input
            v-model="searchInfo.orderNo"
            :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.orderNum')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.phone')" >
          <Input
            v-model="searchInfo.mobile"
            :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.phone')}`"
          ></Input>
        </FormItem>
        <!-- <FormItem :label="$t('caseManage.serachBlock.city')" >
          <Input
            v-model="searchInfo.city"
            :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.city')}`"
          ></Input>
        </FormItem> -->
        <FormItem :label="$t('caseManage.serachBlock.userName')" >
          <Input
            v-model="searchInfo.userName"
            :placeholder="`${$t('inputPrefix')}${$t('caseManage.serachBlock.userName')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('listModule.historyList.collectionDate')" >
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd "
            :options="timeLimitConfig"
            @on-change="pickerChange"
            :placeholder="`${$t('selectPrefix')}${$t('listModule.historyList.collectionDate')}`"
          ></DatePicker>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.createCollectionTime')" >
          <DatePicker
            type="daterange"
            format="yyyy-MM-dd "
            :options="createTimeLimit"
            @on-change="createTimeChange"
            :placeholder="`${$t('selectPrefix')}${$t('caseManage.serachBlock.createCollectionTime')}`"
          ></DatePicker>
        </FormItem>
        <FormItem :label="$t('listModule.historyList.sitTable')">
          <Input
            v-model="searchInfo.followUserName"
            :placeholder="`${$t('inputPrefix')}${$t('listModule.historyList.sitTable')}`"
          ></Input>
        </FormItem>
        <FormItem :label="$t('caseManage.serachBlock.collectionDueDay')" >
          <div class="overdue-warp">
            <InputNumber
              class="overdue-input"
              :min="1"
              v-model="searchInfo.startOverdueDate"
              style="width:80px;"
            ></InputNumber>-
            <InputNumber
              class="overdue-input"
              :min="1"
              v-model="searchInfo.endOverdueDate"
              style="width:80px;"
            ></InputNumber>
          </div>
        </FormItem>
        <FormItem class="fix-form-btn" >
          <Button
            slot="label"
            type="primary"
            :loading="searchLoading"
            @click="handlePage()"
          >{{$t('caseManage.serachBlock.search')}}</Button>
        </FormItem>
      </Row>
    </Form>
    <Table
      border
      v-if="showTable"
      :columns="historyList"
      :data="historyOrderList"
      :loading="loading"
      ref="table"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size="18" class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
      <template slot="action" slot-scope="props" v-if="isCuishouAdmin||isDaihouAdmin">
        <Button
          type="text"
          class="fix-table-btn"
          :to="`/task/taskdetail?cuishouId=${encodeURIComponent(props.rowInfo.cuishouId)}&orderNo=${encodeURIComponent(props.rowInfo.orderNo)}`"
          target="_blank"
          icon="ios-eye"
          size="small"
        >{{$t('listModule.viewBtn')}}</Button>

      </template>
    </Table>
    <Page
      v-if="total > size"
      :total="Number(total)"
      :page-size="size"
      :current.sync="searchInfo.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getHistoryList } from "@/api/order";
export default {
  name: "history",
  data() {
    return {
      isCuishouAdmin : /role_cuishou_admin/.test(localStorage.getItem('u.info')),
      isDaihouAdmin : /role_daihou_admin/.test(localStorage.getItem('u.info')),
      total: 0,
      size: 10,
      modal: false,
      loading: true,
      searchLoading: false,
      orderStatusList: [],
      productList: [],
      searchInfo: {
        orderNo: "",
        userName: "",
        mobile: "",
        city: "",
        startTime: "",
        endTime: "",
        followUserName: "",
        startCreateTime: "",
        endCreateTime: "",
        startOverdueDate: null,
        endOverdueDate: null,
        page: 1
      },
      timeLimitConfig: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      createTimeLimit: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      historyList: [
        {
          title: this.$t("listModule.historyList.orderId"),
          key: "orderNo",
          align: "center",
          minWidth: 150,
          fixed: "left"
        },
        {
          title: this.$t("listModule.historyList.userName"),
          key: "userName",
          align: "center",
          minWidth: 150
        },
        // {
        //   title: this.$t("listModule.historyList.city"),
        //   key: "city",
        //   align: "center",
        //   minWidth: 150
        // },
        {
          title: this.$t("listModule.historyList.collectionDate"),
          key: "outCuishouTime",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("caseManage.serachBlock.createCollectionTime"),
          key: "createTime",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("listModule.historyList.sitTable"),
          key: "followUserName",
          align: "center",
          minWidth: 180
        },
        {
          title: this.$t("listModule.historyList.collectionDueDay"),
          key: "overDueDay",
          align: "center",
          minWidth: 180
        },
        {
          title: this.$t("listModule.handle"),
          key: "handle",
          align: "center",
          width: 150,
          fixed: "right",
          render: (h, params) => {
            return h(
              "div",
              this.$refs.table["$scopedSlots"].action({ rowInfo: params.row })
            );
          }
        }
      ],
      historyOrderList: [],
      orderIndex: 0,
      showTable: true
    };
  },

  mounted() {
    this.handlePage();
  },

  methods: {
    pickerChange(date) {
      this.searchInfo.startTime = date[0];
      this.searchInfo.endTime = date[1];
    },
    createTimeChange(date) {
      this.searchInfo.startCreateTime = date[0];
      this.searchInfo.endCreateTime = date[1];
    },
    show(index) {
      this.modal = true;
    },
    handlePage(pageIndex) {
      this.searchInfo.page = pageIndex || 1;
      this.loading = true;
      this.searchLoading = true;
      getHistoryList(
        {
          query: this.searchInfo
        },
        res => {
          this.loading = false;
          this.searchLoading = false;
          if (+res.status === 0) {
            const data = res.data;
            this.historyOrderList = data.historyList;
            this.total = data.arrPager.count;
            this.size =data.arrPager. pageSize
            this.showTable = true;
          } else {
            this.showTable = false;
          }
        }
      );
    }
  }
};
</script>
