<template>
  <div class="m-customerList">
    <h2 class="pipei">{{ $t("userMatching.userMatch") }}</h2>
    <div class="yonghu">
      <Tabs type="card" @on-click="clickTabPane()">
        <TabPane :label="`${$t('userMatching.importWhitelist')}`">

          <Input
            type="textarea"
            v-model="formInline.phone"
            :rows="20"
            @on-change="inputPhone()"
            :placeholder="`${$t('userMatching.export8')}`"
            clearable
            style="width:100%"
          />
          <p>{{$t('userMatching.note')}}</p>
          <div class="btn">
            <Button
              class="Button"
              type="primary"
              :loading="loading"
              @click="btnloading()"
              >{{ $t("userMatching.importWhitelist") }}</Button
            >
            <!-- <Button class="Button" type="primary" @click="jupPage()">{{
              $t("userMatching.rechargeWhitelist")
            }}</Button> -->
          </div>
        </TabPane>
        <TabPane :label="`${$t('userMatching.blacklist')}`">
          <Input
            type="textarea"
            v-model="formInline.phone"
            :rows="20"
            @on-change="inputPhone()"
            :placeholder="`${$t('userMatching.export8')}`"
            clearable
            style="width:100%"
          />
          <p>{{$t('userMatching.deleteblack')}}</p>
          <div class="btn">
            <Button
              class="Button"
              type="primary"
              @click="handleSubmit('high_quality_users')"
              >{{ $t("userMatching.importPhone") }}</Button
            >
          </div>
        </TabPane>
        <TabPane :label="`${$t('userMatching.userFix')}`">
          <Input
            type="textarea"
            v-model="formInline.phone"
            :rows="20"
            @on-change="inputPhone()"
           :placeholder="`${$t('userMatching.export8')}`"
            clearable
            style="width:100%"
          />
          <p>{{$t('userMatching.userfixedTitle')}}</p>
          <div class="btn">
            <Button
              class="Button"
              type="primary"
              @click="handleSubmit('import_userFix')"
              >{{ $t("userMatching.importPhone") }}</Button
            >
          </div>
        </TabPane>
      </Tabs>
      <!-- <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="phone" class="shouji">
          <Input type="textarea" v-model="formInline.phone" :rows="20" @on-change="inputPhone()" :placeholder="`${$t('userMatching.inputPhone')}` "
            clearable style="width:200px"/>
          <Button class="Button" type="primary"   @click="handleSubmit('register')">{{ $t('userMatching.exportRegUser') }}</Button>
             <Button  class="Button" type="primary"   @click="handleSubmit('income')">{{ $t('userMatching.exportUser') }}</Button>
             <Button  class="Button" type="primary"   @click="handleSubmit('loan')">{{ $t('userMatching.exportMoneyUser') }}</Button>
          <Button class="Button" type="primary"
            @click="handleSubmit('high_quality_users')">{{ $t("userMatching.blacklist") }}</Button>
          <Button class="Button" type="primary" :loading="loading"  @click="btnloading()" >{{ $t("userMatching.importWhitelist") }}</Button>
           <Button class="Button" type="primary"   @click="jupPage()" >{{ $t("userMatching.rechargeWhitelist") }}</Button>
          <Button class="Button" type="error"
            @click="handleSubmit('import_userFix')">{{ $t("userMatching.userFix") }}</Button>
        </FormItem>
      </Form> -->

    
    </div>
    <Spin fix v-show="isSpinShow">
      <Icon type="ios-loading" size="40" class="demo-spin-icon-load"></Icon>
      <div style="font-size:22px">exporting</div>
    </Spin>
  </div>
</template>

<script>
import { Matching, Fxiuser } from "@/api/customer";
import axios from "axios";
import { export_json_to_excel } from "@/vendor/Export2Excel";

