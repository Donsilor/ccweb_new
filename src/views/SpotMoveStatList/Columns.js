import React from 'react';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const TIME_sFORMAT = 'YYYY-MM-DD';
const returnA = text => (
  <a href="javascript:;" className="inlineBlock">
    {text}
  </a>
);
export const columnsSpotform = func => [
  {
    title: '统计日期',
    dataIndex: 'bookTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_sFORMAT);
    },
  },
  {
    title: '星期',
    dataIndex: 'week',
  },
  {
    title: '任务类型',
    dataIndex: 'spotTestTypeName',
  },
  {
    title: '当日下发任务总数',
    dataIndex: 'totSpot',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record, record.spotTestType, record.bookTime, record.totSpot, false),
    }),
    render: returnA,
  },
  {
    title: '待上传',
    dataIndex: 'totWaitUpload',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record, record.spotTestType, record.bookTime, record.totWaitUpload, 2),
    }),
    render: returnA,
  },
  {
    title: '待审核',
    dataIndex: 'totWaitAudit',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record, record.spotTestType, record.bookTime, record.totWaitAudit, 3),
    }),
    render: returnA,
  },
  {
    title: '重新拍照',
    dataIndex: 'totRetake',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record, record.spotTestType, record.bookTime, record.totRetake, 5),
    }),
    render: returnA,
  },
  {
    title: '待补拍',
    dataIndex: 'totWaitRetake',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record, record.spotTestType, record.bookTime, record.totWaitRetake, 11),
    }),
    render: returnA,
  },

  {
    title: '自我标记异常',
    dataIndex: 'totSelfMarkExc',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record, record.spotTestType, record.bookTime, record.totSelfMarkExc, 9),
    }),
    render: returnA,
  },
  {
    title: '审核通过',
    dataIndex: 'totPass',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record, record.spotTestType, record.bookTime, record.totPass, 6),
    }),
    render: returnA,
  },
  {
    title: '审核不通过',
    dataIndex: 'totNotPass',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record, record.spotTestType, record.bookTime, record.totNotPass, 7),
    }),
    render: returnA,
  },
];

