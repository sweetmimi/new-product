const lang = localStorage.getItem('lang') || 'id-ID'
// const host = process.env.NODE_ENV === 'production' ? '/' : `/api/${lang}/`
const host = '/'

export const siteApi = {
login: `${host}site/login`,
logout: `${host}site/logout`,
getVerifyCode: `${host}site/getVerifyCode`,
changePassword: `${host}site/changepass`,
SwitchMessages: `${host}statsduedate/smsstate`
}

export const customerApi = {
getList: `${host}customer/list`,
getDetail: `${host}customer/detail`,
destroy: `${host}customer/destroy`,
}

export const investorApi = {
changeBalance: `${host}investor/changebalance`
}

export const negotiationApi = {
    searchNegotion: `${host}negotiation/nego`, //search
    dropCode: `${host}negotiation/dropcode` ,//
    bankList: `${host}negotiation/banklist`,//
    generateCode: `${host}negotiation/generatecode`,//
    sendSms: `${host}negotiation/sendsms`,// 
}

export const lenderApi = {
    list: `${host}lender/list`,
    edit: `${host}lender/edit`,
    profit:`${host}lender/profit`,
    getlenderbalance: `${host}monitor/getlenderbalance`,
    savelendersort: `${host}monitor/savelendersort`,
    switchlenderaccount: `${host}monitor/switchlenderaccount`,
}

export const whitelistApi = {
    whitelistIndex: `${host}whitelist/index`, //search
    updatewhitelist: `${host}whitelist/update`, 
}

export const loanApi = {
info: `${host}loan/info`,
list: `${host}loan/list`,
ping: `${host}order/FlatAccount`,

opentransferaccount: `${host}loan/opentransferaccount`,

gettransferbanklist: `${host}loan/gettransferbanklist`,
changerransferbankinfo: `${host}loan/changetransferbankinfo`,

getfdcorderinfo: `${host}order/getcreditscore`,

savecomment: `${host}order/savecomment`,

commitinsure: `${host}order/commitinsure`,

loancert: `${host}loan/loancert`,
// FDC
FdcList: `${host}fdc/getlist`,
}

export const orderApi = {
info: `${host}order/info`,
list: `${host}order/list`,
retryLoan: `${host}order/retryloan`,
loanFail: `${host}order/loanfail`,
rolloverInfo: `${host}order/getorderhistory`,

apklinkmanage: `${host}package/apklinkmanage`,


}

export const repayApi = {
    getplanlist: `${host}repaymanage/getplanlist`,
    dropcode: `${host}repaymanage/dropcode`,
    repaysms: `${host}repaymanage/repaysms`,
    repay: `${host}repaymanage/repaysms`,
    option: `${host}repaymanage/getrepayoption`,
}
export const userApi = {
add: `${host}user/add`,
list: `${host}user/list`,
getAccountInfo: `${host}user/displaysaveuser`,

getUatasList: `${host}uatas/uataslist`,
    AddAdminLender: `${host}uatas/AddAdminLender`,

productconf: `${host}productconf/list`,

SaveProductConf: `${host}productconf/SaveProductConf `,

uatasRdlList: `${host}uatas/rdllist`,
uatasRdlAdd: `${host}uatas/addrdl`,
uatasLenderSelect: `${host}uatas/lenderselect`,
uatasBindrdl: `${host}uatas/bindrdl`,
}

export const groupApi = {
    groupLevel: `${host}cuishougroup/level `,
    groupList: `${host}cuishougroup/list `,
    groupSelect: `${host}cuishougroup/select `,
    groupEdit: `${host}cuishougroup/edit `,
    groupUpdate: `${host}cuishougroup/update `,
    groupStore: `${host}cuishougroup/store `,
    groupDestroy: `${host}cuishougroup/destroy `,
    groupLoglist: `${host}cuishougroup/loglist `,
    groupLogdetail: `${host}cuishougroup/logdetail `,
    groupProductids: `${host}productconf/list`,
}

export const selectApi = {
select: `${host}select/select`,

orderStatus: `${host}loan/list`
}

export const dashboardApi = {
getDashboard: `${host}dashboard/show`,
changeBalance: `${host}dashboard/changeBalance`,



Request: `${host}monitor/smsinfo`,
Smsarriverate: `${host}monitor/smsarriverate`,


Matching: `${host}monitor/usermatch`,

Fxiuser: `${host}superuser/fixuser`,

HistoricalData: `${host}dailycount/hisdata`,

Timeorder: `${host}realtimeorder/list`,

lendingRates: `${host}reloanrate/list`,

lendingRates2: `${host}reloanrate/listv1`,

getchannel: `${host}dailycount/getchannel`,


whitelistmonitor: `${host}monitor/whitelistmonitor`,

exportwhitelist: `${host}monitor/exportwhitelist`,

Codearriverate: `${host}monitor/phonecodearriverate`,

getApidocking: `${host}fdc/List`,

reloanrecall: `${host}reloanrate/exportdata`,
}

