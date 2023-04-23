import React from 'react';
import { Form, Input, Select, Col, DatePicker, InputNumber } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
export const statusCheng = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'statusCheng'}>
      <FormItem label="状态">
        {getFieldDecorator('status', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={0} key={0}>
              已导入
            </Option>
            <Option value={1} key={1}>
              待处理
            </Option>
            <Option value={2} key={2}>
              导入失败
            </Option>
            <Option value={3} key={3}>
              之后需跟进
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const statusReturn = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'statusReturn'}>
      <FormItem label="状态">
        {getFieldDecorator('status', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={0} key={0}>
              赎回成功
            </Option>
            <Option value={1} key={1}>
              待处理
            </Option>
            <Option value={2} key={2}>
              赎回失败
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const flag = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'flag'}>
      <FormItem label="状态">
        {getFieldDecorator('flag', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={0} key={0}>
              已导入
            </Option>
            <Option value={1} key={1}>
              待处理
            </Option>
            <Option value={2} key={2}>
              导入失败
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const distributorName = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'distributorName'}>
      <FormItem label="经销商">{getFieldDecorator('distributorName')(<Input placeholder="请输入经销商" />)}</FormItem>
    </Col>
  );
};
export const custname = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'custname'}>
      <FormItem label="经销商">{getFieldDecorator('custname')(<Input placeholder="请输入经销商" />)}</FormItem>
    </Col>
  );
};
export const chassis = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'chassis'}>
      <FormItem label="银行车架号">{getFieldDecorator('chassis')(<Input placeholder="请输入车架号" />)}</FormItem>
    </Col>
  );
};
export const supplyChain = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'supplyChain'}>
      <FormItem label="直联品牌">{getFieldDecorator('supplyChain')(<Input placeholder="请输入品牌" />)}</FormItem>
    </Col>
  );
};
export const brandName = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'brandName'}>
      <FormItem label="品牌">{getFieldDecorator('brandName')(<Input placeholder="请输入品牌" />)}</FormItem>
    </Col>
  );
};
export const tradername = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'tradername'}>
      <FormItem label="品牌">{getFieldDecorator('tradername')(<Input placeholder="请输入品牌" />)}</FormItem>
    </Col>
  );
};
export const bankName = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bankName'}>
      <FormItem label="银行名称">{getFieldDecorator('bankName')(<Input placeholder="请输入银行名称" />)}</FormItem>
    </Col>
  );
};
export const lrTime = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'lrTime'}>
      <FormItem label="录入时间">{getFieldDecorator('lrTime')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const remark = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'remark'}>
      <FormItem label="备注">{getFieldDecorator('remark')(<Input placeholder="请输入备注" />)}</FormItem>
    </Col>
  );
};
