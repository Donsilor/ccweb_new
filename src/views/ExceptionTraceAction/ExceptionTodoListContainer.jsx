import { connect } from 'react-redux';
import ExceptionListView from './ExceptionListView';
import { httpBlobClient } from 'common/axios';
import {
  FETCH_TODO_LIST,
  SPECIFY_PARENT_TASK_ID,
  FETCH_SUB_LIST,
  UPDATE_TODO_QUERY,
} from 'redux/modules/exceptionTraceAction';
const mapStateToProps = store => ({
  loading: store.exceptionManagement.loading,
  list: store.exceptionManagement.todo.list,
  paging: store.exceptionManagement.todo.paging,
  query: store.exceptionManagement.todo.query,
  subData: store.exceptionManagement.subData,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_TODO_LIST({ ...data, endFlag: 0 }, paging)),
    specifyParentId: id => dispatch(SPECIFY_PARENT_TASK_ID(id)),
    updateQuery: data => dispatch(UPDATE_TODO_QUERY(data)),
    fetchSubList: data => dispatch(FETCH_SUB_LIST('todo')(data)),
    exportData: data =>
      httpBlobClient.formSubmit('/ExceptionTraceAction_exportSpotExceptionTraceList', '', {
        ...data,
        endFlag: 0,
      }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExceptionListView);
