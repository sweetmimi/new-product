<template>
  <div class="SMSswitch">
    <h3 class="duanxin">Saklar saluran SMS</h3>
    <div v-for="(item, index) in list" :key="index" class="SingleSelection">
      <span> {{ item.mid_name }}</span>
      <RadioGroup label="mid" v-model="item.state" class="duanxuan">
        <span
          @click="changeModel('1', item.mid, index)"
          style="margin-left: 50px"
        >
          <Radio size="large" label="1">CMLK</Radio>
        </span>
        <span
          @click="changeModel('2', item.mid, index)"
          style="margin-left: 60px"
        >
          <Radio size="large" label="2">facebook</Radio>
        </span>
      </RadioGroup>
    </div>
    <Alert v-show="list.length == 0">{{ $t("noData") }}</Alert>
  </div>
</template>
<script>
import { SwitchMessages } from "../../api/site";
export default {
  data() {
    return {
      phone: "apple",
      animal: "",

      list: [],
    };
  },
  methods: {
    changeModel(name, mid, index) {
      console.log(name, mid, index);
      if (name !== this.list[index].state) {
        this.$Modal.confirm({
          content: `<p>Apakah akan beralih SMS</p> `,
          onOk: () => {
            let state = {
              update: 1,
              state: this.list[index].state,
              mid: this.list[index].mid,
            };

            console.log(state);
            SwitchMessages(state, (res) => {
              console.log(res);
              this.$Message.info("Beralih SMS berhasil");
            });
          },
          onCancel: () => {
            if (name == "1") {
              this.list[index].state = "2";
              this.$Message.info("Batalkan keberhasilan");
            } else if (name == "2") {
              this.list[index].state = "1";
            }
          },
        });
      }
    },
  },

  created() {
    SwitchMessages({}, (res) => {
      if (+res.code == 0) {
        this.list = res.data.list;
        console.log(res, 666);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.SingleSelection {
  margin-top: 20px;
}
.SMSswitch {
  padding-left: 30px;
  .duanxin {
    padding-bottom: 30px;
    font-size: 20px;
  }
  .duanxuan {
    font-size: 20px;
    /deep/ laber {
      font-size: 20px;
    }
  }
}
</style>
