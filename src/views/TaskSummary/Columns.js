import React from 'react';
const returnA = text => (
  <a href="javascript:;" className="inlineBlock">
    {text}
  </a>
);
const columnsPlatform = func => [
  {
    title: '员工名称',
    dataIndex: 'opUserName',
    fixed: 'left',
  },
  {
    title: '登录账号',
    dataIndex: 'accid',
  },
  {
    title: '抽查任务跟踪',
    children: [
      {
        title: '审核任务数',
        dataIndex: 'auditNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '1'),
        }),
        render: returnA,
      },
      {
        title: '涉及4s店数',
        dataIndex: 'distributorNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '2'),
        }),
        render: returnA,
      },
      {
        title: '涉及二网数',
        dataIndex: 'ewNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '3'),
        }),
        render: returnA,
      },
      {
        title: '联系过二网的任务数',
        dataIndex: 'contactEwNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '4'),
        }),
        render: returnA,
      },
      {
        title: '联系过4s店的任务数',
        dataIndex: 'contactDistributorNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '5'),
        }),
        render: returnA,
      },
      {
        title: '审核通过数',
        dataIndex: 'auditPassNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '6'),
        }),
        render: returnA,
      },
      {
        title: '标记异常数',
        dataIndex: 'errorNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '7'),
        }),
        render: returnA,
      },
      {
        title: '终止任务数',
        dataIndex: 'taskEndNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '8'),
        }),
        render: returnA,
      },
      {
        title: '退回重拍数',
        dataIndex: 'returnRephotoNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '9'),
        }),
        render: returnA,
      },
    ],
  },
  {
    title: '移动任务跟踪',
    children: [
      {
        title: '审核任务数',
        dataIndex: 'moveAuditNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '10'),
        }),
        render: returnA,
      },
      {
        title: '涉及4s店数',
        dataIndex: 'moveDistributorNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '11'),
        }),
        render: returnA,
      },
      {
        title: '涉及二网数',
        dataIndex: 'moveEwNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '12'),
        }),
        render: returnA,
      },
      {
        title: '联系过二网的任务数',
        dataIndex: 'moveContactEwNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '13'),
        }),
        render: returnA,
      },
      {
        title: '联系过4s店的任务数',
        dataIndex: 'moveContactDistributorNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '14'),
        }),
        render: returnA,
      },
      {
        title: '审核通过数',
        dataIndex: 'moveAuditPassNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '15'),
        }),
        render: returnA,
      },
      {
        title: '标记异常数',
        dataIndex: 'moveErrorNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '16'),
        }),
        render: returnA,
      },
      {
        title: '终止任务数',
        dataIndex: 'moveTaskEndNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '17'),
        }),
        render: returnA,
      },
      {
        title: '退回重拍数',
        dataIndex: 'moveReturnRephotoNum',
        align: 'right',
        onCell: (record, rowIndex) => ({
          onClick: () => func(record.opUserId, '18'),
        }),
        render: returnA,
      },
    ],
  },
];

const detailColumnsPlatform = [
  {
    title: '抽查任务编号',
    dataIndex: 'spottestId',
    align: 'center',
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
    align: 'center',
  },
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
    align: 'center',
  },
  {
    title: '品牌名称',
    dataIndex: 'brandName',
    align: 'center',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
    align: 'center',
  },
  {
    title: '是否直营店',
    dataIndex: 'trIsDirectSaleStore',
    align: 'center',
  },
  {
    title: '抽查方式',
    dataIndex: 'trSpotTestType',
    align: 'center',
  },
  {
    title: '抽查车辆车架号',
    dataIndex: 'chassis',
    align: 'center',
  },
  {
    title: '任务下发时间',
    dataIndex: 'taskSendTime',
    align: 'center',
  },
  {
    title: '抽查确认时间',
    dataIndex: 'spotConfirmTime',
    align: 'center',
  },
  {
    title: '是否改约拍照时间',
    dataIndex: 'trIsChangePhotoTime',
    align: 'center',
  },
  {
    title: '抽查确认选择的时间',
    dataIndex: 'spotConfirmSelTime',
    align: 'center',
  },
  {
    title: '看到车架号时间',
    dataIndex: 'seeChassisTime',
    align: 'center',
  },
  {
    title: '拍照时间',
    dataIndex: 'photoTime',
    align: 'center',
  },
  {
    title: '抽查用时',
    dataIndex: 'spotConsumTime',
    align: 'center',
  },
  {
    title: '看到车架号拍照用时',
    dataIndex: 'seeChassisConsumTime',
    align: 'center',
  },
  {
    title: '任务状态',
    dataIndex: 'trTaskStatus',
    align: 'center',
  },
  {
    title: '抽查是否超时',
    dataIndex: 'trIsSpotTimeout',
    align: 'center',
  },
  {
    title: '看到车架号拍照是否超时',
    dataIndex: 'trIsSeeChassisTimeout',
    align: 'center',
  },
  {
    title: '是否退回重拍',
    dataIndex: 'trIsUntreadRetake',
    align: 'center',
  },
  {
    title: '抽查审核结果',
    dataIndex: 'trAuditingResult',
    align: 'center',
  },
  {
    title: '二网反馈异常类型',
    dataIndex: 'trEwExcepType',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'ewExcepTypeRemark',
  },
  {
    title: '平台最终确认异常类型',
    dataIndex: 'trPlatformExcepType',
    align: 'center',
  },
  {
    title: '异常任务跟踪备注(平台)',
    dataIndex: 'platformExcepRemark',
    align: 'center',
  },
  {
    title: '二网联系人',
    dataIndex: 'ewContactor',
    align: 'center',
  },
  {
    title: '二网联系电话',
    dataIndex: 'ewMobile',
    align: 'center',
  },
  {
    title: '拨打时间',
    dataIndex: 'ewCalltime',
    align: 'center',
  },
  {
    title: '是否接通',
    dataIndex: 'trEwGetcall',
    align: 'center',
  },
  {
    title: '接通次数',
    dataIndex: 'ewGetcalltimes',
    align: 'right',
  },
  {
    title: '未接通次数',
    dataIndex: 'ewNogetcalltimes',
    align: 'right',
  },
  {
    title: '4S店联系结果',
    dataIndex: 'trDistReply',
  },
  {
    title: '二网反馈结果',
    dataIndex: 'trEwReply',
  },
  {
    title: '重新下发',
    dataIndex: 'resendRemark',
  },
];

