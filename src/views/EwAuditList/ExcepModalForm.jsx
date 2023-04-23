import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

@Form.create()
class ExcepModalForm extends PureComponent {
  static propTypes = {};
  config = {
    rules: [{ required: true, message: '请输入异常描述' }, { max: 200, message: '异常描述不能超过200个字符' }],
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      const formValues = {
        ...fieldsValue,
      };

      this.props.onSubmit(formValues);
    });
  };

  reset = () => {
    this.props.form.resetFields();
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="异常描述" {...formItemLayout}>
          {getFieldDecorator('exceptionRemark', this.config)(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    );
  };
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default ExcepModalForm;
