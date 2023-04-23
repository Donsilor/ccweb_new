import { connect } from 'react-redux';
import {
  FETCH_SALERINK as storeFetchList,
  EXPORT_SALERINK as exportFunc,
  FETCH_SALERINK_DETAIL as storeFetchDetailList,
  updateEwSaleRinkQuery,
  exportData,
} from 'redux/modules/carFactoryManagement';
import CarFactoryManagementView from './CarFactoryManagementView';
import { detailColumnsEwSaleRink } from './columns';

const mapStateToProps = store => ({
  loading: store.carFactoryManagement.loading,
  list: store.carFactoryManagement.ewSaleRink.list,
  detailList: store.carFactoryManagement.ewSaleRinkDetail.list,
  paging: store.carFactoryManagement.ewSaleRink.paging,
  detailPaging: store.carFactoryManagement.ewSaleRinkDetail.paging,
  query: store.carFactoryManagement.ewSaleRink.query,
  rinkType: 'ew',
  detailColumns: detailColumnsEwSaleRink,
  rowKey: record => `${record.bankId},${record.fldserialname},${record.distributorId},${record.ewId}`,
  detailRowKey: 'chassis',
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(storeFetchList(data, paging)),
    handleSearchDetail: (data, paging) => dispatch(storeFetchDetailList(data, paging)),
    updateQuery: data => dispatch(updateEwSaleRinkQuery(data)),
    exportData: data => dispatch(exportData(data, 'ewSaleRink')),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarFactoryManagementView);
