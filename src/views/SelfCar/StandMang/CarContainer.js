import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './View';
import { fetchSoldTodo, updateSoldTodo } from 'redux/modules/selfcar/standMang';
import { carColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.standMang.loading,
  list: store.standMang.todo.list,
  paging: store.standMang.todo.paging,
  query: store.standMang.todo.query,
  columns: carColumns,
  menuId: 'car',
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
