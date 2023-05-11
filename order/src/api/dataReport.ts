import axiosInstance from '@/interceptors/axios'
import { dataReportApi, dashboardApi, negotiationApi, lenderApi} from '@/constants/api'
import { QueryInfo, Result} from '@/constants/variableType'


export const getEverydayStatistics = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'get',
    url: dataReportApi.getEverydayStatistics,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getRecoverRateData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getRecoverRateData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getIncomingDateNumberData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getIncomingDateNumberData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getIncomingDateMoneyData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getIncomingDateMoneyData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getIncomingDateProfitData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getIncomingDateProfitData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getExpireDateDataNumberData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getExpireDateDataNumberData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getExpireDateDataMoneyData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getExpireDateDataMoneyData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getExpireDateDataProfitData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getExpireDateDataProfitData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const ApiExpireDateData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.duetimeList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const Reportgetchannel = (data: QueryInfo, callback: any) => {
         axiosInstance({
           method: 'get',
           url: dataReportApi.getchannel,
           data: data
         }).then((res: Result) => {
           callback(res)
         })
       }


export const getReportProductConversion = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getReportProductConversion,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const Duetodiameterexcel = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'get',
    url: dataReportApi.Duetodiameterexcel,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getReportFinance = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getReportFinance,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getChannelBuyData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getChannelBuyData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getDailyData = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'get',
    url: dataReportApi.getDailyData,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getDailyDataNew = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'get',
    url: dataReportApi.getDailyDataNew,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const getchannel = (data: QueryInfo, callback: any) => {
         axiosInstance({
           method: 'post',
           url: dashboardApi.getchannel,
           data: data
         }).then((res: Result) => {
           callback(res)
         })
       }

export const getDailyNowdata = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getDailyNowdata,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const getappchannel = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getappchannel,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const incomelist = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.incomelist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const rtincomelist = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.rtincomelist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const repaymentlist = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.repaymentlist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
  // tslint:disable-next-line:eofline
}


export const rtrepaymentlist = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.rtrepaymentlist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
// tslint:disable-next-line:eofline
}


// serach
export const searchNegotion = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: negotiationApi.searchNegotion,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const dropCodeNegotion = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: negotiationApi.dropCode,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
//bankListstore
export const bankListNegotion = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: negotiationApi.bankList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const getCodeNegotion = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: negotiationApi.generateCode,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const sendSmsNegotion = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: negotiationApi.sendSms,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const apilenderList = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: lenderApi.list,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apilenderEdit = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: lenderApi.edit,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apilenderProfit = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: lenderApi.profit,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const getRepayList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.getRepayList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}



export const apiLoanapertureprofit = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.loanapertureprofit,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiAllLoanapertureprofit = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.loanapertureprofitcollect,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const duetimerealrangedata = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.duetimerealrangedata,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const h0Amount = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.h0Amount,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const apiActualProfit = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.actualProfit,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}



export const apiContactHeader = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.contactHeader,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiContactList = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.contactList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiContactHistoryList = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.contactHistoryList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}



export const apiDisconnectedRate = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.disconnectedRate,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const apiDisconnectedCanRate = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.disconnectedCanRate, 
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiDisconnectedHisRate = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.disconnectedHisRate, 
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apifinStorebill = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.finStorebill,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apifinWithdrawallist = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.finWithdrawallist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apifinWdconfirm = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.finWdconfirm,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiErrcodeList = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.errcodeList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiErrcodeMap = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.errcodeMap,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiVersionlist = (data: QueryInfo, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.versionlist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const apiAmountoverdue = (data: any, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.amountoverdue, 
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const apiPnlreport = (data: any, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.pnlreport,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const apiAccountprofit = (data: any, callback: any) => {
  axiosInstance({
    method: 'post',
    url: dataReportApi.accountprofit,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
