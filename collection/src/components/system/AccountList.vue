<template>
    <div id="userList">
      <Form ref="formInline" :model="searchForm" >
        <Row type="flex">
          <FormItem :label="$t('userManagement.serachBlock.account')" :label-width="80">
            <Input v-model="searchForm.mobile" :placeholder="`${$t('inputPrefix')}${$t('userManagement.serachBlock.account')}`"></Input>
          </FormItem>
          <FormItem :label="$t('userManagement.serachBlock.userName')" :label-width="110">
              <Input v-model="searchForm.userName" :placeholder="`${$t('inputPrefix')}${$t('userManagement.serachBlock.userName')}`" style="width: 160px"></Input>
          </FormItem>
          <FormItem :label="$t('userManagement.serachBlock.state')" :label-width="60">
            <Select v-if="listSelect.userList" clearable transfer v-model="searchForm.staffStatus" :placeholder="`${$t('selectPrefix')}${$t('userManagement.serachBlock.state')}`">
              <Option
                :key="index"
                :value="option.key"
                v-for="(option, index) in listSelect.userList.staffStatus">
                {{option.value}}
              </Option>
            </Select>
          </FormItem>
          <FormItem class="fix-form-btn" :label-width="110">
              <Button slot="label"  type="primary" :loading="loading.tableLoading" @click="handleUpdateTable()"> {{$t('caseManage.serachBlock.search')}}</Button>
          </FormItem>
        </Row>
    </Form>

    <Table border v-if="showTable" :loading="loading.tableLoading" :columns="tableDefine" :data="tableData">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>

    <Page :total="totalList"
      v-if="totalList > size"
      :current.sync="searchForm.page"
      :page-size="size"
      class-name="m-pagination"
      show-total
      @on-change="handleUpdateTable"
      show-elevator>{{$t('pageSlot.total')}} {{totalList}} {{$t('pageSlot.count')}}</Page>
    <Modal
      align="left"
      class="m-modal"
      v-model="modal.editModal"
      :okText="$t('okText')"
      :cancelText="$t('cancelText')">
        <div slot="header" class="header">{{$t('userManagement.editInfo.editUserInfo')}}</div>
        <Row class="edit-row">
            <Col span="6" class="edit-key">{{`${$t('userManagement.editInfo.userName')}:`}}</Col>
            <Col span="18">{{checkInfo.staffName}}</Col>
        </Row>
        <!-- <Row class="edit-row">
            <Col span="6" class="edit-key">{{`${$t('userManagement.editInfo.email')}:`}}</Col>
            <Col span="18">{{checkInfo.email}}</Col>
        </Row> -->
        <Row class="edit-row">
            <Col span="6" class="edit-key">{{`${$t('userManagement.editInfo.role')}:`}}</Col>
            <Col span="18">{{checkInfo.roleStr}}</Col>
        </Row>
        <Row class="edit-row">
            <Col span="6" class="edit-key">{{`${$t('userManagement.editInfo.state')}:`}}</Col>
            <Col span="18">{{checkInfo.staffStatus}}</Col>
        </Row>

        <Form ref="editUserForm" :model="query" class="edit-form" :label-width="120" :rules="editFormRuler">
          <FormItem :label="`${$t('userManagement.editInfo.assignNumber')}:`" prop="voipChannel">
            <RadioGroup v-model="query.voipChannel" >
              <Radio label="Infinity">Infinity</Radio>
              <Radio label="Sme">Sme</Radio>
              <Radio label="tidak">tidak</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="`${$t('userManagement.editInfo.task')}:`">
            <CheckboxGroup v-model="query.daihou_mission" offset="1" v-if="listSelect.userList.daihou_mission">
              <Checkbox v-for="(task, index) in listSelect.userList.daihou_mission" :key="index" :label="task.key">{{task.value}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
      <div slot="footer" class="footer">
        <Button @click="modal.editModal = false" align="center">{{$t('cancelText')}}</Button>
        <Button type="primary" @click="handleEditUser" :loading="loading.editLoading" align="center">{{$t('okText')}}</Button>
      </div>
    </Modal>

    <Modal
      footerHide
      align="left"
      v-model="modal.checkModal"
      :okText="$t('okText')"
      class="check-model"
      :cancelText="$t('cancelText')">
      <div slot="header" class="header">
        {{$t('userManagement.editInfo.viewUserInfo')}}
      </div>
      <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.userName')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.staffName}}</Col>
      </Row>
      <!-- <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.email')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.email}}</Col>
      </Row> -->
      <!-- <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.phone')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.phone}}</Col>
      </Row> -->
      <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.role')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.roleStr}}</Col>
      </Row>
      <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.state')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.staffStatus}}</Col>
      </Row>
      <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.createTime')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.createTime}}</Col>
      </Row>
      <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.assignNumber')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.voipChannel}}</Col>
      </Row>
      <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.phone')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.phone}}</Col>
      </Row>
      <!-- <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.phonePassword')}}:</Col>
        <Col offset="1" span="14">{{checkInfo.phonePassword}}</Col>
      </Row>
      <Row class="edit-row">
        <Col span="6" class="edit-key">{{$t('userManagement.editInfo.task')}}:</Col>
        <Col offset="1" span="17">
          <Row>
            <Col
              span="8"
              :key="index"
              class="edit-value"
              v-for="(task, index) in checkInfo.daihou_mission">{{missionMap[task]}}</Col>
          </Row>
        </Col>
      </Row> -->
      <div slot="footer" class="footer">
        <Button type="primary" @click="modal.checkModal = false" align="center">{{$t('close')}}</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUserList, postUserInfo, getUserInfo } from '@/api'
