import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Input, Radio, Tooltip } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

@Form.create()
class ModalForm extends PureComponent {
  static propTypes = {};
  config = {
    rules: [{ type: 'string', required: true, message: '请输入备注' }, { max: 200, message: '备注不能超过200个字符' }],
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
          {getFieldDecorator('remark', this.config)(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    );
  };
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default ModalForm;
