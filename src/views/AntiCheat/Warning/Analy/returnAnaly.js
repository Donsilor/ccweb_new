import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './analyView';
import { getReturnAnaly, updateReturnAnaly } from 'redux/modules/warningInd';
import { returnColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.returnAnaly.list,
  paging: store.warningInd.returnAnaly.paging,
  query: store.warningInd.returnAnaly.query,
  columns: returnColumns,
  export: '/warning/v1.0/warning/maturedNote/export/list/returnedMoneyState',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getReturnAnaly(data, paging)),
    updateQuery: data => {
      dispatch(updateReturnAnaly({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
