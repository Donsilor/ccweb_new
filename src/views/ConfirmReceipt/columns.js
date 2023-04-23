import moment from 'moment';
export const columnsCSin = [
  {
    title: '单号类型',
    dataIndex: 'oddType',
    render: text => (text < 3 ? '定期' : '活期'),
  },
  {
    title: '保证金金额(元)',
    dataIndex: 'oddAmout',
  },
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '开始计息日期',
    dataIndex: 'interestStartDate',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
];
export const columnsZJin = [
  {
    title: '单号类型',
    dataIndex: 'oddType',
    render: text => (text < 3 ? '定期' : '活期'),
  },
  {
    title: '保证金金额(元)',
    dataIndex: 'oddAmout',
  },
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '开始计息日期',
    dataIndex: 'interestStartDate',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
];
export const columnsOut = [
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '转出金额(元)',
    dataIndex: 'oddAmout',
  },
  {
    title: '计息截止日期',
    dataIndex: 'interestEndDate',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
];
export const columnsIn = [
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '转入金额(元)',
    dataIndex: 'oddAmout',
  },
  {
    title: '计息开始日期',
    dataIndex: 'interestStartDate',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
];
