import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './View';
import { fetchSoldTodo, updateSoldTodo } from 'redux/modules/selfcar/soldConfrim';
import { soldTodoColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.soldConfrim.loading,
  list: store.soldConfrim.todo.list,
  paging: store.soldConfrim.todo.paging,
  query: store.soldConfrim.todo.query,
  columns: soldTodoColumns,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchSoldTodo(data, paging)),
    updateQuery: data => {
      dispatch(updateSoldTodo({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
