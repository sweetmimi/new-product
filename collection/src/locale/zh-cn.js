const zh = {
  title: '催收系统',
  okText: '确定',
  cancelText: '取消',
  confirMsend: '确定并发送',
  close: '关闭',
  quit: '退出',
  selectPrefix: '请选择',
  curLanguage: '当前语言',
  loadingText: 'loading',
  noData: '暂无数据',
  timeHorizon:'时间范围',
  all:'全部',
  getSmstext:'获取短信',
  noFound: {
    title: '抱歉，您访问的页面不存在',
    back: '返回首页'
  },
  resetPassword: '修改密码',
  inputPrefix: '请输入',
  selectPrefix: '请选择',
  shuzi:'数字',
  day: '天',
  listModule: {
    handle: '操作',
    dealWith: '处理',
    viewBtn: '查看',
    editBtn: '编辑',
    Whatsapp: 'Whatsapp',
    userInfoList: {
      accountNumber: '账号',
      name: '姓名',
      isDivide: '分配分机号',
      mobile: '分机号',
      status: '状态',
      createTime: '添加时间'
    },
    historyList: {
      orderId: '订单编号',
      userName: '用户姓名',
      city: '城市',
      collectionDate: '出催日期',
      sitTable: '出催时的坐席',
      collectionDueDay: '出催时的逾期天数'
    },
    taskList: {
      orderId: '订单编号',
      customerName: '用户姓名',
      city: '城市',
      mobile: '电话号码',
      overDays: '逾期天数',
      contactResult: '联系结果',
      repaymentWillingness: '还款意愿',
      loanTerm: '放款期限',
      followUpTime: '继续跟进时间',
      updateTime: '最后操作时间',
      collection: '催收'
    },
    taskOrder: {
      orderNo: '订单编号',
      userName: '用户姓名',
      city: '城市',
      mobile: '账号',
      collectionDate: '出催日期'
    },
    loanedList: {
      orderNo: '订单编号',
      mobile: '账号',
      dueTime: '应还款日期',
      followResult: '跟进结果',
      userName: '用户姓名',
      JinanTime: '进案时间',
      callTimes: '跟进次数',
      lastFollowTime: '最后一次跟进时间',
      search: '查询',
      followUser: '跟进人',
      taskStatus: '状态',
      repayWill: '还款意愿',
      stateArray:[{
        key: 1,
        value: "未处理"
      },{
        key: 2,
        value: "处理中"
      },{
        key: 3,
        value: "已处理"
      },{
         key: 4,
        value: "未处理/处理中"
      }]


    },
    personnel: {
      collectionPhase:'催收阶段筛选',
      collectionPersonnel: "催收人员筛选",
      commodityPhase: '货后任务筛选',
      commodityPersonnel: '货后专员筛选',
      total: '案件数',
      allRecycle:'总回收',
      allRate:'总回收率',
      t0_recycle: 'T0回收',
      t0_rate: 'T0回收率',
      t1_recycle: 'T1回收',
      t1_rate: 'T1回收率',
      t2_recycle: 'T2回收',
      t2_rate: 'T2回收率',
      t3_recycle: 'T3回收',
      t3_rate: 'T3回收率',
      t4_recycle: 'T4回收',
      t4_rate: 'T4回收率',
      t5_recycle: 'T5回收',
      t5_rate: 'T5回收率',
      t6_recycle: 'T6回收',
      t6_rate: 'T6回收率',
      t7_recycle: 'T7回收',
      t7_rate: 'T7回收率',
      totalAllNumber: '催收总件数',
      settleContractAmount:'结清合同金额',
      extensionContractAmount:'展期合同金额',

      H0_recycle: 'H0回收',
      H0_rate: 'H0回收率',
      H1_recycle: 'H1回收',
      H1_rate: 'H1回收率',
      H2_recycle: 'H2回收',
      H2_rate: 'H2回收率',
      H3_recycle: 'H3回收',
      H3_rate: 'H3回收率',
      unrecycle: '未催回',
      recycle_rate: '催回率',
      taskPhase: '货后任务催回总件数',
      rushnumber: '入催件数',
      taskPhase_recycle: '货后回收率',
      userQuery:'用户查询',

      date: '日期',
      follower_name: '催收员',
      Task_number:'任务数',
      unexcuted_num: "未执行任务",
      excuted_num: "执行中任务",
      repay_num:'当天还款数',
      call_num:"拨打联系人数",
      agree_num:'约定还款数',
      connect_num: '本人接通数',
      callback_answer: '回调接通数',
      unconnect_num:'本人未接通数',
      callback_unanswer: '回调未接通数',
      sop_num:'符合SOP流程',

      compellation:'姓名',
      unexecuted:'未执行',
      implemented: '已执行',
      promiseRefund: '承诺还款',
      beenPayment: '已还款',
    },
    loanedTask: {
      orderNo: '订单编号',
      mobile: '账号',
      dueTime: '应还款日期',
      followResult: '跟进结果',
      userName: '用户姓名',
      JinanTime: '进案时间',
      callTimes: '跟进次数',
      lastFollowTime: '最后一次跟进时间',
      search: '查询'
    },
    loanedHistory: {
      outTaskTime:'出贷后任务时间',
      outTaskDesc:'订单出贷后任务条件',
      orderNo: '订单编号',
      mobile: '账号',
      dueTime: '应还款日期',
      followResult: '跟进结果',
      userName: '用户姓名',
      JinanTime: '进案时间',
      callTimes: '跟进次数',
      lastFollowTime: '最后一次跟进时间',
      search: '查询'
    },
    performance: {
      rank: '排名',
      followerName: '催收员',
      principalInterest: '当天回款本息',
      overdueInterest: '当天回款罚息',
      returnSum: '当天回款总额',
      performance: '当天绩效'
    }
  },
  pageSlot: {
    total: '共',
    count: '条记录'
  },
  sildeNav: [{
      title: '系统管理',
      url: '/management',
      role: ['role_daihou_admin',],
      sunNav: [{
        title: '用户管理',
        role: ['role_daihou_admin', 'role_cuishou_admin'],
        url: '/management/userList'
      },
      {
        title: '账号管理',
        role: ['role_daihou_admin', 'role_cuishou_admin'],
        url: '/management/accountList'
      }
    ]
    },
    {
      title: '订单管理',
      url: '/order',
      role: ['role_cuishouer', 'role_daihou_checker','role_daihou_admin', 'role_cuishou_admin'],
      sunNav: [{
          title: '案件管理',
          role: ['role_cuishou_admin'],
          url: '/order/case',
          sunNav: [{

          }]
        },

        {
          title: '历史订单',
          role: ['role_cuishou_admin'],
          url: '/order/history'
        },
        {
          title: '贷后任务',
          role: ['role_daihou_admin'],
          url: '/order/loaned'
        },
        {
          title: '任务回收表',
          role: ['role_cuishouer', 'role_daihou_checker', 'role_cuishou_admin'],
          url: '/order/TaksRecovery'
        },

      ]
    },
    {
      title: '我的任务',
      url: '/task',
      role: ['role_cuishouer', 'role_daihou_checker', 'role_cuishou_admin'],
      sunNav: [{
          title: '我的催收任务',
          role: ['role_cuishouer'],
          url: '/task/tasklist'
        },
        {
          title: '我的历史任务',
          role: ['role_cuishouer'],
          url: '/task/taskorder'
        },
        {
          title: '我的贷后任务',
          role: ['role_daihou_checker'],
          url: '/task/loanedlist'
        },
        {
          title: '我的贷后历史',
          role: ['role_daihou_checker'],
          url: '/task/loanedhistory'
        },
        // {
        //   title: '我的绩效',
        //   role: ['role_cuishouer', 'role_cuishou_admin'],
        //   url: '/task/performance'
        // }, {
        //   title: '货后任务绩效',
        //   role: ['role_cuishouer', 'role_cuishou_admin'],
        //   url: '/task/taskPhase'
        // },
        // {
        //   title: '货后回收总表',
        //   role: ['role_cuishou_admin'],
        //   url: '/task/taskRecycleTotal'
        // },
        // {
        //   title: '货后回收表',
        //   role: ['role_cuishouer', 'role_cuishou_admin'],
        //   url: '/task/taskRecycle'
        // },
      ]
    },
    {
      title: '数据报表',
      url: '/datareport',
      role: ['role_cuishouer',  'role_cuishou_admin'],
      sunNav: [
      //   {
      //   title: '催收绩效',
      //   role: ['role_cuishouer', 'role_cuishou_admin'],
      //   url: '/datareport/collectionStatistics'
      // },
      //  {
      //   title: '催收SOP流程监控报表',
      //   role: ['role_cuishouer', 'role_cuishou_admin'],
      //   url: '/datareport/collectionSOPprocess'
      // }, {
      //   title: '贷后任务执行监控表',
      //   role: ['role_cuishouer', 'role_cuishou_admin'],
      //    url: '/datareport/cargoTasksMonitoring'
      // },
      {
        title: '还款意向表',
        role: ['role_cuishouer', 'role_cuishou_admin'],
        url: '/datareport/repayWish'
      }
    ]
    }
  ],
  userManagement: {
    editInfo: {
      editUserInfo: '编辑用户信息',
      viewUserInfo: '查看用户信息',
      userName: '用户姓名',
      email: '邮箱',
      role: '角色',
      state: '状态',
      createTime: '创建时间',
      assignNumber: '分机号',
      phone: '分配分机号',
      phonePassword: '分机密码',
      task: '所属任务',
      yes: '分配',
      no: '不分配',
      assignNumberRules: '请选择是否分配分机号'
    },
    serachBlock: {
      account: '账号',
      userName: '用户姓名',
      // isAssignNumber: '分配分机号',
      state: '状态'
    }
  },
  caseManage: {
    serachBlock: {
      orderNum: '订单编号',
      phone: '账号',
      city: '城市',
      userName: '用户姓名',
      belongTask: '所属任务',
      principal: '跟进人',
      contactResult: '联系结果',
      repaymentWillingness: '还款意愿',
      changeFollowTip: '请选择需要更改的跟进人',
      search: '查询',
      noFollowUser: '暂无可分配的跟进人',
      followUpTimes: '跟进次数',
      createCollectionTime: '入催时间',
      todayCallCount: '当天拨打次数',
      lastCallTime: '最后一次拨打时间',
      collectionDueDay: '出催时的逾期天数',
      organization:'组织',
      CollectionTime:'催收时间',
      recoveryRate:'回收率',
      recoveryAmount:'催回金额',
      fenanAmount:'分案金额',
      productId:'产品',
      orderstatus:'订单状态',
      all:'全部',
      isRollover:'展期',
      unRollover:'非展期',
      groupId:'分组筛选',
    },
    tableBlock: {
      orderId: '订单编号',
      userName: '用户姓名',
      followName: '坐席姓名',
      city: '城市',
      action: '操作',
      repaymentWish: '还款意向',
      contactStatus: '最后一次跟进结果',
      belongTask: '所属任务',
      overdueRange: '逾期天数',
      principal: '跟进人',
      contactResult: '跟进结果',
      repaymentWillingness: '还款意愿',
      contactNum: '跟进次数',
      collection: '催收',
      changePrincipal: '更换跟进人',
      bathChangeUser: '批量更换跟进人',
      inputExplain: '填写说明',
      selectedOrder: '已勾选的订单总量',
      existOrders: '此任务下已有订单',
      followOrders: '跟进中的订单量',
      distributeOrderNum: '分配订单数量',
      pleaseSelectTask: '请先选择任务',
      inputInteger: '只能填写正整数!',
      required: '填写的分配订单数量之和必须大于0，请重新填写!',
      greaterThan: '填写的分配订单数量之和超过可分配订单总量，请重新填写!',
      explainContent: [
        '1、只能填写正整数，不填默认值为0',
        '2、所填写的分配订单数量之和必须小于等于"已勾选的订单总量"，且大于0'
      ],
      todayCallCount: '当天拨打次数',
      lastCallTime: '最后一次拨打时间',
      collectionDueDay: '出催时的逾期天数',
      followUser:'跟进人',
    }
  },
  login: {
    accountPlaceholder: '请输入账号',
    passwordPlaceholder: '请输入密码',
    vcodePlaceholder: '请输入验证码',
    buttonText: '登录'
  },
  reset: {
    passwordPlaceholder: '请输入新密码',
    oldPasswordPlaceholder: '请输入原密码',
    confirmPasswordPlaceholder: '请再次输入新密码',
    buttonText: '确认修改'
  },
  taskDetail: {
    baseInfo: {
      coustomBaseInfo: '用户基本信息',
      orderBaseInfo: '订单基本信息',
      userName: '姓名',
      idCard: '身份证号',
      sex: '性别',
      homeplace: '出生地',
      presentAddress: '现居住地址',
      jobType: '工作类型',
      loanUse: '贷款用途',
      religion: '宗教',
      eduStatus: '教育程度',
      maritalStatus: '婚姻状况',
      orderId: '订单编号',
      age: '年龄',
      applyProduct: '申请产品',
      loanAmount: '放款金额',
      loanTerm: '放款期限',
      loanDate: '放款日期',
      bankName: '开户行',
      bankcard: '银行卡号',
      overDays: '逾期天数',
      companyName: '公司名称',
      approvalType: '审批类型',
      approvalRemark: '审批备注',
      monthIncome: '月收入',
      orderChannel: '进件渠道',
      loanCount: '借款次数',
      ocrImage: 'OCR照片',
      repayAccountNo: '交易码',
      repayVoucher:'放款凭证',
      voucherDetails:'凭证详情',
      repayType: '交易码还款方式',
      repayCode: '交易码还款银行',
      repayEndTime: '交易码失效时间',
      livingPhoto: '活体照片',
      rolloverInfo: '展期信息',
      root_order_no: '根订单',
      higher_order_no: '上一级订单',
      next_order_no: '下一级订单',
      rolloverInfoTip: '例如A订单展期生成B，B展期生成C，C展期生成D。查看C订单的贷款信息，可以看到根订单是A，上一级订单是B，下一级订单是D',
      orderChannel:'订单渠道',
    },
    overdueCondition: {
      title: '逾期情况',
      dateOfReturn: '应还日期',
      principal: '本金',
      interest: '利息',
      managementExpense: '服务费',
      overdueNewCost: '逾期新增费用',
      rolloverServiceFee: '展期服务费',
      amountReturned: '已还金额',
      receivables: '本期应收总额',
      status: '状态',
      periodNo: '期数'
    },
    collectFollowUp: {
      title: '催收跟进',
      userName: '姓名',
      relationship: '关系',
      mobile: '电话',
      dial: '拨打',
      hangup: '挂断',
      dialCall: '拨打电话',
      remarks: '备注',
      mainCallCount: '主叫次数',
      callCount: '被叫次数',
      totalCount: '总次数',
      callStatus: '上次通话状态',
      followUpTime: '继续跟进时间',
      saveReminder: '保存催记',
      addContract: '添加联系人',
      contactResult: '联系结果',
      repaymentWillingness: '还款意愿',
      contractName: '联系人姓名',
      contractMobile: '联系人手机',
      contractRelationship: '联系人关系',
      add: '添加',
      save: '保存',
      select: '选项',
      send: '发送',
      sendMsg: '发送短信',
      msgTemplate: '短信模板',
      msgContent: '短信内容',
      repayChannel: '还款渠道',
      retrieveAddressBook: '重新获取通讯录'
    },
    taskFollowUp: {
      title: '任务跟进',
      userName: '姓名',
      relationship: '关系',
      mobile: '电话',
      dial: '拨打',
      hangup: '挂断',
      dialCall: '拨打电话',
      remarks: '备注',
      phoneType: '号码类型',
      mainCallCount: '主叫次数',
      callCount: '被叫次数',
      totalCount: '总次数',
      callStatus: '上次通话状态',
      followUpTime: '继续跟进时间',
      saveReminder: '贷后跟进记录',
      addContract: '添加联系人',
      contactResult: '联系结果',
      repaymentWillingness: '还款意愿',
      contractName: '联系人姓名',
      contractMobile: '联系人手机',
      contractRelationship: '联系人关系',
      add: '添加',
      save: '保存',
      select: '选项',
      send: '发送',
      sendMsg: '发送短信',
      msgTemplate: '短信模板',
      msgContent: '短信内容',
      repayChannel: '还款渠道',
      retrieveAddressBook: '重新获取通讯录'
    },
    collectRecordTab: {
      title: '历史记录',
      collectRecord: {
        title: '催收记录',
        contractDate: '联系时间',
        task: '所属任务',
        contractPerson: '联系人',
        operator: '操作人'
      },
      contractRecord: {
        title: '联系记录',
        startTime: '开始时间',
        endTime: '结束时间',
        whoCall: '呼出方',
        callMonthod: '呼叫方式',
        callStatus: '呼叫状态',
        dialPerson: '拨打人',
        dialNumber: '拨打号码',
        record: '录音'
      },
      repaymentPlan: {
        title: '还款计划',
        receivableDate: '应还日期',
        paymentDate: '还款日期',
        corpus: '本金',
        interest: '利息',
        managementCost: '服务费',
        overdueNewCost: '逾期新增费用',

        rolloverServiceFee: '展期服务费',
        amountReturned: '已还金额',
        receivableAmount: '本期应收总额',
        status: '状态',
        overDays: '逾期天数',
        loanAmount: '放款到账金额',
        remainAmount: '剩余应还金额',
        remark: '备注'
      },
      collectionPath: {
        title: '催收路径',
        changeTime: '变更时间',
        changeReason: '变更原因',
        strategicPhase: '策略阶段',
        task: '所属任务',
        fllowUpPerson: '跟进人',
        executor: '执行者'
      },
      approvalRecord: {
        title: '电审记录',
        callNo: '通话编号',
        callStatus: '通话状态',
        startTime: '通话开始时间',
        endTime: '通话结束时间',
        playRecord: '听录音',
        noRecord: '暂无录音',
        otherMobile: '其它电话',
        currentAddr: '现居住地址',
        maritalStatus: '婚姻状况',
        organization: '单位名称',
        monthlyIncome: '月收入',
        repayDay: '工资发放日',
        companyAddress: '现公司地址',
        curWorkContactType: '现单位联系方式',
        hasOtherLoan: '是否有其它贷款',
        totalAmount: '负债总金额'
      },
      operateRecord: {
        title: '操作记录',
        operateTime: '操作时间',
        operateType: '操作项',
        content: '内容',
        operators: '操作方',
        operateor: '操作人'
      },
      daihouLog: {
        title: '贷后记录',
        collection_vir: '催收Ivr记录',
        contactTime: '拨打时间',
        followResult: '跟进结果',
        remark: '拨打次序',
        operateUser: '操作人',
        update_time: '拨打结束时间'
      },
       daihouHis: {
         title: '贷后路径',
         changeTime: '联系时间',
         contactUser: '联系人',
         contactRelation: '关系',
         followResult: '联系结果',
         followRepayWish: '还款意愿',
         remark: '备注',
         createUser: '操作人',
       },

      records: {
        paymentHistory: '还款记录',
        convenience: '请选择便利店',
        reimbursementCodes: '生成还款码',
        messageContent: '短信内容',
        repay_create_time: '还款发起时间',
        repay_amount: '还款金额',
        repay_method: '还款方式',
        repay_type:'还款码类型',
        repay_bank: '交易码还款银行',
        repay_code: '交易码',
        repay_code_expire_at: '交易码失效时间',
        repay_status: '还款状态',
        request_type:'结清方式',
        bank_store:'银行/便利店',
        drop_code: '废弃还款码',
        repayAmount:'部分还款金额范围为 ',
        repaytips: '若还款金额大于2500000,请生成银行还款码!',
        isClose:'确认废弃?',
        isCloseTips: '确认后,用户可通过app重新申请还款。请务必提醒用户使用最新的还款码还款。',
        repay_method_type:'还款类型',
        va_creater:'创建人',
      }
    },
    contactInformationTab: {
      title: '联系方式',
      contactRecord: {
        title: '联系人记录',
        contactsRecentContactTime: '最近联系时间',
        contactsCommonContact: '是否是常用联系人',
        contactsNumber: '联系的次数',
        contactDisplayName: '联系人显示名称',
        contactNot: '不是',
        contactYes: '是'
      },
      callRecord: {
        title: '通话记录',
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
        callTypeUnknown: '未知',
      },
      smsRecord: {
        title: '短信记录',
        smsType: '短信类型',
        smsTypeReceive: '接收',
        smsTypeSend: '发送',
        smsContent: '短信内容',
        smsAddress: '地址',
        smsDate: '日期',
        smsSentDate: '发送日期',
        smsSender: '发件人',
      }
    },
    modelMsg: {
      userName: '请输入联系人姓名',
      mobile: '请输入正确的联系人手机',
      relationship: '请选择联系人关系',
      saveSuccess: '保存成功',
      contactResult: '请选择联系结果',
      repaymentWillingness: '请选择还款意愿',
      followUpTime: '请选择继续跟进时间',
      dialing: '正在呼叫中，请稍等..',
      dialDone: '通话已结束',
      audioTitle: '播放录音文件',
      phoneType: '请选择号码类型'
    },
    remark: {
      remarkTitle: '客服备注',
      remarkSort:'序号',
      remarkTxt:'内容',
      remarkTime:'时间',
      operatorName:'备注员姓名'
    },
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
      errorMsg: 'ocr身份证号对应地区与ocr地址不符'
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
      repayAmount: '应还金额',
      repayTime: '应还时间',
      loanUse: '贷款用途',
      approveType: '审批类型',
      loanNum: '贷款次数',
      remarkTitle: '客服备注',
      remarkSort:'序号',
      remarkTxt:'内容',
      remarkTime:'时间',
      operatorName:'备注员姓名'
    },
    callRecord: {
      callPhoneNumber: "电话号码",
      callPhoneName: "姓名",
      callDuration: "持续时间",
      callType: "通话类型",
      callTime: "时间",
      callTypeIncomingCall: "来电",
      callTypeOutgoing: "去电",
      callTypeMissed: "未接",
      callTypeVoiceMail: "语音邮件",
      callTypeRejected: "拒绝",
      callTypeBlocked: "阻止",
      callTypeUnknown: "未知",
    },
    contactRecord: {
      contactsRecentContactTime: "最近联系时间",
      contactsCommonContact: "是否是常用联系人",
      contactsNumber: "联系的次数",
      contactDisplayName: "联系人显示名称",
      contactNot: "不是",
      contactYes: "是",
    },
    smsRecord: {
      smsType: "短信类型",
      smsTypeReceive: "接收",
      smsTypeSend: "发送",
      smsContent: "短信内容",
      smsAddress: "地址",
      smsDate: "日期",
      smsSentDate: "发送日期",
      smsSender: "发件人",
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
      commit: '提交'
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
      TaskStage: '任务阶段',
      TaskStages: [{
          index: 0,
          value: '全部'
        },
        {
          index: 1,
          value: 'H0'
        }, {
          index: 2,
          value: 'H1'
        }, {
          index: 3,
          value: 'H2'
        }, {
          index: 4,
          value: 'H3'
        }
      ],
          cargo_stage: [{
              index: 0,
              value: '全部'
            },
            {
              index: 1,
              value: 'H0'
            }, {
              index: 2,
              value: 'H1'
            }, {
              index: 3,
              value: 'H2'
            }, {
              index: 4,
              value: 'H3'
            }
          ],
      modeRepayment:[{
        label: 1,
        value: '银行还款'
      },{
          label: 2,
          value: '便利店'
      }
    ],
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
        },

      },

    }
  },
  dataReport:{
    search:{
      expireDate:'到期日',
    },
     repayWish: {
       nowContact: '当前可联',
       hisContact: '历史可联',
       all: '全部',
       tips: '提示',
       tabTip1: '当前可联: 根据员工的跟进记录，取每笔订单最后一次跟进状态',
       tabTip2: '历史可联：取每笔订单历史所有跟进记录，以最高优先级的跟进结果进行统计，跟进结果优先级Repaid>PTP>CTP>RTP>FCT>Unknown>Lost Contact>Open',
       tip1: 'All：到期日为选择日期的全部案件数量',
       tip2: 'Repaid：已还款件数',
       tip3: 'Open：未跟进件数',
       tip4: 'RepPTP：有意愿有能力还款',
       tip5: 'CTP：有意愿无能力还款',
       tip6: 'RTP：有能力但拒绝还款',
       tip7: 'FCT：有能力但需协商',
       tip8: 'Unknown：暂时无法判定',
       tip9: 'Lost Contact：失联',
     },
  },
  billInfo: {
    title:'账单明细',
    term: '期数',
    dueTime: '应还日期',
    successTime: '还款日期',
    principal: '本金',
    interest: '利息',
    serviceFee: '服务费',
    overdueInterest: '逾期新增利息',
    shouldPayTotal: '本期应收金额',
    payedTotal: '已还金额',
    needPayTotal: '剩余应还金额',
    Lendingaccount: '放款到账金额',
    Flatbookvalue: '平账金额',
    status: '状态',
    overdueDay: '逾期天数',
    rolloverServiceFee: '展期服务费',
    remark: '备注',
    Doubleloan: '复贷',
    oprated: '已经操作过，请勿重复',
    waitPayAmount:'待还金额',
  },

}

export default zh
