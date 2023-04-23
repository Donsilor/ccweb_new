import React from 'react';
import moment from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const detailColumnsEwSaleRink = [
  {
    title: '银行名称',
    dataIndex: 'bankName',
    align: 'center',
  },
  {
    title: '大区名称',
    dataIndex: 'regionName',
    align: 'center',
  },
  {
    title: '小区名称',
    dataIndex: 'regionSubName',
    align: 'center',
  },
  {
    title: '省份',
    dataIndex: 'provinceName',
    align: 'center',
  },
  {
    title: '城市',
    dataIndex: 'cityName',
    align: 'center',
  },
  {
    title: '地区',
    dataIndex: 'countyName',
    align: 'center',
  },
  {
    title: '品牌名称',
    dataIndex: 'fldserialname',
    align: 'center',
  },
  {
    title: '车型名称',
    dataIndex: 'fldTrimInfo',
    align: 'center',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
    align: 'center',
  },
  {
    title: '销售时间',
    dataIndex: 'showtime',
    align: 'center',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
];

const detailColumnsDealerSaleRink = [
  {
    title: '银行名称',
    dataIndex: 'bankName',
    align: 'center',
  },
  {
    title: '大区名称',
    dataIndex: 'regionName',
    align: 'center',
  },
  {
    title: '小区名称',
    dataIndex: 'regionSubName',
    align: 'center',
  },
  {
    title: '省份',
    dataIndex: 'provinceName',
    align: 'center',
  },
  {
    title: '城市',
    dataIndex: 'cityName',
    align: 'center',
  },
  {
    title: '地区',
    dataIndex: 'countyName',
    align: 'center',
  },
  {
    title: '品牌名称',
    dataIndex: 'fldserialname',
    align: 'center',
  },
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
    align: 'center',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
    align: 'center',
  },
  {
    title: '二网所在地区',
    dataIndex: 'ewLocation',
    align: 'center',
  },
  {
    title: '车系',
    dataIndex: 'fldModel',
    align: 'center',
  },
  {
    title: '车型名称',
    dataIndex: 'fldTrimInfo',
    align: 'center',
  },
  {
    title: '车架号',
    dataIndex: 'chassis',
    align: 'center',
  },
  {
    title: '销售时间',
    dataIndex: 'showtime',
    align: 'center',
    render: text => {
      return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
    },
  },
];
const detailColumnsCarSales = [
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
    align: 'center',
  },
  {
    title: '经销商所在地区',
    dataIndex: 'distributorLocation',
    align: 'center',
  },
  {
    title: '二网名称',
    dataIndex: 'ewName',
    align: 'center',
  },
  {
    title: '二网所在地区',
    dataIndex: 'ewLocation',
    align: 'center',
  },
  {
    title: '销量',
    dataIndex: 'mainStoresalesNum',
    align: 'center',
  },
];

export { detailColumnsDealerSaleRink, detailColumnsEwSaleRink, detailColumnsCarSales };
