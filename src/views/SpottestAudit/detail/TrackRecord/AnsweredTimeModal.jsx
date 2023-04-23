import React, { Component } from 'react';
import { httpFormClient } from 'common/axios';
import { Modal, message } from 'antd';
import AnsweredTimeForm from './AnsweredTimeForm';

export default class AnsweredTimeModal extends Component {
  state = {
    loading: false,
  };
  onSubmit = formValue => {
    this.setState({
      loading: true,
    });
    const { isEw, spottestId } = this.props;
    let value = { id: spottestId };
    if (isEw) {
      value = { ...value, ewGetcalltimes: formValue.answeredTime, ewNogetcalltimes: formValue.notAnsweredTime };
    } else {
      value = { ...value, distGetcalltimes: formValue.answeredTime, distNogetcalltimes: formValue.notAnsweredTime };
    }
    return httpFormClient
      .formSubmit(isEw ? 'SpotTestTaskAction_modifyEwCallTimes' : 'SpotTestTaskAction_modifyDisCallTimes', '', value)
      .then(({ data = {} } = {}) => {
        if (data.result === 0) {
          message.success('更新次数成功');
          this.props.hideModal(true);
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        message.error(err.message || err);
      });
  };
  handleOk = () => {
    this.form && this.form.handleSubmit();
  };
  render() {
    const { answeredTime, notAnsweredTime } = this.props;
    return (
      <Modal
        title="次数修改"
        visible
        onOk={this.handleOk}
        onCancel={() => this.props.hideModal()}
        confirmLoading={this.state.loading}
        destroyOnClose
      >
        <AnsweredTimeForm
          {...{ answeredTime, notAnsweredTime }}
          onSubmit={this.onSubmit}
          wrappedComponentRef={form => (this.form = form)}
        />
      </Modal>
    );
  }
}
