const 经销商名称 = {
  title: '经销商名称',
  dataIndex: 'dealerName',
};
const 导入日期 = {
  title: '导入日期',
  dataIndex: 'importDate',
};
const 业务编号 = {
  title: '业务编号',
  dataIndex: 'businessNo',
};
const 票号 = {
  title: '票号',
  dataIndex: 'billNo',
};
const 票面金额 = {
  title: '票面金额',
  dataIndex: 'faceAmount',
};
const 已分配金额 = {
  title: '已分配金额',
  dataIndex: 'allocatedAmount',
};
const 剩余金额 = {
  title: '剩余金额',
  dataIndex: 'remainingAmount',
};
const 分账号 = {
  title: '分账号',
  dataIndex: 'subAccountNo',
};
const 开票日 = {
  title: '开票日',
  dataIndex: 'invoiceDate',
};
const 到期日 = {
  title: '到期日',
  dataIndex: 'dueDate',
};
const 收款人 = {
  title: '收款人',
  dataIndex: 'payee',
};
const 开票状态 = {
  title: '状态',
  dataIndex: 'statusCode',
  render: text => (text == 'bill_status_1' ? '未结清' : '已结清'),
};
const 三方出库状态 = {
  title: '状态',
  dataIndex: 'statusCode',
  render: text => (text == 'assign_status_1' ? '未分配' : '已分配'),
};
const 销售订单号 = {
  title: '销售订单号',
  dataIndex: 'salesOrderNo',
};
const 车架号 = {
  title: '车架号',
  dataIndex: 'vin',
};
const 单价 = {
  title: '单价',
  dataIndex: 'price',
};
const 备注 = {
  title: '备注',
  dataIndex: 'remark',
};
const 解析票据号 = {
  title: '解析票据号',
  dataIndex: 'analysisBillNo',
};
const 实际分配票据号 = {
  title: '实际分配票据号',
  dataIndex: 'billNo',
};
const 匹配日期 = {
  title: '匹配日期',
  dataIndex: 'matchedDate',
};
const 核心厂商发货日期 = {
  title: '核心厂商发货日期',
  dataIndex: 'outboundDate',
};
const 收货地址 = {
  title: '收货地址',
  dataIndex: 'receivedAddress',
};
const 省份 = {
  title: '省份',
  dataIndex: 'province',
};
const 基地 = {
  title: '基地',
  dataIndex: 'base',
};
const 车型 = {
  title: '车型',
  dataIndex: 'model',
};
const 发动机号 = {
  title: '发动机号',
  dataIndex: 'engineNo',
};
const 合格证号 = {
  title: '合格证号',
  dataIndex: 'certificateNo',
};
const 资金类型 = {
  title: '资金类型',
  dataIndex: 'fundType',
};
const 结清日期 = {
  title: '结清日期',
  dataIndex: 'settlementDate',
};
const 推送状态 = {
  title: '推送状态',
  dataIndex: 'syncStatus',
};
const 推送时间 = {
  title: '推送时间',
  dataIndex: 'syncTime',
};
const 实时敞口 = {
  title: '实时敞口',
  dataIndex: 'availexportamt',
};

export const collectColumns = [
  导入日期,
  经销商名称,
  业务编号,
  票号,
  票面金额,
  已分配金额,
  剩余金额,
  分账号,
  开票日,
  到期日,
  收款人,
  开票状态,
  结清日期
];
export const thirdColumns = [
  导入日期,
  经销商名称,
  销售订单号,
  车架号,
  单价,
  备注,
  解析票据号,
  三方出库状态,
  实际分配票据号,
  核心厂商发货日期,
  业务编号,
  推送状态,
  推送时间,
  收货地址,
];
export const thirdModalColumns = [票号, 票面金额, 已分配金额, 分账号, 实时敞口];
export const matchListColumns = [
  匹配日期,
  经销商名称,
  业务编号,
  票号,
  票面金额,
  已分配金额,
  分账号,
  车架号,
  单价,
  核心厂商发货日期,
  省份,
  基地,
  销售订单号,
  车型,
  发动机号,
  合格证号,
  资金类型,
  收货地址,
  备注,
];
