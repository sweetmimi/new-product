<template>
  <div class="m-login">
    <!-- <div class="desc">
      <h2 class="title">{{ $t('title')}}</h2>
    </div> -->
    <Form ref="loginForm" :rules="validationLogin" :model="formInfo" @keydown.enter.native="submitLogin('loginForm')">
      <h3 class="form-title">{{ $t("welcomelogin") }}</h3>
      <FormItem prop="mobile" >
        <Input clearable :placeholder="`${$t('inputPrefix')}${$t('login.account')}`" v-model="formInfo.mobile" />
      </FormItem>
      <FormItem prop="password" >
        <Input clearable type="password" :placeholder="`${$t('inputPrefix')}${$t('login.password')}`" v-model="formInfo.password" />
      </FormItem>
      <FormItem prop="v_code" >
       <div class="vcode">
          <Input  class="short" :placeholder="`${$t('inputPrefix')}${$t('login.vcode')}`" v-model="formInfo.v_code"  />
           <div class="imgbox">
            <img v-if="imgUrl" @click="_getVcode" width="100%" :src="imgUrl" />
            <Icon
             @click="_getVcode"
              v-else
              type="ios-loading"
              style="font-size: 25px; color: #ccc"
            />
          </div>

       </div>

      </FormItem>

      <FormItem >
        <Select
          clearable
          transfer
          @on-change="chooseLanguage"
          v-model="lang"
          :placeholder="`${$t('selectPrefix')}`">

          <Option
            value="id-ID">
              Bahasa
          </Option>
        </Select>
      </FormItem>
      <FormItem>
        <div class="remember">
          <Checkbox v-model="remember">{{$t('login.remember')}}</Checkbox>
        </div>
      </FormItem>

        <Button type="primary" long class="login-btn"  @click.native="submitLogin('loginForm')" :loading="btnLoading">{{$t('login.buttonText')}}</Button>

    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { login, getVcode } from '@/api/site'
@Component
export default class Login extends Vue {
  btnLoading = false
  remember = false
  imgUrl = ''
  formInfo: any = {
    mobile: '',
    password: '',
    v_code: ''
  }
  lang = 'id-ID'
  validationLogin = {}
  validateUserName = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(`${this.$t('inputPrefix')}${this.$t('login.account')}`))
    } else {
      callback()
    }
  }
  validateUserPassword = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(`${this.$t('inputPrefix')}${this.$t('login.password')}`))
    } else {
      callback()
    }
  }
  validateVcode = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(`${this.$t('inputPrefix')}${this.$t('login.vcode')}`))
    } else {
      callback()
    }
  }
  created() {
    localStorage.setItem('lang', 'id-ID')
    this.lang = `${localStorage.getItem('lang')}`

    this.validationLogin = {
      mobile: { validator: this.validateUserName, trigger: 'blur' },
      password: { validator: this.validateUserPassword, trigger: 'blur' },
      v_code: { validator: this.validateVcode, trigger: 'blur' }
    }
    this._getVcode()
    this._getLoginInfo()

  }
  submitLogin(): void {
    const myForm: any = this.$refs.loginForm
    myForm.validate((valid: any) => {
      if (valid) {
        this.btnLoading = true
        login(this.formInfo, (res: any) => {
          if (res.code === 0) {

              localStorage.setItem('realName', res.data.user_name)
              localStorage.setItem('role', res.data.user_role);
              localStorage.setItem('mid', res.data.mid)
              if (this.remember) {
                localStorage.setItem('loginInfo', [this.formInfo.mobile, this.formInfo.password].join('_'))
              } else {
                localStorage.removeItem('loginInfo')
              }
              this.$Message.success({
                content: `${this.$t('loginSuccess')}`,
                onClose: (): void => {
                 window.location.href = '/#/home'

                // this.$router.push({path:'/home',query: {mid:res.data.mid}})
                }
              })
          } else{
            this.$Message.error(res.msg)
            this.btnLoading = false
            this._getVcode()
          }

        })
      }
    })
  }
  chooseLanguage(value: any): void {
    localStorage.setItem('lang', value)
    window.location.reload()
  }
  _getLoginInfo(): void {
    const loginInfo = localStorage.getItem('loginInfo')
    if (loginInfo) {
      this.remember = true
      this.formInfo.mobile = loginInfo.split('_')[0]
      this.formInfo.password = loginInfo.split('_')[1]
    }
  }
  _getVcode(): void {
    this.formInfo.v_code=""
    getVcode((res: any) => {
      if (+res.code === 0) {
       this.imgUrl ="/test/" + res.data.verifyCode
      }
    })
  }
}
</script>

<style lang="scss" scoped>
/deep/.ivu-form-item-content{
  text-align: left;
}
/deep/ .ivu-input {
  height: 40px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  color: #999;
}
/deep/ .ivu-select-single .ivu-select-selection {
  height: 40px;
}
/deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
/deep/ .ivu-checkbox-inner {
  border-color: #007cff;
}
.m-login {
  height: 100%;
  width: 100%;
  position: relative;
  background: url(../assets/login.png);

  background-size: 100%;
  color: hsla(0, 0%, 100%, 0.6);

  .remember {
    color: #515a6e;
    border-color: #007cff;
    text-align: left;
  }
  .form-title {
    text-align: left;
    font-weight: normal;
    color: #071a3f;
    font-size: 20px;
    padding: 1px 0 15px 0;
  }
  .vcode {
    display: inline-block;
    width: 100%;
    position: relative;
    vertical-align: middle;
    line-height: normal;
    position: relative;

    .imgbox {
      position: absolute;
      right: 0px;
      display: inline-block;
      height: 40px;
      width: 100px;
      line-height: 40px;
      cursor: pointer;
    }
    img {
      border-left: 1px solid #ccc;
    }
  }

  .desc {
    position: absolute;
    top: 10%;
    left: 20%;
    right: 10%;

    .title {
      color: #000;
      text-align: left;
      font-size: 50px;
    }

    .sub-title {
      font-size: 45px;
    }
  }

  .ivu-form {
    position: absolute;
    top: 20%;
    right: 10%;
    padding: 15px 20px;
    width: 370px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 5px;
    font-size: 14px;
  }

  .login-btn {
    height: 40px;
    font-size: 16px;
    background-color: #007cff;
    border-color: #007cff;
  }

  .copy-right {
    position: absolute;
    bottom: -32px;
    width: 100%;
    color: #2b3137;
  }

  .ivu-form-item {
    margin-bottom: 20px;
  }
}

.ivu-select,
.ivu-input-wrapper {
  display: inline-block;
  width: 100% !important;
  position: relative;
  vertical-align: middle;
  line-height: normal;
}
</style>
