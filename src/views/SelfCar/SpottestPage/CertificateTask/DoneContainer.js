import { connect } from 'react-redux';
import SpottestListView from '../List/View';
import { FETCH_CERTIFICATE_DONE_LIST, UPDATE_CERTIFICATE_DONE_QUERY } from 'redux/modules/selfcar/spottest';
const mapStateToProps = store => ({
  loading: store.selfCarSpottest.loading,
  list: store.selfCarSpottest.certificateDone.list,
  paging: store.selfCarSpottest.certificateDone.paging,
  query: store.selfCarSpottest.certificateDone.query,
  menuId: 'certificateDone',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_CERTIFICATE_DONE_LIST({ ...data }, paging)),
    updateQuery: data => dispatch(UPDATE_CERTIFICATE_DONE_QUERY(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpottestListView);
