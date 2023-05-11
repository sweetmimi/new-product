<template>
  <div id="taskDetail" class="m-taskDetail">
    <Tabs @on-click="toggleTab" :class="{'topTab' : isTop}" :animated="false" name="outerTabs">


        <TabPane :label="$t('taskDetail.baseInfo.coustomBaseInfo')" tab="outerTabs">
          <UserInfo ref="userInfo" :daihouTaskId="daihouTaskId " :Uvr ="Uvr"></UserInfo>
        </TabPane>


        <TabPane :label="$t('taskDetail.baseInfo.orderBaseInfo')" tab="outerTabs">
          <OrderInfo ref="orderInfo" :daihouTaskId="daihouTaskId" :Uvr ="Uvr" :orderNo="orderNo"></OrderInfo>
        </TabPane>


        <!-- <TabPane :label="$t('taskDetail.taskFollowUp.title')" tab="outerTabs">
          <TaskFollow ref="collectFollow" :calling="calling" @call="handleCalling" :daihouTaskId="daihouTaskId	"></TaskFollow>
        </TabPane> -->


        <TabPane :label="$t('taskDetail.collectRecordTab.title')" tab="outerTabs">
          <TaskUvlRecord ref="collectRecord" :activeTab.sync="logActiveTab"  :daihouTaskId="daihouTaskId" :Uvr ="Uvr"></TaskUvlRecord>
        </TabPane>

    </Tabs>
    <div class="hand-up" v-if="calling">
      <Button type="error" size="large" @click="handleHandUp">{{ $t('taskDetail.taskFollowUp.hangup') }}</Button>
    </div>
  </div>
</template>
<script>
import UserInfo from './UserInfo'
import OrderInfo from './OrderInfo'
import TaskFollow from './TaskFollow'
import TaskRecord from './TaskRecord'
import TaskUvlRecord from './TaskUvlRecord'
export default {
  data () {
    return {
      orderNo:'',
      daihouTaskId: '',
      isTop: false,
      calling: false,
      logActiveTab: 0,
      Uvr:'',
    }
  },
  components: {
    UserInfo,
    OrderInfo,
    TaskFollow,
    TaskRecord,
    TaskUvlRecord
  },
  created () {
    this.daihouTaskId	 = decodeURIComponent(this.$route.query.daihouId)
     this.Uvr =  decodeURIComponent(this.$route.query.index)
     this.orderNo	 = decodeURIComponent(this.$route.query.orderNo)
    console.log(this.Uvr)
  },

  mounted () {
    let viewBox = document.getElementById('viewBox')
    viewBox.addEventListener('scroll', () => {
      !this.isTop && setTimeout(() => {
        if (viewBox.scrollTop >= 50 ) {
          this.isTop = true
        }
      }, 10)
    })
  },

  methods: {
    toggleTab (index) {
      console.log(index)
      switch (index) {
        case 0:
          this.$refs.userInfo._getInfo()
          break
        case 1:
          this.$refs.orderInfo._getOrderInfo()
          break
        case 2:
          this.logActiveTab = 0;
          this.$refs.collectRecord._getCallList()
          break
      }
    },
    handleCalling (callFlag) {
      this.calling = callFlag
    },
    handleHandUp () {
      this.calling = false
    }

  }
}
</script>

<style lang="scss">
.m-spin {
  text-align: left;
  float: left;
  .spin-icon {
    animation: ani-demo-spin 1s linear infinite;
  }
}
.spin-text {
  margin-left: 30px;
}
.m-taskDetail {
  position: relative;
  .call-modal {
    .ivu-modal-content {
      padding: 15px 0;
    }
  }
  .hand-up {
    display: inline-block;
    position: fixed;
    right: 50px;
    top: 69px;
    z-index: 11;
    button {
      font-size: 12px;
    }
  }
  .ivu-input-disabled {
    color: #666;
  }
  .ivu-form-item-content {
    width: auto;
  }
  .topTab {
  > .ivu-tabs-bar {
      .ivu-tabs-nav-container {
        .ivu-tabs-nav-wrap {
          .ivu-tabs-nav-scroll {
            position: fixed;
            width: 100%;
            z-index: 10;
            top: 64px;
            left: 50px;
            .ivu-tabs-nav {
              background: #fff;
              display: block;
              float: none;
              margin: 0 24px 0 248px;
              position: relative;
              border-bottom: 1px solid #f5f7f9;
            }
          }
        }
      }
    }
  }
}
</style>
