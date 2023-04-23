import { connect } from 'react-redux';
import {
  FETCH_CARMOVING as storeFetchList,
  updateCarMovingQuery,
  exportData,
} from 'redux/modules/carFactoryManagement';
import CarFactoryManagementView from './CarFactoryManagementView';

const mapStateToProps = store => ({
  loading: store.carFactoryManagement.loading,
  list: store.carFactoryManagement.carMoving.list,
  paging: store.carFactoryManagement.carMoving.paging,
  query: store.carFactoryManagement.carMoving.query,
  rinkType: 'carMoving',
  rowKey: record => `${record.bankId},${record.fldserialname},${record.distributorId}`,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(storeFetchList(data, paging)),
    updateQuery: data => dispatch(updateCarMovingQuery(data)),
    exportData: data => dispatch(exportData(data, 'carMoving')),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarFactoryManagementView);
