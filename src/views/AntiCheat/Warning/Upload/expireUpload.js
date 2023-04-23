import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './uploadView';
import { getExpireImport, updateExpireImport } from 'redux/modules/warningInd';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.expireImport.list,
  paging: store.warningInd.expireImport.paging,
  query: store.warningInd.expireImport.query,
  sourceType: 'source_type_2',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getExpireImport(data, paging)),
    updateQuery: data => {
      dispatch(updateExpireImport({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
