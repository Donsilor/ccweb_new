import React from 'react';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
//移动记录
export const moveRecordColumns = [
  {
    title: '移动编号',
    dataIndex: 'id',
  },
  {
    title: '任务类型',
    dataIndex: 'moveTypeName',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
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
    title: '移动发起时间',
    dataIndex: 'applyTime',
    render: text => {
      return text && moment(text).format(TIME_FORMAT);
    },
  },
  {
    title: '操作人',
    dataIndex: 'applyName',
  },
  {
    title: '任务状态',
    dataIndex: 'stateName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
