import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './View';
import { fetchLocaManage, updateLocaManage } from 'redux/modules/selfcar/locaManage';
import { localManageColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.locaManage.loading,
  list: store.locaManage.primaryTodo.list,
  paging: store.locaManage.primaryTodo.paging,
  query: store.locaManage.primaryTodoQuery,
  columns: localManageColumns,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(fetchLocaManage(data, paging));
    },
    updateQuery: data => {
      dispatch(updateLocaManage({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
