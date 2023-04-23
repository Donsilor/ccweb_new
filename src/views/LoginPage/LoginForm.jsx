import { Button, Col, Form, Icon, Input, Row } from 'antd';
import * as React from 'react';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component<any, any> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('accid', {
            initialValue: '',
            rules: [{ required: true, message: '请输入用户名' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('accpwd', {
            initialValue: '',
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={<Icon type="eye" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
        <div style={{ textAlign: 'center' }}>
          <a href="" className="login-reset-password">
            找回密码
          </a>
        </div>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);
