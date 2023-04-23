import { connect } from 'react-redux';
import ExceptionListView from './ExceptionListView';
import { httpBlobClient } from 'common/axios';
import {
  FETCH_TODO_LIST,
  SPECIFY_PARENT_TASK_ID,
  FETCH_SUB_LIST,
  UPDATE_TODO_QUERY,
} from 'redux/modules/exceptionMovingTraceAction';
const mapStateToProps = store => ({
  loading: store.exceptionMovingManagement.loading,
  list: store.exceptionMovingManagement.todo.list,
  paging: store.exceptionMovingManagement.todo.paging,
  query: store.exceptionMovingManagement.todo.query,
  subData: store.exceptionMovingManagement.subData,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_TODO_LIST({ ...data, endFlag: 0 }, paging)),
    specifyParentId: id => dispatch(SPECIFY_PARENT_TASK_ID(id)),
    updateQuery: data => dispatch(UPDATE_TODO_QUERY(data)),
    fetchSubList: data => dispatch(FETCH_SUB_LIST('todo')(data)),
    exportData: data =>
      httpBlobClient.formSubmit('/ExceptionTraceAction_exportMoveExceptionTraceList', '', {
        ...data,
        endFlag: 0,
      }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExceptionListView);
