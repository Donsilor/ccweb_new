import React from 'react';
import { connect } from 'react-redux';
import { getDisaccount, updateDisaccount } from 'redux/modules/carSync';
import View from './listView';

const mapStateToProps = store => ({
    loading: store.carSync.loading,
    list: store.carSync.disaccount.list,
    paging: store.carSync.disaccount.paging,
    query: store.carSync.disaccount.query,
    columns: columns,
    exportUrl: '/warning/v1.0/sync/show/export/distributor/accounting'
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getDisaccount(data, paging)),
        updateQuery: data => {
            dispatch(updateDisaccount({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
const columns = [
    { title: '客户名称', dataIndex: 'custname' },
    { title: '分账号', dataIndex: 'bailaccno' },
    { title: '业务编号', dataIndex: 'bizno' },
    { title: '核心企业名称', dataIndex: 'corecustname' },
    { title: '创建时间', dataIndex: 'createtime' },
    { title: '客户代码 ', dataIndex: 'custno' },
    { title: '敞口金额 ', dataIndex: 'exportamt' },
    { title: '业务品种 ', dataIndex: 'finclassname' },
    { title: '业务代码 ', dataIndex: 'finclassno' },
    { title: '初始保证金利率 ', dataIndex: 'firstbailrate' },
    { title: '初始保证金比例 ', dataIndex: 'firstbailratio' },
    { title: '初始保证金 ', dataIndex: 'firstbailtamt' },
    { title: '贷款利率 ', dataIndex: 'loanrate' },
    { title: '产品种类 ', dataIndex: 'prdcode' },
    { title: '出账金额 ', dataIndex: 'putoutamt' },
    {
        title: '融资模式 ', dataIndex: 'singlepool', render: (text) => {
            if (text == 'S') {
                return '单笔'
            } else if (text == 'P') {
                return '池'
            }
        }
    },
    { title: '票据明细数  ', dataIndex: 'recordcount' },
    { title: '贸易商名称 ', dataIndex: 'tradername' },
    { title: '处理状态', dataIndex: 'status', render: (text) => text == '1' ? '已处理' : '待处理' },
    { title: '备注', dataIndex: 'remark' },
];