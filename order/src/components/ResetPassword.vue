<template>
    <div id="reset" class="m-reset">
      <div class="desc">
        <h2 class="title">{{ $t('title')}}</h2>
      </div>
      <div class="m-reset">
        <Form ref="loginForm" :rules="validationReset" :model="reset">
          <FormItem prop="oldPass" :label="$t('reset.oldPassword')">
            <Input type="password" :placeholder="`${$t('inputPrefix')}${$t('reset.oldPassword')}`" v-model="reset.oldPass"></Input>
          </FormItem>
          <FormItem prop="newPass" :label="$t('reset.password')">
            <Input type="password" :placeholder="`${$t('inputPrefix')}${$t('reset.password')}`" v-model="reset.newPass"></Input>
          </FormItem>
          <FormItem prop="confirmPass" :label="$t('reset.confirmPassword')">
            <Input type="password" :placeholder="`${$t('reset.confirmPassword')}`" v-model="reset.confirmPass"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" long class="login-btn" @click="handleSubmit" :loading="loading">{{$t('reset.buttonText')}}</Button>
          </FormItem>
        </Form>
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { changePassword } from '@/api/site'
@Component
export default class ResetPassword extends Vue {
  loading = false
  vcodeUrl = ''
  errMsg = ''
  reset = {
    oldPass: '',
    newPass: '',
    confirmPass: ''
  }
  validationReset = {}
  validateOldPassword = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(`${this.$t('inputPrefix')}${this.$t('reset.oldPassword')}`))
    } else {
      callback()
    }
  }
  validatePassword = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(`${this.$t('inputPrefix')}${this.$t('reset.password')}`))
    } else {
      callback()
    }
  }
  validateConfirmPassword = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(new Error(`${this.$t('reset.confirmPassword')}`))
    } else {
      callback()
    }
  }
  created() {
    this.validationReset = {
      oldPass: { validator: this.validateOldPassword, trigger: 'blur' },
      newPass: { validator: this.validatePassword, trigger: 'blur' },
      confirmPass: { validator: this.validateConfirmPassword, trigger: 'blur' }
    }
  }
  handleSubmit() {
    const myForm: any = this.$refs.loginForm
    myForm.validate((valid: any) => {
      if (valid) {
        if (this.reset.newPass !== this.reset.confirmPass) {
          this.$Message.error(this.$t('reset.disaccord'))
          return false
        }
        this.loading = true
        changePassword(this.reset, (res: any) => {
          this.loading = false
          if (+res.code === 0) {
            this.$Message.success({
              content: `${this.$t('editSuccess')}`,
              onClose: (): void => {
                localStorage.removeItem('loginInfo')
                window.location.href = '/login'
              }
            })
          }else{
            this.$Message.error(res.msg)
           
          }
        })
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.m-reset {
  height: 80%;
  width: 100%;
  position: relative;
  background: url(../assets/simple-codelines.svg), #2b3137;
  background-position: center 10%;
  background-size: cover;
  color: hsla(0, 0%, 100%, 0.6);
  .remember {
    color: #515a6e;
    text-align: left;
  }
  .vcode {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 32px;
  }
  .desc {
    position: absolute;
    top: 30%;
    left: 30%;
    .title {
      color: #fff;
      text-align: left;
      font-size: 50px;
    }
    .sub-title {
      font-size: 45px;
    }
  }
  .ivu-form {
    position: absolute;
    top: 30%;
    right: 200px;
    padding: 20px;
    width: 340px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 5px;
    font-size: 14px;
  }
  .login-btn {
    height: 40px;
  }
  .copy-right {
    position: absolute;
    bottom: -32px;
    width: 100%;
    color: #2b3137;
  }
}
</style>

