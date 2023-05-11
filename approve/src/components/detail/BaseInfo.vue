
<template>

  <div id="baseInfo" class="m-baseInfo" v-if="showTable">
    <!--  -->
    <div class="tag-warp">
      <Tag
        v-for="(item, index) in baseInfo"
        v-show="item.status==1 && isRecheck!=1 "
        type="border"
        :key="index"
        :color="item.color"
        class="tag"
        :style="item.style"
        @click.native="toView(item)"
      >{{item.title}}</Tag>
      <!-- <Button
      v-if="isRecheck!=1"
      size="small"
        class="export-btn"
        icon="ios-download-outline"
        type="success"
        @click="handleExpertData"
      >{{$t('approvalTask.serachBlock.exportSms')}}</Button> -->
    </div>

    <div class="box" v-if="type === 'orderInfo'">
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.orderNo') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.orderNo}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.applyTime') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.applyTime}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.channel') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.channel}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.appName') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.appName}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.applyTerm') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.applyTerm}}</Col>
      </Row>
      <!-- <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.applyAmount') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.applyAmount | moneyFormat}}</Col>
      </Row> -->
      <Row align="middle">
        <Col
          span="6"
          class-name="col-style title"
        >Jumlah Pendanaan</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.accountAmount | moneyFormat}}</Col>
      </Row>
      <!-- <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.oneTimeFee') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.oneTimeFee | moneyFormat}}</Col>
      </Row> -->
       <Row align="middle" v-if="lender!=1">
        <Col span="6" class-name="col-style title">Biaya Teknis </Col>
        <Col span="18" class-name="col-style">{{orderInfoList.Biaya}}</Col>
      </Row>
       <Row align="middle">
        <Col span="6" class-name="col-style title">Biaya Penagihan</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.Bunga}}</Col>
      </Row>
       <Row align="middle"  v-if="lender==1">
        <Col span="6" class-name="col-style title">
          {{ $t('approvalDetail.orderInfo.creditScore') }}
           <Tooltip  placement="right-end" >
            <Icon type="ios-help-circle" style="font-size:25px;margin-left:-60px"></Icon>
            <div slot="content" style="width:800px">
          <p>Nilai Kredit : (rentang 300 - 850), semakin tinggi nilainya semakin rendah resiko.</p>
        </div>
    </Tooltip>
        </Col>
        <Col span="18" class-name="col-style">{{orderInfoList.modelandSouce }}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.repayAmount') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.repayAmount | moneyFormat}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">Jatuh Tempo</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.repayTime}}</Col>
      </Row>
      <!-- <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.loanUse') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.loanUse}}</Col>
      </Row> -->
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.orderInfo.approveType') }}</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.approveType}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">Pinjaman Ke-</Col>
        <Col span="18" class-name="col-style">{{orderInfoList.loanNum}}</Col>
      </Row>
    </div>

    <div class="box" v-if="type === 'baseInfo'">
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.uid') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.uid}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.name') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.name}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.gender') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.gender}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.mobile') }}</Col>
        <Col span="18" class-name="col-style">
                <span v-if="baseInfoList.mobile">
                  <span
                    v-for="(item, index) in baseInfoList.unshowphone"
                    :key="index"
                  >
                    <span>{{ item }}</span>

                    <Icon
                      type="ios-call"
                      class="call"
                      @click="callphone(baseInfoList.showphone[index])"
                    ></Icon>
                  </span>
              </span>
        </Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.birthday') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.birthday}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.idcard') }}</Col>
        <Col span="18" class-name="col-style">
        {{baseInfoList.idCard.replace(baseInfoList.idCard.substr(3, 9),"****" )}}</Col>
      </Row>
      <!-- <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.ocrName') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.ocrName}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.ocrCardNo') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.ocrIdCard}}</Col>
      </Row> -->
       <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.faceThan') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.faceCheckSt}}</Col>
      </Row>
      <!-- <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.ocrArea') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.ocrAddress}}</Col>
      </Row> -->
      <!-- <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.ocrResult') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.authentication}}</Col>
      </Row> -->
      <!-- <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.homeAddress') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.homeAddress}}</Col>
      </Row> -->
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.maritalStatus') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.maritalStatus}}</Col>
      </Row>
      <Row align="middle" v-if="baseInfoList.religion">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.religion') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.religion}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.userType') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.userType}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.jobType') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.jobType}}</Col>
      </Row>
      <!-- <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.companyName') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.companyName}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.companyPhone') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.companyPhone}}</Col>
      </Row> -->
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.salary') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.salary | moneyFormat}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.bankName') }}</Col>
        <Col span="18" class-name="col-style">{{baseInfoList.bankName}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.bankCardID') }}</Col>
        <Col span="18" class-name="col-style">
        {{baseInfoList.bankCardID.replace(baseInfoList.bankCardID.substr(3, 5),"****" )}}
        </Col>
      </Row>
      <Row align="middle" v-for="(item, index) in baseInfoList.emergs" :key="index">
        <Col span="6" class-name="col-style title">
          {{ $t('approvalDetail.baseInfo.contractPerson')}}
          {{index === 0 ? "A" : 'B'}}
        </Col>
        <Col span="18" class-name="col-style">
          <span>
            {{$t('listModule.userInfoList.name')}} : {{item.emergsName}},
            {{$t('approvalDetail.baseInfo.relationship')}} : {{item.emergsRelation}},
            {{$t('approvalDetail.baseInfo.mobile')}} :
             {{
                    item.emergsPhone.replace(
                      item.emergsPhone.substr(3, 4),
                      "****"
                    )
                  }}
                  <Icon
                    type="ios-call"
                    class="call"
                    @click="callphone(item.emergsPhone)"
                  ></Icon>
                  <!-- <Icon
                    type="md-create"
                    class="create"
                    @click="editContact(index)"
                  ></Icon> -->
                  <Icon
                     v-if="delEmergsSwitch"
                    type="md-trash"
                    class="delete"
                    @click="deletePhone(item)"
                  ></Icon>
          </span>
        </Col>
      </Row>
      <!-- <Row align="middle" v-if="+baseInfoList.ocrAreaCheck === 2">
        <Col span="6" class-name="col-style title error">{{ $t('approvalDetail.baseInfo.error') }}</Col>
        <Col span="18" class-name="col-style error">{{$t('approvalDetail.baseInfo.errorMsg')}}</Col>
      </Row> -->
    </div>

    <div class="associated-order" v-if="type === 'pic' && livingPhotos.length">
      <Carousel loop radius-dot>
        <CarouselItem v-for="(item, index) in livingPhotos" :key="index">
          <div class="demo-carousel">
            <img class="living-photo" :src="item">
          </div>
        </CarouselItem>
      </Carousel>
    </div>

    <div class="associated-order" v-if="type === 'associatedOrder' && associatedOrderInfo.length">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr class="hd">
          <td width="10%">{{$t("approvalDetail.associatedOrderInfo.type")}}</td>
          <td width="20%">{{$t("approvalDetail.associatedOrderInfo.info")}}</td>
          <td width="20%">{{$t("approvalDetail.associatedOrderInfo.associatedOrder")}}</td>
          <td width="20%">{{$t("approvalDetail.associatedOrderInfo.applyTime")}}</td>
          <td width="20%">{{$t("approvalDetail.associatedOrderInfo.orderStuas")}}</td>
        </tr>
        <tr v-for="(item, index) in associatedOrderInfo" :key="index">
          <td>{{item.title}}</td>
          <td colspan="4">
            <tr class="order-list" v-for="(info, k) in item.list" :key="k">
              <td>{{info.currentOrderInfo}}</td>
              <td @click="jumpUrl(info.approveId)" class="link">{{info.relateOrderInfo}}</td>
              <td>{{info.relateOrderCtime}}</td>
              <td>{{info.rejectInfo}}</td>
            </tr>
          </td>
        </tr>
      </table>
    </div>

    <div v-if="type === 'contactRecord'">
      <i-table border :columns="contactRecordTitle" :data="contactRecord"></i-table>
      <Page
        :total="contactTotalSize"
        :page-size="size"
        :current="contactPageCount"
        v-if="contactTotalSize >= size"
        class-name="m-pagination"
        show-total
        @on-change="handleUpdateContactsTable"
        show-elevator
      >{{$t('pageSlot.total')}} {{contactTotalSize}} {{$t('pageSlot.count')}}</Page>
    </div>
    <dir v-if="type === 'callRecord'">
      <i-table border :columns="callRecordTitle" :data="callRecord"></i-table>
      <Page
        :total="callTotalSize"
        :page-size="size"
        :current="callPageCount"
        v-if="callTotalSize >= size"
        class-name="m-pagination"
        show-total
        @on-change="handleUpdateCallTable"
        show-elevator
      >{{$t('pageSlot.total')}} {{callTotalSize}} {{$t('pageSlot.count')}}</Page>
    </dir>
    <dir v-if="type === 'smsRecord'">
      <i-table border :columns="smsRecordTitle" :data="smsRecord"></i-table>
      <Page
        :total="smsTotalSize"
        :page-size="size"
        :current="smsPageCount"
        v-if="smsTotalSize >= size"
        class-name="m-pagination"
        show-total
        @on-change="handleUpdateSmsTable"
        show-elevator
      >{{$t('pageSlot.total')}} {{smsTotalSize}} {{$t('pageSlot.count')}}</Page>
    </dir>
     <div class="box" v-if="type === 'businessInfo'">
        <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.businessUid') }}</Col>
        <Col span="18" class-name="col-style">{{businessInfo.uid}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.businessName') }}</Col>
        <Col span="18" class-name="col-style">{{businessInfo.businessName}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.businessOwner') }}</Col>
        <Col span="18" class-name="col-style">{{businessInfo.businessOwner}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.businessType') }}</Col>
        <Col span="18" class-name="col-style">{{businessInfo.businessType}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.businessPhone') }}</Col>
        <Col span="18" class-name="col-style">{{businessInfo.businessPhone}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.businessAddress') }}</Col>
        <Col span="18" class-name="col-style">{{businessInfo.businessAddress}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.businessIncome') }}</Col>
        <Col span="18" class-name="col-style">{{businessInfo.businessIncome}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">{{ $t('approvalDetail.baseInfo.businessCreateTime') }}</Col>
        <Col span="18" class-name="col-style">{{businessInfo.businessCreateTime}}</Col>
      </Row>

    </div>
     <div class="box" v-if="type === 'scoreInfo'">
        <Row align="middle">
        <Col span="6" class-name="col-style title">Nilai kredit (Skor Total)</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.nilai_kredit}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">Rata-rata Skor - FDC</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.avg_kualitas}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">Total Pinjaman - FDC</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.pinjaman_num}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">DPD Max - FDC</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.dpd_max}}</Col>
      </Row>
      <Row align="middle">
        <Col span="6" class-name="col-style title">Nilai Skor - Pefindo</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.pefindo_score}}</Col>
      </Row>
       <Row align="middle">
        <Col span="6" class-name="col-style title">Skor Internal</Col>
        <Col span="18" class-name="col-style">{{scoreInfo.internal_score}}</Col>
      </Row>
      <div class="card_tip">
      <p><strong>Catatan:</strong> </p>
      <p>Nilai Kredit (Skor Total): (rentang 300 - 850), semakin tinggi semakin rendah resiko</p>
      <p>Rata-rata Skor FDC= Angka semakin kecil semakin baik.</p>
      <p>Total Pinjaman - FDC = Jumlah pinjaman yang tercatat di FDC</p>
      <p>DPD Max - FDC = Jumlah keterlambatan hari maksmimal di FDC. Semakin kecil semakin baik.</p>
      <p>Nilai Skor Pefindo = (Rentang 250 - 900), semakin tinggi semakin rendah resiko. </p>
      <p>Skor Internal = (Rentang 100 - 500) Semakin tinggi semakin rendah resiko.</p>
    </div>
    </div>

    <div
      class="no-data"
      v-if="noData && type === 'associatedOrder'"
    >{{$t('approvalDetail.associatedOrderInfo.noData')}}</div>
     <Modal
      v-model="contactModal"
      :title="$t('approvalDetail.baseInfo.contactInfo.title')" >
       <Form ref="contactInfo" :model="contactInfo" :label-width="110" :rules="ruleValidate">

        <FormItem :label="$t('approvalDetail.baseInfo.contactInfo.name')"  prop="name">
          <Input
            v-model="contactInfo.name"
            :placeholder="`${$t('inputPrefix')}${$t('approvalDetail.baseInfo.contactInfo.name')}`"
          ></Input>
        </FormItem>
         <FormItem :label="$t('approvalDetail.baseInfo.contactInfo.relation')"  prop="relation">
          <Select v-model="contactInfo.relation" :placeholder="`${$t('selectPrefix')}${$t('approvalDetail.baseInfo.contactInfo.relation')}`">
                <Option :value="item.key" v-for="(item,index) in relationsList " :key="index">{{item.lable}}</Option>
            </Select>
        </FormItem>
         <FormItem :label="$t('approvalDetail.baseInfo.contactInfo.phone')"  prop="phone">
          <Input

          type="password"
            v-model="contactInfo.phone"
            :placeholder="`${$t('inputPrefix')}${$t('approvalDetail.baseInfo.contactInfo.phone')}`"
          ></Input>
        </FormItem>
        </Form>
      <div slot="footer">
        <!-- <Button type="success" :loading="contactUpdateLoading" @click="contactUpdate('contactInfo')">{{ $t('approvalDetail.baseInfo.contactInfo.update') }}</Button> -->
        <Button type="warning" :loading="contactDeleteLoading" @click="contactDelete('contactInfo')">{{ $t('approvalDetail.baseInfo.contactInfo.delete') }}</Button>
        <Button  @click="contactCancel('contactInfo')">{{ $t('approvalDetail.baseInfo.contactInfo.cancel') }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { formatMoney } from "@/common/js/common";
import { getBaseInfo, getAssociatedOrder ,dialCall,getuseremergsrelations,
    getapplyinfodetailsemergs,updateapplyinfoemergs,deleteapplyinfoemergs,getfdcorderinfo,delemergecontact
} from "@/api";
import { getRejectInfo } from "@/common/js/common";
export default {
  name: "baseInfo",
  inject: ["reload"],
  props: {
    approveId: {
      type: String
    },
    pageType: {
      type: String
    }
  },
  data() {
    return {
      lender : localStorage.getItem('lender'),
      isRecheck:this.$route.query.isRecheck,
      size: 10,

      contactPageCount: 1,
      callPageCount: 1,
      smsPageCount: 1,

      contactTotalSize: 1,
      callTotalSize: 1,
      smsTotalSize: 1,

      type: "orderInfo",
      loading: false,
      delEmergsSwitch:false,
      contactUpdateLoading:false,
      contactDeleteLoading:false,
      relationsList:[],
      contactInfo:{
        name:'',
        relation:'',
        phone:'',
      },
        ruleValidate: {
                    name: [
                        { required: true, message: this.$t('approvalDetail.baseInfo.contactInfo.name'), trigger: 'blur' },
                        { type: 'string', max:30, message: this.$t('approvalDetail.baseInfo.contactInfo.ruleName'), trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: this.$t('approvalDetail.baseInfo.contactInfo.phone'), trigger: 'blur' },
                        { type: 'string', min: 10,max:13, message: this.$t('approvalDetail.baseInfo.contactInfo.rulephone'), trigger: 'blur' }

                    ],
                    relation: [
                        { required: true, message: this.$t('approvalDetail.baseInfo.contactInfo.relation'), trigger: 'change' }
                    ],
                    },

      contactRecordTitle: [
        {
          type: "index",
          width: 60,
          title: "ID",
          align: "center",
          fixed: "left",
          key: "_id"
        },
        {
          title: this.$t("approvalDetail.callRecord.callPhoneNumber"),
          key: "phone"
        },
        {
          title: this.$t(
            "approvalDetail.contactRecord.contactsRecentContactTime"
          ),
          key: "last_time_contacted"
        },
        {
          title: this.$t("approvalDetail.contactRecord.contactsCommonContact"),
          key: "starred"
        },
        {
          title: this.$t("approvalDetail.contactRecord.contactsNumber"),
          key: "times_contacted"
        },
        {
          title: this.$t("approvalDetail.contactRecord.contactDisplayName"),
          key: "name"
        }
      ],
      contactRecord: [],

      callRecordTitle: [
        {
          type: "index",
          width: 60,
          title: "ID",
          align: "center",
          fixed: "left",
          key: "id"
        },
        {
          title: this.$t("approvalDetail.callRecord.callPhoneNumber"),
          key: "phone"
        },
        {
          title: this.$t("approvalDetail.callRecord.callPhoneName"),
          key: "name"
        },
        {
          title: this.$t("approvalDetail.callRecord.callDuration"),
          key: "duration"
        },
        {
          title: this.$t("approvalDetail.callRecord.callType"),
          key: "type"
        },
        {
          title: this.$t("approvalDetail.callRecord.callTime"),
          key: "date"
        }
      ],
      callRecord: [],

      smsRecordTitle: [
        {
          type: "index",
          width: 60,
          title: "ID",
          align: "center",
          key: "id"
        },
        {
          title: this.$t("approvalDetail.smsRecord.smsType"),
          key: "type"
        },
        {
          title: this.$t("approvalDetail.smsRecord.smsContent"),
          key: "body",
          width: 500
        },
        {
          title: this.$t("approvalDetail.smsRecord.smsAddress"),
          key: "address"
        },
        {
          title: this.$t("approvalDetail.smsRecord.smsDate"),
          key: "date"
        },
        {
          title: this.$t("approvalDetail.smsRecord.smsSentDate"),
          key: "date_sent"
        },
        {
          title: this.$t("approvalDetail.smsRecord.smsSender"),
          key: "person"
        }
      ],
      smsRecord: [],

      smsTotalSize: 0,
      contactModal:false,
      showTable: true,
      noData: false,
      orderInfoList: [],
      baseInfoList: [],
      businessInfo:{},
      arrTitle: [],
      livingPhotos: [],
      associatedOrderInfo: [],
      scoreInfo:{},
      colorList: [
        "#ad6800",
        "#5b8c00",
        "#009688",
        "#ad2102",
        "#9b43c3",
        "#00bcd4",
        "#7cb305",
        "#faad14",
        "#ff0000"
      ]
    };
  },

  computed: {
    baseInfo() {
      let { arrTitle, colorList } = this;
      // arrTitle.push({
      //   "title": this.$t('approvalDetail.baseInfo.associatedOrder'),
      //   "type": "info",
      //   "cnt": "1",
      //   "key": "associatedOrder"
      // })
      arrTitle.map((item, index) => {
        if (+item.cnt) {
          item.color = colorList[index] ? colorList[index] : colorList[0];

        } else {
          item.style = "border-style: dashed;color: #495060a6";
        }
      });
      return arrTitle;
    }
  },

  mounted() {
    this._getList();
  },
  created() {
      // this.$nextTick(() => {

      //   document.oncontextmenu = new Function("event.returnValue=false");

      //   document.onselectstart = new Function("event.returnValue=false");
      // });
    },

  methods: {
    summation  (num, amount){
      var numArr = [];
        while(amount > 1){
        var rnd = Math.floor(Math.random() * num);
        num -= rnd;
        numArr.push(rnd);
        amount--;
        }
        numArr.push(num);
        return numArr
    },
    _getList() {
      this.loading = true;
      getBaseInfo(
        {
          approveId: this.approveId,
          type: this.pageType
        },
        res => {
          if (+res.status === 0) {
            // this.orderInfoList= res.data.orderInfo,
            Object.assign(this, {
              loading: false,
              orderInfoList: res.data.orderInfo,
              baseInfoList: res.data.baseInfo,
              arrTitle: res.data.arrTitle,
              businessInfo: res.data.businessInfo,
              totalContactRecord: res.data.contactRecord,
              totalCallRecord: res.data.callRecord,
              totalSmsRecord: res.data.smsRecord,
              delEmergsSwitch: res.data.delEmergsSwitch
            });

            this.orderInfoList.Biaya=formatMoney((Number(this.orderInfoList.oneTimeFee)*0.4).toFixed(0))
            this.orderInfoList.Bunga=formatMoney((Number(this.orderInfoList.oneTimeFee)*0.6).toFixed(0))
             localStorage.setItem("contract",res.data.orderInfo.contract)
              localStorage.setItem("digiSignStatus",res.data.orderInfo.digiSignStatus)
            this.showTable = true;
            var result = this.baseInfoList.mobile.split(",");
            var unshow = [];
            var show = [];
            for (var i = 0; i < result.length; i++) {
              show.push(result[i]);
              unshow.push(result[i].replace(result[i].substr(3, 4), "****"));
            }
            this.baseInfoList.unshowphone = unshow;
            this.baseInfoList.showphone = show;
            // Contacts
            if (this.totalContactRecord != null) {

              this.contactPageCount = 1;
              this.totalContactRecord.forEach(item => {
                item.up_time = this.getLocalTime(item.up_time);
                // item.starred =
                //   item.starred == "0"
                //     ? this.$t("approvalDetail.contactRecord.contactNot")
                //     : this.$t("approvalDetail.contactRecord.contactYes");
                // item.last_time_contacted = this.getLocalTime(
                //   item.last_time_contacted
                // );
              });
              this.contactTotalSize = this.totalContactRecord.length;
              this.contactRecord = this.pagination(
                this.contactPageCount,
                this.size,
                this.totalContactRecord
              );
            }
            // Call
            if (this.totalCallRecord != null) {

              this.callPageCount = 1;
              this.totalCallRecord.forEach(item => {
                item.type = this.getCallType(item.type);
                item.duration = item.duration + "s";
                item.time = this.getLocalTime(item.time);
              });
              this.callTotalSize = this.totalCallRecord.length;
              this.callRecord = this.pagination(
                this.callPageCount,
                this.size,
                this.totalCallRecord
              );
            }
            // SMS
            if (this.totalSmsRecord != null) {
              this.smsPageCount = 1;
              this.totalSmsRecord.forEach(item => {
                item.type =
                  item.type == "1"
                    ? this.$t("approvalDetail.smsRecord.smsTypeReceive")
                    : this.$t("approvalDetail.smsRecord.smsTypeSend");
                item.date = this.getLocalTime(item.date);
                item.date_sent = this.getLocalTime(item.date_sent);
              });
              this.smsTotalSize = this.totalSmsRecord.length;
              this.smsRecord = this.pagination(
                this.smsPageCount,
                this.size,
                this.totalSmsRecord
              );
            }
          } else {
            this.showTable = false;
          }
        }
      );
    },
    _resetAssociatedOrderList(d) {
      let orderList = [];
      d.forEach(cur => {
        const lists = [];
        cur.list.forEach(list => {
          const rejectInfo = getRejectInfo(
            {
              result: list.result,
              reject: list.reject
            },
            this.$t("approvalDetail.result")
          );
          if (+list.result === 2) {
            list.rejectInfo = [rejectInfo.result, rejectInfo.reject].join("，");
          } else {
            list.rejectInfo = list.orderStatus;
          }
          lists.push(list);
        });
        cur.list = lists;
        orderList.push(cur);
      });

      this.associatedOrderInfo = orderList;
    },

     toView(item) {
      console.log(item, 888);

      if (item.type === "pic") {
        if (typeof item.key === "string") {
          console.log(22);
          +item.cnt && window.open(item.key);
        }
        if (typeof item.key === "object") {
          this.livingPhotos = item.key;
          this.type = item.type;
        }
      } else {
        if (item.key === "associatedOrder") {
          console.log(888);
          getAssociatedOrder(
            {
              approveId: this.approveId
            },
            res => {
              if (res.data && res.data.length) {
                this._resetAssociatedOrderList(res.data);
              } else {
                this.noData = true;
              }
            }
          );
        }
        if (item.key === "scoreInfo") {
        getfdcorderinfo(
            {
              approveId: this.approveId
            },
            res => {
              this.scoreInfo = res.data
              var data = res.data;
              // this.scoreInfo.businessPhone =((Number( "10.2")+Number( "84.3"))*0.8+121).toFixed(0)
              // this.scoreInfo.businessPhone =691
            })
      }
        this.type = item.key;
      }
    },
    // toView(item) {
    //   console.log(item, 888);

    //   if (item.type === "pic") {
    //     if (typeof item.key === "string") {
    //       console.log(22);
    //       +item.cnt && window.open(item.key);
    //     }
    //     if (typeof item.key === "object") {
    //       this.livingPhotos = item.key;
    //       this.type = item.type;
    //     }
    //   }  if (item.key === "scoreInfo") {
    //     getfdcorderinfo(
    //         {
    //           approveId: this.approveId
    //         },
    //         res => {
    //           this.scoreInfo = res.data
    //           var data = res.data;
    //           // this.scoreInfo.businessPhone =((Number( "10.2")+Number( "84.3"))*0.8+121).toFixed(0)
    //           // this.scoreInfo.businessPhone =691
    //         })
    //   }
    //   else {
    //     if (item.key === "associatedOrder") {
    //       console.log(888);
    //       getAssociatedOrder(
    //         {
    //           approveId: this.approveId
    //         },
    //         res => {
    //           if (res.data && res.data.length) {
    //             this._resetAssociatedOrderList(res.data);
    //           } else {
    //             this.noData = true;
    //           }
    //         }
    //       );
    //     }

    //   }
    //    this.type = item.key;
    // },
    jumpUrl(id) {
      let url = this.$router.resolve({
        name: "detail",
        params: { approveId: "view_" + id }
      });
      window.open(url.href, "_blank");
    },


    getCallType(type) {
      if (type == "1") {
        return this.$t("approvalDetail.callRecord.callTypeIncomingCall");
      } else if (type == "2") {
        return this.$t("approvalDetail.callRecord.callTypeOutgoing");
      } else if (type == "3") {
        return this.$t("approvalDetail.callRecord.callTypeMissed");
      } else if (type == "4") {
        return this.$t("approvalDetail.callRecord.callTypeVoiceMail");
      } else if (type == "5") {
        return this.$t("approvalDetail.callRecord.callTypeRejected");
      } else if (type == "6") {
        return this.$t("approvalDetail.callRecord.callTypeBlocked");
      } else {
        return this.$t("approvalDetail.callRecord.callTypeUnknown");
      }
    },
    getLocalTime(time) {
      let now = new Date(parseInt(time));
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    handleUpdateContactsTable(pageIndex) {
      this.contactPageCount = pageIndex || 1;
      this.contactRecord = this.pagination(
        this.contactPageCount,
        this.size,
        this.totalContactRecord
      );
    },
    handleUpdateCallTable(pageIndex) {
      this.callPageCount = pageIndex || 1;
      this.callRecord = this.pagination(
        this.callPageCount,
        this.size,
        this.totalCallRecord
      );
    },
    handleUpdateSmsTable(pageIndex) {
      this.smsPageCount = pageIndex || 1;
      this.smsRecord = this.pagination(
        this.smsPageCount,
        this.size,
        this.totalSmsRecord
      );
    },
    pagination(pageNo, pageSize, array) {
      let offset = (pageNo - 1) * pageSize;
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize);
    },
    formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
    handleExpertData(){
      if(this.totalSmsRecord != null){
         require.ensure([], () => {
        const { export_json_to_excel } = require('../../assets/js/Export2Excel');
        const tHeader = ['ID', 'type', 'body', 'address', 'date', 'date_sent', 'person'];
        const filterVal = ['_id', 'type', 'body', 'address', 'date', 'date_sent', 'person'];

        const list = this.totalSmsRecord;

        //console.log(list)
        const data = this.formatJson(filterVal, list);
        //console.log(data)
        export_json_to_excel(tHeader, data, 'sms log');

      })
      }else{
        this.$Message.error(this.$t("approvalDetail.smsRecord.noSms"))
      }



    },

    callphone(phone) {
      dialCall(
        {
          approveId: this.approveId,
          called: phone
        },
        res => {
          if (+res.status === 0) {
            const msg = this.$Message.loading({
              content: this.$t("approvalDetail.msgList.dialSuccess"),
              duration: 0
            });
            setTimeout(msg, 3000);
               this.$store.state.call = true
          } else {

            this.$Message.error(res.msg);
          }
        }
      );
    },
    deletePhone(item){
      this.$Modal.confirm({
        title: 'menghapus',
        content: '<p>konfirmasi penghapusan?</p>',
        onOk: () => {
          delemergecontact({
            orderNo:this.orderInfoList.orderNo,
            emergeName:item.emergsName,
            emergeMobile:item.emergsPhone,
          },res=>{
            this._getList();
          })
        },
        onCancel: () => {

        }
    });

      console.log(item)
    },
    editContact(index){
      this.emergsIndex =index;
      this.contactInfo={
        name:'',
        relation:'',
        phone:'',
      },
      getuseremergsrelations({},res=>{
        var data = res.data
        var relationsList = []
          for (var i in data) {
            var obj ={}
            obj.lable = data[i]
            obj.key = i
            relationsList.push(obj);
          }
        this.relationsList = relationsList
      })

      getapplyinfodetailsemergs({
        orderNo:this.orderInfoList.orderNo,
        emergsIndex:this.emergsIndex
      },res=>{
        if(res.status==0){
        this.contactModal = true
        this.contactInfo.relation =res.data.emergsRelationIndex;
        this.contactInfo.name =res.data.emergsName
        this.contactInfo.phone =res.data.emergsPhone}
        else{
          this.$Message.error(res.msg)
        }
      })


    },

    contactUpdate(name){
       this.$refs[name].validate((valid) => {
          if (valid) {
            var patrn = /^[0-9]*$/;
            if(this.contactInfo.phone){
              if (!patrn.test(this.contactInfo.phone)) {
                this.$Message.error(this.$t('approvalDetail.baseInfo.contactInfo.rulephone'));
                return

            }
            }
            this.contactUpdateLoading = true;
            updateapplyinfoemergs({
              orderNo:this.orderInfoList.orderNo,
              emergsIndex:this.emergsIndex,
              emergsName:this.contactInfo.name,
              emergsPhone:this.contactInfo.phone,
              emergsRelation:this.contactInfo.relation,
            },res=>{
              this.contactUpdateLoading = false
              if(res.status==0){
                this._getList();
                this.contactModal = false;
                this.$Message.success(res.msg)
              }else{
                this.$Message.error(res.msg)
              }
            })
          }
      })
    },

    contactDelete(){
      this.contactDeleteLoading = true
      deleteapplyinfoemergs({
        orderNo:this.orderInfoList.orderNo,
        emergsIndex:this.emergsIndex,
      },res=>{
        this.contactDeleteLoading = false
        if(res.status==0){
          this._getList();
          this.contactModal = false;
          this.$Message.success(res.msg)
        }else{
          this.$Message.error(res.msg)
        }
      })
    },

     contactCancel(name){
       this.$refs[name].resetFields();
        this.contactModal = false
    },

  }
};
</script>
<style scoped lang="scss">
$borderColor: #e9eaec;
  /deep/ .ivu-tooltip-inner {
    max-width: 600px;
  }
.call {
  font-size: 28px;
  color: #19be6b;
  cursor: pointer;
  margin-right: 20px;
}
.call:hover{
  opacity: 0.5;
}
.create{
  font-size: 28px;
  color: #f90;
  cursor: pointer;
  margin-right: 20px;
}
.create:hover{
  opacity: 0.5;
}
.delete{
  font-size: 28px;
  color: red;
  cursor: pointer;
  margin-right: 20px;
}
.delete:hover{
  opacity: 0.5;
}

.m-baseInfo {
  $borderColor: #e9eaec;
  .tag {
    border-radius: 3px;
    text-align: center;
    height: auto;
    padding: 0px 10px;
    margin-right: 10px;
  }
  .list {
    margin-top: 25px;
  }
  .box {
    border-left: 1px solid $borderColor;
    border-top: 1px solid $borderColor;
    margin-top: 24px;
    margin-bottom: 30px;
    .col-style {
      height: 40px;
      line-height: 40px;
      border-right: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      text-indent: 20px;
      &.title {
        padding-left: 0;
        text-align: left;
        color: #495060;
        font-weight: bold;
        background-color: #f8f8f9;
      }
      &.error {
        color: red;
      }
    }
  }
  .associated-order {
    margin-top: 24px;
    .hd {
      background-color: #f8f8f9;
      font-weight: 800;
    }
    table {
      border: 1px solid $borderColor;
      border-collapse: collapse;
      line-height: 40px;
    }
    td {
      border-left: 1px solid $borderColor;
      border-top: 1px solid $borderColor;
      text-indent: 20px;
    }
    .order-list {
      display: flex;
      border-top: 1px solid $borderColor;
      border-left: 0;
      .link {
        color: #0647ff;
        cursor: pointer;
      }
      td {
        text-indent: 0;
        width: 25%;
        border-top: 0;
        padding: 10px 20px;
        line-height: 2;
        &:first-child {
          border-left: 0;
        }
      }
      &:first-child {
        border-top: 0;
      }
    }
  }
  .no-data {
    margin-left: 20px;
    margin-top: 20px;
  }

  .living-photo {
    width: 100%;
  }
}

.m-pagination {
  margin-top: 20px;
  text-align: center;
}
.card_tip{
  font-size: 14px;
  width: 100%;
  padding: 10px;
  background: #f8f8f9;
  margin:20px 0 50px 0;
  p{
    padding: 5px 0;
  }
}
</style>
