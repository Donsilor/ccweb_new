import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuditListView from './AuditListView';
import {
  lastTodoDataFetch as fetch,
  updateLastTodoQuery as updateQuery,
  fetchRepoHis,
} from 'redux/modules/repoAudit';

const mapStateToProps = store => ({
  loading: store.repoAudit.loading,
  list: store.repoAudit.todoData.list,
  paging: store.repoAudit.todoData.paging,
  query: store.repoAudit.lastTodoQuery,
  hisList: store.repoAudit.hisList,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch({ ...data, tabType: 1, status: -1 }, paging)),
    updateQuery: data => dispatch(updateQuery(data)),
    fetchRepoHis: data => dispatch(fetchRepoHis(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditListView);
