<!-- zys -->
<template>
  <div class="customerList">
    <Input
     clearable
      v-model="searchFormInfo.customerMobile"
      :placeholder="`${$t('inputPrefix')}${$t('mobile')}`"
    ></Input>
    <Button
      type="primary"
      slot="label"
      :loading="loading"
      @click="handleUpdateTable()"
    >
      {{ $t("approvalTask.serachBlock.search") }}</Button
    >
    <div class="table" >
      <Table
      border
      :loading="tableLoading"
      :columns="tableDefine"
      :data="tableData"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size="18" class="spin-icon"></Icon>
        <div>{{ $t("loadingText") }}</div>
      </Spin>
    </Table>
    </div>

  </div>
</template>

<script>
import { getCustomerList, customerDestroy } from '@/api/user'
export default {
  name: "",
  components: {},

  data() {
    return {
      searchFormInfo: {
        customerMobile: "",
      },
      loading: false,
      tableLoading: false,
      tableData: [],
      tableDefine: [
        {
          title: "Nama",
          align: "center",
          key: "name",
        },
         {
          title: "Nomor Telepon",
          align: "center",
          key: "mobile",
        },
         {
          title: "NIK",
          align: "center",
          key: "nik",
        },
         {
          title: this.$t('listModule.handle'),
          key: 'handle',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                  icon: 'ios-trash-outline'
                },
                class: 'fix-table-btn',
                on: {
                  click: () => {
                    this.destroy(params.row)
                  }
                }
              }, this.$t('listModule.destroyBtn')),
            ])
          }
        }
      ],
    };
  },

  async created() {},

  computed: {},

  mounted() {},

  methods: {
    handleUpdateTable() {
      this.tableData=[];
      this.tableLoading = true
      getCustomerList({customerMobile:this.searchFormInfo.customerMobile},res=>{
         this.tableLoading = false
        if(res.status==0 ){
          var tableData =[];
          var obj = {};
          var data = res.data;
          obj.mobile = data.mobile
          obj.name = data.name
          obj.nik = data.nik
          obj.uid = data.uid
          if(data.nik){
             tableData.push(obj)
          }
          this.tableData = tableData
        }else{
          this.$Message.error(res.msg)
        }
      })
    },
    destroy(row){
       this.$Modal.confirm({
                    title: this.$t('listModule.destroyBtn'),
                    content:  this.$t('listModule.destroyTip'),
                    okText:this.$t('listModule.destroyBtn'),
                    onOk: () => {
                      customerDestroy({
                        uid:row.uid
                      },res=>{
                        if(res.status==0){
                          this.$Message.success(res.msg);
                          this.handleUpdateTable()
                        }else{
                          this.$Message.error(res.msg);
                        }
                      })

                    },

                });
    }
  },
};
</script>
<style lang='scss' scoped>
.table{
  margin-top: 20px;
}
</style>
