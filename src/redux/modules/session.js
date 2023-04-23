import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient, httpFormClient } from 'common/axios';

// Actions
const INIT = 'YICHAKU/LOGIN/INIT';
const SESSION_EXPIRED = 'YICHAKU/LOGIN/SESSION_EXPIRED';
const ACTION_FETCH_ALLREGIONS = 'YICHAKU/LOGIN/ACTION_FETCH_ALLREGIONS';
const LOGIN = 'YICHAKU/LOGIN/LOGIN';
const LOGOUT = 'YICHAKU/LOGIN/LOGOUT';

// Reducer
const reducer = handleActions(
  {
    [INIT]: {
      next(state, action) {
        return {
          ...state,
          data: action.payload.data.data || {},
          dealer: action.payload.data.dealer || {},
          isLogin: true,
        };
      },
      throw(state, action) {
        return {
          ...state,
          isLogin: false,
        };
      },
    },
    [SESSION_EXPIRED]: {
      next(state, action) {
        return {
          ...state,
          isLogin: false,
        };
      },
    },
    [ACTION_FETCH_ALLREGIONS]: {
      next(state, action) {
        return {
          ...state,
          regionList: combineRegion(action.payload.data.provinceList, action.payload.data.cityList),
          regionListAll: allRegion(
            action.payload.data.provinceList,
            action.payload.data.cityList,
            action.payload.data.areaList
          ),
        };
      },
    },
    [LOGIN]: {
      next(state, action) {
        return {
          ...state,
        };
      },
    },
    [LOGOUT]: {
      next(state, action) {
        return { data: {} };
      },
    },
  },
  { data: {}, regionList: [], isLogin: null, dealer: {} }
);

export default reducer;

export const init = createAction(INIT, () => httpCommonClient.post('/UserAction_getStore'));

export const login = createAction(LOGIN, data => httpFormClient.formSubmit('/UserAction_login.action', 'user', data));

export const fetchAllRegions = createAction(ACTION_FETCH_ALLREGIONS, () =>
  httpCommonClient.post('/AjaxAction_getAllRegions')
);

export const sessionExpired = createAction(SESSION_EXPIRED);

export const logout = createAction(LOGOUT, () => httpCommonClient.post('/logout'));

const combineRegion = (provinceList = [], cityList = []) => {
  return provinceList.map(province => {
    return {
      ...province,
      list: cityList.filter(city => String(city.value).startsWith(province.value)),
    };
  });
};
const allRegion = (provinceList = [], cityList = [], areaList = []) => {
  return provinceList.map(province => {
    return {
      ...province,
      list: cityList
        .filter(city => String(city.value).startsWith(province.value))
        .map(city => {
          return {
            label: city.label,
            value: city.value,
            list: areaList.filter(area => String(area.value).startsWith(city.value)),
          };
        }),
    };
  });
};
