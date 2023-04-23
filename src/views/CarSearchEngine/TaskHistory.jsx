import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Icon, Row, Col } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import { fetchCarTaskHis as fetchData } from 'redux/modules/carSearchEngine';
import DetailInfoGrid from 'components/DetailInfoGrid';

export class TaskHistory extends Component {
  columns = [
    {
      title: '任务编号',
      dataIndex: 'id',
      align: 'center',
      width: 100,
      fixed: 'left',
    },
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
      title: '状态',
      dataIndex: 'statusName',
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
  renderInfo = () => {
    const { total, normal, abnormal, abnormalRate } = this.props;
    const list = [
      {
        label: '历史抽查次数',
        value: total,
      },
      {
        label: '正常次数',
        value: normal,
      },
      {
        label: '异常次数',
        value: abnormal,
      },
      {
        label: '异常率',
        value: abnormalRate,
      },
    ];
    return list;
  };
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
        <DetailInfoGrid list={this.renderInfo()} col={4} />
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
  total: store.carSearchEngine.taskHis.total,
  normal: store.carSearchEngine.taskHis.normal,
  abnormal: store.carSearchEngine.taskHis.abnormal,
  abnormalRate: store.carSearchEngine.taskHis.abnormalRate,
  list: store.carSearchEngine.taskHis.list,
  paging: store.carSearchEngine.taskHis.paging,
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
)(TaskHistory);
