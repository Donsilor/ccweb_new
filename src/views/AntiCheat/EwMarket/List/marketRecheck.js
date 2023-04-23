import { connect } from 'react-redux';
import { getauditSecond, updateauditSecond } from 'redux/modules/ewMarket';
import View from './listView';
import { marketListColumns } from '../Columns'

const mapStateToProps = store => ({
  loading: store.ewMarket.loading,
  list: store.ewMarket.auditSecond.list,
  paging: store.ewMarket.auditSecond.paging,
  query: store.ewMarket.auditSecond.query,
  columns: marketListColumns,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      if (!!data.provCity) {
        const provCity = data.provCity;
        delete data.provCity;
        if (!!provCity[0]) data['province'] = provCity[0];
        if (!!provCity[1]) data['city'] = provCity[1];
      }
      dispatch(getauditSecond(data, paging));
    },
    updateQuery: data => {
      dispatch(updateauditSecond({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
