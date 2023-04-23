import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_FANGCHECOLLECT_LIST = 'YICHAKU/CARSTATISTICS/FETCH_FANGCHECOLLECT_LIST';
const UPDATE_FANGCHECOLLECT_LIST = 'YICHAKU/CARSTATISTICS/UPDATE_FANGCHECOLLECT_LIST';

const FETCH_POLICY_LIST = 'YICHAKU/CARSTATISTICS/FETCH_POLICY_LIST';
const UPDATE_POLICY_LIST = 'YICHAKU/CARSTATISTICS/UPDATE_POLICY_LIST';

const FETCH_DEALER_LIST = 'YICHAKU/CARSTATISTICS/FETCH_DEALER_LIST';
const UPDATE_DEALER_LIST = 'YICHAKU/CARSTATISTICS/UPDATE_DEALER_LIST';

const FETCH_USEDCAR_LIST = 'YICHAKU/CARSTATISTICS/FETCH_USEDCAR_LIST';
const UPDATE_USEDCAR_LIST = 'YICHAKU/CARSTATISTICS/UPDATE_USEDCAR_LIST';

const FETCH_SUPERVISOR_LIST = 'YICHAKU/CARSTATISTICS/FETCH_SUPERVISOR_LIST';
const UPDATE_SUPERVISOR_LIST = 'YICHAKU/CARSTATISTICS/UPDATE_SUPERVISOR_LIST';

const LOADING = 'YICHAKU/CARSTATISTICS/LOADING';

// Reducer
const reducer = handleActions(
    {
        [FETCH_FANGCHECOLLECT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    FangcheCollect: {
                        ...state.FangcheCollect,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 0),
                        },
                    },
                };
            },
        },
        [FETCH_POLICY_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    Policy: {
                        ...state.Policy,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 0),
                        },
                    },
                };
            },
        },
        [FETCH_DEALER_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    Dealer: {
                        ...state.Dealer,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 0),
                        },
                    },
                };
            },
        },
        [FETCH_USEDCAR_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    UsedCar: {
                        ...state.UsedCar,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 0),
                        },
                    },
                };
            },
        },
        [FETCH_SUPERVISOR_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    Supervisor: {
                        ...state.Supervisor,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 0),
                        },
                    },
                };
            },
        },
        [UPDATE_FANGCHECOLLECT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    FangcheCollect: {
                        ...state.FangcheCollect,
                        query: {
                            ...state.FangcheCollect.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_POLICY_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    Policy: {
                        ...state.Policy,
                        query: {
                            ...state.Policy.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_DEALER_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    Dealer: {
                        ...state.Dealer,
                        query: {
                            ...state.Dealer.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_USEDCAR_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    UsedCar: {
                        ...state.UsedCar,
                        query: {
                            ...state.UsedCar.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_SUPERVISOR_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    Supervisor: {
                        ...state.Supervisor,
                        query: {
                            ...state.Supervisor.query,
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
        loading: true,
        FangcheCollect: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        Policy: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        Dealer: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        UsedCar: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        Supervisor: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
    }
);

export default reducer;
//车辆汇总表
export const getFangcheCollect = createAction(FETCH_FANGCHECOLLECT_LIST, (data, paging) => {
    let url = '/warning/v1.0/fangche/fangcheCarDetail/list';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//差异化政策汇总管理
export const getPolicy = createAction(FETCH_POLICY_LIST, (data, paging) => {
    let url = '/warning/v1.0/fangche/fangchePolicy/list';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//免监管经销商
export const getDealer = createAction(FETCH_DEALER_LIST, (data, paging) => {
    let url = '/warning/v1.0/fangche/fangcheUnsupervisedDealer/list';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//查询二手车车辆明细
export const getUsedCar = createAction(FETCH_USEDCAR_LIST, (data, paging) => {
    let url = '/warning/v1.0/fangche/fangcheUsedCar/list';
    return httpCommonClient.postWithPaging(url, data, paging);
});

//查询经销商监管方台账
export const getSupervisor = createAction(FETCH_SUPERVISOR_LIST, (data, paging) => {
    let url = '/warning/v1.0/fangche/fangcheDealerSupervisor/list';
    return httpCommonClient.postWithPaging(url, data, paging);
});

export const updateFangcheCollect = createAction(UPDATE_FANGCHECOLLECT_LIST);
export const updatePolicy = createAction(UPDATE_POLICY_LIST);
export const updateDealer = createAction(UPDATE_DEALER_LIST);
export const updateUsedCar = createAction(UPDATE_USEDCAR_LIST);
export const updateSupervisor = createAction(UPDATE_SUPERVISOR_LIST);

