import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Input, Radio, Select } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

@Form.create()
class ModalForm extends PureComponent {
  static propTypes = {};
  config = {
    rules: [
      { type: 'string', required: true, message: '请输入反馈描述' },
      { max: 200, message: '反馈描述不能超过200个字符' },
    ],
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
        <FormItem label="沟通方" {...formItemLayout} required>
          {getFieldDecorator('feedBackContact', {
            initialValue: 1,
          })(
            <RadioGroup>
              <Radio value={1}>二网</Radio>
              <Radio value={2}>经销商</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="反馈类型" {...formItemLayout} required>
          {getFieldDecorator('feedBackType', {
            initialValue: 1,
          })(
            <Select placeholder="请选择">
              <Option value={1}>拍不了</Option>
              <Option value={2}>不配合</Option>
              <Option value={3}>联系不上</Option>
              <Option value={4}>不会拍照</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="反馈描述" {...formItemLayout} required>
          {getFieldDecorator('feedBackRemark', this.config)(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    );
  };
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default ModalForm;
