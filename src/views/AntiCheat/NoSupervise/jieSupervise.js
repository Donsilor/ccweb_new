import { connect } from 'react-redux';
import { getCarReceiveSpot, updateCarReceiveSpot } from 'redux/modules/noSupervise';
import View from './listView';
import { formatTime } from 'common/utils';

const mapStateToProps = store => ({
  loading: store.noSupervise.loading,
  list: store.noSupervise.CarReceiveSpot.list,
  paging: store.noSupervise.CarReceiveSpot.paging,
  query: store.noSupervise.CarReceiveSpot.query,
  export: '/SpotTestTaskAction_exportCarReceiveSpotList',
  columns: columns,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getCarReceiveSpot(data, paging)),
    updateQuery: data => {
      dispatch(updateCarReceiveSpot({ ...data }));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
const columns = [
  { title: '发车日期', dataIndex: 'departTime' },
  { title: '经销商', dataIndex: 'distributorName' },
  { title: '供应链', dataIndex: 'supplyChain' },
  { title: '标识', dataIndex: 'chassis' },
  { title: '新价格', dataIndex: 'newPrice' },
  { title: '业务编号', dataIndex: 'businessNo' },
  { title: '接车任务下发时间', dataIndex: 'carBookTime', render: text => formatTime(text) },
  { title: '接车任务拍照时间', dataIndex: 'carUploadTime', render: text => formatTime(text) },
  { title: '接证任务下发时间', dataIndex: 'certBookTime', render: text => formatTime(text) },
  { title: '接证任务拍照时间', dataIndex: 'certUploadTime', render: text => formatTime(text) },
];