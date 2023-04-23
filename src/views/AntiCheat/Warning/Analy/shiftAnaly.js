import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './analyView';
import { getShiftAnaly, updateShiftAnaly } from 'redux/modules/warningInd';
import { shiftColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.shiftAnaly.list,
  paging: store.warningInd.shiftAnaly.paging,
  query: store.warningInd.shiftAnaly.query,
  columns: shiftColumns,
  export: '/warning/v1.0/warning/transferLedger/export/list',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getShiftAnaly(data, paging)),
    updateQuery: data => {
      dispatch(updateShiftAnaly({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