export const monitorApi = {
ApplyConfig: `${host}monitor/ApplyConfig`,
SaveConfig: `${host}monitor/SaveConfig`,
Blacklist: `${host}customer/blacklist`,
Blacksave: `${host}customer/blacksave`,
Blackremove: `${host}customer/blackremove`,

loginBlacklist: `${host}customer/loginblacklist`,
loginBlacklistsave: `${host}customer/loginblacksave`,
loginBlacklistremove: `${host}customer/loginblackremove`,
}

export const configApi = {
getProductList: `${host}config/list`,
saveProductConfig: `${host}config/SaveConfig`,
getProductConfig: `${host}config/GetConfigInfo`,
getsourceproduct: `${host}config/getsourceproduct`,
savesourceproduct: `${host}config/savesourceproduct`,
Downloadlink: `${host}order/aflink`,
innerlink: `${host}order/innerlink`,
productHistory: `${host}config/historylist`,
productVersionHistory: `${host}config/getconfiginfobyversion`,
getlistbychannel:`${host}productconf/getlistbychannel`,
SourceProductLog:`${host}config/getsourceproducthistory`,
SaveRolloverNewConf:`${host}config/SaveRolloverNewConf`,
}

export const dataReportApi = {
getEverydayStatistics: `${host}operatecount/list`,
getIncomingDateNumberData: `${host}vtgincome/list`,
getIncomingDateMoneyData: `${host}vtginmoney/list`,
getIncomingDateProfitData: `${host}Vtginprofitmoney/list`,
getExpireDateDataNumberData: `${host}statsduedate/list`,
getExpireDateDataMoneyData: `${host}statsduedate/amountlist`,
getExpireDateDataProfitData: `${host}statsduedate/profitmoney`,
getRecoverRateData: `${host}statsduedate/recoverylist`,

duetimeList: `${host}maturitydiameter/duetimeList`,

getReportProductConversion: `${host}reportproductconversion/list`,

getchannel: `${host}reportproductconversion/getchannel`,

Duetodiameterexcel: `${host}statsduedate/daochu`,
getReportFinance: `${host}reportfinance/list`,
getChannelBuyData: `${host}reportoperationchannel/list`,
getDailyData: `${host}dailycount/datashow`,
getDailyDataNew: `${host}dailycount/datashowv1`,
getDailyNowdata: `${host}reportproductconversion/nowdata`,

incomelist: `${host}reportproductconversion/incomelist`,

rtincomelist: `${host}reportproductconversion/rtincomelist`,


repaymentlist: `${host}reportproductconversion/repaymentlist`,

rtrepaymentlist: `${host}reportproductconversion/rtrepaymentlist`,

getappchannel: `${host}reportproductconversion/getappchannel`,

getRepayList: `${host}plan/list`,

loanapertureprofit: `${host}loan/loanapertureprofit`,

loanapertureprofitcollect: `${host}loan/loanapertureprofitcollect`,

duetimerealrangedata: `${host}plan/h0list`,

h0Amount: `${host}plan/h0amount`,

actualProfit: `${host}data-bg/profit/profit`,

contactHeader: `${host}contact/getuser`,
contactList: `${host}contact/list`,
contactHistoryList: `${host}contact/historylist`,

disconnectedRate: `${host}disconnected/rate`,
disconnectedCanRate: `${host}disconnected/canrate`,
disconnectedHisRate: `${host}disconnected/historyrate`,

finStorebill: `${host}finance/storebill`,
finWithdrawallist: `${host}finance/withdrawallist`,
finWdconfirm: `${host}finance/wdconfirm`,

errcodeList: `${host}errorcode/errcode`,
errcodeMap: `${host}errorcode/errcodemap`,

versionlist: `${host}errorcode/versionlist`,

amountoverdue: `${host}maturitydiameter/amountoverdue`,
//PNL
pnlreport: `${host}pnlreport/monthreport`,

accountprofit: `${host}lender/accountprofit`,
}
export const pushconfigApi = {
    list: `${host}pushconfig/list`,
    save: `${host}pushconfig/saveconf`,
}

export const retryconfigApi = {
    retryConfig: `${host}retryconfig/config`,
    retrySave: `${host}retryconfig/saveconfig`,
    retryRecord: `${host}retryconfig/record`,
}

export const usercoupon = {
    list: `${host}usercoupon/list`,
    add: `${host}usercoupon/add`,
    setstatus: `${host}usercoupon/setstatus`,
    option: `${host}coupon/list`
}
export const payconfigApi = {
    banklist: `${host}payconfig/banklist`,
    createbank: `${host}payconfig/createbank`,
    updatebank: `${host}payconfig/updatebank`,
    apiRemitTask:`${host}remit/tasks`,
    apiRemitCommitconclusion:`${host}remit/commitconclusion`,
}


export const moduleconfApi = {
    getinfobyname: `${host}moduleconf/getinfobyname`,
    savemoduleconf: `${host}moduleconf/savemoduleconf`,
}
