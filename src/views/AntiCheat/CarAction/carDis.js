import React, { Component } from 'react';
import { Button, Modal, Upload, message, Spin } from 'antd';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import DetaiModal from './detaiModal'
const { confirm } = Modal;
export default class uploadView extends Component {
    state = {
        list: [],
        paging: { current: 1, pageSize: 10, total: 0 },
        showModal: false,
        loading: false,
    };
    columns = [
        { title: '批次号', dataIndex: 'batchno' },
        { title: '上传文件名', dataIndex: 'uploadFileName' },
        { title: '上传人', dataIndex: 'uploadUserName' },
        { title: '文件上传时间', dataIndex: 'uploadTime' },
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
                    {record.status == '1' && (
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
                    {record.status == '2' && (
                        <a
                            href="javascript:;"
                            onClick={() => {
                                this.setState({ showModal: true, record: { batchno: record.batchno } })
                            }}
                        >
                            查看
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
                            self.handleSearch();
                            message.success(data.msg)
                        } else {
                            Modal.error({
                                title: '提示信息：',
                                content: data.msg,
                            });
                        }
                        self.setState({ loading: false });
                    }).catch(() => {
                        self.setState({ loading: false });
                        message.error('系统异常')
                    });;
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
        let that = this;
        let uploadConfig = {
            name: 'file',
            action: '/CarDataUploadAction_uploadFile',
            data: { fileType: '53' },
            accept: '.xls',
            beforeUpload(file) {
                that.setState({ loading: true });
            },
            onChange(info) {
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
                    <Button type="primary"
                        onClick={() => {
                            let self = this;
                            confirm({
                                title: '请确认是否本周无明细?',
                                onOk() {
                                    self.setState({ loading: true });
                                    httpCommonClient
                                        .post(`/CarDataUploadAction_addNull`, { fileType: '53' })
                                        .then(({ data = {} }) => {
                                            if (data.result === 0) {
                                                message.success(data.msg)
                                                self.handleSearch();
                                            } else {
                                                message.error(data.msg)
                                            }
                                            self.setState({ loading: false });
                                        })
                                },
                            });
                        }}>本周无明细</Button>
                    <Button type="primary" style={{ margin: '0 25px' }}><a href='/resource/template/经销商车辆明细对账模板.xls' download='经销商车辆明细对账模板.xls'>下载模板</a></Button>
                    <Upload {...uploadConfig}>
                        <Button type="primary">导入明细</Button>
                    </Upload>
                    <br />
                    <EwAuditTable
                        rowKey="batchno"
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
            </ViewWrapper>
        );
    }
}
