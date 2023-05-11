

<template>
  <div id="app" class="layout m-wrap">
    <Layout>
      <Header>
        <Menu mode="horizontal" ref="headNav" theme="dark">
          <div v-if="lender==1" class="layout-logo">{{ $t("titleLender") }} --- UATAS</div>
          <div v-else class="layout-logo">{{ $t("title") }} --- UATAS</div>
          <div class="layout-nav">
            <Poptip>
              <div class="user-info">
                <Icon type="person"></Icon>
                {{userInfo.userName}}
                <Icon type="chevron-down"></Icon>
                <Tag type="dot" v-if="lender==1" @click.native="changeLenderStatus" :color="lender_status==1?'primary':'default'">{{lender_status==1?'Diaktifkan':'Tutup'}}</Tag>
              </div>
              <div slot="content">
                <ul class="list" @click="navClick($event)">
                  <li data-name="resetPassword">
                    <Icon type="edit"></Icon>
                    {{$t('resetPassword')}}
                  </li>
                  <li data-name="logOut">
                    <Icon type="power"></Icon>
                    {{ $t('quit') }}
                  </li>
                </ul>
              </div>
            </Poptip>
          </div>

          <div class="topTips" v-if="lender==1">
            <Badge :count="lenderCount" style="margin-right:20px">
              <div class="Badge" @click="goPage(1)">
                lender
              </div>
            </Badge>
            <Badge :count="borrowerCount" style="margin-right:20px">
              <div class="Badge" @click="goPage(2)">
                borrower
              </div>
            </Badge>

          </div>

          <!-- <div class="cur-language">
            {{$t('curLanguage')}}：
            <Select
              style="width:80px"
              v-model="lang"
              @on-change="chooseLanguage"
              class="locale-select"
            >

              <Option value="id-ID">Bahasa</Option>
            </Select>
          </div> -->
        </Menu>
      </Header>
      <Layout theme="linght">
        <Sider
          ref="side"
          collapsible
          :collapsedWidth="0"
          v-model="isCollapsed"
          mode="vertical"
          :style="{background: '#fff' }"
          width="260"
        >
          <span slot="trigger" class="fold-btn" @click="collapsedSider">
            <Icon type="navicon-round" size="22"/>
          </span>
          <Menu
            :active-name="activeName"
            ref="menu"
            theme="light"
            width="auto"
            :open-names="openName"
            v-if="userInfo.staffRole"
          >
            <Submenu
              v-for="(v, index) in lender==1? $t('lender_sildeNav'):$t('sildeNav') "
              :name="v.url"
              :key="index"
              v-if="(userInfo.staffRole).indexOf(v.role) > -1 "
            >

              <template slot="title" >
                <Icon :type="menuIcon[index]"></Icon>
                {{v.title}}
              </template>
              <MenuItem
                v-for="(cur, k) in v.sunNav"
                @click.native="handleSkip(cur.url)"
                :name="cur.url"
                :key="k"
              >{{cur.title}}</MenuItem>
            </Submenu>
          </Menu>
          <div class="switch-btn" name="switch" v-if="!isCollapsed && userInfo.staffRole">
            <iSwitch
              size="large"
              :value="onlineStatus"
              v-if="(userInfo.staffRole).indexOf('role_approver') > -1 && (userInfo.staffRole).indexOf('role_approve_admin') == -1"
              :true-value="1"
              :false-value="0"
              @on-change="setStatus"
            >
              <span slot="open">{{$t(state[1])}}</span>
              <span slot="close">{{$t(state[0])}}</span>
            </iSwitch>
          </div>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}" id="viewBox">
          <Content :style="{padding: '24px', background: '#fff'}">
            <router-view v-if="isReload"/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <DownloadCenter :modal="downloadModal" @close="handleModalChange"/>
  </div>
</template>
<script>
import {
  getSingOrderList,
  } from '@/api/order'
