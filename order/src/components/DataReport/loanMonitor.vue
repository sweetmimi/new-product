<!-- zys -->
<template>
  <div class="ExpireDateTable">
    <div class="search-wrap">
      <Form inline :label-width="80" :model="searchForm">
        <div class="search-group-wrap">
          <div class="search-group">
            <FormItem :label="$t('dataReport.search.loanType')">
              <Select v-model="searchForm.loanType">
                <Option v-for="(item, index) in loanTypes" :key="index" :value="index">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.Maturity')">
              <Select v-model="searchForm.expireType">
                <Option
                  v-for="(item, index) in $t('dataReport.search.Maturitys')"
                  :key="index"
                  :value="item.key"
                >{{ item.value }}</Option>
              </Select>
            </FormItem>
            <FormItem :label="$t('dataReport.search.phases')">
              <Select v-model="searchForm.periodNo">
                <Option
                  v-for="(item, index) in $t('dataReport.search.phaseOption')"
                  :key="index"
                  :value="item.key"
                >{{ item.value }}</Option>
              </Select>
            </FormItem>

            <FormItem :label="$t('dataReport.search.channelSou')">
              <Select v-model="searchForm.channel">
                <Option
                  v-for="(item, index) in channelSources"
                  :key="index"
                  :value="index"
                  @click.native="chioce(item)"
                >{{ item }}</Option>
              </Select>
            </FormItem>

            <FormItem :label="$t('dataReport.search.orderMoney')">
              <Select v-model="searchForm.applicationAmount">
                <Option
                  v-for="(item, index) in applicationAmountList"
                  :key="index"
                  :value="item.value"
                >{{ item.key }}</Option>
              </Select>
            </FormItem>

            <FormItem class="fix-form-btn" :label-width="100">
              <Button
                type="primary"
                slot="label"
                :loading="loading"
                @click="getTableData()"
              >{{ $t("search") }}</Button>
            </FormItem>
            <!-- <Button type="success" slot="label" icon="ios-download-outline" :loading="exploading"
            @click="excelHandlePage(t.key)">{{$t('exportExcel')}}</Button>-->
          </div>
        </div>
      </Form>
    </div>

    <Table border height="550" :data="tableData" :columns="tableDefine" :loading="loading"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { apiAmountoverdue, getchannel } from '@/api/dataReport'
import { Getter, Action } from 'vuex-class'

import { export_json_to_excel } from '@/vendor/Export2Excel'
@Component
export default class MoneyData extends Vue {
  @Getter('selectItems') selectItems: any
  @Action('getSelectList') getSelectList: any

  searchForm = {
    loanType: 0,
    expireType: '',
    periodNo: 1,
    channel: '',
    applicationAmount: '',
    source: '',
  }
  channel = []
  get channelSources() {
    return this.channel || []
  }
  get loanTerms() {
    return this.selectItems.application_term_list || []
  }
  get loanTypes() {
    return this.selectItems.loan_type_list || []
  }
  get applicationAmountList() {
    return this.selectItems.application_amount_list || []
  }
  loading = false
  exploading = false
  showTable = false
  searchLoading = false
  total = 0
  pageCount = 0
  pageSize = 10
  tableData = []
  tabName = '1'
  tableDefine = []
  item = ''
  chioce(item: any) {
    this.item = item
  }
  getTableHeader() {
    let newtableDefine = []
    for (let index = 1; index < 32; index++) {
      newtableDefine.push({
        title: 'S' + index,
        align: 'center',
        key: 'S' + index,
        width: 80,
      })
    }
    newtableDefine.unshift(
      {
        title: this.$t('dataReport.tableHead.expireDate'),
        align: 'center',
        key: 'day',
        width: 120,
        fixed: 'left',
      },
      {
        title: 'H0',
        align: 'center',
        key: 'H0',
        width: 80,
      }
    )
    newtableDefine.push(
      {
        title: this.$t('dataReport.tableHead.dueNum'),
        align: 'center',
        key: 'dueNum',
        width: 80,
      },
      {
        title: this.$t('dataReport.tableHead.applicationAmount'),
        align: 'center',
        key: 'applicationAmount',
        width: 100,
      }
    )
    this.tableDefine = newtableDefine
    console.log(newtableDefine)
  }
  getTableData() {
    this.tableData = []
    ;(this.searchForm.source =
      this.item == 'all' || this.item == 'Semua' ? '' : this.item),
     ((this.loading = true))
    apiAmountoverdue(this.searchForm, (res: any) => {
      this.loading = false
      if (+res.code === 0) {
        this.tableData = res.data
      } else {
        this.$Message.error(res.msg)
      }
    })
  }

  created() {
    getchannel({}, (res: any) => {
      let tableData = []
      if (res.data.data instanceof Object && !Array.isArray(res.data.data)) {
        for (let k in res.data.data) {
          tableData.push(res.data.data[k])
        }
      } else {
        tableData = res.data.data
      }
      tableData.splice(0, 0, this.$t('dataReport.search.complete'))
      this.channel = tableData
    })
    this.getTableHeader()
    this.getTableData()
  }
}
</script>
<style lang='less' scoped>
</style>
