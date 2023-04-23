import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient, httpFormClient } from 'common/axios';

// Actions
const FETCH_PRINTMANAGEMENT = 'YICHAKU/TABDATA/FETCH_PRINTMANAGEMENT';
const FETCH_CARSEARCH_MANAGEMENT = 'YICHAKU/TABDATA/FETCH_CARSEARCH_MANAGEMENT';

// Reducer
const reducer = handleActions(
  {
    [FETCH_PRINTMANAGEMENT]: {
      next(state: any, action: any) {
        return {
          ...state,
          initialTransferIn: action.payload.data.initTurnIn || null,
          supplementaryTransferIn: action.payload.data.addTurnIn || null,
          currentInit: action.payload.data.currentInit || null,
          currentSupplement: action.payload.data.currentAdd || null,
          transferOut: action.payload.data.turnOut || null,
        };
      },
    },
    [FETCH_CARSEARCH_MANAGEMENT]: {
      next(state: any, action: any) {
        return {
          ...state,
          carTrail: action.payload.data.carTrackCnt || null,
          currentTask: action.payload.data.spottestUndoneCnt || null,
          taskHistory: action.payload.data.spottestHistoryCnt || null,
        };
      },
    },
  },
  {
    initialTransferIn: null,
    supplementaryTransferIn: null,
    currentInit: null,
    currentSupplement: null,
    transferOut: null,

    // CAR
    carTrail: null,
    currentTask: null,
    taskHistory: null,
  }
);

export default reducer;

// Action Creators
export const fetchPrintManagement = createAction(FETCH_PRINTMANAGEMENT, data =>
  httpFormClient.formSubmit('/BondPrintAction_getBondCount', 'bpQuery', data)
);
export const fetchCarSearchManagement = createAction(FETCH_CARSEARCH_MANAGEMENT, data =>
  httpFormClient.formSubmit('/CarAction_getStatisticsInfo', '', data)
);
