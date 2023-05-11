<template>
  <div class="m-layout">
    <Layout>
      <Header :style="{ width: '100%', backgroundColor: '#2b3137'}">
        <div class="layout-logo">
          <h2 class="title" @click="toHome">{{$t('title')}} --- UATAS</h2>
        </div>
        <ul class="login-info">
          <li class="item">
            {{$t('curLanguage')}}：
            <Select
              style="width:80px"
              v-model="lang"
              @on-change="checkoutLanguage"
              class="locale-select"
            >
             
              <Option value="id-ID">Bahasa</Option>
            </Select>
          </li>
          <li class="item" v-if="userName">
            <span v-if="roleName">{{roleName}}：</span>
            <span v-if="common_admin">{{$t('common_admin')}}：</span>
            {{userName}}
          </li>
          <li class="item operate" @click="resetPassword">{{$t('resetPassword')}}</li>
          <li class="item operate" @click="userLoginOut">{{$t('quit')}}</li>
        </ul>
      </Header>
      <Layout>
        <Sider
          ref="side"
          width="300"
          collapsible
          :collapsedWidth="0"
          v-model="isCollapsed"
          mode="vertical"
          :style="{background: '#fff'}"
        >
          <span slot="trigger" class="fold-btn" @click="collapsedSider">
            <Icon type="md-menu" size="22"/>
          </span>
          <Menu theme="light" width="auto" ref="menu" accordion :active-name="activeName" :open-names="openNames">
            <Submenu v-for="(v, index) in $t('sildeNav')" :name="v.url || ''" :key="index" v-if="v.role&&v.role.indexOf(role)>-1">
              <template slot="title">
                <Icon :type="menuIcon[index]"></Icon>
                {{v.title }}
              </template>
              <template v-for="(cur, k) in v.sunNav" v-if="cur.role&&cur.role.indexOf(role)>-1">
                <MenuItem
                  v-if="!cur.sunNav"
                  @click.native="handleSkip(cur.url)"
                  :name="cur.url || ''"
                  :key="k"
                  :style="{paddingLeft:'60px'}"
                >{{cur.title}}</MenuItem>
                <template v-else>
                  <Submenu :name="cur.url || ''" :key="k" :style="{paddingLeft:'20px'}">
                    <template slot="title">{{cur.title}}</template>
                    <MenuItem
                      v-for="(_cur, _k) in cur.sunNav"
                      @click.native="handleSkip(_cur.url)"
                      :name="_cur.url || ''"
                      :key="_k"
                    >{{_cur.title}}</MenuItem>
                  </Submenu>
                </template>
              </template>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', flex: '1', background: '#fff', marginTop:'30px'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { loginOut } from "../api/site";
import { Getter, Action } from "vuex-class";
import { getDashboard } from '@/api/dashboard'
@Component
export default class Base extends Vue {
  @Getter("selectItems") selectItems: any;
  @Action("getSelectList") getSelectList: any;
  $refs!: {
    side: HTMLFormElement;
  };
  mid : string | null = localStorage.getItem("mid");
  userName: string | null = localStorage.getItem("realName");
  activeName: string | undefined = "";
  openNames: string[] = [];
  lang = "";
  role = null;
  roleName = "";
  common_admin = "";
  isCollapsed = false;
  menuIcon = [
    "ios-people",
    "ios-pricetag",
    "ios-contact",
    "ios-card",
    "ios-paper-outline",
    "ios-aperture-outline",
    "ios-appstore-outline" ,
    "ios-albums-outline",
    "ios-archive-outline",
    "ios-bookmark-outline",
  ];
  handleSkip(path: string) {
    this.activeName = path;
    this.$router.push({
      path: path
    });
  }
  toHome() {
    // window.location.href = "/home";
     this.$router.push({path:'/home'})
  }
  resetPassword(): void {
    window.location.href = "/reset";
  }
  userLoginOut(): void {
    loginOut((res: any) => {
      if (res.code === 0) {
        this.$Message.success({
          content: `${this.$t("quitSuccess")}`,
          onClose: (): void => {
            window.location.href = "/login";
          }
        });
      }
    });
  }
  checkoutLanguage(value: any) {
    localStorage.setItem("lang", value);
    window.location.reload();
  }
  collapsedSider() {
    this.$refs.side.toggleCollapse();
  }
  _getDashboard() {
    getDashboard((res: any) => {
      if (+res.code === 0) {
        const data = res.data
       this.common_admin = data.is_common_admin
        
      }
    })
  }
  created() {
     const role = localStorage.getItem("role") || "";
      
     if(role ==="role_super_admin"){
        this.role =0
      }
      if(role ==="role_common_admin"){
         this.role =1
      }
       if(role ==="role_customer_service"){
         this.role =2
      }
      if(role ==="role_order_business_operation"){
         this.role =4
      }
      if(role ==="role_order_it"){
         this.role =5
      }
      if(role ==="role_customer_service_supervisor"){
         this.role =6
      }
   this._getDashboard()
    
    this.getSelectList().then(() => {
      const role = localStorage.getItem("role") || "";
      this.roleName = this.selectItems.system_role.sys_order[role];
      
    });
    this.lang = `${localStorage.getItem("lang")}` || "";
    this.activeName = this.$route.fullPath;
    this.openNames.push(this.$route.fullPath.split("/")[1]);
  
  }
}
</script>

<style lang="scss" scoped>
.m-layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  height: 100%;
  text-align: left;
  overflow: auto;
  .ivu-layout {
    height: 100%;
  }
  .ivu-layout-header {
    padding: 0 26px;
  }
  .login-info {
    float: right;
    margin-right: 20px;
    color: #fff;
    .item {
      display: inline;
      list-style: none;
      padding-left: 30px;
    }
    .operate {
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  .layout-logo {
    height: 30px;
    float: left;
    position: relative;
    top: 10px;
    left: 0;
    .logo {
      width: 82px;
      height: 37px;
      float: left;
      margin: 4px 4px 0 0;
    }
    .title {
      color: #fff;
      line-height: 45px;
      font-size: 26px;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
    }
  }

  .ivu-menu-item {
    padding: 0;
    line-height: 2.5;
    a {
      color: #515a6e;
      padding: 14px 24px;
      display: block;
    }
    .ivu-icon {
      margin-right: 6px;
      margin-top: -4px;
    }
  }
  .ivu-menu-item-selected a {
    color: #2d8cf0;
  }
  .fold-btn {
    position: absolute;
    top: 0;
    right: -23px;
    z-index: 1003;
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    color: #495060;
  }
}
</style>
