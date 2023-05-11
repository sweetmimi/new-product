<template>
  <Modal
    footerHide
    :width="800"
    align="left"
    @on-visible-change="onModalChange"
    class="m-modal"
    :value="modal">
    <div slot="header" class="header">{{$t('approvalTask.downloadModal.modalTitle')}}</div>
    <Table :columns="downloadTableDefine" :loading="downloadLoading" :data="downloadData">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
    <Page
      :total="pageCount"
      :current.sync="currentPageIndex"
      :page-size="size"
      v-if="pageCount > size"
      class-name="m-pagination"
      show-total
      size="small"
      @on-change="handleUpdateTable"
      show-elevator>{{$t('pageSlot.total')}} {{pageCount}} {{$t('pageSlot.count')}}</Page>
  </Modal>
</template>

<script>
import { getDownloadList } from '@/api/user'
export default {
  name: 'downloadCenter',
  props: {
    modal: {
      type: Boolean
    }
  },
  data () {
    return {
      size: 10,
      downloadData: [],
      pageCount: 0,
      currentPageIndex: 1,
      downloadLoading: false,
      downloadTableDefine: [{
        title: this.$t('approvalTask.downloadModal.time'),
        key: 'createTime',
        align: 'center'
      }, {
        title: this.$t('approvalTask.downloadModal.title'),
        key: 'subject',
        align: 'center'
      }, {
        title: this.$t('approvalTask.downloadModal.resultAmount'),
        key: 'cnt',
        align: 'center'
      }, {
        title: this.$t('approvalTask.downloadModal.status'),
        key: 'downloadStatus',
        align: 'center',
        render: (h, params) => {
          return h('span', {
          }, params.row.downloadStatus)
        }
      }, {
        title: this.$t('approvalTask.downloadModal.action'),
        key: 'downloadUrl',
        align: 'center',
        render: (h, params) => {
          return h('Button', {
            props: {
              type: 'text',
              size: 'small',
              icon: 'ios-download-outline',
              disabled:  +params.row.status !== 3
            },
            class: 'fix-table-btn',
            attrs: {
              'href': params.row.downloadUrl,
              'download': params.row.subject
            }}, this.$t('download.download'))
        }
      }]
    }
  },

  methods: {
    fetchDownloadData () {
      this.downloadLoading = true
      this.currentPageIndex = 1
      const payload = {
        page: this.currentPageIndex
      }
      getDownloadList(payload, (res) => {
        this.downloadLoading = false
        if (+res.status === 0) {
          const result = res.data
          this.downloadData = result.data
          this.pageCount = +result.arrPager.count
        }
      })
    },
    onModalChange (status) {
      if (status) {
        this.fetchDownloadData()
      }
      this.$emit('close', status)
    },
    handleUpdateTable (pageIndex) {
      this.currentPageIndex = pageIndex
      this.fetchDownloadData()
    }
  }
}
</script>
