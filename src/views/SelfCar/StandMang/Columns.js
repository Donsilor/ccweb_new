import React from 'react';
import { Tooltip } from 'antd';
import { formatTime } from 'common/utils';
//抽查任务
export const carColumns = [
  {
    title: '大区',
    dataIndex: 'areaInfo.areaName',
  },
  {
    title: '小区',
    dataIndex: 'areaInfo.subAreaName',
  },
  {
    title: '区域经理',
    dataIndex: 'areaInfo.managerName',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
    render: (text, record) => record.car.chassis,
  },
  {
    title: '品牌名称',
    dataIndex: 'brandName',
    render: (text, record) => record.car.brandName,
  },
  {
    title: '车辆类型',
    dataIndex: 'carTypeName',
    render: (text, record) => record.car.carTypeName,
  },
  {
    title: '抽查描述',
    dataIndex: 'description',
  },
  {
    title: '金融产品',
    dataIndex: 'financialProductsName',
    render: (text, record) => record.car.financialProductsName,
  },
  {
    title: '任务下发时间',
    dataIndex: 'spottest.bookTime',
  },
  {
    title: '看到车架号时间',
    dataIndex: 'viewTime',
  },
  {
    title: '任务截止时间',
    dataIndex: 'deadline',
    render: text => formatTime(text),
  },
  {
    title: '拍照时间',
    dataIndex: 'submitTime',
  },
  // {
  //   title: '是否退回重拍',
  //   dataIndex: 'auditUserName',
  // },
  {
    title: '任务状态',
    dataIndex: 'statusName',
  },
  {
    title: '异常类型',
    dataIndex: 'excReasonName',
  },
  {
    title: '审核人',
    dataIndex: 'auditUserName',
  },
  {
    title: '审核时间',
    dataIndex: 'auditTime',
  },
  {
    title: '异常描述',
    dataIndex: 'excRemark',
    onCell: () => {
      return {
        style: {
          maxWidth: 150,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
        },
      };
    },
    render: text => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
];
