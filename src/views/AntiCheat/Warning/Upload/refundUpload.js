import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './uploadView';
import { getRefundImport, updateRefundImport } from 'redux/modules/warningInd';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.refundImport.list,
  paging: store.warningInd.refundImport.paging,
  query: store.warningInd.refundImport.query,
  sourceType: 'source_type_1',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getRefundImport(data, paging)),
    updateQuery: data => {
      dispatch(updateRefundImport({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
