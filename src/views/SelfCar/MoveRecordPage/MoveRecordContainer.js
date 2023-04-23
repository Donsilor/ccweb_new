import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './View';
import { fetchMoveRecord, updateMoveRecord } from 'redux/modules/selfcar/moveRecord';
import { moveRecordColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.moveRecord.loading,
  list: store.moveRecord.primaryTodo.list,
  paging: store.moveRecord.primaryTodo.paging,
  query: store.moveRecord.primaryTodoQuery,
  columns: moveRecordColumns,
  enableExport: true,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(fetchMoveRecord(data, paging));
    },
    updateQuery: data => {
      dispatch(updateMoveRecord({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
