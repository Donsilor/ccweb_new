import { connect } from 'react-redux';
import ConfirmReceipt from './ConfirmReceipt';
import {
  allDataFetch as fetch,
  updateAllQuery as updateQuery,
  updateEwDetailQuery,
  accountUpdate,
  confirmReceipt,
} from 'redux/modules/confirmReceipt';

const mapStateToProps = store => ({
  loading: store.confirmReceipt.loading,
  list: store.confirmReceipt.allData.list,
  paging: store.confirmReceipt.allData.paging,
  query: store.confirmReceipt.allQuery,
  modalList: store.confirmReceipt.ewDetailData.list,
  modalPaging: store.confirmReceipt.ewDetailData.paging,
  rowKey: 'id',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch({ ...data }, paging)),
    updateQuery: data => dispatch(updateQuery(data)),
    updateEwDetailQuery: data => dispatch(updateEwDetailQuery(data)),
    confirmReceipt: data => dispatch(confirmReceipt(data)),
    accountUpdate: data => dispatch(accountUpdate(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmReceipt);
