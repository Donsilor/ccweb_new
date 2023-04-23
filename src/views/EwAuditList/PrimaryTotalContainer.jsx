import { connect } from 'react-redux';
import EwAuditList from './EwAuditList';
import {
  fetchPrimaryTotal as fetch,
  updatePrimaryTotalQuery,
  exportSelected,
  confirmContract,
} from 'redux/modules/ewAuditList';

const mapStateToProps = store => ({
  loading: store.ewAuditList.loading,
  list: store.ewAuditList.primaryTotal.list,
  paging: store.ewAuditList.primaryTotal.paging,
  query: store.ewAuditList.primaryTotalQuery,
  showTableOperArea: true,
  showCustomOperCol: true,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging, 'totalList')),
    updateQuery: data => dispatch(updatePrimaryTotalQuery(data)),
    exportSelected: data => dispatch(exportSelected(data)),
    confirmContract: data => dispatch(confirmContract(data)),
  };
}

const PrimaryTotalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EwAuditList);

export default PrimaryTotalContainer;
