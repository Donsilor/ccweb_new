import * as ColList from './columnItem';
import * as BfColList from './bondFlowColItem';
import * as OrderColList from './ewOrderColItem';
import * as InvoiceColList from './ewInvoiceColItem';
import * as monitorColList from './monitorColumnItem';

export default function ewAuditTableColumn(path) {
  let columns = [];
  switch (path) {
    case '/storeManagement/distributor':
      columns = [
        ColList.distributorNameColumn,
        ColList.accidColumn,
        ColList.operatorColumn,
        ColList.telNumColumn,
        ColList.actionTimeColumn,
        ColList.actionUserColumn,
        ColList.microShopStatusColumn,
        ColList.actionColumn,
      ];
      break;
    case '/storeManagement/ew':
      columns = [
        ColList.distributorNameColumn,
        ColList.ewNameColumn,
        ColList.accidColumn,
        ColList.operatorColumn,
        ColList.telNumColumn,
        ColList.actionTimeColumn,
        ColList.actionUserColumn,
        ColList.microShopStatusColumn,
        ColList.actionColumn,
      ];
      break;
    case '/specialDealer':
      columns = [
        ColList.companyColumn,
        ColList.brandColumn,
        ColList.dealerColumn,
        ColList.createdTimeColumn,
        ColList.updatedTimeColumn,
        ColList.startColumn,
        ColList.endColumn,
        ColList.statusColumn,
        ColList.actionColumn,
      ];
      break;
    case '/superviseManager':
      columns = [
        ColList.logCreatedTimeColumn,
        ColList.dayForWeekColumn,
        ColList.dealerCntColumn,
        ColList.vehicleCntColumn,
        ColList.actionColumn,
      ];
      break;
    case '/spottestAudit/list/spotTask':
      columns = [
        ColList.spottestIdColumn,
        ColList.distributorNameColumn, // 经销商名称
        ColList.spottesttypeColumn, //抽查类型
        ColList.spotDescriptionColumn, //抽查描述
        ColList.brandNameColumn, // 品牌名称
        ColList.bookTimeColumn, //任务下发时间
        ColList.teskBuildTimeColumn, //任务建立时间
        ColList.spotConfirmTimeColumn, //抽查确认时间
        ColList.spotConfirmTypeColumn, //抽查确认类型
        ColList.bankNameColumn, // 银行名称
        ColList.orSubtaskColumn, //是否子任务
      ];
      break;
    case '/spottestAudit/list/moveTask':
      columns = [
        ColList.spottestIdColumn,
        ColList.moveSpottestIdColumn,
        ColList.distributorNameColumn, // 经销商名称
        ColList.spottesttypeColumn,
        ColList.brandNameColumn, // 品牌名称
        ColList.bookTimeColumn,
        ColList.carMoveApplyTimeColumn, //车辆移动申请时间
        ColList.spotConfirmTypeColumn,
        ColList.bankNameColumn, // 银行名称
        ColList.orSubtaskColumn,
      ];
      break;
    case '/spottestAudit/list/timeOut':
      columns = [
        ColList.spottestIdColumn,
        ColList.distributorNameColumn, // 经销商名称
        ColList.spottesttypeColumn,
        ColList.spotDescriptionColumn, //抽查描述
        ColList.brandNameColumn, // 品牌名称
        ColList.bookTimeColumn,
        ColList.teskBuildTimeColumn,
        ColList.spotConfirmTimeColumn, //
        ColList.spotConfirmTypeColumn,
        ColList.bankNameColumn, // 银行名称 
        ColList.orSubtaskColumn,
      ];
      break;
    case '/spottestAudit/list/todoComplete':
      columns = [
        ColList.spottestIdColumn,
        ColList.moveSpottestIdColumn,
        ColList.distributorNameColumn, // 经销商名称
        ColList.spottesttypeColumn, //抽查类型
        ColList.spotDescriptionColumn, //抽查描述
        ColList.brandNameColumn, // 品牌名称
        ColList.bookTimeColumn, //任务下发时间
        ColList.carMoveApplyTimeColumn, //车辆移动申请时间
        ColList.teskBuildTimeColumn, //任务建立时间
        ColList.spotConfirmTimeColumn, //抽查确认时间
        ColList.spotConfirmTypeColumn, //抽查确认类型
        ColList.bankNameColumn, // 银行名称  
        ColList.orSubtaskColumn, //是否子任务
      ];
      break;
    case '/spotException':
      columns = [
        ColList.distributorNameColumn,
        ColList.ewNameColumn,
        ColList.chassisColumn,
        ColList.bookTimeColumn,
        ColList.ptNotPassFlagColumn,
        ColList.ptRemarkExcColumn,
        ColList.spottestIdColumn,
        ColList.bankNameColumn,
      ];
      break;
    case '/movingException':
      columns = [
        ColList.distributorNameColumn,
        ColList.ewNameColumn,
        ColList.chassisColumn,
        ColList.bookTimeColumn,
        ColList.ptNotPassFlagColumn,
        ColList.ptRemarkExcColumn,
        ColList.spottestIdColumn,
        ColList.bankNameColumn,
      ];
      break;
    case '/dealerSaleRink':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.regionNameColumn, // 大区
        ColList.subRegionNameColumn, // 大区
        ColList.fldSerialName2Column, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.distributorLocationColumn, //经销商所在地区
      ];
      break;
    case '/ewSaleRink':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.regionNameColumn, // 大区
        ColList.subRegionNameColumn, // 大区
        ColList.fldSerialName2Column, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.distributorLocationColumn, //经销商所在地区
        ColList.ewNameColumn, // 二网名称
        ColList.ewLocationColumn, //二网所在地区
      ];
      break;
    case '/carMoving':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.regionNameColumn, // 大区
        ColList.subRegionNameColumn, // 大区
        ColList.province3Column, // 省份
        ColList.city3Column, //城市
        ColList.countyNameColumn, // 地区
        ColList.fldSerialName2Column, //品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.ewNumColumn, //二网数量，
        ColList.mortgageCarNumColumn, //抵/质押车总数
        ColList.allowMoveCarNumColumn, //审批允许移动总台数
        ColList.ewFactMoveCarColumn, //二网实际移动台数
        ColList.ewMoveCarRatioColumn, //二网移动车辆比例
        ColList.foreclosureCarNumColumn, //赎回车辆数量
        ColList.salesNumColumn, //销售总数量
        ColList.ewSalesNumColumn, //二网销量
        ColList.ewSalesRatio2Column, //二网销量占比
        ColList.rawMoveCarRatioColumn, //原20%移车比例
        ColList.ewMoveCarIncrementColumn, //二网移车增量
      ];
      break;
    case '/checkedDetail':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.regionNameColumn, // 大区
        ColList.subRegionNameColumn, // 大区
        ColList.province3Column, // 省份
        ColList.city3Column, // 城市
        ColList.countyNameColumn, // 地区
        ColList.fldSerialName2Column, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewLocationColumn, // 二网所在地区
        ColList.fldModelColumn, // 车系
        ColList.fldTrimInfoColumn, // 车型名称
        ColList.chassisColumn, // 车架号
        ColList.moveintimeColumn, // 末次移动时间
        ColList.buytimeColumn, // 赎车时间
        ColList.showtimeColumn, // 销售时间
      ];
      break;
    case '/carSales':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialName2Column, // 品牌名称
        ColList.fldModelColumn, // 车系
        ColList.fldTrimInfoColumn, // 车型名称
      ];
      break;
    case '/primaryAudit/list/todoList':
      columns = [
        ColList.idColumn, //任务号
        ColList.distributorNameColumn, // 经销商名称
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewTypeColumn, // 二网类型
        ColList.isChainStoreColumn, // 是否直营
        ColList.isfirstColumn, // 业务类型 （是否续作）
        ColList.depositAmountColumn, // 保证金
        ColList.moveNumColumn, // 移动台数
        ColList.moveMoneyColumn, // 移动金额
        ColList.disApplyTimeColumn, // 经销商申请时间
        ColList.contractTypeColumn, // 合同类型
        ColList.isContractChangeColumn, // 是否变更
        ColList.isExceptionColumn, // 是否存在异常
        ColList.statusNameColumn, // 业务状态
        ColList.operationColumn(path), // 操作
      ];
      break;
    case '/primaryAudit/list/expList':
      columns = [
        ColList.idColumn, //任务号
        ColList.distributorNameColumn, // 经销商名称
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewTypeColumn, // 二网类型
        ColList.isChainStoreColumn, // 是否直营
        ColList.isfirstColumn, // 业务类型 （是否续作）
        ColList.depositAmountColumn, // 保证金
        ColList.moveNumColumn, // 移动台数
        ColList.moveMoneyColumn, // 移动金额
        ColList.contractTypeColumn, // 合同类型
        ColList.isContractChangeColumn, // 是否变更
        ColList.exceptionTimeColumn, // 最新异常时间
        ColList.statusNameColumn, // 业务状态
        ColList.operationColumn(path, 'right', '查看'), // 操作
      ];
      break;
    case '/primaryAudit/list/todoListForDistr':
      columns = [
        ColList.idColumn, //任务号
        ColList.distributorNameColumn, // 经销商名称
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewTypeColumn, // 二网类型
        ColList.isChainStoreColumn, // 是否直营
        ColList.isfirstColumn, // 业务类型 （是否续作）
        ColList.depositAmountColumn, // 保证金
        ColList.moveNumColumn, // 移动台数
        ColList.moveMoneyColumn, // 移动金额
        ColList.contractTypeColumn, // 合同类型
        ColList.isContractChangeColumn, // 是否变更
        ColList.isExceptionColumn, // 是否存在异常
        ColList.statusNameColumn, // 业务状态
        ColList.operationColumn(path, 'right', '查看'), // 操作
      ];
      break;
    case '/primaryAudit/list/totalList':
      columns = [
        ColList.idColumn, //任务号
        ColList.distributorNameColumn, // 经销商名称
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewTypeColumn, // 二网类型
        ColList.isChainStoreColumn, // 是否直营
        ColList.disApplyTimeColumn, // 经销商申请时间
        ColList.ptAuditTimeColumn, // 初审通过时间
        ColList.firstTrialNameColumn, // 初审操作人
        ColList.bankAuditTimeColumn, // 复审通过时间
        ColList.lastTrialNameColumn, // 复审操作人
        ColList.isfirstColumn, // 业务类型 （是否续作）
        ColList.depositAmount2Column, // 保证金
        ColList.moveNumColumn, // 移动台数
        ColList.moveMoneyColumn, // 移动金额
        ColList.contractTypeColumn, // 合同类型
        ColList.contractIdColumn, //
        ColList.expressNumColumn, //
        ColList.contractSendTimeColumn, //
        ColList.contractConfirmTimeColumn, //
        ColList.receivedUserNameColumn, //
        ColList.isContractChangeColumn, // 是否变更
        ColList.isExceptionColumn, // 是否存在异常
        ColList.statusNameColumn, // 业务状态
        ColList.operationColumn(path, 'right', '查看'), // 操作
      ];
      break;
    case '/lastAudit/list/todoList':
      columns = [
        ColList.idColumn, //任务号
        ColList.distributorNameColumn, // 经销商名称
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewTypeColumn, // 二网类型
        ColList.isChainStoreColumn, // 是否直营
        ColList.isfirstColumn, // 业务类型 （是否续作）
        ColList.depositAmountColumn, // 保证金
        ColList.moveNumColumn, // 移动台数
        ColList.moveMoneyColumn, // 移动金额
        ColList.ptAuditTimeColumn, // 初审通过时间
        ColList.firstTrialNameColumn, // 初审操作人
        ColList.contractTypeColumn, // 合同类型
        ColList.isContractChangeColumn, // 是否变更
        ColList.isExceptionColumn, // 是否存在异常
        ColList.operationColumn(path), // 操作
      ];
      break;
    case '/lastAudit/list/expList':
      columns = [
        ColList.idColumn, //任务号
        ColList.distributorNameColumn, // 经销商名称
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewTypeColumn, // 二网类型
        ColList.isChainStoreColumn, // 是否直营
        ColList.isfirstColumn, // 业务类型 （是否续作）
        ColList.depositAmountColumn, // 保证金
        ColList.moveNumColumn, // 移动台数
        ColList.moveMoneyColumn, // 移动金额
        ColList.contractTypeColumn, // 合同类型
        ColList.isContractChangeColumn, // 是否变更
        ColList.exceptionTimeColumn, // 最新异常时间
        ColList.statusNameColumn, // 业务状态
        ColList.operationColumn(path, 'right', '查看'), // 操作
      ];
      break;
    case '/lastAudit/list/totalList':
      columns = [
        ColList.idColumn, //任务号
        ColList.distributorNameColumn, // 经销商名称
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewTypeColumn, // 二网类型
        ColList.isChainStoreColumn, // 是否直营
        ColList.disApplyTimeColumn, // 经销商申请时间
        ColList.ptAuditTimeColumn, // 初审通过时间
        ColList.firstTrialNameColumn, // 初审操作人
        ColList.bankAuditTimeColumn, // 复审通过时间
        ColList.lastTrialNameColumn, // 复审操作人
        ColList.isfirstColumn, // 业务类型 （是否续作）
        ColList.depositAmountColumn, // 保证金
        ColList.moveNumColumn, // 移动台数
        ColList.moveMoneyColumn, // 移动金额
        ColList.contractTypeColumn, // 合同类型
        ColList.contractIdColumn, //
        ColList.expressNumColumn, //
        ColList.contractSendTimeColumn, //
        ColList.contractConfirmTimeColumn, //
        ColList.receivedUserNameColumn, //
        ColList.isContractChangeColumn, // 是否变更
        ColList.statementReceivedColumn, //
        ColList.isExceptionColumn, // 是否存在异常
        ColList.isExportColumn, // 是否导出
        ColList.statusNameColumn, // 业务状态
        ColList.operationColumn(path, 'right', '查看'), // 操作
      ];
      break;
    case '/ewSummary':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.firstTimesColumn,
        ColList.firstPtPassTimesColumn,
        ColList.firstBankPassTimesColumn,
        ColList.continueTimesColumn,
        ColList.continuePtPassTimesColumn,
        ColList.continueBankPassTimesColumn,
        ColList.exceptionTimesColumn,
      ];
      break;
    case '/ewDetail':
      columns = [
        ColList.idColumn, //任务号
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.ewNameColumn, // 二网名称
        ColList.ewParentNameColumn, // 所属二网
        ColList.ewAreaColumn,
        ColList.isChainStoreColumn, // 是否直营
        ColList.isfirstColumn, // 业务类型 （是否续作）
        BfColList.isEmptyColumn, //
        ColList.moneyGetTypeColumn, //
        ColList.depositAmountColumn, // 保证金
        ColList.moveNumColumn, // 移动台数
        ColList.moveMoneyColumn, // 移动金额
        ColList.isSignColumn, // 是否签订三方协议
        ColList.startTimeColumn, // 合同开始时间
        ColList.endTimeColumn, // 合同终止时间
        ColList.disApplyTimeColumn, // 经销商申请时间
        ColList.ptAuditTimeColumn, // 初审通过时间
        ColList.bankAuditTimeColumn, // 复审通过时间
        ColList.contractIdColumn,
        ColList.expressNumColumn,
        ColList.contractSendTimeColumn,
        ColList.contractTypeColumn, // 合同类型
        ColList.isContractChangeColumn, // 是否变更
        ColList.isExceptionColumn, // 是否存在异常
        ColList.statusNameColumn, // 业务状态
      ];
      break;
    case '/disBond':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.bondAccountColumn, //
        ColList.pointsAccountColumn, //
        ColList.provinceColumn, // 省
        ColList.cityColumn, // 市
        ColList.depositAmountDisBondColumn, // 保证金
        ColList.ewNumColumn, // 二网数量
      ];
      break;
    case '/ewBond':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.ewNameColumn, // 二网名称
        BfColList.isEmptyColumn, //
        ColList.moneyGetTypeColumn, //
        ColList.depositAmountEwBondColumn, // 保证金
        ColList.inMoneyColumn, //
        ColList.outMoneyColumn, //
      ];
      break;
    case '/bondDetail':
      columns = [
        ColList.idColumn, //任务号
        ColList.bankNameColumn, // 银行名称
        ColList.fldSerialNameColumn, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        ColList.ewNameColumn, // 二网名称
        ColList.provinceColumn, // 省
        ColList.cityColumn, // 市
        ColList.isChainStoreColumn, // 是否直营
        // ColList.isfirstColumn, // 业务类型 （是否续作）
        BfColList.isEmptyColumn, //
        ColList.moneyGetTypeColumn, //
        ColList.bondTypeColumn, //
        ColList.depositAmountBondDetailColumn, // 保证金
        ColList.ptAuditDepositTimeColumn, // 平台审核保证金时间
        ColList.saveDateColumn, // 保证金存入时间
        ColList.statusNameColumn, // 业务状态
        // ColList.bondDetailOperColumn(path, 'right', '查看') // 操作
      ];
      break;
    case '/ewOnlineList':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.distriNumColumn, // 经销商数量
        ColList.ewNumColumn, // 二网数量
      ];
      break;
    case '/ewOnlineDetail':
      columns = [
        ColList.bankNameColumn, // 银行名称
        ColList.brandNameColumn, // 品牌名称
        ColList.dealerNameColumn, // 经销商名称
        ColList.province2Column, // 省
        ColList.city2Column, // 市
        ColList.isfirstNumColumn,
        ColList.sequelNumColumn,
        ColList.relieveNumColumn,
        ColList.firstReviewPassNumColumn,
        ColList.sequelReviewPassNumColumn,
        ColList.relieveReviewPassNumColumn,
        ColList.jointEwNumColumn,
      ];
      break;
    case '/orderManagement/list/todoOrderList':
      columns = [
        OrderColList.orderNoColumn,
        OrderColList.orderBuyUserIdColumn,
        OrderColList.orderDepartNameColumn,
        OrderColList.orderNull3Column,
        OrderColList.orderTypeColumn,
        OrderColList.orderSourceColumn,
        OrderColList.orderNull1Column,
        OrderColList.payChannel,
        OrderColList.orderAmountTotalColumn,
        OrderColList.orderDiscountRateColumn,
        OrderColList.orderDiscountPriceColumn,
        OrderColList.createTimeColumn,
        OrderColList.orderEffectiveTimeIntervalColumn,
        OrderColList.orderCreateUserNameColumn,
        OrderColList.orderActionColumn,
      ];
      break;
    case '/orderManagement/list/doneOrderList':
      columns = [
        OrderColList.orderNoColumn,
        OrderColList.orderBuyUserIdColumn,
        OrderColList.orderDepartNameColumn,
        OrderColList.orderNull3Column,
        OrderColList.orderTypeColumn,
        OrderColList.orderSourceColumn,
        OrderColList.orderNull1Column,
        OrderColList.payChannel,
        OrderColList.orderAmountTotalColumn,
        OrderColList.orderDiscountRateColumn,
        OrderColList.orderDiscountPriceColumn,
        OrderColList.createTimeColumn,
        OrderColList.orderPayDateColumn,
        OrderColList.orderEffectiveStartDateColumn,
        OrderColList.orderEffectiveTimeIntervalColumn,
        OrderColList.orderEffectiveEndDateColumn,
        OrderColList.orderCreateUserNameColumn,
        OrderColList.orderActionColumn,
      ];
      break;
    case '/orderManagement/list/goneOrderList':
      columns = [
        OrderColList.orderNoColumn,
        OrderColList.orderBuyUserIdColumn,
        OrderColList.orderDepartNameColumn,
        OrderColList.orderNull3Column,
        OrderColList.orderTypeColumn,
        OrderColList.orderSourceColumn,
        OrderColList.orderNull1Column,
        OrderColList.payChannel,
        OrderColList.orderAmountTotalColumn,
        OrderColList.orderDiscountRateColumn,
        OrderColList.orderDiscountPriceColumn,
        OrderColList.refundAmount,
        OrderColList.createTimeColumn,
        OrderColList.orderPayDateColumn,
        OrderColList.orderEffectiveStartDateColumn,
        OrderColList.orderEffectiveTimeIntervalColumn,
        OrderColList.orderEffectiveEndDateColumn,
        OrderColList.orderCreateUserNameColumn,
        OrderColList.orderInvalidationTypeColumn,
        OrderColList.orderNull2Column,
        OrderColList.orderActionColumn,
      ];
      break;
    case '/invoiceManagement/list/todoInvoiceList':
      columns = [
        InvoiceColList.orderNoColumn,
        InvoiceColList.invoiceAccIdColumn,
        InvoiceColList.invoiceDepartNameColumn,
        InvoiceColList.invoiceCreateTimeColumn,
        InvoiceColList.invoiceApplyTimeColumn,
        InvoiceColList.orderAmount,
        InvoiceColList.invoicingMethodColumn,
        InvoiceColList.invoiceTypeColumn,
        InvoiceColList.invoiceActionColumn,
      ];
      break;
    case '/invoiceManagement/list/doneInvoiceList':
      columns = [
        InvoiceColList.orderNoColumn,
        InvoiceColList.invoiceAccIdColumn,
        InvoiceColList.invoiceDepartNameColumn,
        InvoiceColList.invoiceCreateTimeColumn,
        InvoiceColList.invoiceApplyTimeColumn,
        InvoiceColList.orderAmount,
        InvoiceColList.invoiceAmountColumn,
        InvoiceColList.invoicingMethodColumn,
        InvoiceColList.invoiceTypeColumn,
        InvoiceColList.invoiceHandleTimeColumn,
        InvoiceColList.invoiceHandleUserNameColumn,
        InvoiceColList.invoiceActionColumn,
      ];
      break;
    case '/refundManagement/list/todoRefundList':
      columns = [
        OrderColList.orderNoColumn,
        OrderColList.orderBuyUserIdColumn,
        OrderColList.orderDepartNameColumn,
        OrderColList.orderNull3Column,
        OrderColList.orderTypeColumn,
        OrderColList.orderSourceColumn,
        OrderColList.orderNull1Column,
        OrderColList.orderAmount, //订单金额
        OrderColList.createTimeColumn,
        OrderColList.orderPayDateColumn,
        OrderColList.orderEffectiveStartDateColumn,
        OrderColList.orderEffectiveTimeIntervalColumn,
        OrderColList.orderEffectiveEndDateColumn,
        OrderColList.refundApplTime, //退款申请时间
        OrderColList.orderCreateUserNameColumn,
        OrderColList.orderActionColumn,
      ];
      break;
    case '/superviseAmount/list/dealerAmount':
      columns = [
        ColList.companyColumn,
        ColList.brandColumn,
        ColList.dealerColumn,
        ColList.isSpecialColumn,
        ColList.cntByMonthColumn,
        ColList.cntByWeekColumn,
      ];
      break;
    case '/superviseAmount/list/vehicleAmount':
      columns = [
        ColList.companyColumn,
        ColList.brandColumn,
        ColList.dealerColumn,
        ColList.vinColumn,
        ColList.isSpecialColumn,
        ColList.cntByMonthColumn,
        ColList.cntByWeekColumn,
      ];
      break;
    case '/clientManagement':
      columns = [
        monitorColList.clientNoColumn,
        monitorColList.clientBrandColumn,
        monitorColList.clientTypeColumn,
        monitorColList.clientSNColumn,
        monitorColList.upDateColumn,
        monitorColList.actionColumn,
      ];
      break;
    case '/cameraList':
      columns = [
        monitorColList.cameraSNColumn, // 编号
        monitorColList.cameraBrandColumn,
        monitorColList.clientTypeColumn,
        monitorColList.cameraPXColumn,
        monitorColList.cameraDistanceColumn,
        monitorColList.cameraCodeColumn, // 验证码
        // monitorColList.cameraTokenColumn, // access_token
        monitorColList.upDateColumn,
        monitorColList.actionColumn,
      ];
      break;
    case '/repositoryList/list':
      columns = [
        monitorColList.repoNameColumn,
        monitorColList.repoCameraNumColumn,
        monitorColList.repoCarNumColumn,
        monitorColList.monitorCarNumColumn,
        monitorColList.upDateColumn,
        monitorColList.actionColumn,
      ];
      break;
    case '/repositoryList/detail':
      columns = [
        monitorColList.monitorImgCodeColumn,
        monitorColList.monitorImgTypeColumn,
        monitorColList.monitorImgOriginColumn,
        monitorColList.monitorImgRecognitionColumn,
        monitorColList.monitorRecognitionCarNumColumn,
        monitorColList.monitorImgTimeColumn,
        // monitorColList.actionColumn,
      ];
      break;
    case '/repositoryWarning/todo':
      columns = [
        monitorColList.repoIdColumn,
        monitorColList.repoNameColumn,
        monitorColList.repoStartTimeColumn,
        monitorColList.repoFinishTimeColumn,
        monitorColList.repoRealNumColumn,
        monitorColList.repoRecognitionNumColumn,
        monitorColList.actionColumn,
      ];
      break;
    case '/repositoryWarning/gone':
      columns = [
        monitorColList.repoIdColumn,
        monitorColList.repoNameColumn,
        monitorColList.repoStartTimeColumn,
        monitorColList.repoFinishTimeColumn,
        monitorColList.repoRealNumColumn,
        monitorColList.repoRecognitionNumColumn,
        monitorColList.repoRemoveTimeColumn,
        monitorColList.repoRemarkColumn,
        // monitorColList.actionColumn,
      ];
      break;
    default:
      break;
  }
  if (path.startsWith('/transfer')) {
    columns = [
      BfColList.ewBankIdColumn, //任务号
      ColList.bankNameColumn, // 银行名称
      ColList.distributorNameColumn, // 经销商名称
      ColList.ewNameColumn, // 二网名称
      BfColList.fldSerialColumn, // 品牌名称
      ColList.isfirstColumn, // 业务类型 （是否续作）
      BfColList.depositAmount2Column, // 保证金
      ColList.bondTypeColumn, //
      BfColList.isEmptyColumn, //
      ColList.moneyGetTypeColumn, //
      BfColList.bondAccountColumn, // 保证金账号
      BfColList.pointsAccountColumn, // 分账账号
      BfColList.settlementAccountColumn, // 结算账号
      BfColList.interestRateColumn, // 利率(%)
      BfColList.isExportColumn, // 是否导出
      ColList.bankAuditTimeColumn, // 复审通过时间
    ];
  } else if (path.startsWith('/printManagement')) {
    if (path.startsWith('/printManagement/transferOutHis')) {
      columns = [
        BfColList.exportDateColumn, // 导出时间
        BfColList.operNameColumn, // 操作人
        BfColList.exportTypeColumn, // 操作人
      ];
    } else {
      columns = [
        ColList.bankNameColumn, // 银行名称
        BfColList.brandNameColumn, // 品牌名称
        ColList.distributorNameColumn, // 经销商名称
        BfColList.deposit2Column, // 保证金
        BfColList.ewNumColumn, // 二网数量
        BfColList.bondAccountColumn, // 保证金账号
        BfColList.remittanceAccountColumn, //
        BfColList.pointsAccountColumn, // 分账账号
        BfColList.settlementAccountColumn, // 结算账号
      ];
    }
  } else if (path.startsWith('/confirmReceiptList')) {
    columns = [
      ColList.bankNameColumn, // 银行名称
      BfColList.brandNameColumn, // 品牌名称
      ColList.distributorNameColumn, // 经销商名称
      BfColList.deposit2Column, // 保证金
      BfColList.ewNumColumn, // 二网数量
      BfColList.bondAccountColumn, // 保证金账号
      BfColList.pointsAccountColumn, // 分账账号
      BfColList.settlementAccountColumn, // 结算账号
      BfColList.remittanceAccountColumn, // 应解汇款账号
      BfColList.exportTime2Column, // 导出时间
      BfColList.exportTypeColumn, // 导出类型
      BfColList.exceptionLableColumn, // 异常预警
      BfColList.confirmStatusColumn, // 确认回执状态
    ];
  } else if (path.startsWith('/repoAuditFirst/todo')) {
    columns = [
      ColList.bankNameColumn, // 银行名称
      BfColList.brandNameColumn, // 品牌名称
      ColList.distributorNameColumn, // 经销商名称
      ColList.repoNameColumn, // 仓库名称
      ColList.repoTypeColumn, // 仓库类型
      ColList.repoStatusColumn, // 仓库状态
    ];
  } else if (path.startsWith('/repoAuditFirst/all')) {
    columns = [
      ColList.bankNameColumn, // 银行名称
      BfColList.brandNameColumn, // 品牌名称
      ColList.distributorNameColumn, // 经销商名称
      ColList.repoNameColumn, // 仓库名称
      ColList.repoTypeColumn, // 仓库类型
      ColList.repoStatusColumn, // 仓库状态
      ColList.auditFistUserNameColumn, // 初审操作人
      ColList.auditFirstTimeColumn, // 初审时间
      ColList.auditLastUserNameColumn, // 复审操作人
      ColList.auditLastTimeColumn, // 复审时间
    ];
  } else if (path.startsWith('/repoAuditLast/todo')) {
    columns = [
      ColList.bankNameColumn, // 银行名称
      BfColList.brandNameColumn, // 品牌名称
      ColList.distributorNameColumn, // 经销商名称
      ColList.repoNameColumn, // 仓库名称
      ColList.repoTypeColumn, // 仓库类型
      ColList.repoStatusColumn, // 仓库状态
      ColList.auditFistUserNameColumn, // 初审操作人
      ColList.auditFirstTimeColumn, // 初审时间
    ];
  } else if (path.startsWith('/repoAuditLast/all')) {
    columns = [
      ColList.bankNameColumn, // 银行名称
      BfColList.brandNameColumn, // 品牌名称
      ColList.distributorNameColumn, // 经销商名称
      ColList.repoNameColumn, // 仓库名称
      ColList.repoTypeColumn, // 仓库类型
      ColList.repoStatusColumn, // 仓库状态
      ColList.auditFistUserNameColumn, // 初审操作人
      ColList.auditFirstTimeColumn, // 初审时间
      ColList.auditLastUserNameColumn, // 复审操作人
      ColList.auditLastTimeColumn, // 复审时间
    ];
  }
  return columns;
}

export const ewInfoModalColumn = [
  {
    title: '任务号',
    dataIndex: 'id',
  }, //任务号
  ColList.ewNameColumn, // 二网名称
  ColList.isfirstColumn, // 业务类型 （是否续作）
  ColList.bondTypeColumn, //
  ColList.depositAmountColumn, // 保证金
  ColList.bankAuditTimeColumn, // 复审通过时间
  ColList.status2Column, // 业务状态
];

export const ewInfoConfirmColumn = [
  // 确认回执页面二网信息
  ColList.ewBankIdColumn, //任务号
  ColList.distributorNameColumn, // 经销商名称
  BfColList.brandNameColumn, // 品牌名称
  ColList.ewNameColumn, // 二网名称
  ColList.businessTypeColumn, // 业务类型 （是否续作）
  ColList.bondTypeColumn, // 保证金类型
  ColList.depositAmountBondDetailColumn, // 保证金
  BfColList.lastTimeColumn, // 复审通过时间
  // ColList.statusNameColumn // 业务状态
];
