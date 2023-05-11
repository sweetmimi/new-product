<template>
  <Row id="collectRecord" class="m-collectRecord">
    <Tabs
      type="card"
      :value="activeTab"
      @on-click="toggleTab"
      class="smallTab"
      :animated="false"
      name="innerTabs"
    >

      <!-- <TabPane
        :label="$t('taskDetail.collectRecordTab.contractRecord.title')"
        tab="innerTabs"
      >
        <Table
          border
          :columns="contractRecordColumns"
          v-if="showContractList"
          :loading="contractRecordLoading"
          :data="contractRecordList"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{ $t("loadingText") }}</div>
          </Spin>
        </Table>
        <Page
          show-total
          show-elevator
          :total="operate.total"
          :page-size="operate.size"
          :current.sync="operate.page"
          class="m-pagination"
          v-if="operate.total > operate.size"
          @on-change="callHandlePage"
          >{{ $t("pageSlot.total") }} {{ operate.total }}
          {{ $t("pageSlot.count") }}</Page
        >
        <Modal
          :title="$t('taskDetail.collectRecordTab.records.reimbursementCodes')"
          width="600"
          class="changModal m-modal"
          @on-visible-change="modalVisibleChange"
          v-model="showModal"
        >
          <div class="bd">
            <div class="m-card">
              <Form
                :model="formInfo"
                ref="form"
                :label-width="100"
                :rules="rules"
              >

                <FormItem
                  :label="
                    $t('taskDetail.collectRecordTab.records.repay_method')
                  "
                  prop="mobile"
                  style="width: 400px"
                >
                  <Select
                    v-model="formInfo.mobile"
                    style="width: 200px"
                    @on-change="getItemName"
                    :disabled="disabled"
                  >
                    <Option
                      v-for="item in repayType"
                      :value="item.value"
                      :key="item.name"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>

                <FormItem
                  :label="
                    $t('taskDetail.collectRecordTab.records.messageContent')
                  "
                >
                  <Input
                    disabled
                    v-model="messageContent"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 5 }"
                    style="width: 350px"
                    placeholder="Enter something..."
                  />
                </FormItem>
                 <span style="color:red">{{$t('taskDetail.collectRecordTab.records.repaytips')}} </span>
              </Form>
            </div>
          </div>
          <div slot="footer">
            <Button @click="reimbursementCancel">{{ $t("cancelText") }}</Button>
            <Button
              type="success"
              @click="reimbursementOperate"
              :loading="sendLoading"
              >{{ $t("confirMsend") }}</Button
            >
          </div>
        </Modal>
      </TabPane> -->

      <!-- <TabPane
        :label="$t('taskDetail.collectRecordTab.approvalRecord.title')"
        tab="innerTabs"
      >
        <Table
          border
          :columns="approvalRecordColumns"
          v-if="showPathList"
          :loading="approvalRecordLoading"
          :data="approvalRecordList"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{ $t("loadingText") }}</div>
          </Spin>
        </Table>
        <Row class="tab-warp">
          <Row align="middle">
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.otherMobile")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.otherMobile
            }}</Col>
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.currentAddr")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.currentAddr
            }}</Col>
          </Row>
          <Row align="middle">
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.maritalStatus")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.maritalStatus
            }}</Col>
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.organization")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.organization
            }}</Col>
          </Row>
          <Row align="middle">
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.monthlyIncome")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.monthlyIncome
            }}</Col>
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.repayDay")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.repayDay
            }}</Col>
          </Row>
          <Row align="middle">
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.companyAddress")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.companyAddress
            }}</Col>
            <Col span="6" class-name="col-style title">{{
              $t(
                "taskDetail.collectRecordTab.approvalRecord.curWorkContactType"
              )
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.curWorkContactType
            }}</Col>
          </Row>
          <Row align="middle">
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.hasOtherLoan")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.hasOtherLoan
            }}</Col>
            <Col span="6" class-name="col-style title">{{
              $t("taskDetail.collectRecordTab.approvalRecord.totalAmount")
            }}</Col>
            <Col span="6" class-name="col-style">{{
              phoneReviewInfo.totalAmount
            }}</Col>
          </Row>
        </Row>
      </TabPane> -->

      <!-- <TabPane
        :label="$t('taskDetail.collectRecordTab.operateRecord.title')"
        tab="innerTabs"
      >
        <Table
          border
          :columns="operateHistoryColumns"
          v-if="showPathList"
          :loading="operateHistoryLoading"
          :data="operateHistoryList"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{ $t("loadingText") }}</div>
          </Spin>
        </Table>
        <Page
          show-total
          show-elevator
          :total="operate.total"
          :page-size="operate.size"
          :current.sync="operate.page"
          class="m-pagination"
          v-if="operate.total > operate.size"
          @on-change="operateHandlePage"
          >{{ $t("pageSlot.total") }} {{ operate.total }}
          {{ $t("pageSlot.count") }}</Page
        >
      </TabPane> -->

      <TabPane
        :label="$t('taskDetail.collectRecordTab.daihouLog.title')"
        tab="innerTabs"
      >
        <Table
          border
          :columns="daihouLogColumns"
          v-if="showDaihouLogList"
          :loading="daihouLogLoading"
          :data="daihoulogList"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{ $t("loadingText") }}</div>
          </Spin>
        </Table>
      </TabPane>

       <TabPane
        :label="$t('taskDetail.collectRecordTab.daihouHis.title')"
        tab="innerTabs"
      >
        <Table
          border
          :columns="daihouHistoryColumns"
          v-if="showdaihouHistoryList"
          :loading="daihouHistoryLoading"
          :data="daihouHistoryList"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{ $t("loadingText") }}</div>
          </Spin>
        </Table>
      </TabPane>

      <!-- <TabPane
        :label="$t('taskDetail.collectRecordTab.repaymentPlan.title')"
        tab="innerTabs"
      >
        <Table
          border
          :columns="repaymentColumns"
          v-if="showRepaymentList"
          :loading="repaymentLoading"
          :data="repaymentList"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{ $t("loadingText") }}</div>
          </Spin>
        </Table>
      </TabPane> -->

      <TabPane
        :label="$t('taskDetail.collectRecordTab.records.paymentHistory')"
        tab="innerTabs"
      >
        <div class="reimbursementCodes">
          <Button
            type="success"
            class="Success"
            icon="md-add"
            :loading="shengcheng"
            @click="handleUpdateTable"
            >{{
              $t("taskDetail.collectRecordTab.records.reimbursementCodes")
            }}</Button
          >
        </div>
        <Table
          border
          :columns="paymentHistory"
          v-if="showRepaymentList"
          :loading="repaymentLoading"
          :data="daihoulogList"
        >
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size="18" class="spin-icon"></Icon>
            <div>{{ $t("loadingText") }}</div>
          </Spin>
        </Table>

        <Modal
          :title="$t('taskDetail.collectRecordTab.records.reimbursementCodes')"
          width="600"
          class="changModal m-modal"
          @on-visible-change="modalVisibleChange"
          v-model="showModal"
        >
          <div class="bd">
            <div class="m-card">
              <Form
                :model="formInfo"
                ref="form"
                :label-width="100"
                :rules="rules"
              >

                <FormItem
                  :label="
                    $t('taskDetail.collectRecordTab.records.repay_method')
                  "
                  prop="mobile"

                  style="width: 400px"
                >
                  <Select v-model="formInfo.mobile" style="width: 200px" @on-change="changeloanType">
                    <Option
                      v-for="item in repayType"
                      :value="item.value"
                      :key="item.name"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>
                <FormItem
                  :label="$t('taskDetail.collectRecordTab.records.bank_store')"
                  prop="loanType"
                  style="width: 400px"
                >
                  <Select v-model="formInfo.loanType" style="width: 200px">
                    <Option
                      v-for="item in loanTypes"
                      :value="item.name"
                      :key="item.name"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>
                <FormItem
                  :label="
                    $t('taskDetail.collectRecordTab.records.request_type')
                  "
                  prop="request_type"
                  style="width: 250px"
                >
                  <Select v-model="formInfo.request_type" style="width: 200px">
                    <Option
                      v-for="item in request_types"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>
                <FormItem
                  prop="repay_amount"
                  v-if="formInfo.request_type == 400"
                  :label="
                    $t('taskDetail.collectRecordTab.records.repay_amount')
                  "
                >
                  <Input
                    type="text"
                    style="width: 200px"
                    v-model="formInfo.repay_amount"
                    placeholder="rp"
                  />
                </FormItem>
                <FormItem
                  :label="
                    $t('taskDetail.collectRecordTab.records.messageContent')
                  "
                >
                  <Input
                    disabled
                    v-model="messageContent"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 5 }"
                    style="width: 350px"
                    placeholder="Enter something..."
                  />
                  <Button @click="getItemName(formInfo.mobile)">{{
                    $t("getSmstext")
                  }}</Button>
                </FormItem>
                 <span style="color:red">{{$t('taskDetail.collectRecordTab.records.repaytips')}} </span>
              </Form>
            </div>
          </div>
          <div slot="footer">
            <Button @click="reimbursementCancel">{{ $t("cancelText") }}</Button>
            <Button
              type="success"
              @click="reimbursementOperate"
              :loading="sendLoading"
              >{{ $t("confirMsend") }}</Button
            >
          </div>
        </Modal>

         <Modal :title="$t('taskDetail.collectRecordTab.records.isClose')" @on-ok="isDeleteok" v-model="isShowModal">
          <p>
            {{$t('taskDetail.collectRecordTab.records.isCloseTips')}}
          </p>
        </Modal>
        <!-- end -->
      </TabPane>
    </Tabs>
  </Row>
