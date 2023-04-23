import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Input, Radio, Select } from 'antd';
import EBDic from 'common/constant';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

@Form.create()
class ModalForm extends PureComponent {
  static propTypes = {};
  config = {
    rules: [
      { type: 'string', required: true, message: '请输入解决说明' },
      { max: 200, message: '解决说明不能超过200个字符' },
    ],
  };
  selectConfig = {
    rules: [{ type: 'number', required: true, message: '请选择解决方式' }],
  };
  componentDidUpdate(prevProps) {
    const { record } = this.props;
    if (record.id !== prevProps.record.id) {
      record &&
        this.props.form.setFieldsValue({
          excReason: record.excReason || '',
          solveSolutions: record.solveSolutions || '',
          solveDescription: record.solveDescription || '',
        });
    }
  }
  componentDidMount() {
    const { record } = this.props;
    record &&
      this.props.form.setFields({
        excReason: { value: record.excReason || '' },
        solveSolutions: { value: record.solveSolutions || '' },
        solveDescription: { value: record.solveDescription || '' },
      });
  }
  handleSubmit = () => {
    const { record } = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      const formValues = {
        exceptionId: record.id,
        exceptionSolveSolutions: fieldsValue.solveSolutions,
        exceptionSolveRemark: fieldsValue.solveDescription,
      };

      this.props.onSubmit(formValues);
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      record,
      readOnly,
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
        <FormItem label="异常原因" {...formItemLayout}>
          {getFieldDecorator('excReason')(<TextArea rows={4} disabled />)}
        </FormItem>
        <FormItem label="解决方式" {...formItemLayout} required>
          {getFieldDecorator('solveSolutions', this.selectConfig)(
            <Select placeholder="请选择解决方式" style={{ width: '100%' }} disabled={readOnly}>
              {EBDic.solveSolutionsDicList.slice(2).map(dic => (
                <Option value={dic.value} key={dic.value}>
                  {dic.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="解决说明" {...formItemLayout} required>
          {getFieldDecorator('solveDescription', this.config)(<TextArea rows={4} disabled={readOnly} />)}
        </FormItem>
      </Form>
    );
  };
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default ModalForm;
