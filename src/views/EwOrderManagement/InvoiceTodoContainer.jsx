import { connect } from 'react-redux';
import EwOrderList from './EwOrderList';
import { fetchPrimaryTodo, updatePrimaryTodoQuery } from 'redux/modules/ewInvoiceList';

function mapStateToProps(store) {
  return {
    loading: store.ewInvoiceList.loading,
    list: store.ewInvoiceList.primaryTodo.list,
    paging: store.ewInvoiceList.primaryTodo.paging,
    query: store.ewInvoiceList.primaryTodoQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchPrimaryTodo(data, paging)),
    updateQuery: data => {
      data.value.status = 1;
      dispatch(updatePrimaryTodoQuery({ ...data }));
    },
  };
}

const InvoiceTodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwOrderList);

export default InvoiceTodoContainer;
