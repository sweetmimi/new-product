<template>
  <div class="m-customerList">
    <div class="search-wrap">
      <Form inline :label-width="80">
        <FormItem :label="`${$t('monitoring.search.usermatch')}`">
          <Select v-model="searchForm.status" style="width:200px">
            <Option
              v-for="(item, index) in allstatus"
              :key="index"
              :value="item.key"
              >{{ item.title }}</Option
            >
          </Select>
        </FormItem>
        <FormItem :label="`${$t('monitoring.search.time')}`">
            <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" @on-change="chooseTime"  :placeholder="`${$t('selectPrefix')}${$t('dataReport.search.date')}`" style="width: 300px"></DatePicker>
        </FormItem>
        <FormItem class="fix-form-btn" :label-width="100">
          <Button
            type="primary"
            slot="label"
            :loading="loading"
            @click="handlePage()"
            >{{ $t("search") }}</Button
          >
        </FormItem>
      </Form>
    </div>

    <Table
      ref="selection"
      border
      class="list-table"
      :data="tableData"
      :columns="tableDefine"
      :loading="loading"
      @on-select="handleSelect"
    >
    
    </Table>


    <Page
      :total="+total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
      >{{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}</Page
    >
        <Modal title="disetel ke tidak valid?" @on-ok="isDeleteok" v-model="isShowModal">
          <p>
            Apakah akan menonaktifkan daftar putih?
          </p>
        </Modal>
  </div>
</template>

<script>
import { whitelistIndex, updatewhitelist } from "../../api/customer";
import qs from "qs";
import moment from "moment";
import { export_json_to_excel } from "@/vendor/Export2Excel";
export default {
  data() {
    return {
      allstatus: [],
      tableData: [],
      pageCount: 0,
      pageSize: 10,
      total:"",
      listId:"",
      isShowModal: false,
      showTable: false,
      loading: false,
      role: false,

      nowTime: "",
      searchForm: {
          page:"1",
        status: -1,
        time_start:"",
        time_end:"",
      },
      tableDefine: [
        {
          title: "Komentar",
          align: "center",
          key: "memo"
        },
        {
          title: "tambahkan waktu",
          align: "center",
          key: "create_time"
        },
        {
          title: "Waktu perubahan status",
          align: "center",
          key: "update_time"
        },
        {
          title: "jumlah daftar putih",
          align: "center",
          key: "cnt"
        },
        {
          title: "negara",
          align: "center",
          key: "state"
        },
        {
          title: this.$t("operate.handle"),
          align: "center",
          key: "light_icon",
          fixed: "right",
           render: (h, params) => {
              let status = params.row.light_icon;
            //   let showIcon = params.row.show_icon;
            if (status == "1" ) {
              return h("div", [
                h("Icon", {
                  props: {
                    // type: "ios-trash"
                  }
                }),
                h('span',{
                on: {
                  click: ()=>{
                    this.isShowModal=true;
                    this.listId = params.row.create_time
                  }},
                style:{
                    fontWight:'600',
                    cursor:"pointer",
                    
                  }
                },'disetel ke tidak valid')
              ]);
            }
            else {
               return h("div", [
                h("Icon", {
                  props: {
                    // type: "ios-trash"
                  }
                }),
                h('span',{
                
                style:{
                    fontWight:'600',
                    cursor:"not-allowed",
                    color:"#ccc"
                  }
                },'disetel ke tidak valid')
              ]);
            }
          }
        }
      ]
    };
  },
  created() {
    this.handlePage();
    console.log(localStorage.getItem("role"));
    if (localStorage.getItem("role") == "role_super_admin") {
      this.role = true;
    } else {
      this.role = false;
    }
  },
  methods: {
    repayTimeChange(date) {
      this.selectTime = date;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    handleSelect() {
      console.log(selection);
    },
    chooseTime(date){
        this.searchForm.time_start = date[0]
        this.searchForm.time_end = date[1]
    },
    handlePage() {
      whitelistIndex(
        {
          status: this.searchForm.status,
          page: this.searchForm.page,
          beginTime: this.searchForm.time_start,
          endTime:this.searchForm.time_end,
        },
        res => {
          if (+res.code === 0) {
            this.tableData = res.data.list;
            this.allstatus = res.data.statusSelect;
            this.total = res. Number(data.arrPager.count) 
            this.pageCount = res. Number(data.arrPager.count) ;
            console.log(this.pageCount);
            this.showTable = true;
          } else {
            this.showTable = false;
          }
        }
      );
    },
    isDeleteok(){
        updatewhitelist({
            timeSlice:this.listId
        },
        res =>{
             if (+res.code === 0) {
                  this.handlePage()
                   this.$Message.success('success');
             }else{
                 this.$Message.error('error');
             }
        }
        )
    }
  }
};
</script>
