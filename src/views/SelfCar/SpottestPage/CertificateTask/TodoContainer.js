import { connect } from 'react-redux';
import SpottestListView from '../List/View';
import { FETCH_CERTIFICATE_TODO_LIST, UPDATE_CERTIFICATE_TODO_QUERY } from 'redux/modules/selfcar/spottest';
const mapStateToProps = store => ({
  loading: store.selfCarSpottest.loading,
  list: store.selfCarSpottest.certificateTodo.list,
  paging: store.selfCarSpottest.certificateTodo.paging,
  query: store.selfCarSpottest.certificateTodo.query,
  dealer: store.session.dealer,
  menuId: 'certificateTodo',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_CERTIFICATE_TODO_LIST({ ...data }, paging)),
    updateQuery: data => dispatch(UPDATE_CERTIFICATE_TODO_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestListView);
