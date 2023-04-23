import { connect } from 'react-redux';
import ExceptionDetailView from './ExceptionDetailView';
import { FETCH_UN_INFO } from 'redux/modules/exceptionTraceAction';
const mapStateToProps = store => ({
  loading: store.exceptionManagement.loading,
  detailData: store.exceptionManagement.detailData,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(FETCH_UN_INFO(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExceptionDetailView);
