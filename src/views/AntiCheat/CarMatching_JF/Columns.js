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
  title: '车架号(VIN)',
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
const 商代处名称 = {
  title: '商代处名称',
  dataIndex: 'tradeRepresentationName',
};
const 经销商代码 = {
  title: '经销商代码',
  dataIndex: 'dealerCode',
};
const 网络类型 = {
  title: '网络类型',
  dataIndex: 'netType',
};
const 提车单编号 = {
  title: '提车单编号',
  dataIndex: 'extractionCarOrderNo',
};
const 收车网点属性 = {
  title: '收车网点属性',
  dataIndex: 'acceptCarNetProperty',
};
const 收车地址 = {
  title: '收车地址',
  dataIndex: 'acceptCarAddress',
};
const 运输方式 = {
  title: '运输方式',
  dataIndex: 'transportMode',
};
const 公告车型 = {
  title: '公告车型',
  dataIndex: 'announceCarMode',
};
const 产品代码 = {
  title: '产品代码',
  dataIndex: 'productCode',
};
const 数量 = {
  title: '数量',
  dataIndex: 'quantity',
};
const 资金来源 = {
  title: '资金来源',
  dataIndex: 'sourcesOfFunds',
};
const 底盘金额 = {
  title: '底盘金额',
  dataIndex: 'chassisAmount',
};
const 上装金额 = {
  title: '上装金额',
  dataIndex: 'superstructureAmount',
};
const 合计金额 = {
  title: '合计金额',
  dataIndex: 'totalAmount',
};
const 仓库属性 = {
  title: '仓库属性',
  dataIndex: 'warehouseProperties',
};
const 提车仓库 = {
  title: '提车仓库',
  dataIndex: 'extractionWarehouseCode',
};
const 提车仓库名称 = {
  title: '提车仓库名称',
  dataIndex: 'extractionWarehouseName',
};
const 合格证号手工补充 = {
  title: '合格证号(手工补充)',
  dataIndex: 'manualCertificateNo',
};
const 出库日期 = {
  title: '出库日期',
  dataIndex: 'outboundDate',
};
const 实际送达日期 = {
  title: '实际送达日期',
  dataIndex: 'actualDeliveryDate',
};
const 最迟送达日期 = {
  title: '最迟送达日期',
  dataIndex: 'latestDeliveryDate',
};
const 结算日期 = {
  title: '结算日期',
  dataIndex: 'balanceDate',
};
const 零售日期 = {
  title: '零售日期',
  dataIndex: 'retailDate',
};
const 车辆状态 = {
  title: '车辆状态',
  dataIndex: 'carStatus',
};
const 送达通知书编号 = {
  title: '送达通知书编号',
  dataIndex: 'serviceNoticeNo',
};
const 送达通知书生成日期 = {
  title: '送达通知书生成日期',
  dataIndex: 'serviceNoticeGenerateDate',
};
const 邮寄状态 = {
  title: '邮寄状态',
  dataIndex: 'postStatus',
};
const 邮寄日期 = {
  title: '邮寄日期',
  dataIndex: 'postDate',
};
const 发车日期 = {
  title: '发车日期',
  dataIndex: 'outboundDate',
};
const 状态 = {
  title: '状态',
  dataIndex: 'statusCode',
  render: text => (text == 'assign_status_1' ? '未分配' : '已分配'),
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
  商代处名称,
  经销商代码,
  经销商名称,
  网络类型,
  提车单编号,
  收车网点属性,
  收车地址,
  运输方式,
  公告车型,
  产品代码,
  数量,
  资金来源,
  底盘金额,
  上装金额,
  合计金额,
  仓库属性,
  提车仓库,
  提车仓库名称,
  合格证号,
  合格证号手工补充,
  车架号,
  发动机号,
  出库日期,
  实际送达日期,
  最迟送达日期,
  结算日期,
  零售日期,
  车辆状态,
  送达通知书编号,
  送达通知书生成日期,
  邮寄状态,
  邮寄日期,
  状态,
  实际分配票据号,
  业务编号,
  推送状态,
  推送时间,
];
export const thirdModalColumns = [票号, 业务编号, 票面金额, 已分配金额, 分账号];
export const matchListColumns = [匹配日期, 经销商名称, 票面金额, 业务编号, 分账号, 已分配金额, 车架号, 单价, 发车日期];
