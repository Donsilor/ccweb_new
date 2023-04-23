import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './analyView';
import { getTradeAnaly, updateTradeAnaly } from 'redux/modules/warningInd';
import { tradeColumns } from './Columns';
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.tradeAnaly.list,
  paging: store.warningInd.tradeAnaly.paging,
  query: store.warningInd.tradeAnaly.query,
  columns: tradeColumns,
  export: '/warning/v1.0/warning/changeCertificateDetail/export/list',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getTradeAnaly(data, paging)),
    updateQuery: data => {
      dispatch(updateTradeAnaly({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
