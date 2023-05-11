<!-- zys -->
<template>
  <div class="profit">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <div class="search-group-wrap">
          <div class="search-group">

            <FormItem :label="$t('dataReport.search.selectYear')">
              <DatePicker
                type="year"
                placeholder="Select year"
                style="width: 200px;"
                format="yyyy"
                v-model="year"
              ></DatePicker>
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="searchData()"
                >{{ $t("search") }}</Button
              >
            </FormItem>
            <FormItem class="fix-form-btn" :label-width="120">
              <Button
                type="success"
                slot="label"
                :loading="loading1"
                @click="lender()"
                >Lender</Button
              >
            </FormItem>
          </div>
        </div>
      </Form>
    </div>
    <Table
      border
    
      class="list-table"
      :data="tableData"
      :columns="tableDefine"
      :loading="tableloading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>
   
    <Modal v-model="modal" title="lender" width="600">
      <Form ref="formDynamic" :label-width="80" style="width: 800px;">
        <FormItem
          v-for="(item, index) in formDynamic"
          v-show="item.status"
          :key="index"
          :label="`lender ${item.id}` "
        >
          <Input
            type="text"
            v-model="item.lender_name"
            placeholder="lender name"
            style="width: 120px; margin-right: 15px;"
          ></Input>

          <DatePicker
            @on-change="item.timeof = $event"
            v-model="item.timeof"
            v-if="hackReset"
            format="yyyy-MM-dd"
            type="daterange"
            placement="bottom-end"
            placeholder="Select date"
            style="width: 250px; margin-right: 15px;"
          ></DatePicker>
          <Poptip
            confirm
            placement="bottom"
            title="save?"
            @on-ok="save(item)"
            ok-text="ok"
            cancel-text="cancel"
          >
            <Button>save</Button>
          </Poptip>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="success" @click="handleAdd">add lender</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  apilenderList,
  apilenderEdit,
  apilenderProfit,
} from "@/api/dataReport";
export default {
  name: "",
  components: {},

  data() {
    return {
      year: new Date().getFullYear().toString(),
      showTable: true,
      hackReset: true,
      tableloading:false,
      loading: false,
      modal: false,
      loading1: false,
      tableData: [],
      tableDefine: [
        {
          title: this.$t('dataReport.tableHead.month'),
          align: "center",
          key: "name",
          width: 160,
          fixed: "left",
        },
        { title: this.$t('dataReport.tableHead.all'), align: "center", key: "total", width: 150 },
        { title: this.$t('dataReport.tableHead.month1'), align: "center", key: "01" , width: 140},
        { title: this.$t('dataReport.tableHead.month2'), align: "center", key: "02" , width: 140},
        { title: this.$t('dataReport.tableHead.month3'), align: "center", key: "03" , width: 140},
        { title: this.$t('dataReport.tableHead.month4'), align: "center", key: "04" , width: 140},
        { title: this.$t('dataReport.tableHead.month5'), align: "center", key: "05" , width: 140},
        { title: this.$t('dataReport.tableHead.month6'), align: "center", key: "06" , width: 140},
        { title: this.$t('dataReport.tableHead.month7'), align: "center", key: "07" , width: 140},
        { title: this.$t('dataReport.tableHead.month8'), align: "center", key: "08" , width: 140},
        { title: this.$t('dataReport.tableHead.month9'), align: "center", key: "09" , width: 140},
        { title: this.$t('dataReport.tableHead.month10'), align: "center", key: "10" , width: 140},
        { title: this.$t('dataReport.tableHead.month11'), align: "center", key: "11" , width: 140},
        { title: this.$t('dataReport.tableHead.month12'), align: "center", key: "12" , width: 140},
      ],
      id: "",
      formDynamic: [],
      timeof: [],
    };
  },

  async created() {},

  computed: {},

  mounted() {
    this.searchData();
  },

  methods: {
    searchData() {
      this.tableloading = true;
      apilenderProfit(
        {
          year: this.year.getFullYear(),
        },
        (res) => {
          if(res.code==0){
             
          this.tableData = res.data;
          this.tableloading = false;
          }else{
            this.$Message.error(res.msg)
          }
          
        }
      );
    },
    async lender() {
      this.loading1 = true;

      apilenderList({}, (res) => {
        this.loading1 = false;
        this.modal = true;
        this.formDynamic = res.data;
        this.formDynamic.forEach((item, index) => {
          this.id = item.id;
          item.timeof = [item.begin_time, item.end_time];
        });
      });
    },
    handleAdd() {
     
      this.formDynamic.push({
        lender_name: "",
        begin_time: "",
        end_time: "",
        id:"",
        status: 1,
      });
    },

    save(item) {
      console.log(item);
      apilenderEdit(
        {
          id: item.id,
          lender_name: item.lender_name,
          begin_time: item.timeof[0],
          end_time: item.timeof[1],
        },
        (res) => {
          if (res.code == 0) {
            this.searchData();
            this.$Message.success(res.msg);
          } else {
            this.$Message.error(res.msg);
          }
        }
      );
      this.modal = false;
    },
  },
};
</script>
<style lang='less' scoped>
</style>
