import React, { Component } from 'react';
import { Button, Modal, Upload, message, Spin } from 'antd';
import OperationArea from 'components/OperationArea';
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
                } else if (text == '10') {
                    return '导入中'
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
                                this.props.history.push(`/noSuperviseList/detail/${record.batchno}/51/carList`);
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
                            self.setState({ loading: false });
                            self.handleSearch();
                            Modal.success({
                                title: '提示信息：',
                                content: data.msg,
                            });
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
    };
    //删除
    deleOper = record => () => {
        let self = this;
        confirm({
            title: '请确认是否删除该文件?',
            onOk() {
                httpCommonClient
                    .post(`/BakDataMngAction_del`, { uploadFileId: record.uploadFileId })
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
                fileType: "51",
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
            data: { fileType: '51' },
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Upload {...uploadConfig}>
                            <Button type="primary">请选择一个excel文件</Button>
                        </Upload>
                        <div style={{ marginLeft: '30px' }}>建议：导入此车辆明细前，先导入赎车明细及开票信息！</div>
                    </div>
                    <br />
                    <EwAuditTable
                        columns={this.columns}
                        data={this.state.list}
                        paging={this.state.paging}
                        onChange={this.handlePageChange}
                        onPageChange={this.handlePageChange}
                    />
                </Spin>
                <OperationArea>
                    <Button type="primary" onClick={() => this.handleSearch()}>刷新数据</Button>
                </OperationArea>
            </ViewWrapper>
        );
    }
}
