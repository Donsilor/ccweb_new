import React from 'react';
import { httpFormClient, httpCommonClient } from 'common/axios';
import moment from 'moment';
import { formatTime } from 'common/utils';

const timeFormat = 'YYYY-MM-DD HH:mm:ss';
const dateFormat = 'YYYY-MM-DD';

const adcCastSkill = url => value => {
  return httpFormClient.formSubmit(url, '', value);
};
const adcCastSkillSubmit = url => value => {
  return httpCommonClient.submit(url, value);
};

export const returnAdc = {
  adcTitle: '退回',
  adcConfig: ['bookTime2', 'remark'],
  endSkill: (value, record) => {
    const newValue = { remark: value.remark, parentSpotId: record.spottestId, parentSpotDetailId: record.spotdetailId };
    if (value.bookTime2 === 'nextDay') {
      newValue.bookTime = moment()
        .add(1, 'd')
        .hour(9)
        .minute(30)
        .second(0)
        .format('YYYY-MM-DD hh:mm:ss');
    }
    return adcCastSkill('ExceptionTraceAction_retreat')(newValue);
  },
};
export const confirmSellingAdc = {
  adcTitle: '二次确认私售',
  adcConfig: ['payDateTime', 'remark'],
  endSkill: (value, record) => {
    const param = {
      payDateTime: formatTime(value.payDateTime),
      remark: value.remark,
    };
    return adcCastSkill('ExceptionTraceAction_secondConfirmRepayment')({
      ...param,
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    });
  },
};
export const confirmRepaymentAdc = {
  adcTitle: '确认还款',
  adcConfig: [
    {
      label: '质押车确认还款，关闭任务',
    },
    'payDateTime',
    'remark',
  ],
  endSkill: (value, record) => {
    const param = {
      payDateTime: formatTime(value.payDateTime),
      remark: value.remark,
    };
    return adcCastSkill('ExceptionTraceAction_confirmRepayment')({
      ...param,
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    });
  },
};
export const timeOutRepaymentAdc = {
  adcTitle: '超时确认还款',
  adcConfig: [{ label: '质押车超时还款确认,关闭任务' }, 'payDateTime', 'remark'],
  endSkill: (value, record) => {
    const param = {
      payDateTime: formatTime(value.payDateTime),
      remark: value.remark,
    };
    return adcCastSkill('ExceptionTraceAction_timeoutConfirmRepayment')({
      ...param,
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    });
  },
};
export const subStoreReleaseAdc = {
  adcTitle: '分店上线',
  adcConfig: [{ label: '该分店需要上线，通知易查库培训专员3日内完成上线' }, 'remark'],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_goLive')({
      ...value,
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    }),
};
export const stopReleaseAdc = {
  adcTitle: '暂不上线',
  adcConfig: [{ label: '该分店暂不上线，通知银行二网专员（抽查员)发起新抽查确认车辆移回二网' }, 'remark'],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_suspendLive')({
      ...value,
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    }),
};
export const finishReleaseAdc = {
  adcTitle: '上线完成',
  adcConfig: [{ label: '该分店已经上线，通知银行二网专员（抽查员)下发车辆移动任务告知经销商确认' }, 'remark'],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_completeLive')({
      ...value,
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    }),
};
export const startMovingAdc = {
  adcTitle: '发起移动',
  adcConfig: [
    {
      label: '车架号',
      key: 'chassis',
    },
    {
      label: '车型',
      key: 'fldTrimName',
    },
    {
      label: '异常原因_最终',
      key: 'bankExcReseaonName',
    },
    'moveInEw',
    'remark',
  ],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_addMoveCarTask')({
      carId: record.carId,
      operRemark: value.remark,
      moveInEw: record.bankExcReseaon === 1 ? record.distributorId : value.moveInEw, // 异常原因（最终）为移回主店时，传入经销商id，否则传入选择的二网id
      parentSpotId: record.spottestId,
      parentSpotdetailId: record.spotdetailId,
    }),
};
export const startNewSpotAdc = {
  adcTitle: '发起新抽查',
  adcConfig: [
    {
      label: '车架号',
      key: 'chassis',
    },
    {
      label: '车型',
      key: 'fldTrimName',
    },
    'bookTime',
    'appointmentTime',
    'remark',
  ],
  endSkill: (value, record) => {
    const newValue = { remark: value.remark, parentSpotId: record.spottestId, parentSpotDetailId: record.spotdetailId };
    if (value.bookTime === 'appointmenttime') {
      newValue.bookTime = value.appointmentTime && value.appointmentTime.format(timeFormat);
    }
    return adcCastSkill('ExceptionTraceAction_addSubSpottest')(newValue);
  },
};
export const startNewCarShowAdc = {
  adcTitle: '发起车展申请',
  adcConfig: [
    {
      label: '经销商名称',
      key: 'distributorName',
    },
    {
      label: '银行名称',
      key: 'bankName',
    },
    {
      label: '品牌名称',
      key: 'brandName',
    },
    {
      label: '二网名称',
      key: 'ewName',
    },
    {
      label: '参展车辆车架号',
      key: 'chassis',
    },
    'exhibitor',
    'rangePicker',
    'showName',
    'showAddress',
    'remark',
  ],
  endSkill: (value, record) => {
    const { distributorId, distributorName, bankId, bankName, brandId, brandName, ewId, ewName, carId } = record;
    const [startTime, endTime] = value.rangePicker;
    const newValue = {
      exhibitor: value.exhibitor,
      remark: value.remark,
      showName: value.showName,
      showAddress: value.showAddress,
      distributorId,
      distributorName,
      bankId,
      bankName,
      brandId,
      brandName,
      ewId: value.ewId || ewId,
      ewName: value.ewName || ewName,
      carId,
      startTime: startTime && startTime.format(dateFormat),
      endTime: endTime && endTime.format(dateFormat),
      parentSpotId: record.spottestId,
      parentSpotDetailId: record.spotdetailId,
    };

    return adcCastSkill('ExceptionTraceAction_addCarShow')(newValue);
  },
};
export const changeExceptionTypeAdc = {
  adcTitle: '更改异常类型',
  adcConfig: ['bankExcReseaon', 'remark'],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_updateExceptionType')({
      ...value,
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    }),
};
export const extendedTimeAdc = {
  adcTitle: '延长时间处理',
  adcConfig: ['deferNum', 'remark'],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_deferExpiryDate')({
      ...value,
      deferNum: parseInt(value.deferNum),
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    }),
};
export const extendedTimeAdcMore = {
  adcTitle: '批量延长时间处理',
  adcConfig: ['deferNum', 'remark'],
  endSkill: (value, record) => {
    return adcCastSkillSubmit('ExceptionTraceAction_deferExpiryDateBatch')({
      ...value,
      deferNum: parseInt(value.deferNum),
      spotdetailids: record.selectedRowKeys,
    })
  }
};
export const closeTeskAdc = {
  adcTitle: '关闭任务',
  adcConfig: ['unshootType', 'remark'],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_endExceptionTrace')({
      ...value,
      actionFrom: 2, // 异常任务关闭
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    }),
};
export const endTeskAdc = {
  adcTitle: '终止任务',
  adcConfig: ['remark-required'],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_terminateExceptionTask')({
      ...value,
      spotdetailId: record.spotdetailId,
    }),
};

export const stopTaskAdc = {
  adcTitle: '确定要终止任务吗?',
  adcConfig: ['remark'],
  endSkill: (value, record) =>
    adcCastSkill('SpotTestTaskAction_stopTask')({
      detail_remark: value.remark,
      detail_id: record.id,
    }),
};
export const startHandleEndAdc = {
  adcTitle: '关闭',
  adcConfig: ['unShootType', 'remark'],
  endSkill: (value, record) =>
    adcCastSkill('ExceptionTraceAction_endExceptionTrace')({
      ...value,
      actionFrom: 2, // 异常任务关闭
      spottestId: record.spottestId,
      spotdetailId: record.spotdetailId,
    }),
};

export default startNewSpotAdc;
