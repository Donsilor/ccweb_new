import { connect } from 'react-redux';
import BondManagement from './BondManagement';
import {
  transferOutFetch as fetch,
  transferOutExport as exportFunc,
  transferOutUpdateQuery as updateQuery,
} from 'redux/modules/bondManagement';

const mapStateToProps = store => ({
  loading: store.bondManagement.loading,
  list: store.bondManagement.transferOutData.list,
  paging: store.bondManagement.transferOutData.paging,
  query: store.bondManagement.transferOutQuery,
  rowKey: 'ewBankId',
  customOper: true,
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
