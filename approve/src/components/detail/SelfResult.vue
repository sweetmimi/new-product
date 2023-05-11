<template>
  <div id="selfResult" class="m-selfResult">
    <Form :label-width="80">
      <FormItem
        :label="$t('approvalTask.tableBlock.contract')"
        v-if="isRecheck == 1"
      >
        <Button type="success" style="margin-left: 8px"  @click="viewcontract">{{
          $t("approvalTask.tableBlock.viewcontract")
        }}</Button>
        <Button
          type="info"
          style="margin-left: 8px"
          @click="viewSign"
          :loading="SignLoading"
          >{{ $t("approvalTask.tableBlock.Sign") }}</Button
        >
         <Button
          type="info"
          style="margin-left: 8px"
          @click="viewHeTtong"
          :loading="hetongLoading"
          >Surat Kuasa</Button
        >
      </FormItem>
      <FormItem
      v-if="lender != 1"
        :label="
          $t('approvalDetail.approvalConclusionHistory.approvalConclusion')
        "
      >
        <RadioGroup @on-change="changeResult" v-model="result">
          <Radio
            :label="item.id"
            v-for="(item, index) in lender == 1
              ? $t('approvalDetail.result.lenderConclusion')
              : $t('approvalDetail.result.conclusion')"
            :key="index"
            >{{ item.label }}</Radio
          >
        </RadioGroup>
      </FormItem>
      <!-- <FormItem v-if="isShowReason" :label="$t('approvalDetail.approvalConclusionHistory.refusalReason.title')">
        <CheckboxGroup v-model="arrReason" v-for="(item, index) in $t('approvalDetail.result.rejectReson')" :key="index">
          <fieldset class="fieldset">
          <legend class="legend">{{ item.title }}</legend>
            <Checkbox :label="item.id" v-for="(item, index) in item.value" :key="index">{{item.label}}</Checkbox>
          </fieldset>
        </CheckboxGroup>
      </FormItem> -->
      <FormItem
        v-if="lender == 1"
        :label="$t('approvalDetail.result.insuranceTitle')"
      >
        <RadioGroup v-model="insurance">
          <Radio :label="2">{{
            $t("approvalDetail.result.isInsurance")
          }}</Radio>
          <Radio :label="1">{{
            $t("approvalDetail.result.unInsurance")
          }}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem   v-if="lender != 1" :label="$t('approvalDetail.approvalConclusionHistory.remarks')">
        <Input
          v-model="remarks"
          style="width: 300px"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          :placeholder="`${$t('inputPrefix')}${$t(
            'approvalDetail.approvalConclusionHistory.remarks'
          )}`"
        />
      </FormItem>
      <FormItem   >
        <Button type="info" :loading="saveLoading" @click="saveResult">{{
          $t("approvalDetail.approvalConclusionHistory.save")
        }}</Button>
        <Button
          type="success"
          style="margin-left: 8px"
          @click="submitConfirm"
          >{{ $t("approvalDetail.approvalConclusionHistory.commit") }}</Button
        >
        <!-- <Button
          :disabled="btnIsDisable"
          type="success"
          style="margin-left: 8px"
          @click="submitConfirm"
          >{{ $t("approvalDetail.approvalConclusionHistory.commit") }}</Button
        > -->
      </FormItem>
    </Form>
    <Modal
      v-model="SignModal"
      :title="$t('approvalTask.tableBlock.Sign')"
      width="1000"
    >
      <iframe
        :src="signUrl"
        frameborder="0"
        width="100%"
        height="600px"
      ></iframe>
    </Modal>
    <Modal
      v-model="contractModal"
      :title="$t('approvalTask.tableBlock.viewcontract')"
      width="1000"
    >
      <iframe
        :src="contractUrl"
        frameborder="0"
        width="100%"
        height="600px"
      ></iframe>
    </Modal>
  </div>
</template>

<script>
import { getSaveConclusion, saveApprove, genbulksign,getauthorization } from "@/api";
export default {
  name: "selfResult",
  props: {
    approveId: {
      type: String,
    },
  },
  data() {
    return {
      signUrl: "",
      isRecheck: this.$route.query.isRecheck,
      contract: localStorage.getItem("contract"),
      lender: localStorage.getItem("lender"),
      digiSignStatus: localStorage.getItem("digiSignStatus"),
      isShowReason: false,
      saveLoading: false,
      submitLoading: false,
      hetongLoading: false,
      SignLoading: false,
      SignModal: false,
      result: "",
      remarks: "",
      arrReason: ["1"],
      insurance: "",
      btnIsDisable: false,
      contractUrl:'',
      contractModal:false,
    };
  },
  created() {

    this.contract = localStorage.getItem("contract");

  },
  mounted(){
     this.contract=localStorage.getItem("contract");
     if (this.isRecheck == 1 && this.digiSignStatus != 0) {
      this.btnIsDisable = true;
    }
  },
  methods: {
    viewcontract() {
      this.contractModal = true
      this.contractUrl = localStorage.getItem("contract")
      // window.open(localStorage.getItem("contract"));
    },

    viewSign() {
      this.SignLoading = true;
      genbulksign(
        {
          approveId: this.approveId,
        },
        (res) => {
          this.SignLoading = false;
          if (res.status === 0) {
            this.btnIsDisable = false;
            this.SignModal = true;
            this.signUrl = res.data.uri;
          }
        }
      );
    },
    viewHeTtong() {
      this.hetongLoading = true;
      getauthorization(
        {
          approveId: this.approveId,
          type:'check'
        },
        (res) => {
          this.hetongLoading = false;
          if (res.status === 0) {
            window.open(res.data.orderInfo.authorization)
            // this.signUrl = res.data.orderInfo.authorization;
          }else{
            this.$Message.error(res.msg)
          }
        }
      );
    },

    changeResult() {
      if (+this.result === 1 || +this.result === 3) {
        this.arrReason = [];
        this.isShowReason = false;
        if (this.result === 3) {
          this.insurance = "";
        }
      } else {
        (this.arrReason = ["1"]), (this.insurance = "");
        this.isShowReason = true;
      }
    },
    _getSaveConclusion() {

      getSaveConclusion(
        {
          approveId: this.approveId,
        },
        (res) => {
          if (+res.status === 0) {
            this.result = res.data.arrConclusion;
            this.arrReason = res.data.arrFailReason;
            this.remarks = res.data.memo;
            this.isShowReason = +this.result === 2;
          }
        }
      );
    },
    submitConfirm() {
      if (!this.result) {
        this.$Message.error(this.$t("approvalDetail.msgList.examine"));
        return;
      }
      if (+this.result === 2 && !this.arrReason.length) {
        this.$Message.error(this.$t("approvalDetail.msgList.reason"));
        return;
      }
      this.$Modal.confirm({
        content: `<p>${this.$t(
          "approvalDetail.msgList.submitResultConfirm"
        )}</p>`,
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this._submitResult();
          }, 1000);
        },
      });
    },
    saveResult() {
      if (this.lender!=1) {
        this.$Message.error(this.$t("approvalDetail.msgList.examine"));
        return;
      }else{
        this.result=1
      }
      this.saveLoading = true;
      saveApprove(
        {
          approveId: this.approveId,
          saveType: "save",
          conclusion: this.result,
          failReason: this.arrReason,
          memo: this.remarks,
          insurance: this.insurance,
        },
        (res) => {
          this.saveLoading = false;
          switch (+res.status) {
            case 0:
              this.$Message.success(
                this.$t("approvalDetail.msgList.saveSuccess")
              );
              this.$router.push({ name: "tasklist" });
              break;
            case 10001:
              const content = `<p>${this.$t(
                "approvalDetail.msgList.changeOrder"
              )}</p>`;
              this.$Modal.warning({
                content: content,
                onOk: () => {
                  this.$router.push({ name: "tasklist" });
                },
              });
              break;
          }
        }
      );
    },
    _submitResult() {

      this.submitLoading = true;
      saveApprove(
        {
          approveId: this.approveId,
          saveType: "submit",
          conclusion: this.result,
          failReason: this.arrReason,
          memo: this.remarks,
          insurance: this.insurance,
        },
        (res) => {
          this.submitLoading = false;
          switch (+res.status) {
            case 0:
              this.$Message.success(
                this.$t("approvalDetail.msgList.submitSuccess")
              );
              this.$router.push({ name: "tasklist" });
              break;
            case 10001:
              const content = `<p>${this.$t(
                "approvalDetail.msgList.changeOrder"
              )}</p>`;
              this.$Modal.warning({
                content: content,
                onOk: () => {
                  this.$router.push({ name: "tasklist" });
                },
              });
              break;
          }
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
.m-selfResult {
  .fieldset {
    border: 1px solid#dddee1;
    margin: 0 2px;
    padding: 0.35em 1.8em 0.75em;
  }
  .legend {
    padding: 0 0.8rem;
  }
  .warning-text {
    margin-left: 15px;
    font-size: 14px;
    vertical-align: super;
  }
  .footer {
    text-align: center;
    button {
      margin: 0 20px;
    }
  }
}
</style>