import { logOut } from "@/api";
import DownloadCenter from "./DownloadCenter";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Base",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      lender_status: localStorage.getItem('lender_status'),
      lender : localStorage.getItem('lender'),
      timer: null,
      lenderCount:0,
      borrowerCount:0,
      mid:localStorage.getItem("mid"),
      activeName: "",
      lang: "",
      isReload: true,
      openName: [],
      isCollapsed: false,
      downloadModal: false,
      showSlder: false,
      name: "person",
      color: ["#ccc", "lightgreen"],
      state: ["offLine", "onLine", "myDownload"],
      menuIcon: [
        "ios-cog",
       "ios-compass-outline",
         "ios-contact",
         "ios-funnel-outline",
         "md-fastforward",
        "android-settings",
        "android-people",
        "ios-list",
        "ios-paper-outline",
        'ios-analyica'
      ]
    };
  },
  components: {
    DownloadCenter
  },
  computed: {
    ...mapGetters(["onlineStatus", "userInfo"])
  },
  methods: {
    ...mapActions(["setOnlineStatus", "getUserInfo"]),
    handleSkip(path) {
      this.activeName = path;
      console.log(path, 222);
      this.$router.push({
        path: path
      });
    },
    setStatus(status) {
      this.setOnlineStatus({
        onlineStatus: status
      });
    },
    collapsedSider() {
      this.$refs.side.toggleCollapse();
    },
    navClick(e) {
      let name = e.target.dataset.name;
      console.log(name, 999);
      switch (name) {
        case "resetPassword":
          this.$router.push({ name: name });
          break;
        case "downLoad":
          this.downloadModal = true;
          break;
        case "logOut":
          logOut({}, res => {
            if (+res.status === 0) {
              localStorage.removeItem("u.info");
              window.location.href = "/login";
            }
          });
          break;
      }
    },
    handleModalChange(status) {
      this.downloadModal = status;
    },
    reload() {
      this.isReload = false;
      this.$nextTick(() => {
        this.isReload = true;
      });
    },
    chooseLanguage(value) {
      localStorage.setItem("lang", value);
      window.location.reload();
    },
    getSearchLenderData(){
      let that = this;
        this.timer = setInterval(function () {
          //执行内容
          that.searchLenderData();
        }, 180000);
    },
    searchLenderData(){
      getSingOrderList({
        query_type:2
      }, (res) => {
          if (+res.status === 0) {
            this.lenderCount = Number(res.data.arrPager.count)
          }
        })
        getSingOrderList({
        query_type:3
      }, (res) => {
          if (+res.status === 0) {
            this.borrowerCount = Number(res.data.arrPager.count)
          }
        })
    },
    goPage(type){

      if(type==1){
        let url = this.$router.resolve({
        path: "/sing/singInfo",
        });
        window.open(url.href, "_blank");
      }
      if(type==2){
        let url = this.$router.resolve({
        path: "/sing/borrowerOrder",
        });
        window.open(url.href, "_blank");
      }
    },
    changeLenderStatus(){
      if(this.lender_status==1){

      }else{
        this.$Message.warning("Silakan hubungi administrator platform untuk pengoperasian")
      }
    },
  },
  mounted() {
    !Object.keys(this.userInfo).length && this.getUserInfo();
    if (!Object.keys(this.userInfo).length) {
      this.$router.push({ name: "login" });
    }
    this.lang = localStorage.getItem("lang");
    // this.lang="id-ID"
    this.activeName = this.$route.path;
    this.openName = this.$route.matched.map(match => match.path);
    this.$nextTick(() => {
      this.$refs.menu && this.$refs.menu.updateOpened();
      this.$refs.menu && this.$refs.menu.updateActiveName();
    });
    if(localStorage.getItem('lender')==1){
      this.getSearchLenderData()
    }

  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
.m-wrap {
  .ivu-layout {
    height: 100%;
  }
  .layout {
    background: #f5f7f9;
    position: relative;
    height: 100%;
  }
  .ivu-switch-large {
    width: 68px;
  }
  .ivu-switch-checked {
    border-color: #19be6b;
    background-color: #19be6b;
  }
  .ivu-switch-checked:after {
    left: 44px;
  }
  .ivu-layout-header {
    padding: 0 5px;
  }
  .ivu-menu-submenu {
    width: 260px;
  }
  .layout-logo {
    width: 500px;
    height: 30px;
    line-height: 30px;
    font-size: 22px;
    color: #fff;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    font-weight: 800;
  }
  .layout-nav {
    float: right;
    margin: 0 auto;
    margin-right: 20px;
    float: right;
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
  .switch-btn {
    position: absolute;
    left: 50%;
    bottom: 90px;
    /* width: 200px; */
    transform: scale(1.3);
    margin-top: -12px;
    margin-left: -30px;
  }
  .user-info {
    color: #fff;
    cursor: pointer;
    height: 40px;
    &:hover {
      color: #ccc;
    }
  }
  .list {
    width: 100%;
    li {
      width: 100%;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      &:hover {
        color: #57a3f3;
      }
    }
  }
  .cur-language {
    float: right;
    color: #fff;
    margin-right: 20px;
  }
  .topTips{
    float: right;
    margin:10px;
  }
  .Badge{
    text-align: center;
    display: inline-block;
    width:70px;
    height: 45px;
    color: #fff;
    background:#57a3f3;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 50px;
  }
}
</style>
