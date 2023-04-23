import React from 'react';
import { Icon, Tooltip } from 'antd';
import { formatTime } from 'common/utils';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const columns = [
  {
    title: '任务号',
    dataIndex: 'spottestId',
  },
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
  },
  {
    title: '品牌名称',
    dataIndex: 'brandName',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
  },
  {
    title: '任务类型',
    dataIndex: 'spotTestTypeName',
  },
  {
    title: '抽查描述',
    dataIndex: 'description',
  },
  {
    title: '异常原因_二网',
    dataIndex: 'ewNotPassFlagName',
  },
  {
    title: '异常备注_二网',
    dataIndex: 'ewRemarkExc',
  },
  {
    title: '异常原因_平台',
    dataIndex: 'ptNotPassFlagName',
  },
  {
    title: '异常备注_平台',
    dataIndex: 'ptRemarkExc',
  },
  {
    title: '异常备注_最终',
    dataIndex: 'bankExcRemark',
  },
  {
    title: '二次确认私售',
    dataIndex: 'secondSoldFlag',
    align: 'center',
    render: text => {
      return text && text === 1 ? '是' : '否';
    },
  },
  {
    title: '上线状态',
    dataIndex: 'liveStatusName',
  },
  {
    title: '超时补拍情况',
    dataIndex: 'reshootTypeName',
  },
  {
    title: '异常时间',
    dataIndex: 'excTime',
    align: 'center',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '异常天数',
    dataIndex: 'excDateCount',
  },
  {
    title: '有效期至',
    dataIndex: 'validTime',
  },
  {
    title: '任务下发时间',
    dataIndex: 'bookTime',
    align: 'center',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '预约拍照时间',
    dataIndex: 'modifyBookTime',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '任务申请时间',
    dataIndex: 'moveApplyTime',
    align: 'center',
    render: text => {
      return (text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT)) || '-';
    },
  },
  {
    title: '二网联系人',
    dataIndex: 'ewOperatorName',
  },
  {
    title: '二网联系电话',
    dataIndex: 'ewOperatorTel',
  },
  {
    title: '审核状态',
    dataIndex: 'detailAuditStatusName',
    align: 'center',
    // fixed: 'right',
    render: (text, record) => {
      const { tooltip = '' } = renderExcepClassName(record);
      return (
        <span>
          {text}
          {tooltip && (
            <Tooltip title={tooltip}>
              <Icon type="info-circle" style={{ marginLeft: '3px', fontSize: '12px' }} />
            </Tooltip>
          )}
        </span>
      );
    },
  },
  {
    title: '开票日期',
    dataIndex: 'billDate',
    align: 'center',
    fixed: 'right',
  },
  {
    title: '异常原因_最终',
    dataIndex: 'bankExcReseaonName',
    align: 'center',
    fixed: 'right',
  },
];

export const renderExcepClassName = record => {
  if (!record || record.endFlag !== 0) {
    return '';
  } else if (record.secondSoldFlag === 1) {
    return {
      className: 'secondSoldFlag',
      tooltip: record.spotTestType === 5 || record.spotTestType === 6 ? '私售任务' : '二次私售任务',
    };
  } else if (record.noLive6DaysMark === 1) {
    return { className: 'noLive6DaysMark', tooltip: '超过6日未上线任务' };
  } else if (record.noLive3DaysMark === 1) {
    return {
      className: 'noLive3DaysMark',
      tooltip: `超过3日未上线任务`,
    };
  } else {
    return '';
  }
};

export default columns;
