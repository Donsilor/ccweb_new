import React from 'react';
import { Form, Input, Select, Col, DatePicker, Badge } from 'antd';
import EBDic, { locationStatusList, carFromList, moveCarsTypeList, goneStatusDicSelfcarList } from 'common/constant';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const repoStatusDicSelfcarList = [
  {
    name: '全部',
    value: '',
    badgeStatus: 'processing',
  },
  {
    name: '待审核',
    value: 20,
    badgeStatus: 'processing',
  },
  {
    name: '待上传车辆照片',
    value: 10,
    badgeStatus: 'processing',
  },
  {
    name: '退回重拍',
    value: 30,
    badgeStatus: 'error',
  },
  {
    name: '异常反馈',
    value: 60,
    badgeStatus: 'error',
  },
];
export const chassisFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'chassis'}>
      <FormItem label="车架号">{getFieldDecorator(EBDic.chassis)(<Input placeholder="请输入车架号" />)}</FormItem>
    </Col>
  );
};
export const locationNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'locationName'}>
      <FormItem label="二网名称">
        {getFieldDecorator(EBDic.locationName)(<Input placeholder="请输入二网名称" />)}
      </FormItem>
    </Col>
  );
};

export const ewNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'ewName'}>
      <FormItem label="二网名称">{getFieldDecorator(EBDic.ewName)(<Input placeholder="请输入二网名称" />)}</FormItem>
    </Col>
  );
};

export const repoStatusSelfCarFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="审核状态">
        {getFieldDecorator('status', {
          initialValue: '',
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {repoStatusDicSelfcarList.map(dic => (
              <Option value={dic.value} key={dic.value}>
                <Badge status={dic.badgeStatus} text={dic.name} />
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const moveStatusSelfCarFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="审核状态">
        {getFieldDecorator('status', {
          initialValue: '',
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {repoStatusDicSelfcarList
              .filter(item => item.value !== 60)
              .map(dic => (
                <Option value={dic.value} key={dic.value}>
                  <Badge status={dic.badgeStatus} text={dic.name} />
                </Option>
              ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const taskStartTimeRangeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'taskStartTimeRange'}>
      <FormItem label="任务下发日期">
        {getFieldDecorator('taskStartTimeRange')(<RangePicker format={dateFormat} />)}
      </FormItem>
    </Col>
  );
};

export const regionNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'regionName'}>
      <FormItem label="大区名称">{getFieldDecorator('regionName')(<Input placeholder="请输入大区名称" />)}</FormItem>
    </Col>
  );
};

export const subRegionNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'regionName'}>
      <FormItem label="小区名称">{getFieldDecorator('regionSubName')(<Input placeholder="请选择小区名称" />)}</FormItem>
    </Col>
  );
};
export const provinceNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'provinceName'}>
      <FormItem label="省份">{getFieldDecorator('provinceName')(<Input placeholder="请输入省份" />)}</FormItem>
    </Col>
  );
};

export const cityNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'cityName'}>
      <FormItem label="城市">{getFieldDecorator('cityName')(<Input placeholder="请输入城市" />)}</FormItem>
    </Col>
  );
};

export const beginDateFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'statisDate'}>
      <FormItem label="统计日期">{getFieldDecorator('statisDate')(<RangePicker format={dateFormat} />)}</FormItem>
    </Col>
  );
};