const columnsRisk = func => [
  {
    title: '员工名称',
    dataIndex: 'employeeName',
  },
  {
    title: '登录账号',
    dataIndex: 'accid',
  },
  {
    title: '企业类型',
    dataIndex: 'departType',
  },
  {
    title: '处理（备注）总数',
    dataIndex: 'totalNum',
    align: 'right',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record.userId, '3'),
    }),
    render: returnA,
  },
  {
    title: '流转回易查库数',
    dataIndex: 'toYckNum',
    align: 'right',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record.userId, '1'),
    }),
    render: returnA,
  },
  {
    title: '流转至客户经理数',
    dataIndex: 'toManagerNum',
    align: 'right',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record.userId, '2'),
    }),
    render: returnA,
  },
];

const columnsCustomer = func => [
  {
    title: '员工名称',
    dataIndex: 'employeeName',
  },
  {
    title: '登录账号',
    dataIndex: 'accid',
  },
  {
    title: '企业类型',
    dataIndex: 'departType',
  },
  {
    title: '负责的任务数',
    dataIndex: 'totalNum',
    align: 'right',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record.userId, '5'),
    }),
    render: returnA,
  },
  {
    title: '处理（备注）总数',
    dataIndex: 'doneNum',
    align: 'right',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record.userId, '10'),
    }),
    render: returnA,
  },
  {
    title: '流转回易查库数',
    dataIndex: 'toYckNum',
    align: 'right',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record.userId, '4'),
    }),
    render: returnA,
  },
  {
    title: '流转至风控专员',
    dataIndex: 'toRiskNum',
    align: 'right',
    onCell: (record, rowIndex) => ({
      onClick: () => func(record.userId, '6'),
    }),
    render: returnA,
  },
];

const detailColumnsRisk = [
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '任务编号',
    dataIndex: 'spottestId',
    align: 'center',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
    align: 'center',
    render: (text, record) => record.carVO.chassis,
  },
  {
    title: '品牌',
    dataIndex: 'fld_serial',
    render: (text, record) => record.carVO.fld_serial,
  },
  {
    title: '车型',
    dataIndex: 'fld_model',
    render: (text, record) => record.carVO.fld_model,
  },
  {
    title: '车系',
    dataIndex: 'fld_trim',
    render: (text, record) => record.carVO.fld_trim,
  },
  {
    title: '车辆价格',
    dataIndex: 'carprice',
    align: 'right',
    render: (text, record) => record.carVO.carprice,
  },
  {
    title: '任务下发时间',
    dataIndex: 'bookTimeStr',
    align: 'center',
  },
  {
    title: '抽查确认时间',
    dataIndex: 'spotConfirmTimeStr',
    align: 'center',
  },
  {
    title: '改约时间',
    dataIndex: 'appointmentTimeStr',
    align: 'center',
  },
  {
    title: '流转方式',
    dataIndex: 'turnTypeName',
    align: 'center',
  },
  {
    title: '流转时间',
    dataIndex: 'turnTimeStr',
    align: 'center',
  },
  {
    title: '是否接通',
    dataIndex: 'ewGetcallName',
    align: 'center',
  },
  {
    title: '抽查审核员备注',
    dataIndex: 'ptRemarkExc',
  },
  {
    title: '风控处理',
    dataIndex: 'fkzyHandleName',
  },
  {
    title: '客户经理处理',
    dataIndex: 'khjjHandleName',
  },
  {
    title: '风控备注',
    dataIndex: 'fkzyRemark',
  },
  {
    title: '客户经理备注',
    dataIndex: 'khjjRemark',
  },
];

const summaryListRisk = [
  {
    label: '流转任务总数',
    value: 'total',
  },
  {
    label: '人工流转数',
    value: 'manual',
  },
  {
    label: '自动流转数',
    value: 'auto',
  },
];
const summaryListCustomer = [
  {
    label: '流转至客户经理任务总数',
    value: 'total',
  },
];

export default columnsPlatform;
export { detailColumnsPlatform, detailColumnsRisk, columnsRisk, summaryListRisk, summaryListCustomer, columnsCustomer };
