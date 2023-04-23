import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

@Form.create()
class ModalForm extends PureComponent {
  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.props.onSubmit(fieldsValue);
    });
  };

  amountValidator = (rule, value, callback) => {
    console.log(value);
    if (Number(value) > Number(this.props.max) || Number(value) < 0) {
      callback('开票金额不能大于订单金额 ！');
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

  renderForm = () => {
    const {
      max,
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 10,
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="订单金额" {...formItemLayout}>
          <span className="ant-form-text">{max}元</span>
        </FormItem>
        <FormItem label="实际产生金额" {...formItemLayout} required>
          {getFieldDecorator('amount', {
            rules: this.requiredRule,
          })(<Input type="number" addonAfter={<span>元</span>} />)}
        </FormItem>
      </Form>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default ModalForm;
