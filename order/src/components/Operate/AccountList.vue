<template>
  <div class="m-accountList">
    <div class="search-wrap">
      <Form :model="searchInfo" inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('operateAmount.search.name')">
              <Input
                v-model="searchInfo.name"
                :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.search.name'
                )}`"
              />
            </FormItem>
            <FormItem label="Nomor Akun">
              <Input
                v-model="searchInfo.mobile"
                :placeholder="`${$t('inputPrefix')}`"
              />
            </FormItem>
            <FormItem :label="$t('operateAmount.userInfo.role')">
              <Select
                clearable
                transfer
                v-if="selectItems.role_select"
                v-model="searchInfo.userRole"
                :placeholder="`${$t('inputPrefix')}${$t('operateAmount.userInfo.role')}`"
              >
                <Option
                  :key="index"
                  :value="option.key"
                  v-for="(option, index) in selectItems.role_select"
                >{{option.value}}</Option>
              </Select>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                slot="label"
                type="primary"
                :loading="loading"
                @click="searchTable"
              >
                {{ $t("search") }}
              </Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>
    <div class="table-wrap">
      <Button
        icon="arrow-swap"
        type="success"
        class="batch-change"
        v-if="role.indexOf('role_super_admin') > -1 || common_admin|| role.indexOf('role_order_it') > -1 "
        @click="add"
        >{{ $t("operateAmount.addAccount") }}</Button
      >
      <Table
        border
        ref="table"
        :data="list"
        :columns="tableColums"
        :loading="loading"
      >
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size="18" class="spin-icon"></Icon>
          <div>{{ $t("loadingText") }}</div>
        </Spin>
        <!-- table loading -->
        <template slot="action" slot-scope="props">
          <!-- <Button
            type="text"
            class="fix-table-btn"
            @click="view(props.rowInfo.id)"
            icon="ios-eye"
            size="small"
            >{{ $t("operate.viewBtn") }}</Button
          > -->
          <Button
            type="text"
            class="fix-table-btn"
            @click="update(props.rowInfo.id)"
            icon="ios-create-outline"
            v-if="props.rowInfo.is_super || common_admin||role.indexOf('role_order_it') > -1"
            size="small"
            >{{ $t("operate.editBtn") }}</Button
          >
        </template>
      </Table>
     
    </div>
    <!-- table -->
    <Page
      v-if="total > pageSize"
      :total="total"
      :page-size="pageSize"
      :current.sync="searchInfo.page"
      class-name="m-pagination"
      @on-change="searchList"
      show-total
      show-elevator
    >
      {{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}
    </Page>
    <!-- page -->
    <Modal
      :title="modalTitle"
      width="800"
      class="changModal m-modal"
      @on-visible-change="modalVisibleChange"
      v-model="showModal"
    >
      <div class="bd">
        <div class="m-card">
          <Form
            :model="formInfo"
            ref="form"
            :label-width="80"
            :rules="rules"
            class="allModel"
          >
            <FormItem :label="$t('operateAmount.userInfo.name')" prop="name">
              <Input
                type="text"
                v-model="formInfo.name"
                :disabled="role.indexOf('role_order_it') == -1&&role.indexOf('role_common_admin') == -1&&role.indexOf('role_super_admin') == -1"
                :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.name'
                )}`"
                autocomplete="off"
              />
            </FormItem>
            <FormItem
              :label="$t('operateAmount.userInfo.mobile')"
              prop="mobile"
            >
              <Input
                type="text"
                v-model="formInfo.mobile"
                :disabled="operateType === 'edit'"
                :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.mobile'
                )}`"
                autocomplete="off"
              />
            </FormItem>
            <FormItem :label="$t('operateAmount.userInfo.email')"  prop="email">
              <Input
                type="text"
                v-model="formInfo.email"
                :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.email'
                )}`"
                autocomplete="off"
              />
            </FormItem>
            <FormItem
              :label="$t('operateAmount.userInfo.id')"
              v-if="operateType === 'edit'"
            >
              {{ formInfo.id }}
            </FormItem>
            <FormItem
              :label="$t('operateAmount.userInfo.password')"
              prop="password"
            >
              <Row>
                <Col span="19">
                  <Input
                    type="password"
                    v-model="formInfo.password"
                    :placeholder="`${$t('inputPrefix')}${$t(
                      'operateAmount.userInfo.password'
                    )}`"
                    autocomplete="off"
                  />
                </Col>
                <Col span="5">
                  <Button
                    v-if="operateType === 'add'"
                    style="float: right;"
                    type="primary"
                    @click="setDefaultPassword"
                    >{{ $t("operateAmount.userInfo.defaultTxt") }}</Button
                  >
                  <Button
                    v-if="operateType === 'edit'"
                    style="float: right;"
                    type="primary"
                    @click="setDefaultPassword"
                    >{{ $t("operateAmount.userInfo.editTxt") }}</Button
                  >
                </Col>
              </Row>
            </FormItem>
            <!-- <FormItem
              :label="$t('operateAmount.userInfo.accountType')"
              prop="inner_user"
            >
              <RadioGroup v-model="formInfo.inner_user">
                <Radio label="1">
                  <span>{{ $t("operateAmount.userInfo.inner") }}</span>
                </Radio>
                <Radio label="2">
                  <span>{{ $t("operateAmount.userInfo.outer") }}</span>
                </Radio>
              </RadioGroup>
            </FormItem> -->
            <FormItem
              :label="$t('operateAmount.userInfo.accountStatus')"
              prop="status"
            >
              <RadioGroup v-model="formInfo.status">
                <Radio label="2">
                  <span>{{ $t("operateAmount.userInfo.normal") }}</span>
                </Radio>
                <Radio label="1">
                  <span>{{ $t("operateAmount.userInfo.stop") }}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem>
              <Tabs v-model="tabName">
                <TabPane
                  v-for="(item, index) in selectItems.system_name_map"
                  :name="index"
                  :key="index"
                  :label="item"
                >
                  <CheckboxGroup v-model="formInfo.access_system">
                    <Checkbox :label="index">{{
                      $t("operateAmount.userInfo.authorityType")
                    }}</Checkbox>
                  </CheckboxGroup>
                  <div>{{ $t("operateAmount.userInfo.role") }}：</div>
                  <CheckboxGroup
                    v-if="selectItems.system_role_map"
                    v-model="formInfo.role[index]"
                    @on-change="checkGroupChange"
                  >
                    <Checkbox
                      v-for="(v, k) in selectItems.system_role_map[index]"
                      :key="k"
                      :label="k"
                      >{{ v }}</Checkbox
                    >
                  </CheckboxGroup>
                  <!-- <div v-show="index == 'sys_approve' && showLender">
                    <div class="div" v-if="operateType === 'add'">
                       <span style="margin-right: 15px;">{{
                      $t("operateAmount.userInfo.lender")
                    }}</span>
                    <RadioGroup v-model="formInfo.activate"  >
                      <Radio label="2"  >{{
                        $t("operateAmount.userInfo.yes")
                      }}</Radio>
                      <Radio label="1"  >{{
                        $t("operateAmount.userInfo.no")
                      }}</Radio>
                    </RadioGroup>
                    </div>
                   
                    <div class="div" v-if="operateType === 'edit' &&formInfo.activate==2 ">
                      <span style="margin-right: 15px;">{{
                      $t("operateAmount.userInfo.lenderStatus")
                    }}</span>
                       <RadioGroup v-model="formInfo.lender_status" >
                      <Radio label="1"  >{{
                        $t("operateAmount.userInfo.yes")
                      }}</Radio>
                      <Radio label="2"  >{{
                        $t("operateAmount.userInfo.no")
                      }}</Radio>
                    </RadioGroup>
                    </div>
                   
                  </div> -->
                  <div
                    class="lenderbox"
                    v-if="
                      index == 'sys_approve' &&
                      formInfo.activate == '2'&&
                      showLender
                    "
                  >
                      <!-- <FormItem
                      :label="$t('operateAmount.userInfo.sort')"
                     style="margin-bottom: 20px;"
                      prop="sort"
                    >
                      <Input
                       
                        v-model="formInfo.sort"
                        :placeholder="`${$t('inputPrefix')}${$t(
                          'operateAmount.userInfo.sort'
                        )}`"
                        autocomplete="off"
                      />
                    </FormItem> -->
                    <FormItem
                      :label="$t('operateAmount.userInfo.idCard')"
                     style="margin-bottom: 20px;"
                     
                    >
                      <Input
                       :disabled="operateType === 'edit'"
                        v-model="formInfo.ktp_number"
                        :placeholder="`${$t('inputPrefix')}${$t(
                          'operateAmount.userInfo.idCard'
                        )}`"
                        autocomplete="off"
                      />
                    </FormItem>
                    <FormItem
                      :label="$t('operateAmount.userInfo.bank')"
                      style="margin-bottom: 20px;"
                      prop="account_code"
                    >
                      <Select
                       :disabled="operateType === 'edit'"
                        v-model="formInfo.account_code"
                        placement="top"
                        :placeholder="`${$t('selectPrefix')}${$t(
                          'operateAmount.userInfo.bank'
                        )}`"
                        autocomplete="off"
                      >
                        <Option
                          :value="item.key"
                          v-for="(item, index) in bankList"
                          :key="index"
                          >{{ item.name }}</Option
                        >
                      </Select>
                    </FormItem>
                    <FormItem
                      :label="$t('operateAmount.userInfo.bankCode')"
                      prop="account_number"
                      style="margin-bottom: 20px;"
                    >
                      <Input
                       :disabled="operateType === 'edit'"
                        v-model="formInfo.account_number"
                        :placeholder="`${$t('inputPrefix')}${$t(
                          'operateAmount.userInfo.bankCode'
                        )}`"
                        autocomplete="off"
                      />
                    </FormItem>
                  </div>
                </TabPane>
              </Tabs>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel">{{ $t("cancelText") }}</Button>
        <Button type="success" :loading="btnLoading" @click="operate">{{
          $t("okText")
        }}</Button>
      </div>
    </Modal>

    <Modal
      :title="`${$t('operateAmount.viewInfo')}`"
      width="800"
      class="changModal m-modal"
      footerHide
      v-model="viewModal"
    >
      <div class="bd">
        <Card class="m-card">
          <Row align="middle">
            <Col span="12" class-name="col">
              <div class="count">
                {{ $t("operateAmount.userInfo.name") }}：{{ accountInfo.name }}
              </div>
            </Col>
            <Col span="12" class-name="col">
              <div class="count">
                {{ $t("operateAmount.userInfo.mobile") }}：{{
                  accountInfo.mobile
                }}
              </div>
            </Col>
            <Col span="12" class-name="col">
              <div class="count">
                {{ $t("operateAmount.userInfo.email") }}：{{
                  accountInfo.email
                }}
              </div>
            </Col>
            <Col span="12" class-name="col">
              <div class="count">
                {{ $t("operateAmount.userInfo.id") }}：{{ accountInfo.id }}
              </div>
            </Col>
            <Col span="24" class-name="col">
              <Tabs>
                <TabPane
                  v-for="(item, key) in selectItems.system_name_map"
                  :label="item"
                  :key="key"
                >
                  <div
                    v-if="
                      accountInfo.access_system &&
                      accountInfo.access_system.indexOf(key) > -1
                    "
                  >
                    {{ $t("operateAmount.userInfo.authority") }}：{{
                      $t("operateAmount.userInfo.authorityType")
                    }}
                  </div>
                  <div v-else>
                    {{ $t("operateAmount.userInfo.authority") }}：{{
                      $t("operateAmount.userInfo.forbidden")
                    }}
                  </div>
                  <div>
                    {{ $t("operateAmount.userInfo.role") }}：
                    <span
                      v-for="(item, index) in accountInfo.role[key]"
                      :key="index"
                    >
                      {{ selectItems.system_role_map[key][item] }}
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
import { Component, Vue } from "vue-property-decorator";
import { add, getList, getAccountInfo } from "@/api/user";
import { Getter, Action } from "vuex-class";
@Component
export default class AccountList extends Vue {
  @Getter("selectItems") selectItems: any;
  @Action("getSelectList") getSelectList: any;
  $refs!: {
    table: HTMLFormElement;
    form: HTMLFormElement;
  };
  role = "";
  showTable = false;
  tabName = "sys_order";
  searchInfo = {
    name: "",
    mobile: "",
    page: 1,
    userRole:"",
  };
  formInfo = {
    id: "",
    name: "",
    mobile: "",
    email: "",
    password: "",
    status: "",
    role: {},
    role_id: {},
    access_system: [],
    inner_user: "",
    activate: "",
    lender_status:"",
    account_code: "",
    account_number: "",
    ktp_number: "",
    // sort:'',
  };
  operateType = "";
  total = 0;
  pageCount = 0;
  pageSize = 10;
  showLender = false;
  showModal = false;
  viewModal = false;
  loading = false;
  btnLoading = false;
  common_admin = "";
  list = [];
  bankList = [
    {
      key: "BCA",
      name: "Bank Central Asia (BCA)",
    },
    {
      key: "BNI",
      name: "Bank Negara Indonesia (BNI)",
    },
    {
      key: "BOC",
      name: "Bank of China (BOC)",
    },
    {
      key: "BRI",
      name: "Bank Rakyat Indonesia (BRI)",
    },
    {
      key: "BTN",
      name: "Bank Tabungan Negara (BTN)",
    },
    {
      key: "BUKOPIN",
      name: "Bank Bukopin",
    },
    {
      key: "CIMB",
      name: "Bank CIMB Niaga",
    },
    {
      key: "CITIBANK",
      name: "Citibank",
    },
    {
      key: "DANAMON",
      name: "Bank Danamon",
    },
    {
      key: "ICBC",
      name: "Bank ICBC Indonesia",
    },
    {
      key: "MANDIRI",
      name: "Bank Mandiri",
    },
    {
      key: "MASPION",
      name: "Bank Maspion Indonesia",
    },
    {
      key: "MAYAPADA",
      name: "Bank Mayapada International",
    },
    {
      key: "MAYBANK",
      name: "Bank Maybank",
    },
    {
      key: "MEGA",
      name: "Bank Mega",
    },
    {
      key: "OCBC",
      name: "Bank OCBC NISP",
    },
    {
      key: "PANIN",
      name: "Bank Panin",
    },
    {
      key: "PERMATA",
      name: "Bank Permata",
    },
    {
      key: "SINARMAS",
      name: "Sinarmas",
    },
    {
      key: "UOB",
      name: "Bank UOB Indonesia",
    },
  ];
  accountInfo = {
    role: {},
  };
  systemInfo = [];
  get modalTitle() {
    let title = "";
    switch (this.operateType) {
      case "add":
        title = `${this.$t("operateAmount.addAccount")}`;
        break;
      case "edit":
        title = `${this.$t("operateAmount.editInfo")}`;
        break;
      default:
        break;
    }
    return title;
  }
  rules = {
    name: [
      {
        required: true,
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.name"
        )}`,
        trigger: "blur",
      },
      {
        required:true,
        max:200,
        pattern:/[A-Za-z]/ig,
         trigger: "blur",
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.namezimu"
        )}`,
      }
     
    ],
    mobile: [
      {
        required: true,
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.mobile"
        )}`,
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.password"
        )}`,
        trigger: "blur",
      },
    ],
     email: [
      {
        required: true,
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.email"
        )}`,
        trigger: "blur",
      },
      { type: 'email',  message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.trueEmail"
        )}`, trigger: 'blur' }
    ],
    inner_user: [
      {
        required: true,
        trigger: "change",
        message: `${this.$t("selectPrefix")}${this.$t(
          "operateAmount.userInfo.accountType"
        )}`,
      },
    ],
    status: [
      {
        required: true,
        trigger: "change",
        message: `${this.$t("selectPrefix")}${this.$t(
          "operateAmount.userInfo.accountStatus"
        )}`,
      },
    ],
    account_code: [
      {
        required: true,
        trigger: "change",
        message: `${this.$t("selectPrefix")}${this.$t(
          "operateAmount.userInfo.bank"
        )}`,
      },
    ],
    account_number: [
      {
        required: true,
        trigger: "blur",
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.bankCode"
        )}`,
      },
      {
        type: "string",
        required:true,
       min:10,
        max:20,
        pattern:/[0-9]/ig,
         trigger: "blur",
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.truebankCode"
        )}`,
      }
    ],
    ktp_number: [
      {
        required: true,
        trigger: "blur",
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.idCard"
        )}`,
      },
       {
        type: "string",
        required:true,
        min:16,
        max:16,
        pattern:/[0-9]/,
         trigger: "blur",
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.trueidCard"
        )}`,
      }
    ],
        sort: [
      {
        required: true,
        trigger: "blur",
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.sort"
        )}`,
      },
       {
        type: "string",
        required:true,
        pattern:/[0-9]/,
         trigger: "blur",
        message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.sort"
        )}`,
      }
    ],
  };
  tableColums = [
    {
      key: "id",
      minWidth: 150,
      fixed: "left",
      align: "center",
      title: this.$t("operateAmount.tableHead.id"),
    },
    {
      key: "name",
      minWidth: 150,
      align: "center",
      title: this.$t("operateAmount.tableHead.name"),
    },
    {
      key: "mobile",
      minWidth: 150,
      align: "center",
      title: 'Nomor Akun',
    },
    // {
    //   key: "email",
    //   minWidth: 150,
    //   align: "center",
    //   title: this.$t("operateAmount.tableHead.email"),
    // },
    {
      key: "create_time",
      minWidth: 150,
      align: "center",
      title: this.$t("operateAmount.tableHead.createTime"),
    },
    {
      key: "role_str",
      minWidth: 150,
      align: "center",
      title: this.$t("operateAmount.userInfo.role"),
    },
    
    {
      key: "status_desc",
      minWidth: 120,
      align: "center",
      title: this.$t("operateAmount.tableHead.status"),
    },
    {
      key: "last_login_time",
      minWidth: 150,
      align: "center",
      title: this.$t("operateAmount.tableHead.last_login_time"),
    },
    // {
    //   key: "last_ip",
    //   minWidth: 150,
    //   align: "center",
    //   title: this.$t("operateAmount.tableHead.ip"),
    // },
    {
      title: this.$t("operate.handle"),
      key: "handle",
      align: "center",
      fixed: "right",
      minWidth: 200,
      render: (h: any, params: any) => {
        return h(
          "div",
          this.$refs.table["$scopedSlots"].action({
            rowInfo: params.row,
          })
        );
      },
    },
  ];

  created() {
    if (!Object.keys(this.selectItems).length) {
      this.getSelectList();
    }
    this.role = localStorage.getItem("role") || "";
    this.searchList();
  }
  searchTable(){
    this.searchInfo.page=1
    this.searchList()
  }
  searchList() {
    this.loading = true;
    getList(this.searchInfo, (res: any) => {
      this.loading = false;
      if (+res.code === 0) {
        this.list=res.data.list
        this.common_admin = res.data.list[0].is_common_admin || "";
        this.total = Number(res.data.arrPager.count);
        this.pageCount = Number(res.data.arrPager.count);
        this.pageSize = +res.data.arrPager.pageSize;
        this.showTable = true;
      } else {
        this.showTable = false;
      }
    });
  }
  view(id: number) {
    this._getAccountInfo(id);
    this.viewModal = true;
  }
  update(id: number) {
    this._getAccountInfo(id);
    this.operateType = "edit";
    this.showModal = true;
    this.tabName = "sys_order";
  }
  modalVisibleChange() {
    this.$refs.form.resetFields();
  }
  add() {
    this.formInfo = {
      id: "",
      name: "",
      mobile: "",
      email: "",
      password: "",
      status: "",
      role: {},
      role_id: {},
      access_system: [],
      inner_user: "",
      activate: "1",
      lender_status:"2",
      account_code: "",
      account_number: "",
      ktp_number: "",
      // sort:"",
    };
    this.operateType = "add";
    this.showModal = true;
  }
  operate() {
    this.$refs.form.validate((valid: boolean) => {
      if (valid) {
        this.btnLoading = true;
        this.formInfo.role_id = this.formInfo.role;
        add(this.formInfo, (res: any) => {
          this.btnLoading = false;
          if (+res.code === 0) {
            if (this.operateType === "add") {
              this.$Message.success(this.$t("addSuccess"));
            }
            if (this.operateType === "edit") {
              this.$Message.success(this.$t("editSuccess"));
            }
            this.showModal = false;
            this.searchList();
          }else{
            this.$Message.error(res.msg)
          }
        });
      }
    });
  }
  cancel() {
    this.showModal = false;
  }
  setDefaultPassword() {
    if (this.formInfo.mobile) {
      this.formInfo.password = this.formInfo.mobile;
    }
  }
  _getAccountInfo(id: number) {
    getAccountInfo(
      {
        id: id,
      },
      (res: any) => {
        if (+res.code === 0) {
           try {
            res.data.role = Object.fromEntries(res.data.role);
          } catch (error) {
            console.log("78");
          }
          this.accountInfo = res.data;
         
          Object.assign(this.formInfo, res.data);
          if (res.data.role.sys_approve) {
            this.showLender = res.data.role.sys_approve.indexOf("role_approve_admin") > -1 ? true : false;
          }
           
        }
      }
    );
  }
  checkGroupChange(data: any) {
    console.log(data);
    this.showLender = data.indexOf("role_approve_admin") > -1 ? true : false;
  }
}
</script>

<style lang="scss" scoped>
.m-accountList {
  .table-wrap {
    border-radius: 4px;
    text-align: right;

    .batch-change {
      margin-bottom: 15px;
    }
  }
}

.ivu-modal-wrap .count {
  margin: 5px 0;
}

.lenderbox {
  margin-top: 20px;
}

.allModel {
  height: 550px;
  overflow-y: scroll;
  overflow-x:hidden
}
</style>
