import { connect } from 'react-redux';
import { getbonusList, updatebonusList } from 'redux/modules/ewMarket';
import View from './view';
import { awardRemitColumns } from '../Columns'

const mapStateToProps = store => ({
    loading: store.ewMarket.loading,
    list: store.ewMarket.bonusList.list,
    paging: store.ewMarket.bonusList.paging,
    query: store.ewMarket.bonusList.query,
    columns: awardRemitColumns,
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getbonusList(data, paging)),
        updateQuery: data => {
            dispatch(updatebonusList({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);