import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { message } from 'antd';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient, httpBufferClient } from 'common/axios';
import moment from 'moment';
import { exportFile } from 'common/utils';
export default class dealer extends Component {
    state = {
        brandList: [],
        supplyChain: [],
        isExporting: false
    }
    componentDidMount() {
        this.getBrandList()
        this.getSupplyChain()
        this.handleSearch(this.props.query.value);
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(this.props.query.value, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        const values = { ...formValues };
        const { paramYearMonth, dealerName } = formValues;
        if (paramYearMonth) {
            values.paramYearMonth = paramYearMonth.format('YYYY/MM');
        } else {
            values.paramYearMonth = moment()
                .subtract(1, 'months')
                .format('YYYY/MM');
        }
        if (dealerName) {
            values.dealerName = dealerName.trim()
        }
        this.props.fetch(values, {
            pageNum: page || 1,
            pageSize: pageSize || 10,
        });
    };
    getBrandList() {
        httpCommonClient.post(`/warning/v1.0/warning/brand/list/all`, {}).then(respone => {
            if (respone.data.code === 200) {
                this.setState({ brandList: respone.data.data });
            }
        });
    }
    getSupplyChain() {
        httpCommonClient.postWithPaging('/warning/v1.0/warning/supplyChain/list', {}, { pageNum: 1, pageSize: 1000 })
            .then(({ data = {} }) => {
                this.setState({ supplyChain: data.data.list })
            })
    }
    //导出
    handleExport = () => {
        const hide = message.loading('导出中，请稍后。。。', 0);
        this.setState({
            isExporting: true,
        });
        const values = this.props.query.value;
        const { paramYearMonth, dealerName } = values;
        if (paramYearMonth) {
            values.paramYearMonth = paramYearMonth.format('YYYY/MM');
        } else {
            values.paramYearMonth = moment()
                .subtract(1, 'months')
                .format('YYYY/MM');
        }
        if (dealerName) {
            values.dealerName = dealerName.trim()
        }
        httpBufferClient
            .submit(this.props.exportUrl, values)
            .then(payload => {
                const result = exportFile(payload);
                result && message.warning(result, 2.5);
            })
            .then(res => {
                this.setState({
                    isExporting: false,
                });
                hide();
            })
            .catch(err => {
                message.error('操作失败');
            });
    };
    render() {
        const { match, list, loading, query, Columns } = this.props;
        return (
            <ViewWrapper>
                <FormArea>
                    <CCForm
                        onSearch={this.handleSearch}
                        path={match.path}
                        query={query}
                        onUpdateQuery={this.props.updateQuery}
                        brandList={this.state.brandList}
                        supplyChain={match.path.indexOf('brand') > -1 ? false : this.state.supplyChain}
                        supplyChainName='supplyChain'
                        width={match.path.indexOf('dealer') > -1 ? true : false}
                        enableExport={true}
                        onExport={this.handleExport}
                        isExporting={this.state.isExporting}
                    />
                </FormArea>
                <EwAuditTable
                    columns={Columns}
                    loading={loading}
                    data={list}
                    paging={this.props.paging}
                    onChange={this.handlePageChange}
                    onPageChange={this.handlePageChange}
                    bordered
                />
            </ViewWrapper>
        );
    }
}
