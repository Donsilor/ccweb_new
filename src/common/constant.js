const EBDic = {
  locationName: 'locationName',
  ptType: 'ptType',
  taskId: 'taskId',
  spottesttype: 'spottesttype',
  chassis: 'chassis',
  spottestId: 'spottestId',
  id: 'id',
  distributorName: 'distributorName',
  bankName: 'bankName',
  ewName: 'ewName',
  businessType: 'businessType',
  isfirst: 'isfirst',
  depositAmount: 'tempShowBond',
  inMoney: 'inMoney',
  outMoney: 'outMoney',
  time: 'time',
  contractType: 'contractType',
  bondType: 'operationType',
  isContractChange: 'isContractChange',
  isException: 'isException',
  isChainStore: 'isChainStore',
  status: 'status',
  statusName: 'statusName',
  disApplyTime: 'applyTime',
  ewCommitTime: 'ewCommitTime',
  disConfirmDeposit: 'disConfirmDeposit',
  ptAuditTime: 'firstTime',
  firstTrialName: 'firstTrialName',
  lastTrialName: 'lastTrialName',
  moveNum: 'moveNum',
  isEmpty: 'isBondZero',
  isExport: 'isExport',
  isRecieved: 'isRecieved',
  expressNum: 'expressNum',
  bankAuditTime: 'affectTime',
  exceptionTime: 'exceptionTime',
  ptAuditDepositTime: 'ptAuditDepositTime',
  saveDate: 'saveDate',
  startTime: 'startdate',
  endTime: 'enddate',
  fldSerialName: 'fldSerialName',
  moneyGetType: 'moneyGetType',
  firstTimes: 'firstTimes',
  firstPtPassTimes: 'firstPtPassTimes',
  firstBankPassTimes: 'firstBankPassTimes',
  continueTimes: 'continueTimes',
  continuePtPassTimes: 'continuePtPassTimes',
  continueBankPassTimes: 'continueBankPassTimes',
  exceptionTimes: 'exceptionTimes',
  contractId: 'contractId',
  ptNotPassFlagDicList: [
    {
      name: '全部',
      value: -1,
      badgeStatus: 'processing',
      typeList: ['TODO'],
      processStep: -1,
    },
  ],
  statusDicList: [
    {
      name: '全部',
      value: -1,
      badgeStatus: 'processing',
      typeList: ['TODO', 'EXCEPTION', 'ALL', 'bondDetail'],
      processStep: -1,
    },
    {
      name: '二网待确认',
      value: 10,
      badgeStatus: 'processing',
      typeList: ['EXCEPTION', 'ALL'],
      processStep: -1,
    },
    {
      name: '二网确认不通过',
      value: 11,
      badgeStatus: 'processing',
      typeList: ['EXCEPTION', 'ALL'],
      processStep: -1,
    },
    {
      name: '经销商待确认',
      value: 20,
      badgeStatus: 'processing',
      typeList: ['EXCEPTION', 'ALL'],
      processStep: 0,
    },
    {
      name: '经销商确认错误',
      value: 21,
      badgeStatus: 'processing',
      typeList: ['TODO', 'EXCEPTION', 'ALL'],
      processStep: 1,
    },
    {
      name: '经销商确认正确',
      value: 22,
      badgeStatus: 'processing',
      typeList: ['TODO', 'EXCEPTION', 'ALL'],
      processStep: 1,
    },
    {
      name: '初审不通过退到二网',
      value: 30,
      badgeStatus: 'error',
      typeList: ['EXCEPTION', 'ALL'],
      processStep: -1,
    },
    {
      name: '初审不通过退到经销商',
      value: 31,
      badgeStatus: 'error',
      typeList: ['EXCEPTION', 'ALL'],
      processStep: -1,
    },
    {
      name: '保证金初审通过',
      value: 32,
      badgeStatus: 'success',
      typeList: ['TODO', 'EXCEPTION', 'ALL'],
      processStep: 2,
    },
    {
      name: '二网信息初审通过',
      value: 33,
      badgeStatus: 'success',
      typeList: ['EXCEPTION', 'ALL'],
      processStep: 3,
    },
    {
      name: '客户经理审核不通过',
      value: 50,
      badgeStatus: 'error',
      typeList: ['TODO', 'EXCEPTION', 'ALL'],
      processStep: 2,
    },
    {
      name: '客户经理审核通过',
      value: 53,
      badgeStatus: 'success',
      typeList: ['ALL'],
      processStep: 4,
    },
    {
      name: '支行行长审核不通过',
      value: 60,
      badgeStatus: 'error',
      typeList: ['TODO', 'EXCEPTION', 'ALL'],
      processStep: 2,
    },
    {
      name: '支行行长审核通过',
      value: 63,
      badgeStatus: 'success',
      typeList: ['ALL'],
      processStep: 5,
    },
    {
      name: '复审不通过',
      value: 40,
      badgeStatus: 'error',
      typeList: ['TODO', 'EXCEPTION', 'ALL'],
      processStep: 2,
    },
    {
      name: '复审通过',
      value: 0,
      badgeStatus: 'success',
      typeList: ['ALL'],
      processStep: 3,
    },
    {
      name: '确认回执',
      value: 41,
      badgeStatus: 'success',
      typeList: ['ALL', 'bondDetail'],
      processStep: 3,
    },
    {
      name: '异常任务',
      value: 42,
      badgeStatus: 'error',
      typeList: ['TODO', 'EXCEPTION', 'ALL'],
      processStep: 3,
    },
    {
      name: '确认异常重新发起续作',
      value: 99,
      badgeStatus: 'error',
      typeList: ['EXCEPTION', 'ALL'],
      processStep: 3,
    },
    {
      name: '终止关联',
      value: 999,
      badgeStatus: 'error',
      typeList: ['ALL'],
      processStep: 1,
    },
    {
      name: '已失效',
      value: 9,
      badgeStatus: 'error',
      typeList: ['ALL', 'bondDetail'],
      processStep: 3,
    },
  ],
  repoStatusDicList: [
    {
      name: '全部',
      value: -1,
      badgeStatus: 'processing',
      typeList: ['FIRSTTODO', 'FIRSTHIS', 'LASTHIS'],
    },
    {
      name: '待审核',
      value: 1,
      badgeStatus: 'processing',
      typeList: ['FIRSTTODO'],
    },
    {
      name: '初审审核通过',
      value: 2,
      badgeStatus: 'success',
      typeList: ['FIRSTHIS'],
    },
    {
      name: '初审审核不通过',
      value: 3,
      badgeStatus: 'error',
      typeList: ['FIRSTHIS'],
    },
    {
      name: '复审通过',
      value: 4,
      badgeStatus: 'success',
      typeList: ['FIRSTHIS', 'LASTHIS'],
    },
    {
      name: '复审审核不通过',
      value: 5,
      badgeStatus: 'error',
      typeList: ['FIRSTTODO', 'LASTHIS'],
    },
  ],
  commonDic: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '是',
      value: 1,
    },
    {
      name: '否',
      value: 0,
    },
  ],
  statusTypeList: [
    {
      name: '未生效',
      value: 0,
    },
    {
      name: '有效',
      value: 1,
    },
    {
      name: '失效',
      value: 2,
    },
  ],
  exportTypeList: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '初始转入',
      value: 1,
    },
    {
      name: '追加转入',
      value: 2,
    },
    {
      name: '活期初始',
      value: 3,
    },
    {
      name: '活期追加',
      value: 4,
    },
    {
      name: '转出',
      value: 5,
    },
  ],
  isfirstDicList: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '首次关联',
      value: 0,
    },
    {
      name: '续作',
      value: 1,
    },
    {
      name: '解除关联',
      value: 2,
    },
  ],
  contractTypeDicList: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '意愿函',
      value: 1,
    },
    {
      name: '效力函',
      value: 2,
    },
  ],
  businessTypeDicList: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '转入',
      value: 1,
    },
    {
      name: '转出',
      value: 2,
    },
  ],
  moneyGetTypeDicList: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '无',
      value: 0,
    },
    {
      name: '按店',
      value: 1,
    },
    {
      name: '按台',
      value: 2,
    },
  ],
  bondTypeDicList: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '转入',
      value: 1,
    },
    {
      name: '转出',
      value: 2,
    },
  ],
  exportTypeDicList: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '初始转入',
      value: 1,
    },
    {
      name: '追加转入',
      value: 2,
    },
    {
      name: '活期初始',
      value: 3,
    },
    {
      name: '活期追加',
      value: 4,
    },
    {
      name: '转出',
      value: 5,
    },
  ],
  solveSolutionsDicList: [
    {
      name: '全部',
      value: -1,
    },
    {
      name: '',
      value: 0,
    },
    {
      name: '提交到银行复审',
      value: 1,
    },
    {
      name: '确认异常重新发起续作',
      value: 2,
    },
    {
      name: '退回到二网',
      value: 3,
    },
    {
      name: '退回到经销商',
      value: 4,
    },
  ],
  ewStatusDic: [
    {
      name: '正常',
      value: 0,
      badgeStatus: 'success',
    },
    {
      name: '拍摄照片',
      value: 2,
      badgeStatus: 'processing',
    },
    {
      name: '待审核',
      value: 3,
      badgeStatus: 'processing',
    },
    {
      name: '审核不通过',
      value: 4,
      badgeStatus: 'error',
    },
    {
      name: '禁用',
      value: 9,
      badgeStatus: 'default',
    },
  ],
  confirmStatusDic: [
    {
      name: '未确认回执',
      value: 0,
      badgeStatus: 'processing',
    },
    {
      name: '已确认回执',
      value: 1,
      badgeStatus: 'success',
    },
    {
      name: '已失效',
      value: 2,
      badgeStatus: 'default',
    },
  ],
};

