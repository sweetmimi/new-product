<!-- zys -->
<template>
  <div class="apiDataDocking">
      <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
              <!-- ID -->
            <FormItem label="ID">
               <Input v-model="searchForm.id" placeholder="ID" clearable style="width: 200px" />
            </FormItem>
            <!-- alasan -->
            <FormItem label="Alasan">
               <Input v-model="searchForm.alasan" placeholder="Alasan" clearable style="width: 200px" />
            </FormItem>

             <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="searchData()"
              >{{$t('search')}}</Button>
            </FormItem>
      </Form>
      </div>
  <div class="table">
      <Table border :columns="columns1" :data="tableData" :loading="loading"></Table>
  </div>
  
  </div>
</template>

<script>

import { getApidocking} from '@/api/customer'
export default {
  name:'' ,
  components: {},

  data () {
    return {
        loading:false,
        searchForm:{
            id:"",
            alasan:"1",
        },
        tableData:[],
        columns1: [
                    {
                        title: 'id borrower',
                        key: 'id_penyelenggara',
                        align: 'center',
                        minWidth: 150, 
                        fixed: 'left'
                    },
                    {
                        title: 'jenis pengguna',
                        key: 'jenis_pengguna',
                        align: 'center',
                         minWidth: 150, 
                    },
                    {
                        title: 'nama borrower',
                        key: 'nama_borrower',
                        align: 'center',
                         minWidth: 150, 
                    },
                    {
                        title: 'no identitas',
                        key: 'no_identitas',
                        align: 'center',
                         minWidth: 150, 
                    },
                     {
                        title: 'no npwp',
                        key: 'no_npwp',
                        align: 'center',
                         minWidth: 120, 
                    },
                     {
                        title: 'id pinjaman',
                        key: 'id_pinjaman',
                        align: 'center',
                         minWidth: 120, 
                    },
                     {
                        title: 'tgl perjanjian borrower',
                        key: 'tgl_perjanjian_borrower',
                        align: 'center',
                         minWidth: 180, 
                    },
                     {
                        title: 'tgl penyaluran dana',
                        key: 'tgl_penyaluran_dana',
                        align: 'center',
                         minWidth: 180, 
                    },
                     {
                        title: 'nilai pendanaan',
                        key: 'nilai_pendanaan',
                        align: 'center',
                         minWidth: 140, 
                    },
                    {
                        title: 'tgl pelaporan data',
                        key: 'tgl_pelaporan_data',
                        align: 'center',
                         minWidth: 150, 
                    },
                    {
                        title: 'sisa pinjaman berjalan',
                        key: 'sisa_pinjaman_berjalan',
                        align: 'center',
                         minWidth: 180, 
                    },
                    {
                        title: 'tgl jatuh tempo pinjaman',
                        key: 'tgl_jatuh_tempo_pinjaman',
                        align: 'center',
                         minWidth: 180, 
                    },
                    {
                        title: 'kualitas pinjaman',
                        key: 'kualitas_pinjaman',
                        align: 'center',
                         minWidth: 140, 
                    },
                    {
                        title: 'dpd terakhir',
                        key: 'dpd_terakhir',
                        align: 'center',
                         minWidth: 120, 
                    },
                    {
                        title: 'dpd max',
                        key: 'dpd_max',
                        align: 'center',
                         minWidth: 120, 
                    },
                    {
                        title: 'status pinjaman',
                        key: 'status_pinjaman',
                        align: 'center',
                         minWidth: 140, 
                    },
                    
                ],
    };
  },

 async created(){ 
   
 },

  computed: {},

  mounted () {},

  methods: {
      searchData(){
          this.loading=true
          this.tableData=[]
          getApidocking({
              ktp:this.searchForm.id,
              reason:this.searchForm.alasan
          },res=>{
              if(res.status=="Found"){
                  //console.log(res.pinjaman)
                  this.loading=false
                  this.tableData = res.pinjaman
                  let pinjamanId = res.memberId
                  this.tableData.forEach((item,index)=>{
                    item.id_pinjaman = pinjamanId
                  })
              }else{
                  this.$Message.error(res.status)
                  this.loading=false
              }
          })
          
      }
  }
}

</script>
<style lang='less' scoped>

</style>
