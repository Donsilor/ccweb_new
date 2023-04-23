import React, { Component } from 'react';
import { Spin } from 'antd';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
export default class uploadView extends Component {
    state = {
        list: [],
        paging: { current: 1, pageSize: 10, total: 0 },
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
            .post(`/DistributorAction_listOnTheWayCars`, {
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
        return (
            <ViewWrapper>
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
    {
        title: '更新结果', dataIndex: 'processStatus',
        render: (text) => {
            if (text === '0') {
                return '待处理'
            } else if (text === '1') {
                return '成功'
            } else {
                return '失败'
            }
        }
    },
    { title: '备注', dataIndex: 'remark' },
];
