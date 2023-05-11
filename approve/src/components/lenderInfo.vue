<!-- zys -->
<template>
  <div class="m-lenderInfo">
    <!-- <Button type="primary" :loading="loading" @click="_getlendinfo()">{{$t('approvalTask.serachBlock.search')}}</Button> -->
    <div class="box">
       <Row align="middle" v-for="(item,index) in tableData" :key="index">
         <div v-if="item.key!='Ijin Usaha/NPWP'">
           <Col span="6" class-name="col-style title">{{item.key}}</Col>
          <Col span="18" class-name="col-style">{{item.value}}</Col>
         </div>
          <div v-else>
            <Col span="6" class-name="col-style title">{{item.key}}</Col>
            <Col span="18" class-name="col-style">
           <a @click="Detail(item.value)" > Detil di sini</a>
            </Col>
          </div>
      </Row>

    </div>

  </div>
</template>

<script>
import { getlendinfo  } from "@/api/user.js";
export default {
  name:'' ,
  components: {},

  data () {
    return {
      loading:false,
      tableData:[]
    };
  },

 async created(){

   this._getlendinfo()
 },

  computed: {},

  mounted () {},

  methods: {

    _getlendinfo(){
      this.loading = true;
       var tableData = [];
       this.tableData = [];
      getlendinfo({},res=>{
        this.loading = false;
        if(res.status==0){
          var obj = res.data;
         for (let i in obj) {
           var list = {}
           list.key = i
           list.value = obj[i]
          tableData.push(list);
        }
        this.tableData =tableData
        console.log(tableData)
        }
      })
    },
    Detail(url){
      window.open(url)
    }
  }
}

</script>
<style scoped lang="scss">
$borderColor: #e9eaec;
.m-lenderInfo {
  $borderColor: #e9eaec;
  .tag {
    border-radius: 3px;
    text-align: center;
    height: auto;
    padding: 0px 10px;
    margin-right: 10px;
  }
  .list {
    margin-top: 25px;
  }
  .box {
    margin-left: 20%;
    width: 60%;
    border-left: 1px solid $borderColor;
    border-top: 1px solid $borderColor;
    margin-top: 24px;
    .col-style {
      height: 40px;
      line-height: 40px;
      border-right: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      text-indent: 20px;
      &.title {
        text-align: left;
        padding-left: 0;
        color: #495060;
        font-weight: bold;
        background-color: #f8f8f9;
      }
      &.error {
        color: red;
      }
    }
  }
  .associated-order {
    margin-top: 24px;
    .hd {
      background-color: #f8f8f9;
      font-weight: 800;
    }
    table {
      border: 1px solid $borderColor;
      border-collapse: collapse;
      line-height: 40px;
    }
    td {
      border-left: 1px solid $borderColor;
      border-top: 1px solid $borderColor;
      text-indent: 20px;
    }
    .order-list {
      display: flex;
      border-top: 1px solid $borderColor;
      border-left: 0;
      .link {
        color: #0647ff;
        cursor: pointer;
      }
      td {
        text-indent: 0;
        width: 25%;
        border-top: 0;
        padding: 10px 20px;
        line-height: 2;
        &:first-child {
          border-left: 0;
        }
      }
      &:first-child {
        border-top: 0;
      }
    }
  }
  .no-data {
    margin-left: 20px;
    margin-top: 20px;
  }

  .living-photo {
    width: 100%;
  }
}

.m-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
