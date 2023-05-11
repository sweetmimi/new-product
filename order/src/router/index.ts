import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () =>
  import(/* webpackChunkName: "home" */ '@/components/Home.vue')
const Login = () =>
  import(/* webpackChunkName: "login" */ '@/components/Login.vue')
const ResetPassword = () =>
  import(
    /* webpackChunkName: "ResetPassword" */ '@/components/ResetPassword.vue'
  )
const Base = () =>
  import(/* webpackChunkName: "base" */ '@/components/Base.vue')

const LoanList = () =>
  import(/* webpackChunkName: "LoanList" */ '@/components/Loan/List.vue')
const LoanDetail = () =>
  import(/* webpackChunkName: "LoanDetail" */ '@/components/Loan/Detail.vue')

const CustomerList = () =>
  import(
    /* webpackChunkName: "CustomerList" */ '@/components/Customer/List.vue'
  )
const CustomerDetail = () =>
  import(
    /* webpackChunkName: "CustomerDetail" */ '@/components/Customer/Detail.vue'
  )
const OrderList = () =>
  import(/* webpackChunkName: "OrderList" */ '@/components/Order/List.vue')
const OrderDetail = () =>
  import(/* webpackChunkName: "OrderDetail" */ '@/components/Order/Detail.vue')
const VaDetail = () =>
  import('@/components/Operate/VaDetail.vue')
  // fdcList
const fdcList = () =>
  import('@/components/Operate/fdcList.vue')


const repayCharge = () =>
  import('@/components/repay/repayCharge.vue')

const AccountList = () =>
  import(
    /* webpackChunkName: "AccountList" */ '@/components/Operate/AccountList.vue'
  )

const InsmAccounList = () =>
  import(
     '@/components/Operate/InsmAccounList.vue'
  )
const EnterOrder = () =>
  import(
    /* webpackChunkName: "EnterOrder" */ '@/components/Operate/EnterOrder.vue'
  )

const Negotiate = () =>
  import(
    /* webpackChunkName: "EnterOrder" */ '@/components/Operate/Negotiate.vue'
  )
const ProductList = () =>
  import(
    /* webpackChunkName: "ProductList" */ '@/components/Operate/ProductList.vue'
  )

const LinkManagement = () =>
  import(
    /* webpackChunkName: "ProductList" */ '@/components/Operate/linkManagement.vue'
  )
const ProductConfig = () =>
  import(
    '@/components/Operate/ProductConfig.vue'
  )

const addProduct = ()=>
  import('@/components/Operate/addProduct.vue')

const seeProduct = () =>
  import(
    '@/components/Operate/SeeProduct.vue'
  )

const productHistory = () =>
  import(
    '@/components/Operate/productHistory.vue'
  )

const productVersion = () =>
  import(
    '@/components/Operate/productVersion.vue'
  )

const Transferaccounts = () =>
  import(
     '@/components/Operate/Transferaccounts.vue'
  )

  const vestBag = () =>
  import(
   '@/components/Operate/vestBag.vue'
  )

const APKManagement = () =>
  import(
   '@/components/Operate/APKManagement.vue'
  )

const reloanRecall = () =>
  import(
    '@/components/Operate/reloanRecall.vue'
  )
//appPush
const appPush = () =>
  import(
    '@/components/Operate/appPush.vue'
  )
//group
const group = () =>
  import(
    '@/components/Operate/systemAccount/group.vue'
  )

const scriptSet = () =>
  import(
    '@/components/Operate/scriptSet.vue'
  )

const rdlList = () =>
  import(
    '@/components/Operate/rdlList.vue'
  )

const coupon = () =>
  import(
    '@/components/Operate/coupon.vue'
  )

const bankList = () =>
  import(
    '@/components/Operate/bankList.vue'
  )

const commonLoanSet = () =>
  import(
    '@/components/Operate/commonLoan/set.vue'
  )
const commonLoanUser = () =>
  import(
    '@/components/Operate/commonLoan/user.vue'
  )

const withdrawalVerification = () =>
import(
  '@/components/Operate/withdrawal/verification.vue'
)

