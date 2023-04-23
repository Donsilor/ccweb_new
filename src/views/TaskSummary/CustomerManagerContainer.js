import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskSummary from './View';
import {
  fetchCustomerData as fetch,
  fetchCustomerSummary as fetchSummary,
  fetchCustomerDetail,
  exportData,
  updateCustomerQuery,
} from 'redux/modules/taskSummary';
import { columnsCustomer, detailColumnsRisk, summaryListCustomer } from './Columns';

const mapStateToProps = store => ({
  loading: store.taskSummary.loading,
  list: store.taskSummary.customerData.list,
  detailList: store.taskSummary.customerDataDetail.list,
  summaryData: store.taskSummary.customerSummary,
  paging: store.taskSummary.customerData.paging,
  detailPaging: store.taskSummary.customerDataDetail.paging,
  query: store.taskSummary.customerQuery,
  columns: columnsCustomer,
  summaryList: summaryListCustomer,
  detailColumns: detailColumnsRisk,
  rowKey: 'accid',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging)),
    fetchSummary: data => dispatch(fetchSummary(data)),
    handleSearchDetail: (data, paging) => dispatch(fetchCustomerDetail(data, paging)),
    updateQuery: data => dispatch(updateCustomerQuery(data)),
    exportData: data => dispatch(exportData(data, 'customer')),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskSummary);
