import React from 'react';
import { Form, Input, Select, Col, DatePicker, Badge } from 'antd';
import EBDic from 'common/constant';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

export const hasBondFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isEmpty'}>
      <FormItem label="是否有保证金">
        {getFieldDecorator('hasBond')(
          <Select placeholder="全部" style={{ width: '100%' }}>
            {EBDic.commonDic.map(dic => (
              <Option value={dic.value} key={dic.value}>
                {dic.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};

export const brandNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'brandName'}>
      <FormItem label="品牌名称">{getFieldDecorator('brandName')(<Input placeholder="请输入品牌名称" />)}</FormItem>
    </Col>
  );
};

export const bondFlowTypeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'exportType'}>
      <FormItem label="导出类型">
        {getFieldDecorator('exportType', {
          initialValue: -1,
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {EBDic.exportTypeList.map(dic => (
              <Option value={dic.value} key={dic.value}>
                {dic.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