export const distributorStatusDic = [
  {
    name: '正常',
    value: 0,
    badgeStatus: 'success',
  },
  {
    name: '待上传影像资料',
    value: 1,
    badgeStatus: 'processing',
  },
  {
    name: '待审核',
    value: 2,
    badgeStatus: 'processing',
  },
  {
    name: '停用',
    value: 9,
    badgeStatus: 'default',
  },
];
export const ewStatusDic = [
  {
    name: '正常',
    value: 0,
    badgeStatus: 'success',
  },
  {
    name: '拍摄照片',
    value: 2,
    badgeStatus: 'processing',
  },
  {
    name: '待审核',
    value: 3,
    badgeStatus: 'processing',
  },
  {
    name: '审核不通过',
    value: 4,
    badgeStatus: 'error',
  },
  {
    name: '停用',
    value: 9,
    badgeStatus: 'default',
  },
];

export const excepResionList = [
  {
    name: '超时未拍照',
    value: 0,
  },
  {
    name: '移回主店',
    value: 1,
  },
  {
    name: '移动到其他二网',
    value: 2,
  },
  {
    name: '车辆已售',
    value: 3,
  },
  {
    name: '定位异常',
    value: 5,
  },
  // {
  //   name: '超时未确认拍照时间',
  //   value: 6,
  // },
  {
    name: '系统问题',
    value: 7,
  },
  {
    name: '二网错误操作',
    value: 8,
  },
  {
    name: '操作异常',
    value: 11,
  },
  {
    name: '移动至车展',
    value: 12,
  },
];
export const spottestList = [
  {
    name: '自动抽查',
    value: 0,
  },
  {
    name: '银行抽查',
    value: 1,
  },
  {
    name: '平台抽查',
    value: 2,
  },
  {
    name: '经销商抽查',
    value: 3,
  },
  {
    name: '车展移回抽查',
    value: 4,
  },
  {
    name: '移动至二网抽查',
    value: 5,
  },
  {
    name: '移动回主店抽查',
    value: 6,
  },
  {
    name: '车展自动抽查',
    value: 8,
  },
  {
    name: '车展手动抽查',
    value: 9,
  },
  {
    name: '汽车厂商抽查',
    value: 11,
  },
];

