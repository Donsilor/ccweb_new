import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './View';
import { fetchSoldGone, updateSoldGone } from 'redux/modules/selfcar/soldConfrim';
import { soldGoneColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.soldConfrim.loading,
  list: store.soldConfrim.gone.list,
  paging: store.soldConfrim.gone.paging,
  query: store.soldConfrim.gone.query,
  columns: soldGoneColumns,
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
