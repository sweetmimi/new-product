<template>
  <div id="collectRecord" class="m-collectRecord">
    <Tabs name="contactInformation" type="card" @on-click="toggleTab" class="smallTab" :animated="false">
      <TabPane :label="$t('taskDetail.contactInformationTab.contactRecord.title')"  tab="contactInformation">
        <Table  border :columns="contactRecordTitle" v-if="showContactRecordList" :loading="operateContactLoading" :data="contactRecordList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
        <Page
          show-total
          show-elevator
          :total="operateContact.total"
          :page-size="operateContact.size"
          :current.sync="operateContact.page"
          class="m-pagination"
          v-if="operateContact.total > operateContact.size"
          @on-change="handleUpdateContactsTable">
            {{$t('pageSlot.total')}} {{operateContact.total}} {{$t('pageSlot.count')}}
        </Page>
      </TabPane>

      <TabPane :label="$t('taskDetail.contactInformationTab.callRecord.title')" tab="contactInformation">
        <Table  border :columns="callRecordTitle" v-if="showCallRecordList" :loading="operateCallLoading" :data="callRecordList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
        <Page
          show-total
          show-elevator
          :total="operateCall.total"
          :page-size="operateCall.size"
          :current.sync="operateCall.page"
          class="m-pagination"
          v-if="operateCall.total > operateCall.size"
          @on-change="handleUpdateCallTable">
          {{$t('pageSlot.total')}} {{operateCall.total}} {{$t('pageSlot.count')}}
        </Page>
      </TabPane>
      <TabPane :label="$t('taskDetail.contactInformationTab.smsRecord.title')" tab="contactInformation">
        <Table  border :columns="smsRecordTitle" v-if="showSmsRecordList" :loading="operateSmsLoading" :data="smsRecordList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
        <Page
          show-total
          show-elevator
          :total="operateSms.total"
          :page-size="operateSms.size"
          :current.sync="operateSms.page"
          class="m-pagination"
          v-if="operateSms.total > operateSms.size"
          @on-change="handleUpdateSmsTable">
          {{$t('pageSlot.total')}} {{operateSms.total}} {{$t('pageSlot.count')}}
        </Page>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import  { getdaihouContactTypeList } from '@/api/task'
