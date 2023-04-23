import React from 'react';
import { Form, Input, Select, Col, DatePicker } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
export const 经销商 = getFieldDecorator => {
    return (
        <Col md={8} sm={24} key={'dealerName'}>
            <FormItem label="经销商">{getFieldDecorator('dealerName')(<Input placeholder="请输入经销商名称" />)}</FormItem>
        </Col>
    );
};
export const 创建时间 = getFieldDecorator => {
    return (
        <Col md={8} sm={24} key={'createDate'}>
            <FormItem label="创建时间">{getFieldDecorator('createDate')(<RangePicker />)}</FormItem>
        </Col>
    );
};
export const 最后提交时间 = getFieldDecorator => {
    return (
        <Col md={8} sm={24} key={'updateDate'}>
            <FormItem label="最后提交时间">{getFieldDecorator('updateDate')(<RangePicker />)}</FormItem>
        </Col>
    );
};
export const 任务状态 = getFieldDecorator => {
    return (
        <Col md={8} sm={24} key={'auditStatus'}>
            <FormItem label="任务状态">
                {getFieldDecorator('auditStatus', {
                    initialValue: null,
                })(
                    <Select style={{ width: '100%' }}>
                        <Option value={null} key={-1}>
                            全部
                        </Option>
                        <Option value={0} key={1}>
                            未提交
                        </Option>
                        <Option value={1} key={2}>
                            待初审
                        </Option>
                        <Option value={2} key={3}>
                            待复审
                        </Option>
                        <Option value={3} key={4}>
                            退回到二网
                        </Option>
                        <Option value={4} key={5}>
                            退回到易查库
                        </Option>
                        <Option value={5} key={6}>
                            奖励金待审核
                        </Option>
                        <Option value={6} key={7}>
                            审批通过
                        </Option>
                        <Option value={7} key={8}>
                            已完成
                        </Option>
                    </Select>
                )}
            </FormItem>
        </Col>
    );
};
export const 品牌 = getFieldDecorator => {
    return (
        <Col md={8} sm={24} key={'name'}>
            <FormItem label="品牌">{getFieldDecorator('name')(<Input placeholder="请输入品牌" />)}</FormItem>
        </Col>
    );
};
export const 二网名称 = getFieldDecorator => {
    return (
        <Col md={8} sm={24} key={'agentName'}>
            <FormItem label="二网名称">{getFieldDecorator('agentName')(<Input placeholder="请输入二网名称" />)}</FormItem>
        </Col>
    );
};
export const 汽车厂商 = getFieldDecorator => {
    return (
        <Col md={8} sm={24} key={'manufacturerName'}>
            <FormItem label="汽车厂商">{getFieldDecorator('manufacturerName')(<Input placeholder="请输入汽车厂商" />)}</FormItem>
        </Col>
    );
};
// export const 二网联系人 = getFieldDecorator => {
//     return (
//         <Col md={8} sm={24} key={'agentContactPerson'}>
//             <FormItem label="二网联系人">{getFieldDecorator('agentContactPerson')(<Input placeholder="请输入二网联系人" />)}</FormItem>
//         </Col>
//     );
// };
export const 车架号 = getFieldDecorator => {
    return (
        <Col md={8} sm={24} key={'vin'}>
            <FormItem label="车架号">{getFieldDecorator('vin')(<Input placeholder="请输入车架号" />)}</FormItem>
        </Col>
    );
};
