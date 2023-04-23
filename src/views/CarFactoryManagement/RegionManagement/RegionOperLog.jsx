import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Modal, Button, Table } from 'antd';
import { FETCH_REGION_LOG_LIST } from 'redux/modules/regionManagement';

export class RegionOperLog extends Component {
  state = {
    modalLoading: false,
  };

  columns = [
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 200,
      render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作人',
      width: 100,
      dataIndex: 'opUserName',
    },
    {
      title: '操作内容',
      dataIndex: 'opTypeStr',
      render: text => <span style={{ whiteSpace: 'normal' }}>{text}</span>,
    },
  ];

  componentDidMount() {
    const { factory } = this.props;
    factory.automakerId &&
      this.props.fetch({
        automakerId: factory.automakerId,
      });
  }

  handleCancel = () => {
    this.props.handleCancel();
  };

  render() {
    return (
      <Modal
        title="操作日志"
        visible={this.props.showModal}
        onCancel={this.handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Table
          dataSource={this.props.list || []}
          columns={this.columns}
          scroll={{ y: 500 }}
          rowKey="id"
          pagination={false}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  list: state.regionManagement.logList,
});

const mapDispatchToProps = {
  fetch: data => FETCH_REGION_LOG_LIST(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionOperLog);
