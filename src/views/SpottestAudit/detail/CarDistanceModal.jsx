import React, { Component } from 'react';
import { Spin, message, Table, Modal, Button } from 'antd';
import { httpFormClient } from 'common/axios';

export default class CarDistanceModal extends Component {
  state = {
    loading: true,
    saveLoading: false,
    list: [],
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { id } = this.props;
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_remeasureDistance', '', { detailId: id })
      .then(({ data } = {}) => {
        if (data.result === 0) {
          this.setState({
            list: data.distanceList,
            loading: false,
          });
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          loading: false,
        });
      });
  };
  handleUpdate = () => {
    const { list } = this.state;
    const distance = JSON.stringify(list);
    const { id } = this.props;
    this.setState({
      saveLoading: true,
    });
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_updateDistance', '', { detailId: id, distance })
      .then(({ data } = {}) => {
        if (data.result === 0) {
          this.setState({
            saveLoading: false,
          });
          message.success(data.msg);
          this.props.onOk();
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          saveLoading: false,
        });
      });
  };
  renderFooter = () => {
    const { saveLoading } = this.state;
    return (
      <div>
        <Button type="primary" icon="check" onClick={this.handleUpdate} loading={saveLoading}>
          保存
        </Button>
        <Button onClick={() => this.props.onCancel()}>取消</Button>
      </div>
    );
  };
  render() {
    const { visible } = this.props;
    const { loading, list } = this.state;
    return (
      <Modal title="距离重测" visible={visible} footer={this.renderFooter()} onCancel={() => this.props.onCancel()}>
        <Spin spinning={loading}>
          <Table columns={columns} dataSource={list} pagination={false} />
        </Spin>
      </Modal>
    );
  }
}

const columns = [
  {
    title: '位置',
    dataIndex: 'codeTypeDesc',
  },
  {
    title: '原路程',
    dataIndex: 'oldDistance',
  },
  {
    title: '新路程',
    dataIndex: 'newDistance',
  },
];
