<template>
    <div class="m-accountList">
        <div class="table-wrap">
            <Button v-if="(showBtn != 1)" icon="arrow-swap" type="success" class="batch-change"
                @click="add">{{ $t("operateAmount.tableHead.addAdmin") }}</Button>
            <Table border ref="table" :data="tableData" :columns="tableColums" :loading="loading">
            </Table>
        </div>

        <Modal :title="$t('operateAmount.tableHead.addAdmin')" width="500" class="changModal m-modal"
            @on-visible-change="modalVisibleChange" v-model="showModal">
            <div class="bd">
                <div class="m-card">
                    <Form :model="formInfo" ref="form" :label-width="120" :rules="rules" class="allModel">
                        <FormItem :label="$t('operateAmount.userInfo.name')" prop="given_name">
                            <Input type="text" style="width: 100%" v-model="formInfo.given_name" :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.name'
                )}`" />
                        </FormItem>
                        <FormItem :label="$t('operateAmount.userInfo.mobile')" prop="mobile_number">
                            <Input type="text" style="width: 100%" v-model="formInfo.mobile_number" :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.mobile'
                )}`" />
                        </FormItem>
                        <FormItem :label="$t('operateAmount.userInfo.email')" prop="email">
                            <Input type="text" style="width: 100%" v-model="formInfo.email" :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.email'
                )}`" />
                        </FormItem>

                        <FormItem :label="$t('operateAmount.userInfo.idCard')" prop="ktp_number">
                            <Input style="width: 100%" v-model="formInfo.ktp_number" :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.idCard'
                )}`" />
                        </FormItem>
                        <FormItem :label="$t('operateAmount.userInfo.bank')" prop="account_code">
                            <Select style="width: 100%" v-model="formInfo.account_code" :placeholder="`${$t('selectPrefix')}${$t(
                  'operateAmount.userInfo.bank'
                )}`">
                                <Option :value="item.key" v-for="(item, index) in bankList" :key="index">{{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem :label="$t('operateAmount.userInfo.bankCode')" prop="account_number"
                            style="margin-bottom: 20px">
                            <Input style="width: 100%" v-model="formInfo.account_number" :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.bankCode'
                )}`" />
                        </FormItem>
                        <FormItem :label="$t('operateAmount.userInfo.head_rate')" prop="head_rate"
                            style="margin-bottom: 20px">
                            <Input style="width: 50%" v-model="formInfo.head_rate" :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.head_rate'
                )}`" /><i>%</i>
                        </FormItem>
                        <FormItem :label="$t('operateAmount.userInfo.late_rate')" prop="late_rate"
                            style="margin-bottom: 20px">
                            <Input style="width: 50%" v-model="formInfo.late_rate" :placeholder="`${$t('inputPrefix')}${$t(
                  'operateAmount.userInfo.late_rate'
                )}`" />
                            <i>%</i>
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
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from "vue-property-decorator";
    import {
        AddAdminLender,
        getUatasList
    } from "@/api/user";

    @Component
    export default class AccountList extends Vue {
        $refs!: {
            table: HTMLFormElement;
            form: HTMLFormElement;
        };
        showTable = false;

        formInfo = {
            mid: localStorage.getItem("mid"),
            lender_status: "1",
            given_name: "",
            mobile_number: "",
            email: "",
            ktp_number: "",
            account_code: "",
            account_number: "",
            late_rate: "",
            head_rate: "",
        };
        showBtn = "";
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
        tableData = [];
        bankList = [{
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

        rules = {
            given_name: [{
                required: true,
                message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.name"
        )}`,
                trigger: "blur",
            }, ],
            mobile_number: [{
                required: true,
                message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.mobile"
        )}`,
                trigger: "blur",
            }, ],
            password: [{
                required: true,
                message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.password"
        )}`,
                trigger: "blur",
            }, ],
            email: [{
                    required: true,
                    message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.email"
        )}`,
                    trigger: "blur",
                },
                {
                    type: "email",
                    message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.trueEmail"
        )}`,
                    trigger: "blur",
                },
            ],
            inner_user: [{
                required: true,
                trigger: "change",
                message: `${this.$t("selectPrefix")}${this.$t(
          "operateAmount.userInfo.accountType"
        )}`,
            }, ],
            status: [{
                required: true,
                trigger: "change",
                message: `${this.$t("selectPrefix")}${this.$t(
          "operateAmount.userInfo.accountStatus"
        )}`,
            }, ],
            account_code: [{
                required: true,
                trigger: "change",
                message: `${this.$t("selectPrefix")}${this.$t(
          "operateAmount.userInfo.bank"
        )}`,
            }, ],
            account_number: [{
                required: true,
                trigger: "blur",
                message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.bankCode"
        )}`,
            }, ],
            ktp_number: [{
                    required: true,
                    trigger: "blur",
                    message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.idCard"
        )}`,
                },
                {
                    type: "string",
                    min: 16,
                    max: 16,
                    message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.tureIdCard"
        )}`,
                    trigger: "blur",
                },
            ],
            head_rate: [{
                required: true,
                trigger: "blur",
                message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.head_rate"
        )}`,
            }, ],
            late_rate: [{
                required: true,
                trigger: "blur",
                message: `${this.$t("inputPrefix")}${this.$t(
          "operateAmount.userInfo.late_rate"
        )}`,
            }, ],
        };
        tableColums = [{
                key: "name",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.name"),
                fixed:'left'
            },
              {
                key: "id",
                minWidth: 150,
                align: "center",
                title: "lender id",
            },
            {
                key: "mobile",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.mobile"),
            },
            {
                key: "email",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.email"),
            },
            {
                key: "ktp_number",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.ktp_number"),
            },

            {
                key: "bank_code",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.account_code"),
            },
            {
                key: "bank_num",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.account_number"),
            },
            {
                key: "head_rate",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.head_rate"),
            },
            {
                key: "late_rate",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.late_rate"),
            },
            {
                key: "activate",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.activate"),
            },
            {
                key: "status",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.status"),
            },
            {
                key: "create_time",
                minWidth: 150,
                align: "center",
                title: this.$t("operateAmount.tableHead.createTime"),
            },
        ];

        created() {
            this.searchList();
        }
        searchList() {
            this.loading = true;
            getUatasList({}, (res: any) => {
                this.loading = false;
                if (+res.code === 0) {
                    this.showBtn = res.data.status;
                    if (res.data.activate == 1) {
                        res.data.activate = this.$t("operateAmount.tableHead.failed");
                    }
                    if (res.data.activate == 2) {
                        res.data.activate = this.$t("operateAmount.tableHead.success");
                    }
                    if (res.data.status == 1) {
                        res.data.status = this.$t("operateAmount.tableHead.open");
                    }
                    if (res.data.status == 2) {
                        res.data.status = this.$t("operateAmount.tableHead.close");
                    }

                    this.tableData.push(res.data);
                    // this.list = res.data

                    this.showTable = true;
                } else {
                    this.showTable = false;
                }
            });
        }

        modalVisibleChange() {
            this.$refs.form.resetFields();
        }
        add() {
            this.formInfo = {
                mid: localStorage.getItem("mid"),
                lender_status: "1",
                given_name: "",
                mobile_number: "",
                email: "",
                ktp_number: "",
                account_code: "",
                account_number: "",
                late_rate: "",
                head_rate: "",
            };

            this.showModal = true;
        }
        operate() {
            this.$refs.form.validate((valid: boolean) => {
                if (valid) {
                    this.btnLoading = true;
                    AddAdminLender(this.formInfo, (res: any) => {
                        this.btnLoading = false;
                        if (+res.code === 0) {
                            this.$Message.success(res.msg);
                            this.showModal = false;
                            this.searchList();
                        }
                    });
                }
            });
        }
        cancel() {
            this.showModal = false;
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
</style>
