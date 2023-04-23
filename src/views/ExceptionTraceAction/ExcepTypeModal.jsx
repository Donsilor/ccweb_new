import React, { Component } from 'react';
import { Modal, message } from 'antd';
import ExceptionForm from './ExceptionForm';

export default class ExcepTypeModal extends Component {
  state = {
    loading: false,
  };
  handleOk = () => {
    this.form && this.form.handleSubmit();
  };

  handleCancel = () => {
    this.props.onCancel();
    message.destroy();
  };

  submit = formData => {
    const value = {
      ...formData,
    };
    this.setState({
      loading: true,
    });
    this.props
      .onSubmit(value, this.props.record)
      .then((payload = {}) => {
        if (payload.data && payload.data.result === 0) {
          message.success(payload.data.msg || '操作成功');
          this.setState({
            loading: false,
          });
          this.props.onOk();
        } else {
          return Promise.reject((payload.data && payload.data.msg) || '操作失败，请重试');
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { visible, title, configList, record } = this.props;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={this.state.loading}
        destroyOnClose
        width={700}
      >
        <ExceptionForm
          configList={configList}
          wrappedComponentRef={form => (this.form = form)}
          onSubmit={this.submit}
          record={record}
        />
      </Modal>
    );
  }
}
