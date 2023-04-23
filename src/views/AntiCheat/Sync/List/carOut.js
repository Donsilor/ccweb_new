import React from 'react';
import { connect } from 'react-redux';
import { getCarinout, updateCarinout } from 'redux/modules/carSync';
import View from './listView';

const mapStateToProps = store => ({
  loading: store.carSync.loading,
  list: store.carSync.inout.list,
  paging: store.carSync.inout.paging,
  query: store.carSync.inout.query,
  columns: columns,
  exportUrl: '/warning/v1.0/sync/show/export/car/in/out'
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getCarinout(data, paging)),
    updateQuery: data => {
      dispatch(updateCarinout({ ...data }));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
const columns = [
  { title: '车架号', dataIndex: 'vin' },
  { title: '全底盘号', dataIndex: 'chassisno' },
  { title: '业务编号', dataIndex: 'bizno' },
  { title: '创建时间', dataIndex: 'createtime' },
  { title: '经销商名称', dataIndex: 'custname' },
  { title: '释放时间', dataIndex: 'repaydate' },
  { title: '处理状态', dataIndex: 'status', render: (text) => text == '1' ? '已处理' : '待处理' },
  { title: '备注', dataIndex: 'remark' },
];