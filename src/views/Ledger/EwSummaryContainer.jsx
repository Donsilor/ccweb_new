import { connect } from 'react-redux';
import Ledger from './Ledger';
import {
  FETCH_EW_SUMMARY,
  EXPORT_EW_SUMMARY as exportFunc,
  updateEwSummaryQuery,
  updateEwDetailQuery,
} from 'redux/modules/ledger';

const mapStateToProps = store => ({
  loading: store.ledger.loading,
  list: store.ledger.ewSummary.list,
  paging: store.ledger.ewSummary.paging,
  query: store.ledger.ewSummary.query,
  rowKey: record => `${record.bankId},${record.distributorId},${record.fldSerialid}`,
  jumpToMenu: 'ewDetail',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_EW_SUMMARY(data, paging)),
    export: data => dispatch(exportFunc(data)),
    updateQuery: data => dispatch(updateEwSummaryQuery(data)),
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
      return dispatch(updateEwDetailQuery(query));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ledger);
