import React from 'react';
const returnA = text => (
  <a href="javascript:;" className="inlineBlock">
    {text}
  </a>
);
//已售待确认
export const soldTodoColumns = func => [
  {
    title: '所在网点',
    dataIndex: 'locationName',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '车系',
    dataIndex: 'trimName',
  },
  {
    title: '车型',
    dataIndex: 'modelName',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
    onCell: record => ({
      onClick: () => func(record.id),
    }),
    render: returnA,
  },
  {
    title: '车辆金额（万元）',
    dataIndex: 'carprice',
  },
  {
    title: '申请时间',
    dataIndex: 'sellApplyTime',
  },
];
//已售已确认
export const soldGoneColumns = func => [
  {
    title: '所在网点',
    dataIndex: 'locationName',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '车系',
    dataIndex: 'trimName',
  },
  {
    title: '车型',
    dataIndex: 'modelName',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
    onCell: record => ({
      onClick: () => func(record.id),
    }),
    render: returnA,
  },
  {
    title: '车辆金额（万元）',
    dataIndex: 'carprice',
  },
  {
    title: '申请时间',
    dataIndex: 'sellApplyTime',
  },
  {
    title: '确认出售时间',
    dataIndex: 'sellConfirmTime',
  },
  {
    title: '操作人',
    dataIndex: 'operName',
  },
];
