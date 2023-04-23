import { connect } from 'react-redux';
import EwOrderList from './EwOrderList';
import { fetchPrimaryTodo, updatePrimaryTodoQuery } from 'redux/modules/ewRefundList';

function mapStateToProps(store) {
  return {
    loading: store.ewRefundList.loading,
    list: store.ewRefundList.primaryTodo.list,
    paging: store.ewRefundList.primaryTodo.paging,
    query: store.ewRefundList.primaryTodoQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchPrimaryTodo(data, paging)),
    updateQuery: data => {
      data.value.refundStatus = 1;
      dispatch(updatePrimaryTodoQuery({ ...data }));
    },
  };
}

const RefundContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwOrderList);

export default RefundContainer;
