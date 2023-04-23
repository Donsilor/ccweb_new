import { connect } from 'react-redux';
import { fetchFinancialPro, updatefinancial } from 'redux/modules/selfcar/financialPro';
import View from './View';
const mapStateToProps = store => ({
  loading: store.financialPro.loading,
  list: store.financialPro.todo.list,
  paging: store.financialPro.todo.paging,
  query: store.financialPro.todo.query,
  dealer: store.session.dealer,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(fetchFinancialPro(data, paging));
    },
    updateQuery: data => {
      dispatch(updatefinancial(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
