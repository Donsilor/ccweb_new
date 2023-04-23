import React from 'react';
const 经销商名称 = {
  title: '经销商名称',
  dataIndex: 'dealerName',
};
const 合作状态 = {
  title: '合作状态',
  dataIndex: 'cooperateStatusName',
};
const 操作时间 = {
  title: '操作时间',
  dataIndex: 'delTime',
};
const 年月 = {
  title: '年月',
  dataIndex: 'yearMonth',
};
const 品牌名称 = {
  title: '品牌名称',
  dataIndex: 'brandName',
};
const 本月出账金额 = {
  title: '本月出账金额(元)',
  dataIndex: 'curMonthAccountAmount',
};
const 上月出账金额 = {
  title: '上月出账金额(元)',
  dataIndex: 'lastMonthAccountAmount',
};
const 较上月涨幅降幅 = {
  title: '较上月涨幅／降幅',
  dataIndex: 'ratio',
};
const 末次还款日期 = {
  title: '末次还款日期',
  dataIndex: 'lastBusinessTime',
};
const 距今几天没有赎车 = {
  title: '距今N天没有赎车',
  dataIndex: 'noRepaymentDays',
  render: (text, record) => (record.ransomCarDaysWarning ? <span style={{ color: 'red' }}>{text}</span> : text),
};
const 本月销量 = {
  title: '本月销量',
  dataIndex: 'curSalesVolume',
};
const 上月销量 = {
  title: '上月销量',
  dataIndex: 'lastSalesVolume',
};
const 本月品牌总销量 = {
  title: '本月品牌总销量',
  dataIndex: 'brandTotSalesVolume',
};
const 占比 = {
  title: '占比',
  dataIndex: 'branRatio',
};
const 本月品牌平均销量 = {
  title: '本月品牌平均销量',
  dataIndex: 'brandAvgSalesVolume',
};
const 导入日期 = {
  title: '导入日期',
  dataIndex: 'importTime',
};
const 一个月后赎货保证金合计 = {
  title: '一个月后赎货保证金合计(元)',
  dataIndex: 'totRansomBond',
};
const 近一个月剩余敞口金额合计 = {
  title: '近一个月剩余敞口金额合计(元)',
  dataIndex: 'totSurplusExposureAmount',
};
const 是否可覆盖 = {
  title: '是否可覆盖',
  dataIndex: 'isCover',
};
const 换出车辆价值总计 = {
  title: '换出车辆价值总计(元)',
  dataIndex: 'totChangePrice',
};
const 上月已使用敞口金额合计 = {
  title: '上月已使用敞口金额合计(元)',
  dataIndex: 'lastMonthUsedExposure',
};
const 本月出账金额合计 = {
  title: '本月出账金额合计(元)',
  dataIndex: 'curMonthAccountAmount',
};
const 本月已使用敞口金额合计 = {
  title: '本月已使用敞口金额合计(元)',
  dataIndex: 'curMonthUsedExposure',
};
const 本月回款情况 = {
  title: '本月回款情况',
  dataIndex: 'curMonthReturnedMoney',
};
const 上月回款情况 = {
  title: '上月回款情况',
  dataIndex: 'lastMonthReturnedMoney',
};
const 较平均销量相比上涨下降 = {
  title: '较平均销量相比上涨／下降',
  dataIndex: 'branAvgRatio',
  render: (text, record) =>
    record.ransomCarMonthAverageDecreaseWarning ? <span style={{ color: 'red' }}>{text}</span> : text,
};
const 本月初始保证金合计 = {
  title: '本月初始保证金合计(元)',
  dataIndex: 'curMonthInitialBond',
};
const 出账较上月涨幅降幅 = {
  title: '出账较上月涨幅／降幅',
  dataIndex: 'accountRatio',
  render: (text, record) =>
    record.outputAccountDecreaseWarning || record.outputAccountIncreaseWarning ? (
      <span style={{ color: 'red' }}>{text}</span>
    ) : (
      text
    ),
};
const 销量较上月涨幅降幅 = {
  title: '销量较上月涨幅／降幅',
  dataIndex: 'salesVolumeRatio',
  render: (text, record) =>
    record.ransomCarMonthLastDecreaseWarning ? <span style={{ color: 'red' }}>{text}</span> : text,
};
const 回款较上月涨幅降幅 = {
  title: '回款较上月涨幅／降幅',
  dataIndex: 'returnedMoneyRatio',
  render: (text, record) =>
    record.repaymentAmountDecreaseWarning ? <span style={{ color: 'red' }}>{text}</span> : text,
};
export const expendColumns = [年月, 经销商名称, 品牌名称, 本月出账金额, 上月出账金额, 较上月涨幅降幅];
export const redemColumns = [
  年月,
  经销商名称,
  末次还款日期,
  距今几天没有赎车,
  品牌名称,
  本月销量,
  上月销量,
  较上月涨幅降幅,
  本月品牌总销量,
  占比,
  本月品牌平均销量,
  较平均销量相比上涨下降,
];
export const shiftColumns = [导入日期, 经销商名称, 一个月后赎货保证金合计, 近一个月剩余敞口金额合计, 是否可覆盖];
export const tradeColumns = [导入日期, 经销商名称, 品牌名称, 换出车辆价值总计];
export const returnColumns = [
  年月,
  经销商名称,
  品牌名称,
  上月已使用敞口金额合计,
  本月出账金额合计,
  本月初始保证金合计,
  本月已使用敞口金额合计,
  本月回款情况,
  上月回款情况,
  较上月涨幅降幅,
];
export const warningMesColumns = [
  年月,
  经销商名称,
  品牌名称,
  末次还款日期,
  距今几天没有赎车,
  本月出账金额,
  上月出账金额,
  出账较上月涨幅降幅,
  本月销量,
  上月销量,
  销量较上月涨幅降幅,
  本月品牌总销量,
  占比,
  本月品牌平均销量,
  较平均销量相比上涨下降,
  上月已使用敞口金额合计,
  本月已使用敞口金额合计,
  本月回款情况,
  上月回款情况,
  回款较上月涨幅降幅,
];
export const brandManaColumns = [经销商名称, 品牌名称, 合作状态, 操作时间];
