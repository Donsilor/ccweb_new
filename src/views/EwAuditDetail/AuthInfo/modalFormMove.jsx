import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

@Form.create()
class ModalFormMove extends PureComponent {
  config = isMoveNum => ({
    rules: [
      { required: true, message: isMoveNum ? '请输入移动台数' : '请输入移动额度' },
      {
        pattern: isMoveNum ? /^\d{1,3}$/ : /^\d{1,3}(\.\d{0,2})?$/,
        message: isMoveNum ? '移动台数最多为999台' : '移动额度最大为999.99万元，最多精确两位小数',
      },
    ],
  });
  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      const formValues = {
        ...fieldsValue,
      };

      formValues && this.props.onSubmit(formValues);
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      eb: { moveNum, moveMoney, movecontrol },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const isMoveNum = movecontrol == '22';
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={isMoveNum ? '原移动台数' : '原移动额度（万元）'} {...formItemLayout}>
          {getFieldDecorator('oldMoveNum', {
            initialValue: isMoveNum ? moveNum : moveMoney,
          })(<Input disabled />)}
        </FormItem>
        <FormItem label={isMoveNum ? '新移动台数' : '新移动额度（万元）'} {...formItemLayout} required>
          {getFieldDecorator('newMoveNum', this.config(isMoveNum))(<Input type="number" />)}
        </FormItem>
      </Form>
    );
  };
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default ModalFormMove;
