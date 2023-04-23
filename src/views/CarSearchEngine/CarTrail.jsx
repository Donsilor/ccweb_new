import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EwAuditTable from 'components/EwAuditTable';
import { fetchCarTrackList as fetchData } from 'redux/modules/carSearchEngine';

export class CarTrail extends Component {
  columns = [
    {
      title: '任务编号',
      dataIndex: 'spottestId',
      align: 'center',
      fixed: 'left',
      width: 100,
      render: text => text || '-',
    },
    {
      title: '任务时间',
      dataIndex: 'taskTime',
      align: 'center',
    },
    {
      title: '移出位置',
      dataIndex: 'moveOutName',
      align: 'center',
    },
    {
      title: '移入位置',
      dataIndex: 'moveInName',
      align: 'center',
    },
    {
      title: '任务类型',
      dataIndex: 'taskTypeName',
      align: 'center',
    },
    {
      title: '位置状态',
      dataIndex: 'statusName',
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: 'operName',
      align: 'center',
    },
    {
      title: '操作描述',
      dataIndex: 'description',
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
  list: store.carSearchEngine.trackList.list,
  paging: store.carSearchEngine.trackList.paging,
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
)(CarTrail);
