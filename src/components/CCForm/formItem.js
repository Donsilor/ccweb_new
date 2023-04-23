import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, Icon, Row, Col, DatePicker, Badge, Checkbox } from 'antd';
import EBDic, {
  excepResionList,
  spottestList,
  locationStatusList,
  carFromList,
  moveCarsTypeList,
  repoStatusDicSelfcarList,
  goneStatusDicSelfcarList,
  selfcarTypeList,
} from 'common/constant';
import moment from 'moment';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

export const ptTyFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'ptType'}>
      <FormItem label="异常类型">
        {getFieldDecorator('bankExcReseaon')(
          <Select placeholder="请选择异常类型">
            {excepResionList.map(reason => (
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
export const moveIdFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'taskId'}>
      <FormItem label="移动编号">{getFieldDecorator(EBDic.taskId)(<Input placeholder="请输入移动编号" />)}</FormItem>
    </Col>
  );
};
export const spottesttypeFormItema = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'spottesttype'}>
      <FormItem label="抽查类型">
        {getFieldDecorator(EBDic.spottesttype)(
          <Select placeholder="请选择抽查类型">
            {spottestList
              .filter(reason => reason.value !== 5 && reason.value !== 6 && reason.value !== 7)
              .map(reason => (
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
export const spottesttypeFormItemb = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'spottesttype'}>
      <FormItem label="抽查类型">
        {getFieldDecorator(EBDic.spottesttype)(
          <Select placeholder="请选择抽查类型">
            {spottestList
              .filter(reason => reason.value == 5 || reason.value == 6)
              .map(reason => (
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
export const spottestStatusFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'auditStaus'}>
      <FormItem label="任务状态">
        {getFieldDecorator('auditStaus', {
          initialValue: null,
        })(
          <Select placeholder="请选择任务状态">
            {[{ name: '全部', value: null }, { name: '待上传车辆照片', value: 2 }, { name: '待审核', value: 3 }].map(
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
export const spottesttypeFormItemc = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'spottesttype'}>
      <FormItem label="抽查类型">
        {getFieldDecorator(EBDic.spottesttype)(
          <Select placeholder="请选择抽查类型">
            {spottestList.map(reason => (
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
export const spottesttypeFormItemd = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'spottesttype'}>
      <FormItem label="抽查类型">
        {getFieldDecorator(EBDic.spottesttype)(
          <Select placeholder="请选择抽查类型">
            {spottestList
              .filter(reason => reason.value !== 7)
              .map(reason => (
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
export const bookTimeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bookTime'}>
      <FormItem label="任务下发日期">{getFieldDecorator('bookTime')(<RangePicker format={dateFormat} />)}</FormItem>
    </Col>
  );
};
export const applyTimeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bookTime'}>
      <FormItem label="任务申请日期">{getFieldDecorator('bookTime')(<RangePicker format={dateFormat} />)}</FormItem>
    </Col>
  );
};

export const ptNotPassFlagFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'ptNotPassFlag'}>
      <FormItem label="异常原因_平台">
        {getFieldDecorator('ptNotPassFlag', {
          initialValue: null,
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value={null} key="all">
              全部
            </Option>
            {excepResionList
              .filter(reason => reason.value !== 6 && reason.value !== 11)
              .map(reason => (
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
export const ptRemarkExcFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bankExcReseaon'}>
      <FormItem label="异常原因_最终">
        {getFieldDecorator('bankExcReseaon', {
          initialValue: null,
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value={null} key="all">
              全部
            </Option>
            {excepResionList
              .filter(reason => reason.value !== 6 && reason.value !== 7 && reason.value !== 8)
              .map(reason => (
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
export const ptRemarkExcFormItemStr = getFieldDecorator => {
  return (
    <Col md={7} sm={24} key={'bankExcReasonStr'}>
      <FormItem label="异常原因_最终">
        {getFieldDecorator('bankExcReasonStr')(
          <Select placeholder="请选择" style={{ width: '100%' }} mode="multiple">
            {excepResionList
              .filter(reason => reason.value !== 6 && reason.value !== 7 && reason.value !== 8)
              .map(reason => (
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
export const spottestIdFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'spottestId'}>
      <FormItem label="任务编号">{getFieldDecorator(EBDic.spottestId)(<Input placeholder="任务编号" />)}</FormItem>
    </Col>
  );
};
export const distributorNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'distributorName'}>
      <FormItem label="经销商名称">
        {getFieldDecorator(EBDic.distributorName)(<Input placeholder="请输入经销商名称" />)}
      </FormItem>
    </Col>
  );
};

export const dealerNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'dealerName'}>
      <FormItem label="经销商名称">
        {getFieldDecorator('dealerName')(<Input placeholder="请输入经销商名称" />)}
      </FormItem>
    </Col>
  );
};
export const carShowNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'showName'}>
      <FormItem label="车展名称">{getFieldDecorator('showName')(<Input placeholder="请输入车展名称" />)}</FormItem>
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
export const statusFormItem = (type = 'ALL') => getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="业务状态">
        {getFieldDecorator(EBDic.status, {
          initialValue: -1,
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {EBDic.statusDicList
              .filter(dic => dic.typeList.includes(type))
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
export const spotTaskStatusFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'spotTaskStatus'}>
      <FormItem label="任务类型">
        {getFieldDecorator('spotTestType', {
          initialValue: -1,
        })(
          <Select placeholder="请选择">
            {[{ name: '全部', value: -1 }, ...spottestList]
              .filter(type => ![5, 6].includes(type.value))
              .map(dic => (
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
export const movingTaskStatusFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'spotTaskStatus'}>
      <FormItem label="任务类型">
        {getFieldDecorator('spotTestType', {
          initialValue: -1,
        })(
          <Select placeholder="请选择">
            {[{ name: '全部', value: -1 }, ...spottestList]
              .filter(type => [-1, 5, 6].includes(type.value))
              .map(dic => (
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
export const repoStatusFormItem = (type = 'FIRSTTODO') => getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="审核状态">
        {getFieldDecorator('status', {
          initialValue: -1,
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {EBDic.repoStatusDicList
              .filter(dic => dic.typeList.includes(type))
              .map(dic => (
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
export const bankNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bankName'}>
      <FormItem label="银行名称">{getFieldDecorator(EBDic.bankName)(<Input placeholder="请输入银行名称" />)}</FormItem>
    </Col>
  );
};
export const disApplyTimeRangeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'disApplyTimeRange'}>
      <FormItem label="经销商申请日期">
        {getFieldDecorator('disApplyTimeRange')(
          <RangePicker format={dateFormat} /> // startTime  endTime
        )}
      </FormItem>
    </Col>
  );
};
export const idFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'id'}>
      <FormItem label="任务编号">{getFieldDecorator(EBDic.id)(<Input placeholder="请输入任务编号" />)}</FormItem>
    </Col>
  );
};
export const isExceptionFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isException'}>
      <FormItem label="是否存在异常">
        {getFieldDecorator(EBDic.isException, {
          initialValue: -1,
        })(
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
export const isEmptyFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isEmpty'}>
      <FormItem label="是否有保证金">
        {getFieldDecorator(EBDic.isEmpty, {
          initialValue: -1,
        })(
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
export const isisSelfSelling = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isSelfSelling'}>
      <FormItem label="二次确认私售">
        {getFieldDecorator('secondSoldFlag', {
          initialValue: -1,
        })(
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

export const ptAuditTimeRangeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'ptAuditTimeRange'}>
      <FormItem label="初审日期">{getFieldDecorator('ptAuditTimeRange')(<RangePicker format={dateFormat} />)}</FormItem>
    </Col>
  );
};
export const isContractChangeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isContractChange'}>
      <FormItem label="合同是否变更">
        {getFieldDecorator(EBDic.isContractChange, {
          initialValue: -1,
        })(
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
export const contractTypeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'contractType'}>
      <FormItem label="声明类型">
        {getFieldDecorator(EBDic.contractType, {
          initialValue: -1,
        })(
          <Select placeholder="全部" style={{ width: '100%' }}>
            {EBDic.contractTypeDicList.map(dic => (
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

export const bankAuditTimeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bankAuditTime'}>
      <FormItem label="复审日期">
        {getFieldDecorator('bankAuditTimeRange')(<RangePicker format={dateFormat} />)}
      </FormItem>
    </Col>
  );
};
export const fldSerialNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'fldSerialName'}>
      <FormItem label="品牌名称">
        {getFieldDecorator(EBDic.fldSerialName)(<Input placeholder="请输入品牌名称" />)}
      </FormItem>
    </Col>
  );
};
export const fldSerialName2FormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'fldSerialName'}>
      <FormItem label="品牌名称">{getFieldDecorator('fldserialname')(<Input placeholder="请输入品牌名称" />)}</FormItem>
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
export const isfirstFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isfirst'}>
      <FormItem label="业务类型">
        {getFieldDecorator(EBDic.isfirst, {
          initialValue: -1,
        })(
          <Select placeholder="全部" style={{ width: '100%' }}>
            {EBDic.isfirstDicList.map(dic => (
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
export const exceptionTimeRangeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'exceptionTimeRange'}>
      <FormItem label="异常日期">
        {getFieldDecorator('exceptionTimeRange')(<RangePicker format={dateFormat} />)}
      </FormItem>
    </Col>
  );
};
export const bondSaveDateFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'bondSaveDate'}>
      <FormItem label="存入日期">
        {getFieldDecorator('bondSaveTimeRange')(<RangePicker format={dateFormat} />)}
      </FormItem>
    </Col>
  );
};
export const isExportFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isExport'}>
      <FormItem label="是否导出">
        {getFieldDecorator(EBDic.isExport, {
          initialValue: -1,
        })(
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
export const moneyGetTypeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'moneyGetType'}>
      <FormItem label="保证金收取方式">
        {getFieldDecorator(EBDic.moneyGetType, {
          initialValue: -1,
        })(
          <Select placeholder="全部" style={{ width: '100%' }}>
            {EBDic.moneyGetTypeDicList.map(dic => (
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
export const isChainStoreFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isChainStore'}>
      <FormItem label="是否直营">
        {getFieldDecorator(EBDic.isChainStore, {
          initialValue: -1,
        })(
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
export const isRecievedFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isRecieved'}>
      <FormItem label="签收状态">
        {getFieldDecorator(EBDic.isRecieved, {
          initialValue: -1,
        })(
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
export const expressNumFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'expressNum'}>
      <FormItem label="快递单号">
        {getFieldDecorator(EBDic.expressNum)(<Input placeholder="请输入快递单号" />)}
      </FormItem>
    </Col>
  );
};
export const contractSendTimeRangeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'contractPostTimeRange'}>
      <FormItem label="声明邮寄日期">
        {getFieldDecorator('contractPostTimeRange')(<RangePicker format={dateFormat} />)}
      </FormItem>
    </Col>
  );
};

export const opUserNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'opUserName'}>
      <FormItem label="员工名称">{getFieldDecorator('opUserName')(<Input placeholder="请输入员工名称" />)}</FormItem>
    </Col>
  );
};

export const accidFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'accid'}>
      <FormItem label="登录账号">{getFieldDecorator('accid')(<Input placeholder="请输入登录账号" />)}</FormItem>
    </Col>
  );
};

export const mobileFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'mobile'}>
      <FormItem label="移动电话">{getFieldDecorator('mobile')(<Input placeholder="请输入移动电话" />)}</FormItem>
    </Col>
  );
};

export const enterpriseTypeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'enterpriseType'}>
      <FormItem label="企业类型">
        {getFieldDecorator('departtype', {
          initialValue: null,
        })(
          <Select placeholder="全部" style={{ width: '100%' }}>
            {[
              {
                name: '全部',
                value: null,
              },
              {
                name: '经销商',
                value: 3,
              },
              {
                name: '二网',
                value: 2,
              },
            ].map(dic => (
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

export const carFactoryFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'carFactory'}>
      <FormItem label="汽车厂商名称">
        {getFieldDecorator('carFactory')(<Input placeholder="请输入汽车厂商名称" />)}
      </FormItem>
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
export const beginDateFormItemToday = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'statisDate'}>
      <FormItem label="统计日期">
        {getFieldDecorator('statisDate', {
          initialValue: [moment().subtract(30, 'days'), moment()],
        })(
          <RangePicker
            format={dateFormat}
            allowClear={false}
            ranges={{
              过去三十天: [moment().subtract(30, 'days'), moment()],
              上个月: [
                moment()
                  .subtract(1, 'months')
                  .startOf('month'),
                moment()
                  .subtract(1, 'months')
                  .endOf('month'),
              ],
            }}
          />
        )}
      </FormItem>
    </Col>
  );
};

export const enterpriseNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'enterpriseName'}>
      <FormItem label="企业名称">{getFieldDecorator('departname')(<Input placeholder="请输入企业名称" />)}</FormItem>
    </Col>
  );
};

// 订单管理
export const companyFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'departname'}>
      <FormItem label="公司名称">{getFieldDecorator('departname')(<Input placeholder="请输入公司名称" />)}</FormItem>
    </Col>
  );
};
export const buyUserAccountFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'buyUserAccid'}>
      <FormItem label="账号">{getFieldDecorator('buyUserAccid')(<Input placeholder="请输入账号" />)}</FormItem>
    </Col>
  );
};
export const goodsCodeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'goodsName'}>
      <FormItem label="服务项目">{getFieldDecorator('goodsName')(<Input placeholder="请输入服务项目" />)}</FormItem>
    </Col>
  );
};
export const orderNoFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'orderNo'}>
      <FormItem label="订单编号">{getFieldDecorator('orderNo')(<Input placeholder="请输入订单编号" />)}</FormItem>
    </Col>
  );
};

// 发票管理
export const accIdFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'accid'}>
      <FormItem label="账号">{getFieldDecorator('accid')(<Input placeholder="请输入账号" />)}</FormItem>
    </Col>
  );
};
//统计日期
export const statisticalDateFormItem = getFieldDecorator => {
  return (
    <Col md={9} sm={24} key={'disApplyTimeRange'}>
      <FormItem label="统计日期">
        {getFieldDecorator('disApplyTimeRange', {
          initialValue: [moment().startOf('month'), moment()],
        })(<RangePicker format={dateFormat} disabledDate={current => current && current > moment()} />)}
      </FormItem>
    </Col>
  );
};
//只查看有未完成任务的日期数据
export const checkboxFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'taskFlag'}>
      <FormItem>
        {getFieldDecorator('taskFlag', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>只查看有未完成任务的日期数据</Checkbox>)}
      </FormItem>
    </Col>
  );
};

// 抽查管理
export const dealerFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'dealer'}>
      <FormItem label="经销商名称">{getFieldDecorator('dealer')(<Input placeholder="请输入经销商名称" />)}</FormItem>
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
export const logStartFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'dateRange'}>
      <FormItem label="抽查日期">{getFieldDecorator('dateRange')(<RangePicker format={dateFormat} />)}</FormItem>
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
export const isSellOnCreditFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'isSellOnCredit'}>
      <FormItem label="是否赊销或法人贷">
        {getFieldDecorator('isSellOnCredit', {
          initialValue: '',
        })(
          <Select placeholder="是否赊销或法人贷">
            {[
              {
                name: '全部',
                value: '',
              },
              {
                name: '否',
                value: 0,
              },
              {
                name: '是',
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
export const theMonthFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'theMonth'}>
      <FormItem label="统计月份">
        {getFieldDecorator('theMonth')(
          <MonthPicker
            placeholder={moment().format('YYYYMM')}
            format={'YYYYMM'}
            onChange={value => {
              if (value == null) {
                value = moment();
                console.log(value);
                return value;
              }
            }}
          />
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
          </Select>
        )}
      </FormItem>
    </Col>
  );
};
export const JlNameFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'userName'}>
      <FormItem label="区域经理">{getFieldDecorator('userName')(<Input placeholder="请输入区域经理" />)}</FormItem>
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

// 终端编号
export const clientNoFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'code'}>
      <FormItem label="终端编号">{getFieldDecorator('code')(<Input placeholder="终端编号" />)}</FormItem>
    </Col>
  );
};
// 终端品牌
export const clientBrandFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'brand'}>
      <FormItem label="终端品牌">{getFieldDecorator('brand')(<Input placeholder="请输入终端品牌" />)}</FormItem>
    </Col>
  );
};
// 摄像头编号
export const cameraCodeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'code'}>
      <FormItem label="摄像头编号">{getFieldDecorator('code')(<Input placeholder="摄像头终端编号" />)}</FormItem>
    </Col>
  );
};
// 摄像头品牌
export const cameraBrandFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'brand'}>
      <FormItem label="摄像头品牌">{getFieldDecorator('brand')(<Input placeholder="请输入摄像头品牌" />)}</FormItem>
    </Col>
  );
};
// 二库监控预警发生日期
export const repoWarningDateFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'dateRange'}>
      <FormItem label="发生日期">{getFieldDecorator('dateRange')(<RangePicker format={dateFormat} />)}</FormItem>
    </Col>
  );
};
// 二库监控预警发生日期
export const selfcarTypeFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'carType'}>
      <FormItem label="车辆类型">
        {getFieldDecorator('carType', {
          initialValue: null,
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {selfcarTypeList.map(dic => (
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

// 微店状态
export const microShopStatusFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'status'}>
      <FormItem label="微店状态">
        {getFieldDecorator('status', {
          initialValue: null,
        })(
          <Select placeholder="请选择任务状态">
            {[{ name: '全部', value: null }, { name: '开启', value: 1 }, { name: '关闭', value: 2 }].map(reason => (
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
// 声明接收状态
export const statementSignStatusFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'statementSignStatus'}>
      <FormItem label="声明接收状态">
        {getFieldDecorator('statementSignStatus', {
          initialValue: -1,
        })(
          <Select placeholder="请选择声明接收状态">
            {[
              { name: '全部', value: -1 },
              { name: '未邮寄', value: 0 },
              { name: '已邮寄未签收', value: 1 },
              { name: '已签收', value: 2 },
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
export const spotDescriptionFormItem = getFieldDecorator => {
  return (
    <Col md={6} sm={24} key={'description'}>
      <FormItem label="抽查描述">
        {getFieldDecorator('description', {
          initialValue: null,
        })(
          <Select placeholder="请选择抽查描述">
            {[
              { name: '全部', value: null },
              { name: '日常查车', value: '日常查车' },
              { name: '接车任务', value: '接车任务' },
              { name: '接证任务', value: '接证任务' },
              { name: '盘证任务', value: '盘证任务' },
              { name: '其他', value: '其他' },
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
