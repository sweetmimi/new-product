<template>

  <div id="PhoneApproval" class="m-phoneApproval">
    
    <Table border :columns="columns" :loading="loading" :data="list" v-if="showTable">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
    <div class="record-box">
      <!-- v-if="type === 'view' && phoneRecords" -->
      <div class="phoneRecords" >
        <div class="box">
          <Row align="middle" id="drag" class-name="box-title">
            <Col span="24" class-name="col-style-title title">
              {{ $t('approvalDetail.associatedOrderInfo.phoneRecords.title') }}
            </Col>
          </Row>
          <div class="box-info">
            <Row align="middle">
            <Col span="12" class-name="col-style-title">
              {{ $t('approvalDetail.associatedOrderInfo.check') }}
            </Col>
            <Col span="12" class-name="col-style-title">
              {{ $t('approvalDetail.associatedOrderInfo.record') }}
            </Col>
          </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.isSelf') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.isSelf"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.idcard') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.idcard"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.idcardName') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.idcardName"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.birthday') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.birthday"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.idcardAddress') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.idcardAddress"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.othermobile') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.othermobile"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.curAddress') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.curAddress"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.curAddressOwn') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.curAddressOwn"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.loanUse') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.loanUse"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.maritalStatus') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.maritalStatus"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.legend') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.legend"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.organization') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.organization"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.monthlyIncome') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.monthlyIncome"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.repayDay') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.repayDay"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.companyAddress') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.companyAddress"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.workType') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.workType"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.curWorkTime') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.curWorkTime"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.curWorkContactType') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.curWorkContactType"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.hasOtherLoan') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.hasOtherLoan"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.totalAmount') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.totalAmount"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.canRepayAmount') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.canRepayAmount"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactName') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.contactName"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactRelationship') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.contactRelationship"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactPhone') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.contactPhone"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactKnown') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.contactKnown"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.relationship') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.relationship"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.contactCheck') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.contactCheck"></Input>
              </Col>
            </Row>
            <Row align="middle">
              <Col span="12" class-name="col-style">{{ $t('approvalDetail.associatedOrderInfo.phoneRecords.workInfoCheck') }}</Col>
              <Col span="12" class-name="col-style">
                <Input class="short" type="textarea" readonly v-model="phoneRecords.workInfoCheck"></Input>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <Modal
      align="left"
      :cancelText="$t('cancelText')"
      v-model="audioModal">
      <div slot="header" class="header">
        {{$t('approvalDetail.telApproval.soundRecord')}}
      </div>
      <Form ref="formInline" :label-width="75">
        <Row>
          <Col span="22">
            <FormItem>
              <Col offset="1">
                <audio :src="audioSrc" class="audio" controls="controls"></audio>
              </Col>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="footer">
        <Button @click="cancelAudio" align="center">{{$t('cancelText')}}</Button>
      </div>
    </Modal>
  </div> 
</template>

<script>
import { getCallList } from '@/api/task'
export default {
  name: 'phoneApproval',
  props: {
    cuishouId: {
      type: String
    },
    phoneRecords: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      loading: false,
      showTable: true,
      audioModal: false,
      list: [],
      audioSrc: '',
      columns: [
        {
          title: this.$t('approvalDetail.telApproval.callNumber'),
          key: 'callNo',
          align: 'center',
          fixed: 'left',
          minWidth: 150
        },
        {
          title: this.$t('approvalDetail.telApproval.callStatus'),
          key: 'status',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('approvalDetail.telApproval.mobile'),
          key: 'destnumber',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('approvalDetail.telApproval.startTime'),
          key: 'starttime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('approvalDetail.telApproval.endTime'),
          key: 'endtime',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('approvalDetail.telApproval.dialPerson'),
          key: 'caller',
          align: 'center',
          minWidth: 150
        },
        {
          title: this.$t('listModule.handle'),
          key: 'handle',
          align: 'center',
          width: 200,
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                  icon: 'volume-low',
                  disabled: !params.row.downUrl
                },
                class: 'fix-table-btn',
                on: {
                  click: () => {
                    this._playAudio(params.row)
                  }
                }
              }, this.$t('approvalDetail.telApproval.soundRecord'))
            ])
          }
        }
      ]
    }
  },

  methods: {
    _getList () {
     
      this.loading = true
      getCallList({
        cuishouId: this.cuishouId
      }, (res) => {
        console.log(res,444)
        if (+res.status === 0) {
          this.loading = false
          this.list = res.data.arrCall
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    },
    _playAudio (item) {
      this.audioSrc = item.downUrl
      this.audioModal = true
    },
    cancelAudio() {
      this.audioSrc = ''
      this.audioModal = false
    }
  }
}
</script>

<style scoped lang="scss">
.m-phoneApproval {
  .header {
    font-size: 16px;
    text-align: left;
  }
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
$borderColor: #e9eaec;
.box {
  border-left: 1px solid $borderColor;
  border-top: 1px solid $borderColor;
  margin-top: 20px;
  .col-style {
    height: 70px;
    line-height: 70px;
    border-right: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    text-align: center;
    .short {
      width: 70%;
    }
    &.title {
      padding-left: 0;
      text-align: center;
      color: #495060;
      font-weight: bold;
      background-color: #f8f8f9;
    }
    &.error {
      color: red;
    }
  }
  .col-style-title {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    text-align: center;
    &.title {
      padding-left: 0;
      text-align: center;
      color: #495060;
      font-weight: bold;
      background-color: #f8f8f9;
    }
  }
}
</style>


