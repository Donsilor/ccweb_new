import React, { Fragment } from 'react';
import { Badge, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import EBDic from 'common/constant';
import { translate, translatePureDic } from 'common/utils';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import Trend from 'ant-design-pro/lib/Trend';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const ewBankIdColumn = {
  title: '任务号',
  dataIndex: 'ewBankId',
  fixed: 'left',
};
export const fldSerialColumn = {
  title: '品牌名称',
  dataIndex: 'fldSerial',
};
export const brandNameColumn = {
  title: '品牌名称',
  dataIndex: 'brandName',
};
export const ewNumColumn = {
  title: '二网数量',
  dataIndex: 'ewNum',
};
export const depositAmountColumn = {
  title: '保证金（万元）',
  dataIndex: 'money',
};
export const depositAmount2Column = {
  title: '保证金（万元）',
  align: 'right',
  dataIndex: 'money',
  render: (text, record) => (
    <Trend flag={record.operationType === 2 ? 'down' : 'up'}>
      {record.operationType === 2 ? `-${text}` : `+${text}`}
    </Trend>
  ),
};
export const deposit2Column = {
  title: '保证金（元）',
  dataIndex: 'depositTotal',
  render: text => {
    let x = new BigNumber(text);
    return x.multipliedBy(10000).toFormat();
  },
};
export const exceptionLableColumn = {
  title: '异常预警',
  dataIndex: 'exceptionLable',
  render: text => (text && <Badge status={'error'} text={text} />) || '',
};
export const confirmStatusColumn = {
  title: '确认回执状态',
  dataIndex: 'confirmStatus',
  fixed: 'right',
  width: '120px',
  render: text => text !== undefined && translatePureDic(text, EBDic.confirmStatusDic, true),
};
export const curTotalMoneyColumn = {
  title: '保证金当前余额（万）',
  dataIndex: 'curTotalMoney',
  align: 'center',
};
export const saveDateColumn = {
  title: '存入时间',
  dataIndex: 'saveDate',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};

export const lastTimeColumn = {
  title: '复审通过时间',
  dataIndex: 'lastTime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const exportDateColumn = {
  title: '导出时间',
  dataIndex: 'operTime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const exportTime2Column = {
  title: '导出时间',
  dataIndex: 'exportTime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};

export const operNameColumn = {
  title: '操作人',
  dataIndex: 'operName',
};

export const exportTypeColumn = {
  title: '导出类型',
  dataIndex: 'exportType',
  align: 'center',
  render: text => translate(text, EBDic.exportTypeDicList),
};
export const bondTypeColumn = {
  title: '保证金类型',
  dataIndex: 'operationType',
  align: 'center',
  render: text => translate(text, EBDic.bondTypeDicList),
};
export const isEmptyColumn = {
  title: '是否有保证金',
  dataIndex: 'hasBond',
  align: 'center',
  render: (text, record) => (record.moneyGetType == 1 || record.moneyGetType == 2 ? '是' : '否'),
};
export const bondAccountColumn = {
  title: '保证金账号',
  dataIndex: 'bondAccount',
};
export const pointsAccountColumn = {
  title: '分账号',
  dataIndex: 'pointsAccount',
};
export const settlementAccountColumn = {
  title: '结算账号',
  dataIndex: 'settlementAccount',
};
export const remittanceAccountColumn = {
  title: '应解汇款账号',
  dataIndex: 'remittanceAccount',
};
export const interestRateColumn = {
  title: '利率(%)',
  dataIndex: 'interestRate',
};
export const isExportColumn = {
  title: '是否导出',
  dataIndex: 'printNum',
  align: 'center',
  render: text => (text >= 1 ? '是' : '否'),
};
