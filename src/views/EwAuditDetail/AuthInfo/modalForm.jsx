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
    rules: [
      { type: 'string', required: true, message: '请输入退回原因' },
      { max: 200, message: '退回原因不能超过200个字符' },
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
      disableFirstRedio,
      hideThirdRedio,
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
        {!this.props.finallyAuth && (
          <FormItem label="退回到" {...formItemLayout} required>
            {getFieldDecorator('returnWhere', {
              initialValue: disableFirstRedio ? '2' : '1',
            })(
              <RadioGroup>
                <Tooltip title={disableFirstRedio ? '直营店只能退回到经销商' : ''}>
                  <Radio value="1" disabled={disableFirstRedio}>
                    退回到二网
                  </Radio>
                </Tooltip>
                <Radio value="2">退回到经销商重签</Radio>
                {!hideThirdRedio && <Radio value="3">退回到经销商重新确认</Radio>}
              </RadioGroup>
            )}
          </FormItem>
        )}
        <FormItem label="退回原因" {...formItemLayout} required>
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
