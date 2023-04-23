import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Icon } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import { fetchCarChangeList as fetchData } from 'redux/modules/carSearchEngine';

export class ChangeRecord extends Component {
  columns = [
    {
      title: '时间',
      dataIndex: 'op_time',
      align: 'center',
    },
    {
      title: '内容',
      dataIndex: 'op_name',
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: 'op_user_name',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'remark',
      align: 'center',
    },
  ];
  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };

  handleSearch = (page, pageSize) => {
    this.props.chassis &&
      this.props.fetchData(
        { id: this.props.carId },
        {
          pageNum: page || this.props.paging.current,
          pageSize: pageSize || this.props.paging.pageSize,
        }
      );
  };

  componentDidMount() {
    this.handleSearch();
  }

  iframeJump = record => e => {
    record && record.id && window.parent && window.parent.jumpToTask && window.parent.jumpToTask(record.id);
  };
  render() {
    return (
      <div>
        <EwAuditTable
          columns={this.columns}
          loading={this.props.loading}
          data={this.props.list}
          paging={this.props.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
          rowKey={'id'}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.carSearchEngine.loading,
  chassis: store.carSearchEngine.chassis,
  list: store.carSearchEngine.changeList.list,
  paging: store.carSearchEngine.changeList.paging,
  carId: store.carSearchEngine.carId
});

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (data, paging) => dispatch(fetchData(data, paging)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeRecord);
