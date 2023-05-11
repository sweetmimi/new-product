<!-- zys -->
<template>
  <div class="m-lenderBalance">
    <Button type="success" @click="getTableData" style="margin-bottom:20px">{{$t('search')}}</Button>
    <Table ref="table" border class="list-table" :data="tableData" :columns="tableDefine" :loading="loading">
    </Table>
    <Modal v-model="Modal" :title="$t('dataReport.lenderBalance.edit')" @on-ok="changeStatus">
      <Form :label-width="80">
        <FormItem :label="$t('dataReport.lenderBalance.lender_status')">
          <Select v-model="editStatus">
            <Option value="1">{{ $t("dataReport.lenderBalance.start") }}</Option>
            <Option value="2">{{ $t("dataReport.lenderBalance.close") }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {
    ApiGetlenderbalance,
    ApiSavelendersort,
    ApiSwitchlenderaccount
  } from "@/api/monitor";
  export default {
    name: "",
    components: {},

    data() {
      return {
        loading: false,
        Modal: false,
        editStatus: '',
        editId: '',
        tableData: [],
        tableDefine: [{
            title: this.$t("dataReport.lenderBalance.sort_value"),
            align: "center",
            key: "sort_value",
            width: 80,
          },
          {
            title: this.$t("dataReport.lenderBalance.lender_id"),
            align: "center",
            key: "lender_id",
            width: 120,
          },
          {
            title: this.$t("dataReport.lenderBalance.lender_name"),
            align: "center",
            key: "lender_name",
            minWidth: 80,
          },
          {
            title: this.$t("dataReport.lenderBalance.lender_balance"),
            align: "center",
            key: "lender_balance",
            minWidth: 80,
          },
          {
            title: this.$t("dataReport.lenderBalance.lender_status"),
            align: "center",
            key: "lender_status",
            width: 180,
            render: (h, params) => {
              if (params.row.lender_status == 1) {
                return h('Tag', {
                  props: {
                    color: "success",
                    type: "dot",
                  },
                }, this.$t("dataReport.lenderBalance.start"))
              } else {
                return h('Tag', {
                  props: {
                    color: "error",
                    type: "dot",
                  },
                }, this.$t("dataReport.lenderBalance.close"))
              }

            }
          },
          {
            title: this.$t("operate.handle"),
            key: "handle",
            align: "center",
            width: 250,
            render: (h, params) => {
              return h("div", [
                h("Button", {
                  props: {
                    disabled:params.row.lender_id==214 ?true:false,
                    icon: "ios-arrow-dropup",
                    type: "text",
                    size: "small",
                  },
                  style: {
                    cursor: "pointer",
                    fontSize: "20px",
                    marginRight: "15px",
                  },
                  on: {
                    click: () => {
                      this.sort(params.row, "-1");
                    },
                  },
                }),
                h("Button", {
                  props: {
                    disabled:params.row.lender_id==214 ?true:false,
                    icon: "ios-arrow-dropdown",
                    type: "text",
                    size: "small",
                  },
                  style: {
                    cursor: "pointer",
                    fontSize: "20px",
                  },
                  on: {
                    click: () => {
                      this.sort(params.row, "1");
                    },
                  },
                }),
                h("Button", {
                  props: {
                    disabled:params.row.lender_id==214 ?true:false,
                    icon: "md-options",
                    type: "text",
                    size: "small",
                  },

                  on: {
                    click: () => {
                      this.edit(params.row, );
                    },
                  },
                }, this.$t("dataReport.lenderBalance.edit")),
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
      getTableData() {
        this.loading = true;
        ApiGetlenderbalance({}, res => {
          if (res.code == 0) {
            this.loading = false;
            this.tableData = res.data
          } else {
            this.loading = false;
            this.$Message.error(res.msg)
          }

        })
      },

      sort(row, type) {
        ApiSavelendersort({
          id: row.id,
          sortOffset: type
        }, res => {
          if (res.code == 0) {
            this.getTableData()
          } else {
            this.$Message.error(res.msg)
          }
        })
      },

      edit(row) {
        this.editId = row.id,
          this.editStatus = row.lender_status,
          this.Modal = true;
      },
      changeStatus() {
        ApiSwitchlenderaccount({
          id: this.editId,
          lender_status: this.editStatus
        }, res => {
          if (res.code == 0) {
            this.Modal = false;
            this.getTableData();
            this.$Message.success(res.msg);
          } else {
            this.$Message.error(res.msg);
          }
        })
      }
    },
  };
</script>
<style lang='less' scoped>
</style>
