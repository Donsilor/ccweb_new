import React, { Component } from 'react';
import { Modal, Spin, Table, message } from 'antd';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
export default class uploadView extends Component {
    state = {
        loading: false,
        list: [],
        itemList: [],
        paging: { current: 1, pageSize: 10, total: 0 },
        showModal: false
    };
    columns = [
        { title: '操作时间', dataIndex: 'createTime' },
        { title: '导入类型', dataIndex: 'sourceImportType' },
        { title: '台账生成时间', dataIndex: 'generateTime' },
        {
            title: '操作',
            render: (text, record) => (
                <a
                    href="javascript:;"
                    onClick={() => {
                        this.setState({ loading: true })
                        httpCommonClient.post(`/warning/v1.0/fangche/fangcheDataSourceImport/archive/list`,
                            { id: record.id })
                            .then(({ data = {} }) => {
                                if (data.code === 200) {
                                    this.setState({ itemList: data.data, showModal: true })
                                } else {
                                    message.error(data.message)
                                }
                                this.setState({ loading: false })
                            });
                    }}
                >
                    查看
                </a>
            ),
        },
    ];
    componentDidMount() {
        this.handleSearch();
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(page, pageSize);
    };
    handleSearch = (page, pageSize) => {
        this.setState({ loading: true });
        httpCommonClient
            .postWithPaging(`/warning/v1.0/fangche/fangcheDataSourceImport/list`, {}, {
                pageNum: page || 1,
                pageSize: pageSize || 10,
            })
            .then(({ data = {} }) => {
                if (data.code === 200) {
                    this.setState({
                        loading: false, list: data.data.list, paging: {
                            current: data.data.pageNum,
                            pageSize: data.data.pageSize,
                            total: data.data.total,
                        }
                    });
                } else {
                    this.setState({ loading: false, list: [] });
                }
            });
    };
    render() {
        return (
            <ViewWrapper>
                <Spin spinning={this.state.loading}>
                    <EwAuditTable
                        columns={this.columns}
                        data={this.state.list}
                        paging={this.state.paging}
                        onChange={this.handlePageChange}
                        onPageChange={this.handlePageChange}
                    />
                </Spin>
                {/* 查看明细*/}
                {this.state.showModal && (
                    <Modal
                        title='查看明细'
                        width='90%'
                        onCancel={() => this.setState({ showModal: false })}
                        visible
                        footer={null}
                    >
                        <Table
                            rowKey="id"
                            columns={columnsItem}
                            dataSource={this.state.itemList}
                            loading={this.state.loading}
                            scroll={{ x: true }}
                            pagination={false}
                        />
                    </Modal>
                )}
            </ViewWrapper>
        );
    }
}
const columnsItem = [
    { title: '数据源名称', dataIndex: 'dataSourceName' },
    { title: '上传文件名', dataIndex: 'name' },
    {
        title: '处理状态',
        dataIndex: 'importStatusCode',
        render: text => {
            if (text == 'import_status_0') {
                return '待上传';
            } else if (text == 'import_status_1') {
                return '待导入';
            } else if (text == 'import_status_2') {
                return '导入完成';
            } else if (text == 'import_status_3') {
                return '导入中';
            }
        },
    },
    { title: '文件上传时间', dataIndex: 'uploadTime' },
    { title: '文件导入时间', dataIndex: 'importTime' },
];