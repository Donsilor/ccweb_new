import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskSummary from './View';
import {
  fetchRiskData as fetch,
  fetchRiskSummary as fetchSummary,
  fetchRiskDetail,
  exportData,
  updateRiskQuery,
} from 'redux/modules/taskSummary';
import { columnsRisk, detailColumnsRisk, summaryListRisk } from './Columns';

const mapStateToProps = store => ({
  loading: store.taskSummary.loading,
  list: store.taskSummary.riskData.list,
  detailList: store.taskSummary.riskDataDetail.list,
  summaryData: store.taskSummary.riskSummary,
  paging: store.taskSummary.riskData.paging,
  detailPaging: store.taskSummary.riskDataDetail.paging,
  query: store.taskSummary.riskQuery,
  columns: columnsRisk,
  summaryList: summaryListRisk,
  detailColumns: detailColumnsRisk,
  rowKey: 'accid',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging)),
    fetchSummary: data => dispatch(fetchSummary(data)),
    handleSearchDetail: (data, paging) => dispatch(fetchRiskDetail(data, paging)),
    updateQuery: data => dispatch(updateRiskQuery(data)),
    exportData: data => dispatch(exportData(data, 'risk')),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskSummary);
