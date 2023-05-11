<template>
  <div class="incoming-date-data">
    <Menu mode="horizontal" theme="light" :active-name="activeName">
      <MenuItem
        v-for="item in tabs"
        :key="item.label"
        :name="item.link"
        @click.native="handlerRouterChange(item.link)"
      >{{item.label}}</MenuItem>
    </Menu>
    <router-view class="incoming-date-data-container"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class ProfitData extends Vue {
  activeName: string | undefined = ''
  tabs = [{
    label: this.$t('dataReport.tableHead.incomelist'),
    link: '/datareport/conversionTable/incomelist'
  },
   {
    label: this.$t('dataReport.tableHead.repaymentlist'),
    link: '/datareport/conversionTable/repaymentlist'
  },
  ]
  handlerRouterChange(path: string) {
    this.activeName = path
    this.$router.push(path)
  }
  created() {
    this.activeName = this.$route.fullPath
  }
}
</script>

<style>
.incoming-date-data .incoming-date-data-container{
  padding: 30px;
}
</style>
