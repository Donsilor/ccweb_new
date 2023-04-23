import React, { PureComponent } from 'react';
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

@Form.create()
class RefundForm extends PureComponent {
  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.props.onSubmit(fieldsValue);
    });
  };

  amountValidator = (rule, value, callback) => {
    if (Number(value) > Number(this.props.max) || Number(value) < 0) {
      callback('退款金额不能大于订单金额 !');
    }
    callback();
  };

  requiredRule = [
    {
      required: true,
      message: '请输入！',
    },
    {
      validator: this.amountValidator,
    },
  ];
  requiredDate = [
    {
      required: true,
      message: '请输入！',
    }
  ];

  renderForm = () => {
    const today = new Date();
    const {
      max,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="退款金额：" wrapperCol={{ span: 10 }}> 
          {getFieldDecorator('refundAmount', {
            rules: this.requiredRule,
          })(<Input type="number" addonAfter={<span>元</span>} />)}       
        </Form.Item>
        <Form.Item label="订单实际结束时间：" wrapperCol={{ span: 12}}>
          {getFieldDecorator('endDate', {
            rules: this.requiredDate,
            initialValue:moment()
          })(<DatePicker showTime />)}         
        </Form.Item>            
      </Form>   
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default RefundForm;
