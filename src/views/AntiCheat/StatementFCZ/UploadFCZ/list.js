import React, { Component } from 'react';
import { Button, Modal, Upload, message, Spin, Table } from 'antd';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import OperationArea from 'components/OperationArea';
import { httpCommonClient, httpBufferClient } from 'common/axios';
import { exportFileNew } from 'common/utils';
import _ from 'lodash'
const { confirm } = Modal;
export default class uploadView extends Component {
    state = {
        loading: false,
        list: [],
        tabWeek: '',
        tabMonth: '',
        showModal: false,
    };
    columns = [
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
        {
            title: '操作',
            render: (text, record) => (
                <div>
                    {record.importStatusCode == 'import_status_1' && (
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
                    {record.importStatusCode == 'import_status_0' && (
                        <Upload
                            showUploadList={false}
                            name='file'
                            action='/warning/v1.0/fangche/fangcheDataSourceImport/upload'
                            data={{ id: record.id, sourceType: record.sourceTypeCode }}
                            accept='.xls,.xlsx'
                            beforeUpload={file => {
                                // const isLt20M = file.size / 1024 / 1024 <= 20;
                                // if (!isLt20M) {
                                //     Modal.info({
                                //         title: '提示信息：',
                                //         content: '上传文件大小不能超过20MB,请修改文件重新操作!'
                                //     });
                                //     return false;
                                // } else {
                                this.setState({ loading: true })
                                //}
                            }
                            }
                            onChange={
                                (info) => {
                                    if (info.file.status === 'done') {
                                        if (info.file && info.file.response) {
                                            if (info.file.response.code === 200) {
                                                message.success('上传成功');
                                                this.handleSearch();
                                            } else {
                                                message.error(info.file.response.message);
                                            }
                                            this.setState({ loading: false });
                                        }
                                    } else if (info.file.status === 'error') {
                                        this.setState({ loading: false });
                                        message.error(`系统异常上传失败 ！`);
                                    }
                                }
                            }
                        ><a>上传</a></Upload>)}
                </div >
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
                    .post(`/warning/v1.0/fangche/fangcheDataSourceImport/importData`, { importRecordId: record.importRecordId, sourceTypeCode: record.sourceTypeCode })
                    .then(({ data = {} }) => {
                        if (data.code === 200) {
                            self.setState({ loading: false });
                            self.handleSearch();
                            message.success(data.message)
                        } else {
                            self.setState({ loading: false });
                            Modal.error({
                                title: '提示信息：',
                                content: data.message,
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
                    .post(`/warning/v1.0/fangche/fangcheDataSourceImport/del`, { id: record.id })
                    .then(({ data = {} }) => {
                        if (data.code === 200) {
                            message.success(data.message);
                        } else {
                            message.error(data.message);
                        }
                        self.handleSearch();
                    });
            },
        });
    };
    componentDidMount() {
        this.handleSearch();
    }
    handlePageChange = () => {
        this.handleSearch();
    };
    handleSearch = () => {
        this.setState({ loading: true });
        httpCommonClient
            .post(`/warning/v1.0/fangche/fangcheDataSourceImport/current/list`, {})
            .then(({ data = {} }) => {
                if (data.code === 200) {
                    if (!_.isEmpty(data.data)) {
                        const arr = data.data.map(v => v.dataSourceName)
                        if (arr.includes('监管方台账')) {
                            this.setState({ tabMonth: 'primary', })
                        } else {
                            this.setState({ tabWeek: 'primary', })
                        }
                    } else {
                        this.setState({ tabMonth: '', tabWeek: '' })
                    }
                    this.setState({ loading: false, list: data.data || [], });
                } else {
                    this.setState({ loading: false, list: [] });
                }
            });
    };
    sourceImport = (url) => {
        httpCommonClient
            .post(url, {})
            .then(({ data = {} }) => {
                if (data.code === 200) {
                    this.handleSearch()
                } else {
                    message.error(data.message)
                }
                this.setState({ loading: false })
            });
    };
    render() {
        const { loading, tabWeek, tabMonth, list } = this.state
        return (
            <ViewWrapper>
                <Spin spinning={loading}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <Button type={tabWeek}
                                onClick={() => {
                                    let self = this;
                                    if (tabWeek == 'primary') {
                                        return
                                    } else if (!tabWeek && !tabMonth) {
                                        confirm({
                                            title: '生成台账后此操作将会清空车辆汇总表数据，确认操作吗？',
                                            onOk() {
                                                self.setState({ loading: true, tabWeek: 'primary', tabMonth: '' })
                                                self.sourceImport(`/warning/v1.0/fangche/fangcheDataSourceImport/add/week`)
                                            },
                                        });
                                    } else {
                                        //import_status_0 待上传
                                        if (list.length && list.filter(v => v.importStatusCode !== 'import_status_0').length) {
                                            confirm({
                                                title: '如果您切换数据源导入模式，已上传和导入的数据将清空，确认操作吗？',
                                                onOk() {
                                                    self.setState({ loading: true, tabWeek: 'primary', tabMonth: '' })
                                                    self.sourceImport(`/warning/v1.0/fangche/fangcheDataSourceImport/add/week`)
                                                },
                                            });
                                        } else {
                                            self.setState({ loading: true, tabWeek: 'primary', tabMonth: '' })
                                            self.sourceImport(`/warning/v1.0/fangche/fangcheDataSourceImport/add/week`)
                                        }
                                    }
                                }}
                            >周数据导入</Button>
                            <Button type={tabMonth} style={{ margin: '0 25px' }}
                                onClick={() => {
                                    let self = this;
                                    if (tabMonth == 'primary') {
                                        return
                                    } else if (!tabWeek && !tabMonth) {
                                        confirm({
                                            title: '生成台账后此操作将会清空车辆汇总表数据，确认操作吗？',
                                            onOk() {
                                                self.setState({ loading: true, tabWeek: '', tabMonth: 'primary' })
                                                self.sourceImport(`/warning/v1.0/fangche/fangcheDataSourceImport/add/month`)
                                            },
                                        });
                                    } else {
                                        if (list.length && list.filter(v => v.importStatusCode !== 'import_status_0').length) {
                                            confirm({
                                                title: '如果您切换数据源导入模式，已上传和导入的数据将清空，确认操作吗？',
                                                onOk() {
                                                    self.setState({ loading: true, tabWeek: '', tabMonth: 'primary' })
                                                    self.sourceImport(`/warning/v1.0/fangche/fangcheDataSourceImport/add/month`)
                                                },
                                            });
                                        } else {
                                            self.setState({ loading: true, tabWeek: '', tabMonth: 'primary' })
                                            self.sourceImport(`/warning/v1.0/fangche/fangcheDataSourceImport/add/month`)
                                        }
                                    }
                                }}
                            >月数据导入</Button>
                        </div>
                        <Button type='primary'
                            onClick={() => {
                                const arr = list.filter(v => !['线下还款', '国五上牌车'].includes(v.dataSourceName))
                                if (arr.length && arr.filter(v => v.importStatusCode !== 'import_status_2').length) {
                                    Modal.info({
                                        title: '提示信息：',
                                        content: '除”线下还款、国五上牌车“外其余数据源全部导入完成后 , 才能生成台账 ！',
                                    });
                                } else {
                                    this.setState({ loading: true })
                                    httpCommonClient
                                        .post(`/warning/v1.0/fangche/fangcheDataSourceImport/generate/ledger`, {})
                                        .then(({ data = {} }) => {
                                            if (data.code === 200) {
                                                this.handleSearch()
                                                message.success(data.message)
                                            } else {
                                                message.error(data.message)
                                            }
                                            this.setState({ loading: false })
                                        }).catch(() => {
                                            message.error('系统异常')
                                            this.setState({ loading: false })
                                        });
                                }
                            }}
                        >生成台账</Button>
                    </div>
                    <br />
                    <EwAuditTable
                        columns={this.columns}
                        data={this.state.list}
                        pagination={false}
                        onChange={this.handlePageChange}
                        onPageChange={this.handlePageChange}
                    />
                </Spin>
                <Modal title="模版下载" footer={null} visible={this.state.showModal} onCancel={() => this.setState({ showModal: false })}>
                    <Table
                        rowKey="name"
                        dataSource={[
                            { name: '已发货' },
                            { name: '到期票' },
                            { name: '全池核心' },
                            { name: '核心' },
                            { name: '转池' },
                            { name: '线下汇总' },
                            { name: '库存表' },
                            { name: '销售表' },
                            { name: '监管方台账' },
                            { name: '国五上牌车' },
                            { name: '一汽解放厂家系统表' },
                            { name: '线下还款' },
                        ]}
                        loading={loading}
                        columns={[{ title: '模板名称', dataIndex: 'name' }, {
                            title: '操作',
                            render: (text, record) =>
                                <a onClick={() => {
                                    this.setState({ loading: true });
                                    httpBufferClient
                                        .submit('/warning/v1.0/fangche/fangcheLedger/export/templates', { fileName: record.name })
                                        .then(payload => {
                                            const result = exportFileNew(payload);
                                            result && message.warning(result, 2.5);
                                        })
                                        .then(res => {
                                            this.setState({ loading: false });
                                        })
                                        .catch(err => {
                                            message.error('操作失败');
                                            this.setState({ loading: false });
                                        });
                                }}>下载</a>
                        }]}
                        pagination={false}
                    />
                </Modal>
                <OperationArea>
                    <Button type="primary" onClick={() => this.setState({ showModal: true })}>模版下载</Button>
                </OperationArea>
            </ViewWrapper>
        );
    }
}
