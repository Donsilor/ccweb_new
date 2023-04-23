import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskSummary from './View';
import {
  fetchPlatformData as fetch,
  fetchPlatformDetail,
  updatePlatformQuery,
  exportData,
} from 'redux/modules/taskSummary';
import columnsPlatform, { detailColumnsPlatform } from './Columns';

const mapStateToProps = store => ({
  loading: store.taskSummary.loading,
  list: store.taskSummary.platformData.list,
  detailList: store.taskSummary.platformDataDetail.list,
  paging: store.taskSummary.platformData.paging,
  detailPaging: store.taskSummary.platformDataDetail.paging,
  query: store.taskSummary.platformQuery,
  columns: columnsPlatform,
  detailColumns: detailColumnsPlatform,
  rowKey: 'accid',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) =>
      dispatch(
        fetch(
          {
            opUserName: data.opUserName,
            accid: data.accid,
            beginTime: data.beginDate,
            endTime: data.endDate,
          },
          paging
        )
      ),
    handleSearchDetail: (data, paging) =>
      dispatch(
        fetchPlatformDetail(
          { opUserId: data.userId, beginTime: data.beginDate, endTime: data.endDate, type: data.type },
          paging
        )
      ),
    updateQuery: data => dispatch(updatePlatformQuery(data)),
    exportData: data =>
      dispatch(
        exportData(
          {
            opUserName: data.opUserName,
            accid: data.accid,
            beginTime: data.beginDate,
            endTime: data.endDate,
          },
          'platform'
        )
      ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskSummary);
