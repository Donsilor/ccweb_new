import React from 'react';
import { message } from 'antd';
import TrackRecordView from './TrackRecordView';
import { httpFormClient } from 'common/axios';

export default function DisTrackRecordContainer(props) {
  const {
    match: {
      params: { id, menu },
    },
  } = props;
  const handleFetch = () => {
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_getDisTraceInfo', '', { id })
      .then(({ data }) => {
        if (data.result === 0) {
          const { disTraceInfo } = data;
          if (disTraceInfo.distributorId !== disTraceInfo.ewId) {
            props.calcIfEw(true);
          } else {
            props.calcIfEw(false);
          }
          return Promise.resolve({ traceInfo: data.disTraceInfo, traceList: data.disTraceList });
        } else {
          return Promise.reject(data.reject(data.msg));
        }
      })
      .catch(err => {
        message.error(err.message || err);
        props.calcIfEw(false);
      });
  };
  return <TrackRecordView fetch={handleFetch} id={id} readOnly={menu === 'spottestAuditLedger'} />;
}
