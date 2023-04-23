const 经销商名称 = {
  title: '经销商名称',
  dataIndex: 'custname',
};
const 业务编号 = {
  title: '业务编号',
  dataIndex: 'bizno',
};
const 监管方 = {
  title: '监管方',
  dataIndex: 'supervisor',
};
const 发车日期 = {
  title: '发车日期',
  dataIndex: 'outputdate',
};
const 供应链 = {
  title: '供应链',
  dataIndex: 'tradername',
};
const 标识 = {
  title: '标识',
  dataIndex: 'identification',
};
const 新价格 = {
  title: '新价格',
  dataIndex: 'unitprice',
};
const 押品状态 = {
  title: '押品状态',
  dataIndex: 'collstatus',
};
const 监管方状态 = {
  title: '监管方状态',
  dataIndex: 'supervisorStatus',
};
const 备注 = {
  title: '备注',
  dataIndex: 'remark',
};
const 押品状态监管方状态是否一致 = {
  title: '押品状态/监管方状态是否一致',
  dataIndex: 'consistentState',
};
const 大众厂家状态 = {
  title: '大众厂家状态',
  dataIndex: 'dazhongFactoryStatus',
};
const 大众厂家时间 = {
  title: '大众厂家时间',
  dataIndex: 'dazhongFactoryTime',
};
const 解放车辆状态 = {
  title: '解放车辆状态',
  dataIndex: 'jiefangCarStatus',
};
const 零售日期 = {
  title: '零售日期',
  dataIndex: 'retailDate',
};
const 邮寄状态 = {
  title: '邮寄状态',
  dataIndex: 'postStatus',
};
const 邮寄日期 = {
  title: '邮寄日期',
  dataIndex: 'postDate',
};
const 仓库属性 = {
  title: '仓库属性',
  dataIndex: 'warehouseProperties',
};
export const collectColumns = [
  监管方,
  发车日期,
  经销商名称,
  供应链,
  标识,
  新价格,
  押品状态,
  业务编号,
  监管方状态,
  备注,
  押品状态监管方状态是否一致,
  大众厂家状态,
  大众厂家时间,
  解放车辆状态,
  零售日期,
  邮寄状态,
  邮寄日期,
  仓库属性
];
export const policyColumns = [
  {
    title: '客户经理',
    dataIndex: 'customerManager',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '经销商名称',
    dataIndex: 'dealerName',
  },
  {
    title: '保证金比例',
    dataIndex: 'bondRate',
  },
  {
    title: '是否改系统',
    dataIndex: 'isModifySys',
  },
  {
    title: '池模式',
    dataIndex: 'poolModel',
  },
  {
    title: '改系统时间',
    dataIndex: 'modifySysDate',
  },
  {
    title: '换证政策',
    dataIndex: 'exchangeCertPolicy',
  },
  {
    title: '特殊还款政策',
    dataIndex: 'repaymentPolicy',
  },
  {
    title: '协定利率',
    dataIndex: 'agreedRate',
  },
  {
    title: '特殊操作',
    dataIndex: 'specialOpt',
  },
  {
    title: '费用减免',
    dataIndex: 'feeRelief',
  },
  {
    title: '贷款利率',
    dataIndex: 'interestRates',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '收益',
    dataIndex: 'income',
  },
  {
    title: '申请政策满足条件1',
    dataIndex: 'applicationRequirement',
  },
  {
    title: '申请政策满足条件2',
    dataIndex: 'applicationRequirement2',
  },
  {
    title: '申请政策满足条件3',
    dataIndex: 'applicationRequirement3',
  },
  {
    title: '末次编辑时间',
    dataIndex: 'updatetime',
  },
]
export const usedCarColumns = [
  {
    title: '贷款编号',
    dataIndex: 'loanNo',
  },
  {
    title: '放款日期',
    dataIndex: 'loanDate',
  },
  {
    title: '到期日',
    dataIndex: 'endLoanDate',
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
  },
  {
    title: '经销商代码',
    dataIndex: 'dealerCode',
  },
  {
    title: '经销商名称',
    dataIndex: 'dealerName',
  },
  {
    title: '业务类型',
    dataIndex: 'carType',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '车型',
    dataIndex: 'vehicleTypeName',
  },
  {
    title: '车辆识别代码',
    dataIndex: 'vin',
  },
  {
    title: '评估金额(元)',
    dataIndex: 'assessmentPrice',
  },
  {
    title: '单笔放款金额(元)',
    dataIndex: 'loanAmount',
  },
  {
    title: '单笔业务放款金额(元)',
    dataIndex: 'businessLoanAmount',
  },
  {
    title: '已还款金额(元)',
    dataIndex: 'redemptionAmount',
  },
  {
    title: '未还款金额(元)',
    dataIndex: 'nonRepaymentAmount',
  },
  {
    title: '最近还款日期',
    dataIndex: 'recentRepaymentDate',
  },
  {
    title: '赎车状态',
    dataIndex: 'redeemStatus',
  },
  {
    title: '部分还款日期',
    dataIndex: 'partialRedeemDate',
  },
  {
    title: '部分还款金额',
    dataIndex: 'partialRedeemAmount',
  },
  {
    title: '总利息金额(元)',
    dataIndex: 'interestTotal',
  },
  {
    title: '免息天数',
    dataIndex: 'freeDay',
  },
  {
    title: '免息金额(元)',
    dataIndex: 'interestFreeTotal',
  },
  {
    title: '应付利息金额(元)',
    dataIndex: 'payInterestTotal',
  },
  {
    title: '年利率(%)',
    dataIndex: 'benchMarkRate',
  },
  {
    title: '最近结息日期',
    dataIndex: 'interestDate',
  },
]
export const supervisorColumns = [
  {
    title: '客户名称',
    dataIndex: 'custname',
  },
  {
    title: '客户经理',
    dataIndex: 'custManager',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '监管方',
    dataIndex: 'supervisor',
  },
  {
    title: '派监管日期',
    dataIndex: 'dispatchSupervisionDate',
  },
  {
    title: '到店日期',
    dataIndex: 'arrivalDate',
  },
  {
    title: '是否撤监管',
    dataIndex: 'deregulationFlag',
  },
  {
    title: '撤监管日期',
    dataIndex: 'deregulationDate',
  },
  {
    title: '结算账号',
    dataIndex: 'settlementAccountNo',
  },
  {
    title: '保证金账号',
    dataIndex: 'depositAccountNo',
  },
  {
    title: '应解汇款账号',
    dataIndex: 'remittanceAccountNo',
  },
  {
    title: '变更监管',
    dataIndex: 'changeSupervisionNote',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '末次编辑时间',
    dataIndex: 'updatetime',
  },
]