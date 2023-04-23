import * as FormItems from './formItem';
import * as BfFormItems from './bondFlowFormItem';

export default function simpleFormGroup(path) {
  let type = '';
  if (path.includes('todoList')) {
    type = 'TODO';
  } else if (path.includes('expList')) {
    type = 'EXCEPTION';
  } else if (path.includes('totalList')) {
    type = 'ALL';
  }
  if (path === '/ewSummary' || path === '/disBond') {
    return [FormItems.bankNameFormItem, FormItems.distributorNameFormItem, FormItems.fldSerialNameFormItem];
  } else if (path.startsWith('/superviseAmount/list')) {
    return [FormItems.theMonthFormItem];
  } else if (path.startsWith('/multipleAccount/list')) {
    return [
      FormItems.enterpriseNameFormItem,
      FormItems.accidFormItem,
      FormItems.mobileFormItem,
      FormItems.enterpriseTypeFormItem,
    ];
  } else if (path.startsWith('/spotException/list')) {
    return [
      FormItems.distributorNameFormItem,
      FormItems.ewNameFormItem,
      FormItems.bankNameFormItem,
      FormItems.chassisFormItem,
      FormItems.spottestIdFormItem,
      FormItems.ptNotPassFlagFormItem,
      FormItems.spotTaskStatusFormItem,
      FormItems.bookTimeFormItem,
      FormItems.isisSelfSelling,
      FormItems.spotDescriptionFormItem,
      FormItems.ptRemarkExcFormItemStr,
    ];
  } else if (path.startsWith('/movingException/list')) {
    return [
      FormItems.distributorNameFormItem,
      FormItems.ewNameFormItem,
      FormItems.bankNameFormItem,
      FormItems.chassisFormItem,
      FormItems.spottestIdFormItem,
      FormItems.ptNotPassFlagFormItem,
      FormItems.movingTaskStatusFormItem,
      FormItems.applyTimeFormItem,
      FormItems.ptRemarkExcFormItemStr,
    ];
  } else if (path.startsWith('/spottestAudit/list/spotTask')) {
    return [
      FormItems.idFormItem, //任务编号
      FormItems.distributorNameFormItem, //经销商名称
      FormItems.brandNameFormItem, //经销商名称
      FormItems.chassisFormItem, //车架号
      FormItems.bankNameFormItem, //银行名称
      FormItems.ewNameFormItem, //二网名称
      FormItems.spottesttypeFormItema, //抽查类型
      FormItems.spottestStatusFormItem, //任务状态
      FormItems.spotDescriptionFormItem, //抽查描述
    ];
  } else if (path.startsWith('/spottestAudit/list/moveTask')) {
    return [
      FormItems.idFormItem, //任务编号
      FormItems.moveIdFormItem, //移动编号
      FormItems.distributorNameFormItem, //经销商名称
      FormItems.brandNameFormItem, //经销商名称
      FormItems.chassisFormItem, //车架号
      FormItems.bankNameFormItem, //银行名称
      FormItems.ewNameFormItem, //二网名称
      FormItems.spottesttypeFormItemb, //抽查类型
      FormItems.spottestStatusFormItem, //任务状态
    ];
  } else if (path.startsWith('/spottestAudit/list/timeOut')) {
    return [
      FormItems.idFormItem, //任务编号
      FormItems.distributorNameFormItem, //经销商名称
      FormItems.brandNameFormItem, //经销商名称
      FormItems.chassisFormItem, //车架号
      FormItems.bankNameFormItem, //银行名称
      FormItems.ewNameFormItem, //二网名称
      FormItems.spottesttypeFormItemc, //抽查类型
      FormItems.spottestStatusFormItem, //任务状态
      FormItems.spotDescriptionFormItem, //抽查描述
    ];
  } else if (path.startsWith('/spottestAudit/list/todoComplete')) {
    return [
      FormItems.idFormItem, //任务编号
      FormItems.moveIdFormItem, //移动编号
      FormItems.distributorNameFormItem, //经销商名称
      FormItems.brandNameFormItem, //经销商名称
      FormItems.chassisFormItem, //车架号
      FormItems.bankNameFormItem, //银行名称
      FormItems.ewNameFormItem, //二网名称
      FormItems.spottesttypeFormItemd, //抽查类型
      FormItems.spotDescriptionFormItem, //抽查描述
    ];
  } else if (path.startsWith('/specialDealer')) {
    return [
      FormItems.dealerFormItem, //经销商名称
      FormItems.statusTypeFormItem, //是否有效
    ];
  } else if (path.startsWith('/superviseManager')) {
    return [
      FormItems.logStartFormItem, //抽查日期起始时间
    ];
  } else if (path.startsWith('/repositoryWarning')) {
    return [
      FormItems.repoWarningDateFormItem, //发生日期
      FormItems.ewNameFormItem, //二网名称
    ];
  } else if (path === '/ewDetail' || path === '/ewBond' || path === '/bondDetail') {
    return [FormItems.bankNameFormItem, FormItems.distributorNameFormItem, FormItems.ewNameFormItem];
  } else if (path === '/spotMove') {
    return [FormItems.statisticalDateFormItem, FormItems.checkboxFormItem];
  } else if (path === '/ewOnlineList') {
    return [FormItems.bankNameFormItem];
  } else if (path.startsWith('/ewOnlineDetail')) {
    return [FormItems.bankNameFormItem, FormItems.brandNameFormItem, FormItems.dealerNameFormItem];
  } else if (path.startsWith('/transfer')) {
    return [FormItems.distributorNameFormItem, FormItems.ewNameFormItem, FormItems.isExportFormItem];
  } else if (path === '/lastAudit/list/todoList') {
    return [FormItems.distributorNameFormItem, FormItems.ewNameFormItem, FormItems.isfirstFormItem];
  } else if (path.startsWith('/confirmReceiptList')) {
    return [FormItems.distributorNameFormItem, BfFormItems.brandNameFormItem, BfFormItems.bondFlowTypeFormItem];
  } else if (path.startsWith('/taskSummary')) {
    if (path === '/taskSummary/platformManager') {
      return [FormItems.opUserNameFormItem, FormItems.accidFormItem, FormItems.taskStartTimeRangeFormItem];
    } else {
      return [FormItems.taskStartTimeRangeFormItem];
    }
  } else if (path.startsWith('/repoAudit')) {
    if (path === '/repoAuditFirst/todo') {
      return [FormItems.distributorNameFormItem, FormItems.repoStatusFormItem('FIRSTTODO')];
    } else if (path === '/repoAuditFirst/all') {
      return [FormItems.distributorNameFormItem, FormItems.repoStatusFormItem('FIRSTHIS')];
    } else if (path === '/repoAuditLast/todo') {
      return [FormItems.distributorNameFormItem];
    } else if (path === '/repoAuditLast/all') {
      return [FormItems.distributorNameFormItem, FormItems.repoStatusFormItem('LASTHIS')];
    }
  } else if (
    path === '/ewSaleRink' ||
    path === '/checkedDetail' ||
    path === '/carMoving' ||
    path === '/dealerSaleRink' ||
    path === '/carSales'
  ) {
    return [
      FormItems.regionNameFormItem, //区域
      FormItems.subRegionNameFormItem, //区域
      'ProvCityFormItem', //省份
    ];
  } else if (path.startsWith('/orderManagement/list')) {
    return [
      FormItems.companyFormItem,
      FormItems.buyUserAccountFormItem,
      FormItems.goodsCodeFormItem,
      FormItems.orderNoFormItem,
    ];
  } else if (path.startsWith('/invoiceManagement/list')) {
    return [FormItems.companyFormItem, FormItems.accIdFormItem, FormItems.orderNoFormItem];
  } else if (path.startsWith('/refundManagement/list')) {
    return [
      FormItems.companyFormItem,
      FormItems.buyUserAccountFormItem,
      FormItems.goodsCodeFormItem,
      FormItems.orderNoFormItem,
    ];
  } else if (path === '/clientManagement') {
    return [FormItems.clientNoFormItem, FormItems.clientBrandFormItem];
  } else if (path === '/cameraList') {
    return [FormItems.cameraCodeFormItem, FormItems.cameraBrandFormItem];
  } else if (path === '/storeManagement/distributor') {
    return [FormItems.distributorNameFormItem, FormItems.microShopStatusFormItem];
  } else if (path === '/storeManagement/ew') {
    return [FormItems.distributorNameFormItem, FormItems.ewNameFormItem, FormItems.microShopStatusFormItem];
  } else if (path !== '/primaryAudit/list/todoListForDistr') {
    return [FormItems.distributorNameFormItem, FormItems.ewNameFormItem, FormItems.statusFormItem(type)];
  } else {
    return [FormItems.distributorNameFormItem, FormItems.ewNameFormItem];
  }
}

