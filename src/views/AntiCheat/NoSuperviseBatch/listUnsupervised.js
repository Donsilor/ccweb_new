import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListUnsupervised, updateListUnsupervised } from 'redux/modules/carDataUpload';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Upload, message, Modal, Spin } from 'antd';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
const { confirm } = Modal;
class listView extends Component {
    state = {
        loading: false
    };
    columns = [
        { title: '经销商', dataIndex: 'distributorName' },
        { title: '在库车辆更新', dataIndex: 'allInLibraryFlag', render: (text) => text ? '已更新' : '待更新' },
        {
            title: '在途车辆更新', dataIndex: 'allOnTheWayFlag', render: (text) => {
                if (text === 0) {
                    return '待更新'
                } else if (text === 1) {
                    return '已更新'
                } else if (text === 2) {
                    return '待导入'
                }
            }
        },
        {
            title: '操作',
            render: (text, record) => (
                <div>
                    <a disabled={record.allInLibraryFlag}
                        onClick={() => {
                            let self = this;
                            confirm({
                                title: '请确定是否将该经销商全部车辆标记为在库？',
                                onOk() {
                                    self.setState({ loading: true })
                                    httpCommonClient
                                        .post(`/DistributorAction_updateAllInLibrary`, {
                                            id: record.id
                                        })
                                        .then(({ data = {} }) => {
                                            if (data.result === 0) {
                                                message.success(data.msg);
                                                self.handleSearch(self.props.query.value)
                                            } else {
                                                message.error(data.msg);
                                            }
                                            self.setState({ loading: false })
                                        }).catch(() => {
                                            message.error('系统异常');
                                            self.setState({ loading: false })
                                        })
                                },
                            });
                        }}>车辆全部在库</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {
                        record.allOnTheWayFlag === 0 &&
                        <Upload
                            showUploadList={false}
                            name='file'
                            action='/CarDataUploadAction_uploadFile'
                            data={{ distributorId: record.id, fileType: '55' }}
                            accept='.xls,.xlsx'
                            beforeUpload={() => {
                                if (!record.allInLibraryFlag) {
                                    Modal.info({
                                        title: '提示信息：',
                                        content: '将系统现有车辆标记为在库后，方可更新在途车辆！'
                                    })
                                    return false
                                } else {
                                    this.setState({ loading: true })
                                }
                            }}
                            onChange={
                                (info) => {
                                    if (info.file.status === 'done') {
                                        if (info.file && info.file.response) {
                                            if (info.file.response.result === 0) {
                                                message.success('上传成功');
                                                this.handleSearch(this.props.query.value);
                                            } else {
                                                message.error(info.file.response.msg);
                                            }
                                            this.setState({ loading: false });
                                        }
                                    } else if (info.file.status === 'error') {
                                        this.setState({ loading: false });
                                        message.error(`系统异常 ！`);
                                    }
                                }}><a>更新在途车辆</a></Upload>
                    }
                    {
                        record.allOnTheWayFlag === 1 &&
                        <a
                            onClick={() => {
                                this.props.history.push(`/listUnsupervised/detail/${record.batchno}`);
                            }}>查看明细</a>
                    }
                    {
                        record.allOnTheWayFlag === 2 &&
                        <span>
                            <a
                                onClick={() => {
                                    this.setState({ loading: true })
                                    httpCommonClient
                                        .post(`/CarDataUploadAction_importData`, {
                                            uploadFileId: record.uploadFileId
                                        })
                                        .then(({ data = {} }) => {
                                            if (data.result === 0) {
                                                message.success(data.msg);
                                                this.handleSearch(this.props.query.value)
                                            } else {
                                                message.error(data.msg);
                                            }
                                            this.setState({ loading: false })
                                        }).catch(() => {
                                            message.error('系统异常');
                                            this.setState({ loading: false })
                                        })
                                }}>导入</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a onClick={() => {
                                let self = this;
                                confirm({
                                    title: '请确认是否删除该文件?',
                                    onOk() {
                                        httpCommonClient
                                            .post(`/CarDataUploadAction_del`, { uploadFileId: record.uploadFileId })
                                            .then(({ data = {} }) => {
                                                if (data.result === 0) {
                                                    message.success(data.msg);
                                                    self.handleSearch(self.props.query.value);
                                                } else {
                                                    message.error(data.msg);
                                                }
                                            });
                                    },
                                });
                            }}>删除</a>
                        </span>

                    }
                </div >
            ),
        },
    ];
    componentDidMount() {
        this.handleSearch(this.props.query.value);
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(this.props.query.value, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        this.props.fetch(formValues, {
            pageNum: page || 1,
            pageSize: pageSize || 10,
        });
    };
    render() {
        const { match, list, loading, query } = this.props;
        return (
            <ViewWrapper>
                <Spin spinning={this.state.loading}>
                    <FormArea>
                        <CCForm
                            onSearch={this.handleSearch}
                            path={match.path}
                            query={query}
                            onUpdateQuery={this.props.updateQuery}
                            enableExport
                            exportName="下载模板"
                            onExport={() => {
                                let a = document.createElement('a')
                                a.href = `/resource/template/撤监管在途车辆导入模板.xlsx`
                                a.click()
                            }}
                        />
                    </FormArea>
                    <EwAuditTable
                        columns={this.columns}
                        loading={loading}
                        data={list}
                        paging={this.props.paging}
                        onChange={this.handlePageChange}
                        onPageChange={this.handlePageChange}
                    />
                </Spin>
                <OperationArea>
                    <div style={{ width: '650px', fontWeight: 'bold', display: 'flex' }}>
                        <div style={{ color: 'red' }}>⚠️注意：</div>
                        <div>
                            <div>操作 "车辆全部在库" 会将系统中该经销商全部车辆性质标记为在库！</div>
                            <div>操作 "更新在途车辆" 会将上传明细中的车辆性质标记为在途！导入明细中仅可维护在途车辆。</div>
                            <div>以上操作均仅可操作一次！</div>
                        </div>
                    </div>
                </OperationArea>
            </ViewWrapper>
        );
    }
}
const mapStateToProps = store => ({
    loading: store.carDataUpload.loading,
    list: store.carDataUpload.ListUnsupervised.list,
    paging: store.carDataUpload.ListUnsupervised.paging,
    query: store.carDataUpload.ListUnsupervised.query,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getListUnsupervised(data, paging)),
        updateQuery: data => {
            dispatch(updateListUnsupervised({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listView);
