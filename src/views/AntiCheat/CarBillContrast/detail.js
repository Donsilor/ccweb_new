import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { message } from 'antd';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
const dateFormat = 'YYYY-MM-DD';
export default class listView extends Component {
    state = {
        isExporting: false,
        value: {},
        list: [],
        paging: { current: 1, pageSize: 10, total: 0 },
    };
    formValues = () => {
        const values = this.state.value;
        const { unBillDaysArr, buyTime, baiWangBillDate, hangxinBillDate } = values;
        if (unBillDaysArr && typeof unBillDaysArr == 'object') {
            values.unBillDaysArr = values.unBillDaysArr.join(',')
        }
        if (buyTime) {
            const [startTime, endTime] = buyTime;
            values.buyTimeStart = startTime && startTime.format(dateFormat);
            values.buyTimeEnd = endTime && endTime.format(dateFormat);
            delete values.buyTime;
        }
        if (baiWangBillDate) {
            const [startTime, endTime] = baiWangBillDate;
            values.baiWangBillDateStart = startTime && startTime.format(dateFormat);
            values.baiWangBillDateEnd = endTime && endTime.format(dateFormat);
            delete values.baiWangBillDate;
        }
        if (hangxinBillDate) {
            const [startTime, endTime] = hangxinBillDate;
            values.hangxinBillDateStart = startTime && startTime.format(dateFormat);
            values.hangxinBillDateEnd = endTime && endTime.format(dateFormat);
            delete values.hangxinBillDate;
        }
        return values
    }
    componentDidMount() {
        this.handleSearch();
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch({}, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        this.setState({ loading: true });
        httpCommonClient
            .post(`/CarAction_searchCarBillContrastList`, {
                ...this.formValues(),
                distributorId: this.props.match.params.id,
                distributorName: this.props.match.params.name,
                pageNum: page || 1,
                pageSize: pageSize || 10,
            })
            .then(({ data = {} }) => {
                if (data.result === 0) {
                    this.setState({
                        loading: false, list: data.list, paging: {
                            current: data.page.pageNum,
                            pageSize: data.page.pageSize,
                            total: data.page.total,
                        }
                    });
                } else {
                    this.setState({ loading: false, list: [] });
                }
            });
    };
    //导出
    handleExport = () => {
        const hide = message.loading('导出中，请稍后。。。', 0);
        this.setState({ isExporting: true });
        httpBufferClient
            .submit('/CarAction_exportCarBillContrastList', { distributorId: this.props.match.params.id, ...this.formValues() })
            .then(payload => {
                const result = exportFile(payload);
                result && message.warning(result, 2.5);
            })
            .then(res => {
                this.setState({ isExporting: false, });
                hide();
            })
            .catch(err => {
                message.error('操作失败');
            });
    };
    render() {
        const { paging, list, loading, isExporting } = this.state;
        return (
            <ViewWrapper>
                <FormArea>
                    <CCForm
                        onSearch={this.handleSearch}
                        path='/carBillContrast/detail'
                        query={{
                            value: {},
                            expandForm: false,
                            aitiForm: true,
                        }}
                        onUpdateQuery={query => {
                            this.setState({ value: query.value });
                        }}
                        enableExport={true}
                        onExport={this.handleExport}
                        isExporting={isExporting}
                    />
                </FormArea>
                <EwAuditTable
                    columns={columns}
                    loading={loading}
                    data={list}
                    paging={paging}
                    onChange={this.handlePageChange}
                    onPageChange={this.handlePageChange}
                />
                <OperationArea>
                    <BackToList />
                </OperationArea>
            </ViewWrapper>
        );
    }
}
export const columns = [
    { title: '经销商', dataIndex: 'distributorName' },
    { title: '车架号', dataIndex: 'chassis' },
    { title: '系统赎车日期', dataIndex: 'buyTime' },
    { title: '百望开票日期', dataIndex: 'baiWangBillDate' },
    { title: '航天金税开票日期', dataIndex: 'hangxinBillDate' },
    {
        title: '赎车是否超3天', dataIndex: 'isBuyTimeMoreThan3Days',
        render: (text) => {
            if (text === 0) {
                return '否'
            } else if (text === 1) {
                return '是'
            } else {
                return ''
            }
        }
    },
    { title: '未开票天数', dataIndex: 'unBillDays' },
];