import React from 'react';
import { connect } from 'react-redux';
import { getChengList, updateChengList } from 'redux/modules/carDataUpload';
import View from './listView';

const mapStateToProps = store => ({
  loading: store.carDataUpload.loading,
  list: store.carDataUpload.chengList.list,
  paging: store.carDataUpload.chengList.paging,
  query: store.carDataUpload.chengList.query,
  fileType: '2',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getChengList(data, paging)),
    updateQuery: data => {
      dispatch(updateChengList({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
