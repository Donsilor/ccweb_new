import React from 'react';
const 经销商名称 = {
    title: '经销商名称',
    dataIndex: 'dealerName',
};
const 年月 = {
    title: '年月',
    dataIndex: 'yearMonth',
};
const 品牌名称 = {
    title: '品牌名称',
    dataIndex: 'brandName',
};
const 末次还款日期 = {
    title: '末次还款日期',
    dataIndex: 'lastPaymentDate',
};
const 距今几天没有赎车 = {
    title: '距今N天没有赎车',
    dataIndex: 'noRedeemCarDays',
};
const 本月销量 = {
    title: '本月销量',
    dataIndex: 'curMonthSalesVolume',
};
const 上月销量 = {
    title: '上月销量',
    dataIndex: 'lastMonthSalesVolume',
};
const 供应链名称 = {
    title: '供应链名称',
    dataIndex: 'supplyChain',
};
const 距今N天没有出账 = {
    title: '距今N天没有出账',
    dataIndex: 'noAccountDays',
};
const 销量较上月涨幅降幅 = {
    title: '较上月涨幅／降幅',
    dataIndex: 'salesVolumeCLMIncRate',
};
const 销量较上半年平均值涨幅降幅 = {
    title: '较上半年平均值涨幅/降幅',
    dataIndex: 'salesVolumeCHYIncRate',
};
const 销量较去年同期涨幅降幅 = {
    title: '较去年同期涨幅/降幅',
    dataIndex: 'salesVolumeSPLIncRate',
};
const 销量较上一年平均值涨幅降幅 = {
    title: '较上一年平均值涨幅/降幅',
    dataIndex: 'salesVolumeLYIncRate',
};
const 销量异常标记 = {
    title: '销量异常标记',
    dataIndex: 'salesAbnormal',
};
const 本月回款 = {
    title: '本月回款',
    dataIndex: 'curMonthActualPayment',
};
const 上月回款 = {
    title: '上月回款',
    dataIndex: 'lastMonthActualPayment',
};
const 回款较上月涨幅降幅 = {
    title: '较上月涨幅/降幅',
    dataIndex: 'actualPaymentCLMIncRate',
};
const 回款较上半年平均值涨幅降幅 = {
    title: '较上半年平均值涨幅/降幅',
    dataIndex: 'actualPaymentCHYIncRate',
};
const 回款较去年同期涨幅降幅 = {
    title: '较去年同期涨幅/降幅',
    dataIndex: 'actualPaymentSPLIncRate',
};
const 回款较上一年平均值涨幅降幅 = {
    title: '较上一年平均值涨幅/降幅',
    dataIndex: 'actualPaymentLYIncRate',
};
const 回款异常标记 = {
    title: '回款异常标记',
    dataIndex: 'actualPaymentAbnormal',
};

export const dealerColumns = [
    年月,
    经销商名称,
    品牌名称,
    供应链名称,
    末次还款日期,
    距今几天没有赎车,
    距今N天没有出账,
    {
        title: '销量台数',
        children: [
            本月销量,
            上月销量,
            销量较上月涨幅降幅,
            销量较上半年平均值涨幅降幅,
            销量较去年同期涨幅降幅,
            销量较上一年平均值涨幅降幅,
            销量异常标记
        ]
    },
    {
        title: '回款金额',
        children: [
            本月回款,
            上月回款,
            回款较上月涨幅降幅,
            回款较上半年平均值涨幅降幅,
            回款较去年同期涨幅降幅,
            回款较上一年平均值涨幅降幅,
            回款异常标记
        ]
    }
];
export const brandColumns = [
    年月,
    品牌名称,
    {
        title: '销量台数',
        children: [
            本月销量,
            上月销量,
            销量较上月涨幅降幅,
            销量较上半年平均值涨幅降幅,
            销量较去年同期涨幅降幅,
            销量较上一年平均值涨幅降幅,
        ]
    },
    {
        title: '回款金额',
        children: [
            本月回款,
            上月回款,
            回款较上月涨幅降幅,
            回款较上半年平均值涨幅降幅,
            回款较去年同期涨幅降幅,
            回款较上一年平均值涨幅降幅,
        ]
    },

];
export const supplyChainColumns = [
    年月,
    品牌名称,
    供应链名称,
    {
        title: '销量台数',
        children: [
            本月销量,
            上月销量,
            销量较上月涨幅降幅,
            销量较上半年平均值涨幅降幅,
            销量较去年同期涨幅降幅,
            销量较上一年平均值涨幅降幅,
        ]
    },
    {
        title: '回款金额',
        children: [
            本月回款,
            上月回款,
            回款较上月涨幅降幅,
            回款较上半年平均值涨幅降幅,
            回款较去年同期涨幅降幅,
            回款较上一年平均值涨幅降幅,
        ]
    },
];

