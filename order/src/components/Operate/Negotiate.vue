<!-- zys -->
<template>
    <div class="m-customerList">
        <div class="search-wrap">
            <Form inline :label-width="10" :rules="search_rules" :model="searchData">
                <div class="search-group-wrap">
                    <div class="search-group">
                        <FormItem prop="orderNumber">
                            <input class="inpt" type="text" v-model="searchData.orderNumber" maxlength="20"
                                oninput="this.value=this.value.replace(/[^\d]/g,'')"
                                :placeholder="$t('inputOrderNumber')" />
                        </FormItem>

                        <FormItem class="fix-form-btn" :label-width="100">
                            <Button type="primary" slot="label" :loading="loading"
                                @click="getSearchData()">{{ $t("search") }}</Button>
                        </FormItem>

                        <FormItem class="fix-form-btn" :label-width="100">
                            <Button type="primary" slot="label" :loading="loading"
                                @click="clickCancel()">{{ $t("cancel") }}</Button>
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>

        <Table ref="table" border class="list-table" :data="tableData" :columns="tableDefine" :loading="loading">
        </Table>
        <!-- <Alert v-show="!(showTable && pageCount > 0)">{{ $t('noData') }}</Alert> -->

        <div class="card" v-if="showCard">
            <div>
                <Form :model="formData" :rules="ruleValidate" ref="formValidate">
                    <FormItem :label="$t('negotiate.card.Repayment')">
                        {{ should_fees || "" }}
                        <div style="float:right;margin-right: 20px;">
                            <Button v-if="canDrop == 100" disabled size="small"
                                class="card_but">{{ $t("negotiate.card.dropCode") }}</Button>
                            <Button v-else type="primary" size="small" class="card_but"
                                @click="dropSmscode()">{{ $t("negotiate.card.dropCode") }}</Button>
                        </div>
                    </FormItem>
                    <FormItem :label="$t('negotiate.card.Maxreduce')">
                        {{ maxAomount || "" }}
                    </FormItem>
                    <FormItem :label="$t('negotiate.card.ReducedMoney')">
                        {{reliefMoney || ""}}
                    </FormItem>
                    <FormItem prop="loanType" class="loanType">
                        <Select v-model="formData.loanType" style="width:180px" size="small" :disabled="money_disabled" @on-change="changeloanType"
                            :placeholder="`${$t('negotiate.card.RepaymentType')}`">
                            <Option v-for="item in banklistData.repay_type" :value="item.value" :key="item.value">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="bankStore" class="loanType">
                        <Select v-model="formData.bankStore" style="width:180px" :disabled="money_disabled" size="small"
                            :placeholder="`${$t('negotiate.card.bankOrstore')}`">
                            <Option v-for="item in bankstoreOptions" :value="item.name" :key="item.name">{{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="inputMoney">
                        <input class="inpt" :class="isDisabled? 'classdis' : '' " :disabled="money_disabled" maxlength="12" v-model="formData.inputMoney" size="small"
                            :placeholder="`${$t('negotiate.card.inputMoney')}`"
                            oninput="this.value=this.value.replace(/[^\d]/g,'')" style="width: 180px" />
                        <Button v-if="canGenerate == 100" disabled size="small"
                            class="card_but">{{ $t("negotiate.card.genRepayCode") }}</Button>
                        <Button type="primary" v-else size="small" class="card_but" :loading="btnCodeloading"
                            @click="getSmscode">

                            <span v-if="!btnCodeloading">{{ $t("negotiate.card.genRepayCode") }}</span>
                            <span v-else>loading...</span>
                        </Button>
                    </FormItem>
                </Form>
                <div class="br"></div>
                <div class="smsText">
                    <Input v-model="smsText" type="textarea" :autosize="true" disabled
                        style="max-width: 330px ;min-width:180px;font-size:12px;" />
                    <Button disabled v-if="canSend == 100" size="small"
                        class="card_but">{{ $t("negotiate.card.sendSms") }}</Button>
                    <Button type="primary" v-else size="small" class="card_but" :loading="btnSmsloading"
                        @click="sendSms">
                        <span v-if="!btnSmsloading">{{ $t("negotiate.card.sendSms") }}</span>
                        <span v-else>loading...</span>
                    </Button>
                </div>
                <p class="tips">Kode pelunasan berlaku dalam 6 jam, setelah kedaluwarsa, jika Anda perlu terus mengurangi atau mengecualikan, Anda perlu mengajukan permohonan kembali!</p>
            </div>
        </div>

        <Modal :title="$t('negotiate.card.dropCode')" v-model="modal_dropCode" :okText="$t('okText')"
            :cancelText="$t('cancelText')" @on-ok="okDropcode" class-name="vertical-center-modal">
            <p>Konfirmasikan kode pembayaran yang ditinggalkan?</p>
        </Modal>
    </div>
</template>

<script>
    import {
        searchNegotion,
        dropCodeNegotion,
        bankListNegotion,
        getCodeNegotion,
        sendSmsNegotion,
    } from "@/api/dataReport";
    import {
        objectEach
    } from "highcharts";
    export default {
        name: "",
        components: {},

        data() {
            return {
                searchData: {
                    orderNumber: ""
                },
                loading: false,
                showCard: false,
                modal_dropCode: false,
                btnCodeloading: false,
                btnSmsloading: false,
                money_disabled: false,
                isDisabled:false,
                model10: "",
                nego_info: "",
                maxAomount: "",
                should_fees: "",
                cityList: [],
                tableData: [],
                formData: {
                    loanType: "",
                    inputMoney: "",
                    bankStore: ""
                },

                smsText: "",
                tableDefine: [{
                        title: this.$t("negotiate.tableHead.order"),
                        align: "center",
                        key: "order_no",
                        minWidth: 80
                    },
                    {
                        title: this.$t("negotiate.tableHead.name"),
                        align: "center",
                        key: "name",
                        minWidth: 80
                    },
                    {
                        title: this.$t("negotiate.tableHead.phone"),
                        align: "center",
                        key: "mobile",
                        minWidth: 80
                    },
                    {
                        title: this.$t("negotiate.tableHead.expireTime"),
                        align: "center",
                        key: "due_time",
                        minWidth: 80
                    },
                    {
                        title: this.$t("negotiate.tableHead.overDate"),
                        align: "center",
                        key: "overdue_days",
                        minWidth: 80
                    },
                    {
                        title: this.$t("negotiate.tableHead.orderMoney"),
                        align: "center",
                        key: "contract_amount",
                        minWidth: 80
                    },
                    {
                        title: this.$t("negotiate.tableHead.LoanMoney"),
                        align: "center",
                        key: "actual_amount",
                        minWidth: 80
                    },
                    {
                        title: this.$t("negotiate.tableHead.penInterest"),
                        align: "center",
                        key: "overdue_fees",
                        minWidth: 80
                    },
                    {
                        title: this.$t("negotiate.tableHead.actual"),
                        align: "center",
                        key: "should_fees",
                        minWidth: 80
                    }
                ],
                ruleValidate: {
                    inputMoney: [{
                            required: false,
                            pattern: /^[0-9]+$/,
                            message: "Harap masukkan bilangan bulat",
                            trigger: "blur"
                        }
                    ],
                    loanType: [{
                        required: true,
                        type: "number",
                        message: this.$t("negotiate.card.RepaymentType"),
                        trigger: "change"
                    }],
                    bankStore: [{
                        required: true,
                        type: "string",
                        message: this.$t("negotiate.card.chosebankstore"),
                        trigger: "change"
                    }]
                },
                search_rules: {
                    orderNumber: [{
                        required: false,
                        pattern: /^[0-9]{8,20}?$/g,
                        message: "Silakan masukkan nomor pesanan yang benar",
                        trigger: "change"
                    }]
                },
                canDrop: "",
                canGenerate: "",
                canSend: "",
                transaction_no: "",
                banklistData: "",
                pay_account_no: "",
                type: "",
                amount: "",
                reliefMoney: "",
                create_time: "",
                repay_bank_list: [],
                repay_store_list: [],
                bankstoreOptions: []
            };
        },

        async created() {},

        computed: {},

        mounted() {},

        methods: {
            clickCancel() {
                this.tableData = [];
                this.showCard = false;
            },

            getSearchData(type) {
                this.type = type;
                this.tableData = [];
                this.formData.inputMoney = "";
                this.smsText = "";
                // this.formData.loanType="";
                // this.formData.bankStore="";
                searchNegotion({
                        order_no: this.searchData.orderNumber
                    },
                    res => {
                        if (+res.code === 0) {
                            this.nego_info = res.data.nego_info;
                            this.maxAomount = res.data.nego_info.max_nego_amount;
                            this.tableData = res.data.nego_info.bill_details;
                            this.should_fees = res.data.nego_info.bill_details[0].should_fees;
                            this.canDrop = res.data.is_can_drop;
                            this.canGenerate = res.data.is_can_generate;
                            this.canSend = res.data.is_can_send;
                            this.transaction_no = res.data.transaction_no;
                            this.showCard = true;
                            if (res.data.is_can_generate == 200) {
                                this.getbanklist()
                            }
                            if (this.type == 1) {
                                this.showCard = false;
                            }
                        } else {
                            this.$Message.error(res.msg);
                            this.showCard = false;
                        }
                    }
                );
            },
            getbanklist() {
                bankListNegotion({
                        order_no: this.searchData.orderNumber
                    },
                    res => {
                        if (+res.code === 0) {
                            this.banklistData = res.data;
                            this.repay_bank_list = res.data.repay_code.repay_bank_list;
                            this.repay_store_list = res.data.repay_code.repay_store_list;
                            this.showCard = true;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }
                );
            },

            changeloanType(value1) {
                value1 == 1 ?
                    (this.bankstoreOptions = this.repay_bank_list) :
                    (this.bankstoreOptions = this.repay_store_list);
            },

            dropSmscode() {
                this.modal_dropCode = true;
            },

            okDropcode() {
                dropCodeNegotion({
                        order_no: this.searchData.orderNumber,
                        transaction_no: this.transaction_no
                    },
                    res => {
                        if (+res.code === 0) {
                            this.money_disabled = false;
                            this.isDisabled = false;
                            this.canDrop = 100;
                            this.canGenerate = res.data.is_can_generate
                            this.$Message.success(res.msg);
                            this.getSearchData();
                            this.getbanklist();
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }
                );
            },

            getSmscode() {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        if (this.maxAomount < this.formData.inputMoney) {
                            this.$Message.error("tidak boleh lebih besar dari pengurangan maksimum!");
                        } else {
                            this.btnCodeloading = true;

                            getCodeNegotion({
                                    order_no: this.searchData.orderNumber,
                                    nego_amount: this.formData.inputMoney,
                                    repay_type: this.formData.loanType,
                                    repay_code: this.formData.bankStore,
                                },
                                res => {
                                    if (+res.code === 0) {
                                        this.btnCodeloading = false;
                                        this.isDisabled = true;
                                        this.money_disabled = true;
                                        this.canGenerate = 100;
                                        this.canSend = res.data.is_can_send;
                                        this.pay_account_no = res.data.nego_generate_info.pay_account_no;
                                        this.amount = res.data.nego_generate_info.amount;
                                        this.create_time = res.data.nego_generate_info.create_time;
                                        this.smsText = res.data.sms_content;
                                        this.reliefMoney = this.should_fees - this.formData.inputMoney;
                                        this.$Message.success(res.msg);
                                    } else {
                                        this.btnCodeloading = false;
                                        this.$Message.error(res.msg);
                                    }
                                }
                            );
                        }
                    } else {
                        console.log("faile");
                    }
                });
            },

            sendSms() {
                this.btnSmsloading = true;
                sendSmsNegotion({
                        order_no: this.searchData.orderNumber,
                        repay_type: this.formData.loanType,
                        repay_code: this.formData.bankStore,
                        pay_account_no: this.pay_account_no,
                        amount: this.amount,
                        create_time: this.create_time,
                    },
                    res => {
                        if (+res.code === 0) {
                            this.btnSmsloading = false;
                            this.canSend = 100;
                            this.smsText = "";
                            this.formData = {};
                            this.getSearchData(1);

                            this.$Message.success(res.msg);
                        } else {
                            this.btnSmsloading = false;
                            this.$Message.error(res.msg);
                        }
                    }
                );

            }
        }
    };
</script>
<style lang="less" scoped>
    .inpt {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
    }

    .inpt::-webkit-input-placeholder {

        color: #c5c8ce;

    }
    .classdis{
       cursor: not-allowed;
       color: #ccc;
       background-color: #f3f3f3;
    }
    .search-wrap {
        margin-bottom: 20px;

    }

    .card {
        margin-top: 20px;
        width: 450px;

        border: 1px solid #ccc;
        border-radius: 10px;

        .cardSpan {
            font-size: 14px;
            font-weight: 600;
        }

        .card_but {
            margin-left: 20px;
        }

        .br {
            height: 1px;
            background-color: #aaa;
            transform-origin: 0 0;
            transform: scaleY(0.5);
            margin: 15px 10px 5px;
        }
    }

    .ivu-form-item {
        margin-bottom: 10px;
        margin-left: 10px;
    }

    .smsText {
        margin-left: 10px;
        font-size: 12px;
        overflow: hidden;
    }

    .tips {
        margin-left: 10px;
        margin-top: 5px;
        font-size: 12px;
        color: red;
    }

    /deep/ .ivu-form-item-error-tip {
        padding-top: 0px;
    }
</style>
