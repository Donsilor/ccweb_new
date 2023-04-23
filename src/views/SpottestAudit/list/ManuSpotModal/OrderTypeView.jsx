import React, { Component } from 'react';
import { Form, Button, Icon, Radio, Col, DatePicker } from 'antd';
import moment from 'moment';
import _range from 'lodash/range';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@Form.create()
class OrderTypeView extends Component {
  state = {
    orderType: this.props.record.orderType || null,
    bookTime: this.props.record.bookTime || null,
  };

  onTypeChange = e => {
    if (e && e.target) {
      this.setState(
        {
          orderType: e.target.value,
        },
        this.updateQuery
      );
    }
  };
  onDateChange = date => {
    this.setState(
      {
        bookTime: date,
      },
      this.updateQuery
    );
  };

  updateQuery = () => {
    const { orderType, bookTime } = this.state;
    this.props.onChange(orderType, bookTime);
  };

  disabledTime = date => {
    if (date && date.isSame(moment(), 'day')) {
      return {
        disabledHours: () => _range(0, moment().hour() + 1),
      };
    }
  };
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: '400px' }}>
          <FormItem label="下发方式" key="orderType">
            {getFieldDecorator('orderType', {
              initialValue: this.state.orderType,
              rules: [{ required: true, message: '请选择下发方式' }],
            })(
              <RadioGroup onChange={this.onTypeChange}>
                <Radio value={1}>立即下发</Radio>
                <Radio value={2}>预约下发</Radio>
              </RadioGroup>
            )}
          </FormItem>
          {this.state.orderType === 2 && (
            <FormItem label="下发日期" key="bookTime">
              {getFieldDecorator('bookTime', {
                initialValue: this.state.bookTime,
                rules: [{ required: true, message: '请选择下发日期' }],
              })(
                <DatePicker
                  onChange={this.onDateChange}
                  showTime={{ defaultValue: moment('09:30:00', 'HH:mm:ss') }}
                  format="YYYY-MM-DD HH:mm:ss"
                  showToday={false}
                  disabledDate={current =>
                    current &&
                    current <
                      moment()
                        .subtract(1, 'd')
                        .endOf('day')
                  }
                  disabledTime={this.disabledTime}
                />
              )}
            </FormItem>
          )}
        </Form>
      </div>
    );
  }
}

export default OrderTypeView;
