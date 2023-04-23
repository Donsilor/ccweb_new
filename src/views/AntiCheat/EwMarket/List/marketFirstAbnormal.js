import { connect } from 'react-redux';
import { getauditFirstReject, updateauditFirstReject } from 'redux/modules/ewMarket';
import View from './listView';
import { marketListColumns } from '../Columns'

const mapStateToProps = store => ({
    loading: store.ewMarket.loading,
    list: store.ewMarket.auditFirstReject.list,
    paging: store.ewMarket.auditFirstReject.paging,
    query: store.ewMarket.auditFirstReject.query,
    columns: marketListColumns,
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getauditFirstReject(data, paging)),
        updateQuery: data => {
            dispatch(updateauditFirstReject({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);