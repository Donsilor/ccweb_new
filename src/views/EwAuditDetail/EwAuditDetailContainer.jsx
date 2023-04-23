import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import EwAuditDetail from './EwAuditDetail';

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetch: () => dispatch(() => {}),
  };
}

const EwAuditDetailContainer = connect(
  null,
  mapDispatchToProps
)(EwAuditDetail);

export default EwAuditDetailContainer;
