import React, { Component } from 'react';
import { Icon, Tooltip, Modal, Form, InputNumber } from 'antd';

const FormItem = Form.Item;
@Form.create()
class AnsweredTimeForm extends Component {
  handleSubmit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const {
      form: { getFieldDecorator },
      answeredTime,
      notAnsweredTime,
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <FormItem label="打通次数" key="at">
          {getFieldDecorator('answeredTime', {
            initialValue: answeredTime,
            rules: [{ required: true, message: '请填写打通次数' }],
          })(<InputNumber max={100} min={0} style={{ width: '50%' }} />)}
        </FormItem>
        <FormItem label="未打通次数" key="nat">
          {getFieldDecorator('notAnsweredTime', {
            initialValue: notAnsweredTime,
            rules: [{ required: true, message: '请填写未打通次数' }],
          })(<InputNumber max={100} min={0} style={{ width: '50%' }} />)}
        </FormItem>
      </Form>
    );
  }
}

export default AnsweredTimeForm;
