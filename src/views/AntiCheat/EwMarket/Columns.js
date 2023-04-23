import { auditStatus } from './index'
const 车架号 = {
  title: '车架号',
  dataIndex: 'vin',
};
const 车辆品牌 = {
  title: '车辆品牌',
  dataIndex: 'brandName',
};
const 所属车系 = {
  title: '所属车系',
  dataIndex: 'vehicleSeriesName',
};
const 所属车型 = {
  title: '所属车型',
  dataIndex: 'vehicleTypeName',
};
const 奖励金额 = {
  title: '奖励金额(元)',
  dataIndex: 'bonusAmount',
};
const 创建时间 = {
  title: '创建时间',
  dataIndex: 'createDate',
};
const 最后提交时间 = {
  title: '最后提交时间',
  dataIndex: 'updateDate',
};
// const 二网与主店距离 = {
//   title: '二网与主店距离（m）',
//   dataIndex: 'agentDistance',
// };
const 二网名称 = {
  title: '二网名称',
  dataIndex: 'agentName',
};
const 省份 = {
  title: '省份',
  dataIndex: 'province',
};
const 城市 = {
  title: '城市',
  dataIndex: 'city',
};
const 地址 = {
  title: '地址',
  dataIndex: 'agentAddress',
};
const 联系人 = {
  title: '联系人',
  dataIndex: 'agentContactPerson',
};
const 联系电话 = {
  title: '联系电话',
  dataIndex: 'agentContactPhone',
};
const 最后提交位置 = {
  title: '最后提交位置',
  dataIndex: 'submitLocation',
};
const 客户姓名 = {
  title: '客户姓名',
  dataIndex: 'vehicleCustumer.custumerName',
};
const 客户联系电话 = {
  title: '客户联系电话',
  dataIndex: 'vehicleCustumer.custumerPhone',
};
const 经销商名称 = {
  title: '经销商名称',
  dataIndex: 'dealerName',
};
const 所属于汽车厂家 = {
  title: '所属于汽车厂家',
  dataIndex: 'manufacturerName',
};
const 任务状态 = {
  title: '任务状态',
  dataIndex: 'auditStatus',
  render: (text) => auditStatus(text)
};
const 激励奖金发放时间 = {
  title: '激励奖金发放时间',
  dataIndex: 'bonusDate',
};
const 激励奖金发放备注 = {
  title: '激励奖金发放备注',
  dataIndex: 'bonusRemarks',
};
const 开户银行 = {
  title: '开户银行',
  dataIndex: 'bankAccount.bankName',
};
const 支行 = {
  title: '支行',
  dataIndex: 'bankAccount.bankBranchName',
};
const 银行卡号 = {
  title: '银行卡号',
  dataIndex: 'bankAccount.accountNo',
};
const 合作品牌 = {
  title: '合作品牌',
  dataIndex: 'brandName',
};
const 销售日期 = {
  title: '销售日期',
  dataIndex: 'saleDate',
};
const 销售台数 = {
  title: '销售台数',
  dataIndex: 'totalCount',
};
const 打款日期 = {
  title: '打款日期',
  dataIndex: 'bonusDate',
};
const 备注 = {
  title: '备注',
  dataIndex: 'remark',
};
const 总奖励金额 = {
  title: '奖励金额',
  dataIndex: 'totalAmount',
};
export const marketListColumns = [
  车架号,
  车辆品牌,
  所属车系,
  所属车型,
  奖励金额,
  创建时间,
  最后提交时间,
  二网名称,
  省份,
  城市,
  地址,
  联系人,
  联系电话,
  最后提交位置,
  客户姓名,
  客户联系电话,
  经销商名称,
  所属于汽车厂家,
  任务状态,
  激励奖金发放时间,
  激励奖金发放备注
];
export const awardCheckColumns = [
  经销商名称,
  二网名称,
  开户银行,
  支行,
  银行卡号,
  合作品牌,
  车架号,
  所属车系,
  所属车型,
  销售日期,
  客户姓名,
  客户联系电话,
  奖励金额
]
export const awardRemitColumns = [
  经销商名称,
  二网名称,
  开户银行,
  支行,
  银行卡号,
  // 合作品牌,
  销售台数,
  总奖励金额,
  打款日期,
  备注
]
export const columnsItem = [
  { title: '购车人', dataIndex: 'vehicleCustumer.custumerName' },
  { title: '联系电话', dataIndex: 'vehicleCustumer.custumerPhone' },
  { title: '车架号', dataIndex: 'vin' },
  { title: '车辆品牌', dataIndex: 'brandName' },
  { title: '车系', dataIndex: 'vehicleSeriesName' },
  { title: '款式', dataIndex: 'vehicleTypeName' },
  { title: '销售日期', dataIndex: 'saleDate' },
  { title: '奖励金额(元)', dataIndex: 'bonusAmount' },
];
