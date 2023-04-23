import { connect } from 'react-redux';
import SpottestView from './SpottestView';
import { FETCH_TIMEOUT_LIST, UPDATE_TIMEOUT_QUERY } from 'redux/modules/spottest';
const mapStateToProps = store => ({
  loading: store.spottest.loading,
  list: store.spottest.timeout.list,
  paging: store.spottest.timeout.paging,
  query: store.spottest.timeout.query,
});

function mapDispatchToProps(dispatch, ownProps) {
  const { path } = ownProps.match
  return {
    fetch: (data, paging) => dispatch(FETCH_TIMEOUT_LIST({ ...data, taskType: 2, callFrom: path.includes('spottestAuditLedger') ? '台账' : null }, paging)),
    updateQuery: data => dispatch(UPDATE_TIMEOUT_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestView);
