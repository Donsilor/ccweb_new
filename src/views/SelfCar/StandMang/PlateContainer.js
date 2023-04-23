import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './View';
import { fetchSoldGone, updateSoldGone } from 'redux/modules/selfcar/standMang';
import { carColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.standMang.loading,
  list: store.standMang.gone.list,
  paging: store.standMang.gone.paging,
  query: store.standMang.gone.query,
  columns: carColumns,
  menuId: 'plate',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchSoldGone(data, paging)),
    updateQuery: data => {
      dispatch(updateSoldGone({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
