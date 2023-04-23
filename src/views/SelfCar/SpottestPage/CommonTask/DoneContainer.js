import { connect } from 'react-redux';
import SpottestListView from '../List/View';
import { FETCH_COMMON_DONE_LIST, UPDATE_COMMON_DONE_QUERY } from 'redux/modules/selfcar/spottest';
const mapStateToProps = store => ({
  loading: store.selfCarSpottest.loading,
  list: store.selfCarSpottest.commonDone.list,
  paging: store.selfCarSpottest.commonDone.paging,
  query: store.selfCarSpottest.commonDone.query,
  sellOnCreditFlag: store.selfCarSpottest.commonDone.sellOnCreditFlag,
  menuId: 'commonDone',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_COMMON_DONE_LIST({ ...data }, paging)),
    updateQuery: data => dispatch(UPDATE_COMMON_DONE_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestListView);
