import { connect } from 'react-redux';
import MicroShop from './MicroShop';
import { fetchEwList, updateEwQuery } from '../../redux/modules/microShopLink';

function mapStateToProps(store) {
  return {
    loading: store.microShopLink.loading,
    list: store.microShopLink.ew.list,
    paging: store.microShopLink.ew.paging,
    query: store.microShopLink.ew.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      data.shopType = 2;
      dispatch(fetchEwList(data, paging));
    },
    updateQuery: data => dispatch(updateEwQuery(data)),
  };
}

export const MicroShopEWContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MicroShop);
