<template>
  <div id="msgRemind" class="m-msgRemind">
    <Table border :columns="columns" :loading="loading" :data="list" v-if="showTable">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
  </div> 
</template>

<script>
import { getMsgList } from '@/api'
export default {
  name: 'msgRemind',
  props: {
    approveId: {
      type: String
    }
  },
  data () {
    return {
      loading: false,
      showTable: true,
      list: [],
      columns: [
        {
          title: this.$t('approvalDetail.msgRemind.dateTime'),
          key: 'sendTime',
          align: 'center'
        },
        {
          title: this.$t('approvalDetail.msgRemind.msgType'),
          key: 'messageType',
          align: 'center'
        },
        {
          title: this.$t('approvalDetail.msgRemind.sender'),
          key: 'sender',
          align: 'center'
        }
      ]
    }
  },

  methods: {
    _getList () {
      this.loading = true
      getMsgList({
        approveId: this.approveId
      }, (res) => {
        if (+res.status === 0) {
          this.loading = false
          this.showTable = true
          this.list = res.data.arrMessage
        } else {
          this.showTable = false
        }
      })
    }
  }
}
</script>

