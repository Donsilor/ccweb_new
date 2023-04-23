import { connect } from 'react-redux';
import ConfirmReceipt from './ConfirmReceipt';
import {
  todoDataFetch as fetch,
  updateTodoQuery as updateQuery,
  updateEwDetailQuery,
  accountUpdate,
  confirmReceipt,
  confirmMultipleReceipt,
} from 'redux/modules/confirmReceipt';

const mapStateToProps = store => ({
  loading: store.confirmReceipt.loading,
  list: store.confirmReceipt.todoData.list,
  paging: store.confirmReceipt.todoData.paging,
  query: store.confirmReceipt.todoQuery,
  modalList: store.confirmReceipt.ewDetailData.list,
  modalPaging: store.confirmReceipt.ewDetailData.paging,
  showTableOperArea: true,
  rowKey: 'id',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch({ ...data, confirmStatus: 0 }, paging)),
    updateQuery: data => dispatch(updateQuery(data)),
    updateEwDetailQuery: data => dispatch(updateEwDetailQuery(data)),
    confirmReceipt: data => dispatch(confirmReceipt(data)),
    confirmMultipleReceipt: data => dispatch(confirmMultipleReceipt(data)),
    accountUpdate: data => dispatch(accountUpdate(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmReceipt);