</template>
<script>
import { formatMoney } from "@/common/js/common";
import {
  getCuiShouList,
  getCollectRecord,
  getRepaymenPlanList,
  getCallList,
} from "@/api";
import {
  getApproveList,
  getOperateList,
  getPhoneReview,
  postsendrepaymentcode,
  getsendrepaymentcode,
  deleterepaymentcode,
  getrepaymentrecordlist,
  lianxidianhua,
} from "@/api/task";
import { getDaihouLogList, getCuishouIvrLogList, getDaihouHistoryList} from "@/api/daihoutask";
export default {
  name: "taskRecord",
  props: {
    activeTab: {
      type: Number,
    },
    daihouTaskId: {
      type: String | Number,
    },
  },
  data() {
    return {
      rules: {
        mobile: [
          {
            required: true,
            type: "number",
            message:
              this.$t("selectPrefix") +
              this.$t("taskDetail.collectRecordTab.records.repay_method"),
            trigger: "change",
          },
        ],
        rolloverType: [
          {
            required: true,
            message:
              this.$t("selectPrefix") +
              this.$t("taskDetail.collectRecordTab.records.rolloverType"),
            type: "number",
            trigger: "change",
          },
        ],
        loanType: [
          {
            required: true,
            message:
              this.$t("selectPrefix") +
              this.$t("taskDetail.collectRecordTab.records.bank_store"),

            trigger: "change",
          },
        ],
        request_type: [
          {
            required: true,
            message:
              this.$t("selectPrefix") +
              this.$t("taskDetail.collectRecordTab.records.request_type"),
            type: "number",
            trigger: "change",
          },
        ],
        repay_amount: [
          {
            required: true,
            message:
              this.$t("inputPrefix") +
              this.$t("taskDetail.collectRecordTab.records.repay_amount"),
            type: "string",
            trigger: "blur",
          },
          {
            type: "string",
            pattern: /^[0-9]\d*$/,
            message: this.$t("inputPrefix") + this.$t("shuzi"),
            trigger: "blur",
          },
        ],
        name: [{ required: true, message: "store", trigger: "change" }]
      },
      repayStatus: "",
      repayStatusCode: "",
      convenienceStore: [],
      disabled: true,
      bianlidian: false,
      showModal: false,
      isShowModal: false,
      messageContent: "",
      loanTypes:"",
      formInfo: {
        mobile: "",
        name: "",
        rolloverType: "",
        request_type: "",
        repay_amount: "",
        loanType:"",
      },
      audioSrc: "",
      convenienceStore: [],
      audioModal: false,
      repaymentLoading: false,
      recordLoading: false,
      contractRecordLoading: false,
      collectionPathLoading: false,
      approvalRecordLoading: false,
      operateHistoryLoading: false,
      daihouLogLoading: false,
      repaymentLoading: false,
      shengcheng: false,
      sendLoading: false,
      getSmsTextLoading: false,
      daihouHistoryLoading:false,
      // showRecordList: true,
      showRepaymentList: true,
      showContractList: true,
      showPathList: true,
      showApprovalList: true,
      showOperateList: true,
      showDaihouLogList: true,
      showRepaymentList: true,
      showdaihouHistoryList:true,

      recordList: [],
      repaymentList: [],
      contractRecordList: [],
      collectionPathList: [],
      approvalRecordList: [],
      operateHistoryList: [],
      daihoulogList: [],
      daihouHistoryList:[],
      lotAmount: { min_amount: "", max_amount: "" },
      operate: {
        total: "",
        size: 10,
        page: 1,
      },

      contractRecordColumns: [
        {
          title: this.$t(
            "taskDetail.collectRecordTab.contractRecord.startTime"
          ),
          key: "startTime",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.contractRecord.endTime"),
          key: "endTime",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.contractRecord.whoCall"),
          key: "whoCall",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.contractRecord.callMonthod"
          ),
          key: "callType",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.contractRecord.callStatus"
          ),
          key: "callStatus",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.contractRecord.dialPerson"
          ),
          key: "createUser",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.contractRecord.dialNumber"
          ),
          key: "called",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectFollowUp.relationship"),
          key: "contactType",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("listModule.handle"),
          key: "handle",
          align: "center",
          fixed: "right",
          width: 250,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    icon: "volume-low",
                    disabled: !params.row.recordUrl,
                  },
                  class: "fix-table-btn",
                  on: {
                    click: () => {
                      this._playaudio(params.row);
                    },
                  },
                },
                params.row.recordUrl
                  ? this.$t("taskDetail.collectRecordTab.contractRecord.record")
                  : this.$t(
                      "taskDetail.collectRecordTab.approvalRecord.noRecord"
                    )
              ),
            ]);
          },
        },
      ],
      approvalRecordColumns: [
        {
          title: this.$t("taskDetail.collectRecordTab.approvalRecord.callNo"),
          key: "callNo",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.approvalRecord.callStatus"
          ),
          key: "callStatus",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.approvalRecord.startTime"
          ),
          key: "startTime",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.approvalRecord.endTime"),
          key: "endTime",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("listModule.handle"),
          key: "handle",
          align: "center",
          fixed: "right",
          width: 250,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    icon: "volume-low",
                    disabled: !params.row.recordUrl,
                  },
                  class: "fix-table-btn",
                  on: {
                    click: () => {
                      this._playaudio(params.row);
                    },
                  },
                },
                params.row.recordUrl
                  ? this.$t(
                      "taskDetail.collectRecordTab.approvalRecord.playRecord"
                    )
                  : this.$t(
                      "taskDetail.collectRecordTab.approvalRecord.noRecord"
                    )
              ),
            ]);
          },
        },
      ],
      operateHistoryColumns: [
        {
          title: this.$t(
            "taskDetail.collectRecordTab.operateRecord.operateTime"
          ),
          key: "operateTime",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.operateRecord.operateType"
          ),
          key: "operateType",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.operateRecord.content"),
          key: "content",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.operateRecord.operators"),
          key: "opChannel",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.operateRecord.operateor"),
          key: "operateor",
          align: "center",
          minWidth: 150,
        },
      ],
      daihouLogColumns: [
        {
          title: this.$t("taskDetail.collectRecordTab.daihouLog.contactTime"),
          key: "contactTime",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouLog.followResult"),
          key: "followResult",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouLog.remark"),
          key: "remark",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouLog.operateUser"),
          key: "operateUser",
          align: "center",
          minWidth: 150,
        },
      ],
  daihouHistoryColumns: [
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.changeTime"),
          key: "changeTime",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.contactUser"),
          key: "contactUser",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.contactRelation"),
          key: "contactRelation",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.followResult"),
          key: "followResult",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.followRepayWish"),
          key: "followRepayWish",
          align: "center",
          minWidth: 150
        },
        {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.remark"),
          key: "remark",
          align: "center",
          minWidth: 150
        },
         {
          title: this.$t("taskDetail.collectRecordTab.daihouHis.createUser"),
          key: "createUser",
          align: "center",
          minWidth: 150
        }

      ],
      repaymentColumns: [
        {
          title: this.$t("taskDetail.overdueCondition.periodNo"),
          key: "periodNo",
          align: "center",
          fixed: "left",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.repaymentPlan.receivableDate"
          ),
          key: "dueTime",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.repaymentPlan.paymentDate"
          ),
          key: "repayDate",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.repaymentPlan.corpus"),
          key: "principal",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("span", null, formatMoney(params.row.principal));
          },
        },
        {
          title: this.$t("taskDetail.collectRecordTab.repaymentPlan.interest"),
          key: "interest",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("span", null, formatMoney(params.row.interest));
          },
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.repaymentPlan.managementCost"
          ),
          key: "oneTimeManagementFee",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h(
              "span",
              null,
              formatMoney(params.row.oneTimeManagementFee)
            );
          },
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.repaymentPlan.overdueNewCost"
          ),
          key: "overdueInterest",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("span", null, formatMoney(params.row.overdueInterest));
          },
        },

        {
          title: this.$t(
            "taskDetail.collectRecordTab.repaymentPlan.rolloverServiceFee"
          ),
          key: "rolloverServiceFee",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("span", null, formatMoney(params.row.rolloverServiceFee));
          },
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.repaymentPlan.amountReturned"
          ),
          key: "repayedAmount",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("span", null, formatMoney(params.row.repayedAmount));
          },
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.repaymentPlan.receivableAmount"
          ),
          key: "currentPlanAllAmount",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            return h(
              "span",
              null,
              formatMoney(params.row.currentPlanAllAmount)
            );
          },
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.repaymentPlan.remainAmount"
          ),
          key: "remainAmount",
          align: "center",
          minWidth: 160,
          render: (h, params) => {
            return h("span", null, formatMoney(params.row.remainAmount));
          },
        },
        {
          title: this.$t("taskDetail.collectRecordTab.repaymentPlan.status"),
          key: "repayStatus",
          align: "center",
          minWidth: 160,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.repaymentPlan.overDays"),
          key: "dueDate",
          align: "center",
          fixed: "right",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.repaymentPlan.remark"),
          key: "remark",
          align: "center",
          minWidth: 160,
        },
      ],
      paymentHistory: [
        {
          title: this.$t(
            "taskDetail.collectRecordTab.records.repay_create_time"
          ),
          key: "repay_create_time",
          align: "center",
          minWidth: 140,
          fixed: "left",
        },
        {
          title: this.$t("taskDetail.collectRecordTab.records.repay_amount"),
          key: "repay_amount",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.records.repay_method"),
          key: "repay_method",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.records.repay_bank"),
          key: "repay_bank",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.records.repay_code"),
          key: "repay_code",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.records.repay_method_type"
          ),
          key: "repay_method_type",
          align: "center",
          minWidth: 140
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.records.va_creater"
          ),
          key: "va_creater",
          align: "center",
          minWidth: 140
        },
        {
          title: this.$t(
            "taskDetail.collectRecordTab.records.repay_code_expire_at"
          ),
          key: "repay_code_expire_at",
          align: "center",
          minWidth: 140,
        },
        {
          title: this.$t("taskDetail.collectRecordTab.records.repay_status"),
          key: "repay_status",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("listModule.handle"),
          key: "repay_status_code",
          align: "center",
          minWidth: 100,
          fixed: "right",
          render: (h, params) => {
            let status = params.row.repay_status_code;
            if (status == "6") {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "ios-trash",
                  },
                }),
                h(
                  "span",
                  {
                    on: {
                      click: () => {
                        this.isShowModal = true;
                        this.core_no = params.row.core_no;
                      },
                    },
                    style: {
                      fontWight: "600",
                      cursor: "pointer",
                    },
                  },
                  this.$t("taskDetail.collectRecordTab.records.drop_code")
                ),
              ]);
            } else {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "ios-trash",
                  },
                }),
                h(
                  "span",
                  {
                    style: {
                      fontWight: "600",
                      cursor: "not-allowed",
                      color: "#ccc",
                    },
                  },
                  this.$t("taskDetail.collectRecordTab.records.drop_code")
                ),
              ]);
            }
          },
        },
      ],
      phoneReviewInfo: {
        otherMobile: "",
        currentAddr: "",
        maritalStatus: "",
        organization: "",
        monthlyIncome: "",
        repayDay: "",
        companyAddress: "",
        curWorkContactType: "",
        hasOtherLoan: "",
        totalAmount: "",
      },
      sms_content: "",
      repayType: [],
      rollover: [],
      repayBankList: [],
      repayStoreList: [],
      core_no: "",
      request_types: [],
    };
  },

  methods: {
    cancelAudio() {
      this.audioSrc = "";
      this.audioModal = false;
    },
    operateHandlePage() {
      this._getOperateList();
    },

    handleUpdateTable() {
      this.shengcheng = true;
      getsendrepaymentcode({ daihouTaskId: this.daihouTaskId }, (res) => {
        this.shengcheng = false;
        this.repayBankList = res.data.repay_code.repay_bank_list;
        this.repayStoreList = res.data.repay_code.repay_store_list;
        this.request_types = res.data.request_type;
        this.lotAmount = res.data.expected_amount_range;
        this.repayType = res.data.repay_type;
        this.rollover = res.data.is_rollover;
        this.showModal = true;
        // if (
        //   res.data.default_repay_method.repay_type == "" ||
        //   res.data.default_repay_method.repay_code == ""
        // ) {
        //   this.disabled = false;
        //   this.showModal = true;
        // } else {
        //   this.formInfo = {
        //     mobile: +res.data.default_repay_method.repay_type
        //   };

        //   let data = {
        //     repay_type: this.formInfo.mobile,
        //     repay_code: res.data.default_repay_method.repay_code,
        //     daihouTaskId: this.daihouTaskId,

        //     for_review: 200
        //   };
        //   postsendrepaymentcode(data, res => {
        //     if (+res.status === 0) {
        //       this.messageContent = res.data[0].sms_content;
        //     }
        //   });

        //   this.showModal = true;
        // }
      });
      this.messageContent = "";
    },

changeloanType(status){
   if(status ===1){
     this.loanTypes = this.repayBankList
   }else if(status ===2){
     this.loanTypes = this.repayStoreList
   }
},

    getItemName(status) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (status === 1) {
            let data = {
              repay_amount: this.formInfo.repay_amount,
              request_type: this.formInfo.request_type,
              repay_type: this.formInfo.mobile,
              repay_code: this.formInfo.loanType,
              daihouTaskId: this.daihouTaskId,
              for_review: 200,
            };
            postsendrepaymentcode(data, (res) => {
              this._getrepaymentrecordlist();
              this.messageContent = res.data[0].sms_content;
            });
          } else if (status === 2) {
            let data = {
              repay_amount: this.formInfo.repay_amount,
              request_type: this.formInfo.request_type,
              repay_type: this.formInfo.mobile,

             repay_code: this.formInfo.loanType,
              daihouTaskId: this.daihouTaskId,
              for_review: 200,
            };
            console.log(data, 77);
            postsendrepaymentcode(data, (res) => {
              this._getrepaymentrecordlist();
              this.messageContent = res.data[0].sms_content;
            });
          }
        }
      });
    },
    modalVisibleChange() {
      this.$refs.form.resetFields();
    },

    reimbursementCancel() {
      this.showModal = false;
    },

    reimbursementOperate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sendLoading = true;
          //  console.log(valid, 888);
          let data = {
            request_type: this.formInfo.request_type,
            repay_amount: this.formInfo.repay_amount,
            repay_type: this.formInfo.mobile,
            repay_code: this.formInfo.loanType,
            daihouTaskId: this.daihouTaskId,
          };
          if(this.formInfo.request_type == 400){
            if (
            Number(this.formInfo.repay_amount) >
              Number(this.lotAmount.max_amount) ||
            Number(this.formInfo.repay_amount) <
              Number(this.lotAmount.min_amount)
          ) {
            this.$Message.error({
              content:
                this.$t("taskDetail.collectRecordTab.records.repayAmount") +
                this.lotAmount.min_amount +
                "~" +
                this.lotAmount.max_amount,
              duration: 3,
            });
          }
          }
           else {
            postsendrepaymentcode(data, (res) => {
              if (+res.status === 0) {
                this.sendLoading = false;
                this.showModal = false;
                this.$Message.success("success");
                this._getrepaymentrecordlist();
              }
            });
          }
        }
      });
    },
    _playaudio(item) {
      this.audioSrc = item.recordUrl;
      this.audioModal = true;
    },
    _getOperateList() {
      this.operateHistoryLoading = true;
      getOperateList(
        {
          page: this.operate.page,
          daihouTaskId: this.daihouTaskId,
        },
        (res) => {
          if (+res.status === 0) {
            const data = res.data;
            this.operateHistoryLoading = false;
            if (data.operateList) {
              this.operateHistoryList = data.operateList;
              this.operate.total = data.arrPager.count;
              this.showoperateList = true;
            }
          } else {
            this.showoperateList = false;
          }
        }
      );
    },
    _getApproveList() {
      this.approvalRecordLoading = true;
      getApproveList(
        {
          daihouTaskId: this.daihouTaskId,
        },
        (res) => {
          if (+res.status === 0) {
            const data = res.data;
            this.approvalRecordLoading = false;
            if (data.approveList) {
              this.approvalRecordList = data.approveList;
              this.showApprovalList = true;
            }
          } else {
            this.showApprovalList = false;
          }
        }
      );
    },
    _getCallList() {
      this.contractRecordLoading = true;
      getCallList(
        {
          page: this.operate.page,
          daihouTaskId: this.daihouTaskId,
        },
        (res) => {
          this.contractRecordLoading = false;
          if (+res.status === 0) {
            const data = res.data;
            this.contractRecordList = data.callList ? data.callList : [];
            this.operate.total =
              data.arrPager && data.arrPager.count ? data.arrPager.count : 0;
            this.showContractList = true;
          } else {
            this.showContractList = false;
          }
        }
      );
    },
    _getPhoneReview() {
      getPhoneReview({ daihouTaskId: this.daihouTaskId }, (res) => {
        if (+res.status === 0) {
          const data = res.data;
          Object.assign(this.phoneReviewInfo, data);
        }
      });
    },
    _getDaihouLogList() {
      this.daihouLogLoading = true;
      getDaihouLogList(
        {
          daihouTaskId: this.daihouTaskId,
        },
        (res) => {
          if (+res.status === 0) {
            this.daihouLogLoading = false;
            this.daihoulogList = res.data.daihouLogList;
            this.showDaihouLogList = true;
          } else {
            this.showDaihouLogList = false;
          }
        }
      );
    },
    _getDaihouListoryList(){
       this.daihouHistoryLoading = true;
      getDaihouHistoryList(
        {
          daihouTaskId: this.daihouTaskId
        },
        res => {
          if (+res.status === 0) {
            this.daihouHistoryLoading = false;
            this.daihouHistoryList = res.data.daihouList;
            this.showDaihouHistoryList = true;
          } else {
            this.showDaihouHistoryList = false;
          }
        }
      );
    },
    _getRepaymenPlanList() {
      this.repaymentLoading = true;
      getRepaymenPlanList(
        {
          daihouTaskId: this.daihouTaskId,
        },
        (res) => {
          this.repaymentLoading = false;
          if (+res.status === 0) {
            this.repaymentList = res.data.repaymentPlanList;
            this.showRepaymentList = true;
          } else {
            this.showRepaymentList = false;
          }
        }
      );
    },

    isDeleteok() {
      deleterepaymentcode(
        {
          core_no: this.core_no,
          is_drop_code: 200,
          daihouTaskId: this.daihouTaskId,
        },
        (res) => {
          if (res.status == 0) {
            this.$Message.success("success");
            this._getrepaymentrecordlist();
          } else {
            this.$Message.error("failed");
          }
        }
      );
    },

    _getrepaymentrecordlist() {
      let data = {
        daihouTaskId: this.daihouTaskId,
      };
      getrepaymentrecordlist(data, (res) => {
        if (+res.status === 0) {
          this.repayStatus = res.data.repaymentRecordList.repay_status;
          this.repayStatusCode = res.data.repaymentRecordList.repay_status_code;
          let daihoulogList = [];
          if (
            res.data.repaymentRecordList instanceof Object &&
            !Array.isArray(res.data.repaymentRecordList)
          ) {
            daihoulogList.push(res.data.repaymentRecordList);
          } else {
            daihoulogList = res.data.repaymentRecordList;
          }
          this.daihoulogList = daihoulogList;
        }
      });
    },
    toggleTab(index) {
      this.operate.total = 0;
      this.operate.page = 1;
      console.log(index, 88);
      this.$emit("update:activeTab", index);
      switch (index) {
        // case 0:
        //   this._getApproveList();
        //   this._getPhoneReview();
        //   break;
        // case 2:
        //   this._getOperateList();
        //   break;
        case 0:
          this._getDaihouLogList();
          break;
        case 1:
          this._getDaihouListoryList();
          break;
        // case 5:
        //   this._getRepaymenPlanList();
        //   break;
        case 2:
          this._getrepaymentrecordlist();
          break;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.m-collectRecord {
  padding-top: 10px;
  .audio {
    margin-top: 15px;
  }
}
.footer {
  text-align: center;
  button {
    margin: 0 20px;
  }
}
</style>
<style lang="scss">
.ivu-layout-sider-collapsed {
  & + .ivu-layout {
    .topTab {
      .ivu-tabs-bar {
        .ivu-tabs-nav-container {
          .ivu-tabs-nav-wrap {
            .ivu-tabs-nav-scroll {
              .ivu-tabs-nav {
                margin: 0 24px 0 48px;
              }
            }
          }
        }
      }
    }
  }
}
.m-taskDetail {
  .m-collectRecord {
    .ivu-tabs-bar {
      .ivu-tabs-nav-container {
        .ivu-tabs-nav-wrap {
          .ivu-tabs-nav-scroll {
            position: static;
          }
        }
      }
    }
    .tab-warp {
      margin-top: 20px;
    }
  }
}
.reimbursementCodes {
  height: 45px;

  .Success {
    float: right;
  }
}
</style>
