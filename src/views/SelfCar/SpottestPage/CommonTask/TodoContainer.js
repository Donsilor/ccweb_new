import { connect } from 'react-redux';
import SpottestListView from '../List/View';
import { FETCH_COMMON_TODO_LIST, UPDATE_COMMON_TODO_QUERY } from 'redux/modules/selfcar/spottest';
const mapStateToProps = store => ({
  loading: store.selfCarSpottest.loading,
  list: store.selfCarSpottest.commonTodo.list,
  paging: store.selfCarSpottest.commonTodo.paging,
  query: store.selfCarSpottest.commonTodo.query,
  sellOnCreditFlag: store.selfCarSpottest.commonTodo.sellOnCreditFlag,
  menuId: 'commonTodo',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_COMMON_TODO_LIST({ ...data }, paging)),
    updateQuery: data => dispatch(UPDATE_COMMON_TODO_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestListView);
