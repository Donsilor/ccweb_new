import { connect } from 'react-redux';
import SpottestListView from '../List/View';
import { FETCH_MOVING_TODO_LIST, UPDATE_MOVING_TODO_QUERY } from 'redux/modules/selfcar/spottest';
const mapStateToProps = store => ({
  loading: store.selfCarSpottest.loading,
  list: store.selfCarSpottest.movingTodo.list,
  paging: store.selfCarSpottest.movingTodo.paging,
  query: store.selfCarSpottest.movingTodo.query,
  menuId: 'movingTodo',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_MOVING_TODO_LIST({ ...data }, paging)),
    updateQuery: data => dispatch(UPDATE_MOVING_TODO_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestListView);
