import { connect } from 'react-redux';
import Ledger from './Ledger';
import { FETCH_EW_DETAIL, EXPORT_EW_DETAIL as exportFunc, updateEwDetailQuery } from 'redux/modules/ledger';

const mapStateToProps = store => ({
  loading: store.ledger.loading,
  list: store.ledger.ewDetail.list,
  paging: store.ledger.ewDetail.paging,
  query: store.ledger.ewDetail.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_EW_DETAIL(data, paging)),
    updateQuery: data => dispatch(updateEwDetailQuery(data)),
    export: data => dispatch(exportFunc(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ledger);
