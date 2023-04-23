import React from 'react';
import { connect } from 'react-redux';
import { getDissettlement, updateDissettlement } from 'redux/modules/carSync';
import View from './listView';

const mapStateToProps = store => ({
    loading: store.carSync.loading,
    list: store.carSync.dissettlement.list,
    paging: store.carSync.dissettlement.paging,
    query: store.carSync.dissettlement.query,
    columns: columns,
    exportUrl: '/warning/v1.0/sync/show/export/distributor/settlement'
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getDissettlement(data, paging)),
        updateQuery: data => {
            dispatch(updateDissettlement({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
const columns = [
    { title: '业务编号', dataIndex: 'bizno' },
    { title: '创建时间', dataIndex: 'createtime' },
    { title: '处理状态', dataIndex: 'status', render: (text) => text == '1' ? '已处理' : '待处理' },
    { title: '备注', dataIndex: 'remark' },
];