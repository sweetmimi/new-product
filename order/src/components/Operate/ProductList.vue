<template>
  <div class="m-productList">
    <Form :model="searchForm" inline :label-width="80">
    <FormItem label="root product">
        <Select
          clearable
          transfer
          v-model="searchForm.product_base_type"
          :placeholder="`${$t('inputPrefix')}${$t('order.search.productId')}`"
        >
          <Option :value="0">semua</Option>
          <Option :value="1">Iya</Option>
          <Option :value="2">tidak</Option>
        </Select>
      </FormItem>
      <FormItem >
        <Button
        type="primary" 
        @click="_getList()"
      >{{ $t('search') }}</Button>
      </FormItem>
      <FormItem >
        <div class="addProduct">
           <!-- <Button
        type="primary" 
        @click="addProduct"
      >{{ $t('product.tableHead.addProduct') }}</Button> -->
     
      <Button type="success" v-if="role" @click="cannelSet">{{
        $t('product.tableHead.cannelSet')
      }}</Button>
    </div>
      </FormItem>
      
    </Form>

    <Modal width="50%" v-model="cannelSetModal" :title="$t('product.tableHead.cannelSet')" footer-hide>
      <Tabs :animated="false" @on-click="handleTab" v-model="tabVal">
        <TabPane v-for="(item, index) in tabs" :key="index" :label="item.name" :name="item.key" :icon="item.icon">
          <p>
            The channel supports multiple products, and they are displayed on the client side according to the product order;
             The AF callback is delayed for 10 minutes, and it is judged as a natural amount if it is not called back and has no mark;
             If the user comes from a channel with no products configured, the default is to display 30,000 products for the user;
          </p>
          <br />
          <Table height="400" border class="list-table" :data="cannelTableData" :columns="cannelTableDefine"
            :loading="cannelLoading">
          </Table>
        </TabPane>
      </Tabs>
      
    </Modal>
    <Modal width="50%" v-model="editModal" :title="editTitle" footer-hide>
      <div class="dndList">
        <div class="dndList-list">
          <h3>all product_id</h3>
          <br />
          <div class="allbox">
            <draggable :list="allProductList" :options="{
                group: { name: falgs, pull: 'clone' },
                filter: '.undraggable',
                sort: false,
              }" @end="end" class="dragArea">
              <div v-for="(element, index) in allProductList" :key="index" :class="{ undraggable: element.flag }"
                class="list-complete-item">
                <div class="list-complete-item-handle2">{{ element.name }}</div>
              </div>
            </draggable>
          </div>
        </div>
        <div class="dndList-list">
          <h3>product_id config</h3>
          <br />
          <div class="nowbox">
            <draggable :list="nowProductList" :options="{ group: 'article', disabled: disabled }" @start="start22"
              @end="end22" class="dragArea">
              <div v-for="(element, index) in nowProductList" :key="element.id" class="list-complete-item">
                <div class="list-complete-item-handle">{{ element.name }}</div>
                <div>
                  <Icon type="md-close" @click="handleDel(index, element.id)" class="md-close" />
                </div>
              </div>
            </draggable>
          </div>
        </div>
        <div class="dndList-list" v-if="rowInfo.isShowDed">
          <h3>Product Derating Configuration</h3>
          <Select clearable filterable style="width:100%" v-model="deductionProductId"
            @on-change="changedeductionProductId">
            <Option :value="element" v-for="(element, index) in productDeductionList" :key="index">{{ element }}
            </Option>
          </Select>
        </div>
        <div class="dndList-list" v-if="rowInfo.isShowPre">
          <h3>Discount product configuration</h3>
          <Select clearable filterable style="width:100%" v-model="preferentialProductId">
            <Option :value="element" v-for="(element, index) in productPreferentialList" :key="index">{{ element }}
            </Option>
          </Select>
        </div>
        <div class="btn" style="margin:20px;text-align: right;">
           <Button  @click="editModal=false" style="margin-right:20px">{{ $t('cancelText') }}</Button>
         <Button  @click="cannelSetSub" type="success" >{{ $t('okText') }}</Button>
        </div>
       
        <!-- <div style="width: 100%; height: 10px; background-color: #bfbfbf"></div> -->
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Modal>
    
    <Table ref="table" border class="list-table" :data="tableData" :columns="tableDefine" :loading="loading">
      <Spin slot="loading" fix class="m-loading">
        <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
        <div>Loading</div>
      </Spin>
      <!-- table loading -->
      <template slot="action" slot-scope="props">
        <Button type="text" class="fix-table-btn" v-if="role" @click="edit(props.rowInfo)"
          :disabled="!props.rowInfo.is_super" icon="ios-create-outline"
          size="small">{{ $t('operate.editBtn') }}</Button>
        <Button type="text" class="fix-table-btn" icon="ios-eye-outline"
          @click="look(props.rowInfo)">{{ $t('operate.viewBtn') }}</Button>
        <Button v-if="role"  type="text" class="fix-table-btn" icon="ios-paper-outline"
          @click="history(props.rowInfo)">{{ $t('operate.historyVersion') }}</Button>
      </template>
    </Table>
    <Modal width="50%" v-model="showHistoryModal" :title="historyTitle" footer-hide>
      <Table border class="list-table" :data="historyData" :columns="historycannelTableDefine" :loading="logloading">
      </Table>
    </Modal>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from 'vue-property-decorator'
  import {
    getProductList,
    getSourceProduct,
    saveSourceProduct,
    getlistbychannelProduct,
    getSourceProductLog,
  } from '@/api/config'
  import draggable from 'vuedraggable'
  @Component({
    components: {
      draggable: draggable,
    },
  })
  export default class ProductList extends Vue {
    $refs!: {
      table: HTMLFormElement
    }
    searchForm={
      product_base_type:'',
    }
    role = false
    spinShow = false
    cannelSetModal = false
    cannelLoading = false
    cannelTableData = []
    loading = false
    showTable = false
    editModal = false
    tableData = []
    editTitle = ''
    rowSource = ''
    rowProductId = ''
    falgs = 'article'
    disabled = false
    editId = ''
    deductionProductId = ''
    preferentialProductId = ''
    nowProductList = []
    allProductList = []

    productCommonList = []
    productDeductionList = []
    productPreferentialList = []
    productCommercialList = []
    rowInfo = {}
    historyTitle = ''
    logloading = false
    showHistoryModal = false
    historyData = []
    tabVal = 'android'
    tabs = [{
        icon: 'logo-android',
        key: 'android',
        name: 'Android',
      },
      {
        icon: 'logo-apple',
        key: 'ios',
        name: 'IOS',
      },
      // {
      //   icon: 'ios-apps',
      //   key: '',

      // },
    ]
    tableDefine = [{
        title: this.$t('product.tableHead.productId'),
        align: 'center',
        key: 'productId',
        fixed: 'left',
        minWidth: 110,
      },
      {
        title: this.$t('product.tableHead.productName'),
        align: 'center',
        key: 'productName',
        minWidth: 100,
      },
      {
        title: this.$t('product.tableHead.status'),
        align: 'center',
        key: 'status',
        minWidth: 100,
      },
      {
        title: "root product",
        align: 'center',
        key: 'product_base_type',
        minWidth: 100,
        render: (h: any, params: any) => {
          return h(
           'div',params.row.product_base_type==1?'Iya':'tidak'
          ) }
      },
      {
        title: this.$t('product.tableHead.repayWay'),
        align: 'center',
        key: 'termUnit',
        minWidth: 120,
      },
      {
        title: this.$t('product.tableHead.createTime'),
        align: 'center',
        key: 'createTime',
        minWidth: 120,
      },
      {
        title: this.$t('product.tableHead.updateTime'),
        align: 'center',
        key: 'updateTime',
        minWidth: 120,
      },
      {
        title: this.$t('product.tableHead.version'),
        align: 'center',
        key: 'version',
        minWidth: 100,
      },
      {
        title: this.$t('operate.handle'),
        align: 'center',
        key: 'option',
        fixed: 'right',
        minWidth: 280,
        render: (h: any, params: any) => {
          return h(
            'div',
            this.$refs.table['$scopedSlots'].action({
              rowInfo: params.row
            })
          )
        },
      },
    ]
    historycannelTableDefine = [{
        title: 'update Time',
        align: 'center',
        key: 'updateTime',
        fixed: 'left',
        minWidth: 110,
      },
      {
        title: 'loan configuration (before )',
        align: 'center',
        key: 'productId',
        minWidth: 100,
      },
      {
        title: 'Derating product (before)',
        align: 'center',
        key: 'deductionProductId',
        minWidth: 100,
      },
      {
        title: 'Discounted products (before)',
        align: 'center',
        key: 'preferentialProductId',
        minWidth: 100,
      },
    ]
    cannelTableDefine = [{
        title: this.$t('product.tableHead.source'),
        align: 'center',
        key: 'source',
        minWidth: 120,
      },
      {
        title: this.$t('product.tableHead.productId'),
        align: 'center',
        key: 'productId',
        minWidth: 200,
        render: (h: any, params: any) => {
          let arr = (params.row.productId || '').split(',')
      
          // console.log(arr)
          return h(
            'div',
            arr.map(function (item, index) {
              return h('Tag', {
                domProps: {
                  innerHTML: item || 'null',
                },
              })
            })
          )
        },
      },
      {
        title: this.$t('product.tableHead.deductionProductId'),
        align: 'center',
        key: 'deductionProductId',
        minWidth: 120,
      },
      {
        title: this.$t('product.tableHead.preferentialProductId'),
        align: 'center',
        key: 'preferentialProductId',
        minWidth: 120,
      },

      {
        title: this.$t('operate.handle'),
        align: 'center',
        key: 'option',
        minWidth: 160,
        render: (h: any, params: any) => {
          return h('div', [
            h(
              'Button', {
                props: {
                  type: 'text',
                  size: 'small',
                  icon: 'ios-create-outline',
                },
                on: {
                  click: () => {
                    this.editCannel(params.row)
                  },
                },
              },
              this.$t('operate.editBtn')
            ),
            h(
              'Button', {
                props: {
                  type: 'text',
                  size: 'small',
                  icon: 'ios-eye',
                },
                on: {
                  click: () => {
                    this.showHistory(params.row)
                  },
                },
              },
              this.$t('operate.history')
            ),
          ])
        },
      },
    ]
    edit(row: any) {
      localStorage.setItem('is_commercial_product', row.is_commercial_product)
      this.$router.push({
        name: 'productConfig',
        params: {
          id: row.productId,
          is_commercial_product: row.is_commercial_product,
        },
      })
    }
    look(row: any) {
      let routeData = this.$router.resolve({
        name: 'seeProduct',
        params: {
          productId: row.productId,
          channel: row.channel
        },
      })
      window.open(routeData.href, '_blank')
    }
    history(row: any) {
      let routeData = this.$router.resolve({
        name: 'productHistory',
        params: {
          productId: row.productId,
          channel: row.channel
        },
      })
      window.open(routeData.href, '_blank')
    }
    _getList() {
      this.loading = true
      getProductList(this.searchForm,(res: any) => {
        this.loading = false
        if (+res.code === 0) {
          const data = res.data
          this.tableData = data || []
          this.showTable = true
        } else {
          this.showTable = false
        }
      })
    }
    addProduct() {
      let routeData = this.$router.resolve({
        name: 'addProduct',
      })
      window.open(routeData.href, '_blank')
    }
    cannelSet() {
      this.tabVal = 'android'
      this.handleTab('android')
      this.cannelSetModal = true
    }
    handleTab(val: any) {
      this.cannelLoading = true
      this.cannelTableData = []
      this.productCommonList = []
      this.productDeductionList = []
      this.productPreferentialList = []
      this.productCommercialList = []
      getSourceProduct({
          platform: val,
        },
        (res: any) => {
          if (res.code == 0) {
            this.cannelLoading = false
            const data = res.data
            // this.productCommonList =data.productCommonList //
            this.productDeductionList = data.productDeductionList //
            this.productPreferentialList = data.productPreferentialList //
            this.productCommercialList = data.productCommercialList // true +productCommonList

            this.cannelTableData = res.data.sourceProduct
          }
        }
      )
    }

    getSome(arr1: any, arr2: any) {
      let newArr = []
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
          if (arr1[j].id === arr2[i].id) {
            newArr.push(arr1[j])
          }
        }
      }
      return newArr
    }
    async showHistory(row: any) {
      this.historyTitle = row.source + 'Channel Configuration History'
      this.showHistoryModal = true
      this.logloading = true
      this.historyData = []
      getSourceProductLog({
          id: row.id,
        },
        (res: any) => {
          this.logloading = false
          this.historyData = res.data.sourceProductHistory
        }
      )
    }
    async editCannel(row: any) {
      this.rowInfo = row || {}
      this.deductionProductId = row.deductionProductId ?
        row.deductionProductId :
        ''
      this.preferentialProductId = row.preferentialProductId ?
        row.preferentialProductId :
        ''
      this.editId = row.id
      this.editTitle = row.source + 'configure product_id'
      this.editModal = true
      this.rowSource = row.source
      this.rowProductId = row.productId

      this.allProductList = []

      var allProductList = []
      console.log(row)
      var allProductarr = []
      allProductarr = row.productCommonList

      allProductarr.forEach((item, index) => {
        var obj = {
          id: null,
          name: null,
          flag: false,
        }
        obj.id = item
        obj.name = item
        allProductList.push(obj)
      })
      this.allProductList = allProductList
      console.log(this.allProductList)
      if (row.productId) {
        var array = row.productId.split(',')
        var nowProductList = []
        array.forEach((item) => {
          var obj = {
            id: null,
            name: null,
          }
          obj.id = item
          obj.name = item
          nowProductList.push(obj)
        })
      }
      // console.log(this.nowProductList)
      // console.log(this.allProductList)

      this.allProductList.forEach((i) => {
        if (i.flag) {
          i.flag = false
        }
      })
      var arr = []
      arr = this.getSome(nowProductList, this.allProductList)
      // console.log(arr)
      if (arr.length > 0) {
        // console.log(arr)
        var that = this
        arr.forEach((item) => {
          // console.log(item.id)
          this.allProductList.forEach((i) => {
            if (i.id == item.id) {
              i.flag = true
            }
          })
          // this.allProductList[0].flag = true
          // console.log(this.allProductList['0'])
          // this.$set(this.allProductList[item.id], 'flag', true)
        })
      }
      this.allProductList = this.allProductList
      // console.log(this.allProductList)
      this.nowProductList = nowProductList
    }
    end(ev: any) {
      if (ev.to.className === 'dragArea') {
        // console.log(ev.oldIndex)

        this.$set(this.allProductList[ev.oldIndex], 'flag', true)
      }
      // this.end22('1')
      // console.log(this.allProductList)
      // console.log(this.nowProductList)
    }
    start22(event: any) {
      this.falgs = ''
    }
    end22(ev: any) {
      console.log(this.nowProductList)
      this.falgs = 'article'
    }
    handleDel(index: any, id: any) {
      this.nowProductList.splice(index, 1)
      let q = this.allProductList.find((value, index, arr) => {
        return value.id === id
      })
      this.$set(q, 'flag', false)
      console.log(this.allProductList)
      console.log(this.nowProductList)
    }

    changeRadio(row: any, item: any) {
      this.cannelTableData.forEach((i, v) => {
        if (i.source == row.source) {
          i.productId = row.productId
        }
      })
      console.log(this.cannelTableData)
      //  console.log(item)
    }
    changedeductionProductId(value) {}
    cannelSetSub() {
      var arr = []
      var sourceProduct = []
      var obj = {}
      if (this.nowProductList.length > 0) {
        this.nowProductList.forEach((item, index) => {
          arr.push(item.id)
        })
        obj = {
          source: this.rowSource,
          productId: arr.toString(),
          deductionProductId: this.deductionProductId,
          preferentialProductId: this.preferentialProductId,
          id: this.editId,
        }
         sourceProduct.push(obj)
      }
      if(sourceProduct.length<1){
        this.$Message.error("Please select the channel product binding relationship")
        return
      }
      saveSourceProduct({
        sourceProduct: sourceProduct
      }, (res: any) => {
        if (res.code == 0) {
          this.editModal=false
          this.handleTab(this.tabVal)
          this.$Message.success(res.msg)
        } else {
           this.editModal=false
          this.$Message.error(res.msg)
        }
      })
    }
    created() {
      this._getList()
      if (localStorage.getItem('role') == 'role_super_admin') {
        this.role = true
      } else {
        this.role = false
      }
    }
  }
</script>
<style>
  .addProduct {
    width: 100px;
   
    margin-bottom: 20px;
  }

  .allbox {
    border: 1px dashed #ccc;
    padding: 5px;
    margin-bottom: 20px;
    min-height: 60px;
  }

  .nowbox {
    border: 1px solid #ccc;
    padding: 5px;
    margin-bottom: 20px;
    min-height: 60px;
  }

  .list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    padding: 5px 12px;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 100px;
    height: 50px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
    text-align: center;
  }

  .list-complete-item.sortable-chosen {
    background: #4ab7bd;
  }

  .list-complete-item.sortable-ghost {
    background: #30b08f;
  }

  .undraggable {
    background-color: #ccc;
  }

  .md-close:hover {
    color: red;
  }

  .undraggable:hover {
    cursor: not-allowed;
  }

  .list-complete-enter,
  .list-complete-leave-active {
    opacity: 0;
  }
</style>
