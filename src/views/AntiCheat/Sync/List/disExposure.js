import React from 'react';
import { connect } from 'react-redux';
import { getDisexposure, updateDisexposure } from 'redux/modules/carSync';
import View from './listView';

const mapStateToProps = store => ({
    loading: store.carSync.loading,
    list: store.carSync.disexposure.list,
    paging: store.carSync.disexposure.paging,
    query: store.carSync.disexposure.query,
    columns: columns,
    exportUrl: '/warning/v1.0/sync/show/export/distributor/exposure'
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getDisexposure(data, paging)),
        updateQuery: data => {
            dispatch(updateDisexposure({ ...data }));
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
    { title: '经销商名称', dataIndex: 'custname' },
    { title: '敞口余额', dataIndex: 'availexportamt' },
    {
        title: '业务类型 ', dataIndex: 'operType', render: (text) => {
            if (text == 10) {
                return '还款'
            } else if (text == 20) {
                return '赎车'
            } else {
                return '保证金调整'
            }
        }
    },
    { title: '处理状态', dataIndex: 'status', render: (text) => text == '1' ? '已处理' : '待处理' },
    { title: '备注', dataIndex: 'remark' },
];