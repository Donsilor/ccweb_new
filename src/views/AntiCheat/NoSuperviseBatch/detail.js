import React, { Component } from 'react';
import { Spin } from 'antd';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { httpCommonClient } from 'common/axios';
export default class uploadView extends Component {
    state = {
        list: [],
        values: {},
        paging: { current: 1, pageSize: 10, total: 0 },
        showModal: false,
        loading: false,
    };
    componentDidMount() {
        this.handleSearch();
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch({}, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        this.setState({ loading: true });
        httpCommonClient
            .post(`/CarUnsupervisedBtAction_listCarUnsupervisedBt`, {
                ...this.state.values,
                batchno: this.props.match.params.id,
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
            }).catch(() => {
                this.setState({ loading: false, list: [] });
            });
    };
    render() {
        const { match } = this.props;
        return (
            <ViewWrapper>
                <FormArea>
                    <CCForm
                        onSearch={this.handleSearch}
                        path={match.path}
                        query={{ aitiForm: true }}
                        onUpdateQuery={query => {
                            this.setState({ values: query.value })
                        }}
                    />
                </FormArea>
                <Spin spinning={this.state.loading}>
                    <EwAuditTable
                        columns={columns}
                        data={this.state.list}
                        paging={this.state.paging}
                        onChange={this.handlePageChange}
                        onPageChange={this.handlePageChange}
                    />
                </Spin>
                <OperationArea>
                    <BackToList />
                </OperationArea>
            </ViewWrapper>
        );
    }
}
const columns = [
    { title: '经销商', dataIndex: 'distributorName' },
    { title: '车架号', dataIndex: 'chassis' },
    { title: '是否盘车', dataIndex: 'spotCarFlag' },
    { title: '盘车任务下发结果', dataIndex: 'spotCarResult' },
    { title: '盘车任务下发结果描述', dataIndex: 'spotCarRemark' },
    { title: '是否盘证', dataIndex: 'spotCertFlag' },
    { title: '盘证任务下发结果', dataIndex: 'spotCertResult' },
    { title: '盘证任务下发结果描述', dataIndex: 'spotCertRemark' }
];