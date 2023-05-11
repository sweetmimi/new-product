<!-- zys -->
<template>
  <div class="scriptSet">
    <Tabs value="1">
      <TabPane :label="item.lable" :name="item.value" v-for="(item,index) in tabList" :key="index">
        <Alert>{{$t("operateAmount.scriptSet.tips")}}</Alert>
        <Table border :columns="columns" :loading="loading" :data="tableData">
          <Spin slot="loading" fix class="m-loading">
            <Icon type="load-c" size=18 class="spin-icon"></Icon>
            <div>{{$t('loadingText')}}</div>
          </Spin>
        </Table>
      </TabPane>
    </Tabs>
    <Modal align="center" :title='$t("operateAmount.scriptSet.editTitle")' class="m-modal" v-model="editModal">

      <Form ref="formInline" :label-width="100">
         <FormItem :label="$t('operateAmount.scriptSet.status')">
          <Select transfer v-model="status" :placeholder="`${$t('selectPrefix')}`">
            <Option value="1">
              {{ $t("operateAmount.scriptSet.open") }}
            </Option>
            <Option value="0" >
            {{ $t("operateAmount.scriptSet.close") }}
            </Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('operateAmount.scriptSet.type_text')" v-if="status==1">
          <Select transfer v-model="type" :placeholder="`${$t('selectPrefix')}`">
            <Option value="1">
              {{ $t("operateAmount.scriptSet.today") }}
            </Option>
            <Option value="2">
            {{ $t("operateAmount.scriptSet.yesterday_today") }}
          </Option>
            <Option value="3">
            {{ $t("operateAmount.scriptSet.before_yesterday_today") }}
          </Option>
          </Select>
        </FormItem>

      </Form>
      <div slot="footer" class="footer">
        <Button @click="editModal = false" align="center">{{
          $t("cancelText")
        }}</Button>
        <Button type="primary" @click="save" :loading="saveLoading"
          align="center">{{ $t("okText") }}</Button>
      </div>
    </Modal>
    <Modal align="center" :title='$t("operateAmount.scriptSet.history")' class="m-modal" v-model="historyModal">
      <Table border :columns="historyColumns"  :data="historyData" :loading="hisLoading">
      </Table>
      <Page
        show-total
        :total="total"
        :page-size="pageSize"
        :current.sync="page"
        class="m-pagination"
        @on-change="changePage"
      >
        {{ $t("pageSlot.total") }} {{ total }}
        {{ $t("pageSlot.count") }}
      </Page>
    </Modal>
  </div>
</template>

<script>
  import {
    retryConfig,
    retrySave,
    retryRecord
  } from "@/api/monitor";
  export default {
    name: '',
    components: {},

    data() {
      return {
        total:null,
        pageSize:10,
        page:1,
        editModal: false,
        historyModal: false,
        saveLoading:false,
        loading: false,
        hisLoading:false,
        type:'',
        status:'',
        editId:'',
        tabList: [{
          value: '1',
          lable: this.$t("operateAmount.scriptSet.waitReloan"),
        }, ],
        tableData: [],
        columns: [{
            title: this.$t("operateAmount.scriptSet.type_text"),
            key: "type_text",
            align: "center",
          },
          {
            title: this.$t("operateAmount.scriptSet.create_time"),
            key: "create_time",
            align: "center",
          },
           {
            title: this.$t("operateAmount.scriptSet.status"),
            key: "status_text",
            align: "center",
          },
          {
            title: this.$t("operate.handle"),
            key: "handle",
            align: "center",
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    icon: "md-options",
                    type: "text",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    },
                  },
                }, this.$t("operateAmount.scriptSet.edit")),
                 h('Button', {
                  props: {
                    icon: "md-paper",
                    type: "text",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.history(params.row);
                    },
                  },
                }, this.$t("operateAmount.scriptSet.history"))
              ])
            }
          }
        ],
        historyData:[],
        historyColumns:[
          {
            title: this.$t("operateAmount.scriptSet.type_text"),
            key: "type_text",
            align: "center",
          },
           {
            title: this.$t("operateAmount.scriptSet.status"),
            key: "status_text",
            align: "center",
          },
          {
            title: this.$t("operateAmount.scriptSet.create_time"),
            key: "create_time",
            align: "center",
          },
        ],
      };
    },

    async created() {
      this.getTableData()
    },

    computed: {},

    mounted() {},

    methods: {
      getTableData() {
        this.loading =true;
        retryConfig({}, res => {
          if (res.code == 0) {
            this.loading =false;
            this.tableData = res.data.res
          } else {
            this.loading =false;
            this.$Message.error(res.msg)
          }
        })
      },
      edit(row) {
        this.editModal = true;
        this.type = row.type;
        this.status = row.status;
        this.editId = row.id;
      },
      save() {
        this.saveLoading = true
        retrySave({
          status:this.status,
          type:this.type,
          id:this.editId
        },res=>{
          if(res.code==0){
            this.saveLoading = false;
            this.editModal = false;
            this.getTableData()
          }else{
            this.saveLoading = false;
          }
        })
      },
      history(row) {
        this.hisLoading = true;
        this.historyModal = true;
        retryRecord({
          page:this.page||1
        },res=>{
          if(res.code==0){
            this.hisLoading = false;
             this.historyData = res.data.res||[];
             this.total = Number( res.data.cnt)
          }else{
            this.hisLoading = false;
            this.$Message.error(res.msg)
          }

        })
      },
      changePage(
        pageIndex
      ){
        this.page = pageIndex || 1
        this.history()
      }
    }
  }

</script>
<style lang='scss' scoped>

</style>
