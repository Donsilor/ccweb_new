
import React from 'react';
import { Form, Input, Col, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
export const 经销商 = getFieldDecorator => {
    return (
        <Col md={7} sm={24} key={'distributorName'}>
            <FormItem label="经销商">{getFieldDecorator('distributorName')(<Input placeholder="请输入经销商名称" />)}</FormItem>
        </Col>
    );
};
export const 标识 = getFieldDecorator => {
    return (
        <Col md={6} sm={24} key={'chassis'}>
            <FormItem label="标识">{getFieldDecorator('chassis')(<Input placeholder="请输入标识" />)}</FormItem>
        </Col>
    );
};
export const 任务下发时间 = getFieldDecorator => {
    return (
        <Col md={7} sm={24} key={'bookTime'}>
            <FormItem label="下发时间">{getFieldDecorator('bookTime')(<RangePicker format='YYYY/MM/DD' />)}</FormItem>
        </Col>
    );
};
export const 任务拍照时间 = getFieldDecorator => {
    return (
        <Col md={7} sm={24} key={'uploadTime'}>
            <FormItem label="拍照时间">{getFieldDecorator('uploadTime')(<RangePicker format='YYYY/MM/DD' />)}</FormItem>
        </Col>
    );
};
export const 任务类型 = getFieldDecorator => {
    return (
        <Col md={5} sm={24} key={'description'}>
            <FormItem label="任务类型">
                {getFieldDecorator('description', {
                    initialValue: null,
                })(
                    <Select style={{ width: '100%' }}>
                        <Option value={null} key={-1}>
                            全部
                        </Option>
                        <Option value={'盘证任务'} key={0}>
                            盘证任务
                        </Option>
                        <Option value={'日常查车'} key={1}>
                            日常查车
                        </Option>
                    </Select>
                )}
            </FormItem>
        </Col>
    );
};
export const 审核状态 = getFieldDecorator => {
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
                        {
                            ['未提交', '待上传合格证', '待上传车辆照片', '待审核', '重新拍照(合格证)', '重新拍照(车辆)', '审核通过', '审核不通过', '下发后终止抽查', '自我标记异常', '待补拍'].map((item, index) =>
                                <Option value={index} key={index}>
                                    {item}
                                </Option>)
                        }
                    </Select>
                )}
            </FormItem>
        </Col>
    );
};