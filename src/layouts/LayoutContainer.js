/*
 * @Author Osborn
 * @File LayoutContainer.tsx
 * @Created Date 2018-07-06 16-24
 * @Last Modified: 2018-07-06 16-24
 * @Modified By: Osborn
 */

import { connect } from 'react-redux';
import { init, fetchAllRegions } from 'redux/modules/session';
import Layout from './Layout';

const mapStateToProps = store => ({
  menus: store.common.menus,
  inIframe: store.common.inIframe,
  errorMsg: store.common.errorMsg,
  session: store.session.data,
  isLogin: store.session.isLogin,
});

function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(init()),
    fetchAllRegionList: () => dispatch(fetchAllRegions()),
  };
}

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;
