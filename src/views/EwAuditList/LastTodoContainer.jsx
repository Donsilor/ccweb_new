import { connect } from 'react-redux';
import EwAuditList from './EwAuditList';
import { fetchLastTodo as fetch, updateLastTodoQuery } from 'redux/modules/ewAuditList';

const mapStateToProps = store => ({
  loading: store.ewAuditList.loading,
  list: store.ewAuditList.lastTodo.list,
  paging: store.ewAuditList.lastTodo.paging,
  query: store.ewAuditList.lastTodoQuery,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging, 'lastTodoList')),
    updateQuery: data => dispatch(updateLastTodoQuery(data)),
  };
}

const LastTodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwAuditList);

export default LastTodoContainer;
