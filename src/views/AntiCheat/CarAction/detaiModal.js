import React, { Component } from 'react';
import { Spin, Modal } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
export default class details extends Component {
    state = {
        loading: false,
        list: [],
        paging: { current: 1, pageSize: 10, total: 0 }
    };
    componentDidMount() {
        this.handleSearch();
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(page, pageSize);
    };
    handleSearch = (page, pageSize) => {
        this.setState({ loading: true });
        const { batchno } = this.props.record;
        httpCommonClient
            .post('/CarUnsupervisedDisAction_list', {
                batchno,
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
    render() {
        return (
            <Modal
                title='查看明细'
                width='90%'
                onCancel={() => this.props.onCancel()}
                visible
                footer={null}
            >
                <Spin spinning={this.state.loading}>
                    <EwAuditTable
                        columns={columnsCar}
                        data={this.state.list}
                        paging={this.state.paging}
                        onChange={this.handlePageChange}
                        onPageChange={this.handlePageChange}
                    />
                </Spin>
            </Modal>
        );
    }
}
const columnsCar = [
    { title: '经销商名称', dataIndex: 'distributorName' },
    { title: '车架号', dataIndex: 'chassis' },
    { title: '金额（元）', dataIndex: 'carprice' },
    { title: '车辆状态', dataIndex: 'carStatus' },
    { title: '备注', dataIndex: 'location' },
    { title: '地址', dataIndex: 'address' },
];
