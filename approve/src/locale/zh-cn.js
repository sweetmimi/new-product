const zh = {
  title: '审批系统',
  titleLender: 'lender系统',
  okText: '确定',
  cancelText: '取消',
  onLine: '在线',
  offLine: '离线',
  quit: '退出',
  resetPassword: '修改密码',
  inputPrefix: '请输入',
  selectPrefix: '请选择',
  loadingText: 'loading',
  sysapproval: '审批',
  curLanguage: '当前语言',
  search: '搜索',
  all: '全部',
  mobile: '手机号',
  noFound: {
    title: 'maaf, halaman yang Anda kunjungi tidak ada',
    back: 'kembali'
  },
  download: {
    status: '状态',
    download: '下载'
  },
  loanTypes: [{
    key: 0,
    value: '全部'
  },
  {
    key: 1,
    value: '首贷'
  },
  {
    key: 2,
    value: '复贷'
  }
  ],
  approveStatusOp: [{
    key: '',
    value: '全部'
  },
  {
    key: 1,
    value: '待人审'
  },
  {
    key: 2,
    value: '已通过'
  }
  ],
  listModule: {
    handle: '操作',
    viewBtn: '查看',
    editBtn: '编辑',
    destroyBtn: '删除',
    destroyTip: '注销用户将删除用户所有个人信息',
    userInfoList: {
      accountNumber: 'ID',
      name: '姓名',
      phone: '账号',
      email: '邮箱',
      mobile: '分机号',
      status: '状态',
      role: '角色',
      createTime: '创建时间'
    }
  },
  pageSlot: {
    total: '共',
    count: '条记录'
  },

  sildeNav: [


    {
      title: '系统管理',
      url: '/management',
      role: 'role_approve_admin',
      sunNav: [
        // {
        // title: '用户管理',
        // url: '/management/userList'
        // },
        {
          title: '客户管理',
          url: '/management/customerList'
        },
      ]
    },
    {
      title: '审批管理',
      url: '/approval',
      role: 'role_approve_admin',
      sunNav: [{
        title: '审批列表',
        url: '/approval/list'
      },
      ]
    },

    {
      title: '我的任务',
      url: '/task',
      role: 'role_approver',
      sunNav: [{
          title: '审批任务',
          url: '/task/list'
        },
        {
          title: '审批历史任务',
          url: '/task/history'
        },
        {
          title: '批量人审',
          url: '/task/personCheck'
        },

      ]
    },
    // {
    //   title: '数据报表',
    //   url: '/datareport',
    //   role: 'role_approve_admin',
    //   sunNav: [{
    //     title: '审批总体数据',
    //     url: '/datareport/approvedata'
    //   }]
    // }
  ],
  lender_sildeNav: [{
    title: 'Detil Finansial',
    url: '/home',
    role: 'role_approve_admin',
    sunNav: [{
      title: 'Detil Finansial',
      url: '/home/myHome'
    },
   {
     title: 'Lender Informasi',
     url: '/home/lenderInfo'
   }]
  },
 //  {
 //    title: 'pengelolaan sistem',
 //    url: '/management',
 //    role: 'role_approve_admin',
 //    sunNav: [{
 //      title: 'pengelolaan pemeriksa',
 //      url: '/management/userList'
 //    }]
 //  },
  {
    title: 'Detil Pemberian Dana',
    url: '/approval',
    role: 'role_approve_admin',
    sunNav: [
   //    {
   //    title: 'daftar pemeriksaan',
   //    url: '/approval/list'
   //  },
    {
      title: 'Pengajuan Pemberian Dana',
      url: '/approval/loanlist'
    },
    ]
  },
  {
    title: 'daftar pesanan',
    url: '/task',
    role: 'role_approver',
    sunNav: [{
        title: 'Daftar Pinjaman Tersedia',
        url: '/task/list'
      },
     //  {
     //    title: 'Riwayat Pinjaman',
     //    url: '/task/history'
     //  }
    ]
  },
 //  {
 //    title: 'Laporan data',
 //    role: 'role_approve_admin',
 //    url: '/datareport',
 //    sunNav: [{
 //      title: 'Persetujuan data keseluruhan',
 //      url: '/datareport/approvedata'
 //    }]
 //  },
 {
   title: 'Daftar Pesanan',
   url: '/sing',
   role: 'role_approve_admin',
   sunNav: [
     {
       title: 'Semua Pesanan Gagal',
       url: '/sing/invalid'
     },
     {
       title: 'Tugas tanda tangan',
       url: '/sing/singInfo'
     },
     // {
     //   title: 'Tanda Tangan Pemberi Dana',
     //   url: '/sing/lenderOrder'
     // },
     {
       title: 'Tanda Tangan Penerima Dana',
       url: '/sing/borrowerOrder'
     },
     {
       title: 'Pesanan Pendanaan',
       url: '/sing/loanOrder'
     },

   ]
 },
],
  userManagement: {
    editInfo: {
      editUserInfo: '编辑用户信息',
      viewUserInfo: '查看用户信息',
      userName: '姓名',
      account: 'ID',
      email: '邮箱',
      phone: '账号',
      role: '角色',
      state: '状态',
      createTime: '创建时间',
      assignNumber: '分机号',
      assignPassword: '分机密码',
      yes: '分配',
      no: '不分配',
      assignNumberRules: '请选择是否分配分机号'
    },
    serachBlock: {
      account: 'ID',
      userName: '姓名',
      phoneNum: '账号',
      ruler: '角色'
    }
  },
  home: {
    sisaDana: '可用余额',
    waitingRepayNum: "在贷订单件数",
    waitingRepayAmount: '在贷订单金额',
    totalDana: '合同金额',
    kodeRdl: 'RDL账号',
    paycode: '充值码',
    withdraw: '提 现',
    recharge: '充值',
    getCode: '获取充值码',
    withdrawTitle: '提现',
    getVcode: '获取验证码',
    tableHader: {
      time: '时间',
      type: '类型',
      amount: '金额(RP)',
      status: '状态',
    },
    userInfo: {
      bankType: '银行',
      bankCode: '银行卡号',
      amount: '提现金额',
      vcode: '验证码',
      bankpeopleName: '提现人',
      submitSuccess: '提现申请已提交等待审核',
      okText: '确定提现',
    },
  },
  loan: {
    search: {
      channelSource: '渠道来源',
      orderNo: '订单编号',
      mobile: '账号',
      userId: 'UID',
      userName: '申请人姓名',
      productId: '申请产品',
      orderStatus: '订单状态',
      applicationAmount: '申请金额（RP）',
      applicationTerm: '申请期限',
      termUnit: '期限单位',
      timeType: '时间类型',
      time: '起止时间',
      export: "导出贷款订单",
      exportErr: "请选择正确的导出时间区间",

    },
    tableHead: {
      orderNo: '订单编号',
      userName: '申请人姓名',
      productId: '申请产品',
      applicationAmount: '申请金额',
      applicationTerm: '申请期限',
      createTime: '创建时间',
      applyTime: '申请时间',
      orderStatus: '订单状态',
      confirmLoanTip: '',
      operate: '操作',
      viewBtn: '查看',
      confirmLoan: '确认放款',
      setFail: '置为失败',
      confirmLoanTip: '该笔订单确认发起放款？',
      setFailTip: '放款失败为终态，无法撤销，确认操作？'
    },
    loanInfo: {
      loanInfoTitle: '贷款信息',
      baseInfoTitle: '客户基本信息',
      detailInfoTitle: '客户详情信息',
      materialInfoTitle: '客户材料信息',
      businessInfo: '商业详情信息',
      businessPic: '商业材料信息',
      contractInfoTitle: '合同信息',
      userName: '申请人',
      orderNo: '订单编号',
      uid: 'UID',
      productId: '申请产品',
      channel: 'channel',
      loanNum: '借款次数',
      createTime: '创建时间',
      applyTime: '申请时间',
      applyNum: '申请金额',
      applyTerm: '申请期限',
      appName: 'App_name',
      orderLog: '订单历史记录',
      confirmTime: '提交时间',
      stayTime: '停留时间',
      status: '订单状态',
      operator: '操作人',
      remark: '备注',
      accrual: '利润',
    },
    approvInfo: {
      approvalTime: '审批时间',
      approver: '审批人',
      approveType: '审批类型',
      conclusion: '审批结论'
    },
    baseInfo: {
      uid: 'UID',
      userName: '用户姓名',
      mobile: '账号',
      idcard: '身份证号',
      level: '用户等级'
    },
    detailInfo: {
      personal: '个人填写信息',
      userType: '用户类型',
      education: '教育程度',
      loanPurpose: '贷款用途',
      monthPay: '月收入',
      religion: '宗教',
      birthday: '出生日期',
      maritalStatus: '婚姻状况',
      sex: '性别',
      area: '目前居住地址',
      workType: '工作类型',
      company: '公司名',
      emergs1Name: '紧急联系人1姓名',
      emergs1Phone: '紧急联系人1手机号',
      emergs1Relation: '紧急联系人1关系',
      emergs2Name: '紧急联系人2姓名',
      emergs2Phone: '紧急联系人2手机号',
      emergs2Relation: '紧急联系人2关系',
      deviceInfo: '设备信息',
      gps: 'GPS信息',
      imei: 'imei',
      brand: '设备品牌',
      model: '设备型号',
      ocrInfo: '征信信息',
      passFacePhoto: '活体是否通过',
      samePerson: '人脸识别是否通过',
      confidenceScore: '人脸识别分数',
      realnameStatus: '实名认证结果',
      ocrName: 'OCR姓名',
      ocrCardno: 'OCR身份证号',
      ocrArea: 'OCR地址',
      ocrStatus: 'OCR认证结果',
      checkAddress: 'OCR地址对比结果',
      business: '商业详细信息',
      businessName: "商家名称",
      businessIncome: '每月收入',
      businessOwner: '商业所有权',
      businessCreateTime: '成立日期',
      businessType: '商业类型',
      businessPhone: '公司电话号码',
      businessAddress: '营业地址',
    },
    materialInfo: {
      idcardFront: '身份证正面',
      idcardBack: '身份证反面',
      idcardHeld: '手持身份证照片',
      socialCard: '社保卡照片',
      creditCard: '信用卡照片',
      familyCard: '家庭卡照片',
      facePhotoList: '活体检测照片',
      devicePhoto: '店面照',
      frontPhoto: '货物照',
      stockPhoto: '货物库存',
    },
    contractInfo: {
      conractName: '借款合同'
    }
  },
  approvalTask: {
    serachBlock: {
      orderId: '订单编号',
      loanType: '贷款类型',
      approveStatus: '审批状态',
      customerName: '客户姓名',
      sourceChannel: '渠道来源',
      orderAmount: '订单金额',
      timeType: '时间类型',
      orderNum: '订单编号',
      followUpState: '审批跟进状态',
      followStatus: '跟进状态',
      city: '城市',
      approver: '审批员',
      startTime: '开始时间',
      endTime: '结束时间',
      timeRange: '筛选时间段',
      search: '查询',
      export: '导出审批列表',
      exportSms: '导出短信记录',
      exportSuc: '下载任务生成成功，请稍后去我的下载下载数据',
      exportErr: '请选择正确的导出时间区间',
      remain: 's',
      channel: '进件渠道',
      productName: '产品名称',
      seeMore: '查看更多',
      noMore:'无更多',
    },
    offlineBloack: {
      tips: '您已离线，可以点击确定按钮选择上线操作。'
    },
    tableBlock: {
      orderId: '订单编号',
      customerName: '客户姓名',
      city: '城市',
      orderAmount: '订单金额',
      applyTime: '申请时间',
      orderDistributionTime: '分单时间',
      followUpState: '审批跟进状态',
      action: '操作',
      approveTime: '审批时间',
      checkOrder: '查看',
      changeOrder: '调单',
      contract: '合同',
      viewcontract: '查看合同',
      view: '查看',
      approval: '审批',
      approver: '审批员',
      sourceChannel: '渠道来源',
      repaymentsNum: '贷款次数',
      noDataTip: '派单中，稍后可点击查询按钮 获取任务',
      noFollowUser: '暂无可分配的跟进人',
      Sign: '电子签章',
    },
    approverModal: {
      curTip: '当前审批员：',
      changeTip: '调整审批员为：',
      approverTip: '请选择一个要调整的审批员',
      batch: '批量调单',
      selectTask: '请先选择任务',
      changeSuccess: '调单成功',
      changeFail: '调单失败',
      selectedNum: '已勾选任务数：'
    },
    downloadModal: {
      modalTitle: '我的下载',
      time: '日期',
      title: '标题',
      resultAmount: '结果数',
      status: '状态',
      action: '操作'
    },
    personCheck:{
      pass:"通过",
      Refuse:"拒绝",
      cancel: "取消",
      allSelect:"全选",
      nowSelect:"已选中",
      orderNum:"笔订单",
      allTotal:"当前共计",
      imagesWhatch:"照片查看",
      batchChange:"批量修改",
      noOrder:"暂无选中订单",
      allPass:"全部通过",
      allRefuse:"全部拒绝",
      allCancel:"全部取消",
      success:"成功",
      failed:"失败",
      num:"笔",
      sure:"确定",
      approve:"审批",
      pleaseChooseOrder:"请勾选订单",
      isAllCancel:"是否取消全部已勾选订单",
      passOrder:'改订单已通过审核',
      passOrderLimit30: '最多只能勾选30条订单',
    },
  },
  login: {
    accountPlaceholder: '请输入账号',
    passwordlaceholder: '请输入密码',
    vcodePlaceholder: '请输入验证码',
    buttonText: '登录'
  },
  reset: {
    passwordPlaceholder: '请输新入密码',
    oldPasswordPlaceholder: '请输入原密码',
    confirmPasswordPlaceholder: '请再次输入新密码',
    buttonText: '确认修改'
  },
  approvalDetail: {
    baseInfo: {
      title: '审批材料',
      orderTitle: '订单信息',
      uid: '客户UID',
      name: '姓名',
      gender: '性别',
      mobile: '账号',
      birthday: '生日',
      idcard: '身份证号',
      ocrName: 'OCR姓名',
      ocrCardNo: 'OCR身份证号',
      faceThan: '人脸比对结果',
      ocrArea: 'OCR地址',
      ocrResult: 'OCR认证结果',
      homeAddress: '目前居住地址',
      maritalStatus: '婚姻状况',
      religion: '宗教',
      userType: '用户类型',
      jobType: '工作类型',
      companyName: '公司名称',
      companyPhone: '公司电话',
      salary: '月收入',
      bankName: '所属银行',
      contactRelation: '联系人关系',
      contactName: '联系人姓名',
      contactMobile: '联系人电话',
      contractPerson: '联系人',
      relationship: '关系',
      associatedOrder: '关联订单',
      bankCardID: '银行卡号',
      error: '异常提示',
      errorMsg: 'ocr身份证号对应地区与ocr地址不符',
      businessUid: "UID",
      business: '商业详细信息',
      businessName: "商家名称",
      businessIncome: '每月收入',
      businessOwner: '商业所有权',
      businessCreateTime: '成立日期',
      businessType: '商业类型',
      businessPhone: '公司电话号码',
      businessAddress: '营业地址',
      contactInfo: {
        title: '编辑紧急联系人',
        name: '姓名',
        relation: '关系',
        phone: '手机号码',
        update: '更新',
        delete: '删除',
        cancel: '取消',
        rulephone: '请输入10 - 13位的正确手机号',
        ruleName: '姓名最长不能超过30个字符',
      },
    },
    associatedOrderInfo: {
      type: '类型',
      info: '订单查重信息',
      associatedOrder: '关联订单',
      applyTime: '申请时间',
      orderStuas: '订单状态',
      noData: '无关联订单',
      check: '核查项',
      record: '记录',
      phoneRecords: {
        title: '电核记录表',
        isSelf: '是否本人操作',
        idcard: '身份证号码',
        idcardName: '身份证名称',
        birthday: '出生日期',
        idcardAddress: '身份证地址',
        othermobile: '其他电话',
        curAddress: '现居住地址',
        curAddressOwn: '现居住地归属',
        loanUse: '贷款用途',
        maritalStatus: '婚姻状况',
        legend: '申请人宗教',
        organization: '单位名称',
        monthlyIncome: '月收入',
        repayDay: '工资发放日',
        companyAddress: '现公司地址',
        workType: '职务',
        curWorkTime: '现单位工作年限',
        curWorkContactType: '现单位联系方式',
        hasOtherLoan: '是否有其他贷款',
        totalAmount: '负债总金额',
        canRepayAmount: '能承受月还款额',
        contactName: '联系人姓名',
        contactRelationship: '联系人关系',
        contactPhone: '联系人电话',
        contactKnown: '联系人是否知晓借款',
        relationship: '联系人与申请人关系',
        contactCheck: '联系人核实',
        workInfoCheck: '工作信息核实'
      }
    },
    orderInfo: {
      orderNo: '订单编号',
      applyTime: '申请时间',
      channel: '进件渠道',
      appName: '申请产品',
      applyTerm: '申请期限',
      applyAmount: '申请金额',
      accountAmount: '放款到账金额',
      oneTimeFee: '一次性服务费',
      creditScore: '信用分',
      repayAmount: '应还金额',
      repayTime: '应还时间',
      loanUse: '贷款用途',
      approveType: '审批类型',
      loanNum: '贷款次数'
    },
    callRecord: {
      callPhoneNumber: '电话号码',
      callPhoneName: '姓名',
      callDuration: '持续时间',
      callType: '通话类型',
      callTime: '时间',
      callTypeIncomingCall: '来电',
      callTypeOutgoing: '去电',
      callTypeMissed: '未接',
      callTypeVoiceMail: '语音邮件',
      callTypeRejected: '拒绝',
      callTypeBlocked: '阻止',
      callTypeUnknown: '未知'
    },
    contactRecord: {
      contactsRecentContactTime: '最近联系时间',
      contactsCommonContact: '是否是常用联系人',
      contactsNumber: '联系的次数',
      contactDisplayName: '联系人显示名称',
      contactNot: '不是',
      contactYes: '是'
    },
    smsRecord: {
      smsType: '短信类型',
      smsTypeReceive: '接收',
      smsTypeSend: '发送',
      smsContent: '短信内容',
      smsAddress: '地址',
      smsDate: '日期',
      smsSentDate: '发送日期',
      smsSender: '发件人',
      noSms: '没有可导出的数据'
    },
    msgRemind: {
      title: '提醒短信',
      dateTime: '时间',
      msgType: '短信类型',
      sender: '发送人',
      sendMsgRemind: '发送短信提醒',
      send: '发送',
      sendSuccess: '发送成功',
      sendMsg: '发送短信'
    },
    telApproval: {
      title: '电话审批',
      callNumber: '通话编号',
      callStatus: '通话状态',
      mobile: '被叫号码',
      startTime: '开始时间',
      endTime: '结束时间',
      dialPerson: '拨打人',
      dial: '拨打',
      soundRecord: '听录音',
      dialCall: '拨打电话',
      placeholder: '请输入拨打号码'
    },
    followUpStatus: {
      title: '跟进状态',
      dateTime: '时间',
      afterStatus: '修改后状态',
      approvalFollowUpStatus: '审批跟进状态',
      operator: '操作人'
    },
    approvalConclusionHistory: {
      title: '审批结论历史',
      examiner: '审批员',
      approvalTime: '审批时间',
      approvalConclusion: '审批结论',
      mineConclusion: '您的结论',
      refusalReason: {
        title: '拒绝原因'
      },
      resultCancel: '贷款取消',
      remarks: '备注',
      resultRefusal: '审批拒绝',
      resultExamination: '审批通过',
      refusal: '拒绝',
      save: '保存',
      commit: '提交',
      insuranceTitle: '购买保险',
    },
    msgList: {
      changeOrder: '此订单已被调单！',
      examine: '请勾选审批结论',
      followStatus: '请选择审批跟进状态',
      reason: '请勾选拒绝原因',
      submitSuccess: '提交成功',
      saveSuccess: '保存成功',
      hasMobile: '请输入正确的拨打号码',
      dialSuccess: '正在呼叫中，请稍等..',
      hungUpSuccess: '通话已结束',
      submitResultConfirm: '提交结论后不可修改，确认提交？'
    },
    result: {
      conclusion: [{
          label: '通过',
          id: 1
        },
        {
          label: '拒绝',
          id: 2
        },
        {
          label: '贷款取消',
          id: 3
        }
      ],
      lenderConclusion: [{
        label: '通过',
        id: 1
      }, {
        label: '拒绝',
        id: 2
      }, ],
      insuranceTitle: '购买保险',
      isInsurance: '是',
      unInsurance: '否',
      rejectReson: [{
          title: '高风险客群',
          value: [{
              label: '无固定收入',
              id: '1'
            },
            {
              label: '高风险借款用途',
              id: '2'
            },
            {
              label: '疑似欺诈',
              id: '17'
            },
            {
              label: '屏幕拍摄',
              id: '18'
            }
          ]
        },
        {
          title: '资料不符',
          value: [{
              label: '证件无效',
              id: '3'
            },
            {
              label: '证件照片与本人不符',
              id: '4'
            },
            {
              label: '电审工作信息与提供资料不符',
              id: '5'
            },
            {
              label: '电审联系人信息与提供资料不符',
              id: '6'
            },
            {
              label: '电审家庭信息与提供资料不符',
              id: '7'
            },
            {
              label: '电审收入与提供资料差距大',
              id: '8'
            },
            {
              label: '虚假身份证',
              id: '19'
            },
            {
              label: '证件破损',
              id: '20'
            },
            {
              label: '照片模糊',
              id: '21'
            },
            {
              label: '身份证过期',
              id: '22'
            }
          ]
        },
        {
          title: '电话审批无效',
          value: [{
              label: '借款人电话无法接通',
              id: '9'
            },
            {
              label: '联系人电话无法接通',
              id: '10'
            },
            {
              label: '电联借款人不配合',
              id: '11'
            },
            {
              label: '电联联系人不配合',
              id: '12'
            }
          ]
        },
        {
          title: '用户放弃',
          value: [{
              label: '本人要求拒绝',
              id: '13'
            },
            {
              label: '联系人要求拒绝',
              id: '14'
            }
          ]
        },
        {
          title: '其他',
          value: [{
              label: '用户信息有误',
              id: '15'
            },
            {
              label: '其他',
              id: '16'
            }
          ]
        }
      ]
    },
    dataReport: {
      loverallData: {
        searchBlock: {
          phone: '账号',
          name: '审批员姓名',
          date: '时间范围'
        },
        tableBlock: {
          name: '审批员姓名',
          phone: '手机',
          firstNum: '初审件数',
          firstRefuse: '初审拒绝',
          firstPass: '初审通过',
          loanNum: '放款笔数',
          loanRate: '放款率',
          refundedNum: '到期应还笔数',
          refundsNum: '回款笔数',
          refundsRate: '回款率'
        }
      }
    },

  },
  sing:{
    orderNo:'订单编号',
    userName:'客户姓名',
    cityName:'城市',
    loanAmount:'订单金额',
    createTime:'申请时间',
    signStatusDesc:'签章状态',
    goSing:'签章',
    insuranceDesc:'投保状态',
    isinsuranceDesc:'已投保',
    uninsuranceDesc:'未投保',
    isSing:'确认签章',
    WordPad:'写字板',
    Insurance:'投保',
    unInsurance:'取消投保',
    batchInsurance:'批量投保',
    batchSing:'批量签章',
    choose:'请选择',
    chooseIsSing:"已选中{num}笔订单，是否批量签张?",
    chooseIsInsurance:"已选中{num}笔订单，是否批量确认投保?",
    isInsurance:'确定投保?',
    isunInsurance:'确定取消投保?',
    toubao:'投保',
    quxiao:'取消投保',
    waitInsurance:'待投保',
    successInsurance:'已投保成功',
    cancelInsurance:'已取消投保',
  },
}

export default zh