export const errColumns = [
  {
    title: '',
    dataIndex: 'rowTitle',
    align: 'left',
  },
  {
    title: '车辆已售',
    dataIndex: 'totCarSold',
    width: 100,
  },
  {
    title: '定位异常',
    dataIndex: 'totLocErr',
    width: 100,
  },
  {
    title: '移动到其他二网',
    dataIndex: 'totMoveToEw',
    width: 200,
  },
  {
    title: '移回主店',
    dataIndex: 'totMoveToMain',
    width: 100,
  },
  {
    title: '二网错误操作',
    dataIndex: 'totEwOptErr',
    width: 100,
  },
  {
    title: '移动至车展',
    dataIndex: 'totMoveToShow',
    width: 100,
  },
  {
    title: '操作异常',
    dataIndex: 'totOptErr',
    width: 100,
  },
  {
    title: '系统问题',
    dataIndex: 'totSysErr',
    width: 100,
  },
  {
    title: '合计',
    dataIndex: 'subTotal',
    width: 100,
  },
];
export const shootColumns = [
  {
    title: '任务下发后拍摄时间统计',
    children: [
      {
        title: '任务下发后30分钟内拍完',
        dataIndex: 'totUploadLt30m',
      },
      {
        title: '任务下发后30-60分钟内拍完',
        dataIndex: 'totUploadLt60m',
      },
    ],
  },
  {
    title: '看到车架号后拍摄时间统计',
    children: [
      {
        title: '看到车架号后10分钟内拍完',
        dataIndex: 'totSeeChassissLt10m',
      },
      {
        title: '看到车架号后10-30分钟内拍完',
        dataIndex: 'totSeeChassissLt30m',
      },
      {
        title: '看到车架号后超过30分钟拍完',
        dataIndex: 'totSeeChassissGt30m',
      },
    ],
  },
];
//普通抽查
export const normalColumns = [
  {
    title: '抽查任务编号',
    dataIndex: 'spottestId',
  },
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '抽查方式',
    dataIndex: 'spotTestTypeName',
  },
  {
    title: '抽查车辆车架号',
    dataIndex: 'chassis',
  },
  {
    title: '车辆价格 (元)',
    dataIndex: 'carprice',
  },
  {
    title: '任务下发时间 ',
    dataIndex: 'taskSendTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '抽查确认时间 ',
    dataIndex: 'spotConfirmTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '异常发生时间',
    dataIndex: 'excTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '是否改约拍照时间',
    dataIndex: 'isChangePhotoTimeName',
  },
  {
    title: '抽查确认选择的时间',
    dataIndex: 'spotConfirmSelTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '看到车架号时间',
    dataIndex: 'seeChassisTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '拍照时间',
    dataIndex: 'photoTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '抽查用时 (分钟)',
    dataIndex: 'spotConsumTime',
  },
  {
    title: '看到车架号拍照时间 (分钟)',
    dataIndex: 'seeChassisConsumTime',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: '任务状态',
    dataIndex: 'taskStatusName',
  },
  // {
  //   title: '是否超时',
  //   dataIndex: 'isSpotTimeoutName',
  // },
  {
    title: '抽查审核结果',
    dataIndex: 'auditingResultName',
  },
  {
    title: '二网异常类型',
    dataIndex: 'ewExcepTypeName',
  },
  {
    title: ' 二网异常类型备注',
    dataIndex: 'ewExcepTypeRemark',
  },
  {
    title: '平台异常类型',
    dataIndex: 'platformExcepTypeName',
  },
  {
    title: '平台异常类型备注 ',
    dataIndex: 'platformExcepRemark',
  },
  {
    title: '最终异常类型',
    dataIndex: 'bankExcReseaonName',
  },
  {
    title: '最终异常备注 ',
    dataIndex: 'bankExcRemark',
  },
  {
    title: '二网联系人 ',
    dataIndex: 'ewContactor',
  },
  {
    title: '二网联系电话 ',
    dataIndex: 'ewMobile',
  },
  {
    title: '二网拨打时间 ',
    dataIndex: 'ewCalltime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '二网是否接通',
    dataIndex: 'ewGetCallName',
  },
  {
    title: '二网接通次数',
    dataIndex: 'ewGetcalltimes',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: '二网未接通次数 ',
    dataIndex: 'ewNogetcalltimes',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: ' 二网反馈类型 ',
    dataIndex: 'ewReplyName',
  },
  {
    title: '二网反馈内容',
    dataIndex: 'ewReplyContentName',
  },
  {
    title: '二网反馈具体原因',
    dataIndex: 'ewReplyReasonName',
  },
  {
    title: '二网反馈备注',
    dataIndex: 'ewRemark',
  },

  {
    title: '经销商联系人 ',
    dataIndex: 'distContactor',
  },
  {
    title: '经销商联系电话 ',
    dataIndex: 'distMobile',
  },
  {
    title: '经销商拨打时间 ',
    dataIndex: 'distCalltime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '经销商是否接通',
    dataIndex: 'distGetCallName',
  },
  {
    title: '经销商接通次数',
    dataIndex: 'distGetcalltimes',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: '经销商未接通次数 ',
    dataIndex: 'distNogetcalltimes',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: '经销商反馈类型 ',
    dataIndex: 'distReplyName',
  },
  {
    title: '经销商反馈内容',
    dataIndex: 'distReplyContentName',
  },
  {
    title: '经销商反馈具体原因',
    dataIndex: 'distReplyReasonName',
  },
  {
    title: '经销商反馈备注',
    dataIndex: 'distRemark',
  },
];
//移动抽查
export const moveColumns = [
  {
    title: '移动任务编号',
    dataIndex: 'moveId',
  },
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '二网名称',
    dataIndex: 'moveInEwName',
  },
  {
    title: '抽查类型',
    dataIndex: 'spotTestTypeName',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
  },
  {
    title: '车辆价格 (元)',
    dataIndex: 'carprice',
  },
  {
    title: '车辆移动申请时间 ',
    dataIndex: 'applyTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '抽查创建时间',
    dataIndex: 'createTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '拍照时间',
    dataIndex: 'uploadTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '异常发生时间',
    dataIndex: 'excTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  // {
  //   title: '车程',
  //   dataIndex: 'distance',
  // },
  // {
  //   title: '应拍照时间',
  //   dataIndex: 'photoTime',
  //   render: text => {
  //     return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  //   },
  // },
  {
    title: '确认移动时间',
    dataIndex: 'reviewTime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '任务状态',
    dataIndex: 'taskStatusName',
  },
  // {
  //   title: '是否超时 ',
  //   dataIndex: 'isTimeOutName',
  // },
  {
    title: '车辆状态 ',
    dataIndex: 'carStatusName',
  },
  // {
  //   title: '二网异常类型',
  //   dataIndex: 'ewExcepTypeName',
  // },
  // {
  //   title: ' 二网异常类型备注',
  //   dataIndex: 'ewExcepTypeRemark',
  // },
  {
    title: '平台异常类型',
    dataIndex: 'platformExcepTypeName',
  },
  {
    title: '平台异常类型备注 ',
    dataIndex: 'platformExcepRemark',
  },
  {
    title: '最终异常类型',
    dataIndex: 'bankExcReseaonName',
  },
  {
    title: '最终异常备注 ',
    dataIndex: 'bankExcRemark',
  },
  {
    title: '二网联系人 ',
    dataIndex: 'ewContactor',
  },
  {
    title: '二网联系电话 ',
    dataIndex: 'ewMobile',
  },
  {
    title: '二网拨打时间 ',
    dataIndex: 'ewCalltime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '二网是否接通',
    dataIndex: 'ewGetCallName',
  },
  {
    title: '二网接通次数',
    dataIndex: 'ewGetcalltimes',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: '二网未接通次数 ',
    dataIndex: 'ewNogetcalltimes',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: ' 二网反馈类型 ',
    dataIndex: 'ewReplyName',
  },
  {
    title: '二网反馈内容',
    dataIndex: 'ewReplyContentName',
  },
  {
    title: '二网反馈具体原因',
    dataIndex: 'ewReplyReasonName',
  },
  {
    title: '二网反馈备注',
    dataIndex: 'ewRemark',
  },

  {
    title: '经销商联系人 ',
    dataIndex: 'distContactor',
  },
  {
    title: '经销商联系电话 ',
    dataIndex: 'distMobile',
  },
  {
    title: '经销商拨打时间 ',
    dataIndex: 'distCalltime',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
  {
    title: '经销商是否接通',
    dataIndex: 'distGetCallName',
  },
  {
    title: '经销商接通次数',
    dataIndex: 'distGetcalltimes',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: '经销商未接通次数 ',
    dataIndex: 'distNogetcalltimes',
    render: text => {
      return text ? text : '';
    },
  },
  {
    title: '经销商反馈类型 ',
    dataIndex: 'distReplyName',
  },
  {
    title: '经销商反馈内容',
    dataIndex: 'distReplyContentName',
  },
  {
    title: '经销商反馈具体原因',
    dataIndex: 'distReplyReasonName',
  },
  {
    title: '经销商反馈备注',
    dataIndex: 'distRemark',
  },
];
