export const orderNoColumn = {
  title: '订单编号',
  dataIndex: 'orderNo',
};
export const invoiceAccIdColumn = {
  title: '账号',
  dataIndex: 'accid',
};
export const invoiceDepartNameColumn = {
  title: '公司名称',
  dataIndex: 'departname',
};
export const invoiceApplyTimeColumn = {
  title: '申请开票时间',
  dataIndex: 'createTime',
};
export const invoiceCreateTimeColumn = {
  title: '订单创建时间',
  dataIndex: 'orderCreateTime',
};
export const invoiceAmountColumn = {
  title: '实际开票金额 (元)',
  dataIndex: 'invoiceAmount',
};
export const invoicingMethodColumn = {
  title: '开票类型',
  dataIndex: 'invoicingMethodStr',
  //render: type => (type === '1' ? '普通发票' : '增值税专用发票'),
};
export const invoiceTypeColumn = {
  title: '开票方式',
  dataIndex: 'invoiceTypeStr',
  //render: type => (type === '1' ? '电子发票' : '纸质发票'),
};
export const invoiceHandleTimeColumn = {
  title: '开票时间',
  dataIndex: 'handleTime',
};
export const invoiceHandleUserNameColumn = {
  title: '开票人',
  dataIndex: 'handleUserName',
};
export const invoiceActionColumn = {
  title: '功能操作',
  dataIndex: 'orderAction',
};
export const orderAmount = {
  title: '订单金额 (元)',
  dataIndex: 'orderAmount'
};