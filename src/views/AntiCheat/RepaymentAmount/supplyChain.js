import { connect } from 'react-redux';
import { getSupplyChainList, updateSupplyChainList } from 'redux/modules/repaymentAmount';
import listView from './view'
import { supplyChainColumns } from './columns'
const mapStateToProps = store => ({
    loading: store.repaymentAmount.loading,
    list: store.repaymentAmount.SupplyChainList.list,
    paging: store.repaymentAmount.SupplyChainList.paging,
    query: store.repaymentAmount.SupplyChainList.query,
    Columns: supplyChainColumns,
    exportUrl: '/warning/v1.0/warning/repaymentAmount/export/supplyChain/state'
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getSupplyChainList(data, paging)),
        updateQuery: data => {
            dispatch(updateSupplyChainList({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listView);