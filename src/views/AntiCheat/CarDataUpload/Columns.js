const 经销商名称 = {
  title: '经销商名称',
  dataIndex: 'distributorName',
};
const custname = {
  title: '经销商名称',
  dataIndex: 'custname',
};
const 发车日期 = {
  title: '发车日期',
  dataIndex: 'departtime',
};
const 申请号 = {
  title: '申请号',
  dataIndex: 'applyNo',
};
const supplyChain = {
  title: '供应链',
  dataIndex: 'supplyChain',
};
const brandName = {
  title: '品牌',
  dataIndex: 'brandName',
};
const tradername = {
  title: '品牌',
  dataIndex: 'tradername',
};
const 商品代码 = {
  title: '商品代码',
  dataIndex: 'goodsCode',
};
const 商品名称 = {
  title: '商品名称',
  dataIndex: 'goodsName',
};
const 新价格 = {
  title: '新价格',
  dataIndex: 'newprice',
};
const 标识 = {
  title: '标识',
  dataIndex: 'chassis',
};
const 凭证号 = {
  title: '凭证号',
  dataIndex: 'voucherno',
};
const 核心厂商发货时间 = {
  title: '核心厂商发货时间',
  dataIndex: 'firmsSendtime',
};
const 入库时间 = {
  title: '入库时间',
  dataIndex: 'intime',
};
const 出库时间 = {
  title: '出库时间',
  dataIndex: 'outtime',
};
const 押品状态 = {
  title: '押品状态',
  dataIndex: 'pledgeStatus',
};
const 业务编号 = {
  title: '业务编号',
  dataIndex: 'businessNo',
};
const 发车状态 = {
  title: '发车状态',
  dataIndex: 'departStatus',
};
const 车辆出库时间 = {
  title: '车辆出库时间',
  dataIndex: 'carOutboundTime',
};
const 始发地 = {
  title: '始发地',
  dataIndex: 'originPlace',
};
const 预计到店时间 = {
  title: '预计到店时间',
  dataIndex: 'estimateArriveTime',
};
const 接收地址 = {
  title: '接收地址',
  dataIndex: 'receiveAddress',
};
const 全地盘号 = {
  title: '全地盘号',
  dataIndex: 'fullChassisNo',
};
const 推送备注信息 = {
  title: '推送备注信息',
  dataIndex: 'pushRemark',
};
const 状态 = {
  title: '状态',
  dataIndex: 'statusName',
};
const flagName = {
  title: '状态',
  dataIndex: 'flagName',
};
const 最后处理时间 = {
  title: '最后处理时间',
  dataIndex: 'handletime',
};
const handleTime = {
  title: '最后处理时间',
  dataIndex: 'handleTime',
};
const 备注 = {
  title: '备注',
  dataIndex: 'remark',
};
const 系统格式备注 = {
  title: '备注',
  dataIndex: 'moveFailureReason',
  render: (text, item) => `${item.remark}${text && '，' + text}`
};
const 银行名称 = {
  title: '银行名称',
  dataIndex: 'bankName',
};
const 车系 = {
  title: '车系',
  dataIndex: 'modelName',
};
const 车型 = {
  title: '车型',
  dataIndex: 'trimName',
};
const 车辆价格 = {
  title: '车辆价格',
  dataIndex: 'carprice',
};
const 入库日期 = {
  title: '入库日期',
  dataIndex: 'lrtime',
};
const 所在位置 = {
  title: '所在位置',
  dataIndex: 'destLocation',
};
const 银行车架号 = {
  title: '银行车架号',
  dataIndex: 'chassis',
};
const 还款时间 = {
  title: '还款时间',
  dataIndex: 'businessdate',
};
const 业务类型 = {
  title: '业务类型',
  dataIndex: 'busissnessTypeName',
};
const 实际回款 = {
  title: '实际回款(元)',
  dataIndex: 'poolacctvalue',
};

export const chengColumns = [
  发车日期,
  经销商名称,
  申请号,
  supplyChain,
  商品代码,
  商品名称,
  新价格,
  标识,
  凭证号,
  核心厂商发货时间,
  入库时间,
  出库时间,
  押品状态,
  业务编号,
  发车状态,
  车辆出库时间,
  始发地,
  预计到店时间,
  接收地址,
  全地盘号,
  推送备注信息,
  状态,
  最后处理时间,
  备注,
];
export const systemColumns = [
  银行名称,
  经销商名称,
  brandName,
  车系,
  车型,
  银行车架号,
  车辆价格,
  入库日期,
  所在位置,
  flagName,
  handleTime,
  系统格式备注,
];
export const returnColumns = [
  银行名称,
  custname,
  tradername,
  银行车架号,
  还款时间,
  状态,
  最后处理时间,
  备注,
];
