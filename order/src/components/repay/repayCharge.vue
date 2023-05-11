<!-- zys -->
<template>
  <div class="repayCharge">
    <div class="reimbursementCodes">
      <Form :label-width="100" inline>
        <FormItem :label="$t('repayCharge.orderNum')">
          <Input
            v-model="orderNumber"
            placeholder="Silahkan Masukan Kode Pesanan"
          />

          <Button
            type="primary"
            style="margin-left: 20px"
            class="Success"
            @click="handleUpdateTable"
            >{{ $t("search") }}</Button
          >
        </FormItem>
      </Form>
    </div>
    <Table
      border
      :columns="paymentHistory"
      :loading="Loading"
      :data="tableData"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size="18" class="spin-icon"></Icon>
        <div>{{ $t("loadingText") }}</div>
      </Spin>
    </Table>
    <div class="model" v-show="showModal">
      <div class="bd">
        <div class="m-card">
          <Form :model="formInfo" ref="form" :label-width="100" :rules="rules">
            <FormItem
              :label="$t('repayCharge.repay_method')"
              prop="mobile"
              style="width: 400px"
            >
              <Select
                v-model="formInfo.mobile"
                style="width: 200px"
                @on-change="changeloanType"
              >
                <Option
                  :value="item.value"
                  v-for="(item, index) in repayType"
                  :key="index"
                >
                  {{ item.name }}</Option
                >
              </Select>
            </FormItem>
            <FormItem
              :label="$t('repayCharge.bank_store')"
              prop="loanType"
              style="width: 400px"
            >
              <Select v-model="formInfo.loanType" style="width: 200px">
                <Option
                  v-for="item in loanTypes"
                  :value="item.name"
                  :key="item.name"
                  >{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem
              :label="$t('repayCharge.request_type')"
              prop="request_type"
              style="width: 250px"
            >
              <Select v-model="formInfo.request_type" style="width: 200px">
                <Option
                  v-for="item in request_types"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.name }}</Option
                >
              </Select>
            </FormItem>
            <FormItem
              prop="repay_amount"
              v-if="formInfo.request_type == 400"
              :label="$t('repayCharge.repay_amount')"
            >
              <Input
                type="text"
                style="width: 200px"
                v-model="formInfo.repay_amount"
                placeholder="rp"
              />
              <p v-if="formInfo.mobile==2" style="color: red">{{$t('repayCharge.repay_amount_10000')}}</p>
            </FormItem>
            <FormItem :label="$t('repayCharge.messageContent')">
              <Input
                disabled
                v-model="messageContent"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                style="width: 350px"
                placeholder="Enter something..."
              />
              <Button
                type="primary"
                style="margin: 0 20px"
                :loading="smsLoading"
                @click="getItemName()"
                >{{ $t("repayCharge.getSmstext") }}</Button
              >
            </FormItem>
            <span style="color: red">{{ $t("repayCharge.repaytips") }} </span>
          </Form>
        </div>
      </div>
      <div class="footer" slot="footer">
        <Button style="margin-right: 20px" @click="reimbursementCancel">{{
          $t("cancelText")
        }}</Button>
        <Button
          type="warning"
          style="margin-right: 20px"
          @click="dropCodeModel"
          >{{ $t("repayCharge.dropCode") }}</Button
        >
        <Button
          type="success"
          @click="reimbursementOperate"
          :loading="sendLoading"
          >{{ $t("repayCharge.confirMsend") }}</Button
        >
      </div>
    </div>

    <Modal :title='$t("repayCharge.isdrop")' @on-ok="isDeleteok" v-model="isShowModal">
      <p>
        {{$t("repayCharge.isdropTip")}}
      </p>
      <div slot="footer">
        <Button @click="isShowModal = false"> {{ $t("cancelText") }}</Button>
        <Button type="primary" :loadding="dropCodeLoading" @click="isDeleteok">
          {{ $t("okText") }}</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getRepayplanlist,
  getRepaydropcode,
  getRepaysms,
  getRepayoption,
} from "@/api/order";
export default {
  name: "",
  components: {},

  data() {
    return {
      Loading: false,
      isShowModal: false,
      showModal: false,
      sendLoading: false,
      smsLoading: false,
      dropCodeLoading: false,
      messageContent: "",
      orderNumber: "",
      loanTypes: "",
      repayType: [],
      request_types: [],
      repayBankList: [],
      repayStoreList: [],
      core_no: "",
      formInfo: {
        mobile: "",
        name: "",
        request_type: "",
        repay_amount: "",
        loanType: "",
      },
      rules: {
        mobile: [
          {
            required: true,
            type: "number",
            message:
              this.$t("selectPrefix") + this.$t("repayCharge.repay_method"),
            trigger: "change",
          },
        ],

        request_type: [
          {
            required: true,
            message:
            this.$t("selectPrefix") + this.$t("repayCharge.request_type"),
             type: "number",
            trigger: "change",
          },
        ],
        loanType: [
          {
            required: true,
            message:
              this.$t("selectPrefix") + this.$t("repayCharge.bank_store"),
            type: "string",
            trigger: "blur",
          },
        ],
        repay_amount: [
          {
            required: true,
            message:
              this.$t("inputPrefix") + this.$t("repayCharge.repay_amount"),
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
        name: [{ required: true, message: "Silakan pilih toko serba ada", trigger: "change" }],
      },
      tableData: [],
      paymentHistory: [
        {
          title: this.$t("repayCharge.periodNo"),
          key: "periodNo",
          align: "center",
          minWidth: 140,
          fixed: "left",
        },
        {
          title: this.$t("repayCharge.dueTime"),
          key: "dueTime",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("repayCharge.successTime"),
          key: "successTime",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("repayCharge.shouldPrincipal"),
          key: "shouldPrincipal",
          align: "center",
          minWidth: 150,
        },
        {
          title: this.$t("repayCharge.shouldOverdue"),
          key: "shouldOverdue",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("repayCharge.shouldAll"),
          key: "shouldAll",
          align: "center",
          minWidth: 140,
        },
        {
          title: this.$t("repayCharge.payedAll"),
          key: "payedAll",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("repayCharge.needAll"),
          key: "needAll",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("repayCharge.status"),
          key: "status",
          align: "center",
          minWidth: 120,
        },
        {
          title: this.$t("repayCharge.overdueDay"),
          key: "overdueDay",
          align: "center",
          minWidth: 120,
        },
        // {
        //   title: this.$t("repayCharge.rolloverFee"),
        //   key: "rolloverFee",
        //   align: "center",
        //   minWidth: 120,
        // },
      ],
    };
  },

  async created() {
    
  },

  computed: {},

  mounted() {},

  methods: {
    handleUpdateTable() {
      this.Loading = true;
      // console.log('begin');
      getRepayplanlist({ order_no: this.orderNumber }, (res) => {
        this.Loading = false;
        if (res.code == 0) {
          this.tableData = res.data;
          this._getRepayoption(this.orderNumber);
        } else {
          this.showModal = false;
          this.$Message.error(res.msg);
        }
      });
      this.messageContent = "";
    },

    _getRepayoption(order_no) {
      getRepayoption({ order_no: order_no }, (res) => {
        if (res.code == 0) {
          this.repayBankList = res.data.repay_code.repay_bank_list;
          this.repayStoreList = res.data.repay_code.repay_store_list;
          this.repayType = res.data.repay_type;
          this.lotAmount = res.data.expected_amount_range;
          this.request_types = res.data.request_type;
          this.showModal = true;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    changeloanType(status) {
      if (status === 1) {
        this.loanTypes = this.repayBankList;
      } else if (status === 2) {
        this.loanTypes = this.repayStoreList;
      }
    },

    getItemName(status) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.smsLoading = true;
          let data = {
            repay_amount: this.formInfo.repay_amount,
            request_type: this.formInfo.request_type,
            repay_type: this.formInfo.mobile,
            repay_code: this.formInfo.loanType,
            order_no: this.orderNumber,
            for_review: 200,
          };
          if (this.formInfo.request_type == 400) {
            if (
              Number(this.formInfo.repay_amount) >
                Number(this.lotAmount.max_amount) ||
              Number(this.formInfo.repay_amount) <
                Number(this.lotAmount.min_amount)
            ) {
              this.smsLoading = false;
              this.$Message.error({
                content:
                  this.$t("repayCharge.repayAmount") +
                  this.lotAmount.min_amount +
                  "~" +
                  this.lotAmount.max_amount,
                duration: 3,
              });
              return
            }
          }
            getRepaysms(
              data,
              (res) => {
                //   this.handleUpdateTable();
                if (res.code == 0) {
                  this.smsLoading = false;
                  this.messageContent = res.data.sms_content;
                } else {
                  this.smsLoading = false;
                  this.$Message.error(res.msg);
                }
              },
              (error) => {
                this.smsLoading = false;
              }
            );
          
        }
      });
    },

    reimbursementCancel() {
      this.showModal = false;
      this.isShowModal = false;
    },
    dropCodeModel() {
      this.isShowModal = true;
    },

    reimbursementOperate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sendLoading = true;
          // console.log(valid, 888);
          let data = {
            request_type: this.formInfo.request_type,
            repay_amount: this.formInfo.repay_amount,
            repay_type: this.formInfo.mobile,
            repay_code: this.formInfo.loanType,

            order_no: this.orderNumber,

            for_review: 100,
          };
          if (this.formInfo.request_type == 400) {
            if (
              Number(this.formInfo.repay_amount) >
                Number(this.lotAmount.max_amount) ||
              Number(this.formInfo.repay_amount) <
                Number(this.lotAmount.min_amount)
            ) {
              this.sendLoading = false;
              this.$Message.error({
                content:
                  this.$t("repayCharge.repayAmount") +
                  this.lotAmount.min_amount +
                  "~" +
                  this.lotAmount.max_amount,
                duration: 3,
              });
              return
            }
          } 
            getRepaysms(data, (res) => {
              if (res.code === 0) {
                this.showModal = false;
                this.$Message.success(res.msg);
                // this.handleUpdateTable();
              }
              this.sendLoading = false;
            });
          
        }
      });
    },

    isDeleteok() {
      this.dropCodeLoading = true;
      getRepaydropcode(
        {
          order_no: this.orderNumber,
        },
        (res) => {
          if (res.code == 0) {
            this.dropCodeLoading = false;
            this.$Message.success(res.msg);
            this.isShowModal = false;
            this.showModal = false;
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
    },

    modalVisibleChange() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
<style lang='less' scoped>
.model {
  margin-top: 30px;
  width: 700px;
  border: 1px solid #ccc;
  padding: 20px;
  .footer {
    text-align: right;
  }
}
</style>
