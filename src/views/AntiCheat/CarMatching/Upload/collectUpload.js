import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './uploadView';
import { getCollectImport, updateCollectImport } from 'redux/modules/carMatching';
const mapStateToProps = store => ({
  loading: store.carMatching.loading,
  list: store.carMatching.collectImport.list,
  paging: store.carMatching.collectImport.paging,
  query: store.carMatching.collectImport.query,
  sourceType: 'source_type_51',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getCollectImport(data, paging)),
    updateQuery: data => {
      dispatch(updateCollectImport({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
