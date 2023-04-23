import * as FormItems from './formItem';
import * as CarItems from './carUploadItem';
import * as MarketItems from './ewMarketItem';
import * as SuperviseItems from './noSuperviseItem';
import * as fczItem from './fczItem';
import * as carBillContrastItem from './carBillContrastItem';
export default function aitiCheatFormGroup(path) {
  let group = [];
  switch (path) {
    case '/antiCheat':
      group = [FormItems.examCodeFormItem, FormItems.examTimeFormItem];
      break;
    case '/spotEwBlack':
      group = [FormItems.ewNameFormItem, FormItems.statusTypeFormItem];
      break;
    case '/noSpotCar':
      group = [FormItems.bankName, FormItems.distributorName, FormItems.chassis, FormItems.carStatusName];
      break;
    case '/ewCharge':
      group = [
        FormItems.distributorName,
        FormItems.ewNameFormItem,
        FormItems.brandName,
        FormItems.bankName,
        FormItems.isfirstFormItem,
        FormItems.unassociateFlag,
      ];
      break;
    case '/disDeposit':
      group = [FormItems.distributorName];
      break;
    case '/disDeposit/detail/:id':
      group = [FormItems.oddType, FormItems.oddNum, FormItems.renewFlag];
      break;
    case '/disDeposit/flow/:id':
      group = [FormItems.adjustType, FormItems.oddNum];
      break;
    case '/statAnalysis/expend':
      group = [FormItems.dealerName, FormItems.monthFormItem];
      break;
    case '/statAnalysis/redem':
      group = [FormItems.dealerName, FormItems.monthFormItem, FormItems.noRepaymentDays];
      break;
    case '/statAnalysis/shiftA':
      group = [FormItems.dealerName, FormItems.importFormItem];
      break;
    case '/statAnalysis/trade':
      group = [FormItems.dealerName, FormItems.importFormItem];
      break;
    case '/statAnalysis/return':
      group = [FormItems.dealerName, FormItems.monthFormItem];
      break;
    case '/warningMes':
      group = [FormItems.dealerName, FormItems.monthFormItem];
      break;
    case '/carStatistics':
      group = [FormItems.fileType];
      break;
    case '/collectMatch':
      group = [
        FormItems.dealerName,
        FormItems.remainingAmount,
        FormItems.statusCode,
        FormItems.billNo,
        FormItems.importFormItem1,
        FormItems.invoiceDate,
        FormItems.dueDate,
        FormItems.subAccountNo,
        FormItems.businessNo,
      ];
      break;
    case '/thirdMatch':
      group = [
        FormItems.dealerName,
        FormItems.thirdMatchCode,
        FormItems.vin,
        FormItems.businessNo,
        FormItems.importFormItem1,
        FormItems.hxDate,
        FormItems.billNo1,
        FormItems.推送状态,
      ];
      break;
    case '/matchList':
      group = [
        FormItems.matchedDate,
        FormItems.hxDate,
        FormItems.billNo,
        FormItems.dealerName,
        FormItems.vin,
        FormItems.businessNo,
      ];
      break;
    case '/warningBrandMana':
      group = [FormItems.dealerName, FormItems.cooperateStatus];
      break;
    case '/collectMatch_JF':
      group = [
        FormItems.dealerName,
        FormItems.remainingAmount,
        FormItems.statusCode,
        FormItems.billNo,
        FormItems.importFormItem1,
        FormItems.invoiceDate,
        FormItems.dueDate,
        FormItems.subAccountNo,
        FormItems.businessNo,
      ];
      break;
    case '/thirdMatch_JF':
      group = [
        FormItems.dealerName,
        FormItems.thirdMatchCode,
        FormItems.vin,
        FormItems.businessNo,
        FormItems.importFormItem1,
        FormItems.outboundDate,
        FormItems.billNo1,
        FormItems.推送状态,
      ];
      break;
    case '/matchList_JF':
      group = [FormItems.matchedDate, FormItems.fcDate, FormItems.dealerName, FormItems.vin, FormItems.businessNo];
      break;
    case '/carChengType/list':
      group = [CarItems.distributorName, CarItems.chassis, CarItems.statusCheng, CarItems.supplyChain];
      break;
    case '/carSystemType/list':
      group = [CarItems.distributorName, CarItems.chassis, CarItems.flag, CarItems.brandName, CarItems.bankName];
      break;
    case '/carReturnType/list':
      group = [CarItems.custname, CarItems.chassis, CarItems.statusReturn, CarItems.bankName];
      break;
    case '/carChengType/detail/:id':
      group = [
        CarItems.distributorName,
        CarItems.chassis,
        CarItems.supplyChain,
        CarItems.statusCheng,
        CarItems.lrTime,
        CarItems.remark,
      ];
      break;
    case '/carSystemType/detail/:id':
      group = [
        CarItems.distributorName,
        CarItems.chassis,
        CarItems.brandName,
        CarItems.flag,
        CarItems.lrTime,
        CarItems.remark,
      ];
      break;
    case '/carReturnType/detail/:id':
      group = [
        CarItems.custname,
        CarItems.chassis,
        CarItems.tradername,
        CarItems.statusReturn,
        // CarItems.lrTime,
        CarItems.remark,
      ];
      break;
    default:
      break;
  }
  if (
    ['/marketList', '/marketFirst/marketFirstList', '/marketFirst/marketFirstAbnormal', '/marketRecheck'].includes(path)
  ) {
    group = [
      MarketItems.经销商,
      MarketItems.创建时间,
      MarketItems.任务状态,
      MarketItems.最后提交时间,
      MarketItems.品牌,
      MarketItems.二网名称,
      MarketItems.汽车厂商,
      // MarketItems.二网联系人,
      MarketItems.车架号,
    ];
  }
  if (['/marketAwardCheck', '/marketAwardRemit/awardRemitTodo', '/marketAwardRemit/awardRemitDone'].includes(path)) {
    group = [MarketItems.经销商, MarketItems.二网名称, MarketItems.车架号];
  }
  if (['/noSupervise/jieSupervise'].includes(path)) {
    group = [SuperviseItems.经销商, SuperviseItems.标识, SuperviseItems.任务下发时间, SuperviseItems.任务拍照时间];
  }
  if (['/noSupervise/pangSupervise'].includes(path)) {
    group = [
      SuperviseItems.经销商,
      SuperviseItems.标识,
      SuperviseItems.任务类型,
      SuperviseItems.审核状态,
      SuperviseItems.任务下发时间,
      SuperviseItems.任务拍照时间,
    ];
  }
  if (['/CarAction_Bank'].includes(path)) {
    group = [FormItems.distributorName, FormItems.汇总周期];
  }
  if (['/noSuperviseList/taskList'].includes(path)) {
    group = [FormItems.distributorName, FormItems.抽查日期, FormItems.状态];
  }
  if (path.indexOf('/noSuperviseBatch/detail') > -1) {
    group = [FormItems.盘车任务下发结果, FormItems.盘证下发任务结果];
  }
  if (['/carCollectFCZ'].includes(path)) {
    group = [
      fczItem.经销商名称,
      fczItem.标识,
      fczItem.业务编号,
      fczItem.备注,
      fczItem.押品状态,
      fczItem.监管方状态,
      fczItem.状态是否一致,
    ];
  }
  if (path.startsWith('/carSync/disExposure')) {
    group = [FormItems.经销商名称, FormItems.业务编号, FormItems.createDate];
  }
  if (path.startsWith('/carSync/disSettlement')) {
    group = [FormItems.业务编号, FormItems.createDate];
  }
  if (path.startsWith('/carSync/carDis')) {
    group = [FormItems.客户名称, FormItems.createDate];
  }
  if (path.startsWith('/carSync/disAccounting')) {
    group = [FormItems.客户名称, FormItems.业务编号, FormItems.融资模式, FormItems.createDate];
  }
  if (['/carSync/carIn'].includes(path)) {
    group = [FormItems.经销商名称, FormItems.业务编号, FormItems.vin, FormItems.createDate, FormItems.入库时间];
  }
  if (['/carSync/carOut'].includes(path)) {
    group = [FormItems.经销商名称, FormItems.业务编号, FormItems.vin, FormItems.createDate, FormItems.释放时间];
  }
  if (['/carSync/carSend', '/carSync/carReturn'].includes(path)) {
    group = [FormItems.经销商名称, FormItems.业务编号, FormItems.标识, FormItems.createDate];
  }
  if (path == '/repaymentAmount/dealer') {
    group = [FormItems.monthFormItem, FormItems.经销商名称1];
  }
  if (['/repaymentAmount/supplyChain', '/repaymentAmount/brand'].includes(path)) {
    group = [FormItems.monthFormItem];
  }
  if (['/ledgerFCZ'].includes(path)) {
    group = [FormItems.生成日期];
  }
  if (['/policyFCZ'].includes(path)) {
    group = [FormItems.客户经理, FormItems.经销商名称1];
  }
  if (['/dealerFCZ'].includes(path)) {
    group = [FormItems.经销商名称1];
  }
  if (['/usedCarFCZ'].includes(path)) {
    group = [FormItems.经销商名称1, FormItems.车辆识别代码];
  }
  if (['/supervisorFCZ'].includes(path)) {
    group = [FormItems.客户名称, FormItems.客户经理, FormItems.是否撤监管];
  }
  if (['/carBillContrast'].includes(path)) {
    group = [FormItems.distributorName, FormItems.赎车日期, FormItems.开票日期];
  }
  if (path.indexOf('/carBillContrast/detail') > -1) {
    group = [
      carBillContrastItem.系统赎车日期,
      carBillContrastItem.百望开票日期,
      carBillContrastItem.航天金税开票日期,
      carBillContrastItem.系统赎车日期内容,
      carBillContrastItem.百望开票日期内容,
      carBillContrastItem.航天金税开票日期内容,
      carBillContrastItem.赎车是否超3天,
      carBillContrastItem.未开票天数,
      carBillContrastItem.车架号,
    ];
  }
  if (['/listUnsupervised'].includes(path)) {
    group = [FormItems.distributorName];
  }
  if (['/CarAction_Dis/carList'].includes(path)) {
    group = [FormItems.标识, FormItems.业务编号, FormItems.createDate];
  }
  if (['/noSuperviseList/detail'].includes(path)) {
    group = [FormItems.distributorName, FormItems.chassis];
  }
  return group;
}
