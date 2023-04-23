import { connect } from 'react-redux';
import Ledger from './Ledger';
import { FETCH_BOND_DETAIL, EXPORT_BOND_DETAIL as exportFunc, updateBondDetailQuery } from 'redux/modules/ledger';

const mapStateToProps = store => ({
  loading: store.ledger.loading,
  list: store.ledger.bondDetail.list,
  paging: store.ledger.bondDetail.paging,
  query: store.ledger.bondDetail.query,
  rowKey: record => `${record.bfid},${record.bankId},${record.distributorId},${record.fldSerialid},${record.ewId}`,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_BOND_DETAIL(data, paging, 'bondDetail')),
    updateQuery: data => dispatch(updateBondDetailQuery(data)),
    export: data => dispatch(exportFunc(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ledger);
