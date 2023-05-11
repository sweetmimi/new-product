const lang = localStorage.getItem('lang') || 'en-id'
// const host = process.env.NODE_ENV === 'production' ? '/' : `/api/${lang}/`
const host = process.env.NODE_ENV === 'production' ? '/' : `/test/`
export const orderApi = {
  orderList: `${host}anjian/anjianList`,
  getChangeFollowUser: `${host}anjian/getChangeFollowUser`,
  changeFollowUser: `${host}anjian/changeFollowUser`,
  getHistoryList: `${host}anjian/getHistoryList`,
  getMyHistoryList: `${host}anjian/getMyHistoryList`,
  getBatchChangeFollowUser: `${host}anjian/getBatchChangeFollowUser`,
  batchChangeFollowUser: `${host}anjian/batchChangeFollowUserPost`,
  getcomment: `${host}task/getcomment`,
  getRecoveryRate: `${host}task/getRecoveryRate`,
  getProductId: `${host}select/getProductConf`,
  getGroupList: `${host}select/getGroup`,
}

export const taskApi = {
  lianxidianhua: `${host}task/getCallList`,
  baseInfo: `${host}task/getUserInfo`,
  orderInfo: `${host}task/getOrderInfo`,
  overdueList: `${host}task/getOverdueInfo`,
  getContactList: `${host}task/getContactList`,
  getContactInfo: `${host}task/getContactInfo`,
  saveCollecctRecord: `${host}task/setCuishouLog`,
  setContactInfo: `${host}task/setContactInfo`,
  dialCall: `${host}task/call`,
  hangUp: `${host}task/hangUp`,
  getCollectRecord: `${host}task/getCuishouLogList`,

  getCallList: `${host}task/getCallList`,
  getRepaymenPlanList: `${host}task/getRepaymentPlanList`,
  getCuiShouList: `${host}task/getCuiShouList`,
  myTaskList: `${host}task/myTaskList`,
  getApproveList: `${host}task/getApproveList`,
  getOperateList: `${host}task/getOperateList`,
  getContactTypeList: `${host}task/getContactTypeList`,
  getdaihouContactTypeList: `${host}daihoutask/getContactTypeList`,
  againGetContactList: `${host}task/againGetContactList`,
  phoneReview: `${host}task/GetPhoneReview`,
  performanceConfig: `${host}task/performanceConfig`,
  getPerformance: `${host}task/getPerformance`,

  getCallList: `${host}task/syncapprovecalllist`,

  // getConclusionHistory: `${host}task/syncapproveconclusionhistory`,
     getConclusionHistory: `${host}task/syncapproveconclusionhistory`,


     sendrepaymentcode: `${host}task/sendrepaymentcode`,
     getrepaymentrecordlist: `${host}task/getrepaymentrecordlist`,


    addSot: `${host}sopdot/addDot`,
    getBill: `${host}task/getBill `,
}

export const loginApi = {
  vcode: `${host}login/getVerifyCode`,
  login: `${host}login/login`,
  resetPassword: `${host}login/changePassword`,
  logout: `${host}login/loginOut`
}

export const userApi = {
  postUserInfo: `${host}user/postUserInfo`,
  listSelect: `${host}select/getSelect`,
  getUserList: `${host}user/getUserList`,
  getUserInfo: `${host}user/getUserInfo`
}

export const messageApi = {
  getMsgList: `${host}message/getMsgList`,
  sendMsg: `${host}message/sendMsg`,
  getMsgContent: `${host}message/getMsgContent`
}

export const daihoutaskApi = {
  myTaskList: `${host}daihoutask/myTaskList`,
  myHistoryList: `${host}daihoutask/getMyHistoryList`,


  daihouLogList: `${host}daihoutask/getDaihouLogList`,

  getdaihoutasklist: `${host}task/getdaihoutasklist`,

  getIvrLogList: `${host}ivrtask/getIvrLogList`,


getCuishouIvrLogList: `${host}ivrtask/getCuishouIvrLogList`,


  daihouTaskList: `${host}daihoutask/DaihouTaskList`,

IvrTaskList: `${host}ivrtask/IvrTaskList`,
  saveDaiHouLog: `${host}daihoutask/saveDaiHouLog`,
  getFollowUser: `${host}daihoutask/getBatchChangeFollowUser`,
  saveFollowUser: `${host}daihoutask/batchChangeFollowUserPost`,

  rolloverInfo: `${host}daihoutask/getorderhistory`,
}

export const datareportApi = {
  cumulativeData: `${host}collectcount/CollecterList`,
  getsearchnamelist: `${host}achievement/getsearchnamelist`,
  achievement: `${host}achievement/list`,

  daihoulist:`${host}achievement/daihoulist `,
 daihoutaskornamelist:`${host}achievement/daihoutaskornamelist`,


 cuishoustafflist: `${host}user/getcuishoustafflist`,

 usertaskstatuslist: `${host}user/getusertaskstatuslist`,

 daihoustafflist: `${host}user/getdaihoustafflist`,


 allfollowertaskstatuslist: `${host}daihoutask/getallfollowertaskstatuslist`,

contactHeader: `${host}contact/getuser`,
contactList: `${host}contact/list`,
contactHistoryList: `${host}contact/historylist`,

}