const IncomingFeatureList = () =>
  import(
    '@/components/DataReport/IncomingFeatureList.vue'
  )

const CashFlowList = () =>
  import(
    '@/components/DataReport/CashFlowList.vue'
  )

const ConversionRateList = () =>
  import(
   '@/components/DataReport/ConversionRateList.vue'
  )


  const ConversionTable = () =>
  import(
   '@/components/DataReport/conversionTable/conversionTable.vue'
  )
   const incomelist = () =>
  import(
     '@/components/DataReport/conversionTable/incomelist.vue'
  )
 const repaymentlist = () =>
  import(
     '@/components/DataReport/conversionTable/repaymentlist.vue'
  )
const PreLoanPerformList = () =>
  import(
   '@/components/DataReport/PreLoanPerformList.vue'
  )
const ChannelBuyDataList = () =>
  import(
   '@/components/DataReport/ChannelBuyDataList.vue'
  )

const Statistics = () =>
  import(
    '@/components/DataReport/EverydayStatistics.vue'
  )

const RecoveryRate = () =>
  import(
     '@/components/DataReport/RecoveryRate.vue'
  )

const incomingDate = () =>
  import(
  '@/components/DataReport/IncomingDateData/index.vue'
  )
const incomingDateAmountData = () =>
  import(
     '@/components/DataReport/IncomingDateData/MoneyData.vue'
  )
const incomingDateNumberData = () =>
  import(
     '@/components/DataReport/IncomingDateData/NumberData.vue'
  )
const incomingDateProfitData = () =>
  import(
   '@/components/DataReport/IncomingDateData/ProfitData.vue'
  )
const expireDate = () =>
  import(
    /* webpackChunkName: "incomingDateNumberData" */ '@/components/DataReport/ExpireDateData/index.vue'
  )

const expireDateTable = () =>
  import('@/components/DataReport/ExpireDateTable.vue')
const expireDateAmountData = () =>
  import(
     '@/components/DataReport/ExpireDateData/MoneyData.vue'
  )
const expireDateNumberData = () =>
  import(
    /* webpackChunkName: "incomingDateNumberData" */ '@/components/DataReport/ExpireDateData/NumberData.vue'
  )
const expireDateProfitData = () =>
  import(
    /* webpackChunkName: "incomingDateProfitData" */ '@/components/DataReport/ExpireDateData/ProfitData.vue'
  )

const lostRateTable = () => import('@/components/DataReport/lostRateTable/index.vue' )
const lostRate = () => import('@/components/DataReport/lostRateTable/lostRate.vue')
const lostUser = () => import('@/components/DataReport/lostRateTable/lostUser.vue')
const ableUser = () => import('@/components/DataReport/lostRateTable/ableUser.vue')
const ableHistory = () => import('@/components/DataReport/lostRateTable/ableHistory.vue')

const FinanceData = () => import('@/components/DataReport/FinanceData.vue')


//
const dailyData = () =>
  import(
    /* webpackChunkName: "dailyData" */ '@/components/DataReport/DailyData.vue'
  )
const dailyDataNew = () =>
  import(
    /* webpackChunkName: "dailyData" */ '@/components/DataReport/DailyDataNew.vue'
  )


const ActualData = () =>
  import(
    /*webpackChunkName: "incomingDateNumberData" */ '@/components/DataReport/ActualData.vue'
  )


const OrderQealtime = () =>
  import(
    /* webpackChunkName: "OrderQealtime" */ '@/components/DataReport/OrderQealtime.vue'
  )

const lendingRates = () =>
  import(
     '@/components/DataReport/lendingRates.vue'
  )

const lendingRates2 = () =>
  import(
    '@/components/DataReport/lendingRates2.vue'
  )

const ApiDataDocking = () =>
  import(
    '@/components/DataReport/ApiDataDocking.vue'
  )

const profitData = () =>
  import(
    '@/components/DataReport/profitData.vue'
  )

const repayPlanList = () =>
  import(
    '@/components/DataReport/repayPlanList.vue'
  )

const loanProfit = () =>
  import(
    '@/components/DataReport/loanProfit.vue'
  )


