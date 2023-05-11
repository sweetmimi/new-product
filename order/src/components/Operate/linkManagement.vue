<template>
  <div>
    <h1>link address</h1>
    <Form :label-width="180">
      <FormItem label="Download link configuration" >
        <Button @click="getProduct()" icon="ios-create-outline">{{
          $t("linkMangement.btn.edit")
        }}</Button>
      </FormItem>
      
    </Form>

    <Modal
      v-model="productList"
      title="Download link configuration"
      :footer-hide="true"
      width="800"
    >
      <Table
        border
        ref="table"
        :data="list"
        :columns="tableColums"
        :loading="loading"
      >
      </Table>
      <Page
        v-if="total > pageSize"
        :total="total"
        :page-size="pageSize"
        :current.sync="page"
        class-name="m-pagination"
        @on-change="handlePage"
        show-total
        show-elevator
      >
        {{ $t("pageSlot.total") }} {{ total }} {{ $t("pageSlot.count") }}
      </Page>
      <!-- page -->
    </Modal>

    <Modal v-model="link" :title="title" :footer-hide="true">
      <Form
        :label-width="120"
        :model="form"
        :rules="mylinkRules"
        ref="mylinkAddressformValidate"
      >
        <FormItem
          label="download link"
          prop="link"
        >
          <Input
            clearable
            v-model="form.link"
            style="width: 100%"
            :placeholder="`${$t('inputPrefix')}${$t(
              'download link'
            )}`"
          />
        </FormItem>
        <FormItem>
          <Button
            @click="handleReset('mylinkAddressformValidate', 'link')"
            >{{ $t("cancelText") }}</Button
          >
          <Button
            type="primary"
            @click="handleSubmit('mylinkAddressformValidate', 'link')"
            style="margin-left: 18px"
            >{{ $t("okText") }}</Button
          >
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="linkAddress" :title="title" :footer-hide="true">
      <Form
        :label-width="120"
        :model="form"
        :rules="linkRules"
        ref="linkAddressformValidate"
      >
        <FormItem
          label="Download link configuration"
          prop="linkAddress"
        >
          <Input
            clearable
            v-model="form.linkAddress"
            style="width: 100%"
            :placeholder="`${$t('inputPrefix')}${$t(
              'linkMangement.label.linkAddress'
            )}`"
          />
        </FormItem>
        <FormItem>
          <Button
            @click="handleReset('linkAddressformValidate', 'linkAddress')"
            >{{ $t("cancelText") }}</Button
          >
          <Button
            type="primary"
            @click="handleSubmit('linkAddressformValidate', 'linkAddress')"
            style="margin-left: 18px"
            >{{ $t("okText") }}</Button
          >
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="kefuPhone" :title="title" :footer-hide="true">
      <Form
        :label-width="120"
        :model="form"
        :rules="kefuPhoneRules"
        ref="kefuPhoneformValidate"
      >
        <FormItem :label="$t('linkMangement.label.kefuPhone')" prop="kefuPhone">
          <Input
            clearable
            v-model="form.kefuPhone"
            style="width: 100%"
            :placeholder="`${$t('inputPrefix')}${$t(
              'linkMangement.label.kefuPhone'
            )}`"
          />
        </FormItem>
        <FormItem>
          <Button @click="handleReset('kefuPhoneformValidate', 'kefuPhone')">{{
            $t("cancelText")
          }}</Button>
          <Button
            type="primary"
            @click="handleSubmit('kefuPhoneformValidate', 'kefuPhone')"
            style="margin-left: 18px"
            >{{ $t("okText") }}</Button
          >
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="kefuEmail" :title="title" :footer-hide="true">
      <Form
        :label-width="120"
        :model="form"
        :rules="kefuEmailRules"
        ref="kefuEmailformValidate"
      >
        <FormItem :label="$t('linkMangement.label.kefuEmail')" prop="kefuEmail">
          <Input
            clearable
            v-model="form.kefuEmail"
            style="width: 100%"
            :placeholder="`${$t('inputPrefix')}${$t(
              'linkMangement.label.kefuEmail'
            )}`"
          />
        </FormItem>
        <FormItem>
          <Button @click="handleReset('kefuEmailformValidate', 'kefuEmail')">{{
            $t("cancelText")
          }}</Button>
          <Button
            type="primary"
            @click="handleSubmit('kefuEmailformValidate', 'kefuEmail')"
            style="margin-left: 18px"
            >{{ $t("okText") }}</Button
          >
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { validateURL } from "@/locale/us.js";
// import { productconf } from "@/api/order/user";

import { Downloadlink, Downloadlinktijiao } from "@/api/config";
export default {
  data() {
    return {
      title: "",
      loading: false,
      productList: false,
      link: false,
      linkAddress: false,
      kefuPhone: false,
      kefuEmail: false,
      pageSize: 10,
      page: 1,
      total: "",
      form: {
        link: "",
        linkAddress: "",
        kefuPhone: "",
        kefuEmail: "",
      },
      list: [],
      tableColums: [
        {
          key: "channel_text",
          minWidth: 150,
          align: "center",
          title: "channel",
        },
        {
          key: "value",
          minWidth: 150,
          align: "center",
          title: "link",
        },
        // {
        //   key: "status",
        //   minWidth: 150,
        //   align: "center",
        //   title: this.$t("linkMangement.label.status"),
        //   render: (h, params) => {
        //     if (params.row.status == "1") {
        //       return h("div", this.$t("linkMangement.label.start"));
        //     } else {
        //       return h("div", this.$t("linkMangement.label.stop"));
        //     }
        //   },
        // },
        {
          title: this.$t("operate.handle"),
          key: "action",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    icon: "ios-create-outline",
                  },

                  on: {
                    click: () => {
                      this.handleTableAction(params.row);
                    },
                  },
                },
                "edit"
              ),
            ]);
          },
        },
      ],
      mylinkRules: {
        link: [
          {
            required: true,
            message: "Unduh konfigurasi tautan",
            trigger: "blur",
          },
        ],
      },
      linkRules: {
        linkAddress: [
          {
            required: true,
            message: this.$t("linkMangement.label.linkAddress"),
            trigger: "blur",
          },
        ],
      },
      kefuPhoneRules: {
        kefuPhone: [
          {
            required: true,
            message: this.$t("linkMangement.label.kefuPhone"),
            trigger: "blur",
          },
        ],
      },
      kefuEmailRules: {
        kefuEmail: [
          {
            required: true,
            message: this.$t("linkMangement.label.kefuEmail"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},

  methods: {
    getProduct() {
      this.productList = true;
      this.loading = true;
      Downloadlink(
        {
          link_type:2 ,
        },
        (res) => {
          if (res.code == 0) {
            this.loading = false;
            this.list = res.data || [];

            // this.total = Number(res.data.data.arrPager.count);
            
          }
        }
      );
    },
    handlePage(val) {
      this.page = val;
      this.getProduct();
    },
    handleTableAction(row) {
      console.log(row);
      this.title = "Unduh konfigurasi tautan("+row.channel_text+')';
      this.link = true;
      this.form.link = row.value
      this.form.channel = row.channel
    //   this.GetLink("2", row.product_id);
    },
    edit(type) {
      if (type == "linkAddress") {
        this.title = this.$t("linkMangement.label.linkAddress");
        this.GetLink("1");
      }
      if (type == "kefuPhone") {
        this.title = this.$t("linkMangement.label.kefuPhone");
        this.GetLink("3");
      }
      if (type == "kefuEmail") {
        this.title = this.$t("linkMangement.label.kefuEmail");
        this.GetLink("4");
      }
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.link = false;
      this.linkAddress = false;
      this.kefuPhone = false;
      this.kefuEmail = false;
    },
    handleSubmit(rule, type) {
      this.$refs[rule].validate((valid) => {
        if (valid) {
          console.log(type);
          if (type == "link") {
            this.data = {
              link_type: "2",
              link: this.form.link,
              channel: this.form.channel,
            };
          }
          if (type == "linkAddress") {
            this.data = {
              link_type: "1",
              link: this.form.linkAddress,
            };
          }
          if (type == "kefuPhone") {
            this.data = {
              link_type: "3",
              link: this.form.kefuPhone,
            };
          }
          if (type == "kefuEmail") {
            this.data = {
              link_type: "4",
              link: this.form.kefuEmail,
            };
          }
          Downloadlinktijiao(this.data, (res) => {
            if (res.code == 0) {
              this.productList = false;
              this.$Message.success(res.msg);
              this.link = false;
              this.linkAddress = false;
              this.kefuPhone = false;
              this.kefuEmail = false;
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      });
    },

    GetLink(linkType, productId) {
      if (productId) {
        this.productId = productId;
        this.mydata = {
          product_id: Number(productId) ,
          link_type: Number(linkType),
          resType: "get",
        };
      } else {
        this.mydata = {
          link_type: linkType,
          resType: "get",
        };
      }
      Downloadlink(this.mydata, (res) => {
        if (res.code == 0) {
          this.form.link = res.data.link;
          this.form.linkAddress = res.data.link;
          this.form.kefuPhone = res.data.link;
          this.form.kefuEmail = res.data.link;
          if (linkType == 2) {
            this.link = true;
          }
          if (linkType == 1) {
            this.linkAddress = true;
          }
          if (linkType == 3) {
            this.kefuPhone = true;
          }
          if (linkType == 4) {
            this.kefuEmail = true;
          }
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
};
</script>
<style  scoped lang="scss">
.diangqian {
  display: inline-block;
  padding-right: 20px;
}
.shuoming {
  font-size: 14px;
  color: red;
  padding-left: 5px;
}
.tihuan {
  margin-top: 20px;
  width: 100px;

  margin-left: 55%;
}
.tihun {
  display: inline-block;
  padding-right: 20px;
  font-size: 16px;
}
</style>
