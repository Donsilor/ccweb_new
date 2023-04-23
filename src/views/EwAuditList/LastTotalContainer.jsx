import { connect } from 'react-redux';
import EwAuditList from './EwAuditList';
import {
  fetchLastTotal as fetch,
  updateLastTotalQuery,
  confirmReceipt,
  confirmReceiptSingle,
  confirmException,
  confirmContract,
  exportSelected,
  exportTotal,
} from 'redux/modules/ewAuditList';

const mapStateToProps = store => ({
  loading: store.ewAuditList.loading,
  list: store.ewAuditList.lastTotal.list,
  paging: store.ewAuditList.lastTotal.paging,
  query: store.ewAuditList.lastTotalQuery,
  showTableOperArea: true,
  showCustomOperCol: true,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging, 'totalList')),
    updateQuery: data => dispatch(updateLastTotalQuery(data)),
    confirmReceipt: data => dispatch(confirmReceipt(data)),
    confirmReceiptSingle: data => dispatch(confirmReceiptSingle(data)),
    confirmException: data => dispatch(confirmException(data)),
    confirmContract: data => dispatch(confirmContract(data)),
    exportSelected: data => dispatch(exportSelected(data)),
    exportTotal: data => dispatch(exportTotal(data)),
  };
}

const LastTotalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwAuditList);

export default LastTotalContainer;