const repayWish = () =>
  import(
    '@/components/DataReport/repayWish.vue'
  )


const loanMonitor = () => import(
  '@/components/DataReport/loanMonitor.vue'
)


const PNLtableData = () => import(
  '@/components/DataReport/PNLtableData.vue'
)

const AccountProfit = () => import(
  '@/components/DataReport/AccountProfit.vue'
)
// 404
const NotFound = () =>
  import(/* webpackChunkName: "NoFound" */ '@/components/NotFound.vue')


const TextQuery = () =>
  import(
    /* webpackChunkName: "TextQuery" */  '@/components/systemMonitoring/textQuery.vue'
  )



const UserMatching = () =>
  import(
    /* webpackChunkName: "UserMatching" */ '@/components/systemMonitoring/userMatching.vue'
  )

const Smsarriverate = () =>
  import(
    /* webpackChunkName: "UserMatching" */ '@/components/systemMonitoring/smsarriverate.vue'
  )

const Codearriverate = () =>
  import(
    /* webpackChunkName: "UserMatching" */ '@/components/systemMonitoring/codearriverate.vue'
  )

const WhitelistMonitoring = () =>
  import(
    /* webpackChunkName: "UserMatching" */ '@/components/systemMonitoring/whitelistMonitoring.vue'
  )

const whitelistRecharge = () =>
  import(
    /* webpackChunkName: "UserMatching" */ '@/components/systemMonitoring/whitelistRecharge.vue'
  )

const lenderBalance = () =>
  import(
    /* webpackChunkName: "UserMatching" */ '@/components/systemMonitoring/lenderBalance.vue'
  )

const exportBlackList= () =>
   import(
  '@/components/systemMonitoring/exportBlackList.vue'
)

const loginBlackList= () =>
   import(
  '@/components/systemMonitoring/loginBlackList.vue'
)

const launchData = () =>
  import(
    /* webpackChunkName: "lendingRates" */ '@/components/DataReport/launchData.vue'
  )

const RolloverDataSheet = () =>
  import(
    /* webpackChunkName: "lendingRates" */ '@/components/DataReport/RolloverDataSheet.vue'
  )


const Flowout = () =>
  import(
    /* webpackChunkName: "lendingRates" */ '@/components/systemMonitoring/Flowout.vue'
  )

//h0

const dueTimeErealData = () =>
  import(
   '@/components/systemMonitoring/dueTimeErealData.vue'
  )

