<template>
  <div id="resultHistory" class="m-resultHistory">
    <div class="box" v-if="showTable"> 
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.approvalConclusionHistory.examiner') }}</Col>
        <Col span="18" class-name="col-style">{{resultHistory.userName}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.approvalConclusionHistory.approvalTime') }}</Col>
        <Col span="18" class-name="col-style">{{resultHistory.submitTime}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.approvalConclusionHistory.approvalConclusion') }}</Col>
        <Col span="18" 
        class-name="col-style">
          {{resultHistory.resultDesc}}
        </Col>
      </Row>
      <Row align="middle" v-if="+resultHistory.result === 2">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.approvalConclusionHistory.refusalReason.title') }}</Col>
        <Col span="18" class-name="col-style">{{resultHistory.rejectReson.join('、')}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.approvalConclusionHistory.remarks') }}</Col>
        <Col span="18" class-name="col-style">{{resultHistory.memo}}</Col>
      </Row>
    </div>
  </div> 
</template>

<script>
import { getConclusionHistory} from '@/api/task'
export default {
  name: 'resultHistory',
  props: {
    cuishouId: {
      type: String
    },
     phoneRecords: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      showTable: true,
      resultHistory: {}
    }
  },

  methods: {
    _getResultHistory () {

     
      let  data = { cuishouId: this.cuishouId}
      console.log(data,1111)
     getConclusionHistory({
        cuishouId: this.cuishouId
      }, (res) => {
        if (+res.status === 0) {
          console.log(res,666)
          this.resultHistory = res.data.conclusion
          let result = this.$t('approvalDetail.result.rejectReson')
          if (+this.resultHistory.result === 2) {
            this.resultHistory.rejectReson = []
            this.resultHistory.reject.forEach((ritem, ind) => {
              result.forEach((item, index) => {
                item.value.forEach((citem) => {
                  if (+citem.id === +ritem) {
                    this.resultHistory.rejectReson.push(citem.label)
                  }
                })
              })
            })
          }
          switch(+this.resultHistory.result) {
            case 1:
              this.resultHistory.resultDesc = this.$t('approvalDetail.approvalConclusionHistory.resultExamination')
            break;
            case 2:
              this.resultHistory.resultDesc = this.$t('approvalDetail.approvalConclusionHistory.resultRefusal')
              this.resultHistory.rejectReson = []
              this.resultHistory.reject.map((ritem, ind) => {
                result.map((item, index) => {
                  item.value.map((citem) => {
                    if (+citem.id === +ritem) {
                      this.resultHistory.rejectReson.push(citem.label)
                    }
                  })
                })
              })
            break;
            case 3:
              this.resultHistory.resultDesc = this.$t('approvalDetail.approvalConclusionHistory.resultCancel')
            break;
            default:
              this.resultHistory.resultDesc = ''
            break;
          }
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.m-resultHistory {
  .box {
    border-left: 1px solid #e9eaec;
    border-top: 1px solid #e9eaec;
    .col-style {
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #e9eaec;
      border-bottom: 1px solid #e9eaec;
      padding-left: 20px;
      &.title {
        padding-left: 0;
        text-align: center;
        color: #495060;
        font-weight: bold;
        background-color: #f8f8f9;
      }
    }
  }
}
</style>

