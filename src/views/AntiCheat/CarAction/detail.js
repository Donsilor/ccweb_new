import React, { Component } from 'react';
import { Spin } from 'antd';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import DetaiModal from './detaiModal'
export default class uploadView extends Component {
    state = {
        list: [],
        paging: { current: 1, pageSize: 10, total: 0 },
        showModal: false,
        loading: false,
    };
    columns = [
        { title: '批次号', dataIndex: 'batchno' },
        { title: '经销商', dataIndex: 'batchno1', render: () => this.props.match.params.dis },
        { title: '上传文件名', dataIndex: 'uploadFileName' },
        { title: '上传时间', dataIndex: 'uploadTime' },
        { title: '处理时间', dataIndex: 'opTime' },
        {
            title: '处理状态',
            dataIndex: 'status',
            render: text => {
                if (text == '1') {
                    return '上传成功，待导入';
                } else if (text == '2') {
                    return '导入成功';
                } else {
                    return '导入失败';
                }
            },
        },
        {
            title: '操作',
            render: (text, record) => (
                <div>
                    {record.status == '2' && (
                        <div>
                            <a href="javascript:;" onClick={() => this.setState({ showModal: true, record: { batchno: record.batchno } })}>
                                查看明细
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href={record.file.absolutePath} download={record.file.fileName}>
                                下载
                            </a>
                        </div>
                    )}
                </div>
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
            .post(`/CarDataUploadAction_list`, {
                departid: this.props.match.params.id,
                fileType: "53",
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
                {
                    this.state.showModal && <DetaiModal record={this.state.record} onCancel={() => this.setState({ showModal: false })} />
                }
                <OperationArea>
                    <BackToList />
                </OperationArea>
            </ViewWrapper>
        );
    }
}
