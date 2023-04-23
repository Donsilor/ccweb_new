import React from 'react';
import { Form, Input, Select, Col, DatePicker, InputNumber } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

//经销商
export const distributorName = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'distributorName'}>
      <FormItem label="经销商">
        {getFieldDecorator('distributorName', {
          getValueFromEvent: event => event.target.value.replace(/\s+/g, ''),
        })(<Input placeholder="请输入经销商" />)}
      </FormItem>
    </Col>
  );
};
export const ewName = getFieldDecorator => {
  return (
    <Col md={5} sm={24} key={'ewName'}>
      <FormItem label="二网名称">
        {getFieldDecorator('ewName', {
          getValueFromEvent: event => event.target.value.replace(/\s+/g, ''),
        })(<Input placeholder="请输入二网名称" />)}
      </FormItem>
    </Col>
  );
};

export const status = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="审核状态">
        {getFieldDecorator('status', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={0} key={1}>
              正常
            </Option>
            <Option value={1} key={2}>
              待上传资料
            </Option>
            <Option value={2} key={3}>
              待审核
            </Option>
            <Option value={9} key={4}>
              停用
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const auditStatus = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'auditStatus'}>
      <FormItem label="审核状态">
        {getFieldDecorator('auditStatus', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={0} key={1}>
              正常
            </Option>
            <Option value={2} key={2}>
              待上传资料
            </Option>
            <Option value={3} key={3}>
              待审核
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const 税控监管 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'税控监管'}>
      <FormItem label="税控监管">
        {getFieldDecorator('unsupervisedFlag', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={1} key={1}>
              打开
            </Option>
            <Option value={0} key={2}>
              关闭
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const 特殊经销商 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'特殊经销商'}>
      <FormItem label="特殊经销商">
        {getFieldDecorator('specialFlag', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={1} key={1}>
              打开
            </Option>
            <Option value={0} key={2}>
              关闭
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
