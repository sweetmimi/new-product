import axiosInstance from '@/interceptors/axios'
import { userApi, pushconfigApi, groupApi, usercoupon, payconfigApi,moduleconfApi } from '@/constants/api'
import { QueryInfo, Result } from '@/constants/variableType'

export const getList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.list,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const add = (data, callback) => {
  axiosInstance({
    method: 'post',
    url: userApi.add,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const getAccountInfo = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.getAccountInfo,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const AddAdminLender = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.AddAdminLender,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const getUatasList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.getUatasList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const productconf = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.productconf,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const SaveProductConf = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.SaveProductConf,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

//appPush 
export const pushconfigList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: pushconfigApi.list,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const pushconfigSave = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: pushconfigApi.save,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupLevel = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupLevel,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupSelect = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupSelect,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupList = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupEdit = (data: QueryInfo, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupEdit,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupUpdate = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupUpdate,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupStore = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupStore,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupDestroy = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupDestroy,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupLoglist = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupLoglist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGroupLogdetail = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupLogdetail,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const apiGroupProductids = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: groupApi.groupProductids,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiuatasRdlList = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.uatasRdlList,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiuatasRdlAdd = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.uatasRdlAdd,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiuatasLenderSelect = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.uatasLenderSelect,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiuatasBindrdl = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: userApi.uatasBindrdl,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiUsercouponList = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: usercoupon.list,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
export const apiUsercouponAdd = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: usercoupon.add,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiUsercouponSetstatus = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: usercoupon.setstatus,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiCouponopOption = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: usercoupon.option,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiPayconfigBanklist = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: payconfigApi.banklist,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiPayconfigCreatebank = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: payconfigApi.createbank,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiPayconfigUpdatebank = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: payconfigApi.updatebank,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiGetinfobyname = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: moduleconfApi.getinfobyname,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiSavemoduleconf = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: moduleconfApi.savemoduleconf,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}

export const apiRemitTask = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: payconfigApi.apiRemitTask,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}


export const apiRemitCommitconclusion = (data: any, callback?: any) => {
  axiosInstance({
    method: 'post',
    url: payconfigApi.apiRemitCommitconclusion,
    data: data
  }).then((res: Result) => {
    callback(res)
  })
}
