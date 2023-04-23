import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './analyView';
import { getRedemAnaly, updateRedemAnaly } from 'redux/modules/warningInd';
import { redemColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.redemAnaly.list,
  paging: store.warningInd.redemAnaly.paging,
  query: store.warningInd.redemAnaly.query,
  columns: redemColumns,
  export: '/warning/v1.0/warning/repaymentAmount/export/list',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getRedemAnaly(data, paging)),
    updateQuery: data => {
      dispatch(updateRedemAnaly({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
