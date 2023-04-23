import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import menus from 'common/menuConfig';

// Actions
const LOADING = 'YICHAKU/COMMON/LOADING';
const LOGIN = 'YICHAKU/LOGIN/LOGIN';
const APIERROR = 'YICHAKU/COMMON/APIERROR';

// Reducer
const reducer = handleActions(
  {
    [APIERROR]: {
      next(state, action) {
        return {
          ...state,
          errorMsg: action.payload || '后台接口错误',
        };
      },
    },
    [LOADING]: {
      next(state, action) {
        return {
          ...state,
          loading: action.loading,
        };
      },
    },
    [LOGIN]: {
      next(state, action) {
        if (action && action.payload && action.payload.data && action.payload.data.success) {
          return {
            ...state,
            menus: action.payload.data._menus,
          };
        } else {
          return state;
        }
      },
    },
  },
  { menus, iframe: false, errorMsg: '', loading: true }
);

export default reducer;
