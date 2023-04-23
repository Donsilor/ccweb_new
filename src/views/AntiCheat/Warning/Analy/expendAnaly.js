import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './analyView';
import { getAccountState, updateAccountState } from 'redux/modules/warningInd';
import { expendColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.accountState.list,
  paging: store.warningInd.accountState.paging,
  query: store.warningInd.accountState.query,
  columns: expendColumns,
  export: '/warning/v1.0/warning/maturedNote/export/list/accountState',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getAccountState(data, paging)),
    updateQuery: data => {
      dispatch(updateAccountState({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
