import { connect } from 'react-redux';
import View from './View';
import { FETCH_SPOTMOVE_LIST, EXPORT_SPOTMOVE_DETAIL as exportFunc, updateSpotMoveStatListQuery } from 'redux/modules/ledger';

const mapStateToProps = store => ({
  loading: store.ledger.loading,
  list: store.ledger.ewSpotMoveList.list,
  paging: store.ledger.ewSpotMoveList.paging,
  query: store.ledger.ewSpotMoveList.query,
  //hideExport: true,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(FETCH_SPOTMOVE_LIST(data, paging))
    },
    updateQuery: data => {
      data.value.taskFlag=+data.value.taskFlag
      dispatch(updateSpotMoveStatListQuery(data));
    },
    export: data => dispatch(exportFunc(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
