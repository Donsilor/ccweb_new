import React from 'react';
import { Form, Input, Select, Col, DatePicker, InputNumber } from 'antd';
import EBDic from 'common/constant';
import { carStatusList } from 'common/constant';
import moment from 'moment';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
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
export const ewNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'ewName'}>
      <FormItem label="二网名称">{getFieldDecorator('ewName')(<Input placeholder="请输入二网名称" />)}</FormItem>
    </Col>
  );
};
export const statusTypeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="是否有效">
        {getFieldDecorator('status', {
          // initialValue: 1,
        })(
          <Select placeholder="全部" style={{ width: '100%' }}>
            {EBDic.statusTypeList.map(dic => (
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
//银行名称
export const bankName = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bankName'}>
      <FormItem label="银行名称">{getFieldDecorator('bankName')(<Input placeholder="请输入银行名称" />)}</FormItem>
    </Col>
  );
};
//经销商
export const distributorName = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'distributorName'}>
      <FormItem label="经销商">{getFieldDecorator('distributorName')(<Input placeholder="请输入经销商" />)}</FormItem>
    </Col>
  );
};
//车架号
export const chassis = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'chassis'}>
      <FormItem label="车架号">{getFieldDecorator('chassis')(<Input placeholder="请输入车架号" />)}</FormItem>
    </Col>
  );
};
export const isfirstFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'businessType'}>
      <FormItem label="业务类型">
        {getFieldDecorator('businessType', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={0} key={0}>
              首次关联
            </Option>
            <Option value={1} key={1}>
              续作
            </Option>
            <Option value={2} key={2}>
              解除关联
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const unassociateFlag = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'unassociateFlag'}>
      <FormItem label="标记解除关联">
        {getFieldDecorator('unassociateFlag', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={0} key={0}>
              未标记
            </Option>
            <Option value={1} key={1}>
              已标记
            </Option>
          </Select>
        )}
      </FormItem>
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
export const oddType = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'oddType'}>
      <FormItem label="单号类型">
        {getFieldDecorator('oddType', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={1} key={0}>
              定期
            </Option>
            <Option value={2} key={0}>
              活期
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const oddNum = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'oddNum'}>
      <FormItem label="单号">{getFieldDecorator('oddNum')(<Input placeholder="请输入单号" />)}</FormItem>
    </Col>
  );
};
export const renewFlag = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'renewFlag'}>
      <FormItem label="是否续存">
        {getFieldDecorator('renewFlag', {
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
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const adjustType = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'adjustType'}>
      <FormItem label="调整类型">
        {getFieldDecorator('adjustType', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={1} key={1}>
              初始转入
            </Option>
            <Option value={2} key={2}>
              追加转入
            </Option>
            <Option value={3} key={3}>
              活期初始
            </Option>
            <Option value={4} key={4}>
              活期追加
            </Option>
            <Option value={5} key={5}>
              转出
            </Option>
            <Option value={6} key={6}>
              本息续存
            </Option>
            <Option value={7} key={7}>
              利息转出
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
//经销商
export const dealerName = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'dealerName'}>
      <FormItem label="经销商">{getFieldDecorator('dealerName')(<Input placeholder="请输入经销商" />)}</FormItem>
    </Col>
  );
};
//年月
export const monthFormItem = getFieldDecorator => {
  return (
    <Col md={5} sm={24} key={'paramYearMonth'}>
      <FormItem label="年月">
        {getFieldDecorator('paramYearMonth', {
          initialValue: moment().subtract(1, 'months'),
        })(<MonthPicker style={{ width: '100%' }} allowClear={false} />)}
      </FormItem>
    </Col>
  );
};
export const noRepaymentDays = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'noRepaymentDays'}>
      <FormItem label="距今N天没有赎车">
        {getFieldDecorator('noRepaymentDays')(<InputNumber style={{ width: '100%' }} placeholder="请输入天数" />)}
      </FormItem>
    </Col>
  );
};
//导入日期
export const importFormItem = getFieldDecorator => {
  return (
    <Col md={5} sm={24} key={'paramImportTime'}>
      <FormItem label="导入日期">
        {getFieldDecorator('paramImportTime')(<DatePicker style={{ width: '100%' }} />)}
      </FormItem>
    </Col>
  );
};
export const fileType = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'fileType'}>
      <FormItem label="录入格式">
        {getFieldDecorator('fileType', {
          initialValue: 21,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={21} key={1}>
              车辆导入-橙E格式
            </Option>
            <Option value={22} key={2}>
              车辆导入-长安马自达
            </Option>
            <Option value={23} key={3}>
              车辆导入-长安汽车
            </Option>
            <Option value={24} key={4}>
              车辆导入-一汽大众
            </Option>
            <Option value={25} key={5}>
              车辆导入-青岛解放
            </Option>
            <Option value={26} key={6}>
              车辆导入-一汽解放
            </Option>
            <Option value={31} key={7}>
              车辆还款-橙E格式
            </Option>
            <Option value={32} key={8}>
              车辆还款-线下格式
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const remainingAmount = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'remainingAmount'}>
      <FormItem label="剩余金额小于">
        {getFieldDecorator('remainingAmount')(<InputNumber style={{ width: '100%' }} placeholder="请输入剩余金额" />)}
      </FormItem>
    </Col>
  );
};
export const statusCode = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'statusCode'}>
      <FormItem label="状态">
        {getFieldDecorator('statusCode', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={'bill_status_1'} key={1}>
              未结清
            </Option>
            <Option value={'bill_status_2'} key={2}>
              已结清
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const cooperateStatus = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'cooperateStatus'}>
      <FormItem label="合作状态">
        {getFieldDecorator('cooperateStatus', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={0} key={0}>
              合作
            </Option>
            <Option value={1} key={1}>
              不合作
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const thirdMatchCode = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'thirdMatchCode'}>
      <FormItem label="状态">
        {getFieldDecorator('statusCode', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={'assign_status_1'} key={1}>
              未分配
            </Option>
            <Option value={'assign_status_2'} key={2}>
              已分配
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const billNo = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'billNo'}>
      <FormItem label="票号">{getFieldDecorator('billNo')(<Input placeholder="请输入票号" />)}</FormItem>
    </Col>
  );
};
export const billNo1 = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'billNo1'}>
      <FormItem label="实际分配票据号">{getFieldDecorator('billNo')(<Input placeholder="请输入票号" />)}</FormItem>
    </Col>
  );
};
export const vin = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'vin'}>
      <FormItem label="车架号">{getFieldDecorator('vin')(<Input placeholder="请输入车架号" />)}</FormItem>
    </Col>
  );
};
export const subAccountNo = getFieldDecorator => {
  return (
    <Col md={5} sm={24} key={'subAccountNo'}>
      <FormItem label="分账号">{getFieldDecorator('subAccountNo')(<Input placeholder="请输入分账号" />)}</FormItem>
    </Col>
  );
};
export const businessNo = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'businessNo'}>
      <FormItem label="业务编号">{getFieldDecorator('businessNo')(<Input placeholder="请输入业务编号" />)}</FormItem>
    </Col>
  );
};
export const importFormItem1 = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'importDate'}>
      <FormItem label="导入日期">{getFieldDecorator('importDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const invoiceDate = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'invoiceDate'}>
      <FormItem label="开票日">{getFieldDecorator('invoiceDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const dueDate = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'dueDate'}>
      <FormItem label="到期日">{getFieldDecorator('dueDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const hxDate = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'hxDate'}>
      <FormItem label="核心厂商发货日期">{getFieldDecorator('hxDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const matchedDate = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'matchedDate'}>
      <FormItem label="匹配日期">{getFieldDecorator('matchedDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const outboundDate = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'outboundDate'}>
      <FormItem label="出库日期">{getFieldDecorator('outboundDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const fcDate = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'fcDate'}>
      <FormItem label="发车日期">{getFieldDecorator('fcDate')(<RangePicker />)}</FormItem>
    </Col>
  )
}
export const carStatusName = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'carStatusName'}>
      <FormItem label="车辆位置状态">
        {getFieldDecorator('status', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            {carStatusList.map(item => (
              <Option value={item.value} key={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const createDate = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'createDate'}>
      <FormItem label="创建日期">{getFieldDecorator('createDate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 推送状态 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'syncFlag'}>
      <FormItem label="推送状态">
        {getFieldDecorator('syncFlag', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={1} key={1}>
              已推送
            </Option>
            <Option value={0} key={2}>
              未推送
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const 汇总周期 = getFieldDecorator => {
  let date = moment();
  let dow = date.day();
  let monday1 = date.subtract(dow - 2, 'days')//本周二
  let monday2 = moment(monday1).subtract(-6, 'days')//下周一
  return (
    <Col md={8} sm={24} key={'opTimeDate'}>
      <FormItem label="汇总周期">{getFieldDecorator('opTimeDate', {
        initialValue: [monday1, monday2]
      })(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 状态 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'statusSpot'}>
      <FormItem label="状态">
        {getFieldDecorator('status', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={'已下发'} key={1}>
              已下发
            </Option>
            <Option value={'待下发'} key={2}>
              待下发
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const 抽查日期 = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'bookTime'}>
      <FormItem label="抽查日期">{getFieldDecorator('bookTime')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 盘车任务下发结果 = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'spotCarResult'}>
      <FormItem label="盘车任务下发结果">
        {getFieldDecorator('spotCarResult', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={'下发成功'} key={1}>
              下发成功
            </Option>
            <Option value={'下发失败'} key={2}>
              下发失败
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const 盘证下发任务结果 = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'spotCertResult'}>
      <FormItem label="盘证任务下发结果">
        {getFieldDecorator('spotCertResult', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={'下发成功'} key={1}>
              下发成功
            </Option>
            <Option value={'下发失败'} key={2}>
              下发失败
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const 经销商名称 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'custname'}>
      <FormItem label="经销商">{getFieldDecorator('custname')(<Input placeholder="请输入经销商名称" />)}</FormItem>
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
export const 标识 = getFieldDecorator => {
  return (
    <Col md={5} sm={24} key={'identification'}>
      <FormItem label="标识">{getFieldDecorator('identification')(<Input placeholder="请输入标识" />)}</FormItem>
    </Col>
  );
};
export const 经销商名称1 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'dealerName'}>
      <FormItem label="经销商名称">{getFieldDecorator('dealerName')(<Input placeholder="请输入经销商名称" />)}</FormItem>
    </Col>
  );
};
export const 生成日期 = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'generateTime'}>
      <FormItem label="生成日期">{getFieldDecorator('generateTime')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 客户经理 = getFieldDecorator => {
  return (
    <Col md={5} sm={24} key={'customerManager'}>
      <FormItem label="客户经理">{getFieldDecorator('customerManager')(<Input placeholder="请输入客户经理名称" />)}</FormItem>
    </Col>
  );
};
export const 车辆识别代码 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'vinName'}>
      <FormItem label="车辆识别代码">{getFieldDecorator('vin')(<Input placeholder="请输入车辆识别代码" />)}</FormItem>
    </Col>
  );
};
export const 客户名称 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'kehumc'}>
      <FormItem label="客户名称">{getFieldDecorator('custname')(<Input placeholder="请输入客户名称" />)}</FormItem>
    </Col>
  );
};
export const 是否撤监管 = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'deregulationFlag'}>
      <FormItem label="是否撤监管">
        {getFieldDecorator('deregulationFlag', {
          initialValue: null,
        })(
          <Select>
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
export const 赎车日期 = getFieldDecorator => {
  let date = moment().subtract(1, 'days');
  return (
    <Col md={7} sm={24} key={'buyTime'}>
      <FormItem label="赎车日期">{getFieldDecorator('buyTime', {
        initialValue: [date, date]
      })(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 开票日期 = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'billTime'}>
      <FormItem label="开票日期">{getFieldDecorator('billTime', {
        initialValue: [moment().subtract(6, 'months'), moment()]
      })(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 入库时间 = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'入库时间'}>
      <FormItem label="入库时间">{getFieldDecorator('putintime')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 释放时间 = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'释放时间'}>
      <FormItem label="释放时间">{getFieldDecorator('repaydate')(<RangePicker />)}</FormItem>
    </Col>
  );
};
export const 融资模式 = getFieldDecorator => {
  return (
    <Col md={5} sm={24} key={'singlepool'}>
      <FormItem label="融资模式">
        {getFieldDecorator('singlepool', {
          initialValue: null,
        })(
          <Select style={{ width: '100%' }}>
            <Option value={null} key={-1}>
              全部
            </Option>
            <Option value={'S'} key={1}>
              单笔
            </Option>
            <Option value={'P'} key={2}>
              池
            </Option>
          </Select>
        )}
      </FormItem>
    </Col>
  );
};