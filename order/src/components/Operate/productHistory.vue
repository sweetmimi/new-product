<!-- zys -->
<template>
  <div>
    <div class="table">
      <Table
        border
        class="list-table"
        :data="tableData"
        :columns="tableDefine"
        :loading="loading"
      >
      </Table>


      <Page
        :total="total"
        :page-size="pageSize"
        class-name="m-pagination"
        @on-change="handlePage"
        show-total
        show-elevator
        >{{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page
      >
      <Modal
        v-model="modal"
        :title="$t('product.config.rolloverNewConf')"
        >
        <Select v-model="rolloverNewConf" style="width:200px">
            <Option  value="1" >yes</Option>
            <Option  value="0" >no</Option>
        </Select>
        <div slot="footer">
        <Button @click="modal = false">{{$t('cancelText')}}</Button>
        <Button type="success" :loading="btnLoading" @click="ischange()">{{$t('okText')}}</Button>
      </div>
    </Modal>
    </div>
  </div>
</template>

<script>
import { productHistory ,SaveRolloverNewConf} from "@/api/config";
export default {
  name: "",
  components: {},

  data() {
    return {
      rolloverNewConf:"",
      configId:"",
      btnLoading:false,
      modal:false,
      loading: false,
      total: 0,
      page: 1,
      pageSize: 10,
      pageCount: "",
      tableData: [],
      tableDefine: [
        {
          title: "Config Id",
          key: "configId",
          align: "center"
        },
        {
          title: this.$t("product.tableHead.version"),
          key: "version",
          align: "center"
        },
        {
          title: this.$t("product.tableHead.createTime"),
          key: "createTime",
          align: "center"
        },
        {
          title: this.$t("product.tableHead.operatorName"),
          key: "operatorName",
          align: "center"
        },
        {
          title: this.$t("product.tableHead.productId"),
          key: "productId",
          align: "center"
        },
        {
          title: this.$t("product.tableHead.productName"),
          key: "productName",
          align: "center"
        },
        {
          title: this.$t("product.tableHead.status"),
          key: "status",
          align: "center"
        },
        {
          title: this.$t("product.config.rolloverNewConf"),
          key: "rolloverNewConf",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.rolloverNewConf==1?'yes':'no')}
        },
        {
          title: this.$t("product.tableHead.termUnit"),
          key: "termUnit",
          align: "center"
        },
        {
          title: this.$t("operate.handle"),
          key: "",
          width:"250",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    icon: "ios-eye-outline"
                  },
                  on: {
                    click: () => {
                      this.view(params.row);
                    }
                  }
                },
                this.$t("operate.viewBtn")
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    icon: "ios-eye-outline"
                  },
                  on: {
                    click: () => {
                      this.changeRolloverNewConf(params.row);
                    }
                  }
                },
                "config"
              )
            ]);
          }
        }
      ]
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
      productHistory(
        {
          productId: this.$route.params.productId,
          page: this.page
        },
        res => {
          if (res.code == 0) {
            this.loading = false;
            this.tableData = res.data.list;
            this.total = res.data.arrPager.count;
          }
        }
      );
    },
    handlePage(pageIndex) {
      this.page = pageIndex || 1;
      this.getTableData();
    },
    view(row) {
      let routeData = this.$router.resolve({
        name: "productVersion",
         params: {
          version: row.version,
          productId: row.productId,
        }
      });
      window.open(routeData.href, "_blank");
    },
    changeRolloverNewConf(row) {
      this.modal = true;
      this.rolloverNewConf = row.rolloverNewConf
      this.configId = row.configId
    },
    ischange(){
      this.btnLoading = true
      SaveRolloverNewConf({
        configId:this.configId,
        rolloverNewConf:this.rolloverNewConf
      },res=>{
        this.btnLoading = false
        this.modal = false;
        this.getTableData();
      })
      
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
