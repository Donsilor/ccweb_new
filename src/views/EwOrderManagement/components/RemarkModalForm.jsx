import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

@Form.create()
class RemarkModalForm extends PureComponent {
  requiredRule = [
    {
      type: 'string',
      required: true,
      message: '请输入！',
    },
    { max: 200, message: '备注不能超过200个字符' },
  ];

  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.props.onSubmit(fieldsValue);
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="备注" {...formItemLayout} required>
          {getFieldDecorator('remark', {
            rules: this.requiredRule,
          })(<TextArea rows={4}/>)}
        </FormItem>
      </Form>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default RemarkModalForm;
