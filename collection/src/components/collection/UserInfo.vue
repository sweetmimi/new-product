<template>
  <div id="userInfo" class="m-userInfo">
    <div class="tab-warp" v-if="showTable">
      <Row align="middle">
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.userName') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.userName}}</Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.idCard') }}</Col>
        <Col span="4" class-name="col-style" v-if="baseInfo.userIdNumber">{{baseInfo.userIdNumber}}</Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.sex') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.sex}}</Col>
      </Row>
      <Row align="middle">
        <!-- <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.homeplace') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.birthPlace}}</Col>-->
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.presentAddress') }}</Col>
        <Col span="4" class-name="col-style loanRemark">
          <Poptip
            trigger="hover"
            :content="baseInfo.address"
            placement="top-start"
          >{{baseInfo.address}}</Poptip>
        </Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.age') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.age}}</Col>

        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.jobType') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.workType}}</Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.loanUse') }}</Col>
        <Col span="4" class-name="col-style loanRemark">
          <Poptip
            trigger="hover"
            :content="baseInfo.loanRemark"
            placement="top-start"
          >{{baseInfo.loanRemark}}</Poptip>
        </Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.maritalStatus') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.maritalStatus}}</Col>
        <!-- <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.religion') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.religion}}</Col> -->
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.eduStatus') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.education}}</Col>

        <!-- <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.companyName') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.corporateName}}</Col> -->
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.monthIncome') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.monthIncome | moneyFormat}}</Col>
        <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.loanCount') }}</Col>
        <Col span="4" class-name="col-style">{{baseInfo.loanCount}}</Col>
        <!-- <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.ocrImage') }}</Col>

        <Col span="4" class-name="col-style">
          <a>
            <img
              :src="baseInfo.ocrPic"
              style="width: 60px;height: 30px;margin-top: 5px"
              @click="_handleView(baseInfo.ocrPic)"
              oncontextmenu="return false;"
            >
          </a>
        </Col> -->
        <!-- <Col span="4" class-name="col-style title">{{ $t('taskDetail.baseInfo.livingPhoto') }}</Col>
        <Col span="4" class-name="col-style">

           <a>
            <img
              :src="Url"
              style="width: 60px;height: 30px;margin-top: 5px"
              @click="_handleView(Url)"
              oncontextmenu="return false;"
            >
          </a>
        </Col> -->
      </Row>
    </div>

    <Modal

      v-model="visible"
      class-name="fl-image-modal"
      :footer-hide='false'
    >
      <img :src="imgUrl" style="width: 100%" oncontextmenu="return false;">
    </Modal>

  </div>
</template>
<script>
import { getBaseInfo } from "@/api";
export default {
  name: "userInfo",
  props: {
    cuishouId: {
      type: String
    }
  },
  data() {
    return {
      baseInfo: {},
      showTable: true,
      imgUrl: "",
      visible: false,
      kaiguan:false,
      tupians:'',
      livingPhoto:[],
      Url:''
    };
  },

  mounted() {
    this._getInfo();
  },

  methods: {
    _getInfo() {
      getBaseInfo(
        {
          cuishouId: this.cuishouId
        },
        res => {
          if (+res.status == 0) {

            this.baseInfo = res.data;
            this.Url =  res.data.facephotoPic[0]

            console.log(this.Url,8888)
            this.showTable = true;
          } else {
            this.showTable = false;
          }
        }
      );
    },
    //COR
    _handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },

    _Livingphoto(url){
      console.log(url,777)
      this.tupians =url

      this.kaiguan = true;

    }
  }
};
</script>
<style lang="scss" scoped>
.m-userInfo {
  padding-top: 10px;
  .loanRemark {
    white-space: nowrap;
    .ivu-poptip {
      width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
