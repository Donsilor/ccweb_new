import { connect } from 'react-redux';
import { FETCH_CHECKEDDETAIL, updateCheckedDetailQuery, exportData } from 'redux/modules/carFactoryManagement';
import CarFactoryManagementView from './CarFactoryManagementView';

const mapStateToProps = store => ({
  loading: store.carFactoryManagement.loading,
  list: store.carFactoryManagement.checkedDetail.list,
  paging: store.carFactoryManagement.checkedDetail.paging,
  query: store.carFactoryManagement.checkedDetail.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_CHECKEDDETAIL(data, paging)),
    updateQuery: data => dispatch(updateCheckedDetailQuery(data)),
    exportData: data => dispatch(exportData(data, 'checkedDetail')),
    rowKey: 'chassis',
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarFactoryManagementView);
