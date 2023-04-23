import React, { Component } from 'react';
import ModalForm from 'components/ModalForm';
import { httpFormClient } from 'common/axios';
export default class ResetPDModalForm extends Component {
  onSubmit = formData => {
    const { record } = this.props;
    return httpFormClient
      .formSubmit('/UserAction_resetPassward', 'user', { id: record.id, accpwd: formData.accpwd })
      .then(({ data = {} }) => {
        if (data.flag === 1) {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: data.msg || '操作失败，请重试',
            },
          });
        }
      });
  };
  render() {
    const { onOk, onCancel } = this.props;
    return (
      <ModalForm
        title="密码重置"
        onOk={onOk}
        onCancel={onCancel}
        onSubmit={this.onSubmit}
        configList={[
          {
            label: '更改密码',
            type: 'input',
            key: 'accpwd',
            required: true,
          },
          {
            label: '确认密码',
            type: 'input',
            key: 'confirmAccpwd',
            required: true,
            rules: [
              {
                required: true,
                message: '请再次输入密码！',
              },
              {
                validator: function(rule, value, callback) {
                  const form = this.props.form;
                  if (value && value !== form.getFieldValue('accpwd')) {
                    callback('两次密码输入不一致!');
                  } else {
                    callback();
                  }
                },
              },
            ],
          },
        ]}
      />
    );
  }
}
