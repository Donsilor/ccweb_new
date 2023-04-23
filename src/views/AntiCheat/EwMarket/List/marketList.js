import { connect } from 'react-redux';
import { getauditAll, updateauditAll } from 'redux/modules/ewMarket';
import View from './listView';
import { marketListColumns } from '../Columns'

const mapStateToProps = store => ({
  loading: store.ewMarket.loading,
  list: store.ewMarket.auditAll.list,
  paging: store.ewMarket.auditAll.paging,
  query: store.ewMarket.auditAll.query,
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
      dispatch(getauditAll(data, paging));
    },
    updateQuery: data => {
      dispatch(updateauditAll({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
