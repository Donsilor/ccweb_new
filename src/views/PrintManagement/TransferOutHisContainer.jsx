import { connect } from 'react-redux';
import PrintManagement from './PrintManagement';
import { transferOutHisFetch as fetch } from 'redux/modules/printManagement';

import { fetchPrintManagement } from 'redux/modules/tabData';

const mapStateToProps = store => ({
  loading: store.printManagement.loading,
  list: store.printManagement.transferOutHisData.list,
  paging: store.printManagement.transferOutHisData.paging,
  query: store.printManagement.query,
  rowKey: 'id',
  transferOutHis: true,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging)),
    fetchTabCount: data => dispatch(fetchPrintManagement(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintManagement);
