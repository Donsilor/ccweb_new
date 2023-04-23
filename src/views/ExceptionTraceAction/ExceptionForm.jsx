import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio, DatePicker, Tooltip, Select, message, Col, Icon, InputNumber } from 'antd';
import { excepResionList, unShootTypeList } from 'common/constant';
import { httpFormClient } from 'common/axios';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RangePicker = DatePicker.RangePicker;
@Form.create()
class ExceptionForm extends Component {
  static defaultProps = {
    configList: [],
  };
  static propTypes = {
    configList: PropTypes.array.isRequired,
  };
  state = {
    ifShowAppointmentTime: false,
    ewList: [],
    ewListForCarShow: [],
  };

  componentDidMount = () => {
    if (
      this.props.configList.some(item => item === 'moveInEw') &&
      (this.props.record.bankExcReseaon === 2 || this.props.record.bankExcReseaon === 5)
    ) {
      // 发起查询
      this.props.record.carId &&
        httpFormClient
          .formSubmit(
            '/MoveCarAppAction_sureMoveEw',
            '',
            {
              carId: this.props.record.carId,
            },
            { current: 1, pageSize: 100, total: 100 }
          )
          .then(({ data = {} }) => {
            if (data.result == 0) {
              this.setState({
                ewList: data.list,
              });
            } else {
              return Promise.reject(data.msg || '获取二网列表失败');
            }
          })
          .catch(err => {
            message.error(err.message || err, 0);
          });
    }
    if (this.props.configList.some(item => item === 'exhibitor') && this.props.record.carId) {
      const { carId } = this.props.record;
      httpFormClient
        .formSubmit('/ExceptionTraceAction_getEwList', '', { carId })
        .then(({ data = {} }) => {
          if (data.result === 0) {
            const ewList = data.ewList;
            this.setState({
              ewListForCarShow: ewList,
            });
          } else {
            return Promise.reject(data.msg || '数据异常，获取车展相关二网数据失败');
          }
        })
        .catch(err => {
          message.error(err.message || err);
          this.setState({
            ewListForCarShow: [],
          });
        });
    }
  };

  handleSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        if (this.props.configList.some(item => item === 'exhibitor')) {
          try {
            const exhibitor = values.exhibitor;
            if (exhibitor && exhibitor != 3) {
              const ew = this.state.ewListForCarShow.find(item => item.ewId === exhibitor);
              values = {
                ...values,
                ewId: ew.ewId,
                ewName: ew.ewName,
                exhibitor: 2,
              };
            }
          } catch (error) { }
        }
        this.props.onSubmit(values);
      }
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      configList,
      record,
    } = this.props;
    const { ewListForCarShow } = this.state;
    const carShowSelectOpt = [
      { groupName: '主店', list: [{ name: `主店（经销商）`, value: '3' }] },
      {
        groupName: '二网',
        list: ewListForCarShow.map(item => ({
          name: item.ewName,
          value: item.ewId,
        })),
      },
    ];
    return configList.map((config, index) => {
      if (typeof config === 'object') {
        if (typeof config.render === 'function') {
          return (
            <FormItem label={config.label} key={config.key}>
              {getFieldDecorator(config.key)(config.render(record))}
            </FormItem>
          );
        } else if (config.key) {
          return (
            <FormItem label={config.label} key={config.key}>
              {getFieldDecorator(config.key)(<span>{record[config.key]}</span>)}
            </FormItem>
          );
        } else {
          return (
            <p key="tips">
              <Icon type="info-circle" style={{ marginRight: '10px' }} />
              <span key="tips">{config.label}</span>
            </p>
          );
        }
      } else if (config === 'bookTime2') {
        return (
          <FormItem label="下发时间" key={index}>
            {getFieldDecorator('bookTime2', {
              initialValue: 'now',
            })(
              <Radio.Group>
                <Radio value="now">立即下发</Radio>
                <Radio value="nextDay">次日9:30</Radio>
              </Radio.Group>
            )}
          </FormItem>
        );
      } else if (config === 'bookTime') {
        return (
          <FormItem label="下发时间" key={index}>
            {getFieldDecorator('bookTime', {
              initialValue: 'now',
            })(
              <Radio.Group
                onChange={e => {
                  if (e.target.value === 'appointmenttime') {
                    this.setState({
                      ifShowAppointmentTime: true,
                    });
                  } else {
                    this.setState({
                      ifShowAppointmentTime: false,
                    });
                  }
                }}
              >
                <Radio value="now">立即下发</Radio>
                <Radio value="appointmenttime">预约时间</Radio>
              </Radio.Group>
            )}
          </FormItem>
        );
      } else if (config === 'appointmentTime' && this.state.ifShowAppointmentTime) {
        return (
          <FormItem label="预约时间" key={index}>
            {getFieldDecorator('appointmentTime', {
              rules: [{ required: true, message: '请选择预约时间' }],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </FormItem>
        );
      } else if (config === 'payDateTime') {
        return (
          <FormItem label="还款时间" key={index}>
            {getFieldDecorator('payDateTime', {
              rules: [{ required: true, message: '请选择还款时间' }],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </FormItem>
        );
      } else if (config === 'repayStatus') {
        return (
          <FormItem label="还款情况" key={index}>
            {getFieldDecorator('repayType', { rules: [{ required: true, message: '请选择还款情况' }] })(
              <Radio.Group>
                <Radio value="0">确认还款</Radio>
                <Radio value="1">超时确认还款</Radio>
              </Radio.Group>
            )}
          </FormItem>
        );
      } else if (config === 'exhibitor') {
        return (
          <FormItem label="参展方" key={index}>
            {getFieldDecorator('exhibitor', {
              rules: [{ required: true, message: '请选择参展方' }],
            })(
              <Select
                showSearch
                filterOption={(input, option) => String(option.props.children).includes(input.toLowerCase())}
              >
                {carShowSelectOpt.map(optionGroup => (
                  <OptGroup label={optionGroup.groupName} key={optionGroup.groupName}>
                    {optionGroup.list.map(option => (
                      <Option value={option.value} key={option.value}>
                        {option.name}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            )}
          </FormItem>
        );
      } else if (config === 'unshootType') {
        return (
          <FormItem label="违规记录" key={index}>
            {getFieldDecorator('unshootType', {
              initialValue: 10,
            })(
              <Radio.Group>
                <Radio value={10}>不记录违规</Radio>
                <Radio value={11}>异常超时</Radio>
                <Radio value={12}>严重超时</Radio>
              </Radio.Group>
            )}
          </FormItem>
        );
      } else if (config === 'rangePicker') {
        return (
          <FormItem label="车展起止日期" key={index}>
            {getFieldDecorator('rangePicker', {
              rules: [
                { required: true, message: '请选择车展起止日期' },
                {
                  validator: (rule, value, callback) => {
                    if (value && value[0] >= moment().endOf('day')) {
                      callback('车展开始时间不能晚于今天!');
                    }
                    callback();
                  },
                },
              ],
            })(<RangePicker />)}
          </FormItem>
        );
      } else if (config === 'bankExcReseaon') {
        return (
          <FormItem label="更改异常类型" key={index}>
            {getFieldDecorator('bankExcReseaon', { rules: [{ required: true, message: '请选择更改异常类型' }] })(
              <Select>
                {excepResionList
                  .filter(item =>
                    record.spotTestType === 5 || record.spotTestType === 6
                      ? [3, 5, 12].includes(item.value)
                      : [1, 2, 3, 5, 11, 12].includes(item.value)
                  )
                  .filter(item => item.value !== record.bankExcReseaon)
                  .map(reason => (
                    <Option value={reason.value} key={reason.value}>
                      {reason.name}
                    </Option>
                  ))}
              </Select>
            )}
          </FormItem>
        );
      } else if (config === 'moveInEw') {
        if (this.props.record.bankExcReseaon === 1) {
          return (
            <FormItem label="移入位置" key={index}>
              {getFieldDecorator('moveInEw')(<span>{record.distributorName}</span>)}
            </FormItem>
          );
        }
        return (
          <FormItem label="移入位置" key={index}>
            {getFieldDecorator('moveInEw', {
              rules: [
                {
                  required: true,
                  message: '请选择移入位置',
                },
              ],
            })(
              <Select
                disabled={this.state.ewList.length === 0}
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
              >
                {this.state.ewList.map(ew => (
                  <Option value={ew.ew_id} key={ew.ew_id}>
                    {ew.ew_name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        );
      } else if (config === 'deferNum') {
        return (
          <FormItem label="延长处理时间" key={index}>
            {getFieldDecorator('deferNum', {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (!value || value <= 0) {
                      callback('请输入延长处理天数为正整数！');
                    }
                    // if (value <= record.deferNum) {
                    //   callback('延长时间必须大于现在延长处理天数');
                    // }
                    callback();
                  },
                },
              ],
              initialValue: record.deferNum,
            })(<InputNumber min={record.deferNum} formatter={value => `${Number.parseInt(value)}`} type="number" />)}
            <span>  天</span>
          </FormItem>
        );
      } else if (config === 'unShootType') {
        return (
          <FormItem label="关闭原因" key={index}>
            {getFieldDecorator('unshootType', {
              rules: [{ required: true, message: '请选择关闭原因' }],
            })(
              <Select>
                {unShootTypeList.map(reason => (
                  <Option value={reason.value} key={reason.value}>
                    {reason.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        );
      } else if (config === 'remark') {
        return (
          <FormItem label="备注" key={index}>
            {getFieldDecorator('remark')(<TextArea row={3} />)}
          </FormItem>
        );
      } else if (config === 'remark-required') {
        return (
          <FormItem label="备注" key={index}>
            {getFieldDecorator('remark', {
              rules: [{ required: true, message: '请填写备注' }],
            })(<TextArea row={3} />)}
          </FormItem>
        );
      } else if (config === 'showName') {
        return (
          <FormItem label="车展名称" key={index}>
            {getFieldDecorator('showName', {
              rules: [{ required: true, message: '请输入车展名称' }],
            })(<Input placeholder="请输入车展名称" />)}
          </FormItem>
        );
      } else if (config === 'showAddress') {
        return (
          <FormItem label="车展地址" key={index}>
            {getFieldDecorator('showAddress', {
              rules: [{ required: true, message: '请输入车展地址' }],
            })(<Input placeholder="请输入车展地址" />)}
          </FormItem>
        );
      } else {
        return null;
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        {this.renderForm()}
      </Form>
    );
  }
}

export default ExceptionForm;
