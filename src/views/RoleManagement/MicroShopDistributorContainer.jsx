import { connect } from 'react-redux';
import MicroShop from './MicroShop';
import { fetchDistributorList, updateDistributorQuery } from '../../redux/modules/microShopLink';

function mapStateToProps(store) {
  return {
    loading: store.microShopLink.loading,
    list: store.microShopLink.distributor.list,
    paging: store.microShopLink.distributor.paging,
    query: store.microShopLink.distributor.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      data.shopType = 1;
      dispatch(fetchDistributorList(data, paging));
    },
    updateQuery: data => dispatch(updateDistributorQuery(data)),
  };
}

export const MicroShopDistributorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MicroShop);
