import { connect } from 'react-redux';
import EwAuditList from './EwAuditList';
import { fetchLastExp as fetch, updateLastExpQuery } from 'redux/modules/ewAuditList';

const mapStateToProps = store => ({
  loading: store.ewAuditList.loading,
  list: store.ewAuditList.lastExp.list,
  paging: store.ewAuditList.lastExp.paging,
  query: store.ewAuditList.lastExpQuery,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging, 'expList')),
    updateQuery: data => dispatch(updateLastExpQuery(data)),
  };
}

const LastExpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwAuditList);

export default LastExpContainer;
