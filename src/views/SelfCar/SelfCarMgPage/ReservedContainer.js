import { connect } from 'react-redux';
import View from './View';
import { FETCH_RESERVED_LIST, UPDATE_RESERVED_QUERY } from 'redux/modules/selfcar/SelfCarMgPage';
const mapStateToProps = store => ({
  loading: store.selfCarMgPage.loading,
  list: store.selfCarMgPage.reserved.list,
  paging: store.selfCarMgPage.reserved.paging,
  query: store.selfCarMgPage.reserved.query,
  sellOnCreditFlag: store.selfCarMgPage.reserved.sellOnCreditFlag,
  menuId: 'reserved',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_RESERVED_LIST(data, paging)),
    updateQuery: data => dispatch(UPDATE_RESERVED_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
