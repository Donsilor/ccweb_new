import { connect } from 'react-redux';
import RepoWarning from './RepoWarning';
import { todoWarningFetch, updateTodoWarningQuery } from '../../redux/modules/repositoryList';

function mapStateToProps(store) {
  return {
    loading: store.repositoryList.loading,
    list: store.repositoryList.warningTodo.list,
    paging: store.repositoryList.warningTodo.paging,
    query: store.repositoryList.warningTodoQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(todoWarningFetch(data, paging));
    },
    updateQuery: data => {
      data.value.isRemove = 0;
      dispatch(updateTodoWarningQuery({ ...data }));
    },
  };
}

const RepoWarningTodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoWarning);

export default RepoWarningTodoContainer;
