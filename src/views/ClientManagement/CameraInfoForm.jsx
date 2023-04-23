import React, { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { clientList } from '../../common/constant';

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
    const { record } = this.props;
    this.props.form.validateFields((err, fieldsValue) => {
      fieldsValue.id = record.id;
      if (err) return;
      this.props.onSubmit(fieldsValue);
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
      record,
      path,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 15,
      },
    };

    if (path === '/clientManagement') {
      return (
        <div>
          <Form onSubmit={this.submit}>
            <FormItem label="设备类型" {...formItemLayout}>
              {getFieldDecorator('type', {
                initialValue: 0,
                rules: [
                  {
                    required: true,
                    message: '请选择！',
                  },
                ],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {clientList.map(reason => (
                    <Option value={reason.value} key={reason.value}>
                      {reason.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="终端名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: this.requiredRule,
              })(<Input />)}
            </FormItem>
            <FormItem label="终端品牌" {...formItemLayout}>
              {getFieldDecorator('brand', {
                rules: this.requiredRule,
              })(<Input />)}
            </FormItem>
            <FormItem label="型号" {...formItemLayout}>
              {getFieldDecorator('modelNumber', {
                rules: this.requiredRule,
              })(<Input />)}
            </FormItem>
            <FormItem label="序列号" {...formItemLayout}>
              {getFieldDecorator('serialNumber', {
                rules: this.requiredRule,
              })(<Input />)}
            </FormItem>
          </Form>
        </div>
      );
    } else if (path === '/cameraList') {
      return (
        <div>
          <Form onSubmit={this.submit}>
            <FormItem label="序列号" {...formItemLayout}>
              {getFieldDecorator('serialNumber', {
                rules: this.requiredRule,
                initialValue: record.serialNumber,
              })(<Input />)}
            </FormItem>
            <FormItem label="摄像头品牌" {...formItemLayout}>
              {getFieldDecorator('brand', {
                rules: this.requiredRule,
                initialValue: record.brand,
              })(<Input />)}
            </FormItem>
            <FormItem label="型号" {...formItemLayout}>
              {getFieldDecorator('modelNumber', {
                rules: this.requiredRule,
                initialValue: record.modelNumber,
              })(<Input />)}
            </FormItem>
            <FormItem label="像素" {...formItemLayout}>
              {getFieldDecorator('pixel', {
                initialValue: record.pixel,
              })(<Input />)}
            </FormItem>
            <FormItem label="距离" {...formItemLayout}>
              {getFieldDecorator('distance', {
                initialValue: record.distance,
              })(<Input />)}
            </FormItem>
            <FormItem label="验证码" {...formItemLayout}>
              {getFieldDecorator('code', {
                rules: this.requiredRule,
                initialValue: record.code,
              })(<Input />)}
            </FormItem>
            <FormItem label="access_token" {...formItemLayout}>
              {getFieldDecorator('token', {
                rules: this.requiredRule,
                initialValue: record.token,
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
