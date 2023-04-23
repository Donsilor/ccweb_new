import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

@Form.create()
class AccountInfoForm extends PureComponent {
  pointsAccountRules = [
    {
      required: true,
      message: '请输入分账号',
    },
    {
      pattern: /^\d{6}$/,
      message: '分账号应为6位数字',
    },
  ];

  commonRules = [
    {
      pattern: /^\d{14}$/,
      message: '该账号应为14位数字',
    },
  ];

  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.props.onSubmit(fieldsValue);
    });
  };

  componentDidMount() {
    const { bondAccount, pointsAccount, settlementAccount, remittanceAccount } = this.props.record;
    this.props.form.setFields({
      bondAccount: { value: bondAccount },
      pointsAccount: { value: pointsAccount },
      settlementAccount: { value: settlementAccount },
      remittanceAccount: { value: remittanceAccount },
    });
  }

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      record,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 15,
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="经销商名称" {...formItemLayout}>
          <span>{record.distributorName}</span>
        </FormItem>
        <FormItem label="品牌名称" {...formItemLayout}>
          <span>{record.brandName}</span>
        </FormItem>
        <FormItem label="保证金账号" {...formItemLayout}>
          {getFieldDecorator('bondAccount', {
            validateFirst: true,
            rules: [
              {
                required: true,
                message: '请输入保证金账号',
              },
              ...this.commonRules,
            ],
          })(<Input maxlength="14" />)}
        </FormItem>
        <FormItem label="分账号" {...formItemLayout}>
          {getFieldDecorator('pointsAccount', {
            rules: this.props.pointsAccountRequired ? this.pointsAccountRules : this.pointsAccountRules.slice(1),
          })(<Input maxlength="6" />)}
        </FormItem>
        <FormItem label="结算账号" {...formItemLayout}>
          {getFieldDecorator('settlementAccount', {
            rules: this.commonRules,
          })(<Input maxlength="14" />)}
        </FormItem>
        <FormItem label="应解汇款账号" {...formItemLayout}>
          {getFieldDecorator('remittanceAccount', {
            rules: this.commonRules,
          })(<Input maxlength="14" />)}
        </FormItem>
      </Form>
    );
  };
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default AccountInfoForm;
