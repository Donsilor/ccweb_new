import { connect } from 'react-redux';
import {
  FETCH_DEALER_SALERINK,
  FETCH_DEALER_SALERINK_DETAIL,
  updateDealerSaleRink,
  exportData,
} from 'redux/modules/carFactoryManagement';
import CarFactoryManagementView from './CarFactoryManagementView';
import { detailColumnsDealerSaleRink } from './columns';

const mapStateToProps = store => ({
  loading: store.carFactoryManagement.loading,
  list: store.carFactoryManagement.dealerSaleRink.list,
  detailList: store.carFactoryManagement.dealerSaleRinkDetail.list,
  paging: store.carFactoryManagement.dealerSaleRink.paging,
  detailPaging: store.carFactoryManagement.dealerSaleRinkDetail.paging,
  query: store.carFactoryManagement.dealerSaleRink.query,
  regionName: store.carFactoryManagement.dealerSaleRink.list.regionName,
  rinkType: 'dealer',
  detailColumns: detailColumnsDealerSaleRink,
  rowKey: record => `${record.bankId},${record.fldSerialid},${record.distributorId}`,
  detailRowKey: 'chassis',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_DEALER_SALERINK(data, paging)),
    handleSearchDetail: (data, paging) => dispatch(FETCH_DEALER_SALERINK_DETAIL(data, paging)),
    updateQuery: data => dispatch(updateDealerSaleRink(data)),
    exportData: data => dispatch(exportData(data, 'dealerSaleRink')),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarFactoryManagementView);
