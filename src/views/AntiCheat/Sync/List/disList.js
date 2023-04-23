import React from 'react';
import { connect } from 'react-redux';
import { getDislist, updateDislist } from 'redux/modules/carSync';
import View from './listView';

const mapStateToProps = store => ({
    loading: store.carSync.loading,
    list: store.carSync.dislist.list,
    paging: store.carSync.dislist.paging,
    query: store.carSync.dislist.query,
    columns: columns,
    exportUrl: '/warning/v1.0/sync/show/export/distributor'
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getDislist(data, paging)),
        updateQuery: data => {
            dispatch(updateDislist({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
const columns = [
    { title: '客户名称 ', dataIndex: 'custname' },
    { title: '银行客户代码', dataIndex: 'bankcustid' },
    { title: '分行名称', dataIndex: 'bankname' },
    { title: '银行分行号', dataIndex: 'bankno' },
    { title: '额度合同开始日期', dataIndex: 'begindate' },
    { title: '授信币种', dataIndex: 'ccycode' },
    { title: '核心企业证件号 ', dataIndex: 'corecustid' },
    { title: '核心企业名称 ', dataIndex: 'corecustname' },
    { title: '创建时间 ', dataIndex: 'createtime' },
    { title: '额度协议文本号 ', dataIndex: 'credipapernumber' },
    { title: '额度号 ', dataIndex: 'creditnumber' },
    { title: '额度合同结束日期 ', dataIndex: 'enddate' },
    { title: '监管公司名称 ', dataIndex: 'guardname' },
    { title: '监管公司证件号 ', dataIndex: 'guardnumber' },
    { title: '证件号码  ', dataIndex: 'idcard' },
    { title: '证件类型 ', dataIndex: 'idtype' },
    { title: '操作类型 ', dataIndex: 'opertype' },
    { title: '操作名称 ', dataIndex: 'opertypeName' },
    { title: '总额度 ', dataIndex: 'sumcreditamount' },
    { title: '总敞口 ', dataIndex: 'sumexposureamount' },
    { title: '处理状态', dataIndex: 'status', render: (text) => text == '1' ? '已处理' : '待处理' },
    { title: '备注', dataIndex: 'remark' },
];