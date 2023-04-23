import { connect } from 'react-redux';
import PrintManagement from './PrintManagement';
import {
  currentSupplementFetch as fetch,
  transferInExport as exportFunc,
  ewDetailFetch,
} from 'redux/modules/printManagement';
import { accountUpdate } from 'redux/modules/confirmReceipt';

import { fetchPrintManagement } from 'redux/modules/tabData';

const mapStateToProps = store => ({
  loading: store.printManagement.loading,
  list: store.printManagement.currentSupplementData.list,
  paging: store.printManagement.currentSupplementData.paging,
  modalList: store.printManagement.ewDetailData.list,
  modalPaging: store.printManagement.ewDetailData.paging,
  query: store.printManagement.query,
  rowKey: record => `${record.bankId},${record.brandId},${record.distributorId}`,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetch(data, paging)),
    fetchTabCount: data => dispatch(fetchPrintManagement(data)),
    fetchEwDetail: (data, paging) => dispatch(ewDetailFetch(data, paging)),
    export: data => dispatch(exportFunc({ ...data, type: 4 })),
    accountUpdate: data => dispatch(accountUpdate(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintManagement);
