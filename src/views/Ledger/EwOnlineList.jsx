import { connect } from 'react-redux';
import Ledger from './Ledger';
import { FETCH_EWONLINE_LIST, updateEwOnlineListQuery, updateEwOnlineDetailQuery } from 'redux/modules/ledger';

const mapStateToProps = store => ({
  loading: store.ledger.loading,
  list: store.ledger.ewOnlineList.list,
  paging: store.ledger.ewOnlineList.paging,
  query: store.ledger.ewOnlineList.query,
  rowKey: 'bankId',
  hideExport: true,
  jumpToMenu: 'ewOnlineDetail',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_EWONLINE_LIST(data, paging)),
    updateQuery: data => dispatch(updateEwOnlineListQuery(data)),
    setDetailQuery: record => {
      const { bankName } = record;
      const query = {
        value: {
          bankName,
        },
        expandForm: true,
      };
      return dispatch(updateEwOnlineDetailQuery(query));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ledger);
