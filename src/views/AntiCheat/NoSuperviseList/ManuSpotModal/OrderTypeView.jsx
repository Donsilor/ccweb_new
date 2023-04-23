import React, { Component } from 'react';
import { Form, DatePicker } from 'antd';
import moment from 'moment';
import _range from 'lodash/range';
const FormItem = Form.Item;
@Form.create()
class OrderTypeView extends Component {
  state = {
    bookTime: this.props.record.bookTime || null,
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
    const { bookTime } = this.state;
    this.props.onChange(bookTime);
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
          <FormItem label="下发时间" key="bookTime">
            {getFieldDecorator('bookTime', {
              initialValue: this.state.bookTime,
              rules: [{ required: true, message: '请选择下发时间' }],
            })(
              <DatePicker
                onChange={this.onDateChange}
                showTime={true}
                format="YYYY-MM-DD HH:mm:ss"
                showToday={false}
                disabledDate={current =>
                  current &&
                  current < moment().subtract(1, 'd').endOf('day') || current > moment().subtract(-1, 'd').endOf('day')
                }
                disabledTime={this.disabledTime}
              />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default OrderTypeView;
