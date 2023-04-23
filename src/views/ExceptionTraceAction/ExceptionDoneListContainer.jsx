import { connect } from 'react-redux';
import ExceptionListView from './ExceptionListView';
import { httpBlobClient } from 'common/axios';
import {
  FETCH_DONE_LIST,
  SPECIFY_PARENT_TASK_ID,
  FETCH_SUB_LIST,
  UPDATE_DONE_QUERY,
} from 'redux/modules/exceptionTraceAction';
const mapStateToProps = store => ({
  loading: store.exceptionManagement.loading,
  list: store.exceptionManagement.done.list,
  paging: store.exceptionManagement.done.paging,
  query: store.exceptionManagement.done.query,
  subData: store.exceptionManagement.subData,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_DONE_LIST({ ...data, endFlag: 1 }, paging)),
    specifyParentId: id => dispatch(SPECIFY_PARENT_TASK_ID(id)),
    updateQuery: data => dispatch(UPDATE_DONE_QUERY(data)),
    fetchSubList: data => dispatch(FETCH_SUB_LIST('done')(data)),
    exportData: data =>
      httpBlobClient.formSubmit('/ExceptionTraceAction_exportSpotExceptionTraceList', '', {
        ...data,
        endFlag: 1,
      }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExceptionListView);
