import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './uploadView';
import { getCollectImport, updateCollectImport, updateListItem } from 'redux/modules/carDataUpload';
const mapStateToProps = store => ({
  loading: store.carDataUpload.loading,
  list: store.carDataUpload.collectImport.list,
  paging: store.carDataUpload.collectImport.paging,
  query: store.carDataUpload.collectImport.query,
  fileType: '1',
  path: 'carChengType',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getCollectImport(data, paging)),
    updateQuery: data => {
      dispatch(updateCollectImport({ ...data }));
    },
    setDetailOddQuery: () => {
      const query = {
        value: {},
        expandForm: false,
        aitiForm: true,
      };
      return dispatch(updateListItem(query));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