export default {
  data() {
    return {
      isSpinShow: false,
      loading: false,
      btnDisabled: false,
      data: "",
      whitelistName: "",
      falsePhones: "",
      truePhones: "",
      formInline: {
        phone: ""
      },
      cuowu: false,
      ruleInline: {
        phone: [
          {
            required: true,
            
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    clickTabPane(){
      this.formInline.phone=""
    },
    inputPhone() {
      var re = /^8[0-9]{8,13}$/;
      let user_phones = (this.formInline.phone + "")
        .replace(/\s+/gi, ",")
        .split(",");
      const noRulePhones = [];
      const isRulePhones = [];
      user_phones.forEach((i, v, user_phones) => {
        if (re.test(i)) {
          let bool = user_phones.indexOf(i, v + 1);
          if (bool === -1) {
            isRulePhones.push(i);
          }
        } else {
          noRulePhones.push(i);
        }
      });



      this.truePhones = isRulePhones.toString();
      this.falsePhones = noRulePhones.toString();
    },
    btnloading() {
       if(this.formInline.phone==""){
        this.$Message.warning(this.$t('inputPhone'));
        
      }
//       else if (this.whitelistName==""){

//       }
      else{
        this.handleSubmit("import_whitelist");
         
      }
     
    },
    handleSubmit(name) {
      if(this.formInline.phone==""){
       this.$Message.warning(this.$t('inputPhone'));
        return
      }
      let data = {
        export_type: name,
        user_phones: this.truePhones,
        memo_name: this.whitelistName
      };

      if (name == "import_whitelist") {
        this.isSpinShow = true;
        Matching(data, res => {
          if (+res.code == "0") {
            this.isSpinShow = false;

            if (this.falsePhones == "") {
              this.$Message.success("Impor berhasil");
              this.formInline.phone = "";
              this.whitelistName="";
            } else {
              this.$Message.warning("Bagian dari impor berhasil, format angka berikut tidak cocok:");
              this.formInline.phone = this.falsePhones.replace(/,/g, "\n");
            }
            
          }
          if(+res.code == "40"){
             this.isSpinShow = false;
            this.$Message.error("Nomor tidak cocok, impor gagal");
          }else{
           this.isSpinShow = false;
          }

        });
      } else if (name == "import_userFix") {
        Fxiuser(data, res => {
          if (+res.code == "0") {
            this.formInline.phone = "";
            this.$Message.success("Berhasil diperbaiki");
          } else {
            this.$Message.error("Format angka tidak cocok");
          }
        });
      } else {
        Matching(data, res => {
          if (+res.code == "0") {
            let data = res.data;

            if (data.hasOwnProperty("data")) {
              console.log(data.hasOwnProperty("data"));
              if (res.data.data instanceof Object) {
                if (res.data.data.length == 0) {
                  this.$Message.info("tidak ada pengguna yang cocok");
                } else {
                  let filter = Object.keys(res.data.data[0]);
                  const tHeader = res.data.header;

                  const filterVal = filter;
                  const list = res.data.data;
                  const data = this.formatJson(filterVal, list);
                  export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "meja ekspor"
                  });
                  this.$Message.success("ekspor sukses");
                  this.formInline.phone = this.falsePhones.replace(/,/g, "\n");
                  this.cuowu = false;
                }
              } else {
                this.$Message.info("tidak ada pengguna yang cocok");
              }
            } else if (data.data == null) {
              this.$Message.info("tidak ada pengguna yang cocok");
            }
          } else if (+res.code == "4001") {
            this.$Message.error({
              duration: 10,
              content: res.data.num 
              //  content:res.data.mobile
            });
            this.cuowu = true;
          } else if (+res.code == "4002") {
            this.$Message.error("Jumlah akun melebihi batas maksimum 6000)");
          } else {
            this.$Message.error("Gagal, format angka tidak cocok");
            this.formInline.phone = this.falsePhones.replace(/,/g, "\n");
          }
        });
      }
    },
    jupPage() {
      let routeData = this.$router.push({
        name: "whitelistRecharge",
        params: {}
      });
     
    }
  }
};
</script>

<style scoped lang="scss">

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ivu-spin-fix {
  position: fixed;
}
.pipei {
  font-size: 24px;
  padding-bottom: 14px;
}

.yonghu {
  .btn {
    text-align: center;
    margin-top: 30px;
    .Button {
      margin: 10px;
    }
  }

  textarea.ivu-input {
    min-height: 320px;

    .Button {
      margin-left: 20px;

      bottom: 0px;
    }
  }

  ul {
    margin-left: 10px;
    margin-bottom: 10px;
    list-style-type: none;
    border: 1px solid #f66a68;
    padding-left: 10px;
    font-size: 18px;

    li {
      padding-top: 3px;
    }
  }
}
</style>
