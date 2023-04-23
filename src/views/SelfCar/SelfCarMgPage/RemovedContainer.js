import { connect } from 'react-redux';
import View from './View';
import { FETCH_REMOVED_LIST, UPDATE_REMOVED_QUERY } from 'redux/modules/selfcar/SelfCarMgPage';
const mapStateToProps = store => ({
  loading: store.selfCarMgPage.loading,
  list: store.selfCarMgPage.removed.list,
  paging: store.selfCarMgPage.removed.paging,
  query: store.selfCarMgPage.removed.query,
  menuId: 'removed',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_REMOVED_LIST(data, paging)),
    updateQuery: data => dispatch(UPDATE_REMOVED_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
