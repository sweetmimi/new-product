<template>
  <div class="incoming-date-data">
    <Menu mode="horizontal" theme="light" :active-name="activeName">
      <MenuItem
        v-for="item in mytabs"
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
  mytabs=[];
  tabs = [{
    label: this.$t('MaturityiDameter.numberData'),
    link: '/datareport/expireDate/numberdata'
  },
   {
    label: this.$t('MaturityiDameter.amountData'),
    link: '/datareport/expireDate/moneydata'
  }, {
    label: this.$t('MaturityiDameter.earningsData'),
    link: '/datareport/expireDate/profitdata'
  }
  ];
  tabs1 = [{
    label: this.$t('MaturityiDameter.numberData'),
    link: '/datareport/expireDate/numberdata'
  },
   {
    label: this.$t('MaturityiDameter.amountData'),
    link: '/datareport/expireDate/moneydata'
  }
  ]
  handlerRouterChange(path: string) {
    this.activeName = path
    this.$router.push(path)
  }
  created() {
    const role = localStorage.getItem("role") || "";
     if(role ==="role_super_admin"){
       this.mytabs = this.tabs
      }else{
        this.mytabs = this.tabs
      }
    this.activeName = this.$route.fullPath
  }
}
</script>

<style>
.incoming-date-data .incoming-date-data-container{
  padding: 30px;
}
</style>
