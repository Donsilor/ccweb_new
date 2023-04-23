import { createAction, handleActions } from 'redux-actions';
import { httpFormClient } from 'common/axios';

// Actions

const LOADING = 'YICHAKU/EWAUDITDETAIL/LOADING';
const FETCH_AUTH_INFO = 'YICHAKU/EWAUDITDETAIL/FETCH_AUTH_INFO';
const AUTH_BOND_PASS = 'YICHAKU/EWAUDITDETAIL/AUTH_BOND_PASS';
const AUTH_BOND_NOTPASS = 'YICHAKU/EWAUDITDETAIL/AUTH_BOND_NOTPASS';
const AUTH_INFO_PASS = 'YICHAKU/EWAUDITDETAIL/AUTH_INFO_PASS';
const AUTH_INFO_NOTPASS = 'YICHAKU/EWAUDITDETAIL/AUTH_INFO_NOTPASS';
const AUTH_FINALLY_PASS = 'YICHAKU/EWAUDITDETAIL/AUTH_FINALLY_PASS';
const AUTH_FINALLY_NOTPASS = 'YICHAKU/EWAUDITDETAIL/AUTH_FINALLY_NOTPASS';

const FETCH_BOND_HISTORY = 'YICHAKU/EWAUDITDETAIL/BOND_HISTORY';

const FETCH_DISTRIBUTOR_INFO = 'YICHAKU/EWAUDITDETAIL/DISTRIBUTOR_INFO';
const FETCH_EW_INFO = 'YICHAKU/EWAUDITDETAIL/EW_INFO';

const FETCH_EXPRESS_INFO = 'YICHAKU/EWAUDITDETAIL/FETCH_EXPRESS_INFO';

const FETCH_TRACK_RECORD = 'YICHAKU/EWAUDITDETAIL/FETCH_TRACK_RECORD';
const INSERT_TRACK_RECORD = 'YICHAKU/EWAUDITDETAIL/INSERT_TRACK_RECORD';

const FETCH_AUTH_HISTORY = 'YICHAKU/EWAUDITDETAIL/FETCH_AUTH_HISTORY';

const FETCH_EXCEP_RECORD = 'YICHAKU/EWAUDITDETAIL/FETCH_EXCEP_RECORD';
const CONFIRM_EXCEP_RECORD = 'YICHAKU/EWAUDITDETAIL/CONFIRM_EXCEP_RECORD';

const FETCH_OPERATION = 'YICHAKU/EWAUDITDETAIL/FETCH_OPERATION';

// Reducer
const reducer = handleActions(
  {
    [FETCH_AUTH_INFO]: {
      next(state, action) {
        const { data } = action.payload;
        return {
          ...state,
          ...{
            authInfo: {
              contractList: Array.isArray(data.contract)
                ? data.contract.map(item => ({
                    path: item.absolutePath,
                    time: item.opStarttime.time,
                    location: item.location,
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }))
                : [],
              rentalList: Array.isArray(data.rental)
                ? data.rental.map(item => ({
                    path: item.absolutePath,
                    time: item.opStarttime.time,
                    location: item.location,
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }))
                : [],
              statementList: Array.isArray(data.statementPic)
                ? data.statementPic.map(item => ({
                    path: item.absolutePath,
                    time: item.opStarttime.time,
                    location: item.location,
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }))
                : [],
              addtionalPhotos: Array.isArray(data.addtionalPhotos)
                ? data.addtionalPhotos.map(item => ({
                    path: item.absolutePath,
                    time: item.opStarttime.time,
                    location: item.location,
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }))
                : [],
              eb: data.eb || {},
              bank: data.bank || {},
              bond: data.bond || {},
              business: data.business
                ? {
                    path: data.business.absolutePath,
                    time: data.business.opStarttime.time,
                    location: data.business.location,
                    latitude: data.business.latitude,
                    longitude: data.business.longitude,
                  }
                : {},
              handIdPic: data.handIdPic
                ? {
                    path: data.handIdPic.absolutePath,
                    time: data.handIdPic.opStarttime.time,
                    location: data.handIdPic.location,
                    latitude: data.handIdPic.latitude,
                    longitude: data.handIdPic.longitude,
                  }
                : {},
              handSignPic: data.handSignPic
                ? {
                    path: data.handSignPic.absolutePath,
                    time: data.handSignPic.opStarttime.time,
                    location: data.handSignPic.location,
                    latitude: data.handSignPic.latitude,
                    longitude: data.handSignPic.longitude,
                  }
                : {},
              idBack: data.idBack
                ? {
                    path: data.idBack.absolutePath,
                    time: data.idBack.opStarttime.time,
                    location: data.idBack.location,
                    latitude: data.idBack.latitude,
                    longitude: data.idBack.longitude,
                  }
                : {},
              idFront: data.idFront
                ? {
                    path: data.idFront.absolutePath,
                    time: data.idFront.opStarttime.time,
                    location: data.idFront.location,
                    latitude: data.idFront.latitude,
                    longitude: data.idFront.longitude,
                  }
                : {},
              isContractPerfect: data.isContractPerfect,
              isDirectSaleStore: data.isDirectSaleStore,
            },
          },
        };
      },
    },
    [FETCH_BOND_HISTORY]: {
      next(state, action) {
        return {
          ...state,
          bondHistory: action.payload.data.list || [],
        };
      },
    },
    [FETCH_DISTRIBUTOR_INFO]: {
      next(state, action) {
        return {
          ...state,
          distributorInfo: action.payload.data,
        };
      },
    },
    [FETCH_EW_INFO]: {
      next(state, action) {
        return {
          ...state,
          ewInfo: action.payload.data,
        };
      },
    },
    [FETCH_EXPRESS_INFO]: {
      next(state, action) {
        return {
          ...state,
          expressInfo: action.payload.data || {},
        };
      },
    },
    [FETCH_TRACK_RECORD]: {
      next(state, action) {
        return {
          ...state,
          trackRecord: action.payload.data.list || [],
        };
      },
    },
    [FETCH_AUTH_HISTORY]: {
      next(state, action) {
        return {
          ...state,
          authHistory: action.payload.data.list || [],
        };
      },
    },
    [FETCH_EXCEP_RECORD]: {
      next(state, action) {
        return {
          ...state,
          excepRecord: action.payload.data.list || [],
        };
      },
    },
    [FETCH_OPERATION]: {
      next(state, action) {
        return {
          ...state,
          operation: action.payload.data.list || [],
        };
      },
    },
    [LOADING]: {
      next(state: any, action: any) {
        return {
          ...state,
          loading: action.loading,
        };
      },
    },
  },
  {
    authInfo: {},
    bondHistory: [],
    distributorInfo: {},
    ewInfo: {},
    expressInfo: {},
    trackRecord: [],
    authHistory: [],
    excepRecord: [],
    operation: [],
    loading: true,
  }
);

