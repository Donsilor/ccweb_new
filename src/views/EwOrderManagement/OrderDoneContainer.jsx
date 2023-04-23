import { connect } from 'react-redux';
import EwOrderList from './EwOrderList';
import { fetchPrimaryDone, updatePrimaryDoneQuery } from 'redux/modules/ewOrderList';

function mapStateToProps(store) {
  return {
    loading: store.ewOrderList.loading,
    list: store.ewOrderList.primaryDone.list,
    paging: store.ewOrderList.primaryDone.paging,
    query: store.ewOrderList.primaryDoneQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchPrimaryDone(data, paging)),
    updateQuery: data => {
      data.value.status = 2;
      dispatch(updatePrimaryDoneQuery({ ...data }));
    },
  };
}

const OrderDoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwOrderList);

export default OrderDoneContainer;
