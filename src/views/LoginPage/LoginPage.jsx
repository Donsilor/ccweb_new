// import { message } from "antd";
import * as React from 'react';
import { message } from 'antd';
import logo from 'assets/logo-blue.png';
import './index.less';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component<any, any> {
  handleSubmit = data => {
    this.props
      .login(data)
      .then(({ payload } = {}) => {
        // if (payload && payload.data && payload.data.result === 0) {
        //   this.props.history.push('/');
        // }
        this.props.history.push('/');
      })
      .catch(err => {
        message.error('登录失败，请检查网络连接');
      });
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-bg" />
        <div className="login-wrapper">
          <div className="login-box">
            <div className="login-header">
              <a href="/">
                <img src={logo} alt="" />
                <span>北京车车网络技术有限公司</span>
              </a>
            </div>
            <div className="login-content">
              <LoginForm onSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
