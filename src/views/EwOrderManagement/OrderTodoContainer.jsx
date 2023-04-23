import { connect } from 'react-redux';
import EwOrderList from './EwOrderList';
import { fetchPrimaryTodo, updatePrimaryTodoQuery } from 'redux/modules/ewOrderList';

function mapStateToProps(store) {
  return {
    loading: store.ewOrderList.loading,
    list: store.ewOrderList.primaryTodo.list,
    paging: store.ewOrderList.primaryTodo.paging,
    query: store.ewOrderList.primaryTodoQuery,
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

const OrderTodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwOrderList);

export default OrderTodoContainer;
