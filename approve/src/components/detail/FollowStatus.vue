<template>
  <div id="followStatus" class="m-followStatus">
    <Form :label-width="150" v-if="pageType !== 'view'">
      <Row type="flex">
          <FormItem :label="$t('approvalDetail.followUpStatus.approvalFollowUpStatus')">
            <RadioGroup v-model="midStatus" v-if="listSelect.midStatusList">
              <Radio class="radio" :label="item.key"  v-for="(item, index) in listSelect.midStatusList.midStatus" :key="index">{{item.value}}</Radio>
            </RadioGroup>
            <Button type="success" @click="saveStatus" :loading="saveLoading" style="margin-left:10px;">{{$t('approvalDetail.approvalConclusionHistory.save')}}</Button>
          </FormItem>
      </Row>
    </Form>
    <Table ref="currentRowTable" border :loading="loading" :columns="columns" :data="list" v-if="showTable">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="load-c" size=18 class="spin-icon"></Icon>
        <div>{{$t('loadingText')}}</div>
      </Spin>
    </Table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMidStatusList, saveMidStatus } from '@/api'
export default {
  name: 'followStatus',
  props: {
    approveId: {
      type: String
    },
    pageType: {
      type: String
    }
  },
  data () {
    return {
      loading: false,
      showTable: true,
      saveLoading: false,
      midStatus: '',
      list: [],
      columns: [
        {
          title: this.$t('approvalDetail.followUpStatus.dateTime'),
          key: 'time',
          align: 'center'
        },
        {
          title: this.$t('approvalDetail.followUpStatus.afterStatus'),
          key: 'midStatus',
          align: 'center'
        },
        {
          title: this.$t('approvalDetail.followUpStatus.operator'),
          key: 'checkUser',
          align: 'center'
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['listSelect'])
  },

  methods: {
    _getList () {
      this.loading = true
      getMidStatusList({
        approveId: this.approveId
      }, (res) => {
        if (+res.status === 0) {
          this.loading = false
          this.list = res.data.arrMidStatus
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    },

    saveStatus () {
      if (!this.midStatus) {
        this.$Message.error(this.$t('approvalDetail.msgList.followStatus'))
        return
      }
      this.saveLoading = true;
      saveMidStatus({
        approveId: this.approveId,
        midStatus: this.midStatus
      }, (res) => {
        this.saveLoading = false;
        switch (+res.status) {
          case 0:
            this.$Message.success(this.$t('approvalDetail.msgList.saveSuccess'))
            this.$router.push({name: 'tasklist'})
          break;
          case 10001:
            const content = `<p>${this.$t('approvalDetail.msgList.changeOrder')}</p>`
            this.$Modal.warning({
              content: content,
              onOk: () => {
                this.$router.push({name: 'tasklist'})
              }
            })
          break;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.m-followStatus {
  .warning-text {
    margin-left: 15px;
    font-size: 14px;
    vertical-align: super;
  }
}
.footer {
  text-align: center;
  button {
    margin: 0 20px;
  }
}
</style>
