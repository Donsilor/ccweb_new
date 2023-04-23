import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Table, message } from 'antd';
import { FETCH_MANAGER_LIST, UPDATE_MANAGER } from 'redux/modules/regionManagement';

export class ManagerModal extends Component {
  state = {
    modalLoading: false,
    selectedRowKeys:
      (this.props.subRegion.subRmUserId &&
        this.props.subRegion.subRmUserId
          .split(',')
          .map(id => Number(id))
          .filter(item => item)) ||
      [],
  };
  componentDidMount() {
    this.props.fetchList({ id: this.props.subRegion.id });
  }

  handleOk = () => {
    const { selectedRowKeys } = this.state;
    const { id } = this.props.subRegion;
    id &&
      this.props
        .updateManager({
          id,
          subRmUserId: selectedRowKeys.join(),
        })
        .then(({ payload } = {}) => {
          if (payload && payload.data && payload.data.result == 0) {
            message.success('更新区域经理成功!');
            this.props.onCancel(true);
          } else {
            return Promise.reject(payload.data.msg);
          }
        })
        .catch(err => {
          message.error(err || '更新区域经理失败，请重试');
        });
  };
  handleCancel = () => {
    this.props.onCancel(false);
  };
  handleRowSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  render() {
    const { selectedRowKeys } = this.state;

    return (
      <Modal
        title="区域经理设置"
        visible={this.props.showModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={1100}
        destroyOnClose
      >
        <span style={{ position: 'absolute', top: '17px', left: '150px' }}>
          小区名称：{this.props.subRegion.regionSubName}
        </span>
        <Table
          dataSource={this.props.list}
          columns={columns}
          pagination={false}
          size="small"
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
          }}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  list: state.regionManagement.managerList,
});

const mapDispatchToProps = {
  fetchList: data => FETCH_MANAGER_LIST(data),
  updateManager: data => UPDATE_MANAGER(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerModal);

const columns = [
  { title: '员工名称', dataIndex: 'employeename', key: 'employeename', width: 250 },
  { title: '登录账号', dataIndex: 'accid', key: 'accid', width: 250 },
  { title: '员工类型', dataIndex: 'employeeName', key: 'employeeName', width: 250 },
  { title: '企业名称', dataIndex: 'departname', key: 'departname', width: 250 },
  { title: '移动电话', dataIndex: 'mobile', key: 'mobile', width: 250 },
  { title: '电子邮件', dataIndex: 'email', key: 'email', width: 250 },
  { title: '状态', dataIndex: 'statusName', key: 'statusName', width: 250 },
];
