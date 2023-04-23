import React from 'react';
import { connect } from 'react-redux';
import { getCarReturn, updateCarReturn } from 'redux/modules/carSync';
import View from './listView';

const mapStateToProps = store => ({
    loading: store.carSync.loading,
    list: store.carSync.CarReturn.list,
    paging: store.carSync.CarReturn.paging,
    query: store.carSync.CarReturn.query,
    columns: columns,
    exportUrl: '/warning/v1.0/sync/show/export/car/return'
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getCarReturn(data, paging)),
        updateQuery: data => {
            dispatch(updateCarReturn({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
const columns = [
    { title: '全底盘号', dataIndex: 'chassisno' },
    { title: '批次号', dataIndex: 'batchNo' },
    { title: '贷款编号或票号', dataIndex: 'billloanno' },
    { title: '业务编号', dataIndex: 'bizno' },
    { title: '实际发运日期', dataIndex: 'actualdeparttime' },
    { title: '到店时间', dataIndex: 'arrivaltime' },
    { title: '押品名称', dataIndex: 'collname' },
    { title: '创建时间', dataIndex: 'createtime' },
    { title: '经销商名称', dataIndex: 'custname' },
    { title: '始发地', dataIndex: 'departplace' },
    { title: '接收地址', dataIndex: 'destination' },
    { title: '出厂时间', dataIndex: 'fatoryDate' },
    { title: '预计到店时间', dataIndex: 'goodsintime' },
    { title: '车辆出库时间', dataIndex: 'goodsouttime' },
    { title: '标识', dataIndex: 'identification' },
    { title: '核心厂商发货时间', dataIndex: 'inputdate' },
    { title: '推送备注信息', dataIndex: 'note' },
    { title: '发车时间', dataIndex: 'outputdate' },
    { title: '供应链名称', dataIndex: 'tradername' },
    { title: '单价', dataIndex: 'unitprice' },
    { title: '凭证号', dataIndex: 'voucherno' },
    {
        title: '处理状态', dataIndex: 'status', render: (text) => {
            if (text == '0') {
                return '待处理'
            } else if (text == '1') {
                return '已处理'
            } else {
                return '重复数据无需处理'
            }
        }
    },
    { title: '备注', dataIndex: 'remark' },
];