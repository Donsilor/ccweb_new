import React from 'react';
import { message } from 'antd';
import TrackRecordView from './TrackRecordView';
import { httpFormClient } from 'common/axios';
import _isEmpty from 'lodash/isEmpty';

export default function EwTrackRecordContainer(props) {
  const {
    match: {
      params: { id, menu },
    },
  } = props;
  const handleFetch = () => {
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_getEwTraceInfo', '', { id })
      .then(({ data }) => {
        if (data.result === 0) {
          if (!_isEmpty(data.ewTraceInfo)) {
            props.calcIfEw(true);
          } else {
            props.calcIfEw(false);
          }
          return Promise.resolve({ traceInfo: data.ewTraceInfo, traceList: data.ewTraceList });
        } else {
          return Promise.reject(data.reject(data.msg));
        }
      })
      .catch(err => {
        message.error(err.message || err);
      });
  };
  return <TrackRecordView fetch={handleFetch} isEw id={id} readOnly={menu === 'spottestAuditLedger'} />;
}