export default {
  data () {
    return {
      size: 10,
      loading: {
        tableLoading: false,
        editLoading: false
      },
      modal: {
        checkModal: false,
        editModal: false
      },
      editFormRuler: {
        voipChannel: [
          { required: true, message: this.$t('userManagement.editInfo.assignNumberRules'), trigger: 'change', }
        ]
      },
      searchForm: {
        mobile: '',
        userName: '',
        staffStatus: '',
        page: 1
      },
      tableDefine: [
        {
          align: 'center',
          title: this.$t('listModule.userInfoList.accountNumber'),
          key: 'mobile',
          minWidth: 120
        },
        {
          align: 'center',
          title: this.$t('listModule.userInfoList.name'),
          key: 'staffName',
          minWidth: 100
        },
        {
          align: 'center',
          title: this.$t('listModule.userInfoList.isDivide'),
          key: 'voipChannel',
          minWidth: 120
        },
        {
          align: 'center',
          title: this.$t('listModule.userInfoList.mobile'),
          key: 'phone',
          minWidth: 120
        },
        {
          align: 'center',
          title: this.$t('listModule.userInfoList.status'),
          key: 'staffStatus',
          minWidth: 120
        },
        {
          align: 'center',
          title: this.$t('listModule.userInfoList.createTime'),
          key: 'createTime',
          minWidth: 120
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
                  icon: 'eye'
                },
                class: 'fix-table-btn',
                on: {
                  click: () => {
                    this._toCheck(params.row.staffId)
                  }
                }
              }, this.$t('listModule.viewBtn')),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                  icon: 'edit'
                },
                class: 'fix-table-btn action-left-border',
                on: {
                  click: () => {
                    this._toEdit(params.row.staffId)
                  }
                }
              }, this.$t('listModule.editBtn'))
            ])
          }
        }
      ],
      tableData: [],
      totalList: 0,
      checkInfo: {},
      showTable: true,
      query: {
        staffId: '',
        voipChannel: '',
        daihou_mission: [],
        role:2
      }
    }
  },
  computed: {
    ...mapGetters(['listSelect']),
    missionMap: function () {
      let map = {}
      if (this.listSelect.userList && this.listSelect.userList.daihou_mission) {
        this.listSelect.userList.daihou_mission.forEach(item => {
          map[item.key] = item.value
        })
      }
      return map
    }
  },

  created () {
    this._fetchData()
  },

  methods: {
    _toCheck (staffId) {

      getUserInfo({staffId: staffId}, (res) => {
         this.modal.checkModal = true
        this.checkInfo = res.data.staffInfo
      })
    },

    _toEdit (staffId) {
      this.$refs['editUserForm'].resetFields()
      this.query.staffId = staffId
      getUserInfo({staffId: staffId}, (res) => {
        this.modal.editModal = true
        this.checkInfo = res.data.staffInfo
        this.query.daihou_mission = res.data.staffInfo.daihou_mission
        this.query.voipChannel = res.data.staffInfo.voipChannel

      })
    },

    _fetchData (search) {
      this.loading.tableLoading = true
      getUserList({
        query: search,
        role:2
      }, (res) => {
        this.loading.tableLoading = false
        if (+res.status === 0) {
          this.totalList = this.totalList = Number(res.data.arrPager.count)
          this.tableData = res.data.userList
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    },

    handleUpdateTable (pageIndex) {
      this.searchForm.page = pageIndex || 1
      this._fetchData(this.searchForm)
    },
    handleEditUser () {
      this.$refs['editUserForm'].validate(valid => {
        if (valid) {
          this.loading.editLoading = true
          postUserInfo(this.query, (res) => {
            this.loading.editLoading = false
            if (+res.status === 0) {
              this.modal.editModal = false
              this._fetchData(this.searchForm)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .edit-row {
  height: 32px;;
  line-height: 32px;
  .edit-key{
    text-align: right;
    padding-right: 15px;
  }
  .edit-value {
    text-align: left;
  }
}
.edit-form{
  .ivu-form-item {
    margin-bottom: 0;
  }
  .ivu-form-item-error {
    margin-bottom: 24px;
  }
}

.edit-row {
  margin-top: 10px;
}

</style>
<style lang="scss">
  .check-model {
    .ivu-modal-body {
      height: 470px;
    }
  }
</style>
