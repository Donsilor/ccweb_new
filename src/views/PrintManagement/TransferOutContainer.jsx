import { connect } from 'react-redux';
import PrintManagement from './PrintManagement';
import {
  transferOutFetch as fetch,
  transferOutExport as exportFunc,
  ewDetailFetch,
} from 'redux/modules/printManagement';
import { accountUpdate } from 'redux/modules/confirmReceipt';

import { fetchPrintManagement } from 'redux/modules/tabData';

const mapStateToProps = store => ({
  loading: store.printManagement.loading,
  list: store.printManagement.transferOutData.list,
  paging: store.printManagement.transferOutData.paging,
  modalList: store.printManagement.ewDetailData.list,
  modalPaging: store.printManagement.ewDetailData.paging,
  query: store.printManagement.query,
  rowKey: record => `${record.bankId},${record.brandId},${record.distributorId}`,
  transferOut: true,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging)),
    fetchTabCount: data => dispatch(fetchPrintManagement(data)),
    fetchEwDetail: (data, paging) => dispatch(ewDetailFetch(data, paging)),
    export: data => dispatch(exportFunc(data)),
    accountUpdate: data => dispatch(accountUpdate(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintManagement);
