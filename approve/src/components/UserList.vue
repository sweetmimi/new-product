<template>
    <div id="userList" class="m-userList">
      <Form ref="formInline" :model="searchForm" :label-width="100">
        <Row type="flex">
         <FormItem :label="$t('userManagement.serachBlock.account')"  >
            <Input v-model="searchForm.id" :placeholder="`${$t('inputPrefix')}${$t('userManagement.serachBlock.account')}`"></Input>
          </FormItem>
          <FormItem :label="$t('userManagement.serachBlock.userName')">
              <Input v-model="searchForm.name" :placeholder="`${$t('inputPrefix')}${$t('userManagement.serachBlock.userName')}`"></Input>
          </FormItem>
          <FormItem :label="$t('userManagement.serachBlock.phoneNum')" >
              <Input v-model="searchForm.mobile" :placeholder="`${$t('inputPrefix')}${$t('userManagement.serachBlock.phoneNum')}`"></Input>
          </FormItem>
          <FormItem :label="$t('userManagement.serachBlock.ruler')">
            <Select clearable transfer
              v-model="searchForm.role"
              v-if="listSelect.userList"
              :placeholder="`${$t('selectPrefix')}${$t('userManagement.serachBlock.ruler')}`"  style="width: 150px">
                <Option
                    :key="index"
                    :value="option.key"
                    v-for="(option, index) in listSelect.userList.role">
                    {{option.value}}
                </Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('download.status')" prop="range" >
            <Select clearable transfer
              v-model="searchForm.status"
              v-if="listSelect.userList"
              :placeholder="`${$t('selectPrefix')}${$t('download.status')}`"  style="width: 150px">
                <Option
                    :key="index"
                    :value="option.key"
                    v-for="(option, index) in listSelect.userList.status">
                    {{option.value}}
                </Option>
            </Select>
          </FormItem>
          <FormItem class="fix-form-btn" :label-width="100">
            <Button type="primary" slot="label" :loading="loading.tableLoading" @click="handleUpdateTable()"> {{$t('approvalTask.serachBlock.search')}}</Button>
          </FormItem>
        </Row>
    </Form>

    <Table border v-if="showTable" :loading="loading.tableLoading" :columns="tableDefine" :data="tableData">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>

    <Page
      show-total
      :page-size="size"
      v-if="pageCount > size"
      :total="pageCount"
      class-name="m-pagination"
      @on-change="handleUpdateTable"
      :current.sync="searchForm.page"
      show-elevator>{{$t('pageSlot.total')}} {{pageCount}} {{$t('pageSlot.count')}}</Page>
    <Modal
      align="left"
      class="m-modal"
      v-model="modal.edit">
      <div slot="header" class="header">{{$t('userManagement.editInfo.editUserInfo')}}</div>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.account')}:`}}</Col>
          <Col span="18">{{modalInfo.id}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.userName')}:`}}</Col>
          <Col span="18">{{modalInfo.name}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.phone')}:`}}</Col>
          <Col span="18">{{modalInfo.mobile}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.email')}:`}}</Col>
          <Col span="18">{{modalInfo.email}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.role')}:`}}</Col>
          <Col span="18">{{modalInfo.role}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.state')}:`}}</Col>
          <Col span="18">{{modalInfo.status}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.createTime')}:`}}</Col>
          <Col span="18">{{modalInfo.createTime}}</Col>
      </Row>
      <Form ref="editUserForm" :model="extnumberForm" class="edit-form" :label-width="120" :rules="extnumberFormRulers">
        <FormItem :label="`${$t('userManagement.editInfo.assignNumber')}:`" prop="isAlloc">
          <RadioGroup v-model="extnumberForm.isAlloc">
            <Radio :label="1">{{$t('userManagement.editInfo.yes')}}</Radio>
            <Radio :label="0">{{$t('userManagement.editInfo.no')}}</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button @click="modal.edit = false" align="center">{{$t('cancelText')}}</Button>
        <Button type="success" @click="handleEditUser" :loading="loading.editLoading" align="center">{{$t('okText')}}</Button>
      </div>
    </Modal>


    <Modal
      footerHide
      align="left"
      class="m-modal"
      v-model="modal.view">
      <div slot="header" class="header">
        {{$t('userManagement.editInfo.viewUserInfo')}}
      </div>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.account')}:`}}</Col>
          <Col span="18">{{modalInfo.id}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.userName')}:`}}</Col>
          <Col span="18">{{modalInfo.name}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.phone')}:`}}</Col>
          <Col span="18">{{modalInfo.mobile}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.email')}:`}}</Col>
          <Col span="18">{{modalInfo.email}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.role')}:`}}</Col>
          <Col span="18">{{modalInfo.role}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.state')}:`}}</Col>
          <Col span="18">{{modalInfo.status}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.createTime')}:`}}</Col>
          <Col span="18">{{modalInfo.createTime}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.assignNumber')}:`}}</Col>
          <Col span="18">{{modalInfo.extnumber}}</Col>
      </Row>
      <Row class="display-row">
          <Col span="6" class="display-key">{{`${$t('userManagement.editInfo.assignPassword')}:`}}</Col>
          <Col span="18">{{modalInfo.extpassword}}</Col>
      </Row>
    </Modal>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUserList, operateAction, editExtnumber } from '@/api/user'
export default {
  data () {
    return {
      size: 10,
      loading: {
        tableLoading: false,
        editLoading: false
      },
      modal: {
        view: false,
        edit: false
      },
      showTable: true,
      extnumberForm: {
        isAlloc: null
      },
      extnumberFormRulers: {
        isAlloc: [
          {
            type: 'number',
            required: true,
            trigger: 'change',
            message: this.$t('userManagement.editInfo.assignNumberRules')
          }
        ]
      },
      searchForm: {
        id: '',
        name: '',
        mobile: '',
        extnumber: '',
        roleId: '',
        status: '',
        page: 1
      },
      tableDefine: [
        {
          title: this.$t('listModule.userInfoList.accountNumber'),
          align: 'center',
          key: 'id',
          fixed: 'left',
          minWidth: 100
        },
        {
          title: this.$t('listModule.userInfoList.name'),
          align: 'center',
          key: 'name',
          minWidth: 100
        },
        {
          title: this.$t('listModule.userInfoList.phone'),
          align: 'center',
          key: 'mobile',
          minWidth: 100
        },
        {
          title: this.$t('listModule.userInfoList.email'),
          align: 'center',
          key: 'email',
          minWidth: 100
        },
        {
          title: this.$t('listModule.userInfoList.mobile'),
          align: 'center',
          key: 'extnumber',
          minWidth: 100
        },
        {
          title: this.$t('listModule.userInfoList.createTime'),
          align: 'center',
          key: 'createTime',
          minWidth: 100
        },
        {
          title: this.$t('listModule.userInfoList.role'),
          align: 'center',
          key: 'role',
          minWidth: 100
        },
        {
          title: this.$t('listModule.userInfoList.status'),
          align: 'center',
          key: 'status',
          minWidth: 100
        },
        {
          title: this.$t('listModule.handle'),
          key: 'handle',
          align: 'center',
          width: 180,
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
                    this.handleTableAction('view', params.row)
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
                    this.extnumberForm = {
                      isAlloc: null,
                      userId: params.row.id
                    }
                    this.handleTableAction('edit', params.row)
                  }
                }
              }, this.$t('listModule.editBtn'))
            ])
          }
        }
      ],
      tableData: [],
      pageCount: 0,
      modalInfo: {}
    }
  },

  computed: {
    ...mapGetters(['listSelect'])
  },

  methods: {
    handleTableAction (type, userInfo) {
      const payload = {
        type: type,
        userId: userInfo.id
      }
      operateAction(payload, (res) => {
        this.modal[type] = true
        if (+res.status === 0) {
          const data = res.data
          this.modalInfo = data.userInfo
        }
      })
    },

    _fetchUserList (query = this.searchForm) {
      this.loading.tableLoading = true
      getUserList({
        query: query
      }, (res) => {
        const result = res.data
        this.loading.tableLoading = false
        if (+res.status === 0) {
          this.pageCount = +result.arrPager.count
          this.tableData = result.arrUser
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    },

    handleUpdateTable (pageIndex) {
      this.searchForm.page = pageIndex || 1
      this._fetchUserList(this.searchForm)
    },

    handleEditUser () {
      this.$refs['editUserForm'].validate(valid => {
        if (valid) {
          this.loading.editLoading = true
          editExtnumber(this.extnumberForm, (res) => {
            this.loading.editLoading = false
            if (+res.status === 0) {
              this.modal.edit = false
              this._fetchUserList()
            }
          })
        }
      })
    }
  },

  created () {
    this._fetchUserList()
  }
}
</script>
<style scoped lang="scss">
.m-userList {
  .edit-form {
    .ivu-form-item {
      margin-bottom: 0;
    }
    .ivu-form-item-error {
      margin-bottom: 24px;
    }
  }
}
.display-row {
    height: 32px;
    line-height: 32px;
    .display-key{
      text-align: right;
      padding-right: 15px;
    }
}
</style>
<style lang="scss">
.m-userList {
  .ivu-form-item-content {
    width:170px;
  }
}
</style>
