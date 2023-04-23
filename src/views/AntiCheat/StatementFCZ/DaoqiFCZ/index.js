import React, { Component } from 'react';
import { Button, Modal, Upload, message, Spin } from 'antd';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
const { confirm } = Modal;
export default class uploadView extends Component {
    state = {
        loading: false,
        list: [],
        paging: { current: 1, pageSize: 10, total: 0 }
    };
    columns = [
        { title: '文件名', dataIndex: 'fileName' },
        { title: '上传时间', dataIndex: 'uploadTime' },
        { title: '处理状态', dataIndex: 'ledgerStatus', },
        { title: '台账生成时间', dataIndex: 'generateTime' },
        { title: '累计下载次数', dataIndex: 'downloadTimes' },
        {
            title: '操作',
            render: (text, record) => (
                <div>
                    {record.ledgerStatus == '待生成台账' && (
                        <div>
                            <a href="javascript:;" onClick={() => {
                                this.setState({ loading: true });
                                httpCommonClient
                                    .post(`/warning/v1.0/fangche/fangcheLedger/generate/RemindMaturedNote`, { importRecordId: record.importRecordId })
                                    .then(({ data = {} }) => {
                                        if (data.code === 200) {
                                            message.success(data.message);
                                            this.handleSearch();
                                        } else {
                                            message.error(data.message);
                                            this.setState({ loading: false });
                                        }
                                    });
                            }}>
                                生成台账
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="javascript:;" onClick={this.deleOper(record)}>
                                删除
                            </a>
                        </div>
                    )}
                    {record.ledgerStatus == '台账已生成' && (
                        <a
                            onClick={() => {
                                httpCommonClient
                                    .post(`/warning/v1.0/fangche/fangcheLedger/update/downloadTimes`, { id: record.fangcheLedgerId })
                                    .then(({ data = {} }) => {
                                        if (data.code === 200) {
                                            message.success(data.message);
                                            this.handleSearch();
                                        } else {
                                            message.error(data.message);
                                        }
                                    });
                            }}
                            href={`/warning${record.fileUrl}`}
                        >
                            下载
                        </a>
                    )}
                </div>
            ),
        },
    ];
    //删除
    deleOper = record => () => {
        let self = this;
        confirm({
            title: '请确认是否删除该文件?',
            onOk() {
                httpCommonClient
                    .post(`/warning/v1.0/warning/importRecord/delete`, { id: record.importRecordId })
                    .then(({ data = {} }) => {
                        if (data.code === 200) {
                            message.success(data.message);
                            self.handleSearch();
                        } else {
                            message.error(data.message);
                        }
                    });
            },
        });
    };
    componentDidMount() {
        this.handleSearch();
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(page, pageSize);
    };
    handleSearch = (page, pageSize) => {
        this.setState({ loading: true });
        httpCommonClient
            .postWithPaging(`/warning/v1.0/fangche/fangcheLedger/list/RemindMaturedNote`, {}, {
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
        let that = this;
        let uploadConfig = {
            name: 'file',
            action: '/warning/v1.0/warning/importRecord/upload',
            data: { sourceType: 'source_type_100' },
            accept: '.xls,.xlsx',
            beforeUpload(file) {
                that.setState({ loading: true });
            },
            onChange(info) {
                if (info.file.status === 'done') {
                    if (info.file && info.file.response) {
                        if (info.file.response.code === 200) {
                            that.setState({ loading: false });
                            message.success('上传成功');
                            that.handleSearch();
                        } else {
                            that.setState({ loading: false });
                            message.error(info.file.response.message);
                        }
                    }
                } else if (info.file.status === 'error') {
                    that.setState({ loading: false });
                    message.error(`${info.file.name} 上传失败`);
                }
            },
        };
        return (
            <ViewWrapper>
                <Spin spinning={this.state.loading}>
                    <Upload {...uploadConfig}>
                        <Button type="primary">请选择一个excel文件</Button>
                    </Upload>
                    <br />
                    <EwAuditTable
                        rowKey='importRecordId'
                        columns={this.columns}
                        data={this.state.list}
                        paging={this.state.paging}
                        onChange={this.handlePageChange}
                        onPageChange={this.handlePageChange}
                    />
                </Spin>
            </ViewWrapper>
        );
    }
}
