import * as FormItems from './formItem';
export default function selfcarFormGroup(path) {
  if (path.startsWith('/financialPro')) {
    return [FormItems.financialNameFormItem];
  } else if (path.startsWith('/standMang/car')) {
    return [
      FormItems.standStatFormItem,
      FormItems.ewNameFormItem, //二网名称
      FormItems.carTypeSelfCarFormItem,
      FormItems.taskStartTimeRangeFormItem,
    ];
  } else if (path.startsWith('/standMang/plate')) {
    return [
      FormItems.standPlateStatFormItem,
      FormItems.ewNameFormItem, //二网名称
      FormItems.carTypeSelfCarFormItem,
      FormItems.taskStartTimeRangeFormItem,
      FormItems.descriptionFormItem,
    ];
  } else if (path.startsWith('/excUploadAll/sellData')) {
    return [
      FormItems.chassisFormItem, //车架号
    ];
  } else if (path === '/excUploadAdd/list') {
    return [
      FormItems.chassisFormItem, //车架号
      FormItems.processStatusFormItem,
      FormItems.batchnoFormItem,
      FormItems.processAddTypeFormItem,
    ];
  } else if (path === '/excUploadAll/uploadAllList') {
    return [
      FormItems.chassisFormItem, //车架号
      FormItems.processStatusFormItem,
      FormItems.batchnoFormItem,
      FormItems.processTypeFormItem,
    ];
  } else if (path === '/regionalism/smallMang') {
    return [
      FormItems.selfSmaRegNameFormItem,
      FormItems.ewNameFormItem, //二网名称
    ];
  } else if (path === '/regionalism/bigMang') {
    return [FormItems.regionNameFormItem];
  } else if (path === '/locaManage') {
    return [
      FormItems.ewNameFormItem, //二网名称
      FormItems.locationFormItem, //定位点名称
    ];
  } else if (path.startsWith('/moveRecord')) {
    return [
      FormItems.ydNumFormItem,
      FormItems.chassisFormItem,
      FormItems.moveOutIdFormItem,
      FormItems.moveInIdFormItem,
      FormItems.stateFormItem,
      FormItems.beginDateFormItem,
    ];
  } else if (path.startsWith('/soldConfirm')) {
    return [
      FormItems.locationNameFormItem, //二网名称
      FormItems.chassisFormItem, //车架号
    ];
  } else if (path.startsWith('/selfCarMgPage/reserved')) {
    return [
      FormItems.locationStateFormItem,
      FormItems.chassisFormItem,
      FormItems.locationNameFormItem,
      FormItems.cooFinancFormItem,
      FormItems.carFromItem,
    ];
  } else if (path.startsWith('/selfCarMgPage/removed')) {
    return [FormItems.chassisFormItem];
  } else if (path.startsWith('/commonTask/list/todo')) {
    return [
      FormItems.ewNameFormItem,
      FormItems.carTypeSelfCarFormItem,
      FormItems.repoStatusSelfCarFormItem,
      FormItems.chassisFormItem,
    ];
  } else if (path.startsWith('/commonTask/list/done')) {
    return [
      FormItems.ewNameFormItem,
      FormItems.carTypeSelfCarFormItem,
      FormItems.goneStatusSelfCarFormItem,
      FormItems.chassisFormItem,
    ];
  } else if (path.startsWith('/movingTask/list/todo')) {
    return [
      FormItems.ewNameFormItem,
      FormItems.carTypeSelfCarFormItem,
      FormItems.moveStatusSelfCarFormItem,
      FormItems.chassisFormItem,
    ];
  } else if (path.startsWith('/movingTask/list/done')) {
    return [
      FormItems.ewNameFormItem,
      FormItems.carTypeSelfCarFormItem,
      FormItems.goneStatusSelfCarFormItem,
      FormItems.chassisFormItem,
    ];
  } else if (path.startsWith('/certificateTask/list/todo')) {
    return [FormItems.ewNameFormItem, FormItems.carTypeSelfCarFormItem, FormItems.chassisFormItem, FormItems.descriptionFormItem];
  } else if (path.startsWith('/certificateTask/list/done')) {
    return [FormItems.ewNameFormItem, FormItems.carTypeSelfCarFormItem, FormItems.chassisFormItem, FormItems.descriptionFormItem];
  } else if (path == '/selfcarCheat') {
    return [FormItems.examCodeFormItem, FormItems.examTimeFormItem];
  } else {
    return [FormItems.ewNameFormItem];
  }
}
