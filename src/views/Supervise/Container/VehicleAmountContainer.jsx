import { connect } from 'react-redux';
import SuperviseAmount from '../SuperviseAmount';
import { fetchVehicleAmount, updateVehicleAmountQuery } from '../../../redux/modules/supervise';

function mapStateToProps(store) {
  return {
    loading: store.supervise.loading,
    list: store.supervise.vehicleAmount.list,
    paging: store.supervise.vehicleAmount.paging,
    query: store.supervise.vehicleAmountQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchVehicleAmount(data, paging)),
    updateQuery: data => dispatch(updateVehicleAmountQuery(data)),
  };
}

const VehicleAmountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperviseAmount);

export default VehicleAmountContainer;
