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
        paging: { current: 1, pageSize: 10, total: 0 },
        fileList: []
    };
    columns = [
        { title: '批次号', dataIndex: 'batchno' },
        { title: '文件名', dataIndex: 'uploadFileName' },
        { title: '上传人', dataIndex: 'uploadUserName' },
        { title: '上传时间', dataIndex: 'uploadTime' },
        {
            title: '处理状态',
            dataIndex: 'status',
            render: text => {
                if (text == '1') {
                    return '上传成功,待导入';
                } else if (text == '2' || text == '4') {
                    return '导入成功';
                } else if (text == '3') {
                    return '导入失败';
                }
            },
        },
        {
            title: '下发状态',
            dataIndex: 'status',
            render: text => {
                if (text == '4') {
                    return '已下发';
                }
            },
        },
        {
            title: '操作',
            render: (text, record) => (
                <div>
                    {['1', '3'].includes(record.status) && (
                        <div>
                            <a href="javascript:;" onClick={this.importOper(record)}>
                                导入
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="javascript:;" onClick={this.deleOper(record)}>
                                删除
                            </a>
                        </div>
                    )}
                    {['2', '4'].includes(record.status) && <a
                        style={{ marginRight: '10px' }}
                        href="javascript:;"
                        onClick={() => {
                            this.props.history.push(`/noSuperviseBatch/detail/${record.batchno}`);
                        }}
                    >
                        查看
                    </a>}
                    {record.status == '2' && (
                        <a
                            href="javascript:;"
                            onClick={() => {
                                let self = this;
                                confirm({
                                    title: '请确认是下发该任务?',
                                    onOk() {
                                        self.setState({ loading: true });
                                        httpCommonClient
                                            .post(`/CarUnsupervisedBtAction_generateTask`, { batchno: record.batchno })
                                            .then(({ data = {} }) => {
                                                if (data.result === 0) {
                                                    self.handleSearch();
                                                    message.success(data.msg)
                                                } else {
                                                    self.setState({ loading: false });
                                                    Modal.error({
                                                        title: '提示信息：',
                                                        content: data.msg,
                                                    });
                                                }
                                            }).catch(() => {
                                                self.setState({ loading: false });
                                                message.error('系统异常')
                                            });
                                    },
                                });
                            }}
                        >
                            下发
                        </a>
                    )}
                </div>
            ),
        },
    ];
    //导入
    importOper = record => () => {
        let self = this;
        confirm({
            title: '请确认是否导入该文件?',
            onOk() {
                self.setState({ loading: true });
                httpCommonClient
                    .post(`/CarDataUploadAction_importData`, { uploadFileId: record.uploadFileId })
                    .then(({ data = {} }) => {
                        if (data.result === 0) {
                            message.success(data.msg)
                        } else {
                            Modal.error({
                                title: '提示信息：',
                                content: data.msg,
                            });
                        }
                        self.setState({ loading: false });
                        self.handleSearch();
                    }).catch(() => {
                        self.setState({ loading: false });
                        message.error('系统异常')
                    });
            },
        });
    };
    //删除
    deleOper = record => () => {
        let self = this;
        confirm({
            title: '请确认是否删除该文件?',
            onOk() {
                httpCommonClient
                    .post(`/CarDataUploadAction_del`, { uploadFileId: record.uploadFileId })
                    .then(({ data = {} }) => {
                        if (data.result === 0) {
                            message.success(data.msg);
                        } else {
                            message.error(data.msg);
                        }
                        self.handleSearch();
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
            .post(`/CarDataUploadAction_list`, {
                fileType: "54",
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
        let that = this;
        let uploadConfig = {
            name: 'file',
            action: '/CarDataUploadAction_uploadFile',
            data: { fileType: '54' },
            accept: '.xls',
            beforeUpload(file) {
                that.setState({ loading: true });
            },
            onChange(info) {
                let fileList = [...info.fileList];
                fileList = fileList.map(file => {
                    if (file.status == 'error') {
                        file.response = '上传失败 !';
                    }
                    return file;
                });
                that.setState({ fileList });
                if (info.file.status === 'done') {
                    if (info.file && info.file.response) {
                        if (info.file.response.result === 0) {
                            that.setState({ loading: false });
                            message.success('上传成功');
                            that.handleSearch();
                        } else {
                            that.setState({ loading: false });
                            message.error(info.file.response.msg);
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
                    <Button type="primary" style={{ marginRight: '25px' }}><a href='/resource/template/免监管批量下发模板.xls' download='免监管批量下发模板.xls'>下载模板</a></Button>
                    <Upload {...uploadConfig} fileList={this.state.fileList}>
                        <Button type="primary">上传任务明细</Button>
                    </Upload>
                    <br />
                    <EwAuditTable
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
