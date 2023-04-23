import { connect } from 'react-redux';
import {
  FETCH_CARSALES as storeFetchList,
  FETCH_CARSALES_DETAIL,
  updateCarSalesQuery,
  exportData,
} from 'redux/modules/carFactoryManagement';
import CarFactoryManagementView from './CarFactoryManagementView';
import { detailColumnsCarSales } from './columns';

const mapStateToProps = store => ({
  loading: store.carFactoryManagement.loading,
  list: store.carFactoryManagement.carSales.list,
  detailList: store.carFactoryManagement.carSalesDetail.list,
  paging: store.carFactoryManagement.carSales.paging,
  detailPaging: store.carFactoryManagement.carSalesDetail.paging,
  query: store.carFactoryManagement.carSales.query,
  rinkType: 'CarSales',
  detailColumns: detailColumnsCarSales,
  rowKey: 'fldTrimid',
  detailRowKey: record => `${record.distributorName},${record.ewName}`,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(storeFetchList(data, paging)),
    handleSearchDetail: (data, paging) => dispatch(FETCH_CARSALES_DETAIL(data, paging)),
    updateQuery: data => dispatch(updateCarSalesQuery(data)),
    exportData: data => dispatch(exportData(data, 'carSales')),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarFactoryManagementView);
