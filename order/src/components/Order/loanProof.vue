<template>
  <div>
    <Modal v-model="showModal" :title="proofList.title" class="m-modal">
      <div class="proof" id="download">
        <ul>
          <li>
            <p>Nominal Transaksi</p>
            <strong style="font-size:36px">{{proofList.amount}}</strong>
          </li>
          <li>
            <span class="left">Deskripsi</span>
            <span class="right">{{proofList.desc}}</span>
          </li>
          <li>
            <span class="left">Tanggal Transfer</span>
            <span class="right">{{proofList.dateTime}}</span>
          </li>
          <li>
            <span class="left">Nama Pemilik Rekening</span>
            <span class="right">{{proofList.name}}</span>
          </li>
          <li>
            <span class="left">Bank</span>
            <span class="right">{{proofList.bankCode}}</span>
          </li>
          <li>
            <span class="left">Nomor Rekening</span>
            <span class="right">{{proofList.cardNum}}</span>
          </li>
          <li>
            <span class="left">Kode Pesanan Payment Gateway</span>
            <span class="right">{{proofList.endpointNo}}</span>
          </li>
        </ul>
      </div>

      <div slot="footer" class="footer">
        <Button align="center" @click="showModal = false">{{ $t("cancelText") }}</Button>
        <Button type="success" align="center" icon="ios-download-outline" @click="downloadImage">
          {{
          $t("order.orderInfo.download")
          }}
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getLoancert } from '@/api/loan'
import html2canvas from 'html2canvas'
export default {
  name: '',

  components: {},
  data() {
    return {
      showModal: false,
      proofList: {},
      proofNum: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    loanProof(order_no) {
      this.proofNum = order_no
      getLoancert(
        {
          order_no: order_no,
        },
        (res) => {
          if (+res.code === 0) {
            this.showModal = true
            this.proofList = res.data
          } else {
            this.$Message.error(res.msg)
          }
        }
      )
    },
    downloadImage() {
      var order = this.proofNum
      var opts = {
        useCORS: true,
      }
      html2canvas(document.querySelector('#download'), opts).then(function (
        canvas
      ) {
        if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
          console.log('11')
        } else {
          var bodys = document.getElementsByTagName('body')[0]
          var imgUri = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream')
          var saveLink = document.createElement('a')
          bodys.append(saveLink)
          saveLink.href = imgUri
          saveLink.download = order + '.' + 'png'
          saveLink.click()
        }
      })
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
}
</script>

<style scoped  lang='scss'>
.proof {
  padding: 10px 20px;
  font-size: 14px;
  ul > li {
    border-bottom: 1px solid #ccc;
    padding: 20px 0px 30px;
    list-style: none;
    .left {
      float: left;
      color: #000;
    }
    .right {
      color: #aaa;
      float: right;
    }
  }
}
</style>
