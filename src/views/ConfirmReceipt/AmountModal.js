import React, { PureComponent } from 'react';
import { Form, Input, Icon, Button, DatePicker, message, InputNumber } from 'antd';
import { httpFormClient } from 'common/axios';
import styles from './style.module.less';
import moment from 'moment';
import BigNumber from 'bignumber.js';
let id = 0;
@Form.create()
class AmountModal extends PureComponent {
  state = {
    isformInItems: false,
    infoMes: false,
    balance: '',
  };
  handleSubmit = () => {
    const { record } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      const { keys, oddNumS, oddAmoutS, interestEndDate } = values;
      if (keys) {
        let outJsonList = [],
          oddAmoutTotal = 0,
          depositTotal = new BigNumber(Math.abs(record.depositTotal))
            .multipliedBy(10000)
            .toFormat()
            .replace(/,/g, '');
        keys.some((item, i) => {
          outJsonList.push({
            oddNum: keys.map(key => oddNumS[key])[i],
            oddAmout: keys.map(key => oddAmoutS[key])[i],
            interestEndDate: keys.map(key => interestEndDate[key])[i].format('YYYY-MM-DD'),
          });
          oddAmoutTotal += keys.map(key => oddAmoutS[key])[i];
        });
        values.outJsonList = JSON.stringify(outJsonList);
        if (oddAmoutTotal < parseFloat(depositTotal)) {
          message.info('单号金额不足以抵扣转出金额，请添加单号！');
          return;
        }
        if (this.state.isformInItems) {
          values.inJsonList = JSON.stringify([
            {
              oddNum: values.oddNum,
              oddAmout: values.oddAmout,
              interestStartDate: values.interestStartDate.format('YYYY-MM-DD'),
            },
          ]);
        }
      }
      this.props.onSubmit(values);
    });
  };
  componentDidMount() {
    id = 0;
    const { exportType } = this.props.record;
    exportType == 5 && this.add();
  }
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  renderOutForm = () => {
    const {
      form: { getFieldDecorator, getFieldValue },
      record,
    } = this.props;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      let self = this;
      return (
        <div className={styles.amountModal} key={k}>
          <Form.Item label={index === 0 ? '维护单号' : ''}>
            {getFieldDecorator(`oddNumS[${k}]`, {
              rules: [
                {
                  required: true,
                  message: '请输入单号',
                },
                {
                  pattern: /^\d{6}$/,
                  message: '单号应为6位数字',
                },
              ],
            })(
              <Input
                placeholder="请输入单号"
                style={{ width: '100%' }}
                maxLength={6}
                onChange={e => {
                  e.target.value.length == 6 &&
                    httpFormClient
                      .formSubmit('/BondPrintAction_getOddAmout', '', { id: record.id, oddNum: e.target.value })
                      .then(({ data = {} }) => {
                        if (data.result === 0) {
                          self.props.form.setFieldsValue({ [`balance[${k}]`]: data.oddAmout });
                        } else {
                          self.props.form.setFieldsValue({ [`balance[${k}]`]: 0 });
                          message.error(data.msg);
                        }
                      });
                }}
              />
            )}
          </Form.Item>
          <Form.Item label={index === 0 ? '单号余额(元)' : ''}>
            {getFieldDecorator(`balance[${k}]`)(<Input disabled={true} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label={index === 0 ? '转出金额(元)' : ''}>
            {getFieldDecorator(`oddAmoutS[${k}]`, {
              rules: [
                (rule, value, callback) => {
                  let balance = self.props.form.getFieldValue(`balance[${k}]`);
                  if (!value) {
                    callback('请输入转出金额');
                    return;
                  } else if (value < 0) {
                    callback('金额不能为负数');
                    return;
                  } else if (balance < value) {
                    callback('转出金额不能大于单号余额');
                    return;
                  }
                  callback();
                },
              ],
            })(<InputNumber placeholder="请输入转出金额" style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label={index === 0 ? '计息截止日期' : ''}>
            {getFieldDecorator(`interestEndDate[${k}]`, {
              initialValue: moment(record.exportTime.time),
              rules: [
                {
                  required: true,
                  message: '请输入计息截止日期',
                },
              ],
            })(
              <DatePicker
                disabledDate={current =>
                  current &&
                  current.format('YYYY') <
                  moment()
                    .add(-1, 'y')
                    .format('YYYY')
                }
                placeholder="请输入截止日期"
                style={{ width: '100%' }}
              />
            )}
            {keys.length > 1 ? (
              <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} />
            ) : null}
          </Form.Item>
        </div>
      );
    });
    const formInItems = this.state.isformInItems && (
      <div>
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>转入</h3>
        <span style={{ color: 'red' }}>注意：转出单号为定期，且剩余金额>=10000元的，无需在此维护！</span>
        <Form.Item label={'维护单号'}>
          {getFieldDecorator(`oddNum`, {
            rules: [
              {
                required: true,
                message: '请输入单号',
              },
            ],
          })(<Input placeholder="请输入单号" style={{ width: '400px' }} />)}
        </Form.Item>
        <Form.Item label={'转入金额(元)'}>
          {getFieldDecorator(`oddAmout`, {
            rules: [
              (rule, value, callback) => {
                if (!value) {
                  callback('请输入转入金额');
                  return;
                } else if (value < 0) {
                  callback('金额不能为负数');
                  return;
                }
                callback();
              },
            ],
          })(<InputNumber placeholder="请输入转入金额" style={{ width: '400px' }} />)}
        </Form.Item>
        <Form.Item label="计息开始日期">
          {getFieldDecorator(`interestStartDate`, {
            initialValue: moment(record.exportTime.time),
            rules: [
              {
                required: true,
                message: '请输入开始计息日期',
              },
            ],
          })(<DatePicker placeholder="请输入开始计息日期" style={{ width: '400px' }} />)}
        </Form.Item>
      </div>
    );
    return (
      <Form onSubmit={this.handleSubmit} layout={'vertical'}>
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
          转出
          <span style={{ fontSize: '14px' }}>
            (共需转出：{new BigNumber(Math.abs(record.depositTotal)).multipliedBy(10000).toFormat()}元)
          </span>
        </h3>
        {formItems}
        <Form.Item>
          <Button style={{ marginRight: '10px' }} type="dashed" onClick={this.add}>
            <Icon type="plus" /> 添加单号
          </Button>
          <br />
          <br />
          {this.state.isformInItems ? (
            <Button type="dashed" onClick={() => this.setState({ isformInItems: false })}>
              <Icon type="minus" /> 移除转入
            </Button>
          ) : (
            <Button type="dashed" onClick={() => this.setState({ isformInItems: true })}>
              <Icon type="plus" /> 添加转入
            </Button>
          )}
        </Form.Item>
        {formInItems}
      </Form>
    );
  };
  renderInForm = () => {
    const {
      form: { getFieldDecorator },
      record,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} layout={'horizontal'}>
        <Form.Item label="单号类型">
          <Input disabled={true} placeholder={record.exportType < 3 ? '定期' : '活期'} />
        </Form.Item>
        <Form.Item label="保证金金额(元)">
          <Input disabled={true} placeholder={record.depositTotalLable} />
        </Form.Item>
        <Form.Item label="维护单号">
          {getFieldDecorator('oddNum', {
            rules: [
              {
                required: true,
                message: '请输入单号',
              },
              {
                pattern: /^\d{6}$/,
                message: '单号应为6位数字',
              },
            ],
          })(<Input placeholder="请输入单号" />)}
        </Form.Item>
        <Form.Item label="计息开始日期">
          {getFieldDecorator(`interestStartDate`, {
            initialValue: moment(record.exportTime.time),
            rules: [
              {
                required: true,
                message: '请输入开始计息日期',
              },
            ],
          })(<DatePicker placeholder="请输入开始计息日期" style={{ width: '100%' }} />)}
        </Form.Item>
      </Form>
    );
  };
  render() {
    return <div>{this.props.record.exportType == 5 ? this.renderOutForm() : this.renderInForm()}</div>;
  }
}

export default AmountModal;
