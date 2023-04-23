import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_CARRECEIVESPOT_LIST = 'YICHAKU/WARNING/FETCH_CARRECEIVESPOT_LIST';
const UPDATE_CARRECEIVESPOT_LIST = 'YICHAKU/WARNING/UPDATE_CARRECEIVESPOT_LIST';

const FETCH_CARINSPECT_LIST = 'YICHAKU/WARNING/FETCH_CARINSPECT_LIST';
const UPDATE_CARINSPECT_LIST = 'YICHAKU/WARNING/UPDATE_CARINSPECT_LIST';

const LOADING = 'YICHAKU/WARNING/LOADING';

// Reducer
const reducer = handleActions(
    {
        [FETCH_CARRECEIVESPOT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    CarReceiveSpot: {
                        ...state.CarReceiveSpot,
                        list: _get(action.payload.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.page, 'pageNum', 1),
                            pageSize: _get(action.payload.data.page, 'pageSize', 10),
                            total: _get(action.payload.data.page, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_CARINSPECT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    CarInspect: {
                        ...state.CarInspect,
                        list: _get(action.payload.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.page, 'pageNum', 1),
                            pageSize: _get(action.payload.data.page, 'pageSize', 10),
                            total: _get(action.payload.data.page, 'total', 1),
                        },
                    },
                };
            },
        },
        [UPDATE_CARRECEIVESPOT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    CarReceiveSpot: {
                        ...state.CarReceiveSpot,
                        query: {
                            ...state.CarReceiveSpot.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_CARINSPECT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    CarInspect: {
                        ...state.CarInspect,
                        query: {
                            ...state.CarInspect.query,
                            ...action.payload,
                        },
                    },
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
    },
    {
        CarReceiveSpot: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        CarInspect: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        loading: true,
    }
);

export default reducer;
//无监管接车接证列表
export const getCarReceiveSpot = createAction(FETCH_CARRECEIVESPOT_LIST, (data, paging) => {
    let url = '/SpotTestTaskAction_getCarReceiveSpotList';
    return httpCommonClient.post(url, { ...data, ...paging });
});
//无监管盘车盘证列表
export const getCarInspect = createAction(FETCH_CARINSPECT_LIST, (data, paging) => {
    let url = '/SpotTestTaskAction_getCarInspectList';
    return httpCommonClient.post(url, { ...data, ...paging });
});

export const updateCarReceiveSpot = createAction(UPDATE_CARRECEIVESPOT_LIST);
export const updateCarInspect = createAction(UPDATE_CARINSPECT_LIST);

