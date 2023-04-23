import React, { Fragment } from 'react';
import { message, Button } from 'antd';
import md5 from 'md5';
import ModalForm from 'components/ModalForm';

export default class ExtCallWrapper extends React.Component {
  state = {
    showModal: false,
  };
  _onClick = () => {
    if (!this.props.data) {
      return;
    }
    const storage = window.parent.localStorage;
    const ccSecret = storage.getItem('cc-secret');
    if (ccSecret) {
      const hide = message.loading('呼叫中...', 0);
      setTimeout(hide, 3000);
      this.call(this.props.data, md5(ccSecret));
    } else {
      this.setState({ showModal: true });
    }
  };

  call = (phone, secret) => {
    console.log(phone, secret);
    window.parent && window.parent.extCall && window.parent.extCall(phone, secret);
  };

  onCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  onSubmit = formData => {
    const { value } = formData;
    const storage = window.parent.localStorage;
    storage.setItem('cc-secret', value);
    this.call(this.props.data, md5(value));
    return Promise.resolve({ data: { result: 0 } });
  };

  render() {
    return (
      <Fragment>
        <span>{this.props.data}</span>
        <Button type="link" icon="phone" onClick={this._onClick} />
        {this.state.showModal && (
          <ModalForm
            title="输入您的账号密钥"
            onOk={this.onCancel}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
            configList={[
              {
                label: '账号密钥',
                type: 'input',
                key: 'value',
                required: true,
                rules: [
                  {
                    required: true,
                    message: '请输入您的账号密钥！',
                  },
                ],
              },
            ]}
          />
        )}
      </Fragment>
    );
  }
}
