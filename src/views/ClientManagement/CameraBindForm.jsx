import React, { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { BIND_TYPE_CLIENT, BIND_TYPE_DEALER } from './CameraList';

const { Option } = Select;

@Form.create()
class CameraInfoForm extends PureComponent {
  static defaultProps = {
    path: '',
  };

  requiredRule = [
    {
      required: true,
      message: '请输入！',
    },
  ];

  submit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.props.onSubmit(fieldsValue);
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      record,
      type,
      optionList,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 15,
      },
    };

    console.log(record);

    if (type === BIND_TYPE_CLIENT) {
      return (
        <div>
          <Form onSubmit={this.submit}>
            <FormItem label="终端编号" {...formItemLayout}>
              {getFieldDecorator('endPointId', {
                initialValue: record.endPointVO.id,
                rules: [
                  {
                    required: true,
                    message: '请选择！',
                  },
                ],
              })(
                <Select
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  showSearch
                  filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                  {optionList.map(reason => (
                    <Option value={reason.value} key={reason.value}>
                      {reason.label}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Form>
        </div>
      );
    } else if (type === BIND_TYPE_DEALER) {
      return (
        <div>
          <Form onSubmit={this.submit}>
            <FormItem label="经销商名称" {...formItemLayout}>
              {getFieldDecorator('distributorId', {
                initialValue: record.whareHouseVO.distributorId,
                rules: [
                  {
                    required: true,
                    message: '请选择！',
                  },
                ],
              })(
                <Select
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  showSearch
                  filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                  {optionList.map(reason => (
                    <Option value={reason.value} key={reason.value}>
                      {reason.label}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="二库名称" {...formItemLayout}>
              {getFieldDecorator('whareHouseName', {
                initialValue: record.whareHouseVO.whareHouseName,
                rules: this.requiredRule,
              })(<Input />)}
            </FormItem>
          </Form>
        </div>
      );
    }

    return null;
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

export default CameraInfoForm;
