<template>
  <div class="m-Performance">

    <div class="stage" style="margin-bottom: 20px;">
      <ButtonGroup>
        <Button 
          :key="index" 
          size="large"
          style="width: 100px;" 
          v-for="(item, index) in stageList" 
          @click="changeStage(item.type)"
          :type="+searchInfo.type === +item.type ? 'primary' : 'default'">{{item.desc}}</Button>
      </ButtonGroup>
    </div>

    <!-- form block -->
    <Table border v-if="showTable" :columns="tableColums" :data="tableData" :loading="loading.tableLoading">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
    <!-- table block -->
    <Page
      show-total
      show-elevator
      :total="pagerData.count"
      :page-size="pagerData.pageSize"
      :current.sync="searchInfo.page"
      class="m-pagination"
      v-if="pagerData.count > pagerData.pageSize"
      @on-change="getPerformanceList">
        {{$t('pageSlot.total')}} {{pagerData.count}} {{$t('pageSlot.count')}}
    </Page>
    <!-- page block -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatMoney } from '@/common/js/common'
import { performanceConfig, getPerformance } from '@/api/task'
export default {
  data() {
    return {
      searchInfo: {
        page: 1,
        type: ''
      },
      loading: {
        tableLoading: false
      },
      showTable: true,
      tableColums: [
        {
          key: 'rank',
          minWidth: 120,
          align: 'center',
          title: this.$t('listModule.performance.rank'),
        },
        {
          title: this.$t('listModule.performance.followerName'),
          key: 'followerName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: this.$t('listModule.performance.principalInterest'),
          key: 'principalInterest',
          minWidth: 120,
          align: 'center',
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.principalInterest))
          }
        },
        {
          title: this.$t('listModule.performance.overdueInterest'),
          key: 'overdueInterest',
          minWidth: 120,
          align: 'center',
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.overdueInterest))
          }
        },
        {
          title: this.$t('listModule.performance.returnSum'),
          key: 'returnSum',
          minWidth: 120,
          align: 'center',
          render: (h, params) => {
            return h('span', null, formatMoney(params.row.returnSum))
          }
        },
        {
          title: this.$t('listModule.performance.performance'),
          key: 'performance',
          minWidth: 120,
          align: 'center'
        }
      ],
      tableData: [],
      pagerData: {
        count: 0,
        pageSize: 10
      },
      stageList: []
    }
  },
  created() {
    this._getPerformanceConfig();
  },
  methods: {

    getPerformanceList(page = 1) {
      this.searchInfo.page = page;
      this.loading.tableLoading = true;
      getPerformance({ query: this.searchInfo },  res => {
        this.loading.tableLoading = false;
        if(+res.status === 0) {
          const data = res.data;
          this.tableData = data.performanceList;
          this.pagerData = data.arrPager;
          this.showTable = true;
        } else {
          this.showTable = false;
        }
      })
    },

    _getPerformanceConfig() {
      performanceConfig(null,  res => {
        if(+res.status === 0) {
          const data = res.data;
          this.stageList = data.config;
          this.searchInfo.type = data.config &&  data.config.length ? +data.config[0].type : ''
          this.searchInfo.type && this.getPerformanceList();
        }
      })
    },

    changeStage(type) {
      this.searchInfo.type = +type
      this.getPerformanceList()
    }
  }
}
</script>
