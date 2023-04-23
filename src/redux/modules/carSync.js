import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
// Actions
const FETCH_INOUT_LIST = 'YICHAKU/WARNING/FETCH_INOUT_LIST';
const UPDATE_INOUT_LIST = 'YICHAKU/WARNING/UPDATE_INOUT_LIST';

const FETCH_SEND_LIST = 'YICHAKU/WARNING/FETCH_SEND_LIST';
const UPDATE_SEND_LIST = 'YICHAKU/WARNING/UPDATE_SEND_LIST';

const FETCH_DISLIST_LIST = 'YICHAKU/WARNING/FETCH_DISLIST_LIST';
const UPDATE_DISLIST_LIST = 'YICHAKU/WARNING/UPDATE_DISLIST_LIST';

const FETCH_DISACCOUNT_LIST = 'YICHAKU/WARNING/FETCH_DISACCOUNT_LIST';
const UPDATE_DISACCOUNT_LIST = 'YICHAKU/WARNING/UPDATE_DISACCOUNT_LIST';

const FETCH_DISEXPOSURE_LIST = 'YICHAKU/WARNING/FETCH_DISEXPOSURE_LIST';
const UPDATE_DISEXPOSURE_LIST = 'YICHAKU/WARNING/UPDATE_DISEXPOSURE_LIST';

const FETCH_DISSETTLEMENT_LIST = 'YICHAKU/WARNING/FETCH_DISSETTLEMENT_LIST';
const UPDATE_DISSETTLEMENT_LIST = 'YICHAKU/WARNING/UPDATE_DISSETTLEMENT_LIST';

const FETCH_CARRETURN_LIST = 'YICHAKU/WARNING/FETCH_CARRETURN_LIST';
const UPDATE_CARRETURN_LIST = 'YICHAKU/WARNING/UPDATE_CARRETURN_LIST';

const LOADING = 'YICHAKU/WARNING/LOADING';

// Reducer
const reducer = handleActions(
    {
        [FETCH_INOUT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    inout: {
                        ...state.inout,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_SEND_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    send: {
                        ...state.send,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_DISLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    dislist: {
                        ...state.dislist,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_DISACCOUNT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    disaccount: {
                        ...state.disaccount,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_DISEXPOSURE_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    disexposure: {
                        ...state.disexposure,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_DISSETTLEMENT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    dissettlement: {
                        ...state.dissettlement,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [FETCH_CARRETURN_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    CarReturn: {
                        ...state.CarReturn,
                        list: _get(action.payload.data.data, 'list', []),
                        paging: {
                            current: _get(action.payload.data.data, 'pageNum', 1),
                            pageSize: _get(action.payload.data.data, 'pageSize', 10),
                            total: _get(action.payload.data.data, 'total', 1),
                        },
                    },
                };
            },
        },
        [UPDATE_INOUT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    inout: {
                        ...state.inout,
                        query: {
                            ...state.inout.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_SEND_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    send: {
                        ...state.send,
                        query: {
                            ...state.send.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_DISLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    dislist: {
                        ...state.dislist,
                        query: {
                            ...state.dislist.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_DISACCOUNT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    disaccount: {
                        ...state.disaccount,
                        query: {
                            ...state.disaccount.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_DISEXPOSURE_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    disexposure: {
                        ...state.disexposure,
                        query: {
                            ...state.disexposure.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_DISSETTLEMENT_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    dissettlement: {
                        ...state.dissettlement,
                        query: {
                            ...state.dissettlement.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_CARRETURN_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    CarReturn: {
                        ...state.CarReturn,
                        query: {
                            ...state.CarReturn.query,
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
        inout: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        send: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        dislist: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        disaccount: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        disexposure: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        dissettlement: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        CarReturn: {
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
//车辆入库和赎车明细列表
export const getCarinout = createAction(FETCH_INOUT_LIST, (data, paging) => {
    let url = '/warning/v1.0/sync/show/list/car/in/out';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//发车明细列表
export const getCarsend = createAction(FETCH_SEND_LIST, (data, paging) => {
    let url = '/warning/v1.0/sync/show/list/car/send';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//经销商列表
export const getDislist = createAction(FETCH_DISLIST_LIST, (data, paging) => {
    let url = '/warning/v1.0/sync/show/list/distributor';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//经销商出账信息列表
export const getDisaccount = createAction(FETCH_DISACCOUNT_LIST, (data, paging) => {
    let url = '/warning/v1.0/sync/show/list/distributor/accounting';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//单笔业务敞口更新列表
export const getDisexposure = createAction(FETCH_DISEXPOSURE_LIST, (data, paging) => {
    let url = '/warning/v1.0/sync/show/list/distributor/exposure';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//单笔业务到期结清列表
export const getDissettlement = createAction(FETCH_DISSETTLEMENT_LIST, (data, paging) => {
    let url = '/warning/v1.0/sync/show/list/distributor/settlement';
    return httpCommonClient.postWithPaging(url, data, paging);
});
//退货明细列表
export const getCarReturn = createAction(FETCH_CARRETURN_LIST, (data, paging) => {
    let url = '/warning/v1.0/sync/show/list/car/return';
    return httpCommonClient.postWithPaging(url, data, paging);
});

export const updateCarinout = createAction(UPDATE_INOUT_LIST);
export const updateCarsend = createAction(UPDATE_SEND_LIST);
export const updateDislist = createAction(UPDATE_DISLIST_LIST);
export const updateDisaccount = createAction(UPDATE_DISACCOUNT_LIST);
export const updateDisexposure = createAction(UPDATE_DISEXPOSURE_LIST);
export const updateDissettlement = createAction(UPDATE_DISSETTLEMENT_LIST);
export const updateCarReturn = createAction(UPDATE_CARRETURN_LIST);

