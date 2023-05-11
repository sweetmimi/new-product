<template>
  <div class="m-accountList">
    <div>
      <Form ref="formInline" :label-width="100" inline>
        <FormItem label="Jenis Produk">
          <Select clearable transfer v-model="searchForm.product_type" :placeholder="`${$t('selectPrefix')}`"
           >
            <Option :value="item.key" v-for="(item,index) in selectItems.product_type" :key="index">
              {{ item.value }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="root product">
        <Select
          clearable
          transfer
          v-model="searchForm.product_base_type"
          :placeholder="`${$t('inputPrefix')}${$t('order.search.productId')}`"
        >
          <Option :value="0">semua</Option>
          <Option :value="1">Iya</Option>
          <Option :value="2">tidak</Option>
        </Select>
      </FormItem>
      <FormItem >
        <Button
        type="primary" 
        @click="searchList()"
      >{{ $t('search') }}</Button>
      </FormItem>
        <FormItem label="">
          <Button icon="arrow-swap" type="success" v-if="role.indexOf('role_super_admin') > -1"
            @click="add">Tambah</Button>
        </FormItem>
      </Form>
    </div>
    <div class="table-wrap">

      <Table border ref="table" :data="list" :columns="tableColums" :loading="loading">
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size=18 class="spin-icon"></Icon>
          <div>{{$t('loadingText')}}</div>
        </Spin>
        <!-- table loading -->
        <template slot="action" slot-scope="props">
          <!-- <Button type="text" class="fix-table-btn" @click="view(props.rowInfo.id)" icon="ios-eye" size="small">{{$t('operate.viewBtn')}}</Button> -->
          <Button type="text" :loading="props.rowInfo.viewLoading" class="fix-table-btn" @click="update(props.rowInfo)"
            icon="ios-create-outline" size="small">{{$t('operate.editBtn')}}</Button>
        </template>
      </Table>

    </div>
    <!-- table -->
    <Page v-if="total > pageSize" :total="total" :page-size="pageSize" :current.sync="searchInfo.page"
      class-name="m-pagination" @on-change="searchList" show-total show-elevator>
      {{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}
    </Page>
    <!-- page -->
    <Modal :title="modalTitle" width=800 class="changModal m-modal" @on-visible-change="modalVisibleChange"
      v-model="showModal">
      <div class="bd">
        <div class="m-card">
          <Form :model="formInfo" ref="form" :label-width="100" :rules="rules">

            <!--  :disabled="operateType === 'edit'" -->
            <FormItem label="Nama" prop="mobile">
              <Input type="text" v-model="formInfo.mobile"  autocomplete="off" />
            </FormItem>
            <FormItem label="ID" prop="name">
              <Input type="text" v-model="formInfo.name" :disabled="operateType === 'edit'" 
                autocomplete="off" />
            </FormItem>

            <FormItem label="APK" prop="password">
              <Input type="text" v-model="formInfo.password" :disabled="operateType === 'edit'" 
                autocomplete="off" />
            </FormItem>
            <FormItem label="Type" prop="inner_user">
              <RadioGroup v-model="formInfo.inner_user">
                <Radio label="1" :disabled="operateType === 'edit'">
                  <span>APP</span>
                </Radio>
                <Radio label="2" :disabled="operateType === 'edit'">
                  <span>API</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="Jenis Produk" prop="type">
              <RadioGroup v-model="formInfo.type">
                <Radio :label="`${item.key}`" :disabled="operateType === 'edit'"
                  v-for="(item,index) in selectItems.product_type" :key="index">
                  <span>{{item.value}}</span>
                </Radio>

              </RadioGroup>
            </FormItem>
            <FormItem label="Klasifikasi" prop="product_base_type">
              <RadioGroup v-model="formInfo.product_base_type" >
                <Radio :disabled="operateType === 'edit'" :label="`${item.key}`" v-for="(item,index) in selectItems.product_base_type" :key="index">
                  <span>{{item.value}}</span>
                </Radio>

              </RadioGroup>
            </FormItem>
          
            <FormItem label="Status" prop="status">
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
    searchForm={
      product_type : '',
      product_base_type:'',
    }
   
    role = ''
    showTable = false
    tabName = 'sys_order'
    modloading = false
    searchInfo = {
      name: '',
      mobile: '',
      page: 1
    }
    formInfo = {
      id: '',
      mobile: '',
      name: '',
      password: '',
      inner_user: '',
      type: '',
      product_base_type: '',
      status: '',
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
          title = 'Tambah'
          break
        case 'edit':
          title = 'Ubah'
          break
        default:
          break
      }
      return title
    }
    rules = {
      name: [{
        required: true,
        message: 'Please enter product ID',
        trigger: 'blur'
      }],
      mobile: [{
        required: true,
        message: 'please input the product name',
        trigger: 'blur'
      }],
      password: [{
        required: true,
        message: 'Please enter package name',
        trigger: 'change'
      }],
      inner_user: [{
        required: true,
        trigger: 'change',
        message: 'Please select a status'
      }],
      status: [{
        required: true,
        trigger: 'change',
        message: 'Please select if available'
      }],
      type: [{
        // type:'number',
        required: true,
        trigger: 'change',
        message: 'Please select product type'
      }],
      product_base_type: [{
        // type:'number',
        required: true,
        trigger: 'change',
        message: 'Please select a product attribute'
      }],
    }
    tableColums = [
      // {
      //   key: 'mid',
      //   minWidth: 120,
      //   fixed: 'left',
      //   align: 'center',
      //   title: 'MID',
      // },
      {
        key: 'product_name',
        minWidth: 150,
        align: 'center',
        title: 'Nama',
      },
      {
        key: 'product_id',
        minWidth: 150,
        align: 'center',
        title: ' ID',
      },
      {
        key: 'product_type_desc',
        minWidth: 150,
        align: 'center',
        title: 'Jenis Produk',
      },
      {
        title: "root product",
        align: 'center',
        key: 'product_base_type_desc',
        minWidth: 100,
       
      },
      {
        key: 'product_base_type_desc',
        minWidth: 150,
        align: 'center',
        title: 'Klasifikasi',
      },
      {
        key: 'channel',
        minWidth: 150,
        align: 'center',
        title: 'Type',
        render: (h: any, params: any) => {
          return h('div', params.row.channel == '1' ? 'APP' : 'API')
        }
      },
      {
        key: 'package_name',
        minWidth: 150,
        align: 'center',
        title: 'APK',
      },
      {
        key: 'update_time',
        minWidth: 150,
        align: 'center',
        title: 'Tanggal',

      },

      {
        title: this.$t('operate.handle'),
        key: 'handle',
        align: 'center',
        fixed: 'right',
        minWidth: 150,
        render: (h: any, params: any) => {
          return h('div', this.$refs.table['$scopedSlots'].action({
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

    searchList() {
      this.loading = true
      productconf(this.searchForm, (res: any) => {
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
      this.tabName = 'sys_order'
    }
    modalVisibleChange() {
      this.$refs.form.resetFields()
    }
    add() {
      this.formInfo = {
        id: '',
        mobile: '',
        name: '',
        password: '',
        inner_user: '',
        type: '',
        product_base_type: '',
        status: '',
      }
      this.operateType = 'add'
      this.showModal = true
      this.modloading = false
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
            remark: '',
            product_type: this.formInfo.type,
            product_base_type:this.formInfo.product_base_type,
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

    _getAccountInfo(row: any) {
      this.showModal = true
      this.formInfo = {
        id: row.id,
        mobile: row.product_name,
        name: row.product_id,
        password: row.package_name,
        inner_user: row.channel,
        type: row.type,
        status: row.status,
        product_base_type: row.base_type,

      }
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