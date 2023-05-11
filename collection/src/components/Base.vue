<template>
    <div id="app" class="layout">
        <Layout>
            <Header>
              <Menu mode="horizontal" ref="headNav" theme="dark">
                <div class="layout-logo">{{ $t("title") }}  --- UATAS</div>
                <div class="layout-nav">
                  <Poptip class="m-poptip">
                    <div class="user-info"><Icon type="person"></Icon> {{userInfo.userName}} <Icon type="chevron-down"></Icon></div>
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


          <div class="cur-language">
            {{$t('curLanguage')}}：
            <Select
              style="width:80px"
              v-model="lang"
              @on-change="chooseLanguage"
              class="locale-select"
            >
             
              <Option value="id-ID">Bahasa</Option>
            </Select>
          </div>
              </Menu>
            </Header>
            <Layout theme="linght">
                <Sider ref="side"
                  collapsible
                  :collapsedWidth="0"
                  v-model="isCollapsed"
                  :style="{background: '#fff'}"
                  width="260"
                  :hide-trigger=true
                  >
                  <span slot="trigger" class="fold-btn" @click="collapsedSider">
                    <Icon type="navicon-round" size="22" />
                  </span>
                  <Menu :active-name="activeName" ref="menu" theme="light" width="auto" :open-names="openName" v-if="userInfo.staffRole">
                      <Submenu  v-for="(v, index) in $t('sildeNav')" :name="v.url" :key="index" v-if="isAuth(v.role)">
                          <template slot="title">
                              <Icon :type="menuIcon[index]"></Icon>
                              {{v.title}}
                          </template>
                          <MenuItem v-for="(cur, k) in v.sunNav" v-if="isAuth(cur.role)" @click.native="handleSkip(cur.url)" :name="cur.url" :key="k">
                            {{cur.title}}
                          </MenuItem>
                      </Submenu>
                  </Menu>
                </Sider>

                <Layout :style="{padding: '0 24px 24px'}" id="viewBox">
                    <Content :style="{padding: '24px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { logOut } from '@/api'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Base',
  data () {
    return {
      lang:"",
       mid:localStorage.getItem("mid"),
      activeName: '',
      userName: '',

            openName: [],
      isCollapsed: false,
      menuIcon: ['ios-settings', 'logo-buffer', 'ios-paper','ios-analytics'],
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['getUserInfo']),
    handleSkip (path) {
      this.activeName = path
      this.$router.push({
        path: path
      })
    },
    collapsedSider () {
      this.$refs.side.toggleCollapse()
    },
    navClick (e) {
      let name = e.target.dataset.name
      switch (name) {
        case 'resetPassword':
          this.$router.push({name: name})
          break
        case 'logOut':
          logOut({}, (res) => {
            if (+res.status === 0) {
              localStorage.removeItem('u.info')
              window.location.href='/login'
            }
          })
          break
      }
    },
    chooseLanguage(value) {
      localStorage.setItem("lang", value);
      window.location.reload();
    },
    isAuth(navRule, curRule = this.userInfo.staffRole) {
      return curRule.some(rule => {
        return navRule.indexOf(rule) > -1
      })
    }

  },
  mounted () {
    !Object.keys(this.userInfo).length && this.getUserInfo()
    if (!Object.keys(this.userInfo).length) {
      this.$router.push({name: 'login'})
    }
     this.lang = localStorage.getItem("lang");
    this.activeName = this.$route.path
    this.openName = this.$route.matched.map(match => match.path)
    this.$nextTick(() => {
      this.$refs.menu.updateOpened()
      this.$refs.menu.updateActiveName()
    })
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
.ivu-layout {
  height: 100%;
}
.layout {
    background: #f5f7f9;
    position: relative;
    height: 100%;
}
.ivu-switch-checked {
  border-color: #19be6b;
  background-color: #19be6b;
}
.ivu-layout-header{
    padding: 0 5px;
}
.ivu-menu-submenu {
  width: 250px;
}
.layout-logo{
    width: 500px;
    height: 30px;
    line-height: 30px;
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
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
  top: 50%;
  /* width: 200px; */
  transform:  scale(1.3);
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
  li{
    width: 100%;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    &:hover{
      color: #57a3f3;
    }
  }

}
.ivu-layout-sider-zero-width-trigger {
  display: none;
}
.ivu-layout-sider-children {
  position: relative;
  overflow: hidden;
}
.m-poptip {
  .ivu-poptip-popper {
    z-index: 1000;
  }
}
 .cur-language {
    float: right;
    color: #fff;
    margin-right: 20px;
  }
  .locale-select {
  .ivu-select-selection {
    background-color: transparent;
    border: 0;
    .ivu-select-selected-value {
      color: #fff;

    }
  }
}
</style>

