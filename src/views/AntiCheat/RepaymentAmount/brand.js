import { connect } from 'react-redux';
import { getBrandList, updateBrandList } from 'redux/modules/repaymentAmount';
import listView from './view'
import { brandColumns } from './columns'
const mapStateToProps = store => ({
    loading: store.repaymentAmount.loading,
    list: store.repaymentAmount.BrandList.list,
    paging: store.repaymentAmount.BrandList.paging,
    query: store.repaymentAmount.BrandList.query,
    Columns: brandColumns,
    exportUrl: '/warning/v1.0/warning/repaymentAmount/export/brand/state'
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getBrandList(data, paging)),
        updateQuery: data => {
            dispatch(updateBrandList({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listView);