export default {
  name: 'contactInformation',
  props: {
    daihouTaskId: {
      type: String
    }
  },
  data () {
    return {
      operateContactLoading: false,
      operateCallLoading: false,
      operateSmsLoading: false,
      showContactRecordList: true,
      showCallRecordList: true,
      showSmsRecordList: true,
      totalContactRecord: [],
      totalCallRecord: [],
      totalSmsRecord: [],
      contactRecordList: [],
      callRecordList: [],
      smsRecordList: [],
      operateContact: {
        total: '',
        size: 10,
        page: 1
      },
      operateCall: {
        total: '',
        size: 10,
        page: 1
      },
      operateSms: {
        total: '',
        size: 10,
        page: 1
      },
      contactRecordTitle: [
        {
          type: 'index',
          width: 60,
          title: 'ID',
          align: 'center',
          fixed: 'left',
        },
        {
          title: this.$t('taskDetail.contactInformationTab.callRecord.callPhoneNumber'),
          key: 'phone'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.contactRecord.contactsRecentContactTime'),
          key: 'last_time_contacted'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.contactRecord.contactsCommonContact'),
          key: 'starred'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.contactRecord.contactsNumber'),
          key: 'times_contacted'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.contactRecord.contactDisplayName'),
          key: 'name'
        },
      ],
      callRecordTitle: [
        {
          type: 'index',
          width: 60,
          title: 'ID',
          align: 'center',
          fixed: 'left',
        },
        {
          title: this.$t('taskDetail.contactInformationTab.callRecord.callPhoneNumber'),
          key: 'phone'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.callRecord.callPhoneName'),
          key: 'name'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.callRecord.callDuration'),
          key: 'duration'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.callRecord.callType'),
          key: 'type'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.callRecord.callTime'),
          key: 'date'
        },
      ],
      smsRecordTitle: [
        {
          type: 'index',
          width: 60,
          title: 'ID',
          align: 'center'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.smsRecord.smsType'),
          key: 'type'
        },
        {
          title: this.$t('taskDetail.contactInformationTab.smsRecord.smsContent'),
          key: 'body',
          width: 500
        },
        {
          title: this.$t('taskDetail.contactInformationTab.smsRecord.smsAddress'),
          key: 'address',
        },
        {
          title: this.$t('taskDetail.contactInformationTab.smsRecord.smsDate'),
          key: 'date',

        },
        {
          title: this.$t('taskDetail.contactInformationTab.smsRecord.smsSentDate'),
          key: 'date_sent',
        },
        {
          title: this.$t('taskDetail.contactInformationTab.smsRecord.smsSender'),
          key: 'person',
        },
      ],
    }
  },

  methods: {
    handleUpdateContactsTable(pageIndex) {
      this.operateContact.page = pageIndex || 1
      this.contactRecordList = this.pagination(this.operateContact.page , this.operateContact.size ,this.totalContactRecord)
    },
    handleUpdateCallTable(pageIndex) {
      this.operateCall.page = pageIndex || 1
      this.callRecordList = this.pagination(this.operateCall.page , this.operateCall.size ,this.totalCallRecord)
    },
    handleUpdateSmsTable(pageIndex) {
      this.operateSms.page = pageIndex || 1
      this.smsRecordList = this.pagination(this.operateSms.page , this.operateSms.size ,this.totalSmsRecord)
    },
    _getOperateList (type) {

     
      let page = this.operateContact.page
      if (type == 0) {
        page = this.operateContact.page
      } else if (type == 1) {
        page = this.operateCall.page
      } else if (type == 2) {
        page = this.operateSms.page
      }
      this.changeLoading(type, true)
      getdaihouContactTypeList({
        page: page,
        daihouTaskId:this.daihouTaskId,
      }, (res) => {
        if (+res.status === 0) {
          const data = res.data
          this.changeLoading(type, false)
          if (data) {
            this.getList(type, data)
            this.changeShowList(type, true)
          }
        } else {
          this.changeShowList(type, false)
        }
      })
    },
    changeLoading (type, flag) {
      if (type == 0) {
        this.operateContactLoading = flag
      } else if (type == 1) {
        this.operateCallLoading = flag
      } else if (type == 2) {
        this.operateSmsLoading = flag
      }
    },
    changeShowList (type, flag) {
      if (type == 0) {
        this.showContactRecordList = flag
      } else if (type == 1) {
        this.showCallRecordList = flag
      } else if (type == 2) {
        this.showSmsRecordList = flag
      }
    },
    getList (type, data) {
      if (type == 0) {
        this.totalContactRecord = data.contactRecord
        this.totalContactRecord.forEach(item => {
          if(item.up_time){
            item.up_time = this.getLocalTime(item.up_time)
          }
          if(item.starred){
            item.starred = item.starred == '0' ? this.$t('taskDetail.contactInformationTab.contactRecord.contactNot') : this.$t('taskDetail.contactInformationTab.contactRecord.contactYes')
          }
          if(item.last_time_contacted){
            item.last_time_contacted = this.getLocalTime(item.last_time_contacted)
          }
        })
        this.operateContact.total = this.totalContactRecord.length
        this.contactRecordList = this.pagination(this.operateContact.page, this.operateContact.size, this.totalContactRecord)
      } else if (type == 1) {
        this.totalCallRecord = data.callRecord
        this.totalCallRecord.forEach(item => {
          item.type = this.getCallType(item.type)
          item.duration = item.duration + 's'
          item.time = this.getLocalTime(item.time)
        })
        this.operateCall.total = this.totalCallRecord.length
        this.callRecordList = this.pagination(this.operateCall.page, this.operateCall.size, this.totalCallRecord)
      } else if (type == 2) {
        this.totalSmsRecord = data.smsRecord
        this.totalSmsRecord.forEach(item => {
          item.type = item.type == '1' ? this.$t('taskDetail.contactInformationTab.smsRecord.smsTypeReceive') : this.$t('taskDetail.contactInformationTab.smsRecord.smsTypeSend')
          item.date = this.getLocalTime(item.date)
          item.date_sent = this.getLocalTime(item.date_sent)
        })
        this.operateSms.total = this.totalSmsRecord.length
        this.smsRecordList = this.pagination(this.operateSms.page, this.operateSms.size, this.totalSmsRecord)
      }
    },
    toggleTab (index) {
      this._getOperateList(index)
    },
    pagination (pageNo, pageSize, array) {
      let offset = (pageNo - 1) * pageSize
      return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
    },
    getLocalTime (time) {
      let now = new Date(parseInt(time))
      let year = now.getFullYear()
      let month = now.getMonth()+1
      let date = now.getDate()
      let hour = now.getHours()
      let minute = now.getMinutes()
      let second = now.getSeconds()
      return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second
    },
    getCallType (type) {
      if (type == '1') {
        return this.$t('taskDetail.contactInformationTab.callRecord.callTypeIncomingCall')
      } else if (type == '2') {
        return this.$t('taskDetail.contactInformationTab.callRecord.callTypeOutgoing')
      } else if (type == '3') {
        return this.$t('taskDetail.contactInformationTab.callRecord.callTypeMissed')
      } else if (type == '4') {
        return this.$t('taskDetail.contactInformationTab.callRecord.callTypeVoiceMail')
      } else if (type == '5') {
        return this.$t('taskDetail.contactInformationTab.callRecord.callTypeRejected')
      } else if (type == '6') {
        return this.$t('taskDetail.contactInformationTab.callRecord.callTypeBlocked')
      } else {
        return this.$t('taskDetail.contactInformationTab.callRecord.callTypeUnknown')
      }
    },
  },
  created() {
    this._getOperateList(0)
  }
}
</script>

<style lang="scss" scoped>
.m-collectRecord {
  padding-top: 10px;
  .audio {
    margin-top: 15px;
  }
}
.footer {
  text-align: center;
  button {
    margin: 0 20px;
  }
}
</style>
<style lang="scss">
.ivu-layout-sider-collapsed {
  & + .ivu-layout {
    .topTab {
      .ivu-tabs-bar {
        .ivu-tabs-nav-container {
          .ivu-tabs-nav-wrap {
            .ivu-tabs-nav-scroll {
              .ivu-tabs-nav {
                margin: 0 24px 0 48px;
              }
            }
          }
        }
      }
    }
  }
}
.m-taskDetail{
  .m-collectRecord {
  .ivu-tabs-bar {
    .ivu-tabs-nav-container {
      .ivu-tabs-nav-wrap {
        .ivu-tabs-nav-scroll {
          position: static;
        }
      }
    }
  }
}
}
</style>
