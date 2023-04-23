import React from 'react';
import { Form, Input, Select, Col } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;

export const 经销商名称 = getFieldDecorator => {
    return (
        <Col md={6} sm={24} key={'custname'}>
            <FormItem label="经销商名称">{getFieldDecorator('custname')(<Input placeholder="请输入经销商名称" />)}</FormItem>
        </Col>
    );
};
export const 标识 = getFieldDecorator => {
    return (
        <Col md={6} sm={24} key={'identification'}>
            <FormItem label="标识">{getFieldDecorator('identification')(<Input placeholder="请输入标识" />)}</FormItem>
        </Col>
    );
};
export const 业务编号 = getFieldDecorator => {
    return (
        <Col md={6} sm={24} key={'bizno'}>
            <FormItem label="业务编号">{getFieldDecorator('bizno')(<Input placeholder="请输入业务编号" />)}</FormItem>
        </Col>
    );
};
export const 备注 = getFieldDecorator => {
    return (
        <Col md={6} sm={24} key={'remark'}>
            <FormItem label="备注">{getFieldDecorator('remark')(<Input placeholder="请输入备注" />)}</FormItem>
        </Col>
    );
};
export const 押品状态 = getFieldDecorator => {
    return (
        <Col md={6} sm={24} key={'collstatus'}>
            <FormItem label="押品状态">
                {getFieldDecorator('collstatus', {
                    initialValue: null,
                })(
                    <Select style={{ width: '100%' }}>
                        <Option value={null} key={-1}>
                            全部
                        </Option>
                        <Option value={'在库'} key={1}>
                            在库
                        </Option>
                        <Option value={'在途'} key={2}>
                            在途
                        </Option>
                        <Option value={'已释放'} key={3}>
                            已释放
                        </Option>
                    </Select>
                )}
            </FormItem>
        </Col>
    );
};
export const 监管方状态 = getFieldDecorator => {
    return (
        <Col md={6} sm={24} key={'supervisorStatus'}>
            <FormItem label="监管方状态">
                {getFieldDecorator('supervisorStatus', {
                    initialValue: null,
                })(
                    <Select style={{ width: '100%' }}>
                        <Option value={null} key={-1}>
                            全部
                        </Option>
                        <Option value={'在库'} key={1}>
                            在库
                        </Option>
                        <Option value={'在途'} key={2}>
                            在途
                        </Option>
                        <Option value={'已释放'} key={3}>
                            已释放
                        </Option>
                    </Select>
                )}
            </FormItem>
        </Col>
    );
};
export const 状态是否一致 = getFieldDecorator => {
    return (
        <Col md={6} sm={24} key={'consistentState'}>
            <FormItem label="状态是否一致">
                {getFieldDecorator('consistentState', {
                    initialValue: null,
                })(
                    <Select style={{ width: '100%' }}>
                        <Option value={null} key={-1}>
                            全部
                        </Option>
                        <Option value={'是'} key={1}>
                            是
                        </Option>
                        <Option value={'否'} key={2}>
                            否
                        </Option>
                    </Select>
                )}
            </FormItem>
        </Col>
    );
};