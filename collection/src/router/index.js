import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// base block
const Base = r => require.ensure([], () => r(require('@/components/Base'), 'base'))

// system block
const UserList = r => require.ensure([], () => r(require('@/components/system/UserList'), 'userList'))
const AccountList = r => require.ensure([], () => r(require('@/components/system/AccountList'), 'accountList'))
// order block

const OrderCase = r => require.ensure([], () => r(require('@/components/order/OrderCase'), 'orderCase'))
const OrderHistory = r => require.ensure([], () => r(require('@/components/order/OrderHistory'), 'orderHistory'))
const LoanedList = r => require.ensure([], () => r(require('@/components/order/LoanedList'), 'LoanedList'))



const loaneduvl = r => require.ensure([], () => r(require('@/components/order/LoaneduvlList'), 'loaneduvl'))
const TaksRecovery = r => require.ensure([], () => r(require('@/components/order/TaksRecovery'), 'TaksRecovery'))


//task block

//task block
const Task = r => require.ensure([], () => r(require('@/components/task/Task'), 'task'))
const TaskOrder = r => require.ensure([], () => r(require('@/components/task/TaskHistory'), 'taskHistory'))
const LoanedTask = r => require.ensure([], () => r(require('@/components/task/LoanedTask'), 'LoanedTask'))
const LoanedTaskHistory = r => require.ensure([], () => r(require('@/components/task/LoanedTaskHistory'), 'LoanedTaskHistory'))
const Performance = r => require.ensure([], () => r(require('@/components/task/Performance'), 'Performance'))

const taskRecycle = r => require.ensure([], () => r(require('@/components/task/taskRecycle'), 'taskRecycle'))
const taskRecycleTotal = r => require.ensure([], () => r(require('@/components/task/taskRecycleTotal'), 'taskRecycleTotal'))


const TaskDetail = r => require.ensure([], () =>
  r(require('@/components/collection/TaskDetail'), 'TaskDetail'))




const LoanedDetail = r => require.ensure([], () =>
  r(require('@/components/loaned/LoanedDetail'), 'loanedDetail'))

const LoanedUvlDetail = r => require.ensure([], () =>
  r(require('@/components/loaned/LoanedUvlDetaila'), 'LoanedUvlDetaila'))


const collectionStatistics = r => require.ensure([], () => r(require('@/components/datareport/CollectionStatistics'), 'collectionStatistics'))

const collectionSOPprocess = r => require.ensure([], () => r(require('@/components/datareport/collectionSOPprocess'), 'collectionSOPprocess'))
const cargoTasksMonitoring = r => require.ensure([], () => r(require('@/components/datareport/cargoTasksMonitoring'), 'cargoTasksMonitoring'))

const repayWish = r => require.ensure([], () => r(require('@/components/datareport/repayWish'), 'repayWish'))


const taskPhase = r => require.ensure([], () => r(require('@/components/datareport/taskPhase '), 'taskPhase'))

// other
const Login = r => require.ensure([], () => r(require('@/components/Login'), 'login'))
const ResetPassword = r => require.ensure([], () => r(require('@/components/ResetPassword'), ''))
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
      path: '/management',
      name: 'management',
      component: Base,
      children: [{
        path: 'userlist',
        name: 'userlist',
        component: UserList
      },
     {
       path: 'accountList',
       name: 'accountList',
       component: AccountList
     }]
    },
    {
      path: '/order',
      name: 'order',
      component: Base,
      children: [{
          path: 'case',
          name: 'case',
          component: OrderCase
        },
        {
          path: 'history',
          name: 'history',
          component: OrderHistory
        },
        {
          path: 'loaned',
          name: 'loaned',
          component: LoanedList
        }, {
          path: 'loaneduvl',
          name: 'loaneduvl',
          component: loaneduvl
        },
        {
          path: 'TaksRecovery',
          name: 'TaksRecovery',
          component: TaksRecovery
        }

      ]
    },


    {
      path: '/task',
      name: 'task',
      component: Base,
      children: [{
          path: 'tasklist',
          name: 'tasklist',
          component: Task
        },
        {
          path: 'taskdetail',
          name: 'taskdetail',
          component: TaskDetail
        },


        {
          path: 'taskorder',
          name: 'taskorder',
          component: TaskOrder
        },
        {
          path: 'loanedlist',
          name: 'loanedlist',
          component: LoanedTask
        },
        {
          path: 'loaneddetail',
          name: 'loaneddetail',
          component: LoanedDetail
        },
        {
          path: 'loanedUvldetail',
          name: 'loanedUvldetail',
          component: LoanedUvlDetail
        },
        {
          path: 'loanedhistory',
          name: 'loanedhistory',
          component: LoanedTaskHistory
        },
        {
          path: 'performance',
          name: 'performance',
          component: Performance
        }, {
          path: 'taskPhase',
          name: 'taskPhase',
          component: taskPhase
        },
        {
          path: 'taskRecycle',
          name: 'taskRecycle',
          component: taskRecycle
        },
        {
          path: 'taskRecycleTotal',
          name: 'taskRecycleTotal',
          component: taskRecycleTotal
        }
      ]
    },
    {
      path: '/datareport',
      name: 'datareport',
      component: Base,
      children: [{
        path: 'collectionStatistics',
        name: 'collectionStatistics',
        component: collectionStatistics
      }, {
        path: 'collectionSOPprocess',
        name: 'collectionSOPprocess',
        component: collectionSOPprocess
      }
      , {
        path: 'cargoTasksMonitoring',
        name: 'cargoTasksMonitoring',
        component: cargoTasksMonitoring
      },
      {
        path: 'repayWish',
        name: 'repayWish',
        component: repayWish
      }

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
