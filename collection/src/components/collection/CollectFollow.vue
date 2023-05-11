<template>
  <div id="collectFollow" class="m-collectFollow">
      <div class="follow-table-warp">
        <Button class="update-btn" type="primary" @click="addContract" icon="plus-round">{{ $t('taskDetail.collectFollowUp.addContract') }}</Button>
        <Button icon="refresh" type="success" @click="getListAgain" class="update-btn">{{ $t('taskDetail.collectFollowUp.retrieveAddressBook') }}</Button>
        <Table class="card-gap" border @on-row-click="handleClickRow" highlight-row ref="currentRowTable" :columns="columns" :loading="loading" @on-current-change="rowClick" :data="contactList">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
        <Page
          show-total
          :total="contactPager.count"
          :page-size="contactQuery.pageSize"
          :current.sync="contactQuery.page"
          class="m-pagination"
          v-if="contactPager.count > contactQuery.pageSize"
          @on-change="updateContactList">
            {{$t('pageSlot.total')}} {{contactPager.count}} {{$t('pageSlot.count')}}
        </Page>
      </div>
        <Card class="card-gap">
      <p slot="title" class="card-head">{{$t('taskDetail.remark.remarkTitle')}}</p>
        <Table
          ref="remarktable"
          border
          class="list-table"
          :data="customer_comment"
          :columns="remarkColumns"
        ></Table>
    </Card>
      <Card class="card-gap">
        <p slot="title" class="card-head">{{$t('taskDetail.collectFollowUp.dialCall')}}</p>
        <Form ref="formInline" :model="callInfo" :label-width="100">
           <Row type="flex">
            <Col >
              <FormItem :label="$t('taskDetail.collectFollowUp.userName')" prop="userName" >
                <Input type="text" v-model="callInfo.userName" disabled></Input>
              </FormItem>
            </Col>
            <Col >
              <FormItem :label="$t('taskDetail.collectFollowUp.relationship')" prop="relationship">
                <Input type="text" v-model="callInfo.relationship" disabled></Input>
              </FormItem>
            </Col>
            <Col >
              <FormItem :label="$t('taskDetail.collectFollowUp.mobile')" prop="mobile" >
                <Input v-model="callInfo.mobile" disabled></Input>
              </FormItem>
            </Col>
            <Col  offset="1">
                <Button v-if="!calling" type="success" @click="toDial" size="large" :style="{marginRight: '15px'}">{{ $t('taskDetail.collectFollowUp.dial') }}</Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <p slot="title" class="card-head">{{$t('taskDetail.collectFollowUp.saveReminder')}}</p>
        <Form ref="formInline" :model="callInfo" :label-width="150">
          <FormItem class="form-inline" :label="$t('taskDetail.collectFollowUp.contactResult')">
            <RadioGroup v-model="callInfo.contactResult" v-if="listSelect.taskInfo">
              <Radio :label="item.key" v-for="(item, index) in listSelect.taskInfo.contactStatus" :key="index">{{item.value}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class="form-inline" :label="$t('taskDetail.collectFollowUp.repaymentWillingness')">
            <RadioGroup v-model="callInfo.repaymentWillingness" v-if="listSelect.taskInfo">
              <Radio :label="item.key" v-for="(item, index) in listSelect.taskInfo.repaymentWish" :key="index">{{item.value}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class="form-inline" :label="$t('taskDetail.collectFollowUp.followUpTime')">
            <DatePicker
              type="datetime"
              :options="timeLimitConfig"
              format="yyyy-MM-dd "
              :placeholder="$t('taskDetail.collectFollowUp.followUpTime')"
              v-model="callInfo.followUpTime">
            </DatePicker>
          </FormItem>
          <FormItem class="form-inline" :label="$t('taskDetail.collectFollowUp.remarks')" :label-width="150">
            <Input v-model="callInfo.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="`${$t('inputPrefix')}${$t('taskDetail.collectFollowUp.remarks')}`"></Input>
          </FormItem>
          <FormItem class="save-btn">
            <Button type="success" :loading="saveCollectLoading" @click="saveCollectData">{{$t('taskDetail.collectFollowUp.saveRest')}}</Button>
          </FormItem>
        </Form>
      </Card>
      <Modal
        align="left"
        class="m-modal"
        :okText="$t('taskDetail.collectFollowUp.add')"
        :cancelText="$t('cancelText')"
        v-model="contractModal">
        <div slot="header" class="header">
          {{$t('taskDetail.collectFollowUp.addContract')}}
        </div>
        <Form ref="contactForm" :model="modelInfo" :rules="contactFormRules" :label-width="100">
          <FormItem :label="$t('taskDetail.taskFollowUp.contractName')" prop="contactName">
            <Input v-model="modelInfo.contactName" :placeholder="`${$t('inputPrefix')}${$t('taskDetail.taskFollowUp.contractName')}`"></Input>
          </FormItem>
          <FormItem :label="$t('taskDetail.taskFollowUp.contractMobile')" prop="phone">
            <Input v-if="!isAddContact" v-model="modelInfo.phone" :disabled="isAddContact" :placeholder="`${$t('inputPrefix')}${$t('taskDetail.taskFollowUp.contractMobile')}`"></Input>
            <span v-else>{{modelInfo.phone}}</span>
          </FormItem>
          <FormItem :label="$t('taskDetail.taskFollowUp.phoneType')" prop="phoneType">
            <Select v-if="listSelect.taskInfo" clearable transfer v-model="modelInfo.phoneType" :placeholder="`${$t('selectPrefix')}${$t('taskDetail.taskFollowUp.phoneType')}`">
              <Option
                :key="index"
                :value="item.key"
                v-for="(item, index) in listSelect.taskInfo.phoneType">
                {{item.value}}
              </Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('taskDetail.taskFollowUp.contractRelationship')" prop="contactType">
            <Select v-if="listSelect.taskInfo" clearable transfer v-model="modelInfo.contactType" :placeholder="`${$t('selectPrefix')}${$t('taskDetail.taskFollowUp.contractRelationship')}`">
              <Option
                :key="index"
                :value="item.key"
                v-for="(item, index) in listSelect.taskInfo.contactType">
                {{item.value}}
              </Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('taskDetail.taskFollowUp.remarks')">
            <Input v-model="modelInfo.memo" class="model-textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="`${$t('inputPrefix')}${$t('taskDetail.taskFollowUp.remarks')}`"></Input>
          </FormItem>
        </Form>
        <div slot="footer" class="footer">
          <Button @click="contractModal = false" align="center">{{$t('cancelText')}}</Button>
          <Button type="primary" @click="saveContract" :loading="saveContractLoading" align="center">{{$t('taskDetail.collectFollowUp.save')}}</Button>
        </div>
      </Modal>
      <Modal
        align="left"
        class="m-modal"
        :okText="$t('taskDetail.collectFollowUp.send')"
        :cancelText="$t('cancelText')"
        v-model="sendMsgModal">
        <div slot="header" class="header">
          {{$t('taskDetail.collectFollowUp.sendMsg')}}
        </div>
        <Form ref="formInline" :label-width="100">
          <FormItem :label="$t('taskDetail.collectFollowUp.msgTemplate')" class="msg-form" prop="tplId">
            <Select
              transfer
              v-model="msgForm.tplId"
              @on-change="selectMsgTpl"
              :disabled="msgForm.payCode ? true : false"
              :placeholder="`${$t('selectPrefix')}${$t('taskDetail.collectFollowUp.msgTemplate')}`">
              <Option
                :key="index"
                :value="item.tplId"
                v-for="(item, index) in msgList">
                {{item.tplName}}
              </Option>
            </Select>
          </FormItem>
          <FormItem class="msg-form"  v-if="showBank">
            <Select
              transfer
              v-model="msgForm.payCode"
              @on-change="selectBank"
              :placeholder="`${$t('selectPrefix')}`"
              :disabled="msgForm.payCode ? true : false">
              <Option
                :key="index"
                :value="item.payCode"
                v-for="(item, index) in bankList">
                {{item.bankName}}
              </Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('taskDetail.collectFollowUp.msgContent')" class="msg-form">
            <Input v-model="msgForm.msgContent" type="textarea" :autosize="{minRows: 4,maxRows: 5}" :placeholder="`${$t('selectPrefix')}${$t('taskDetail.collectFollowUp.msgTemplate')}`" disabled></Input>
          </FormItem>
        </Form>
        <div slot="footer" class="footer">
          <Button @click="sendMsgModal = false" align="center">{{$t('cancelText')}}</Button>
          <Button type="primary" @click="sendMessage" :loading="sendMsgLoading" align="center">{{$t('taskDetail.collectFollowUp.send')}}</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMsgList, sendMsg, getMsgContent } from '@/api/message'
import { againGetContactList,setCuishouLog,addSot} from '@/api/task'
import {  getOrderInfo } from '@/api'
import {getSelectOptions}  from "@/api/index"
import { getcomment } from '@/api/order'
import {
  getContactList,
  dialCall,
  hangUp,
  setContactInfo,
  saveCollecctRecord,
  getContactInfo } from '@/api'
export default {
  name: 'collectFollow',
  props: {
    cuishouId: {
      type: String
    },
    calling: {
      type: Boolean
    }
  },
  data () {
    return {
      orderNo:'',
      istId:0,
      button1: '',
      loading: false,
      saveContractLoading: false,
      saveCollectLoading: false,
      sendMsgLoading: false,
      isAddContact: true,
      contractModal: false,
      isShowCallBtn: true,
      isCall: false,
      sendMsgModal: false,
      showBank: false,
      clickRadio: 0,
      contactList: [],
      contactQuery: {
        page: 1,
        pageSize: 5
      },
      contactPager: {
        count: 0
      },
      msgList: [],
      bankList: [],
      msgForm: {
        id: '',
        tplId: '',
        payCode: '',
        msgContent: '',
        bankInfo: {}
      },
      modelInfo: {
        id: '',
        contactName: '',
        phone: '',
        contactType: '',
        memo: '',
        cuishouId: this.cuishouId
      },
      callInfo: {
        id: '',
        userName: '',
        relationship: '',
        mobile: '',
        encryptPhone: '',
        contactResult: '',
        repaymentWillingness: '',
        followUpTime: '',
        remarks: ''
      },
      timeLimitConfig: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      ruleValidate: {
        tplId: [
          { required: true, message: `${this.$t('selectPrefix')}${this.$t('taskDetail.collectFollowUp.msgTemplate')}`, trigger: 'change' }
        ]
      },
      contactFormRules: {
        contactName: [
          { required:true, message: this.$t('taskDetail.modelMsg.userName'), trigger:'change' }
        ],

        phone: [
          { required: true, message: this.$t('taskDetail.modelMsg.mobile'), trigger: 'change' }
        ],
        contactType: [
          { required: true, type: 'number', message: this.$t('taskDetail.modelMsg.relationship'), trigger: 'change' }
        ],
        phoneType: [

            // { required: true, type: 'number', message: this.$t('taskDetail.modelMsg.phoneType'), trigger: 'change' }
        ],
      },
      customer_comment:[],
      remarkColumns:[
        {
          title: this.$t('taskDetail.remark.remarkSort'),
          align: 'center',
          key: 'id',
        },
        {
          title: this.$t('taskDetail.remark.remarkTxt'),
          align: 'center',
          key: 'comment',
        },
        {
          title: this.$t('taskDetail.remark.remarkTime'),
          align: 'center',
          key: 'dateTime',
        },
        {
          title: this.$t('taskDetail.remark.operatorName'),
          align: 'center',
          key: 'operatorName',
        },
      ],
      columns: [
        {
          title: this.$t('taskDetail.collectFollowUp.select'),
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', {
                class: ['m-radio', {'m-radio-active': this.clickRadio === params.index}]
              })
            ])
          }
        },
        {
          title: this.$t('taskDetail.collectFollowUp.userName'),
          key: 'contactName',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectFollowUp.relationship'),
          key: 'contactType',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectFollowUp.mobile'),
          key: 'phone',
          align: 'center',
          minWidth: 150,
          render: (h, params) => {
            return h('div', [
              h('span', {

              },params.row.phone)
            ])
          }
        },
        {
          title: this.$t('taskDetail.collectFollowUp.remarks'),
          key: 'memo',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('taskDetail.collectFollowUp.mainCallCount'),
          key: 'dialingTimes',
          align: 'center',
          minWidth: 120
        },
        // {
        //   title: this.$t('taskDetail.collectFollowUp.callCount'),
        //   key: 'called',
        //   align: 'center',
        //   minWidth: 120
        // },
        {
          title: this.$t('taskDetail.collectFollowUp.totalCount'),
          key: 'allCallTimes',
          align: 'center',
          minWidth: 120
        },
        {
          title: this.$t('taskDetail.collectFollowUp.callStatus'),
          key: 'contractStatus',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('listModule.handle'),
          key: 'handle',
          align: 'center',
          fixed: 'right',
          width: 240,
          render: (h, params) => {
            const daihouTaskId = params.row.id,
                  rowInfo = params.row,
                  showSendMsg = +params.row.phoneType === 1 ? true : false;
            if(!showSendMsg) {
              return <i-button
                icon="edit"
                type="text"
                size="small"
                onClick={ () => this._showContactEdit(rowInfo) }
                className="fix-table-btn">{this.$t('listModule.editBtn')}</i-button>
            } else{
              return (
                <div>
                  <i-button
                    icon="edit"
                    type="text"
                    size="small"
                    onClick={ () => this._showContactEdit(rowInfo) }
                    className="fix-table-btn">{this.$t('listModule.editBtn')}</i-button>
                  <i-button
                    icon="chatbox-working"
                    type="text"
                    size="small"
                    onClick={ () => this._getMsgList(daihouTaskId) }
                    className="fix-table-btn">{this.$t('taskDetail.collectFollowUp.sendMsg')}</i-button>
                      <i-button
                    icon="edit"
                    type="text"
                    size="small"
                    onClick={ () => this._showWhatsapp(rowInfo) }
                    className="fix-table-btn">{this.$t('listModule.Whatsapp')}</i-button>
                </div>)
            }
          }
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['listSelect'])
  },

  methods: {
    handleClickRow (rowInfo, index) {
      this.clickRadio = index
    },
    toDial () {

      if (!this.callInfo.mobile) {
        this.$Message.error(`${this.$t('selectPrefix')}${this.$t('taskDetail.collectRecordTab.collectRecord.contractPerson')}`)
        return
      }
      dialCall({
        cuishouId: this.cuishouId,
        called: this.callInfo.encryptPhone
      }, (res) => {
        if (+res.status === 0) {
            console.log(res.data.callId,3123)
            this.istId = res.data.callId
          this.isCall = true
          this.$emit('call', true)
          this.isShowCallBtn = false
          const msg = this.$Message.loading({
            content: this.$t('taskDetail.modelMsg.dialing'),
            duration: 0
          });
          setTimeout(msg, 3000);
        }
      })
    },
    toHangUp () {
      if (!this.isCall) {
        return
      }
      hangUp({
        cuishouId: this.cuishouId
      }, (res) => {
        if (+res.status === 0) {
          this.isCall = false
          this.isShowCallBtn = true
          this.$Message.warning({
            content: this.$t('taskDetail.modelMsg.dialDone'),
            duration: 2
          });
        }
      })
    },
    rowClick (currentRow) {
      Object.assign(this.callInfo, {
        userName: currentRow.contactName,
        mobile: currentRow.phone,
        Hidemobile: currentRow.phone.replace(/^(\d{3})\d*(\d{6})$/,'$1****$2'),
        relationship: currentRow.contactType,
        encryptPhone: currentRow.cryptPhone,
        contactResult: '',
        repaymentWillingness: '',
        followUpTime: '',
        remarks: ''
      })
    },

    saveContract () {
     console.log( this.modelInfo.phoneType,  this.modelInfo.contactType,'sun')

      this.$refs.contactForm.validate(valid => {
        console.log( valid,4444)
        if(valid) {
          this.contractModal = false
            setContactInfo(this.modelInfo, (res) => {
              if (+res.status === 0) {
                this.$Message.success(this.$t('taskDetail.modelMsg.saveSuccess'))
                this.updateContactList(this.contactQuery.page)
              }
          });
        }
      });
    },

    addContract () {
      this.$refs.contactForm.resetFields();
      this.isAddContact = false
      Object.assign(this.modelInfo, {
        id: '',
        contactName: '',
        phone: '',
        contactType: '',
        memo: ''
      })

      this.contractModal = true
    },


    saveCollectData () {


       console.log( this.modelInfo.phoneType,666)
      if (!this.callInfo.mobile) {
        this.$Message.error(`${this.$t('selectPrefix')}${this.$t('taskDetail.collectRecordTab.collectRecord.contractPerson')}`)
        return
      }
      if (!this.callInfo.contactResult) {
        this.$Message.error(this.$t('taskDetail.modelMsg.contactResult'))
        return
      }
      if (!this.callInfo.repaymentWillingness) {
        this.$Message.error(this.$t('taskDetail.modelMsg.repaymentWillingness'))
        return
      }
      if (!this.callInfo.followUpTime) {
        this.$Message.error(this.$t('taskDetail.modelMsg.followUpTime'))
        return
      }
      this.saveCollectLoading = true
      saveCollecctRecord({
        cuishouId: this.cuishouId,
        contactsUser: this.callInfo.userName,
        relation: this.callInfo.relationship,
        repayWish: this.callInfo.repaymentWillingness,
        remark: this.callInfo.remarks,
        nextFollowTime: this.callInfo.followUpTime,
        mobile: this.callInfo.encryptPhone,
        contactStatus: this.callInfo.contactResult,
        phoneNum:this.contactPager.count,
        callId:this.istId,
      }, (res) => {
        this.saveCollectLoading = false
        if (+res.status === 0) {
          Object.assign(this.callInfo, {
            repaymentWillingness: '',
            contactResult: '',
            followUpTime: '',
            remarks: ''
          })
          this.$Message.success(this.$t('taskDetail.modelMsg.saveSuccess'))
        }
      })
    },
    selectMsgTpl(tplId) {
      this.showBank = false
      Object.assign(this.msgForm, {
        payCode: '',
        msgContent: '',
        bankInfo: {}
      })
      this.msgList.forEach((item) => {
        if (+tplId === +item.tplId) {
          if (!item.haveNext) {
            this._getMsgContent()
          } else {
            this.bankList = item.nextData
            this.showBank = true
          }
        }
      })
    },
    selectBank(payCode) {
      this.bankList.forEach((item) => {
        if (payCode === item.payCode) {
          this.msgForm.bankInfo = item
          this._getMsgContent()
        }
      })
    },
    sendMessage() {
      if (!this.msgForm.tplId) {
        this.$Message.error(`${this.$t('selectPrefix')}${this.$t('taskDetail.collectFollowUp.msgTemplate')}`)
        return
      }
      if (this.showBank && !this.msgForm.payCode) {
        this.$Message.error(`${this.$t('selectPrefix')}${this.$t('taskDetail.collectFollowUp.repayChannel')}`)
        return
      }
      this.sendMsgLoading = true
      sendMsg({
        id: this.msgForm.id,
        tplId: this.msgForm.tplId,
        cuishouId: this.cuishouId,
        bankInfo: this.msgForm.bankInfo
      }, (res) => {
        this.sendMsgLoading = false
        if (+res.status === 0) {
          this.sendMsgModal = false
        }
      })
    },
    getListAgain() {
      againGetContactList({
        cuishouId: this.cuishouId
      }, (res) => {
        if (+res.status === 0) {
          this.$Modal.warning({
            content: res.msg
          });
        }
      })
    },
    updateContactList(page = 1) {
      this.contactQuery.page = page
      this._getList()
    },
    _getMsgContent() {
      getMsgContent({
        id: this.msgForm.id,
        tplId: this.msgForm.tplId,
        bankInfo: this.msgForm.bankInfo,
        cuishouId: this.cuishouId
      }, (res) => {
        if (+res.status === 0) {
          const data = res.data
          this.msgForm.msgContent = data.msgContent
        }
      })
    },
    _getList () {
      this.loading = true

      Object.assign(this.contactQuery, {
        cuishouId: this.cuishouId
      })

      getContactList(this.contactQuery, (res) => {
        this.loading = false
        if (+res.status === 0) {
          const data = res. data
          this.contactList = data.contactList
          this.contactPager.count = +data.arrPager.count
          let item = this.contactList.length ? this.contactList[0] : {}
          this.clickRadio = 0
          if (Object.keys(item).length) {
            Object.assign(this.callInfo, {
              userName: item.contactName,
              mobile: item.phone,
              Hidemobile: item.phone.replace(/^(\d{3})\d*(\d{6})$/,'$1****$2'),
              relationship: item.contactType,
              encryptPhone: item.cryptPhone
            })
          }
        }
      })
      this._getcomment()


    },
    _getOrderInfo () {
      getOrderInfo({cuishouId: this.cuishouId},res=>{
         if (+res.status === 0){
          console.log(res.data.orderNo)
          this.orderNo = res.data.orderNo
         }

      })

    },
    _showContactEdit (item) {
      this.isAddContact = true
      getContactInfo({
        id: item.id
      }, (res) => {
        if (+res.status === 0) {
          const data = res.data;
          Object.assign(this.modelInfo, {
            id: item.id,
            contactName: data.contactName,
            phone: data.phone,
            Hidephone:data.phone.replace(/^(\d{3})\d*(\d{6})$/,'$1****$2'),
            phoneType: +data.phoneType,
            contactType: data.contactType,
            memo: data.memo
          })
        }
      })
      this.contractModal = true
    },

    _showWhatsapp(item){
      console.log(item)
      if(item.whatappUrl !== ""){
        let data ={
          mobile:item.phone,
          relation:item.contactType,
          phoneNum:this.contactPager.count,
          orderNo:this.orderNo,
        }
        console.log(data,999)
          addSot(data,res=>{
               window.open(item.whatappUrl,'_blank');
          })

        }
    },
    _getMsgList(id) {
      this.msgList = [];
      Object.assign(this.msgForm, {
        id: id,
        tplId: '',
        payCode: '',
        msgContent: '',
        bankInfo: {}
      })
      getMsgList({
        id: id,
        cuishouId: this.cuishouId
      }, (res) => {
        if (+res.status === 0) {
          this.msgList = res.data
          this.sendMsgModal = true
        }
      })
    },
     _getcomment(){
       getcomment({
        orderNo: this.$route.query.orderNo
      }, (res) => {
        if (+res.status === 0) {
          this.customer_comment = res.data
        }
      })
    }
  },
  watch: {
    calling: function (newVal) {
      if (!newVal) {
        this.toHangUp()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-collectFollow {
  position: relative;
  padding-top: 10px;
  .add-contract  {
    margin-right: 80px;
  }
  .follow-table-warp {
    text-align: right;
    padding: 14px 16px;
    border: 1px solid #e9eaec;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .update-btn {
    margin-bottom: 15px;
  }
  .card-gap {
    margin-bottom: 20px;
  }
  .tab-hd {
    display: block;
    overflow: hidden;
    position: fixed;
    z-index: 11;
    top: 60px;
    right: 48px;
    .ivu-btn-primary {
      float: right;
      margin: 10px 0 20px;
    }
  }
  .form-inline {
    margin-bottom: 10px;
  }
  .save-btn{
    margin-top: 20px;
  }
  .card-head {
    color: #57a3f3;
  }
  @media screen and (max-width: 1200px){
    .tab-hd {
      position: initial
    }
  }

}
</style>
<style lang="scss">
.m-collectFollow {
  .card-gap {
    margin-bottom: 20px;
  }
  .msg-form {
    .ivu-form-item-content {
      width: 280px;
    }
  }
}
</style>

