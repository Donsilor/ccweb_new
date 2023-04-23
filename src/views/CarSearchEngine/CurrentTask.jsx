import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Icon } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import { fetchCarCurrentTask as fetchData } from 'redux/modules/carSearchEngine';

export class CurrentTask extends Component {
  columns = [
    {
      title: '抽查类型',
      dataIndex: 'checkType',
      align: 'center',
    },
    {
      title: '抽查描述',
      dataIndex: 'description',
      align: 'center',
    },
    {
      title: '任务编号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '移动编号',
      dataIndex: 'taskId',
      align: 'center',
    },
    {
      title: '任务创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '任务下发时间',
      dataIndex: 'bookTime',
      align: 'center',
    },
    {
      title: '任务确认时间',
      dataIndex: 'checkConfirmTime',
      align: 'center',
    },
    {
      title: '功能操作',
      align: 'center',
      fixed: 'right',
      width: 60,
      render: (text, record) => (
        <Fragment>
          <Tooltip title="查看任务">
            <a href="javascript:;" onClick={this.iframeJump(record)}>
              <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
            </a>
          </Tooltip>
        </Fragment>
      ),
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
    record &&
      record.id &&
      window.parent &&
      window.parent.jumpToTask &&
      window.parent.jumpToTask(
        record.id,
        `${this.props.departType === 1 ? 1 : 5}.${record.spottesttype === 5 || record.spottesttype === 6 ? 1 : 2}`
      );
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
  departType: store.session.data.departtype, // 1 平台 5 银行
  list: store.carSearchEngine.currentTaskList.list,
  paging: store.carSearchEngine.currentTaskList.paging,
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
)(CurrentTask);
