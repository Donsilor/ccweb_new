import { connect } from 'react-redux';
import SuperviseAmount from '../SuperviseAmount';
import { fetchDealerAmount, updateDealerAmountQuery } from '../../../redux/modules/supervise';

function mapStateToProps(store) {
  return {
    loading: store.supervise.loading,
    list: store.supervise.dealerAmount.list,
    paging: store.supervise.dealerAmount.paging,
    query: store.supervise.dealerAmountQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchDealerAmount(data, paging)),
    updateQuery: data => dispatch(updateDealerAmountQuery(data)),
  };
}

const DealerAmountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperviseAmount);

export default DealerAmountContainer;