export function advanceFormGroup(path) {
  let group = [];
  switch (path) {
    case 'SpottestAudit':
      group = [
        FormItems.idFormItem, //任务编号
        FormItems.distributorNameFormItem, //经销商名称
        FormItems.chassisFormItem, //车架号
        FormItems.bankNameFormItem, //银行名称
        FormItems.ewNameFormItem, //二网名称
        FormItems.spottesttypeFormItema, //抽查类型
        FormItems.moveIdFormItem, //移动编号
        FormItems.ptTyFormItem, //异常类型
      ];
      break;

    case 'SpotException':
      group = [
        FormItems.distributorNameFormItem, //经销商名称
        FormItems.ewNameFormItem, //二网名称
        FormItems.chassisFormItem, //车架号
        FormItems.bookTimeFormItem, //任务下发时日期
        FormItems.ptNotPassFlagFormItem, //异常原因_平台
        FormItems.ptRemarkExcFormItem, //异常原因_最终
        FormItems.spottestIdFormItem, //任务编号
        FormItems.bankNameFormItem, //银行名称
      ];
      break;
    case '/primaryAudit/list/todoList':
      group = [
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.statusFormItem('TODO'), // 业务状态
        FormItems.bankNameFormItem, // 银行名称
        FormItems.disApplyTimeRangeFormItem, // 经销商申请日期
        FormItems.idFormItem, // 任务编号
        FormItems.isExceptionFormItem, // 是否存在异常
        FormItems.isContractChangeFormItem, // 合同是否变更
        FormItems.contractTypeFormItem, // 合同类型
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.isfirstFormItem, // 业务类型
      ];
      break;
    case '/primaryAudit/list/expList':
      group = [
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.statusFormItem('EXCEPTION'), // 业务状态
        FormItems.bankNameFormItem, // 银行名称
        FormItems.idFormItem, // 任务编号
        FormItems.isContractChangeFormItem, // 合同是否变更
        FormItems.contractTypeFormItem, // 合同类型
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.isfirstFormItem, // 业务类型
        FormItems.exceptionTimeRangeFormItem, // 异常日期
      ];
      break;
    case '/primaryAudit/list/todoListForDistr':
      group = [
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.bankNameFormItem, // 银行名称
        FormItems.idFormItem, // 任务编号
        FormItems.isExceptionFormItem, // 是否存在异常
        FormItems.isContractChangeFormItem, // 合同是否变更
        FormItems.contractTypeFormItem, // 合同类型
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.isfirstFormItem, // 业务类型
      ];
      break;
    case '/primaryAudit/list/totalList':
      group = [
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.statusFormItem('ALL'), // 业务状态
        FormItems.bankNameFormItem, // 银行名称
        FormItems.disApplyTimeRangeFormItem, // 经销商申请日期
        FormItems.idFormItem, // 任务编号
        FormItems.isExceptionFormItem, // 是否存在异常
        FormItems.isEmptyFormItem, // 保证金是否为零
        FormItems.ptAuditTimeRangeFormItem, // 初审日期
        FormItems.isContractChangeFormItem, // 合同是否变更
        FormItems.contractTypeFormItem, // 合同类型
        FormItems.bankAuditTimeFormItem, // 复审日期
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.isfirstFormItem, // 业务类型
        FormItems.statementSignStatusFormItem,
      ];
      break;
    case '/lastAudit/list/todoList':
      group = [
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.isfirstFormItem, // 业务类型
        FormItems.idFormItem, // 任务编号
        FormItems.isExceptionFormItem, // 是否存在异常
        FormItems.ptAuditTimeRangeFormItem, // 初审日期
        FormItems.isContractChangeFormItem, // 合同是否变更
        FormItems.contractTypeFormItem, // 合同类型
        FormItems.fldSerialNameFormItem, // 品牌名称
      ];
      break;
    case '/lastAudit/list/expList':
      group = [
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.statusFormItem('EXCEPTION'), // 业务状态
        FormItems.bankNameFormItem, // 银行名称
        FormItems.idFormItem, // 任务编号
        FormItems.isContractChangeFormItem, // 合同是否变更
        FormItems.contractTypeFormItem, // 合同类型
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.isfirstFormItem, // 业务类型
        FormItems.exceptionTimeRangeFormItem, // 异常日期
      ];
      break;
    case '/lastAudit/list/totalList':
      group = [
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.statusFormItem('ALL'), // 业务状态
        FormItems.bankNameFormItem, // 银行名称
        FormItems.idFormItem, // 任务编号
        FormItems.isContractChangeFormItem, // 合同是否变更
        FormItems.contractTypeFormItem, // 合同类型
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.isfirstFormItem, // 业务类型
        FormItems.isExceptionFormItem, // 是否存在异常
        FormItems.isEmptyFormItem, // 保证金是否为零
        FormItems.disApplyTimeRangeFormItem, // 初审日期
        FormItems.ptAuditTimeRangeFormItem, // 初审日期
        FormItems.bankAuditTimeFormItem, // 复审日期
        FormItems.isRecievedFormItem, // 签收状态
        FormItems.expressNumFormItem, // 快递单号
        FormItems.contractSendTimeRangeFormItem, // 合同邮寄日期
      ];
      break;
    case '/ewSummary':
      group = [
        FormItems.bankNameFormItem, // 银行名称
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.disApplyTimeRangeFormItem, // 经销商申请日期
      ];
      break;
    case '/ewDetail':
      group = [
        FormItems.bankNameFormItem, // 银行名称
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.disApplyTimeRangeFormItem, // 经销商申请日期
        FormItems.ptAuditTimeRangeFormItem, // 初审日期
        FormItems.bankAuditTimeFormItem, // 复审日期
        BfFormItems.hasBondFormItem, // 是否有保证金
        FormItems.moneyGetTypeFormItem, // 保证金收取方式
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.idFormItem, // 任务编号
        FormItems.statusFormItem, // 业务状态
        FormItems.isfirstFormItem, // 业务类型
        FormItems.isExceptionFormItem, // 是否存在异常
        FormItems.contractTypeFormItem, // 合同类型
        FormItems.isContractChangeFormItem, // 合同是否变更
      ];
      break;
    case '/ewBond':
      group = [
        FormItems.bankNameFormItem, // 银行名称
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.bondSaveDateFormItem, // 保证金存入时间
        FormItems.fldSerialNameFormItem, // 品牌名称
      ];
      break;
    case '/disBond':
      group = [FormItems.bankNameFormItem, FormItems.distributorNameFormItem, FormItems.fldSerialNameFormItem];
      break;
    case '/ewSaleRink':
      group = [
        FormItems.regionNameFormItem, //区域
        FormItems.subRegionNameFormItem, //区域
        'ProvCityFormItem', //省份
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.beginDateFormItem, //统计日期
        FormItems.bankNameFormItem, // 银行名称
        FormItems.fldSerialName2FormItem, //品牌名称
      ];
      break;
    case '/carMoving':
      group = [
        FormItems.regionNameFormItem, //区域
        FormItems.subRegionNameFormItem, //区域
        'ProvCityFormItem', //省份
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.beginDateFormItemToday, //统计日期
        FormItems.bankNameFormItem, // 银行名称
        FormItems.fldSerialName2FormItem, //品牌名称
      ];
      break;
    case '/checkedDetail':
      group = [
        FormItems.regionNameFormItem, //区域
        FormItems.subRegionNameFormItem, //区域
        'ProvCityFormItem', //
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.beginDateFormItem, //统计日期
        FormItems.bankNameFormItem, // 银行名称
        FormItems.fldSerialName2FormItem, //品牌名称
      ];
      break;
    case '/carSales':
      group = [
        FormItems.regionNameFormItem, //区域
        FormItems.subRegionNameFormItem, //区域
        'ProvCityFormItem', //
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.beginDateFormItem, //统计日期
        FormItems.bankNameFormItem, // 银行名称
        FormItems.fldSerialName2FormItem, //品牌名称
      ];
      break;
    case '/dealerSaleRink':
      group = [
        FormItems.regionNameFormItem, //区域
        FormItems.subRegionNameFormItem, //区域
        'ProvCityFormItem', //省份
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.beginDateFormItem, //统计日期
        FormItems.bankNameFormItem, // 银行名称
        FormItems.fldSerialName2FormItem, //品牌名称
      ];
      break;
    case '/bondDetail':
      group = [
        FormItems.bankNameFormItem, // 银行名称
        FormItems.distributorNameFormItem, // 经销商名称
        FormItems.ewNameFormItem, // 二网名称
        FormItems.fldSerialNameFormItem, // 品牌名称
        FormItems.idFormItem, // 任务编号
        BfFormItems.hasBondFormItem, // 是否有保证金
        FormItems.moneyGetTypeFormItem, // 保证金收取方式
        FormItems.statusFormItem('bondDetail'), // 业务状态
        FormItems.isfirstFormItem, // 业务类型
      ];
      break;
    case '/ewOnlineList':
      group = [
        FormItems.bankNameFormItem, // 银行名称
      ];
      break;
    default:
      break;
  }
  if (path.startsWith('/transferIn')) {
    group = [
      FormItems.distributorNameFormItem,
      FormItems.ewNameFormItem,
      FormItems.isExportFormItem,
      FormItems.isfirstFormItem, // 业务类型
      FormItems.bankAuditTimeFormItem, // 复审日期
      BfFormItems.hasBondFormItem, // 是否有保证金
      FormItems.moneyGetTypeFormItem, // 保证金收取方式
      FormItems.fldSerialNameFormItem, // 品牌名称
    ];
  }
  if (path.startsWith('/transferOut')) {
    group = [
      FormItems.distributorNameFormItem,
      FormItems.ewNameFormItem,
      FormItems.isExportFormItem,
      FormItems.bankAuditTimeFormItem, // 复审日期
      BfFormItems.hasBondFormItem, // 是否有保证金
      FormItems.moneyGetTypeFormItem, // 保证金收取方式
      FormItems.fldSerialNameFormItem, // 品牌名称
      FormItems.isfirstFormItem, // 业务类型
    ];
  }
  return group;
}
