import { connect } from 'react-redux';
import SpottestView from './SpottestView';
import { FETCH_SPOTTEST_LIST, UPDATE_SPOTTEST_QUERY } from 'redux/modules/spottest';
const mapStateToProps = store => ({
  loading: store.spottest.loading,
  list: store.spottest.spottest.list,
  paging: store.spottest.spottest.paging,
  query: store.spottest.spottest.query,
});

function mapDispatchToProps(dispatch, ownProps) {
  const { path } = ownProps.match
  return {
    fetch: (data, paging) => dispatch(FETCH_SPOTTEST_LIST({ ...data, taskType: 0, callFrom: path.includes('spottestAuditLedger') ? '台账' : null }, paging)),
    updateQuery: data => dispatch(UPDATE_SPOTTEST_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestView);
