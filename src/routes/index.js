import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import { PrimaryContainer, LastContainer } from '../views/EwAuditList';
import {
  EwDetailContainer,
  DisBondContainer,
  EwBondContainer,
  BondDetailContainer,
  EwOnlineDetail,
  EwOnlineList,
} from '../views/Ledger';
import { TransferInContainer, TransferOutContainer } from '../views/BondManagement';
import PrintManagementContainer from '../views/PrintManagement';
import ConfirmReceiptRouter from '../views/ConfirmReceipt';
import CarSearchEngineRouter from '../views/CarSearchEngine';
import RepoAuditRouter from '../views/RepoAudit';
import {
  EwSaleRinkContainer,
  DealerSaleRinkContainer,
  CarMovingContainer,
  CarSalesContainer,
  CheckedDetailContainer,
  RegionManagement,
} from '../views/CarFactoryManagement';

import TaskSummaryContainer from '../views/TaskSummary';
import SpotExceptionTrace, { movingExceptionRouter } from '../views/ExceptionTraceAction';
import SpottestAudit from '../views/SpottestAudit';
import MultipleAccount from '../views/MultipleAccount';
import OrderManagementTRouter from '../views/EwOrderManagement';
import SpotMoveStatList from '../views/SpotMoveStatList';
import SuperviseRouter from '../views/Supervise';
import SoldConfirm from '../views/SelfCar/SoldConfirmPage';
import SelfCarMgPage from '../views/SelfCar/SelfCarMgPage';
import MoveRecord from '../views/SelfCar/MoveRecordPage/MoveRecordContainer';
import LocaManage from '../views/SelfCar/LocaManagePage/LocaManageContainer';
import Regionalism from '../views/SelfCar/RegionalismPage';
import ExcUploadAll from '../views/SelfCar/ExcUploadAllPage';
import SelfCarSpottestRouter from '../views/SelfCar/SpottestPage';
import ExcUploadAdd from '../views/SelfCar/ExcUploadAddPage';
import SelfCarBrandPage from '../views/SelfCar/SelfCarBrandPage';
import ParamsSetting from '../views/SelfCar/ParamsSetting';
import CarPhoTemp from '../views/SelfCar/CarPhoTemp';
import ExceSetting from '../views/SelfCar/ExceSetting';
import StandMang from '../views/SelfCar/StandMang';
import CredPhoTemp from '../views/SelfCar/CredPhoTemp';
import ClientManagement from '../views/ClientManagement/ClientManagement';
import CameraList from '../views/ClientManagement/CameraList';
import MonitorManagementRouter from '../views/MonitorManagement/MonitorManagementRouter';
import DisDepositRouter, { SpotEwBlackRouter, NoSpotCarRouter, ewChargeRouter } from '../views/AntiCheat';
import AntiCheatRouter from '../views/AntiCheat';
import SelfcarCheatRouter from '../views/SelfCar/AntiCheat/index';
import FinancialPro from '../views/SelfCar/FinancialPro/FinProPage';
import RoleManagementRouter from '../views/RoleManagement';
import UploadWarning from '../views/AntiCheat/Warning';
import DealerList from '../views/UserinfoMana';
import CarStatistics from '../views/AntiCheat/carStatistics';
import CarMatching from '../views/AntiCheat/CarMatching';
import CarMatching_JF from '../views/AntiCheat/CarMatching_JF';
import KeyPointSpot from '../views/AntiCheat/KeyPointSpot';
import CarDataUpload from '../views/AntiCheat/CarDataUpload';
import CarSync from '../views/AntiCheat/Sync';
import EwMarket from '../views/AntiCheat/EwMarket';
import NoSupervise from '../views/AntiCheat/NoSupervise';
import CarAction from '../views/AntiCheat/CarAction';
import NoSuperviseList from '../views/AntiCheat/NoSuperviseList';
import NoSuperviseBatch from '../views/AntiCheat/NoSuperviseBatch';
import StatementFCZ from '../views/AntiCheat/StatementFCZ';
import RepaymentAmount from '../views/AntiCheat/RepaymentAmount';
import CarBillContrast from '../views/AntiCheat/CarBillContrast';
class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/multipleAccount" component={MultipleAccount} />
        <Route path="/spottestAuditLedger" component={SpottestAudit} />
        <Route path="/spottestAudit" component={SpottestAudit} />
        <Route path="/movingException" component={movingExceptionRouter} />
        <Route path="/spotException" component={SpotExceptionTrace} />
        <Route path="/primaryAudit" component={PrimaryContainer} />
        <Route path="/lastAudit" component={LastContainer} />
        <Route path="/transferIn" component={TransferInContainer} />
        <Route path="/transferOut" component={TransferOutContainer} />
        <Route path="/printManagement" component={PrintManagementContainer} />
        <Route path="/confirmReceiptList" component={ConfirmReceiptRouter} />
        <Route path="/ewDetail" component={EwDetailContainer} />
        <Route path="/disBond" component={DisBondContainer} />
        <Route path="/ewBond" component={EwBondContainer} />
        <Route path="/bondDetail" component={BondDetailContainer} />
        <Route path="/ewOnlineList" component={EwOnlineList} />
        <Route path="/ewOnlineDetail" component={EwOnlineDetail} />
        <Route path="/taskSummary" component={TaskSummaryContainer} />
        <Route path="/carSearchEngine" component={CarSearchEngineRouter} />
        <Route path="/repoAuditFirst" component={RepoAuditRouter} />
        <Route path="/repoAuditLast" component={RepoAuditRouter} />
        <Route path="/carMoving" component={CarMovingContainer} />
        <Route path="/checkedDetail" component={CheckedDetailContainer} />
        <Route path="/carSales" component={CarSalesContainer} />
        <Route path="/ewSaleRink" component={EwSaleRinkContainer} />
        <Route path="/dealerSaleRink" component={DealerSaleRinkContainer} />
        <Route path="/regionManagement" component={RegionManagement} />
        <Route path="/orderManagement" component={OrderManagementTRouter} />
        <Route path="/invoiceManagement" component={OrderManagementTRouter} />
        <Route path="/refundManagement" component={OrderManagementTRouter} />
        <Route path="/spotMove" component={SpotMoveStatList} />
        <Route path="/importView" component={SuperviseRouter} />
        <Route path="/superviseManager" component={SuperviseRouter} />
        <Route path="/superviseCompany" component={SuperviseRouter} />
        <Route path="/specialDealer" component={SuperviseRouter} />
        <Route path="/superviseParam" component={SuperviseRouter} />
        <Route path="/superviseParam" component={SuperviseRouter} />
        <Route path="/soldConfirm" component={SoldConfirm} />
        <Route path="/selfCarMgPage" component={SelfCarMgPage} />
        <Route path="/moveRecord" component={MoveRecord} />
        <Route path="/locaManage" component={LocaManage} />
        <Route path="/superviseAmount" component={SuperviseRouter} />
        <Route path="/clientManagement" component={ClientManagement} />
        <Route path="/cameraList" component={CameraList} />
        <Route path="/repositoryList" component={MonitorManagementRouter} />
        <Route path="/spotEwBlack" component={SpotEwBlackRouter} />
        <Route path="/repositoryWarning" component={MonitorManagementRouter} />
        <Route path="/regionalism" component={Regionalism} />
        <Route path="/excUploadAll" component={ExcUploadAll} />
        <Route path="/commonTask" component={SelfCarSpottestRouter} />
        <Route path="/movingTask" component={SelfCarSpottestRouter} />
        <Route path="/certificateTask" component={SelfCarSpottestRouter} />
        <Route path="/excUploadAdd" component={ExcUploadAdd} />
        <Route path="/selfCarBrand" component={SelfCarBrandPage} />
        <Route path="/paramsSetting" component={ParamsSetting} />
        <Route path="/carPhoTemp" component={CarPhoTemp} />
        <Route path="/exceSetting" component={ExceSetting} />
        <Route path="/standMang" component={StandMang} />
        <Route path="/credPhoTemp" component={CredPhoTemp} />
        <Route path="/clientManagement" component={ClientManagement} />
        <Route path="/cameraList" component={CameraList} />
        <Route path="/repositoryList" component={MonitorManagementRouter} />
        <Route path="/financialPro" component={FinancialPro} />
        <Route path="/antiCheat" component={AntiCheatRouter} />
        <Route path="/selfcarCheat" component={SelfcarCheatRouter} />
        <Route path="/storeManagement" component={RoleManagementRouter} />
        <Route path="/noSpotCar" component={NoSpotCarRouter} />
        <Route path="/ewCharge" component={ewChargeRouter} />
        <Route path="/disDeposit" component={DisDepositRouter} />
        <Route path="/uploadWarning" component={UploadWarning} />
        <Route path="/supplyMana" component={UploadWarning} />
        <Route path="/brandMana" component={UploadWarning} />
        <Route path="/paraSetting" component={UploadWarning} />
        <Route path="/statAnalysis" component={UploadWarning} />
        <Route path="/warningMes" component={UploadWarning} />
        <Route path="/dealerList" component={DealerList} />
        <Route path="/ewList" component={DealerList} />
        <Route path="/carStatistics" component={CarStatistics} />
        <Route path="/uploadMatch" component={CarMatching} />
        <Route path="/collectMatch" component={CarMatching} />
        <Route path="/thirdMatch" component={CarMatching} />
        <Route path="/matchList" component={CarMatching} />
        <Route path="/uploadMatch_JF" component={CarMatching_JF} />
        <Route path="/collectMatch_JF" component={CarMatching_JF} />
        <Route path="/thirdMatch_JF" component={CarMatching_JF} />
        <Route path="/matchList_JF" component={CarMatching_JF} />
        <Route path="/warningBrandMana" component={UploadWarning} />
        <Route path="/keyPointSpot" component={KeyPointSpot} />
        <Route path="/carChengType" component={CarDataUpload} />
        <Route path="/carSystemType" component={CarDataUpload} />
        <Route path="/carReturnType" component={CarDataUpload} />
        <Route path="/carSync" component={CarSync} />
        <Route path="/marketList" component={EwMarket} />
        <Route path="/marketFirst" component={EwMarket} />
        <Route path="/marketRecheck" component={EwMarket} />
        <Route path="/marketAwardCheck" component={EwMarket} />
        <Route path="/marketAwardRemit" component={EwMarket} />
        <Route path="/noSupervise" component={NoSupervise} />
        <Route path="/CarAction_Dis" component={CarAction} />
        <Route path="/CarAction_Bank" component={CarAction} />
        <Route path="/noSuperviseList" component={NoSuperviseList} />
        <Route path="/noSuperviseBatch" component={NoSuperviseBatch} />
        <Route path="/daoqiFCZ" component={StatementFCZ} />
        <Route path="/carCollectFCZ" component={StatementFCZ} />
        <Route path="/settingFCZ" component={StatementFCZ} />
        <Route path="/uploadFCZ" component={StatementFCZ} />
        <Route path="/ledgerFCZ" component={StatementFCZ} />
        <Route path="/policyFCZ" component={StatementFCZ} />
        <Route path="/dealerFCZ" component={StatementFCZ} />
        <Route path="/usedCarFCZ" component={StatementFCZ} />
        <Route path="/supervisorFCZ" component={StatementFCZ} />
        <Route path="/repaymentAmount" component={RepaymentAmount} />
        <Route path="/carBillContrast" component={CarBillContrast} />
        <Route path="/listUnsupervised" component={NoSuperviseBatch} />
        <Route path="/" component={Dashboard} />
      </Switch >
    );
  }
}
export default withRouter(Router);
