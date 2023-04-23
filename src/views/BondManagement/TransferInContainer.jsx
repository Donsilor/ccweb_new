import { connect } from 'react-redux';
import BondManagement from './BondManagement';
import { transferInFetch as fetch, transferInUpdateQuery as updateQuery } from 'redux/modules/bondManagement';

const mapStateToProps = store => ({
  loading: store.bondManagement.loading,
  list: store.bondManagement.transferInData.list,
  paging: store.bondManagement.transferInData.paging,
  query: store.bondManagement.transferInQuery,
  showTableOperArea: true,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging)),
    updateQuery: data => dispatch(updateQuery(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BondManagement);
