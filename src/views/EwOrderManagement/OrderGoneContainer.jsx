import { connect } from 'react-redux';
import EwOrderList from './EwOrderList';
import { fetchPrimaryGone, updatePrimaryGoneQuery } from 'redux/modules/ewOrderList';

function mapStateToProps(store) {
  return {
    loading: store.ewOrderList.loading,
    list: store.ewOrderList.primaryGone.list,
    paging: store.ewOrderList.primaryGone.paging,
    query: store.ewOrderList.primaryGoneQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchPrimaryGone(data, paging)),
    updateQuery: data => {
      data.value.status = 3;
      dispatch(updatePrimaryGoneQuery({ ...data }));
    },
  };
}

const OrderGoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwOrderList);

export default OrderGoneContainer;
