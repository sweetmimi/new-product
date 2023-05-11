import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = r => require.ensure([], () => r(require('@/components/home'), 'home'))
const CustomerList = r => require.ensure([], () => r(require('@/components/customerList'), 'customerList'))
const UserList = r => require.ensure([], () => r(require('@/components/UserList'), 'userList'))
const Base = r => require.ensure([], () => r(require('@/components/Base'), 'base'))
const ApprovalList = r => require.ensure([], () => r(require('@/components/ApprovalList'), 'approvalList'))
const ApprovalDetail = r => require.ensure([], () => r(require('@/components/ApprovalDetail'), 'approvalDetail'))
const TaskList = r => require.ensure([], () => r(require('@/components/TaskList'), 'taskList'))
const TaskHistory = r => require.ensure([], () => r(require('@/components/TaskHistory'), 'taskHistory'))

const personCheck = r => require.ensure([], () => r(require('@/components/personCheck'), 'personCheck'))

const LoanList = r => require.ensure([], () => r(require('@/components/Loan/List.vue'), 'LoanList'))
const LoanDetail = r => require.ensure([], () => r(require('@/components/Loan/Detail.vue'), 'LoanList'))

const ApprovaLoverallDataList = r => require.ensure([], () => r(require('@/components/datareport/ApprovaLoverallDataList'), 'approvaLoverallDataList'))

const lenderInfo = r => require.ensure([], () => r(require('@/components/lenderInfo'), 'lenderInfo'))

const singInfo = r => require.ensure([], () => r(require('@/components/sing/singInfo'), 'singInfo'))

const invalid = r => require.ensure([], () => r(require('@/components/sing/invalid'), 'invalid'))
const lenderOrder = r => require.ensure([], () => r(require('@/components/sing/lenderOrder'), 'lenderOrder'))
const borrowerOrder = r => require.ensure([], () => r(require('@/components/sing/borrowerOrder'), 'borrowerOrder'))
const loanOrder = r => require.ensure([], () => r(require('@/components/sing/loanOrder'), 'loanOrder'))
const amountStatistics = r => require.ensure([], () => r(require('@/components/lender/amountStatistics'), 'amountStatistics'))
const monthReport = r => require.ensure([], () => r(require('@/components/lender/monthReport'), 'monthReport'))

const financialAccount = r => require.ensure([], () => r(require('@/components/financial/account'), 'financialAccount'))
const financialConfig = r => require.ensure([], () => r(require('@/components/financial/config'), 'financialConfig'))


const ResetPassword = r => require.ensure([], () => r(require('@/components/ResetPassword'), 'resetPassword'))
const Login = r => require.ensure([], () => r(require('@/components/Login'), 'login'))
const NoFound = r => require.ensure([], () => r(require('@/components/noFound'), 'noFound'))

export default new Router({
  mode: 'hash',
  routes: [{
      path: '*',
      name: 'NoFound',
      component: NoFound,
      redirect: '/noFound'
    },
    {
      path: '/',
      name: 'index',
      redirect: 'login'
    },
    {
      path: '/home',
      name: 'home',
      component: Base,
      children: [{
        path: 'myHome',
        name: 'home',
        component: Home
      },
     {
       path: 'lenderInfo',
       name: 'lenderInfo',
       component: lenderInfo
     },
     {
      path: 'monthReport',
      name: 'monthReport',
      component: monthReport
    },]
    },
    {
      path: '/management',
      name: 'management',
      component: Base,
      children: [
        {
        path: 'userlist',
        name: 'userlist',
        component: UserList
        },
        {
          path: 'customerList',
          name: 'customerList',
          component: CustomerList
        },
    ]
    },
    {
      path: '/approval',
      name: 'approval',
      component: Base,
      children: [
        {
          path: 'list',
          name: 'approvalList',
          component: ApprovalList
        },
        {
          path: 'detail/:approveId',
          name: 'detail',
          component: ApprovalDetail
        },
        {
          path: 'loanlist',
          name: 'loanList',
          component: LoanList
        },
        {
          path: 'loandetail/:orderNo',
          name: 'loanDetail',
          component: LoanDetail
        }
    ]
  },
  {
    path: '/task',
    name: 'task',
    component: Base,
    children: [{
      path: 'list',
      name: 'tasklist',
      component: TaskList
    },
    {
      path: 'history',
      name: 'history',
      component: TaskHistory
    },
    {
      path: 'personCheck',
      name: 'personCheck',
      component: personCheck,
    },


    ]
  },
  {
    path: '/datareport',
    name: 'datareport',
    component: Base,
    children: [{
      path: 'approvedata',
      name: 'approvedata',
      component: ApprovaLoverallDataList
    }]
  },
  {
    path: '/sing',
    name: 'sing',
    component: Base,
    children: [{
      path: 'invalid',
      name: 'invalid',
      component: invalid
    },
    {
      path: 'lenderOrder',
      name: 'lenderOrder',
      component: lenderOrder
    },
    {
      path: 'borrowerOrder',
      name: 'borrowerOrder',
      component: borrowerOrder,
    },
    {
      path: 'loanOrder',
      name: 'loanOrder',
      component: loanOrder,
    },
    {
      path: 'singInfo',
      name: 'singInfo',
      component: singInfo,
    },
    ]
  },
  {
    path: '/lender',
    name: 'lender',
    component: Base,
    children: [{
      path: 'amountStatistics',
      name: 'amountStatistics',
      component: amountStatistics
    },]
  },
  {
    path: '/financial',
    name: 'financial',
    component: Base,
    children: [
      {
        path: 'account',
        name: 'account',
        component: financialAccount
      },
      {
        path: 'config',
        name: 'config',
        component: financialConfig
      },
     
  ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/resetpassword',
    name: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '/nofound',
    name: 'noFound',
    component: NoFound
  }
  ]
})
