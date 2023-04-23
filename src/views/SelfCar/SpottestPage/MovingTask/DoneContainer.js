import { connect } from 'react-redux';
import SpottestListView from '../List/View';
import { FETCH_MOVING_DONE_LIST, UPDATE_MOVING_DONE_QUERY } from 'redux/modules/selfcar/spottest';
const mapStateToProps = store => ({
  loading: store.selfCarSpottest.loading,
  list: store.selfCarSpottest.movingDone.list,
  paging: store.selfCarSpottest.movingDone.paging,
  query: store.selfCarSpottest.movingDone.query,
  menuId: 'movingDone',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_MOVING_DONE_LIST({ ...data }, paging)),
    updateQuery: data => dispatch(UPDATE_MOVING_DONE_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestListView);
