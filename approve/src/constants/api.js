// const lang = localStorage.getItem('lang') || 'id-ID'
// const host = process.env.NODE_ENV === 'production' ? '/' : `/api/${lang}/`
// const host = '/test/'
const host = '/'
export const homeApi = {
  getva: `${host}dashboard/getva`,
  createva: `${host}dashboard/createva`,
  show: `${host}approve/getlenderamountdetail`,
  withdraw: `${host}dashboard/withdraw`,
  getlendinfo: `${host}approve/getlendinfo`,
  lenderData: `${host}approve/getlenderamountlist`,
  getallbalance: `${host}dashboard/getallbalance`,
  getMonthReport: `${host}report/getreport`,
}

export const taskApi = {
  taskList: `${host}approve/mylist`,
  historyTaskList: `${host}approve/myhistorylist`
}
export const orderApi = {
  select: `${host}order/select`,
  info: `${host}order/info`,
  list: `${host}order/list`,
  retryLoan: `${host}order/retryloan`,
  loanFail: `${host}order/loanfail`,
  getchannel: `${host}order/getchannel`,
}
export const userApi = {
  vcode: `${host}user/getverifycode`,
  login: `${host}user/login`,
  resetPassword: `${host}user/resetpassword`,
  logout: `${host}user/logout`,
  listSelect: `${host}user/listselect`,
  getUserList: `${host}user/list`,
  operateAction: `${host}user/check`,
  editExtnumber: `${host}user/save`,
  statuscheck: `${host}user/statuscheck`,
  setOnline: `${host}user/online`,
  downloadlist: `${host}user/downloadlist`,
  getcustomer: `${host}approve/getcustomer`,
  destroycustomer: `${host}approve/destroycustomer`,
}

export const approvalApi = {
  getList: `${host}approve/list`,
  checkchangeuser: `${host}approve/checkchangeuser`,
  savecheckuser: `${host}approve/changeUser`,
  getBaseInfo: `${host}approve/operate`,
  getAssociatedOrder: `${host}approve/getDuplicateInfo`,
  getCallList: `${host}approve/calllist`,
  getMsgList: `${host}approve/messagelist`,
  getConclusionHistory: `${host}approve/conclusionHistory`,
  getSaveConclusion: `${host}approve/conclusion`,
  getMidStatusList: `${host}approve/midstatuslist`,
  saveApprove: `${host}approve/saveapprove`,
  saveMidStatus: `${host}approve/savemidstatus`,
  showSendMsg: `${host}approve/showsendmsg`,
  sendMsg: `${host}approve/sendmsg`,
  getConfigList: `${host}approve/config`,
  dialCall: `${host}approve/makecall`,
  hangUp: `${host}approve/cancelcall`,
  getPhoneReview: `${host}approve/getphonereview`,
  savePhoneReview: `${host}approve/savephonereview`,
  genbulksign: `${host}approve/genbulksign`,
  getauthorization: `${host}approve/operate`,

  getuseremergsrelations: `${host}approve/getuseremergsrelations`,
  getapplyinfodetailsemergs: `${host}approve/getapplyinfodetailsemergs`,
  updateapplyinfoemergs: `${host}approve/updateapplyinfoemergs`,
  deleteapplyinfoemergs: `${host}approve/deleteapplyinfoemergs`,

  getfdcorderinfo: `${host}approve/getfdcorderinfo`,

  manualapprovelist: `${host}approve/manualapprovelist`,
  commitapproveconclusion: `${host}approve/commitapproveconclusion`,
  delemergecontact: `${host}order/delemergecontact`,
  // sing
  getSingList: `${host}approve/signtasks`,
  getsignpage: `${host}approve/getsignpage`,
  commitsign: `${host}approve/commitsign`,
  apiBatchsign: `${host}approve/batchsign`,
  apiBatchInsurance: `${host}approve/initiateinsurance`,
  apiUnBatchInsurance: `${host}approve/cancelInitiateinsurance`,
}

export const dataReportApi = {
  getList: `${host}report/approvedata`
}
export const singApi = {
  getList: `${host}order/orderlist`
}

export const financeApi = {
  financeGetaccount: `${host}finance/getaccount`,
  financeGetrdlamount: `${host}finance/getrdlamount`,
  financeSaveaccount: `${host}finance/saveaccount`,
  financeRemitrecord: `${host}finance/remitrecord`,
  financeApplyremit: `${host}finance/applyremit`,
}