export const moveOutIdFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'moveOutName'}>
      <FormItem label="移出位置">{getFieldDecorator('moveOutName')(<Input placeholder="请输入移出位置" />)}</FormItem>
    </Col>
  );
};
export const moveInIdFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'moveInName'}>
      <FormItem label="移入位置">{getFieldDecorator('moveInName')(<Input placeholder="请输入移入位置" />)}</FormItem>
    </Col>
  );
};
export const stateFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'state'}>
      <FormItem label="任务状态">
        {getFieldDecorator('state')(
          <Select placeholder="全部">
            {moveCarsTypeList.map(reason => (
              <Option value={reason.value} key={reason.value}>
                {reason.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const locationStateFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'locationState'}>
      <FormItem label="位置状态">
        {getFieldDecorator('status', {
          initialValue: '',
        })(
          <Select placeholder="请选择位置状态">
            {locationStatusList.map(reason => (
              <Option value={reason.value} key={reason.value}>
                {reason.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const carFromItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'carFrom'}>
      <FormItem label="来源">
        {getFieldDecorator('carFrom', {
          initialValue: '',
        })(
          <Select placeholder="请选择来源">
            {carFromList.map(reason => (
              <Option value={reason.value} key={reason.value}>
                {reason.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const carTypeSelfCarFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'carType'}>
      <FormItem label="车辆类型">
        {getFieldDecorator('carType', {
          initialValue: '',
        })(
          <Select placeholder="请选择车辆类型">
            {[
              {
                name: '全部',
                value: '',
              },
              {
                name: '新车',
                value: 0,
              },
              {
                name: '二手车',
                value: 1,
              },
            ].map(reason => (
              <Option value={reason.value} key={reason.value}>
                {reason.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};

export const locationFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'locationName'}>
      <FormItem label="定位点名称">
        {getFieldDecorator('locationName')(<Input placeholder="请输入定位点名称" />)}
      </FormItem>
    </Col>
  );
};
export const processStatusFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'processStatus'}>
      <FormItem label="状态">
        {getFieldDecorator('processStatus')(
          <Select placeholder="全部">
            <Option value="0">待处理</Option>
            <Option value="2">处理完成</Option>
            <Option value="3">处理失败</Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const batchnoFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'batchno'}>
      <FormItem label="批次号">{getFieldDecorator('batchno')(<Input placeholder="请输入批次号" />)}</FormItem>
    </Col>
  );
};
export const processTypeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'processType'}>
      <FormItem label="类型">
        {getFieldDecorator('processType')(
          <Select placeholder="全部">
            <Option value="0">不变</Option>
            <Option value="1">新增</Option>
            <Option value="2">移动</Option>
            <Option value="3">出售</Option>
            <Option value="4">赎车</Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const processAddTypeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'processType'}>
      <FormItem label="类型">
        {getFieldDecorator('processType')(
          <Select placeholder="全部">
            <Option value="0">不变</Option>
            <Option value="1">新增</Option>
            <Option value="3">出售</Option>
            <Option value="4">赎车</Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};

export const standStatFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="任务状态">
        {getFieldDecorator('status', {
          initialValue: null,
        })(
          <Select placeholder="请选择状态">
            <Option value={null}>全部</Option>
            <Option value="10">待上传照片</Option>
            <Option value="30">退回重拍</Option>
            <Option value="20">待审核</Option>
            <Option value="40">审核通过</Option>
            <Option value="50">审核不通过</Option>
            <Option value="60">异常反馈</Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const standPlateStatFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="任务状态">
        {getFieldDecorator('status', {
          initialValue: null,
        })(
          <Select placeholder="请选择状态">
            <Option value={null}>全部</Option>
            <Option value="10">待上传照片</Option>
            <Option value="30">退回重拍</Option>
            <Option value="20">待审核</Option>
            <Option value="40">审核通过</Option>
            <Option value="50">审核不通过</Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const ydNumFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'id'}>
      <FormItem label="移动编号">{getFieldDecorator(EBDic.id)(<Input placeholder="请输入编号" />)}</FormItem>
    </Col>
  );
};
export const goneStatusSelfCarFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="审核结果">
        {getFieldDecorator('status', {
          initialValue: '',
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {goneStatusDicSelfcarList.map(dic => (
              <Option value={dic.value} key={dic.value}>
                <Badge status={dic.badgeStatus} text={dic.name} />
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};

export const selfSmaRegNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'name'}>
      <FormItem label="小区名称">{getFieldDecorator('name')(<Input placeholder="请输入小区名称" />)}</FormItem>
    </Col>
  );
};
// 产品名称
export const financialNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'brand'}>
      <FormItem label="产品名称">{getFieldDecorator('name')(<Input placeholder="请输入产品名称" />)}</FormItem>
    </Col>
  );
};
//合作金融机构
export const cooFinancFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bankName'}>
      <FormItem label="合作金融机构">
        {getFieldDecorator('bankName')(<Input placeholder="请输合作金融机构" />)}
      </FormItem>
    </Col>
  );
};
//检查任务编号
export const examCodeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'code'}>
      <FormItem label="检查任务编号">{getFieldDecorator('code')(<Input placeholder="请输入任务编号" />)}</FormItem>
    </Col>
  );
};
//防作弊检查日期
export const examTimeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'dateRange'}>
      <FormItem label="日期">{getFieldDecorator('dateRange')(<RangePicker format={dateFormat} />)}</FormItem>
    </Col>
  );
};
export const descriptionFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'description'}>
      <FormItem label="抽查描述">
        {getFieldDecorator('description', {
          initialValue: null,
        })(
          <Select placeholder="请选择抽查描述">
            {[{ name: '全部', value: null }, { name: '日常盘证', value: '日常盘证' }, { name: '接证任务', value: '接证任务' }, { name: '其他', value: '其他' }].map(
              reason => (
                <Option value={reason.value} key={reason.value}>
                  {reason.name}
                </Option>
              )
            )}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};