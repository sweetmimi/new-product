<!-- zys -->
<template>
    <div class="m-appPush">
        <div class="search-wrap">
            <Form inline :label-width="80">
                <div class="search-group-wrap">
                    <div class="search-group">
                        <FormItem :label="$t('appPush.event')">
                            <Input type="text" v-model="searchForm.eventName" :placeholder="$t('inputPrefix')" />
                        </FormItem>
                        <FormItem class="fix-form-btn" :label-width="100">
                            <Button type="primary" slot="label" :loading="loading"
                                @click="handlePage()">{{$t('search')}}</Button>

                        </FormItem>
                        <FormItem class="fix-form-btn" :label-width="100">
                            <Button icon="arrow-swap" type="success" class="batch-change" @click="add">{{$t('appPush.Create')}}</Button>
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
        <div class="table-wrap">

            <Table ref="table" border class="list-table" :data="tableData" :columns="tableDefine" :loading="loading">
                <Spin slot="loading" fix class="m-loading">
                    <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
                    <div>Loading</div>
                </Spin>
                <!-- table loading -->
                <template slot="action" slot-scope="props">
                    <Button type="text" class="fix-table-btn" @click="edit(props.rowInfo)" icon="ios-create-outline"
                        size="small">{{$t('operate.editBtn')}}</Button>
                    <Button type="text" class="fix-table-btn" @click="view(props.rowInfo)" icon="ios-eye"
                        size="small">{{$t('operate.viewBtn')}}</Button>
                </template>
            </Table>
        </div>

        <Page :total="+total" :page-size="pageSize" :current.sync="searchForm.page" class-name="m-pagination"
            @on-change="handlePage" show-total v-if="pageCount > pageSize" show-elevator>{{$t('pageSlot.total')}}
            {{total}} {{$t('pageSlot.count')}}</Page>


        <Modal v-model="showModal" draggable scrollable :title="modalTitle">
            <Form ref="form" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem :label="$t('appPush.event')" prop="eventName">
                    <Input v-model="formValidate.eventName" :disabled="disabled" 
                        style="width:250px"></Input>
                </FormItem>
                <FormItem :label="$t('appPush.status')"  prop="status">
                    <RadioGroup v-model="formValidate.status">
                        <Radio label="1" :disabled="disabled">On</Radio>
                        <Radio label="0" :disabled="disabled">OFF</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="title" :label="$t('appPush.title')"  >
                    <Input v-model="formValidate.title" :disabled="disabled" 
                        style="width:300px"></Input>
                </FormItem>
                <FormItem :label="$t('appPush.wenan')" prop="data">
                    <Input v-model="formValidate.data" :disabled="disabled" type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"  style="width:300px"></Input>
                </FormItem>
                <FormItem :label="$t('appPush.remark')" prop="remark">
                    <Input v-model="formValidate.remark" :disabled="disabled" type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}" style="width:300px"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{ $t("cancelText") }}</Button>
                <Button type="success" :loading="btnLoading" @click="operate" :disabled="disabled">{{
          $t("okText")
        }}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {
        pushconfigList,
        pushconfigSave
    } from "@/api/user";
    import {
        objectEach
    } from 'highcharts';
    export default {
        name: 'appPush',
        components: {},

        data() {
            return {
                disabled: false,
                showModal: false,
                loading: false,
                searchLoading: false,
                btnLoading: false,
                modalTitle: "",
                id: "",
                searchForm: {
                    page: 1,
                    title: '',
                },
                formValidate: {
                    eventName: '',
                    title: '',
                    status: '',
                    remark: '',
                    data: ''
                },
                total: 0,
                pageCount: 0,
                pageSize: 10,
                tableData: [],
                tableDefine: [{
                        title: this.$t('appPush.ID'),
                        align: "center",
                        key: "id",
                        fixed: "left",
                        minWidth: 150
                    },
                    {
                        title: this.$t('appPush.event'),
                        align: "center",
                        key: "eventName",
                        minWidth: 150
                    },
                    {
                        title: this.$t('appPush.title'),
                        align: "center",
                        key: "title",
                        minWidth: 150
                    },
                    {
                        title: this.$t('appPush.status'),
                        align: "center",
                        key: "status",
                        minWidth: 150,
                        render: (h, params) => {
                            return h(
                                "div", params.row.status == 1 ? "ON" : "OFF"
                            );
                        },
                    },
                    {
                        title: this.$t('appPush.createTime'),
                        align: "center",
                        key: "createTime",
                        minWidth: 150
                    },
                    {
                        title: this.$t('appPush.updateTime'),
                        align: "center",
                        key: "updateTime",
                        minWidth: 150
                    },
                    {
                        title: this.$t('operate.handle'),
                        align: 'center',
                        key: 'option',
                        fixed: 'right',
                        minWidth: 200,
                        render: (h, params) => {
                            return h('div', this.$refs.table['$scopedSlots'].action({
                                rowInfo: params.row
                            }))
                        }
                    }
                ],
                ruleValidate: {
                    eventName: [{
                        required: true,
                        message: 'input',
                        trigger: 'blur'
                    }],
                    title: [{
                        required: true,
                        message: 'input',
                        trigger: 'blur'
                    }],
                    data: [{
                        required: true,
                        message: 'input',
                        trigger: 'blur'
                    }],
                    status: [{
                        required: true,
                        message: 'input',
                        trigger: 'change'
                    }],
                }
            };
        },

        async created() {
            this._getList()
        },

        computed: {},

        mounted() {},

        methods: {
            handlePage(pageIndex) {
                this.searchForm.page = pageIndex || 1;
                this._getList();
            },
            _getList() {
                this.loading = true;
                this.tableData = [];
                pushconfigList({
                    eventName: this.searchForm.eventName,
                    page: this.searchForm.page,
                }, (res) => {
                    this.loading = false;
                    if (+res.code === 0) {
                        const data = res.data;
                        this.tableData = data.list || []
                        this.total = Number(data.arrPager.count)
                        this.pageCount = +Number(data.arrPager.count)
                        this.pageSize = +data.arrPager.pageSize
                        this.showTable = true
                    } else {
                        this.showTable = false
                    }
                })
            },
            view(row) {
                console.log(row)
                this.modalTitle = this.$t('appPush.view');
                this.showModal = true;
                this.disabled = true;
                this.formValidate.eventName = row.eventName;
                this.formValidate.title = row.title;
                this.formValidate.status = row.status;
                this.formValidate.data = row.data;
            },
            edit(row) {
                this.modalTitle = this.$t('appPush.edit');
                this.showModal = true;
                this.disabled = false;
                this.formValidate.eventName = row.eventName;
                this.formValidate.title = row.title;
                this.formValidate.status = row.status;
                this.formValidate.data = row.data;
                this.formValidate.remark = row.remark;
                this.id = row.id;
            },
            add() {
                this.modalTitle = this.$t('appPush.Create');
                this.showModal = true;
                this.disabled = false;
                this.formValidate.eventName = "";
                this.formValidate.title = "";
                this.formValidate.status = "";
                this.formValidate.data = "";
                this.formValidate.remark="";
                this.id = "";
            },
            operate() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.btnLoading = true;
                        pushconfigSave({
                            id: this.id,
                            eventName: this.formValidate.eventName,
                            remark: this.formValidate.remark,
                            title: this.formValidate.title,
                            status: this.formValidate.status,
                            data: this.formValidate.data,
                        }, res => {
                            this.btnLoading = false;
                            if (res.code == 0) {
                                this.showModal = false;
                                 this._getList();
                                this.$Message.success(res.msg)
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })

                    }
                })

            },
            cancel() {
                this.showModal = false;
            }
        }
    }
</script>
<style lang='scss' scoped>
    .appPush {
        .table-wrap {
            border-radius: 4px;
            text-align: right;

            .batch-change {
                margin-bottom: 15px;
            }
        }
    }
</style>
