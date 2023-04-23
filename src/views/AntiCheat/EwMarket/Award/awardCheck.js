import { connect } from 'react-redux';
import { getauditMoney, updateauditMoney } from 'redux/modules/ewMarket';
import View from './view';
import { awardCheckColumns } from '../Columns'

const mapStateToProps = store => ({
  loading: store.ewMarket.loading,
  list: store.ewMarket.auditMoney.list,
  paging: store.ewMarket.auditMoney.paging,
  query: store.ewMarket.auditMoney.query,
  columns: awardCheckColumns,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getauditMoney(data, paging)),
    updateQuery: data => {
      dispatch(updateauditMoney({ ...data }));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);