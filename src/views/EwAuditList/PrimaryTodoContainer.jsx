import { connect } from 'react-redux';
import EwAuditList from './EwAuditList';
import { fetchPrimaryTodo as fetch, updatePrimaryTodoQuery } from 'redux/modules/ewAuditList';

const mapStateToProps = store => ({
  loading: store.ewAuditList.loading,
  list: store.ewAuditList.primaryTodo.list,
  paging: store.ewAuditList.primaryTodo.paging,
  query: store.ewAuditList.primaryTodoQuery,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging, 'primaryTodoList')),
    updateQuery: data => dispatch(updatePrimaryTodoQuery(data)),
  };
}

const PrimaryTodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwAuditList);

export default PrimaryTodoContainer;
