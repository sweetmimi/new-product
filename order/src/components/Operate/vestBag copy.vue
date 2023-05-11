<template>
  <div class="m-accountList">
    <Tabs animated="false" @on-click="handleTab" :value="tabVal">
      <TabPane v-for="(item,index) in tabs" :key="index" :label="item.name" :name="item.key" :icon="item.icon">
        <div class="table-wrap">
          <Button icon="arrow-swap" type="success" class="batch-change" v-if="role.indexOf('role_super_admin') > -1"
            @click="add">Buat tas rompi</Button>
          <Table height="500" border ref="table" :data="list" :columns="tableColums" :loading="loading">
            <Spin slot="loading" fix class="m-loading">
              <Icon type="load-c" size=18 class="spin-icon"></Icon>
              <div>{{$t('loadingText')}}</div>
            </Spin>
            <!-- table loading -->
            <template slot="action" slot-scope="props">
              <!-- <Button type="text" class="fix-table-btn" @click="view(props.rowInfo.id)" icon="ios-eye" size="small">{{$t('operate.viewBtn')}}</Button> -->
              <Button type="text" class="fix-table-btn" @click="update(props.rowInfo)" icon="ios-create-outline"
                size="small">{{$t('operate.editBtn')}}</Button>
            </template>
          </Table>

        </div>
        <!-- table -->
        <Page v-if="total > pageSize" :total="total" :page-size="pageSize" :current.sync="searchInfo.page"
          class-name="m-pagination" @on-change="searchList" show-total show-elevator>
          {{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}
        </Page>
        <!-- page -->
      </TabPane>

    </Tabs>

    <Modal :title="modalTitle" width=800 class="changModal m-modal" @on-visible-change="modalVisibleChange"
      v-model="showModal">
      <div class="bd">
        <div class="m-card">
          <Form :model="formInfo" ref="form" :label-width="100" :rules="rules">

            <!--  :disabled="operateType === 'edit'" -->
            <FormItem label="nama Produk" prop="mobile">
              <Input type="text" v-model="formInfo.mobile" placeholder="silahkan masukkan nama produk" autocomplete="off" />
            </FormItem>
            <FormItem label="ID" prop="name">
              <Input type="text" v-model="formInfo.name" :disabled="operateType === 'edit'" placeholder="ID"
                autocomplete="off" />
            </FormItem>

            <FormItem label="Nama paket" prop="password">
              <Input type="text" v-model="formInfo.password" :disabled="operateType === 'edit'" placeholder="Silakan masukkan nama paket"
                autocomplete="off" />
            </FormItem>
            <FormItem label="Tipe" prop="inner_user">
              <RadioGroup v-model="formInfo.inner_user">
                <Radio label="1" :disabled="operateType === 'edit'">
                  <span>APP</span>
                </Radio>
                <Radio label="2" :disabled="operateType === 'edit'">
                  <span>API</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="platform" prop="platform">
              <RadioGroup v-model="formInfo.platform">
                <Radio label="android" :disabled="operateType === 'edit'">
                  <span>Android</span>
                </Radio>
                <Radio label="ios" :disabled="operateType === 'edit'">
                  <span>ios</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="tipe produk" prop="type">
              <RadioGroup v-model="formInfo.type">
                <Radio label="1" :disabled="operateType === 'edit'">
                  <span>produk biasa</span>
                </Radio>
                <Radio label="2" :disabled="operateType === 'edit'">
                  <span>Produk penurunan</span>
                </Radio>
                <Radio label="3" :disabled="operateType === 'edit'">
                  <span>produk yang masuk daftar putih</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="Status tas rompi" prop="status">
              <RadioGroup v-model="formInfo.status">
                <Radio label="1">
                  <span>{{$t('operateAmount.userInfo.normal')}}</span>
                </Radio>
                <Radio label="0">
                  <span>{{$t('operateAmount.userInfo.stop')}}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel">{{$t('cancelText')}}</Button>
        <Button type="success" :loading="btnLoading" @click="operate">{{$t('okText')}}</Button>
      </div>
    </Modal>

    <Modal :title="`${$t('operateAmount.viewInfo')}`" width=800 class="changModal m-modal" footerHide
      v-model="viewModal">
      <div class="bd">
        <Card class="m-card">
          <Row align="middle">
            <Col span="12" class-name="col">
            <div class="count">{{$t('operateAmount.userInfo.name')}}：{{accountInfo.name}}</div>
            </Col>
            <Col span="12" class-name="col">
            <div class="count">{{$t('operateAmount.userInfo.mobile')}}：{{accountInfo.mobile}}</div>
            </Col>
            <Col span="12" class-name="col">
            <div class="count">{{$t('operateAmount.userInfo.email')}}：{{accountInfo.email}}</div>
            </Col>
            <Col span="12" class-name="col">
            <div class="count">{{$t('operateAmount.userInfo.id')}}：{{accountInfo.id}}</div>
            </Col>
            <Col span="24" class-name="col">
            <Tabs>
              <TabPane v-for="(item, key) in selectItems.system_name_map" :label="item" :key="key">
                <div v-if="accountInfo.access_system && accountInfo.access_system.indexOf(key) > -1">
                  {{$t('operateAmount.userInfo.authority')}}：{{$t('operateAmount.userInfo.authorityType')}}</div>
                <div v-else>{{$t('operateAmount.userInfo.authority')}}：{{$t('operateAmount.userInfo.forbidden')}}</div>
                <div>{{$t('operateAmount.userInfo.role')}}：
                  <span v-for="(item, index) in accountInfo.role[key]" :key="index">
                    {{selectItems.system_role[key][item]}}
                  </span>
                </div>
              </TabPane>
            </Tabs>
            </Col>
          </Row>
        </Card>
      </div>
    </Modal>
    <!-- modal -->
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from 'vue-property-decorator'
  import {
    productconf,
    SaveProductConf
  } from '@/api/user'
  import {
    Getter,
    Action
  } from 'vuex-class'
  @Component
  export default class AccountList extends Vue {
    @Getter('selectItems') selectItems: any
    @Action('getSelectList') getSelectList: any
    $refs!: {
      table: HTMLFormElement,
      form: HTMLFormElement
    }
    role = ''
    showTable = false
    tabName = 'sys_order'
    tabVal='android'
    tabs= [
      {
        icon: 'logo-android',
        key: 'android',
        name: 'Android'
      },
      {
        icon: 'logo-apple',
        key: 'ios',
        name: 'IOS'
      },
      
    ]
    searchInfo = {
      name: '',
      mobile: '',
      page: 1,
      platform:'android'
    }
    formInfo = {
      id: '',
      name: '',
      mobile: '',
      email: '',
      password: '',
      status: '2',
      role: [],
      access_system: [],
      inner_user: '',
      platform: '',
      type: '',
      // packageName:'',
    }
    operateType = ''
    total = 0
    pageCount = 0
    pageSize = 10
    showModal = false
    viewModal = false
    loading = false
    btnLoading = false
    list = []
    accountInfo = {
      role: {}
    }
    update_time = ''
    systemInfo = []
    formatDayTime(val) {



      var date = new Date(val);
      // console.log(new Date(1551334252272),val)
      const Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      if (M < 10) {
        M = 0 + M
      }
      if (D < 10) {
        D = 0 + D
      }
      return Y + '-' + M + '-' + D

    }

    get modalTitle() {
      let title = ''
      switch (this.operateType) {
        case 'add':
          title = 'add'
          break
        case 'edit':
          title = 'edit'
          break
        default:
          break
      }
      return title
    }
    rules = {
      name: [{
        required: true,
        trigger: 'blur'
      }],
      mobile: [{
        required: true,
        trigger: 'blur'
      }],
      password: [{
        required: true,
        trigger: 'change'
      }],
      inner_user: [{
        required: true,
        trigger: 'change',
      }],
      platform: [{
        required: true,
        trigger: 'change',
      }],
      status: [{
        required: true,
        trigger: 'change',
      }],
      type: [{
        required: true,
        trigger: 'change',
      }],

    }
    tableColums = [{
        key: 'mid',
        minWidth: 80,
        align: 'center',
        title: 'MID',
      },
      {
        key: 'product_name',
        minWidth: 150,
        align: 'center',
        title: 'nama Produk',
      },
      {
        key: 'product_id',
        minWidth: 100,
        align: 'center',
        title: 'ID Produk',
      },
      {
        key: 'platform',
        minWidth: 100,
        align: 'center',
        title: 'platform',
      },
      {
        key: 'channel',
        minWidth: 100,
        align: 'center',
        title: 'Tipe',
        render: (h: any, params: any) => {
          return h('div', params.row.channel == '1' ? 'APP' : 'API')
        }
      },
      {
        key: 'package_name',
        minWidth: 150,
        align: 'center',
        title: 'Nama paket',
      },
      {
        key: 'update_time',
        minWidth: 150,
        align: 'center',
        title: 'Waktu penciptaan',

      },

      {
        title: this.$t('operate.handle'),
        key: 'handle',
        align: 'center',
        //   fixed: 'right',
        minWidth: 150,
        render: (h: any, params: any) => {
          return h('div', 
          this.$refs.table[0]['$scopedSlots'].action({
            rowInfo: params.row
          }),
          this.$refs.table[1]['$scopedSlots'].action({
            rowInfo: params.row
          }))
        }
      }
    ]

    created() {
      if (!Object.keys(this.selectItems).length) {
        this.getSelectList()
      }
      this.role = localStorage.getItem('role') || ''
      this.searchList()
    }
    handleTab(val:any){
      console.log(this.$refs)
      this.searchInfo.platform = val
       this.searchList()
    }
    searchList() {
      this.loading = true
      productconf({
        platform:this.searchInfo.platform
      }, (res: any) => {
        this.loading = false
        if (+res.code === 0) {
          this.list = res.data.data || []
          this.list.map(item => {
            let sun = Number(item.update_time) * 1000
            item.update_time = this.formatDayTime(sun)

          })
          // this.total =  Number(res.data.arrPager.count) 
          // this.pageCount =  Number(res.data.arrPager.count) 
          // this.pageSize = +res.data.arrPager.pageSize
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    }

    update(row: any) {
      this._getAccountInfo(row)
      this.operateType = 'edit'
      this.showModal = true
      this.tabName = 'sys_order'
    }
    modalVisibleChange() {
      this.$refs.form.resetFields()
    }
    add() {
      this.formInfo = {
        id: '',
        name: '',
        mobile: '',
        email: '',
        password: '',
        status: '',
        role: [],
        access_system: [],
        inner_user: '',
        platform: '',
        type: '',
      }
      this.operateType = 'add'
      this.showModal = true
    }

    operate() {
      this.$refs.form.validate((valid: boolean) => {
        if (valid) {
          this.btnLoading = true

          let date = {
            id: this.operateType == 'add' ? 0 : this.formInfo.id,
            productId: this.formInfo.name,
            productName: this.formInfo.mobile,
            packageName: this.formInfo.password,
            status: this.formInfo.status,
            channel: this.formInfo.inner_user,
            platform: this.formInfo.platform,
            remark: '',
            type: this.formInfo.type
            //  update_time:this.operateType == 'add'? new Date(): this.update_time,
          }


          SaveProductConf(date, (res: any) => {
            this.btnLoading = false
            if (+res.code === 0) {
              if (this.operateType === 'add') {
                this.$Message.success(this.$t('addSuccess'))
              }
              if (this.operateType === 'edit') {
                this.$Message.success(this.$t('editSuccess'))
              }
              this.showModal = false
              this.searchList()
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      })
    }
    cancel() {
      this.showModal = false
    }

    _getAccountInfo(row) {
      productconf({
        id:row.id,
        platform:this.searchInfo.platform
      }, (res: any) => {
        if (+res.code === 0) {

          res.data.data.map(item => {
            if (+item.id == row.id) {


              this.formInfo.name = item.product_id,
                this.formInfo.mobile = item.product_name,
                this.formInfo.password = item.package_name,
                this.formInfo.inner_user = item.channel
              this.formInfo.platform = item.platform
              this.formInfo.status = item.status
              this.formInfo.id = item.id
              this.formInfo.type = item.type
              //    this.update_time = item.update_time

            }
          })

        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .m-accountList {
    .table-wrap {
      border-radius: 4px;

      // text-align: right;
      .batch-change {
        margin-bottom: 15px;
      }
    }
  }

  .ivu-modal-wrap .count {
    margin: 5px 0;
  }
</style>
