import { createAction, handleActions } from 'redux-actions';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
import moment from 'moment';
// Actions
const FETCH_DEALERLIST_LIST = 'YICHAKU/WARNING/FETCH_DEALERLIST_LIST';
const UPDATE_DEALERLIST_LIST = 'YICHAKU/WARNING/UPDATE_DEALERLIST_LIST';

const FETCH_BRANDLIST_LIST = 'YICHAKU/WARNING/FETCH_BRANDLIST_LIST';
const UPDATE_BRANDLIST_LIST = 'YICHAKU/WARNING/UPDATE_BRANDLIST_LIST';

const FETCH_SUPPLYCHAINLIST_LIST = 'YICHAKU/WARNING/FETCH_SUPPLYCHAINLIST_LIST';
const UPDATE_SUPPLYCHAINLIST_LIST = 'YICHAKU/WARNING/UPDATE_SUPPLYCHAINLIST_LIST';

const LOADING = 'YICHAKU/WARNING/LOADING';

// Reducer
const reducer = handleActions(
    {
        [FETCH_DEALERLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    DealerList: {
                        ...state.DealerList,
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
        [FETCH_BRANDLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    BrandList: {
                        ...state.BrandList,
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
        [FETCH_SUPPLYCHAINLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    SupplyChainList: {
                        ...state.SupplyChainList,
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
        [UPDATE_DEALERLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    DealerList: {
                        ...state.DealerList,
                        query: {
                            ...state.DealerList.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_BRANDLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    BrandList: {
                        ...state.BrandList,
                        query: {
                            ...state.BrandList.query,
                            ...action.payload,
                        },
                    },
                };
            },
        },
        [UPDATE_SUPPLYCHAINLIST_LIST]: {
            next(state, action) {
                return {
                    ...state,
                    SupplyChainList: {
                        ...state.SupplyChainList,
                        query: {
                            ...state.SupplyChainList.query,
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
        DealerList: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        BrandList: {
            list: [],
            paging: { current: 1, pageSize: 10, total: 10 },
            query: {
                value: {},
                expandForm: false,
                aitiForm: true,
            },
        },
        SupplyChainList: {
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
export const getDealerList = createAction(FETCH_DEALERLIST_LIST, (data, paging) => {
    let url = '/warning/v1.0/warning/repaymentAmount/dealer/state/list';
    return httpCommonClient.postWithPaging(url, data, paging);
});
export const getBrandList = createAction(FETCH_BRANDLIST_LIST, (data, paging) => {
    let url = '/warning/v1.0/warning/repaymentAmount/brand/state/list';
    return httpCommonClient.postWithPaging(url, data, paging);
});
export const getSupplyChainList = createAction(FETCH_SUPPLYCHAINLIST_LIST, (data, paging) => {
    let url = '/warning/v1.0/warning/repaymentAmount/supplyChain/state/list';
    return httpCommonClient.postWithPaging(url, data, paging);
});


export const updateDealerList = createAction(UPDATE_DEALERLIST_LIST);
export const updateBrandList = createAction(UPDATE_BRANDLIST_LIST);
export const updateSupplyChainList = createAction(UPDATE_SUPPLYCHAINLIST_LIST);

