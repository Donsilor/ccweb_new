// 视频监控
import { formatTime } from '../../common/utils';
import moment from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// 终端管理
export const clientNoColumn = {
  title: '终端编号',
  dataIndex: 'code',
  align: 'left',
};
export const clientBrandColumn = {
  title: '终端品牌',
  dataIndex: 'brand',
  align: 'left',
};
export const clientTypeColumn = {
  title: '型号',
  dataIndex: 'modelNumber',
  align: 'left',
  width: 100,
};
export const clientSNColumn = {
  title: 'sn码/序列号',
  dataIndex: 'serialNumber',
  align: 'left',
};
export const upDateColumn = {
  title: '最后更新时间',
  dataIndex: 'updateTime',
  align: 'left',
  render: text => formatTime(text),
};
export const actionColumn = {
  title: '操作',
  dataIndex: 'action',
  align: 'center',
  width: 100,
};
// 摄像头管理

export const cameraCodeColumn = {
  title: '验证码',
  dataIndex: 'code',
  align: 'left',
  width: 100,
};
export const cameraSNColumn = {
  title: '摄像头编号',
  dataIndex: 'serialNumber',
  align: 'left',
  width: 100,
};
export const cameraBrandColumn = {
  title: '摄像头品牌',
  dataIndex: 'brand',
  align: 'left',
  width: 100,
};
export const cameraPXColumn = {
  title: '像素',
  dataIndex: 'pixel',
  align: 'left',
};
export const cameraDistanceColumn = {
  title: '距离',
  dataIndex: 'distance',
  align: 'left',
};
export const cameraTokenColumn = {
  title: 'access_token',
  dataIndex: 'token',
  align: 'left',
};

// 库存车监控
export const repoNameColumn = {
  title: '二库名称',
  dataIndex: 'whareHouseName',
  align: 'left',
};
export const repoCameraNumColumn = {
  title: '摄像头数量',
  dataIndex: 'cameraNum',
  align: 'left',
};
export const repoCarNumColumn = {
  title: '库存车实际数量',
  dataIndex: 'realCarNum',
  align: 'left',
};
export const monitorCarNumColumn = {
  title: '摄像头识别数量',
  dataIndex: 'monitorCarNum',
  align: 'left',
};
export const monitorStatusColumn = {
  title: '运行情况',
  dataIndex: 'status',
  align: 'left',
  width: 100,
  render: text => {
    return text.toString() && (text.toString() === '0' ? '正常' : '关闭');
  },
};

// 影像详细
export const monitorImgCodeColumn = {
  title: '影像编号',
  dataIndex: 'imageCode',
  align: 'left',
};
export const monitorImgTypeColumn = {
  title: '影像类型',
  dataIndex: 'imageType',
  align: 'left',
  render: text => {
    return text.toString() && (text.toString() === '0' ? '图片' : '视频');
  },
};
export const monitorImgOriginColumn = {
  title: '缩略图',
  dataIndex: 'imageOriginUrl',
  align: 'left',
};
export const monitorImgRecognitionColumn = {
  title: '识别结果图',
  dataIndex: 'imageRecognitionUrl',
  align: 'left',
};
export const monitorRecognitionCarNumColumn = {
  title: '识别车辆数',
  dataIndex: 'recognitionCarNum',
  align: 'left',
};
export const monitorImgTimeColumn = {
  title: '图像获取时间',
  dataIndex: 'imageGetTime',
  align: 'left',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
// 二库视频监控预警
export const repoIdColumn = {
  title: '预警编号',
  dataIndex: 'warningCode',
};
export const repoStartTimeColumn = {
  title: '发生时间',
  dataIndex: 'startTime',
};
export const repoFinishTimeColumn = {
  title: '预警最后更新时间',
  dataIndex: 'finishTime',
};
export const repoRealNumColumn = {
  title: '库存车实际数量',
  dataIndex: 'realNumber',
};
export const repoRecognitionNumColumn = {
  title: '库存车识别数量',
  dataIndex: 'recognitionCarNum',
};
export const repoRemoveTimeColumn = {
  title: '解除时间',
  dataIndex: 'updateTime',
};
export const repoRemarkColumn = {
  title: '解除备注',
  dataIndex: 'remark',
};
