import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './uploadView';
import { getCertificateImport, updateCertificateImport } from 'redux/modules/warningInd';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.certificateImport.list,
  paging: store.warningInd.certificateImport.paging,
  query: store.warningInd.certificateImport.query,
  sourceType: 'source_type_4',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getCertificateImport(data, paging)),
    updateQuery: data => {
      dispatch(updateCertificateImport({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
