<!-- zys -->
<template>
  <div class="rdl">
    <Tabs v-model="TabsName"  @on-click="clickTabPane" >
      <TabPane :label="tab.label" :name="tab.name" v-for="(tab,index) in tabList" :key="index">
        <div class="btn">
          <Button type="primary" @click="add(tab.name)">{{
            $t("rdl.add")
          }}</Button>
        </div>
        <div class="table" style="margin-top: 30px">
          <Table border ref="table" :data="tableData" :columns="tableColums" :loading="loading">
          </Table>
        </div>
          <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      show-elevator> {{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>

      </TabPane>
      
    </Tabs>

    <Modal v-model="addModal" :title="$t('rdl.add')">
      <Form class="allModel" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
        <FormItem :label="item" :prop="item" v-for="(item, index) in FormItemList" :key="index">
          <Input v-model="formValidate[item]" :placeholder="item"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{ $t("cancelText") }}</Button>
        <Button type="success" :loading="btnLoading" @click="save('formValidate')">{{ $t("okText") }}</Button>
      </div>
    </Modal>

    <Modal v-model="detailModal" :title="$t('rdl.detail')">
      <Form :label-width="200">
        <FormItem :label="item" v-for="(item, index) in FormItemList" :key="index">
          <Input v-model="rowInfo[item]" disabled></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="BindModal" :title="$t('rdl.rdlTitle')">
      <Form :label-width="80">
        <FormItem label="lender id">
          <Select transfer v-model="lenderId" :placeholder="`${$t('selectPrefix')}`">
            <Option :value="item.value" v-for="(item,index) in lenderOp" :key="index">
              {{item.key}}
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{ $t("cancelText") }}</Button>
        <Button type="success" :loading="btnLoading" @click="Bind()">{{ $t("rdl.Bind") }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {
    apiuatasRdlList,
    apiuatasBindrdl,
    apiuatasRdlAdd,
    apiuatasLenderSelect
  } from "@/api/user";
  export default {
    name: "",
    components: {},

    data() {
      return {
        addModal: false,
        detailModal: false,
        BindModal: false,
        loading: false,
        btnLoading: false,
        TabsName:'2',
        lenderId: "",
        lenderOp:[],        
        rowInfo: {},
        total:0,
        pageSize:10,
        page:1,
        tabList:[
          {
            label:this.$t('rdl.line'),
            name:'2'
          },
           {
            label:this.$t('rdl.unline'),
            name:'1'
          }
        ],

        formValidate:{},
        formValidate1: {
          account_number: "",
          external_id: "",
          first_name: "",
          last_name: "",
          id_number: "",
          id_issuing_city: "",
          mobile_phone_number: "",
          branch_opening_location_code: "",
          email: "",
          account_type: "",
          source_of_fund: "",
        },
         formValidate2: {
          external_id: "",
          title: "",
          first_name: "",
          last_name: "",
          npwp_number: "",
          domicile_country: "",
          nationality: "",
          religion: "",
          birth_place: "",
          birth_date: "",
          gender: "",
          marital_status: "",
          mother_maiden_name: "",
          job_code: "",
          education: "",
          id_number: "",
          id_issuing_city: "",
          id_expiry_date: "",
          address_street:"",
          address_rt_rw_perum: "",
          address_kelurahan: "",
          address_kecamatan: "",
          zip_code: "",
          mobile_phone_number: "",
          branch_opening_location_code: "",
          monthly_income_range: "",
          email: "",
          account_type: "",
          open_account_reason: "",
          source_of_fund: "",
        },
        FormItemList:[],
        FormItemList1: [
          "account_number",
          "external_id",
          "first_name",
          "last_name",
          "id_number",
          "id_issuing_city",
          "mobile_phone_number",
          "branch_opening_location_code",
          "email",
          "account_type",
          "source_of_fund",
        ],
        FormItemList2: [
          "external_id",
          "title",
          "first_name",
          "last_name",
          "npwp_number",
          "domicile_country",
          "nationality",
          "religion",
          "birth_place",
          "birth_date",
          "gender",
          "marital_status",
          "mother_maiden_name",
          "job_code",
          "education",
          "id_number",
          "id_issuing_city",
          "id_expiry_date",
          "address_street",
          "address_rt_rw_perum",
          "address_kelurahan",
          "address_kecamatan",
          "zip_code",
          "mobile_phone_number",
          "branch_opening_location_code",
          "monthly_income_range",
          "email",
          "account_type",
          "open_account_reason",
          "source_of_fund",
        ],
        ruleValidate:{},
        ruleValidate2: {
          account_number: [{
            required: true,
            message: "account_number",
            trigger: "blur"
          }, ],
          external_id: [{
            required: true,
            message: "external_id",
            trigger: "blur"
          }, ],
          first_name: [{
            required: true,
            message: "first_name",
            trigger: "blur"
          }, ],
          last_name: [{
            required: true,
            message: "last_name",
            trigger: "blur"
          }],
          id_number: [{
            required: true,
            message: "id_number",
            trigger: "blur"
          }],
          id_issuing_city: [{
            required: true,
            message: "id_issuing_city",
            trigger: "blur"
          }, ],
          mobile_phone_number: [{
            required: true,
            message: "mobile_phone_number",
            trigger: "blur"
          }, ],
          branch_opening_location_code: [{
            required: true,
            message: "branch_opening_location_code",
            trigger: "blur",
          }, ],
          email: [{
            required: true,
            message: "email",
            trigger: "blur"
          }],
          account_type: [{
            required: true,
            message: "account_type",
            trigger: "blur"
          }, ],
          source_of_fund: [{
            required: true,
            message: "source_of_fund",
            trigger: "blur"
          }, ],
        },
        ruleValidate1: {
          external_id: [{
            required: true,
            message: "external_id",
            trigger: "blur"
          }, ],
          title: [{
            required: true,
            message: "title",
            trigger: "blur"
          }, ],
          first_name: [{
            required: true,
            message: "first_name",
            trigger: "blur"
          }, ],
          last_name: [{
            required: true,
            message: "last_name",
            trigger: "blur"
          }, ],
          npwp_number: [{
            required: true,
            message: "npwp_number",
            trigger: "blur"
          }, ],
          domicile_country: [{
            required: true,
            message: "domicile_country",
            trigger: "blur"
          }, ],
          nationality: [{
            required: true,
            message: "nationality",
            trigger: "blur"
          }, ],
          religion: [{
            required: true,
            message: "religion",
            trigger: "blur"
          }, ],
          birth_place: [{
            required: true,
            message: "birth_place",
            trigger: "blur"
          }, ],
          birth_date: [{
            required: true,
            message: "birth_date",
            trigger: "blur"
          }, ],
          gender: [{
            required: true,
            message: "gender",
            trigger: "blur"
          }, ],
          marital_status: [{
            required: true,
            message: "marital_status",
            trigger: "blur"
          }, ],
          mother_maiden_name: [{
            required: true,
            message: "mother_maiden_name",
            trigger: "blur"
          }, ],
          job_code: [{
            required: true,
            message: "job_code",
            trigger: "blur"
          }, ],
          education: [{
            required: true,
            message: "education",
            trigger: "blur"
          }, ],
          id_number: [{
            required: true,
            message: "id_number",
            trigger: "blur"
          }, ],
          id_issuing_city: [{
            required: true,
            message: "id_issuing_city",
            trigger: "blur"
          }, ],
          id_expiry_date: [{
            required: true,
            message: "id_expiry_date",
            trigger: "blur"
          }, ],
           address_street: [{
            required: true,
            message: "address_street",
            trigger: "blur"
          }, ],
          address_rt_rw_perum: [{
            required: true,
            message: "address_rt_rw_perum",
            trigger: "blur"
          }, ],
          address_kelurahan: [{
            required: true,
            message: "address_kelurahan",
            trigger: "blur"
          }, ],
          address_kecamatan: [{
            required: true,
            message: "address_kecamatan",
            trigger: "blur"
          }, ],
          zip_code: [{
            required: true,
            message: "zip_code",
            trigger: "blur"
          }, ],
          mobile_phone_number: [{
            required: true,
            message: "mobile_phone_number",
            trigger: "blur"
          }, ],
          branch_opening_location_code: [{
            required: true,
            message: "branch_opening_location_code",
            trigger: "blur"
          }, ],
          monthly_income_range: [{
            required: true,
            message: "monthly_income_range",
            trigger: "blur"
          }, ],
          email: [{
            required: true,
            message: "email",
            trigger: "blur"
          }, ],
          account_type: [{
            required: true,
            message: "account_type",
            trigger: "blur"
          }, ],
          open_account_reason: [{
            required: true,
            message: "open_account_reason",
            trigger: "blur"
          }, ],
          source_of_fund: [{
            required: true,
            message: "source_of_fund",
            trigger: "blur"
          }, ],
          },
        tableData: [],
        tableColums: [{
            title: this.$t("rdl.pdlAccount"),
            key: "investor_id",
            align: "center",
          },
          {
            title: "lender id",
            key: "lender_id",
            align: "center",
          },
          {
            title: this.$t("rdl.opration"),
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button", {
                    props: {
                      type: "text",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.getDetailModal(params.row);
                      },
                    },
                  },
                  this.$t("rdl.detail")
                ),
                h(
                  "Button", {
                    props: {
                      type: "text",
                      size: "small",
                      disabled:!params.row.need_bind
                    },
                    on: {
                      click: () => {
                        this.getBindModal(params.row);
                      },
                    },
                  },
                  this.$t("rdl.Bind")
                ),
              ]);
            },
          },
        ],
      };
    },

    async created() {
      this.getTableData();
    },

    computed: {},

    mounted() {},

    methods: {
      clickTabPane(name) {
        if(name==1){
          this.FormItemList = this.FormItemList2
        }else{
           this.FormItemList = this.FormItemList1
        }
      },
      add(type) {
        this.$refs['formValidate'].resetFields();
        if(type==1){
         this.FormItemList = this.FormItemList1;
         this.ruleValidate = this.ruleValidate2;
         this.formValidate= this.formValidate1;
        }else{
          this.FormItemList = this.FormItemList2;
          this.ruleValidate = this.ruleValidate1;
         this.formValidate= this.formValidate2;
        }
        this.addModal = true;
      },
      cancel() {
        this.BindModal = false;
        this.addModal = false;
      },
      save(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.btnLoading = true;
            apiuatasRdlAdd(this.formValidate, res => {
              if (res.code == 0) {
                this.btnLoading = false;
                this.addModal = false;
                this.getTableData();
                this.$Message.success(res.msg)
              } else {
                this.btnLoading = false;
                this.$Message.error(res.msg)
              }
            })
          }
        })
      },
      getTableData() {
        this.tableData = [];
        this.loading = true;
        apiuatasRdlList({
          page:this.page,
          pageSize:this.pageSize,
        }, (res) => {
          if (res.code == 0) {
            this.loading = false;
            this.tableData = res.data.list;
            this.total = Number(res.data.arrPager.count)
          }
        });
      },
        handlePage(pageIndex) {
          this.page = pageIndex || 1
          this.getTableData()
        },
      getDetailModal(row) {
        if(this.TabsName==1){
          this.FormItemList = this.FormItemList1;
        }else{
          this.FormItemList = this.FormItemList2;
        }
        this.detailModal = true;
        this.rowInfo = row || {}
      },
      getBindModal(row) {
        apiuatasLenderSelect({},res=>{
          if(res.code==0){
            this.lenderOp = res.data
          }
        })
        this.BindModal = true;
        this.lenderId = "";
        this.rdl_user_id = row.id
      },
      Bind() {
        this.btnLoading = true;
        apiuatasBindrdl({
          lender_id: this.lenderId,
          id: this.rdl_user_id
        }, res => {
          if (res.code == 0) {
            this.BindModal = false;
            this.btnLoading = false;
            this.getTableData() 
            this.$Message.success(res.msg)
          } else {
            this.btnLoading = false;
            this.$Message.error(res.msg)
          }
        })
      },
    },
  };
</script>
<style lang='scss' scoped>
  .btn {
    text-align: right;
  }
  .allModel {
  height: 500px;
  overflow-y: scroll;
  overflow-x:hidden
}
</style>
