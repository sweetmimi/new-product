<template>
  <div id="reset" class="layout">
    <div class="reset-bg-top"></div>
    <div class="reset-bg-bottom"></div>
    <div class="m-reset">
      <div class="hd">
        <Icon type="log-in"></Icon>
        {{$t('title')}}
      </div>
      <div class="bd">
        <div class="error-info" v-if="errMsg">
          <Alert type="error">{{errMsg}}</Alert>
        </div>
        <input type="password" v-model="reset.oldPasswd" :placeholder="$t('reset.oldPasswordPlaceholder')" class="reset-input" @focus="hideErrorPop"/>
        <input type="password" v-model="reset.newPasswd" :placeholder="$t('reset.passwordPlaceholder')" class="reset-input" @focus="hideErrorPop"/>
        <input type="password" v-model="reset.confirmPasswd" :placeholder="$t('reset.confirmPasswordPlaceholder')" class="reset-input" @focus="hideErrorPop"/>
      </div>
      <div class="ft">
        <Button type="success" long @click="handleSubmit" :loading="loading">{{$t('reset.buttonText')}}</Button>
        <div class="m-copyright">{{$t('copyrightInfo')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { resetPassword } from '@/api'
export default {
  data() {
    return {
      loading: false,
      vcodeUrl: '',
      errMsg: '',
      reset: {
        oldPasswd: '',
        newPasswd: '',
        confirmPasswd: ''
      },
    }
  },
  methods: {
    handleSubmit(name) {
      if(!this.reset.oldPasswd) {
        this.errMsg = this.$t('reset.oldPasswordPlaceholder')
        return false;
      }
      if(!this.reset.newPasswd) {
        this.errMsg = this.$t('reset.passwordPlaceholder')
        return false;
      }
      if(!this.reset.confirmPasswd) {
        this.errMsg = this.$t('reset.confirmPasswordPlaceholder')
        return false;
      }
      this.loading = true
      resetPassword(this.reset, (res) => {
        this.loading = false
        if(+res.status === 0) {
          setTimeout(() => {
            this.$router.push({
              path: '/'
            })
          }, 500)
        }
      })
    },
    hideErrorPop() {
      if(this.errMsg) {
        this.errMsg = "";
      }
    }
  },
  created() {
      
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
.reset-bg-top {
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
.reset-bg-bottom {
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
.m-reset{
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
  z-index: 999;
  input{
    outline:none
  }
  .hd{
    height: 50px;
    font-size: 18px;
  }
  .bd{
    .reset-input {
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
      height: 44px;
      position: absolute;
      top: 0;
      right: 0;
      >img{
        border: 1px solid #ddd;
        background-color: #ddd;
        width: 100px;
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
