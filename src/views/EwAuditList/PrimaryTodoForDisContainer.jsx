import { connect } from 'react-redux';
import EwAuditList from './EwAuditList';
import { fetchPrimaryDis as fetch, updatePrimaryDisQuery } from 'redux/modules/ewAuditList';

const mapStateToProps = store => ({
  loading: store.ewAuditList.loading,
  list: store.ewAuditList.primaryDis.list,
  paging: store.ewAuditList.primaryDis.paging,
  query: store.ewAuditList.primaryDisQuery,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging, 'todoListForDistr')),
    updateQuery: data => dispatch(updatePrimaryDisQuery(data)),
  };
}

const PrimaryTodoForDisContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwAuditList);

export default PrimaryTodoForDisContainer;
