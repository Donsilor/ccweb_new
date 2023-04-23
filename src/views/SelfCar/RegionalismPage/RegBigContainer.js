import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './View';
import { FETCH_REGIONBIG_LIST, UPDATE_REGIONBIG_QUERY } from 'redux/modules/selfcar/regionalism';
import { bigColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.regionalism.loading,
  list: store.regionalism.regionBig.list,
  paging: store.regionalism.regionBig.paging,
  query: store.regionalism.regionBig.query,
  columns: bigColumns,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_REGIONBIG_LIST(data, paging)),
    updateQuery: data => {
      dispatch(UPDATE_REGIONBIG_QUERY({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
