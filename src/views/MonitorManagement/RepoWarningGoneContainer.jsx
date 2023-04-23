import { connect } from 'react-redux';
import RepoWarning from './RepoWarning';
import {
  goneWarningFetch,
  updateGoneWarningQuery,
} from '../../redux/modules/repositoryList';

function mapStateToProps(store) {
  return {
    loading: store.repositoryList.loading,
    list: store.repositoryList.warningGone.list,
    paging: store.repositoryList.warningGone.paging,
    query: store.repositoryList.warningGoneQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(goneWarningFetch(data, paging));
    },
    updateQuery: data => {
      data.value.isRemove = 1;
      dispatch(updateGoneWarningQuery({ ...data }));
    },
  };
}

const RepoWarningGoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoWarning);

export default RepoWarningGoneContainer;
