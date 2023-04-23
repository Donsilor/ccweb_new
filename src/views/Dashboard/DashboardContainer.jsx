import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetch } from 'redux/modules/dashboard';
import Dashboard from './Dashboard';

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetch: () => dispatch(fetch()),
  };
}

const DashboardContainer = connect(
  null,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
