import axiosInstance from '@/interceptors/axios'
import { userApi, taskApi, approvalApi } from '@/constants/api'


export const gethistoryTaskList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.historyTaskList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getTaskList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.taskList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getVcode = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.vcode,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const login = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.login,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const resetPassword = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.resetPassword,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const logOut = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.logout,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getOverdueList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.overdueList,
    data: data,
    // responseType: 'json'
  })
    .then((res) => {
      callback(res)
    })
}


export const getCollectFollowUpList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.collectFollowUpList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const updateContract = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.updateContract,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getConfigList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.configList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const saveCollecctRecord = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.saveCollecctRecord,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const dialCall = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.dialCall,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const hangUp = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.hangUp,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getcCollectRecord = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: taskApi.collectRecord,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getBaseInfo = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getBaseInfo,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getAssociatedOrder = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getAssociatedOrder,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getMidStatusList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getMidStatusList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const saveMidStatus = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.saveMidStatus,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const sendMsg = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.sendMsg,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const showSendMsg = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.showSendMsg,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getApprovalConfigList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getConfigList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getCallList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getCallList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getMsgList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getMsgList,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getConclusionHistory = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getConclusionHistory,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getSaveConclusion = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getSaveConclusion,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const saveApprove = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.saveApprove,
    data: data
  })
    .then((res) => {
      callback(res)
    })
}

export const getSelectOptions = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.listSelect,
    data: data
  })
    .then(res => {
      callback(res)
    })
}

export const genbulksign = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: approvalApi.genbulksign,
      data: data
    })
    .then(res => {
      callback(res)
    })
}

export const getauthorization = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: approvalApi.getauthorization,
      data: data
    })
    .then(res => {
      callback(res)
    })
}


export const getuseremergsrelations = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: approvalApi.getuseremergsrelations,
      data: data
    })
    .then(res => {
      callback(res)
    })
}

export const getapplyinfodetailsemergs = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: approvalApi.getapplyinfodetailsemergs,
      data: data
    })
    .then(res => {
      callback(res)
    })
}

export const updateapplyinfoemergs = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: approvalApi.updateapplyinfoemergs,
      data: data
    })
    .then(res => {
      callback(res)
    })
}

export const deleteapplyinfoemergs = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: approvalApi.deleteapplyinfoemergs,
      data: data
    })
    .then(res => {
      callback(res)
    })
}


export const getfdcorderinfo = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: approvalApi.getfdcorderinfo,
      data: data
    })
    .then(res => {
      callback(res)
    })
}

export const delemergecontact = (data, callback) => {
  axiosInstance({
      method: 'post',
      url: approvalApi.delemergecontact,
      data: data
    })
    .then(res => {
      callback(res)
    })
}
// sing

export const getSingList = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getSingList,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const getsignpage = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.getsignpage,
    data: data
  }).then((res) => {
    callback(res)
  })
}
export const commitsign = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.commitsign,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const apiBatchsign = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.apiBatchsign,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const apiBatchInsurance = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.apiBatchInsurance,
    data: data
  }).then((res) => {
    callback(res)
  })
}

export const apiUnBatchInsurance = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: approvalApi.apiUnBatchInsurance,
    data: data
  }).then((res) => {
    callback(res)
  })
}
