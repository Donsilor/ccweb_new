import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const TextArea = Input.TextArea;
@Form.create()
class RemoveWarningForm extends PureComponent {
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
      fieldsValue.whareHouseId = record.whareHouseId;
      fieldsValue.oldNumber = record.recognitionCarNum;
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
          <FormItem label="库存车识别数量" {...formItemLayout}>
            <span>{record.recognitionCarNum}</span>
          </FormItem>
          <FormItem label="库存车实际数量" {...formItemLayout}>
            {getFieldDecorator('newNumber', {
              rules: this.requiredRule,
            })(<Input />)}
          </FormItem>
          <FormItem label="解除备注" {...formItemLayout}>
            {getFieldDecorator('remark', {
              rules: this.requiredRule,
            })(<TextArea row={3} />)}
          </FormItem>
        </Form>
      </div>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default RemoveWarningForm;
