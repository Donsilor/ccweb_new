import React from 'react';
import { Form, Input, Select, Col, DatePicker } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
export const 系统赎车日期 = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'buyTime'}>
      <FormItem label="系统赎车日期">{getFieldDecorator('buyTime')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 百望开票日期 = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'baiWangBillDate'}>
      <FormItem label="百望开票日期">{getFieldDecorator('baiWangBillDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 航天金税开票日期 = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'hangxinBillDate'}>
      <FormItem label="航天金税开票日期">{getFieldDecorator('hangxinBillDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 系统赎车日期内容 = getFieldDecorator => (
  <Col md={8} sm={24} key={'buyTimeType'}>
    <FormItem label="系统赎车日期内容">
      {getFieldDecorator('buyTimeType', {
        initialValue: null,
      })(
        <Select style={{ width: '100%' }}>
          <Option value={null} key={-1}>
            全部
          </Option>
          <Option value={1} key={1}>
            有值
          </Option>
          <Option value={0} key={0}>
            无值
          </Option>
        </Select>
      )}
    </FormItem>
  </Col>
);
export const 百望开票日期内容 = getFieldDecorator => (
  <Col md={8} sm={24} key={'baiWangBillDateType'}>
    <FormItem label="百望开票日期内容">
      {getFieldDecorator('baiWangBillDateType', {
        initialValue: null,
      })(
        <Select style={{ width: '100%' }}>
          <Option value={null} key={-1}>
            全部
          </Option>
          <Option value={1} key={1}>
            有值
          </Option>
          <Option value={0} key={0}>
            无值
          </Option>
        </Select>
      )}
    </FormItem>
  </Col>
);
export const 航天金税开票日期内容 = getFieldDecorator => (
  <Col md={8} sm={24} key={'hangxinBillDateType'}>
    <FormItem label="航天金税开票日期内容">
      {getFieldDecorator('hangxinBillDateType', {
        initialValue: null,
      })(
        <Select style={{ width: '100%' }}>
          <Option value={null} key={-1}>
            全部
          </Option>
          <Option value={1} key={1}>
            有值
          </Option>
          <Option value={0} key={0}>
            无值
          </Option>
        </Select>
      )}
    </FormItem>
  </Col>
);
export const 赎车是否超3天 = getFieldDecorator => (
  <Col md={6} sm={24} key={'isBuyTimeMoreThan3Days'}>
    <FormItem label="赎车是否超3天">
      {getFieldDecorator('isBuyTimeMoreThan3Days', {
        initialValue: null,
      })(
        <Select style={{ width: '100%' }}>
          <Option value={null} key={-1}>
            全部
          </Option>
          <Option value={1} key={1}>
            是
          </Option>
          <Option value={0} key={0}>
            否
          </Option>
          <Option value={2} key={2}>
            空
          </Option>
        </Select>
      )}
    </FormItem>
  </Col>
);
export const 未开票天数 = getFieldDecorator => (
  <Col md={8} sm={24} key={'unBillDaysArr'}>
    <FormItem label="未开票天数">
      {getFieldDecorator('unBillDaysArr')(
        <Select placeholder="全部" mode="multiple">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(v => (
            <Option value={v} key={v}>
              {v == 8 ? '8天及以上' : v}
            </Option>
          ))}
        </Select>
      )}
    </FormItem>
  </Col>
);
export const 车架号 = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'chassis'}>
      <FormItem label="车架号">{getFieldDecorator('chassis')(<Input placeholder="请输入车架号" />)}</FormItem>
    </Col>
  );
};
