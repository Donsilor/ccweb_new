import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './uploadView';
import { getThirdImport, updateThirdImport } from 'redux/modules/carMatching';
const mapStateToProps = store => ({
  loading: store.carMatching.loading,
  list: store.carMatching.thirdImport.list,
  paging: store.carMatching.thirdImport.paging,
  query: store.carMatching.thirdImport.query,
  sourceType: 'source_type_52',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getThirdImport(data, paging)),
    updateQuery: data => {
      dispatch(updateThirdImport({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
