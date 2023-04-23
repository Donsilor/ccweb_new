import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';
import moment from 'moment';
import { FETCH_LOG_LIST } from 'redux/modules/exceptionTraceAction';
import { connect } from 'react-redux';

export class ExceptionLog extends Component {
  state = {
    modalLoading: false,
  };
  columns = [
    {
      title: '操作时间',
      dataIndex: 'operTime',
      align: 'center',
      width: 200,
    },
    {
      title: '操作人',
      dataIndex: 'operName',
    },
    {
      title: '操作内容',
      dataIndex: 'operText',
      className: 'wrap',
      render: text => <span style={{ whiteSpace: 'normal' }}>{text}</span>,
    },
    {
      title: '描述',
      width: 200,
      className: 'wrap',
      dataIndex: 'description',
    },
    {
      title: '备注',
      className: 'wrap',
      dataIndex: 'remark',
    },
  ];

  handleCancel = () => {
    this.props.handleCancel();
  };
  componentDidMount() {
    const { record } = this.props;
    this.props.fetch({ spotdetailId: record.spotdetailId });
  }
  render() {
    return (
      <Modal
        title="操作日志"
        visible={this.props.showModal}
        onCancel={this.handleCancel}
        footer={null}
        width={1000}
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
  list: state.exceptionManagement.logList,
});

const mapDispatchToProps = {
  fetch: data => FETCH_LOG_LIST(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExceptionLog);
