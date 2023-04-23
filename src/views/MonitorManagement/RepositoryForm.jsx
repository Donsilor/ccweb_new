import React, { PureComponent } from 'react';
import { Form, Icon, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import styles from './style.module.less';

@Form.create()
class RepositoryForm extends PureComponent {
  state = {};

  requiredRule = [
    {
      required: true,
      message: '请输入！',
    },
  ];

  submit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      const { record } = this.props;

      fieldsValue.id = record.id;
      fieldsValue.oldNumber = record.realCarNum;
      this.props.onSubmit(fieldsValue);
    });
  };

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
      <div>
        <Form onSubmit={this.submit}>
          <FormItem label="二库名称" {...formItemLayout}>
            {getFieldDecorator('whareHouseName', {
              rules: this.requiredRule,
              initialValue: record.whareHouseName,
            })(<Input />)}
          </FormItem>
          <FormItem label="库存车实际数量" {...formItemLayout}>
            {getFieldDecorator('newNumber', {
              rules: this.requiredRule,
              initialValue: record.realCarNum,
            })(<Input />)}
          </FormItem>
          <FormItem label="说明" {...formItemLayout}>
            {getFieldDecorator('remark', {
              rules: this.requiredRule,
            })(<Input />)}
          </FormItem>
        </Form>
        <div>
          <Icon type="info-circle" theme="twoTone" twoToneColor="#eb2f96" />
          <span className={`${styles.warning}`}>修改库存车实际数量将自动解除相关预警信息</span>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default RepositoryForm;
