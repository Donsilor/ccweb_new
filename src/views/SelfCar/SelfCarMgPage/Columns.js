import React from 'react';
import { formatTime } from 'common/utils';
const returnA = text => (
  <a href="javascript:;" className="inlineBlock">
    {text}
  </a>
);
export const reservedColumns = func => [
  {
    title: '合作金融机构',
    dataIndex: 'bankName',
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
    title: '车辆类型',
    dataIndex: 'carTypeName',
  },
  {
    title: '金融产品',
    dataIndex: 'financialProductsName',
  },
  {
    title: '车辆金额（万元）',
    dataIndex: 'carprice',
  },
  {
    title: '车身颜色',
    dataIndex: 'color',
  },
  {
    title: '录入时间',
    dataIndex: 'lrtime',
    render: text => formatTime(text),
  },
  {
    title: '来源',
    dataIndex: 'carFromName',
  },
  {
    title: '所在网点',
    dataIndex: 'locationName',
  },
  {
    title: '车辆状态',
    dataIndex: 'additionStatusName',
  },
  {
    title: '位置状态',
    dataIndex: 'statusName',
  },
];

export const detailTrackColumns = [
  {
    title: '任务时间',
    dataIndex: 'taskTime',
    render: text => formatTime(text),
  },
  {
    title: '移出位置',
    dataIndex: 'moveOutName',
  },
  {
    title: '移入位置',
    dataIndex: 'moveInName',
  },
  {
    title: '任务类型',
    dataIndex: 'taskTypeName',
  },
  {
    title: '移动编号',
    dataIndex: 'taskId',
  },
  {
    title: '位置状态',
    dataIndex: 'statusName',
  },
  {
    title: '操作人',
    dataIndex: 'operName',
  },
  {
    title: '操作描述',
    dataIndex: 'description',
  },
];

export const removedColumns = [
  {
    title: '合作金融机构',
    dataIndex: 'bankName',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
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
    title: '删除时间',
    dataIndex: 'operTime',
    render: text => formatTime(text),
  },
  {
    title: '删除人',
    dataIndex: 'operName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
