<template>
  <div>
    <h2>Transfer konfigurasi akun</h2>

    <div class="m-accountsTable">
      <div class="accountsTable" v-for="(item, index) in accounts" :key="index">
        <span class="accountsTable_mid">
          <span>MID</span>
          <span>{{item.mid}}</span>
        </span>
        <p>
          <span>bank</span>
          <span>{{item.bank_name}}</span>
        </p>
        <p>
          <span>acount</span>
          <span>{{item.open_bank}}</span>
        </p>
        <p>
          <span>bank account</span>
          <span>{{item.bank_account}}</span>
        </p>
        <div class="zhuanButton">
          <Button type="primary" @click="Girokonto(index)" style="width:100px;">edit</Button>
        </div>
      </div>
    </div>

    <Alert v-show="accounts.length == 0">{{ $t('noData') }}</Alert>

    <Modal v-model="addRouteModal" title="Transfer konfigurasi akun">
      <Form
        ref="newRouteInModal"
        :model="newRouteInModal"
        :rules="routeValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem prop="bank_name" label="bank">
          <Input v-model="newRouteInModal.bank_name" :autofocus="true"></Input>
        </FormItem>
        <FormItem prop="open_bank" label="acount">
          <Input v-model="newRouteInModal.open_bank"></Input>
        </FormItem>
        <FormItem prop="bank_account" label="bank account">
          <Input v-model="newRouteInModal.bank_account"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleReset('newRouteInModal')">cancel</Button>
        <Button type="primary" @click="addRouteModalOnOk('newRouteInModal')">save</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { gettransferbanklist, changerransferbankinfo } from "../../api/loan";
import { validateSequence } from "../../common/js/until";
export default {
  data() {
    return {
      accounts: [],
      addRouteModal: false,

      newRouteInModal: {
        bank_name: "",
        open_bank: "",
        bank_account: "",
        mid: "",
        id: ""
      },
      routeValidate: {
        bank_name: [
          { required: true, message: "Bank tidak boleh kosong", trigger: "blur" }
        ],
        open_bank: [
          { required: true, message: "Nama akun tidak boleh kosong", trigger: "blur" }
        ],
        bank_account: [
          { required: true, validator: validateSequence, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this._getList();
  },
  methods: {
    _getList() {
      gettransferbanklist({}, res => {
        if (+res.code == 0) {
          this.accounts = res.data.list || [];
          console.log(res.data ,999)
          this.loading = true;

          this.showTable = true;
        } else {
          this.showTable = false;
        }
      });
    },

    Girokonto(index) {

      this.newRouteInModal.bank_name = this.accounts[index].bank_name;
      this.newRouteInModal.open_bank = this.accounts[index].open_bank;
      this.newRouteInModal.bank_account = this.accounts[index].bank_account;
      this.newRouteInModal.mid = this.accounts[index].mid;
      this.newRouteInModal.id = this.accounts[index].id;

      this.addRouteModal = true;
    },

    handleReset(name) {
      this.addRouteModal = false;
    },

    addRouteModalOnOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          changerransferbankinfo(this.newRouteInModal, res => {
            if (+res.code == 0) {
              this.$Message.success("Dikirim dengan sukses");
              this._getList();
              this.addRouteModal = false;
            } else {
              this.$Message.success(res.msg);
            }
          });
        } else {
          this.addRouteModal = true;
          this.$Message.error("Mohon diisi dengan lengkap");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.accountsTable {
  display: inline-block;
  width: 355px;
  height: 320px;
  padding-top: 20px;
  padding-left: 20px;
  border: 1px solid #000;
  border-radius: 10px;
  margin-right: 30px;
  margin-top: 20px;
  .accountsTable_mid {
    font-weight: 900;
    font-size: 16px;
  }
  p {
    padding-top: 30px;
    font-size: 16px;
    span {
      display: inline-block;
    }
    span:first-child {
      width: 100px;
      text-align: right;
      font-weight: 900;
    }
    span:last-child {
      padding-left: 30px;
    }
  }
}

.zhuanButton {
  padding-top: 45px;
  padding-left: 85px;
  display: inline-block;
}
</style>
