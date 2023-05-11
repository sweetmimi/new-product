<!-- zys -->
<template>
  <div class="myhome">
    <div class="home">
      <Row>
        <Col span="5" class="grid-content bg-purple rightline">
          <p class="p1">{{ $t("home.sisaDana") }}</p>
          <p class="p2" style="color: #2f6bff;"> {{ cardData.sisaDana }}</p>
          <Button
            type="primary"
            @click="withdraw"
            shape="circle"
            size="small"
            :loading="loading.withdraw"
            >{{ $t("home.withdraw") }}</Button
          >
        </Col>
        <Col span="4" class="grid-content bg-purple rightline">
          <p class="p1">{{ $t("home.waitingRepayNum") }}</p>
          <p class="p2" style="color: #ff7013;"> {{ cardData.waitingRepayNum }}</p>
        </Col>
        <Col span="5" class="grid-content bg-purple rightline">
          <p class="p1">{{ $t("home.waitingRepayAmount") }}</p>
          <p class="p2" style="color: #8060cc;"> {{ cardData.waitingRepayAmount }}</p>
        </Col>
        <Col span="5" class="grid-content bg-purple rightline">
          <p class="p1">{{ $t("home.totalDana") }}</p>
          <p class="p2" style="color: #00cc;"> {{ cardData.totalDana }}</p>
        </Col>
        <Col span="5" class="grid-content bg-purple">
          <p class="p1">{{ $t("home.kodeRdl") }}</p>
          <p class="p2" style="color: #68d200;"> {{ cardData.kodeRdl }}</p>
          <!-- <Button
            v-if="showgetPaycode"
            type="primary"
            @click="getPaycode"
            shape="circle"
            size="small"
            :loading="loading.paycode"
            >{{ $t("home.getCode") }}</Button
          > -->
        </Col>
      </Row>
    </div>
    <!-- <Table
      border
      :data="tableData"
      :columns="tableDefine"
      :loading="loading.tableLoading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size="18" class="spin-icon"></Icon>
        <div>{{ $t("loadingText") }}</div>
      </Spin>
    </Table>
    <Page
      :total="pageCount"
      :current.sync="page"
      :page-size="size"
      v-if="pageCount > size"
      class-name="m-pagination"
      show-total
      @on-change="handleUpdateTable"
      show-elevator
      >{{ $t("pageSlot.total") }} {{ pageCount }}
      {{ $t("pageSlot.count") }}</Page
    > -->

    <Modal v-model="modal_withdraw" center :title="$t('home.withdrawTitle')">
      <Form
        :model="formInfo"
        ref="form"
        :label-width="120"
        :rules="rules"
        class="allModel"
      >
        <!-- <FormItem
          :label="$t('home.userInfo.bankType')"

          prop="account_code"
        >
          <Select
            v-model="formInfo.account_code"
            :placeholder="`${$t('selectPrefix')}${$t(
              'home.userInfo.bankCode'
            )}`"
            autocomplete="off"
          >
            <Option
              :value="item.key"
              v-for="(item, index) in bankList"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem> -->

        <!-- <FormItem
          :label="$t('home.userInfo.bankCode')"
          prop="account_number"

        >
          <Input
            v-model="formInfo.account_number"
            :placeholder="`${$t('inputPrefix')}${$t(
              'home.userInfo.bankCode'
            )}`"
            autocomplete="off"
          />
        </FormItem> -->
        <FormItem :label="$t('home.userInfo.bankType')" >
          <span>BNI</span>
        </FormItem>
        <FormItem :label="$t('home.userInfo.bankCode')" >
          <span>7770066677</span>
        </FormItem>
        <FormItem :label="$t('home.userInfo.bankpeopleName')" >
          <span>Hotwind Globe Pte, Ltd</span>
        </FormItem>

        <FormItem :label="$t('home.userInfo.amount')" prop="amount">
          <Input
            v-model="formInfo.amount"
            :placeholder="`${$t('inputPrefix')}${$t('home.userInfo.amount')}`"
            autocomplete="off"
          />
        </FormItem>
        <!-- <FormItem
          :label="$t('home.userInfo.vcode')"
          prop="v_code"

        >
          <Input
            style="width: 50%;"
            v-model="formInfo.v_code"
            :placeholder="`${$t('inputPrefix')}${$t(
              'home.userInfo.vcode'
            )}`"
            autocomplete="off"
          />
          <Button
          style="marginLeft:20px"
            type="primary"
            @click="getVcode"
            shape="circle"
            size="small"
            :loading="loading.vcode"
            >{{ $t("home.getVcode") }}</Button
          >
        </FormItem> -->
      </Form>
      <div slot="footer" class="footer">
        <Button @click="cancel('form')" align="center">{{
          $t("cancelText")
        }}</Button>
        <Button
          type="success"
          align="center"
          :loading="loading.subloading"
          @click="subWithdraw"
          >{{ $t("home.userInfo.okText") }}</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { formatMoney } from "@/common/js/common";
import { createva, getva, dashboardShow, withdraw } from "@/api/user.js";
export default {
  name: "",
  components: {},

  data() {
    return {
      page: 1,
      size: 10,
      pageCount: 0,
      count: 0,
      modal_withdraw: false,
      showgetPaycode: false,
      loading: {
        tableLoading: false,
        withdraw: false,
        paycode: false,
        vcode: false,
        subloading: false,
      },
      cardData: {
        loanAmount: "",
        orderNumber: "",
        paycode: "",
        profit: "",
      },
      formInfo: {
        amount: "",
        account_code: "",
        account_number: "",
        v_code: "",
      },
      dashboardData: "",
      bankList: [
        {
          key: "BCA",
          name: "Bank Central Asia (BCA)",
        },
        {
          key: "BNI",
          name: "Bank Negara Indonesia (BNI)",
        },
        {
          key: "BOC",
          name: "Bank of China (BOC)",
        },
        {
          key: "BRI",
          name: "Bank Rakyat Indonesia (BRI)",
        },
        {
          key: "BTN",
          name: "Bank Tabungan Negara (BTN)",
        },
        {
          key: "BUKOPIN",
          name: "Bank Bukopin",
        },
        {
          key: "CIMB",
          name: "Bank CIMB Niaga",
        },
        {
          key: "CITIBANK",
          name: "Citibank",
        },
        {
          key: "DANAMON",
          name: "Bank Danamon",
        },
        {
          key: "ICBC",
          name: "Bank ICBC Indonesia",
        },
        {
          key: "MANDIRI",
          name: "Bank Mandiri",
        },
        {
          key: "MASPION",
          name: "Bank Maspion Indonesia",
        },
        {
          key: "MAYAPADA",
          name: "Bank Mayapada International",
        },
        {
          key: "MAYBANK",
          name: "Bank Maybank",
        },
        {
          key: "MEGA",
          name: "Bank Mega",
        },
        {
          key: "OCBC",
          name: "Bank OCBC NISP",
        },
        {
          key: "PANIN",
          name: "Bank Panin",
        },
        {
          key: "PERMATA",
          name: "Bank Permata",
        },
        {
          key: "SINARMAS",
          name: "Sinarmas",
        },
        {
          key: "UOB",
          name: "Bank UOB Indonesia",
        },
      ],
      tableData: [],
      rowClassName: [],
      tableDefine: [
        {
          title: this.$t("home.tableHader.time"),
          align: "center",
          key: "update_time",
          minWidth: 150,
        },
        {
          title: this.$t("home.tableHader.type"),
          align: "center",
          key: "type",
          minWidth: 100,
        },
        {
          title: this.$t("home.tableHader.amount"),
          align: "center",
          key: "amount",
          minWidth: 100,
        },
        {
          title: this.$t("home.tableHader.status"),
          align: "center",
          key: "status",
          minWidth: 100,
        },
      ],
      rules: {
        account_code: [
          {
            required: true,
            message: `${this.$t("selectPrefix")}${this.$t(
              "home.userInfo.bankType"
            )}`,
            trigger: "change",
          },
        ],
        amount: [
          {
            required: true,
            message: `${this.$t("inputPrefix")}${this.$t(
              "home.userInfo.amount"
            )}`,
            trigger: "blur",
          },
        ],
        v_code: [
          {
            required: true,
            message: `${this.$t("inputPrefix")}${this.$t(
              "home.userInfo.vcode"
            )}`,
            trigger: "blur",
          },
        ],
        account_number: [
          {
            required: true,
            message: `${this.$t("inputPrefix")}${this.$t(
              "home.userInfo.bankCode"
            )}`,
            trigger: "blur",
          },
        ],
      },
    };
  },

  async created() {
    this.getdashboardShow();
    // this.get_va();
  },

  computed: {},

  mounted() {},

  methods: {
    get_va() {
      getva({}, (res) => {
        this.cardData.paycode = res.data.va;
        if (!res.data.va) {
          this.showgetPaycode = true;
        }
      });
    },
    getdashboardShow() {
      this.loading.tableLoading = true;
      dashboardShow({ page: this.page }, (res) => {
        if (res.status == 0) {
          this.loading.tableLoading = false;
          this.cardData = res.data;

          this.tableData = res.data.withdrawandrecharge;
          if(this.tableData){
            this.tableData.forEach((item,index)=>{
              if(item.type==1){
                item.type=this.$t(
              "home.recharge"
            )
              }else{
                item.type=this.$t(
              "home.withdraw"
            )
              }
            })
          }
          this.pageCount = res.data.total;
        }
      });
    },
    handleUpdateTable(pageIndex) {
      this.page = pageIndex || 1;
      this.getdashboardShow();
    },
    withdraw() {
      this.modal_withdraw = true;
    },
    subWithdraw() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading.subloading = true;
          setTimeout(() => {
             this.loading.subloading = false;
             this.$Message.success(this.$t('home.userInfo.submitSuccess'));
             this.modal_withdraw = false;
          }, 1500);

          // this.loading.subloading = true;
          // withdraw(
          //   {
          //     mid: localStorage.getItem("mid"),
          //     amount: this.formInfo.amount,
          //   },
          //   (res) => {
          //     if (res.status == 0) {
          //       this.loading.subloading = false;
          //       this.modal_withdraw = false;
          //       this.getdashboardShow();
          //       this.$Message.success(res.msg);
          //     }
          //   }
          // );
        }
      });
    },
    cancel(name) {
      this.$refs[name].resetFields();
      this.modal_withdraw = false;
    },
    getVcode() {
      this.loading.vcode = true;
    },
    getPaycode() {
      createva({}, (res) => {
        this.cardData.paycode = res.data.account_number;
      });
    },
  },
};
</script>
<style lang='less' scoped>
/deep/ .ivu-form-item {
  margin-bottom: 25px;
}
.home {
  width: 100%;
  height: 160px;
  background: #fff;
  box-shadow: 0px 0px 7px 7px rgba(214, 214, 214, 0.5);
  border-radius: 5px;
  margin-bottom: 20px;
}
.home:hover {
  // box-shadow: 5px 5px 7px 7px rgba(214, 214, 214, 0.5);
  transform: scale(1.005);
}
.grid-content {
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  height: 120px;
  margin: 15px 0;
  justify-content: center;
  align-items: center;

  .p1 {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .p2 {
    margin-bottom: 10px;
    font-size: 20px;

    font-family: Arial, Helvetica, sans-serif;
  }
}
.rightline {
  border-right: 1px solid #e9e9ed;
}
</style>
