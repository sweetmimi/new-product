<template>
    <div id="login">
      <div class="login-bg-top"></div>
      <div class="login-bg-bottom"></div>
        <div class="m-login">
          <div class="hd">
            <Icon type="log-in"></Icon>
            {{$t('title')}}
          </div>
          <div class="bd">
            <div class="error-info" v-if="errMsg">
              <Alert type="error">{{errMsg}}</Alert>
            </div>
            <input v-model="userName" :placeholder="$t('login.accountPlaceholder')" class="login-input" @focus="hideErrorPop"/>
            <input v-model="password" type="password" :placeholder="$t('login.passwordlaceholder')" class="login-input" @focus="hideErrorPop"/>
            <div class="vcode-input">
              <input v-model="vcode" :placeholder="$t('login.vcodePlaceholder')" class="login-input" @focus="hideErrorPop"/>
              <div class="vcode-box">
                <img :src="vcodeUrl" @click="fetchVcode"/>
              </div>
            </div>
            <!-- <Select
              transfer
              @on-change="chooseLanguage"
              v-model="lang"
              style="margin-top: 10px;width:100%"
              :placeholder="`${$t('selectPrefix')}`">

              <Option
                value="id-ID">
                  Bahasa
              </Option>
            </Select> -->
          </div>
          <div class="ft">
            <Button type="success" long @click="submitLogin"  :loading="loading">{{$t('login.buttonText')}}</Button>
            <!-- <div class="m-copyright">{{$t('copyrightInfo')}}</div> -->
          </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { getVcode, login } from '@/api'
export default {
  data () {
    return {
      userName: '',
      password: '',
      vcode: '',
      errMsg: '',
      vcodeUrl: '',
      lang: 'id-ID',
      loading: false
    }
  },
  methods: {
    fetchVcode () {
      getVcode(null, (res) => {
        const data = res.data
        if (+res.status === 0) {
          // this.vcodeUrl =  data.verifyCode
          // this.vcodeUrl = "test"+ data.verifyCode
          // alert(process.env.NODE_ENV)
           this.vcodeUrl = "/test/" + data.verifyCode
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    submitLogin () {

      if (!this.userName) {
        this.errMsg = this.$t('login.accountPlaceholder')
        return false
      }
      if (!this.password) {
        this.errMsg = this.$t('login.passwordlaceholder')
        return false
      }
      if (!this.vcode) {
        this.errMsg = this.$t('login.vcodePlaceholder')
        return false
      }
      this.loading = true
      login({
        mobile: this.userName,
        password: this.password,
        verifyCode: this.vcode
      }, (res) => {
        this.loading = false
        if (+res.status === 0) {
          this.setUserInfo({
            userName: res.data.userName,
            staffRole: res.data.roleId,

          })
          localStorage.setItem('mid', res.data.mid)
           localStorage.setItem('lender', res.data.lender)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('lender_status', res.data.lender_status)
          let role = res.data.roleId;
          if(/role_approver/.test(role)) {
            this.$router.push({name: 'tasklist'})
            return;
          }
          if(/role_approve_admin/.test(role)) {
            this.$router.push({name: 'approvalList'})
            return;
          }
        } else {
          this.fetchVcode()
        }
      })
    },
    hideErrorPop () {
      if (this.errMsg) {
        this.errMsg = ''
      }
    },
    chooseLanguage(value) {
      localStorage.setItem('lang', value)
      window.location.reload()
    },
    ...mapActions([
      'setUserInfo'
    ])
  },
  created () {
    this.lang = "id-ID"
    // this.lang = "id-ID"
    this.fetchVcode()
    var lett = this;
    document.onkeydown = function(e) {
    var key = window.event.keyCode;
    if (key == 13) {
    lett.submitLogin();
}
  }
}
}
</script>
<style lang="scss" scoped>
.m-copyright{
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -100px;
}
.login-bg-top {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 300px;
  background: url(../assets/bottom-bg.png) no-repeat;
  background-size: 100% auto;
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.login-bg-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 400px;
  height: 500px;
  z-index: 1;
  background: url(../assets/bottom-bg.png);
  background-position: 0;
  -webkit-transform-origin: left bottom;
  transform-origin: left bottom;
}
.m-login{
  width: 450px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 30%;
  margin-left: -250px;
  background-color: rgba(255, 255, 255, .3);
  padding: 25px;
  border:1px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.1);
  z-index: 2;
  input{
    outline:none
  }
  .hd{
    height: 50px;
    font-size: 18px;
  }
  .bd{
    .login-input {
      border: 0;
      border-bottom: 1px solid #ddd;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: transparent;
      margin: 5px auto;
      text-indent: 5px;
    }
    .vcode-input{
      position: relative;
    }
    .vcode-box{
      width: 100px;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      >img{
        border: 1px solid #ddd;
        background-color: #ddd;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
  .ft{
    margin-top: 20px;
    .ivu-btn-success{
      height: 40px;
    }
  }
}
</style>
