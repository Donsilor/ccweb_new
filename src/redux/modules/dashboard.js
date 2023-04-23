import { createAction, handleActions } from 'redux-actions';
import httpClient from 'common/axios';

// Actions
const LOADING = 'YICHAKU/DASHBOARD/LOADING';
const FETCH = 'YICHAKU/DASHBOARD/FETCH';

// Reducer
const reducer = handleActions(
  {
    [FETCH]: {
      next(state: any, action: any) {
        return {
          ...state,
          ...{
            totalVisitCount: action.payload.data.totalVisitCount,
            dayVisitCount: action.payload.data.dayVisitCount,
          },
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
  { totalVisitCount: 0, dayVisitCount: 0 }
);

export default reducer;

// Action Creators
export const fetch = createAction(FETCH, () => httpClient.get('/dashboard/count'));
