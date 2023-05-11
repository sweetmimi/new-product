<template>
  <div class="m-profit-data">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">

         
            <FormItem :label="$t('dataReport.search.loanType')">
              <Select v-model="searchForm.loanType" >
                <Option
                  v-for="item in $t('dataReport.search.loanTypes')"
                  :key="item.key"
                  :value="item.key"
                >{{item.value}}</Option>
              </Select>
            </FormItem>
             <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="handlePage()"
              >{{$t('search')}}</Button>
            </FormItem>
          
          
          </div>
        </div>
      </Form>
    </div>
   <!--  v-show="showTable" -->
    <Table
      border
      class="list-table"
     v-show="showTable"
      :data="tableData"
      :columns=" mytableDefine"
      :loading="loading"
    >
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
    </Table>
    <Alert v-show="!(showTable)">{{ $t('noData') }}</Alert>
    <Page
      :total="total"
      :page-size="pageSize"
      :current.sync="searchForm.page"
      class-name="m-pagination"
      @on-change="handlePage"
      show-total
      v-if="pageCount > pageSize"
      show-elevator
    >{{$t('pageSlot.total')}} {{total}} {{$t('pageSlot.count')}}</Page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import {HistoricalData } from '../../api/customer';
import {getRatlist} from   '../../common/js/until'
@Component
export default class  DailyData extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any
  searchForm = {
    timeFrame: [],
    loanPeriod: '0',
    loanType: '0',
    channelSources: 0,
    page: 1
  }
  tableData = []
  loading = false
  showTable = false
  searchLoading = false
  total = 0
  pageCount = 0
  pageSize = 10
  mytableDefine=[]
  tableDefine = [
                    {
                        title: this.$t("dataReport.tableHead.TheRuantitylending"),
                        key: 'fk_num',
                        align: 'center',
                         width: 110,
                         
                    },
                    {
                        title:  this.$t("dataReport.tableHead.AmountOfloanContract"),
                        key: 'fk_amount',
                        align: 'center',
                         width: 130,
                        
                    },
                      {
                        title:  this.$t("dataReport.tableHead.Number_overdue_cases"),
                        key: 'yqz_num',
                        align: 'center',
                         width: 130,
                        
                    },
                    {
                       title:  this.$t("dataReport.tableHead.zd_amount"),
                        key: 'zd_amount',
                        align: 'center',
                         width: 130,
                          
                    },
                     {
                       title:  this.$t("dataReport.tableHead.zd_actual_amount"),
                        key: 'zd_actual_amount',align: 'center',
                         width: 130,
                          
                    }, {
                       title:  this.$t("dataReport.tableHead.The_quantity_maturity"),
                        key: 'dq_num',align: 'center',
                         width: 130,
                         
                    }, {
                       title:  this.$t("dataReport.tableHead.Contract_amount_due"),
                        key: 'dq_amount',
                        align: 'center',
                         width: 130,
                          
                    },
                    //  {
                    //    title:  this.$t("dataReport.tableHead.Loan_amount_due"),
                    //     key: 'dq_actual_amount',
                    //     align: 'center',
                    //      width: 130,
                        
                    // },
                     {
                       title:  this.$t("dataReport.tableHead.YuQiLv"),
                        key: 'yq_rate',
                        align: 'center',
                         width: 130,
                         
                    }, {
                       title:  this.$t("dataReport.tableHead.The_contrac_amount_overdue"),
                        key: 'yqz_amount',
                        align: 'center',
                         width: 130,
                         
                    }, {
                       title:  this.$t("dataReport.tableHead.rush_number"),
                        key: 'rc_num',
                        align: 'center',
                         width: 130,
                         
                    }, {
                       title:  this.$t("dataReport.tableHead.hurried_rate"),
                        key: 'rc_rate',
                        align: 'center',
                         width: 130,
                       
                    }, {
                       title:  this.$t("dataReport.tableHead.Prompt_contract_amount"),
                        key: 'rc_amount',
                        align: 'center',
                         width: 130,
                          
                    }, {
                       title:  this.$t("dataReport.tableHead.recovery"),
                        key: 'huishou_rate',
                        align: 'center',
                         width: 130,
                          
                    },
                     {
                       title:  this.$t("dataReport.tableHead.total_amount_payment"),
                        key: 'fx_amount',
                        align: 'center',
                         width: 130,
                          
                    }, 
                     {
                       title:  this.$t("dataReport.tableHead.zq_order_num"),
                        key: 'zq_order_num',
                        align: 'center',
                         width: 130,
                          
                    }, 
                     {
                       title:  this.$t("dataReport.tableHead.zq_num"),
                        key: 'zq_num',
                        align: 'center',
                         width: 130,
                          
                    }, 
                     {
                       title:  this.$t("dataReport.tableHead.zq_amount"),
                        key: 'zq_amount',
                        align: 'center',
                         width: 130,
                          
                    }, 
                     {
                       title:  this.$t("dataReport.tableHead.zq_shouyi"),
                        key: 'zq_shouyi',
                        align: 'center',
                         width: 130,
                          
                    }, 

                    
                    {
                       title:  this.$t("dataReport.tableHead.Flat_order_number"),
                        key: 'pz_order_num',
                        align: 'center',
                         width: 130,
                        
                    }, {
                       title:  this.$t("dataReport.tableHead.account_order_contract_amount"),
                        key: 'pz_amount',
                        align: 'center',
                         width: 130,
                          
                    }, {
                       title:  this.$t("dataReport.tableHead.Close_accounts"),
                        key: 'pz_payoff_amount',
                        align: 'center',
                         width: 130,
                          
                    }, {
                       title:  this.$t("dataReport.tableHead.amount_the_account_order"),
                        key: 'pz_actual_amount',
                        align: 'center',
                         width: 140,
                         
                    }, 
                    {
                       title:  this.$t("dataReport.tableHead.Flat_account_profit_loss"),
                        key: 'pz_yingkui_amount',
                        align: 'center',
                         width: 130,
                         
                    },
                     {
                       title:  this.$t("dataReport.tableHead.realized_gains_losses"),
                        key: 'true_yl_amount',
                        align: 'center',
                         width: 130,
                          
                    },
                ];
                  tableDefine1 = [
                    {
                        title: this.$t("dataReport.tableHead.TheRuantitylending"),
                        key: 'fk_num',
                        align: 'center',
                         width: 110,
                         
                    },
                    {
                        title:  this.$t("dataReport.tableHead.AmountOfloanContract"),
                        key: 'fk_amount',
                        align: 'center',
                         width: 130,
                        
                    },
                      {
                        title:  this.$t("dataReport.tableHead.Number_overdue_cases"),
                        key: 'yqz_num',
                        align: 'center',
                         width: 130,
                        
                    },
                    {
                       title:  this.$t("dataReport.tableHead.zd_amount"),
                        key: 'zd_amount',
                        align: 'center',
                         width: 130,
                          
                    },
                     {
                       title:  this.$t("dataReport.tableHead.zd_actual_amount"),
                        key: 'zd_actual_amount',align: 'center',
                         width: 130,
                          
                    }, {
                       title:  this.$t("dataReport.tableHead.The_quantity_maturity"),
                        key: 'dq_num',align: 'center',
                         width: 130,
                         
                    }, {
                       title:  this.$t("dataReport.tableHead.Contract_amount_due"),
                        key: 'dq_amount',
                        align: 'center',
                         width: 130,
                          
                    },
                    //  {
                    //    title:  this.$t("dataReport.tableHead.Loan_amount_due"),
                    //     key: 'dq_actual_amount',
                    //     align: 'center',
                    //      width: 130,
                        
                    // },
                     {
                       title:  this.$t("dataReport.tableHead.YuQiLv"),
                        key: 'yq_rate',
                        align: 'center',
                         width: 130,
                         
                    }, {
                       title:  this.$t("dataReport.tableHead.The_contrac_amount_overdue"),
                        key: 'yqz_amount',
                        align: 'center',
                         width: 130,
                         
                    }, {
                       title:  this.$t("dataReport.tableHead.rush_number"),
                        key: 'rc_num',
                        align: 'center',
                         width: 130,
                         
                    }, {
                       title:  this.$t("dataReport.tableHead.hurried_rate"),
                        key: 'rc_rate',
                        align: 'center',
                         width: 130,
                       
                    }, {
                       title:  this.$t("dataReport.tableHead.Prompt_contract_amount"),
                        key: 'rc_amount',
                        align: 'center',
                         width: 130,
                          
                    }, {
                       title:  this.$t("dataReport.tableHead.recovery"),
                        key: 'huishou_rate',
                        align: 'center',
                         width: 130,
                          
                    },
                     {
                       title:  this.$t("dataReport.tableHead.total_amount_payment"),
                        key: 'fx_amount',
                        align: 'center',
                         width: 130,
                          
                    }, 
                     {
                       title:  this.$t("dataReport.tableHead.zq_order_num"),
                        key: 'zq_order_num',
                        align: 'center',
                         width: 130,
                          
                    }, 
                     {
                       title:  this.$t("dataReport.tableHead.zq_num"),
                        key: 'zq_num',
                        align: 'center',
                         width: 130,
                          
                    }, 
                     {
                       title:  this.$t("dataReport.tableHead.zq_amount"),
                        key: 'zq_amount',
                        align: 'center',
                         width: 130,
                          
                    }, 
                     {
                       title:  this.$t("dataReport.tableHead.zq_shouyi"),
                        key: 'zq_shouyi',
                        align: 'center',
                         width: 130,
                          
                    }, 

                    
                    {
                       title:  this.$t("dataReport.tableHead.Flat_order_number"),
                        key: 'pz_order_num',
                        align: 'center',
                         width: 130,
                        
                    }, {
                       title:  this.$t("dataReport.tableHead.account_order_contract_amount"),
                        key: 'pz_amount',
                        align: 'center',
                         width: 130,
                          
                    }, {
                       title:  this.$t("dataReport.tableHead.Close_accounts"),
                        key: 'pz_payoff_amount',
                        align: 'center',
                         width: 130,
                          
                    }, {
                       title:  this.$t("dataReport.tableHead.amount_the_account_order"),
                        key: 'pz_actual_amount',
                        align: 'center',
                         width: 140,
                         
                    }, 
                    
                ]
  tableColumns: Array<any> = []
  formatDayTime(val: any): string {
    if (val) {
      const date: any = new Date(val)
      const Y: any = date.getFullYear()
      let M: any = date.getMonth() + 1
      let D: any = date.getDate()
      if (M < 10) {
        M = '0' + M
      }
      if (D < 10) {
        D = '0' + D
      }
      return Y + '-' + M + '-' + D
    } else {
      return ''
    }
  }
  get channelSources() {
    return this.selectItems.channel || []
  }
  get beginTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[0])
  }
  get endTime(): string {
    return this.formatDayTime(this.searchForm.timeFrame[1])
  }
  timeLimitConfig = {
    disabledDate(date: any) {
      return date && date.valueOf() > Date.now()
    }
  }
  _getDailyData() {
    const  loan_type = {
       loan_type:this.searchForm.loanType
       }
    // this.loading = true
 HistoricalData(loan_type, (res: any) => {
   
 
   
        if (+res.code === 0) {
            let tableData = []
        if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
          for (let k in res.data.data) {
            tableData.push(res.data.data[k])
            getRatlist(tableData,['yq_rate','rc_rate','huishou_rate'])
              this.tableData = tableData
              this.showTable = true
          }
        } else {
          tableData = res.data.data
         
      }
        }else{
             this.showTable = false
        }
       
    })
    
  }
  
  handlePage(pageIndex: number) {
    this.searchForm.page = pageIndex || 1
    this._getDailyData()
  }
  created() {
    const role = localStorage.getItem("role") || "";
     if(role ==="role_super_admin"){
       this.mytableDefine = this.tableDefine
      }else{
        this.mytableDefine = this.tableDefine
      }
    this._getDailyData()
  }

}

</script>
