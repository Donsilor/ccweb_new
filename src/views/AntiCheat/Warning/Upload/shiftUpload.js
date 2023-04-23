import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './uploadView';
import { getShiftImport, updateShiftImport } from 'redux/modules/warningInd';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.shiftImport.list,
  paging: store.warningInd.shiftImport.paging,
  query: store.warningInd.shiftImport.query,
  sourceType: 'source_type_3',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getShiftImport(data, paging)),
    updateQuery: data => {
      dispatch(updateShiftImport({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
