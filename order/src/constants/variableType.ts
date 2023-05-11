export interface UserInfo {
  mobile: string
  password: string,
  v_code: string
}

interface TermInfo {
  term?: string
  limit?: number | null
}
export interface QueryInfo {
  id?: number | null | string
  page?: number
  uid?: string
  idcard?: string
  mobile?: string
  name?: string
  email?: string
  password?: string
  status?: string
  role?: string[]
  access_system?: string[]
  channel?: string | number
  fee_type?: string
  inner_user?: string
  change_type?: string
  change_amount?: string
  order_no?: string
  apply_end_time?: string
  apply_start_time?: string
  apply_limit?: number | null
  apply_switch?: string | null
  apply_term_config?: TermInfo[]
  order_switch?: string | null
  applyTime?: string[]
  productId?: string
  beginTime?: string
  endTime?: string
  beginDate?: string
  endDate?: string
  loanType?: number | string
  loan_type?: number | string
  loanTerm?: number | string
  phoneNum?: number | string
  settleNum?: number | string
  repayMoney?: number | string
  orderNo?: number | string
  isLoan?: number | string
  userId?: number | string
  product_type?: string
}

export interface Result {
  code: number | string
  data: object
  msg?: string
}

export interface Password {
  oldPass: string
  newPass: string
  confirmPass: string
}
