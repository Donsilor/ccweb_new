import { connect } from 'react-redux';
import Ledger from './Ledger';
import {
  FETCH_DIS_BOND,
  EXPORT_DIS_BOND as exportFunc,
  updateDisBondQuery,
  updateBondDetailQuery,
} from 'redux/modules/ledger';

const mapStateToProps = store => ({
  loading: store.ledger.loading,
  list: store.ledger.disBond.list,
  paging: store.ledger.disBond.paging,
  query: store.ledger.disBond.query,
  rowKey: record => `${record.bankId},${record.fldSerialid},${record.distributorId},${record.ewId}`,
  jumpToMenu: 'bondDetail',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_DIS_BOND(data, paging)),
    updateQuery: data => dispatch(updateDisBondQuery(data)),
    export: data => dispatch(exportFunc(data)),
    setDetailQuery: record => {
      const { bankName, distributorName, fldSerialName } = record;
      const query = {
        value: {
          bankName,
          distributorName,
          fldSerialName,
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