export const carStatusList = [
  {
    name: '在主店',
    value: 0,
  },
  {
    name: '在二网 ',
    value: 1,
  },
  {
    name: '迁移中',
    value: 2,
  },
  {
    name: '移回中',
    value: 3,
  },
  {
    name: '在二库',
    value: 4,
  },
  {
    name: '车展申请中',
    value: 5,
  },
  {
    name: '在车展',
    value: 6,
  },
  {
    name: '待车展',
    value: 7,
  },
  {
    name: '车辆已售',
    value: 9,
  },
  {
    name: '车展移回',
    value: 8,
  },
  {
    name: '超额移动待审批',
    value: 20,
  },
];
export const unShootTypeList = [
  {
    name: '不记录违规',
    value: 10,
  },
  {
    name: '异常超时',
    value: 11,
  },
  {
    name: '严重超时',
    value: 12,
  },
];
export const locationStatusList = [
  {
    name: '全部',
    value: '',
  },
  {
    name: '在主店',
    value: 0,
  },
  {
    name: '在二网',
    value: 1,
  },
  {
    name: '迁移中',
    value: 2,
  },
];
export const carFromList = [
  {
    name: '全部',
    value: '',
  },
  {
    name: '手动录入',
    value: 0,
  },
  {
    name: '批量录入',
    value: 1,
  },
  {
    name: '赎车',
    value: 2,
  },
];
export const moveCarsTypeList = [
  {
    name: '到店确认',
    value: 2,
  },
  {
    name: '审核通过',
    value: 3,
  },
  {
    name: '取消移动',
    value: 5,
  },
  {
    name: '到店确认不通过',
    value: 6,
  },
];

export const repoStatusDicSelfcarList = [
  {
    name: '全部',
    value: '',
    badgeStatus: 'processing',
  },
  {
    name: '待审核',
    value: 20,
    badgeStatus: 'processing',
  },
  {
    name: '待上传车辆照片',
    value: 10,
    badgeStatus: 'processing',
  },
  {
    name: '退回重拍',
    value: 30,
    badgeStatus: 'error',
  },
  {
    name: '异常反馈',
    value: 60,
    badgeStatus: 'error',
  },
];

export const goneStatusDicSelfcarList = [
  {
    name: '全部',
    value: '',
    badgeStatus: 'processing',
  },
  {
    name: '审核通过',
    value: 40,
    badgeStatus: 'processing',
  },
  {
    name: '审核不通过',
    value: 50,
    badgeStatus: 'processing',
  },
  {
    name: '终止',
    value: 90,
    badgeStatus: 'error',
  },
];

export const clientList = [
  {
    name: '树莓派',
    value: 0,
  },
];

export const selfcarTypeList = [
  {
    name: '全部',
    value: null,
  },
  {
    name: '新车',
    value: 0,
  },
  {
    name: '二手车',
    value: 1,
  },
];

export default EBDic;
