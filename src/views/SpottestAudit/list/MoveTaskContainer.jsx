import { connect } from 'react-redux';
import SpottestView from './SpottestView';
import { FETCH_MOVETASK_LIST, UPDATE_MOVETASK_QUERY } from 'redux/modules/spottest';
const mapStateToProps = store => ({
  loading: store.spottest.loading,
  list: store.spottest.movetask.list,
  paging: store.spottest.movetask.paging,
  query: store.spottest.movetask.query,
});

function mapDispatchToProps(dispatch, ownProps) {
  const { path } = ownProps.match
  return {
    fetch: (data, paging) => dispatch(FETCH_MOVETASK_LIST({ ...data, taskType: 1, callFrom: path.includes('spottestAuditLedger') ? '台账' : null }, paging)),
    updateQuery: data => dispatch(UPDATE_MOVETASK_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestView);
