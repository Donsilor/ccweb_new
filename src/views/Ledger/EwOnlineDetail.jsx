import { connect } from 'react-redux';
import Ledger from './Ledger';
import {
  FETCH_EWONLINE_DETAIL,
  EXPORT_EWONLINE_DETAIL as exportFunc,
  updateEwOnlineDetailQuery,
} from 'redux/modules/ledger';

const mapStateToProps = store => ({
  loading: store.ledger.loading,
  list: store.ledger.ewOnlineDetail.list,
  paging: store.ledger.ewOnlineDetail.paging,
  query: store.ledger.ewOnlineDetail.query,
  rowKey: record => `${record.bankId},${record.brandId},${record.dealerId}`,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_EWONLINE_DETAIL(data, paging)),
    updateQuery: data => dispatch(updateEwOnlineDetailQuery(data)),
    export: data => dispatch(exportFunc(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ledger);
