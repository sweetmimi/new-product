<template>
  <div class="m-accountList">
    <div class="search-wrap">
      <Form :model="searchInfo" inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('group.search.groupName')">
              <Input v-model="searchInfo.name" :placeholder="`${$t('inputPrefix')}${$t(
                  'group.search.groupName'
                )}`" />
            </FormItem>
            <FormItem :label="`${$t('group.search.days')}`">
              <DatePicker transfer type="daterange" format="yyyy-MM-dd" @on-change="timeChange"
                :placeholder="`${$t('selectPrefix')}${$t('group.search.days')}`">
              </DatePicker>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button slot="label" type="primary" :loading="loading" @click="searchList">
                {{ $t("search") }}
              </Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </div>
    <div class="table-wrap">
      <Button icon="arrow-swap" type="success" class="batch-change"
        v-if="role.indexOf('role_super_admin') > -1 || common_admin"
        @click="add">{{ $t("group.search.addGroup") }}</Button>
      <Table border ref="table" :data="list" :columns="tableColums" :loading="loading">
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size="18" class="spin-icon"></Icon>
          <div>{{ $t("loadingText") }}</div>
        </Spin>
        <!-- table loading -->
        <template slot="action" slot-scope="props">
          <Button type="text" class="fix-table-btn" @click="view(props.rowInfo)" icon="ios-eye"
            :loading="props.rowInfo.viewLoading" size="small">{{ $t("operate.viewBtn") }}</Button>
          <Button type="text" class="fix-table-btn" @click="update(props.rowInfo)" icon="ios-create-outline"
            :loading="props.rowInfo.updateLoading" size="small">{{ $t("operate.editBtn") }}</Button>
          <Button type="text" class="fix-table-btn" @click="del(props.rowInfo.id)" icon="ios-trash-outline"
            size="small">{{ $t("operate.del") }}</Button>
          <Button type="text" class="fix-table-btn" @click="history(props.rowInfo.id)" icon="ios-list-box-outline"
            size="small">{{ $t("operate.history") }}</Button>
        </template>
      </Table>
    </div>
    <!-- table -->
    <Page v-if="total > pageSize" :total="total" :page-size="pageSize" :current.sync="searchInfo.page"
      class-name="m-pagination" @on-change="searchList" show-total show-elevator>
      {{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}
    </Page>
    <!-- page -->
    <Modal :title="modalTitle" width="800" class="changModal m-modal" v-model="showModal">
      <div class="bd">
        <div class="m-card">
          <Form :model="formInfo" ref="form" :label-width="80" :rules="rules" class="allModel">
            <FormItem :label="$t('group.label.groupName')" prop="groupName">
              <Input type="text" v-model="formInfo.groupName" :placeholder="`${$t('inputPrefix')}${$t(
                  'group.label.groupName'
                )}`" autocomplete="off" />
            </FormItem>
            <FormItem :label="$t('group.label.groupLevel')" prop="groupLevel">
              <Select clearable transfer @on-change="changeLevel" :disabled="operateType != 'add'"
                v-model="formInfo.groupLevel" :placeholder="`${$t('selectPrefix')}${$t(
                  'group.label.groupLevel'
                )}`">
                <Option :key="index" :value="option.key" :label="option.title" v-for="(option, index) in levelList">
                </Option>
              </Select>
            </FormItem>
            <FormItem label="Tipe" prop="type">
              <Select clearable transfer 
                v-model="formInfo.type" placeholder="tolong pilih">
                <Option value="1" label="biasa" >
                </Option>
                <Option value="2" label="Berputar" >
                </Option>
                <Option value="3" label="spesifik" >
                </Option>
              </Select>
            </FormItem>
            <FormItem v-if="formInfo.type==3" label="produk tertentu" prop="product_ids">
              <Select clearable transfer multiple 
                v-model="formInfo.product_ids" :placeholder="`${$t('selectPrefix')}`">
                <Option :key="index" :value="option.product_id" :label="option.product_name" v-for="(option, index) in ProductConf">
                </Option>
              </Select>
            </FormItem>
           
            <FormItem  label="Batas pesanan koleksi" prop="cs_order_count">
              <Input-number  :min="0"  v-model="formInfo.cs_order_count"></Input-number>
            </FormItem>

            <FormItem  label="Batas pesanan pasca-pinjaman" prop="dh_order_count">
              <Input-number  :min="0"  v-model="formInfo.dh_order_count"></Input-number>
            </FormItem>
           

            <FormItem :label="$t('group.label.parent')">
              <Input disabled v-model="groupInfo.parent" multiple style="width: 260px" />

              <Button :disabled="!allGroupData.parent" v-if="operateType !== 'view'" :loading="detLoading"
                style="margin-left: 10px" type="primary" shape="circle" icon="ios-search"
                @click="groupModal('parent')"></Button>
            </FormItem>

            <FormItem :label="$t('group.label.children')">
              <Input disabled v-model="groupInfo.children" multiple style="width: 260px" />

              <Button :disabled="!allGroupData.children" v v-if="operateType !== 'view'" :loading="detLoading"
                style="margin-left: 10px" type="primary" shape="circle" icon="ios-search"
                @click="groupModal('children')"></Button>
            </FormItem>

            <FormItem :label="$t('group.label.members')">
              <Input disabled v-model="groupInfo.members" multiple style="width: 260px" />

              <Button :disabled="!allGroupData.members" v-if="operateType !== 'view'" :loading="detLoading"
                style="margin-left: 10px" type="primary" shape="circle" icon="ios-search"
                @click="groupModal('members')"></Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel">{{ $t("cancelText") }}</Button>
        <Button type="success" v-if="operateType !== 'view'" :loading="btnLoading"
          @click="operate">{{ $t("okText") }}</Button>
      </div>
    </Modal>

    <!-- modal -->
    <Modal :title="groupModalTitle" width="800" class="changModal m-modal" @on-visible-change="modalVisibleChange"
      v-model="showGroupModal">
     <div class="overModal">
      <div style="margin:10px 0" v-if="editType=='members'">
        <span style="margin:0 10px">Jenis akun</span>
        <Select
          clearable
          transfer
          v-model="type"
          :placeholder="`${$t('selectPrefix')}`">
          <Option value="1">Koleksi</Option>
          <Option value="2">setelah pinjaman</Option>
          <Option value="3">persetujuan</Option>
        </Select>
        <span style="margin:0 10px">Akun</span>
         <Input clearable :placeholder="`${$t('inputPrefix')}`" v-model="keywords" />
        <Button style="margin-left:10px"  @click="search_keywords()" >{{$t('search')}}</Button>
      </div>
       
      <Table border ref="selection" :loading="showGroupModalLoading" :columns="groupColumns" :data="groupData"
        @on-selection-change="selectionChange"></Table>
      </div>
      <div slot="footer">
        <Button @click="cancelGroup">{{ $t("cancelText") }}</Button>
        <Button type="success" :loading="btnLoading" @click="subGroup">{{
          $t("okText")
        }}</Button>
      </div>
  
    </Modal>



    <Modal title="konfirmasi penghapusan?" @on-ok="isDeleteok" v-model="delShowModal">
      <p>Apakah Anda yakin ingin menghapus grup ini dan semua subgrup di bawahnya??</p>
    </Modal>

    <Modal title="catatan sejarah" v-model="hisShowModal" footer-hide width="700">
      <Table border ref="histable" :columns="hisColumns" :data="hisData" :loading="hisDataLoading">
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size="18" class="spin-icon"></Icon>
          <div>{{ $t("loadingText") }}</div>
        </Spin>
        <template slot="action" slot-scope="props">
          <Button type="text" class="fix-table-btn" @click="historylog(props.rowInfo.id)" icon="ios-list-box-outline"
            size="small">{{ $t("operate.historylog") }}</Button>
        </template>
      </Table>
    </Modal>

    <Modal title="Detail sejarah" v-model="hislogShowModal" footer-hide width="800">
      <Table border :columns="hislogColumns" :data="hislogData" :loading="hislogDataLoading">
        <Spin slot="loading" fix class="m-loading">
          <Icon type="load-c" size="18" class="spin-icon"></Icon>
          <div>{{ $t("loadingText") }}</div>
        </Spin>
      </Table>
    </Modal>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from "vue-property-decorator";
  import {
    apiGroupLevel,
    apiGroupSelect,
    apiGroupList,
    apiGroupEdit,
    apiGroupUpdate,
    apiGroupStore,
    apiGroupDestroy,
    apiGroupLoglist,
    apiGroupLogdetail,
    apiGroupProductids,
  } from "@/api/user";
  import {
    Getter,
    Action
  } from "vuex-class";
  @Component
  export default class AccountList extends Vue {
    @Getter("selectItems") selectItems: any;
    @Action("getSelectList") getSelectList: any;
    $refs!: {
      table: HTMLFormElement;
      form: HTMLFormElement;
      selection: HTMLFormElement;
      histable: HTMLFormElement;
    };
    type=""
    keywords = ""
    levelList = [];
    groupdet = {
      parent: null,
      children: null,
      members: null,
    };
    id = "";
    role = "";
    showTable = false;
    tabName = "sys_order";
    searchInfo = {
      name: "",
      timeStart: "",
      timeEnd: "",
      page: 1,
    };
    formInfo = {
      id: "",
      groupName: "",
      groupLevel: null,
      members: "",
      children: "",
      parent: "",
      type:"",
      product_ids:[],
      cs_order_count:0,
      dh_order_count:0,
    };
    groupInfo = {
      members: "",
      children: "",
      parent: "",
    };
    ProductConf=[];

    editGroupData = {
      members: [],
      children: [],
      parent: [],
    };

    selectGroupData = {
      members: [],
      children: [],
      parent: [],
    };

    allGroupData = {
      members: [],
      children: [],
      parent: [],
    };

    groupData = [];
    dataInfo = {
      members: [],
      children: [],
      parent: [],
    };

    changeGroupData = {
      members: [],
      children: [],
      parent: [],
    };
    operateType = "";
    groupLevel = "";
    total = 0;
    pageCount = 0;
    pageSize = 10;
    showLender = false;
    showGroupModal = false;
    showGroupModalLoading = false;
    showModal = false;
    delShowModal = false;
    hisShowModal = false;
    hislogShowModal = false;
    hisDataLoading = false;
    hislogDataLoading = false;
    viewLoading = false;
    updateLoading = false;
    viewModal = false;
    loading = false;
    btnLoading = false;
    detLoading = false;
    common_admin = "";
    list = [];

    hisData = [];
    hislogData = [];

    delId: "";
    accountInfo = {
      role: {},
    };
    systemInfo = [];
    selectionList = [];
    editType = "";
    get modalTitle() {
      let title = "";
      switch (this.operateType) {
        case "add":
          title = `${this.$t("group.search.addGroup")}`;
          break;
        case "edit":
          title = `${this.$t("group.search.editGroup")}`;
          break;
        case "view":
          title = `${this.$t("group.search.viewGroup")}`;
          break;
        default:
          break;
      }
      return title;
    }
    get groupModalTitle() {
      let title = "";
      switch (this.editType) {
        case "parent":
          title = `${this.$t("selectPrefix")}${this.$t("group.label.parent")}`;
          break;
        case "children":
          title = `${this.$t("selectPrefix")}${this.$t("group.label.children")}`;
          break;
        case "members":
          title = `${this.$t("selectPrefix")}${this.$t("group.label.members")}`;
          break;
        default:
          break;
      }
      return title;
    }
    rules = {
      groupName: [{
        required: true,
        message: `${this.$t("inputPrefix")}${this.$t("group.label.groupName")}`,
        trigger: "blur",
      }, ],
      groupLevel: [{
        type: "number",
        required: true,
        message: `${this.$t("selectPrefix")}${this.$t(
          "group.label.groupLevel"
        )}`,
        trigger: "change",
      }, ],
      type:[{
        required: true,
        message: `${this.$t("selectPrefix")}`,
        trigger: "change",
      }, ],
      product_ids:[{
        type:'array',
        required: true,
        message: `${this.$t("selectPrefix")}`,
        trigger: "change",
      }, ],
      cs_order_count:[{
        type:'number',
        required: true,
        message: `${this.$t("inputPrefix")}`,
        trigger: "blur",
      }, ],
      dh_order_count:[{
        type:'number',
        required: true,
        message: `${this.$t("inputPrefix")}`,
        trigger: "blur",
      }, ],
    };
    tableColums = [{
        key: "id",
        minWidth: 150,
        fixed: "left",
        align: "center",
        title: this.$t("group.tableHead.id"),
      },
      {
        key: "name",
        minWidth: 150,
        align: "center",
        title: this.$t("group.tableHead.name"),
      },
      {
        key: "level",
        minWidth: 150,
        align: "center",
        title: this.$t("group.tableHead.level"),
      },
      {
        key: "parent_id",
        minWidth: 150,
        align: "center",
        title: this.$t("group.tableHead.parentId"),
      },
      {
        key: "children_ids",
        minWidth: 120,
        align: "center",
        title: this.$t("group.tableHead.childrenId"),
      },
       {
        key: "children_count",
        minWidth: 120,
        align: "center",
        title: this.$t("group.tableHead.children_count"),
      },
      {
        title: this.$t("operate.handle"),
        key: "handle",
        align: "center",
        fixed: "right",
        minWidth: 300,
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
    groupColumns = [{
        type: "selection",
        width: 60,
        align: "center",
      },
      {
        key: "id",
        minWidth: 150,
        align: "center",
        title: this.$t("group.tableHead.id"),
      },
      {
        key: "name",
        minWidth: 150,
        align: "center",
        title: this.$t("group.tableHead.name"),
      },
    ];
    hisColumns = [{
        key: "id",
        align: "center",
        title: this.$t("group.tableHead.id"),
      },
      {
        key: "type",
        align: "center",
        title: this.$t("group.tableHead.type"),
      },
      {
        key: "createTime",
        align: "center",
        title: this.$t("group.tableHead.createTime"),
      },
      {
        title: this.$t("operate.handle"),
        key: "handle",
        align: "center",
        render: (h: any, params: any) => {
          return h(
            "div",
            this.$refs.histable["$scopedSlots"].action({
              rowInfo: params.row,
            })
          );
        },
      },
    ];
    hislogColumns = [{
        key: "id",
        align: "center",
        title: this.$t("group.tableHead.id"),
      },
      {
        key: "name",
        align: "center",
        title: this.$t("group.tableHead.name"),
      },
      {
        key: "level",
        align: "center",
        title: this.$t("group.tableHead.level"),
      },
      {
        key: "parent_id",
        align: "center",
        title: this.$t("group.tableHead.parentId"),
      },
      {
        key: "childrenList",
        align: "center",
        title: this.$t("group.tableHead.childrenId"),
      },
      {
        key: "memberList",
        align: "center",
        title: this.$t("group.tableHead.members"),
      },
      {
        key: "update_time",
        align: "center",
        title: this.$t("group.tableHead.updataTime"),
      },
    ];
    created() {
      this.role = localStorage.getItem("role") || "";
      this.searchList();
      this.getLevel();
      this.getapiGroupProductids()
    }
    getapiGroupProductids(){
      apiGroupProductids({},res=>{
        this.ProductConf  = res.data.data
      })
    }
    timeChange(date: any) {
      this.searchInfo.timeStart = date[0];
      this.searchInfo.timeEnd = date[1];
    }
    searchList() {
      this.loading = true;
      this.list = [];
      this.total = 0;
      apiGroupList(this.searchInfo, (res: any) => {
        this.loading = false;
        if (+res.code === 0) {
          this.list = res.data.list || [];

          this.total = Number(res.data.arrPager.count);
          this.pageCount = Number(res.data.arrPager.count);
          this.pageSize = +res.data.arrPager.pageSize;
          this.showTable = true;
        } else {
          this.$Message.error(res.msg);
          this.showTable = false;
        }
      });
    }
    getLevel() {
      apiGroupLevel({}, (res: any) => {
        this.levelList = res.data;
      });
    }
    changeLevel() {
      if(this.formInfo.groupLevel){
         this.getSlect(this.formInfo.groupLevel);
      }
     
    }
    getSlect(level: any) {
      this.detLoading = true;
      apiGroupSelect({
          level: level,
        },
        (res: any) => {
          this.detLoading = false;
          if (this.operateType == "add") {
            this.allGroupData = res.data;
          } else {
            this.allGroupData = Object.assign({}, res.data, this.editGroupData);
            console.log("all", this.allGroupData);
            this.selectGroupData = res.data;
          }
        }
      );
    }
    search_keywords(){
      var type=this.editType
      this.showGroupModalLoading = true;
       apiGroupSelect({
              level: this.formInfo.groupLevel,
              keywords:this.keywords,
              type:this.type,
            },
            (res: any) => {
              this.detLoading = false;
              this.showGroupModalLoading = false;

              if (this.operateType == "add") {
                this.allGroupData[type] = res.data;
                this.groupData = res.data[type];
              } else {
                console.log(res.data);
                this.selectGroupData = res.data;
                console.log(type);
                console.log("select", this.selectGroupData);
                console.log("edit", this.editGroupData);
                if (this.selectGroupData[type] && this.editGroupData[type]) {
                  this.groupData = this.unique(
                    this.editGroupData[type].concat(this.selectGroupData[type])
                  );
                }
                if (!this.selectGroupData[type] && this.editGroupData[type]) {
                  this.groupData = this.editGroupData[type];
                }
                if (this.selectGroupData[type] && !this.editGroupData[type]) {
                  this.groupData = this.selectGroupData[type];
                }

                this.allGroupData[type] = this.groupData;
                console.log("all", this.allGroupData);
                console.log(this.groupData);
              }
            }
          );
        
    }
    groupModal(type) {
      this.editType = type;
      this.groupLevel = type;
      this.groupData = [];
      this.$refs.form.validate((valid: boolean) => {
        if (valid) {
          this.showGroupModal = true;
          this.keywords = ""
          this.type=""
          this.showGroupModalLoading = true;
          apiGroupSelect({
              level: this.formInfo.groupLevel,
            },
            (res: any) => {
              this.detLoading = false;
              this.showGroupModalLoading = false;

              if (this.operateType == "add") {
                this.allGroupData[type] = res.data;
                this.groupData = res.data[type];
              } else {
                console.log(res.data);
                this.selectGroupData = res.data;
                console.log(type);
                console.log("select", this.selectGroupData);
                console.log("edit", this.editGroupData);
                if (this.selectGroupData[type] && this.editGroupData[type]) {
                  this.groupData = this.unique(
                    this.editGroupData[type].concat(this.selectGroupData[type])
                  );
                }
                if (!this.selectGroupData[type] && this.editGroupData[type]) {
                  this.groupData = this.editGroupData[type];
                }
                if (this.selectGroupData[type] && !this.editGroupData[type]) {
                  this.groupData = this.selectGroupData[type];
                }

                this.allGroupData[type] = this.groupData;
                console.log("all", this.allGroupData);
                console.log(this.groupData);
              }
            }
          );
        }
      });
    }

    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
    }

    view(row) {
      // this.viewLoading = true;
      this.groupInfo.parent = "";
      this.groupInfo.children = "";
      this.groupInfo.members = "";
      this.formInfo = {
        id: "",
        groupName: "",
        groupLevel: null,
        members: "",
        children: "",
        parent: "",
        type:"",
        product_ids:[],
        cs_order_count:0,
        dh_order_count:0,
      }
      var parent = [];
      var children = [];
      var members = [];
      this.$set(row, "viewLoading", true);
      this.operateType = "view";
      apiGroupEdit({
          id: row.id,
        },
        (res) => {
          this.$set(row, "viewLoading", false);
          this.showModal = true;
          this.formInfo.groupName = res.data.name;
          this.editGroupData = res.data;
          this.groupInfo.parent = res.data.parent_name || "";
          this.formInfo.groupLevel = Number(res.data.level);
          this.formInfo.type = res.data.type;
          this.formInfo.product_ids = res.data.product_ids;
          this.formInfo.cs_order_count = Number(res.data.cs_order_count);
          this.formInfo.dh_order_count = Number(res.data.dh_order_count);
          try {
            if (res.data.members.length > 0) {
              var members = [];
              res.data.members.forEach((item, index) => {
                members.push(item.name);
              });
              this.groupInfo.members = members.toString();
            }
          } catch (error) {}
          try {
            if (res.data.parent_id != 0) {
              this.groupInfo.parent = res.data.parent_name;
            }
          } catch (error) {}
          try {
            if (res.data.children.length > 0) {
              var children = [];
              res.data.children.forEach((item, index) => {
                children.push(item.name);
              });
              this.groupInfo.children = children.toString();
            }
          } catch (error) {}
        }
      );
    }


    update(row) {
      this.$set(row, "updateLoading", true);
      // this.updateLoading = true;
      this.formInfo.id = row.id;
      this.groupData = [];
      this.groupInfo = {
        parent: "",
        children: "",
        members: "",
      };
      var parent = [];
      var children = [];
      var members = [];
      this.operateType = "edit";

      apiGroupEdit({
          id: row.id,
        },
        (res) => {
          this.getSlect(res.data.level || 1);
          this.formInfo.groupName = res.data.name;
          this.formInfo.groupLevel = Number(res.data.level);
          this.editGroupData = res.data;
          this.formInfo.type = res.data.type;
          this.formInfo.product_ids = res.data.product_ids;
          this.formInfo.cs_order_count = Number(res.data.cs_order_count);
          this.formInfo.dh_order_count = Number(res.data.dh_order_count);

          this.$set(row, "updateLoading", false);
          this.showModal = true;
          try {
            if (res.data.members.length > 0) {
              var members = [];
              res.data.members.forEach((item, index) => {
                item._checked = true;
                members.push(item.name);
              });
              this.groupInfo.members = members.toString();
            }
          } catch (error) {}
          try {
            if (res.data.parent_id != 0) {
              this.groupInfo.parent = res.data.parent_name;
              var parent = [];

              parent.push({
                id: res.data.parent_id,
                name: res.data.parent_name,
                _checked: true,
              });
              this.editGroupData.parent = parent;
              console.log("editGroupData", this.editGroupData);
            }
          } catch (error) {}
          try {
            if (res.data.children.length > 0) {
              var list = [];
              res.data.children.forEach((item, index) => {
                item._checked = true;
                list.push(item.name);
              });
              this.groupInfo.children = list.toString();
            }
          } catch (error) {}
        }
      );
    }

    modalVisibleChange() {
      //  this.$refs.selection.selectAll(false);
      // this.$refs.form.resetFields();
    }
    add() {
      this.groupInfo = {
        parent: "",
        children: "",
        members: "",
      };
      this.formInfo = {
        id: "",
        groupName: "",
        groupLevel: "",
        members: "",
        children: "",
        parent: "",
        type:"",
        product_ids:[],
        cs_order_count:0,
        dh_order_count:0,
      };
      this.operateType = "add";
      this.showModal = true;
    }

    selectionChange(row) {
      var editType = this.editType;
      row.forEach((i, v) => {
        i._checked = true;
      });
      this.allGroupData[editType] = row;
      console.log(editType);
      console.log(this.allGroupData[editType]);
    }

    subGroup() {
      var editType = this.editType;

      console.log("all", this.allGroupData);
      this.showGroupModal = false;
      if (this.allGroupData) {
        if (editType == "parent") {
          var num = 0;
          this.allGroupData[editType].forEach((i, v) => {
            this.groupInfo[editType] = i.name;
            num++;
          });
          if (num > 1) {
            this.groupInfo[editType] = "";
            this.$Message.error("Hanya satu grup induk yang dapat dipilih");
            return;
          }
        } else {
          var list = [];
          this.allGroupData[editType].forEach((item, index) => {
            if (item._checked) {
              list.push(item.name);
            }
          });
          this.groupInfo[editType] = list.toString();
        }

        console.log(editType);
      }
    }

    operate() {
      this.$refs.form.validate((valid: boolean) => {
        if (valid) {
          this.btnLoading = true;
          var editType = this.editType;
          var parent = {
            id: "",
            name: "",
          };
          var children = [];
          var members = [];

          if (this.allGroupData.parent) {
            this.allGroupData.parent.forEach((i, v) => {
              if (i._checked) {
                parent.id = i.id;
                parent.name = i.name;
              }
            });
          }
          if (this.allGroupData.children) {
            this.allGroupData.children.forEach((i, v) => {
              if (i._checked) {
                children.push(i);
              }
            });
          }
          if (this.allGroupData.members) {
            this.allGroupData.members.forEach((i, v) => {
              if (i._checked) {
                members.push(i);
              }
            });
          }
          var reqApi = this.operateType == "add" ? apiGroupStore : apiGroupUpdate;
          reqApi({
              id: this.formInfo.id,
              name: this.formInfo.groupName,
              level: this.formInfo.groupLevel,
              type:this.formInfo.type,
              product_ids:this.formInfo.product_ids,
              cs_order_count:this.formInfo.dh_order_count,
              parent: parent,
              children: children,
              members: members,
            },
            (res: any) => {
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
              } else {
                this.$Message.error(res.msg);
              }
            }
          );
        }
      });
    }

    del(id) {
      this.delId = id;
      this.delShowModal = true;
    }

    isDeleteok() {
      apiGroupDestroy({
          id: this.delId,
        },
        (res) => {
          if (res.code == 0) {
            this.delShowModal = false;
            this.searchList();
            this.$Message.success(res.msg);
          }
        }
      );
    }

    history(id) {
      this.hisData = [];
      this.hisShowModal = true;
      this.hisDataLoading = true;
      apiGroupLoglist({
          groupId: id,
        },
        (res) => {
          if (res.code == 0) {
            this.hisDataLoading = false;
            this.hisData = res.data.list;
          }
        }
      );
    }

    historylog(id) {
      this.hislogShowModal = true;
      this.hislogDataLoading = true;
      this.hislogData = [];
      apiGroupLogdetail({
          id: id,
        },
        (res) => {
          if (res.code == 0) {
            this.hislogDataLoading = false;
            res.data.detail.forEach((i, v) => {
              if (i.members.length > 0) {
                var memberList = [];
                i.members.forEach((item, index) => {
                  memberList.push(item.id);
                });
                i.memberList = memberList.toString();
              }

              if (i.children.length > 0) {
                var childrenList = [];
                i.children.forEach((item, index) => {
                  childrenList.push(item.id);
                });
                i.childrenList = childrenList.toString();
              }
            });

            this.hislogData = res.data.detail;
            console.log(this.hislogData);
          }
        }
      );
    }
    cancel() {
      this.showModal = false;
    }
    cancelGroup() {
      this.showGroupModal = false;
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

  .allModel {}
  .overModal{
    max-height: 400px;
    overflow-y: scroll;
  }
</style>
