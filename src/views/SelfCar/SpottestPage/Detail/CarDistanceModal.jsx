import React, { Component } from 'react';
import { Spin, message, Table, Modal, Button } from 'antd';
import { httpFormClient, httpCommonClient } from 'common/axios';

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
    return httpCommonClient
      .submit('/self-car/v1.0/selfSpottestPhoto/find/list/distance', { spotdetailId: id })
      .then(({ data } = {}) => {
        if (data.code === 200) {
          this.setState({
            list: data.data,
            loading: false,
          });
        } else {
          return Promise.reject(data.message);
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
    const { id } = this.props;
    this.setState({
      saveLoading: true,
    });
    return httpCommonClient
      .submit('/self-car/v1.0/selfSpottestPhoto/update/distance', { spotdetailId: id })
      .then(({ data } = {}) => {
        if (data.code === 200) {
          this.setState({
            saveLoading: false,
          });
          message.success(data.message);
          this.props.onOk();
        } else {
          return Promise.reject(data.message);
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
          <Table columns={columns} rowKey={'id'} dataSource={list} pagination={false} />
        </Spin>
      </Modal>
    );
  }
}

const columns = [
  {
    title: '位置',
    dataIndex: 'name',
  },
  {
    title: '原路程 (米)',
    dataIndex: 'distance',
  },
  {
    title: '新路程 (米)',
    dataIndex: 'newDistance',
  },
];