const ErrorCountData = () =>
  import(
    '@/components/systemMonitoring/ErrorCountData.vue'
  )
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '*',
      name: 'noFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetPassword
    },
    {
      path: '/home',
      component: Base,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/loan',
      component: Base,
      children: [
        {
          path: 'loanlist',
          name: 'loanList',
          component: LoanList
        },
        {
          path: 'loandetail/:orderNo',
          name: 'loanDetail',
          component: LoanDetail
        },
      ]
    },
    {
      path: '/customer',
      component: Base,
      children: [
        {
          path: 'customerlist',
          name: 'customerList',
          component: CustomerList
        },
        {
          path: 'customerdetail/:id',
          name: 'customerDetail',
          component: CustomerDetail
        }
      ]
    },
    {
      path: '/order',
      component: Base,
      children: [
        {
          path: 'orderlist',
          name: 'orderList',
          component: OrderList
        },
        {
          path: 'orderdetail/:orderNo',
          name: 'orderDetail',
          component: OrderDetail
        },

      ]
    },
    {
      path: '/repay',
      component: Base,
      children: [
        {
          path: 'repayCharge',
          name: 'repayCharge',
          component: repayCharge
        },
    ]},
    {
      path: '/operate',
      component: Base,
      children: [
        {
          path: 'insmAccounList',
          name: 'insmAccounList',
          component: InsmAccounList
        },
        {
          path: 'accountlist',
          name: 'accountList',
          component: AccountList
        },
         {
           path: 'negotiate',
           name: 'negotiate',
           component: Negotiate
        },
        {
          path: 'enterorder',
          name: 'enterOrder',
          component: EnterOrder
        },
        {
          path: 'productlist',
          name: 'productList',
          component: ProductList
        },
        {
          path: 'linkManagement',
          name: 'linkManagement',
          component: LinkManagement
        },
        {
          path: 'transferaccounts',
          name: 'transferaccounts',
          component: Transferaccounts

        },
        {
           path: 'vestBag',
          name: 'vestBag',
          component: vestBag
        }, {
          path: 'APKManagement',
          name: 'APKManagement',
          component: APKManagement
        },
        {
          path: 'productconfig/:id/:is_commercial_product',
          name: 'productConfig',
          component: ProductConfig
        },
        {
          path:'addProduct',
          name: 'addProduct',
          component: addProduct
        },
        {
          path:'productHistory/:productId',
          name: 'productHistory',
          component: productHistory
        },
        {
          path: 'seeProduct/:productId',
          name: 'seeProduct',
          component: seeProduct
        },
        {
          path: 'productVersion/:productId/:version',
          name: 'productVersion',
          component: productVersion
        },
        {
          path:'reloanRecall',
          name:'reloanRecall',
          component: reloanRecall
        },
        {
          path:'appPush',
          name:'appPush',
          component: appPush
        },
        {
          path: 'group',
          name: 'group',
          component: group
        },
        {
          path: 'scriptSet',
          name: 'scriptSet',
          component: scriptSet
        },
        {
          path: 'rdlList',
          name: 'rdlList',
          component: rdlList
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon
        },
        {
          path: 'bankList',
          name: 'bankList',
          component: bankList
        },
        {
          path: 'commonLoanSet',
          name: 'commonLoanSet',
          component: commonLoanSet
        },
        {
          path: 'commonLoanUser',
          name: 'commonLoanUser',
          component: commonLoanUser
        },
        {
          path: 'VaDetail',
          name: 'VaDetail',
          component: VaDetail
        },
        {
          path: 'fdcList',
          name: 'fdcList',
          component: fdcList
        },
        {
          path: 'withdrawalVerification',
          name: 'withdrawalVerification',
          component: withdrawalVerification
        }
      ]
    },
    {
      path: '/datareport',
      component: Base,
      children: [
        {
          path: 'incomingFeatureList',
          name: 'incomingFeatureList',
          component: IncomingFeatureList
        },
        {
          path: 'conversionRateList',
          name: 'conversionRateList',
          component: ConversionRateList
        },
        {
           path: 'conversionTable',
          name: 'conversionTablet',
          component: ConversionTable,
           redirect: 'conversionTable/incomelist',
           children: [
             {
              path: 'incomelist',
              name: 'incomelist',
              component: incomelist
            },
            {
              path: 'repaymentlist',
              name: 'repaymentlist',
              component: repaymentlist
            }
          ]
        },
        {
          path: 'recoveryrate',
          name: 'recoveryRate',
          component: RecoveryRate
        },
        {
          path: 'incomingdate',
          name: 'incomingDate',
          component: incomingDate,
          redirect: 'incomingDate/numberdata',
          children: [
            {
              path: 'numberdata',
              name: 'incomingDateNumberData',
              component: incomingDateNumberData
            },
            {
              path: 'moneydata',
              name: 'incomingDateAmountData',
              component: incomingDateAmountData
            },
            {
              path: 'profitdata',
              name: 'incomingDateProfitData',
              component: incomingDateProfitData
            }
          ]
        },
        {
          path: 'expireDateTable',
          name: 'expireDateTable',
          component: expireDateTable
        },
        {
          path: 'expireDate',
          name: 'expireDate',
          component: expireDate,
          redirect: 'expireDate/numberdata',
          children: [
            {
              path: 'numberdata',
              name: 'expireDateNumberData',
              component: expireDateNumberData
            },
            {
              path: 'moneydata',
              name: 'expireDateAmountData',
              component: expireDateAmountData
            },
            {
              path: 'profitdata',
              name: 'expireDateProfitData',
              component: expireDateProfitData
            }
          ]
        },

        {
          path: 'statistics',
          name: 'erverydayStatistics',
          component: Statistics
        },
        {
          path: 'cashFlowList',
          name: 'cashFlowList',
          component: CashFlowList
        },
        {
          path: 'preLoanPerformList',
          name: 'preLoanPerformList',
          component: PreLoanPerformList
        },
        {
          path: 'channelBuyDataList',
          name: 'channelBuyDataList',
          component: ChannelBuyDataList
        },
        {
          path: 'dailyData',
          name: 'dailyData',
          component: dailyData
        },
        {
          path: 'dailyDataNew',
          name: 'dailyDataNew',
          component: dailyDataNew
        },
        {

          path: 'actualData',
          name: 'actualData',
          component: ActualData
        },

        {
          path: 'orderQealtime',
          name: 'orderQealtime',
          component: OrderQealtime
        },

        {
          path: 'lendingRates',
          name: 'lendingRates',
          component: lendingRates
        },

        {
          path: 'lendingRates2',
          name: 'lendingRates2',
          component: lendingRates2
        },

        {
          path: 'launchData',
          name: 'launchData',
          component: launchData
        },
        {
          path: 'rolloverDataSheet',
          name: 'rolloverDataSheet',
          component: RolloverDataSheet

        },
        {
          path: 'apiDataDocking',
          name: 'apiDataDocking',
          component: ApiDataDocking
        },
        {
          path: 'profitData',
          name: 'profitData',
          component: profitData
        },
        {
          path: 'repayPlanList',
          name: 'repayPlanList',
          component: repayPlanList
        },
        {
          path: 'loanProfit',
          name: 'loanProfit',
          component: loanProfit
        },
        {
          path: 'repayWish',
          name: 'repayWish',
          component: repayWish
        },
        {
          path:'loanMonitor',
          name: 'loanMonitor',
          component: loanMonitor,
        },
        {
          path: 'PNLtableData',
          name: 'PNLtableData',
          component: PNLtableData,
        },
        {
          path: 'FinanceData',
          name: 'FinanceData',
          component: FinanceData
        },

        {
          path: 'lostRateTable',
          name: 'lostRateTable',
          component: lostRateTable,
          redirect: 'lostRateTable/lostRate',
          children: [
            {
              path: 'lostRate',
              name: 'lostRate',
              component: lostRate
            },
            {
              path: 'lostUser',
              name: 'lostUser',
              component: lostUser
            },
            {
              path: 'ableUser',
              name: 'ableUser',
              component: ableUser
            },
            {
              path: 'ableHistory',
              name: 'ableHistory',
              component: ableHistory
            }
          ]
        },
        {
          path:'AccountProfit',
          name: 'AccountProfit',
          component: AccountProfit
        }
      ]
    },
    {

      path: '/systemMonitoring',
      component: Base,
      children: [
        {
          path: 'textQuery',
          name: 'textQuery',
          component: TextQuery
        },
        {
          path: 'userMatching',
          name: 'userMatching',
          component: UserMatching
        },
        {
          path: 'smsarriverate',
          name: 'smsarriverate',
          component: Smsarriverate
        },
        {
          path: 'codearriverate',
          name: 'codearriverate',
          component: Codearriverate
        },
        {
          path: 'whitelistMonitoring',
          name: 'whitelistMonitoring',
          component: WhitelistMonitoring
        },
        {
          path: 'whitelistRecharge',
          name: 'whitelistRecharge',
          component: whitelistRecharge
        },
        {
          path: 'flowout',
          name: 'flowout',
          component: Flowout
        },
        {
          path:'dueTimeErealData',
          name:'dueTimeErealData',
          component: dueTimeErealData
        },
        {
          path: 'ErrorCountData',
          name: 'ErrorCountData',
          component: ErrorCountData
        },
        {
          path:'lenderBalance',
          name: 'lenderBalance',
          component: lenderBalance
        },
        {
          path: 'exportBlackList',
          name: 'exportBlackList',
          component: exportBlackList
        },
        {
          path: 'loginBlackList',
          name: 'loginBlackList',
          component: loginBlackList

        }
      ]
    }

  ]
})
