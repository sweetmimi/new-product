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
          <input v-model="username" :placeholder="$t('login.accountPlaceholder')" class="login-input" @focus="hideErrorPop"/>
          <input type="password" v-model="password" :placeholder="$t('login.passwordPlaceholder')" class="login-input" @focus="hideErrorPop"/>
          <div class="vcode-input">
            <input v-model="vcode"  :maxlength="6" :placeholder="$t('login.vcodePlaceholder')" class="login-input" @focus="hideErrorPop"/>
            <div class="vcode-box">
              <img :src="vcodeUrl" @click="fetchVcode"/>
            </div>

            <Select
              transfer
              @on-change="chooseLanguage"
              v-model="lang"
              style="margin-top: 10px;width:400px"
              :placeholder="`${$t('selectPrefix')}`">

              <Option
                value="id-ID">
                  Bahasa
              </Option>
            </Select>
          </div>
        </div>
        <div class="ft">
          <Button type="success" long @click.native.prevent="submintLogin"  :loading="loading">{{$t('login.buttonText')}}</Button>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getVcode, login } from '@/api'
export default {
  data () {
    return {
      username: '',
      password: '',
      vcode: '',
      errMsg: '',
      vcodeUrl: '',
      lang: 'id-ID',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    fetchVcode () {
      getVcode(null, res => {
        const data = res.data
        if (+res.status === 0) {
          this.vcodeUrl = "/test/" + data.verifyCode
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    submintLogin () {
      if (!this.username) {
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
        mobile: this.username,
        password: this.password,
        verifyCode: this.vcode
      }, res => {
        this.loading = false
        if (+res.status === 0) {
          this.setUserInfo({
            userName: res.data.staffName,
            staffRole: res.data.staffRole
          })
          localStorage.setItem('%username', this.username)
          localStorage.setItem('mid', res.data.staffMid)
          this.roleJump(res.data.staffRole)
        } else {
          this.fetchVcode()
        }
      })
    },
    roleJump (role) {
      if (/role_cuishou_admin/.test(role)) {
        this.$router.push({name: 'case'})
        return;
      }
      if (/role_daihou_admin/.test(role)) {
        this.$router.push({name: 'loaned'})
        return;
      }
      if (/role_cuishouer/.test(role)) {
        this.$router.push({name: 'tasklist'})
        return;
      }
      if (/role_daihou_checker/.test(role)) {
        this.$router.push({name: 'loanedlist'})
        return;
      }
    },
  chooseLanguage(value) {
      localStorage.setItem('lang', value)
      window.location.reload()
    },
    hideErrorPop () {
      if (this.errMsg) {
        this.errMsg = ''
      }
    },
    ...mapActions([
      'setUserInfo',
      'getUserInfo'
    ])
  },
  created () {
    this.fetchVcode()
     localStorage.setItem('lang', "id-ID")
      this.lang = localStorage.getItem('lang')
    this.getUserInfo().then(() => {
      if (Object.keys(this.userInfo).length) {
        this.roleJump(this.userInfo.staffRole)
      } else {
        // this.fetchVcode()
      }
    })

  }
}
</script>
<style lang="scss" scoped>
.m-copyright {
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
.m-login {
  width: 450px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 30%;
  margin-left: -250px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 25px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.1);
  z-index: 999;
  input {
    outline: none;
  }
  .hd {
    height: 50px;
    font-size: 18px;
  }
  .bd {
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
    .vcode-input {
      position: relative;
    }
    .vcode-box {
      width: 100px;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      > img {
        border: 1px solid #ddd;
        background-color: #ddd;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
  .ft {
    margin-top: 20px;
    .ivu-btn-success {
      height: 40px;
    }
  }
}
</style>
