import { connect } from 'react-redux';
import SpottestView from './SpottestView';
import { FETCH_TODOCOMPLETE_LIST, UPDATE_TODOCOMPLETE_QUERY } from 'redux/modules/spottest';
const mapStateToProps = store => ({
  loading: store.spottest.loading,
  list: store.spottest.todo.list,
  paging: store.spottest.todo.paging,
  query: store.spottest.todo.query,
});

function mapDispatchToProps(dispatch, ownProps) {
  // 抽查任务管理台账需要增加参数callFrom='台账'
  const { path } = ownProps.match
  return {
    fetch: (data, paging) => dispatch(FETCH_TODOCOMPLETE_LIST({ ...data, callFrom: path.includes('spottestAuditLedger') ? '台账' : null }, paging)),
    updateQuery: data => dispatch(UPDATE_TODOCOMPLETE_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestView);
