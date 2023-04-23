import { connect } from 'react-redux';
import EwOrderList from './EwOrderList';
import { fetchPrimaryDone, updatePrimaryDoneQuery } from 'redux/modules/ewInvoiceList';

function mapStateToProps(store) {
  return {
    loading: store.ewInvoiceList.loading,
    list: store.ewInvoiceList.primaryDone.list,
    paging: store.ewInvoiceList.primaryDone.paging,
    query: store.ewInvoiceList.primaryDoneQuery,
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

const InvoiceDoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwOrderList);

export default InvoiceDoneContainer;
