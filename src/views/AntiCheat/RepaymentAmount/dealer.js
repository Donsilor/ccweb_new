import { connect } from 'react-redux';
import { getDealerList, updateDealerList } from 'redux/modules/repaymentAmount';
import listView from './view'
import { dealerColumns } from './columns'
const mapStateToProps = store => ({
    loading: store.repaymentAmount.loading,
    list: store.repaymentAmount.DealerList.list,
    paging: store.repaymentAmount.DealerList.paging,
    query: store.repaymentAmount.DealerList.query,
    Columns: dealerColumns,
    exportUrl: '/warning/v1.0/warning/repaymentAmount/export/dealer/state'
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getDealerList(data, paging)),
        updateQuery: data => {
            dispatch(updateDealerList({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listView);