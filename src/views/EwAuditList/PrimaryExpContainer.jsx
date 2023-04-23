import { connect } from 'react-redux';
import EwAuditList from './EwAuditList';
import { fetchPrimaryExp as fetch, updatePrimaryExpQuery } from 'redux/modules/ewAuditList';

const mapStateToProps = store => ({
  loading: store.ewAuditList.loading,
  list: store.ewAuditList.primaryExp.list,
  paging: store.ewAuditList.primaryExp.paging,
  query: store.ewAuditList.primaryExpQuery,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging, 'expList')),
    updateQuery: data => dispatch(updatePrimaryExpQuery(data)),
  };
}

const PrimaryExpContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwAuditList);

export default PrimaryExpContainer;
