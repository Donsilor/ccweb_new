import { combineReducers } from 'redux';

import common from './modules/common';
import dashboard from './modules/dashboard';
import session from './modules/session';
import ewAuditList from './modules/ewAuditList';
import ewAuditDetail from './modules/ewAuditDetail';
import ledger from './modules/ledger';
import bondManagement from './modules/bondManagement';
import tabData from './modules/tabData';
import printManagement from './modules/printManagement';
import carSearchEngine from './modules/carSearchEngine';
import confirmReceipt from './modules/confirmReceipt';
import repoAudit from './modules/repoAudit';
import taskSummary from './modules/taskSummary';
import carFactoryManagement from './modules/carFactoryManagement';
import regionManagement from './modules/regionManagement';
import exceptionManagement from './modules/exceptionTraceAction';
import exceptionMovingManagement from './modules/exceptionMovingTraceAction';
import spottest from './modules/spottest';
import ewOrderList from './modules/ewOrderList';
import ewInvoiceList from './modules/ewInvoiceList';
import ewRefundList from './modules/ewRefundList';
import supervise from './modules/supervise';
import soldConfrim from './modules/selfcar/soldConfrim';
import selfCarMgPage from './modules/selfcar/SelfCarMgPage';
import selfCarSpottest from './modules/selfcar/spottest';
import moveRecord from './modules/selfcar/moveRecord';
import locaManage from './modules/selfcar/locaManage';
import exUploadAll from './modules/selfcar/exUploadAll';
import exUploadAdd from './modules/selfcar/exUploadAdd';
import regionalism from './modules/selfcar/regionalism';
import standMang from './modules/selfcar/standMang';
import clientManagement from './modules/clientManagement';
import cameraList from './modules/cameraList';
import repositoryList from './modules/repositoryList';
import monitorImage from './modules/monitorImage';
import spotEwBlack from './modules/spotEwBlack';
import financialPro from './modules/selfcar/financialPro';
import microShopLink from './modules/microShopLink';
import selfcarCheat from './modules/selfcar/selfcarCheat';
import warningInd from './modules/warningInd';
import userinfoMana from './modules/userinfoMana';
import carStatistics from './modules/carStatistics';
import carMatching from './modules/carMatching';
import carDataUpload from './modules/carDataUpload';
import carSync from './modules/carSync';
import ewMarket from './modules/ewMarket';
import noSupervise from './modules/noSupervise';
import statementFCZ from './modules/statementFCZ';
import repaymentAmount from './modules/repaymentAmount';
export default combineReducers({
  common,
  dashboard,
  session,
  ewAuditList,
  ewAuditDetail,
  ewInvoiceList,
  ewOrderList,
  ewRefundList,
  ledger,
  bondManagement,
  tabData,
  printManagement,
  carSearchEngine,
  confirmReceipt,
  repoAudit,
  taskSummary,
  carFactoryManagement,
  regionManagement,
  exceptionManagement,
  exceptionMovingManagement,
  spottest,
  supervise,
  soldConfrim,
  selfCarMgPage,
  selfCarSpottest,
  moveRecord,
  locaManage,
  exUploadAll,
  exUploadAdd,
  regionalism,
  standMang,
  clientManagement,
  cameraList,
  repositoryList,
  monitorImage,
  spotEwBlack,
  financialPro,
  microShopLink,
  selfcarCheat,
  warningInd,
  userinfoMana,
  carStatistics,
  carMatching,
  carDataUpload,
  carSync,
  ewMarket,
  noSupervise,
  statementFCZ,
  repaymentAmount
});
