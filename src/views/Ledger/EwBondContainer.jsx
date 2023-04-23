import { connect } from 'react-redux';
import Ledger from './Ledger';
import {
  FETCH_EW_BOND,
  EXPORT_EW_BOND as exportFunc,
  updateEwBondQuery,
  updateBondDetailQuery,
} from 'redux/modules/ledger';

const mapStateToProps = store => ({
  loading: store.ledger.loading,
  list: store.ledger.ewBond.list,
  paging: store.ledger.ewBond.paging,
  query: store.ledger.ewBond.query,
  rowKey: record => `${record.bankId},${record.fldSerialid},${record.distributorId},${record.ewId}`,
  jumpToMenu: 'bondDetail',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_EW_BOND(data, paging)),
    updateQuery: data => dispatch(updateEwBondQuery(data)),
    export: data => dispatch(exportFunc(data)),
    setDetailQuery: record => {
      const { bankName, distributorName, fldSerialName, ewName } = record;
      const query = {
        value: {
          bankName,
          distributorName,
          fldSerialName,
          ewName,
        },
        expandForm: true,
      };
      return dispatch(updateBondDetailQuery(query));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ledger);
