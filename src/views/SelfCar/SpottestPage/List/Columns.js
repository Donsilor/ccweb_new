import { formatTime } from 'common/utils';
const 车架号 = {
  title: '车架号',
  dataIndex: 'chassis',
  render: (text, record) => record.car.chassis,
};
const 品牌 = {
  title: '品牌',
  dataIndex: 'brandName',
  render: (text, record) => record.car.brandName,
};
const 任务下发时间 = {
  title: '任务下发时间',
  dataIndex: 'spottest.bookTime',
};
const 看到车架号时间 = {
  title: '看到车架号时间',
  dataIndex: 'viewTime',
};
const 任务截止时间 = {
  title: '任务截止时间',
  dataIndex: 'deadline',
  render: text => formatTime(text),
};
const 拍照时间 = {
  title: '拍照时间',
  dataIndex: 'submitTime',
};
const 二网名称 = {
  title: '二网名称',
  dataIndex: 'ewName',
};
const 车辆类型 = {
  title: '车辆类型',
  dataIndex: 'carTypeName',
  render: (text, record) => record.car.carTypeName,
};
const 审核状态 = {
  title: '审核状态',
  dataIndex: 'statusName',
};
const 异常类型 = {
  title: '异常类型',
  dataIndex: 'excReasonName',
};
const 金融产品 = {
  title: '金融产品',
  dataIndex: 'financialProductsName',
  render: (text, record) => record.car.financialProductsName,
};
const 大区 = {
  title: '大区',
  dataIndex: 'areaName',
};
const 小区 = {
  title: '小区',
  dataIndex: 'subAreaName',
};
const 区域经理 = {
  title: '区域经理',
  dataIndex: 'managerName',
};
const 联系电话 = {
  title: '联系电话',
  dataIndex: 'managerTel',
};
const 二网联系人 = {
  title: '二网联系人',
  dataIndex: 'ewContactName',
};
const 二网联系电话 = {
  title: '二网联系电话',
  dataIndex: 'ewContactTel',
};
const 总数 = {
  title: '总数',
  dataIndex: 'totalNum',
};
const 未上传 = {
  title: '未上传',
  dataIndex: 'unuploadNum',
};
const 已上传 = {
  title: '已上传',
  dataIndex: 'uploadNum',
};
const 未审核 = {
  title: '未审核',
  dataIndex: 'unapproveNum',
};
export const moveTodoColumns = [车架号, 品牌, 任务下发时间, 任务截止时间, 拍照时间, 二网名称, 车辆类型, 审核状态];
export const moveDoneColumns = [
  车架号,
  品牌,
  任务下发时间,
  任务截止时间,
  拍照时间,
  二网名称,
  车辆类型,
  审核状态,
  异常类型,
];
export const commonTodoColumns = [
  车架号,
  品牌,
  任务下发时间,
  看到车架号时间,
  任务截止时间,
  拍照时间,
  二网名称,
  车辆类型,
  金融产品,
  审核状态,
];
export const commonDoneColumns = [
  车架号,
  品牌,
  任务下发时间,
  看到车架号时间,
  任务截止时间,
  拍照时间,
  二网名称,
  车辆类型,
  金融产品,
  审核状态,
  异常类型,
];
export const reportModalColumns = [大区, 小区, 区域经理, 联系电话, 二网联系人, 二网联系电话];
export const certificateTodo = [
  二网名称,
  {
    title: '车辆类型',
    dataIndex: 'carTypeName',
  },
  {
    title: '抽查描述',
    dataIndex: 'description',
  },
  {
    title: '任务下发时间',
    dataIndex: 'bookTime',
  },
  看到车架号时间,
  任务截止时间,
  {
    title: '大区',
    dataIndex: 'ewAreaManager.areaName',
  },
  {
    title: '小区',
    dataIndex: 'ewAreaManager.subAreaName',
  },
  {
    title: '区域经理',
    dataIndex: 'ewAreaManager.managerName',
  },
  总数,
  未上传,
  {
    title: '已上传待审核',
    dataIndex: 'uploadNum',
  },
  未审核,
];
export const certificateDone = [
  二网名称,
  {
    title: '车辆类型',
    dataIndex: 'carTypeName',
  },
  {
    title: '抽查描述',
    dataIndex: 'description',
  },
  {
    title: '任务下发时间',
    dataIndex: 'bookTime',
  },
  看到车架号时间,
  任务截止时间,
  总数,
  未上传,
  已上传,
  {
    title: '异常',
    dataIndex: 'unnormalNum',
  },
];
