import { connect } from 'react-redux';
import BondManagement from './BondManagement';
import {
  transferInRenewalFetch as fetch,
  transferInRenewalExport as exportFunc,
  transferInRenewalUpdateQuery as updateQuery,
} from 'redux/modules/bondManagement';

const mapStateToProps = store => ({
  loading: store.bondManagement.loading,
  list: store.bondManagement.transferInRenewalData.list,
  paging: store.bondManagement.transferInRenewalData.paging,
  query: store.bondManagement.transferInRenewalQuery,
  rowKey: 'ewBankId',
  showTableOperArea: true,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging)),
    export: data => dispatch(exportFunc(data)),
    updateQuery: data => dispatch(updateQuery(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BondManagement);