export default reducer;

export const authInfoFetch = createAction(FETCH_AUTH_INFO, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewBankAuditDetailsPt', 'ebQuery', data);
});
export const authBondPass = createAction(AUTH_BOND_PASS, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditDepositPassPt', 'eb', data);
});
export const authBondNotPass = createAction(AUTH_BOND_NOTPASS, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditDepositNotPassPt', 'eb', data);
});
export const authInfoPass = createAction(AUTH_INFO_PASS, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditEwInfoPassPt', 'eb', data);
});
export const authInfoNotPass = createAction(AUTH_INFO_NOTPASS, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditEwInfoNotPassPt', 'eb', data);
});
export const authFinallyPass = createAction(AUTH_FINALLY_PASS, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditPassBank', 'eb', data);
});
export const authFinallyNotPass = createAction(AUTH_FINALLY_NOTPASS, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewAuditNotPassBank', 'eb', data);
});
export const modifyMoveAmount = createAction(AUTH_FINALLY_NOTPASS, (data, type) => {
  if (type == '21') {
    return httpFormClient.formSubmit('/EwDistributorAction_updateMoveMoney', '', {
      oldMoveMoney: data.oldMoveNum,
      newMoveMoney: data.newMoveNum,
      id: data.id,
    });
  } else {
    return httpFormClient.formSubmit('/EwDistributorAction_updateMoveNum', '', data);
  }
});

// BOND_HISTORY
export const bondHistoryFetch = createAction(FETCH_BOND_HISTORY, data => {
  return httpFormClient.formSubmit('/BondFlowAction_depositAuditHistoryList', 'ebQuery', data);
});

// DISTRIBUTOR_INFO
export const distributorInfoFetch = createAction(FETCH_DISTRIBUTOR_INFO, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_distriDetailsForDeposit', 'ebQuery', data);
});

// EW_INFO
export const ewInfoFetch = createAction(FETCH_EW_INFO, data => {
  return httpFormClient.formSubmit('/EwAction_ewInfoForDeposit', 'ebQuery', data);
});

// TRACK_RECORD
export const trackRecordFetch = createAction(FETCH_TRACK_RECORD, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewBankTraceList', 'ebQuery', data);
});

// Express
export const expressInfoFetch = createAction(FETCH_EXPRESS_INFO, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_expressInfo', 'ebQuery', data);
});
export const trackRecordAdd = createAction(INSERT_TRACK_RECORD, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_addTrace', 'ebQuery', data);
});

// AUTH_HISTORY
export const authHistoryFetch = createAction(FETCH_AUTH_HISTORY, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewBankAuditHistoryList', 'ebQuery', data);
});

// Excep_RECORD
export const excepRecordFetch = createAction(FETCH_EXCEP_RECORD, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewBankExceptionFlowList', 'ebQuery', data);
});
export const excepRecordConfirm = createAction(CONFIRM_EXCEP_RECORD, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_exceptionSolveCommitPt', 'ebQuery', data);
});

// OPERATION
export const operationFetch = createAction(FETCH_OPERATION, data => {
  return httpFormClient.formSubmit('/EwDistributorAction_ewBankAduditFlowList', 'ebQuery', data);
});
