/* eslint-disable no-undef */
import React from 'react';
import * as R from 'ramda';
import { Badge, Modal } from 'antd';
// import BMap from 'BMap';
import EBDic from '../constant';
import saveAs from 'file-saver';
import moment from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
function translate(text, dicList, withBadge, isConfirmReceipt = 0, isException = 0) {
  if (R.isNil(text) || !Array.isArray(dicList)) {
    return '';
  }
  const index = dicList.findIndex(dic => dic.value === text);
  if (text === 0 && isConfirmReceipt === 1) {
    // 确认回执
    if (withBadge) {
      return <Badge status={'success'} text={'确认回执'} />;
    } else {
      return '确认回执';
    }
  } else if (text === 0 && isException === 1) {
    if (withBadge) {
      return <Badge status={'error'} text={'异常任务'} />;
    } else {
      return '异常任务';
    }
  }
  if (index === -1) {
    return text;
  } else if (withBadge) {
    return <Badge status={dicList[index].badgeStatus || 'default'} text={dicList[index].name} />;
  } else {
    return dicList[index].name;
  }
}
function translatePureDic(text, dicList, withBadge) {
  if (R.isNil(text) || !Array.isArray(dicList)) {
    return '';
  }
  const index = dicList.findIndex(dic => dic.value === text);
  if (index === -1) {
    return text;
  } else if (withBadge) {
    return <Badge status={dicList[index].badgeStatus || 'default'} text={dicList[index].name} />;
  } else {
    return dicList[index].name;
  }
}

// success  error  default processing  warning
function tranBadgeStatus(text, statusDicList, key) {
  if (R.isNil(text) || !Array.isArray(statusDicList)) {
    return 'processing';
  }
  const index = statusDicList.findIndex(dic => (key ? dic[key] === text : dic.name === text));
  if (index === -1) {
    return 'processing';
  } else {
    return statusDicList[index].badgeStatus;
  }
}

function getAuthStep(status, cmAuditFlag, bpAuditFlag) {
  if (R.isNil(status)) {
    return -1;
  }
  const index = EBDic.statusDicList.findIndex(dic => String(dic.value) === String(status));
  if (index === -1) {
    return -1;
  } else if (cmAuditFlag + bpAuditFlag === 2 && EBDic.statusDicList[index].processStep === 3) {
    if (status === 33) {
      return 3;
    }
    return 6;
  } else if (cmAuditFlag + bpAuditFlag === 1 && EBDic.statusDicList[index].processStep === 3) {
    if (status === 33) {
      return 3;
    }
    return 5;
  } else {
    return EBDic.statusDicList[index].processStep;
  }
}

function exportFile(payload) {
  try {
    const { data, headers } = payload || {};
    if (data && data.type === 'application/json') {
      return '每次只能导出2000条数据，请调整查询条件后再导出';
    }
    const contentDisposition = headers['new-content-disposition'] || headers['content-disposition'];
    const filename = decodeURI(contentDisposition.slice(20));
    const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' });
    saveAs(blob, filename);
    return null;
  } catch (error) {
    console.error(error);
  }
}

export function loadBMap() {
  const ak = '2RUyt79vH3CDGdSyhi2lH8UWwf8Fg4kT';
  if (window.BMap) {
    return Promise.resolve(window.BMap);
  }
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.dataset.name = 'map';
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=initMap`; //callback调用init函数。
    document.head.appendChild(script);
    window.initMap = () => {
      resolve(window.BMap);
    };
  });
}
export function loadAMap() {
  const ak = '632faa22ab2bb69b4e21105c8142cbcb';
  if (window.AMap) {
    return Promise.resolve(window.AMap);
  }
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.dataset.name = 'map';
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${ak}&callback=initMap`; //callback调用init函数。
    document.head.appendChild(script);
    window.initMap = () => {
      resolve(window.AMap);
    };
  });
}

export function formatTime(text) {
  if (!text) {
    return '-';
  } else if (moment.isMoment(text)) {
    return text.format(TIME_FORMAT);
  } else if (text.time) {
    return moment.unix(text.time / 1000).format(TIME_FORMAT);
  } else if (moment.isMoment(moment(text))) {
    return moment(text).format(TIME_FORMAT);
  } else {
    return text || '-';
  }
}

export function exportFileNew(payload) {
  try {
    const { data, headers } = payload || {};
    if (headers['content-type'].includes("application/json")) {
      const enc = new TextDecoder('utf-8')
      const msg = new Uint8Array(data)
      const res = JSON.parse(enc.decode(msg))
      Modal.error({
        title: '提示信息:',
        content: res.message || ''
      })
    } else {
      const contentDisposition = headers['new-content-disposition'] || headers['content-disposition'];
      const filename = decodeURI(contentDisposition && contentDisposition.slice(20));
      const blob = new Blob([data], {
        type: headers['content-type']
      });
      saveAs(blob, filename);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}
export default translate;
export { translate, translatePureDic, tranBadgeStatus, getAuthStep, exportFile };
