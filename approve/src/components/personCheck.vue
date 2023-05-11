<!-- zys -->
<template>
  <div class="personCheck">
    <Form ref="formInline" inline :model="searchFormInfo" :label-width="100">
      <FormItem :label="$t('approvalTask.serachBlock.orderNum')">
        <Input clearable v-model="searchFormInfo.orderNo" :placeholder="`${$t('inputPrefix')}${$t(
            'approvalTask.serachBlock.orderNum'
          )}`"></Input>
      </FormItem>

      <FormItem :label="$t('approvalTask.serachBlock.loanType')">
        <Select v-model="searchFormInfo.loanType" clearable>
          <Option
            v-for="item in $t('loanTypes')"
            :key="item.key"
            :value="item.key"
          >{{item.value}}</Option>
        </Select>
      </FormItem>

      <FormItem :label="$t('approvalTask.serachBlock.approveStatus')">
        <Select v-model="searchFormInfo.status" clearable>
          <Option
            v-for="item in $t('approveStatusOp')"
            :key="item.key"
            :value="item.key"
          >{{item.value}}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('approvalTask.serachBlock.timeType')">
        <Select clearable v-if="listSelect.approveList"  transfer v-model="searchFormInfo.timeType" :placeholder="`${$t('selectPrefix')}${$t(
            'approvalTask.serachBlock.timeType'
          )}`">
          <Option v-for="(item, index) in listSelect.approveList.timeType" :value="item.key" :key="index">
            {{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('approvalTask.serachBlock.timeRange')">
        <DatePicker class="m-date-picker" type="daterange" format="yyyy-MM-dd" v-model="initDate"
          @on-change="handleTimeChange" :options="timeLimitConfig" :placeholder="`${$t('selectPrefix')}${$t(
            'approvalTask.serachBlock.timeRange'
          )}`" />
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="searchLoading" @click="searchData()">{{
          $t("approvalTask.serachBlock.search")
        }}</Button>
      </FormItem>
    </Form>

    <div class="card_box">
      <div style="
          border-bottom: 1px solid #e9e9e9;
          padding-bottom: 6px;
          margin-bottom: 6px;
        ">
        <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">
          {{ $t("approvalTask.personCheck.allSelect") }}</Checkbox>
        <span>{{
          `(${$t("approvalTask.personCheck.nowSelect")}${
            checkAllGroup.length
          }${$t("approvalTask.personCheck.orderNum")})`
        }}</span>
        <div style="margin-bottom: 40px" class="bigIcon" @click="isShowBig ? (isShowBig = false) : (isShowBig = true)">
          <Icon v-if="isShowBig" type="md-contract" />
          <Icon v-else type="md-expand" />
        </div>
      </div>

      <CheckboxGroup v-model="checkAllGroup" @on-change="checkGroupChange">
        <div class="main">
          <div :style="{
              width: isShowBig ? '700px' : '500px',
              height: isShowBig ? '350px' : '250px',
            }" class="checkCard" v-for="(item, index) in infoData" :key="index" :class="
              checkAllGroup.indexOf(item.approveId) > -1 ? checkClass : ''
            ">
            <div class="top">
              <div class="left" @click="showbigModal(item)">
                <div class="ocrPic">
                  <img :src="item.imgIdCardFront" alt="" width="100%" />
                </div>
                <div class="peoplePic">
                  <img :src="item.imgFacePhoto" alt="" width="100%" />
                </div>
              </div>
              <div class="right">
                <div class="btn">
                  <Button class="btnWidth" type="success" :disabled="
                      checkAllGroup.indexOf(item.approveId) > -1 ||
                      item.isSelect == 0
                    " @click="submit(item.approveId, 1)">{{ $t("approvalTask.personCheck.pass") }}</Button>
                </div>
                <div class="btn">
                  <Button class="btnWidth" type="error" :disabled="
                      checkAllGroup.indexOf(item.approveId) > -1 ||
                      item.isSelect == 0
                    " @click="submit(item.approveId, 2)">{{ $t("approvalTask.personCheck.Refuse") }}</Button>
                </div>
                <div class="btn">
                  <Button class="btnWidth" type="warning" :disabled="
                      checkAllGroup.indexOf(item.approveId) > -1 ||
                      item.isSelect == 0
                    " @click="submit(item.approveId, 3)">{{ $t("approvalTask.personCheck.cancel") }}</Button>
                </div>
              </div>
            </div>
            <Checkbox :label="item.approveId" :disabled="item.isSelect == 0" class="myCheckbox">
              <span>&nbsp;</span>
              <span class="text">
                <span class="order">Kode Pesanan:
                  <span class="a" @click="goPage(item.approveId)">{{
                    item.orderNo
                  }}</span>
                    <span style="margin-left:30px"
                  :style="item.status == 1 ? 'color:red' : 'color:#000'">{{ item.statusText }}</span>
                  </span>
                <br />
                <p class="name">
                  <span> Nama:</span>
                  <span >{{ item.userName }}</span>
                  <span style="margin-left:100px"> NIK: </span>
                  <span >{{ item.userIdcard }}</span></p>
                <p class="name" style="color:red">
                  Waktu Pengajuan:
                  <span style="margin-right: 10px">{{ item.approveTime }}</span>
                  &nbsp;&nbsp;Jumlah Pendanaan: <span>{{ item.loanTimes }}</span>
                </p>
                <p class="name" v-if="item.reason">
                  <span> Alasan masuk analis: </span>
                  <span >{{ item.reason }}</span>
                </p>
              </span>
            </Checkbox>
          </div>
        </div>
      </CheckboxGroup>
    </div>
    <div class="seeMore">
      <Button type="primary" v-if="pageCount > pageSize" :loading="moreLoading" @click="seeMore()">{{
          `${$t("approvalTask.serachBlock.seeMore")}(${$t(
            "approvalTask.personCheck.allTotal"
          )}${infoData.length}${$t("approvalTask.personCheck.orderNum")}) `
        }}</Button>
      <Button type="primary" disabled v-else :loading="moreLoading">{{
        `${$t("approvalTask.serachBlock.noMore")}(${$t(
          "approvalTask.personCheck.allTotal"
        )}${infoData.length}${$t("approvalTask.personCheck.orderNum")}) `
      }}</Button>
    </div>
    <div class="opration">
      <div class="top">
        <div class="round" :class="checkAllGroup.length > 0 ? checkRound : ''" @click="batchSubmit(1)">
          {{ $t("approvalTask.personCheck.pass") }}
        </div>
      </div>
      <div class="middle">
        <div class="round left" :class="checkAllGroup.length > 0 ? checkRound : ''" @click="batchSubmit(2)">
          {{ $t("approvalTask.personCheck.Refuse") }}
        </div>
        <div class="round right" @click="isRecheckModal()" :class="checkAllGroup.length > 0 ? checkRound : ''">
          {{ checkAllGroup.length }}<br />{{
            $t("approvalTask.personCheck.nowSelect")
          }}
        </div>
      </div>
      <div class="bottom">
        <div class="round" :class="checkAllGroup.length > 0 ? checkRound : ''" @click="batchSubmit(3)">
          {{ $t("approvalTask.personCheck.cancel") }}
        </div>
      </div>
    </div>

    <Modal :title="$t('approvalTask.personCheck.imagesWhatch')" v-model="bigModal" width="70%">
      <div class="bigModalclass">
        <div class="img">
          <div class="left_img">
            <img :style="{ transform: 'rotateZ(' + deg1 + 'deg)' }" :src="bigModalData.imgIdCardFront" alt=""
              width="100%" />
            <img class="refresh" src="@/assets/spin.png" alt="" @click="refresh(1)" />
          </div>
          <div class="right_img">
            <img :style="{ transform: 'rotateZ(' + deg2 + 'deg)' }" :src="bigModalData.imgFacePhoto" alt=""
              width="100%" />
            <img class="refresh" src="@/assets/spin.png" alt="" @click="refresh(2)" />
          </div>
        </div>
        <div class="text">
          <Checkbox :disabled="bigModalData.isSelect == 0" v-model="isbigmodalcheck"
            @on-change="changeisbigmodalcheck(bigModalData.approveId)">
          </Checkbox>
          <span class="text">
            <span class="order" style="margin-left: 8px">
              Kode Pesanan:
              <span class="a" @click="goPage(bigModalData.approveId)">{{
                bigModalData.orderNo
              }}</span></span><span style="margin-left: 75px"
              :style="bigModalData.status == 1 ? 'color:red' : 'color:#000'">{{ bigModalData.statusText }}</span>
            <br />
            <span class="name">Nama:
              <span style="margin-right: 90px">{{
                bigModalData.userName
              }}</span>
              &nbsp;&nbsp;NIK:
              <span>{{ bigModalData.userIdcard }}</span></span>
            <p class="name" style="color:red">
              Waktu Pengajuan:
              <span style="margin-right: 30px">{{
                bigModalData.approveTime
              }}</span>
              &nbsp;&nbsp;Jumlah Pendanaan: <span>{{ bigModalData.loanTimes }}</span>
            </p>
            <p class="name" v-if="bigModalData.reason">
                  <span> Alasan masuk analis: </span>
                  <span >{{ bigModalData.reason }}</span>
                </p>
          </span>
        </div>
      </div>
      <div slot="footer" class="footer">
        <Button align="center" type="success" :disabled="checkAllGroup.length > 0" class="btnWidth"
          @click="submit(bigModalData.approveId, 1)">{{ $t("approvalTask.personCheck.pass") }}</Button>
        <Button align="center" type="error" :disabled="checkAllGroup.length > 0" class="btnWidth"
          @click="submit(bigModalData.approveId, 2)">{{ $t("approvalTask.personCheck.Refuse") }}</Button>
        <Button align="center" type="warning" class="btnWidth" :disabled="checkAllGroup.length > 0"
          @click="submit(bigModalData.approveId, 3)">{{ $t("approvalTask.personCheck.cancel") }}</Button>
      </div>
    </Modal>

    <Modal :title="$t('approvalTask.personCheck.batchChange')" v-model="recheckModal" width="80%" ref="refModalData">
      <CheckboxGroup v-if="checkModalData.length > 0" v-model="modalCheckGroup" @on-change="modalcheckGroupChange">
        <div class="main">
          <div :style="{
              width: '500px',
              height: '250px',
            }" class="checkCard" v-for="(item, index) in checkModalData"
            v-show="!item.hasOwnProperty('isDel') || item.isDel != 1" :key="index">
            <div class="top">
              <div class="left" @click="showbigModal(item)">
                <div class="ocrPic">
                  <img :src="item.imgIdCardFront" alt="" width="100%" />
                </div>
                <div class="peoplePic">
                  <img :src="item.imgFacePhoto" alt="" width="100%" />
                </div>
              </div>
              <div class="right">
                <div class="btn">
                  <Button type="success" class="btnWidth"
                    @click="submit(item.approveId, 1)">{{ $t("approvalTask.personCheck.pass") }}</Button>
                </div>
                <div class="btn">
                  <Button type="error" class="btnWidth"
                    @click="submit(item.approveId, 2)">{{ $t("approvalTask.personCheck.Refuse") }}</Button>
                </div>
                <div class="btn">
                  <Button type="warning" class="btnWidth"
                    @click="submit(item.approveId, 3)">{{ $t("approvalTask.personCheck.cancel") }}</Button>
                </div>
              </div>
            </div>

            <Checkbox :label="item.approveId">
              <span>&nbsp;</span>
            </Checkbox>
            <span class="text">
              <span class="order">Kode Pesanan:
                <span class="a" @click="goPage(item.approveId)">{{
                  item.orderNo
                }}</span></span><span style="margin-left: 20px"
                :style="item.status == 1 ? 'color:red' : 'color:#000'">{{ item.statusText }}</span>
              <br />
              <span class="name">Nama:
                <span style="margin-right: 30px">{{ item.userName }}</span>
                &nbsp;&nbsp;NIK: <span>{{ item.userIdcard }}</span></span>
              <p class="name" style="color:red">
                Waktu Pengajuan:
                <span style="margin-right: 30px">{{ item.approveTime }}</span>
                &nbsp;&nbsp;Jumlah Pendanaan: <span>{{ item.loanTimes }}</span>
              </p>
              <p class="name" v-if="item.reason">
                  <span> Alasan masuk analis: </span>
                  <span >{{ item.reason }}</span>
                </p>
            </span>
          </div>
        </div>
      </CheckboxGroup>
      <div v-else style="font-size: 30px; text-align: center">
        {{ $t("approvalTask.personCheck.noOrder") }}
      </div>
      <div slot="footer" class="footer">
        <div class="checkBox">
          <Checkbox :disabled="!modalCheckGroup.length > 0" :indeterminate="modalindeterminate" :value="modalcheckAll"
            @click.prevent.native="handlemodalCheckAll">{{ $t("approvalTask.personCheck.allSelect") }}</Checkbox>
          <span>{{
            `(${$t("approvalTask.personCheck.allTotal")}${
              modalCheckGroup.length
            }${$t("approvalTask.personCheck.orderNum")})`
          }}</span>
        </div>
        <Button align="center" type="success" :disabled="!modalCheckGroup.length > 0"
          @click="submit(modalCheckGroup, 1)">{{ $t("approvalTask.personCheck.allPass") }}</Button>
        <Button align="center" type="error" :disabled="!modalCheckGroup.length > 0"
          @click="submit(modalCheckGroup, 2)">{{ $t("approvalTask.personCheck.allRefuse") }}</Button>
        <Button align="center" type="warning" :disabled="!modalCheckGroup.length > 0"
          @click="submit(modalCheckGroup, 3)">{{ $t("approvalTask.personCheck.allCancel") }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import {
    manualapprovelist,
    commitapproveconclusion
  } from "@/api/approval";
  export default {
    name: "",
    components: {},

    data() {
      return {
        indeterminate: false,
        searchLoading: false,
        moreLoading: false,
        subLoading: true,
        isShowBig: false,
        recheckModal: false,
        bigModal: false,
        checkAll: false,
        modalindeterminate: false,
        modalcheckAll: true,
        checkClass: "checkClass",
        checkRound: "checkRound",
        deg1: 0,
        deg2: 0,
        isbigmodalcheck: false,
        bigModalData: {
          picArray: [],
        },
        checkModalData: [],
        infoData: [],
        modalCheckGroup: [],
        checkAllGroup: [],
        initDate: [],
        pageCount: null,
        pageSize: 10,
        searchFormInfo: {
          page: 1,
          pageSize: 10,
          loanType:0,
          status:1,
          startTime: "",
          endTime: "",
          orderNo: "",
          timeType: "",
        },
        timeLimitConfig: {
          disabledDate(date) {
            let nowData = new Date();
            return date > nowData;
          },
        },
      };
    },

    async created() {
      this.searchData();
    },

    computed: {
      ...mapGetters(["listSelect", "userInfo"]),
    },

    mounted() {},

    methods: {
      handleTimeChange(date) {
        this.searchFormInfo.startTime = date[0];
        this.searchFormInfo.endTime = date[1];
      },
      searchData() {
        this.searchLoading = true;
        this.pageSize = 10;
        this.infoData = [];
        manualapprovelist(this.searchFormInfo, (res) => {
          this.searchLoading = false;
          this.infoData = res.data.manualApproveList;
          this.pageCount = Number(res.data.arrPager.count);
        });
      },
      seeMore() {
        this.moreLoading = true;
        this.searchFormInfo.page++;
        this.pageSize = Number(this.searchFormInfo.page) * 10;
        manualapprovelist(this.searchFormInfo, (res) => {
          this.checkAll = false;

          this.indeterminate = true;
          this.moreLoading = false;
          this.infoData = this.infoData.concat(res.data.manualApproveList);
          this.pageCount = Number(res.data.arrPager.count);
        });
      },
      goPage(approveId) {
        window.open(`/approval/detail/check_${approveId}?isRecheck=0`);
      },
      submitData(approveIds, type) {

        commitapproveconclusion({
            approveIds: approveIds,
            conclusion: type,
          },
          (res) => {
            if (res.status == 0) {
              this.subLoading = false;
              this.$Modal.remove();
              this.recheckModal = false;
              this.indeterminate = false;
              this.bigModal = false;
              this.checkModalData = [];
              this.checkAllGroup = [];
              this.searchData();


              this.$Message.info({
                render: (h) => {
                  return h("div", {}, [
                    h(
                      "p", {
                        style: {
                          color: "#87C23A",
                        },
                      },
                      res.data.successApproveIds.length > 0 ?
                      `${$t("approvalTask.personCheck.success")}: ${
                          res.data.successApproveIds.length
                        }${$t("approvalTask.personCheck.num")}` :
                      ""
                    ),
                    h(
                      "p", {
                        style: {
                          color: "#F56C6C",
                        },
                      },
                      res.data.errorApproveIds.length > 0 ?
                      `${$t("approvalTask.personCheck.failed")}: ${
                          res.data.errorApproveIds.length
                        }${$t("approvalTask.personCheck.num")}` :
                      ""
                    ),
                  ]);
                },
              });
            } else {
              this.subLoading = false;
              this.$Modal.remove();
              this.$Message.error(res.msg);
            }
          }
        );
      },
      submit(approveId, type) {
        this.subType = 1;
        var title = "";
        if (type == 1) {
          title = this.$t("approvalTask.personCheck.pass");
        }
        if (type == 2) {
          title = this.$t("approvalTask.personCheck.Refuse");
        }
        if (type == 3) {
          title = this.$t("approvalTask.personCheck.cancel");
        }

        var approveIds = [];
        console.log(typeof approveId);
        if (typeof approveId == "string") {
          approveIds = approveId.split(",");
        } else {
          approveIds = approveId;
        }
        this.$Modal.confirm({
          title: `${title}?`,

          loading: this.subLoading,
          onOk: () => {
            this.submitData(approveIds, type);
          },
        });
      },

      batchSubmit(type) {
        if (!this.checkAllGroup.length > 0) {
          this.$Message.info(
            this.$t("approvalTask.personCheck.pleaseChooseOrder")
          );
          return;
        }
        if(this.checkAllGroup.length > 30) {
          this.$Message.info(
            this.$t("approvalTask.personCheck.passOrderLimit30")
          );
          return;
        }
        this.subType = 2;
        var title = "";
        if (type == 1) {
          title = this.$t("approvalTask.personCheck.pass");
        }
        if (type == 2) {
          title = this.$t("approvalTask.personCheck.Refuse");
        }
        if (type == 3) {
          title = this.$t("approvalTask.personCheck.cancel");
        }

        this.$Modal.confirm({
          title: `${title}?`,
          onOk: () => {
            this.submitData(this.checkAllGroup, type);
          },
        });
      },
      isRecheckModal() {
        this.subType = 2;
        this.modalcheckAll = true;
        this.recheckModal = true;
        this.checkModalData = [];
        this.modalCheckGroup = [];
        this.infoData.forEach((item, index) => {
          if (this.checkAllGroup.indexOf(item.approveId) > -1) {
            this.modalCheckGroup.push(item.approveId);
            item.isDel = 0;
            this.checkModalData.push(item);
          }
        });
        console.log(this.checkModalData);
      },
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          // this.indeterminate = true;
          for(var i=0;i<this.infoData.length;i++ ){
            if(this.infoData[i].isSelect ==1){
              if(i>29){
               this.$Message.error(this.$t("approvalTask.personCheck.passOrderLimit30"))
               break;
              }else{
                 this.checkAllGroup.push(this.infoData[i].approveId);
              }
            }
          }


        } else {
          this.checkAllGroup = [];
        }
      },
      checkGroupChange(data) {
        // console.log(this.checkAllGroup);
        // console.log(data.length);
        // console.log(this.infoData.length);
        if (data.length === this.infoData.length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
        console.log(this.checkAllGroup);
      },
      modalcheckGroupChange(data) {
        // console.log(this.checkAllGroup);
        this.modalCheckGroup = data;
        this.checkAllGroup = data;

        this.checkModalData.forEach((item, index) => {
          if (data.indexOf(item.approveId) > -1) {
            // console.log(item);
            //tmp.push(item);
          } else {
            this.checkModalData[index].isDel = 1;
          }
        });
        // this.checkModalData = tmp;
        this.$refs.refModalData.$forceUpdate();
        // console.log(this.checkModalData);
      },
      handlemodalCheckAll() {
        this.$Modal.confirm({
          title: this.$t("approvalTask.personCheck.isAllCancel"),
          onOk: () => {
            this.modalindeterminate = false;
            this.modalcheckAll = false;
            this.checkAll = false;
            this.indeterminate = false;
            this.checkAllGroup = [];
            this.modalCheckGroup = [];
            this.checkModalData = [];
          },
        });
      },

      showbigModal(row) {
        this.deg1 = 0;
        this.deg2 = 0;
        if(row.isSelect==0){
          return this.$Message.error(this.$t("approvalTask.personCheck.passOrder"))
        }
        this.bigModal = true;
         this.bigModalData = row;
        if (this.checkAllGroup.indexOf(row.approveId) > -1) {
          this.isbigmodalcheck = true;
        } else {
          this.isbigmodalcheck = false;
        }
      },
      changeisbigmodalcheck(approveId) {
        if (this.isbigmodalcheck) {
          console.log(approveId);
          this.checkAllGroup.push(approveId);
        } else {
          Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
              this.splice(index, 1);
            }
          };

          this.checkAllGroup.remove(approveId);
        }
      },

      refresh(type) {
        if (type == 1) {
          this.deg1 -= 90;
          if (this.deg1 <= -360) {
            this.deg1 = 0;
          }
        } else {
          this.deg2 -= 90;
          if (this.deg2 <= -360) {
            this.deg2 = 0;
          }
        }
      },

      checkbigModalData(row) {},
    },
  };

</script>
<style lang='scss' scoped>
  .btnWidth {
    width: 70px !important;
  }

  .myCheckbox {
    width: 100% !important;
    height: 73px !important;
  }

  .checkClass {
    background: rgb(243, 243, 243);
  }

  .checkRound {
    background: #5cadff !important;
  }

  .footer {
    .checkBox {
      text-align: left;
    }
  }

  .bigIcon {
    float: right;
    cursor: pointer;
    font-size: 30px;
    color: #5cadff;

    i {
      margin-bottom: 80px;
    }
  }

  .bigIcon:hover {
    color: #298ff5;
  }

  .main {
    margin-bottom: 30px;
    display: flex;
    display: -webkit-flex;
    /* Safari */
    justify-content: center;
    flex-direction: row;

    flex-wrap: wrap;

    .checkCard {
      box-sizing: border-box;
      width: 600px;
      height: 220px;
      margin: 20px 20px 20px 0;
      padding: 8px;
      border-radius: 5px;
    }

    .top {
      width: 100%;
      height: 70%;
      margin-bottom: 10px;
      display: flex;
      display: -webkit-flex;

      /* Safari */
      .left {
        height: 100%;
        width: 85%;
        display: flex;
        margin-right: 10px;
        display: -webkit-flex;

        /* Safari */
        .ocrPic {
          width: 65%;
          height: 100%;
          margin-right: 20px;
          cursor: zoom-in;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .peoplePic {
          width: 35%;
          height: 100%;
          cursor: zoom-in;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .right {
        height: 100%;
        width: 15%;
        box-sizing: border-box;
        flex-flow: column;
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        text-align: center;

        .btn {}
      }
    }

    .text {
      color: #000;

      .order {
        width: 600px;
        height: 50px;

        .a {
          cursor: pointer;
          color: blue;
          text-decoration: underline;
        }

        .a:hover {
          color: #ccc;
        }
      }

      .name {
        margin-left: 30px;
      }
    }
  }

  .opration {
    position: fixed;
    right: 50px;
    bottom: 20px;
    width: 180px;
    height: 180px;

    .top,
    .bottom {
      width: 100%;
      height: 33%;

      .round {
        text-align: center;
        line-height: 60px;
        cursor: pointer;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #ccc;
        color: #fff;
        margin: 0 auto;
      }
    }

    .middle {
      width: 100%;
      height: 33%;

      .round {
        cursor: pointer;
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-radius: 50%;
        background: #ccc;
        color: #fff;
        margin: 0 auto;
      }

      .right {
        padding-top: 10px;
        line-height: 20px;
        width: 60px;
        height: 60px;
      }
    }
  }

  .seeMore {
    text-align: center;
    height: 60px;
    margin-bottom: 20px;
  }

  .bigModalclass {
    .img {
      height: 500px;
      width: 100%;

      .left_img {
        position: relative;
        float: left;
        height: 100%;
        width: 55%;
        margin-right: 5%;

        img {
          width: 100%;
          height: 100%;
        }

        .refresh {
          width: 40px;
          height: 40px;
          cursor: pointer;
          position: absolute;
          right: 8px;
          top: 5px;
        }
      }

      .right_img {
        float: right;
        position: relative;
        height: 100%;
        width: 40%;

        img {
          width: 100%;
          height: 100%;
        }

        .refresh {
          width: 40px;
          height: 40px;
          cursor: pointer;
          position: absolute;
          right: 8px;
          top: 5px;
        }
      }
    }

    .text {
      color: #000;

      .order {
        .a {
          cursor: pointer;
          color: blue;
          text-decoration: underline;
        }

        .a:hover {
          color: #ccc;
        }
      }

      .name {
        margin-left: 35px;
      }
    }
  }

</style>
