import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpotDis, updateSpotDis } from 'redux/modules/carDataUpload';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Button, message, Modal } from 'antd';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import ManuSpotModal from './ManuSpotModal'
import moment from 'moment';
const { confirm } = Modal;
class listView extends Component {
    state = {
        showManuSpotModal: false,
        selectedRowKeys: []
    };
    columns = [
        { title: '经销商', dataIndex: 'distributorName' },
        { title: '抽查位置', dataIndex: 'libraryType' },
        { title: '抽查日期', dataIndex: 'bookTime', render: (text) => text && text.time && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss') },
        { title: '状态', dataIndex: 'status' },
        {
            title: '操作',
            render: (text, record) => (
                <a
                    href="javascript:;"
                    onClick={() => {
                        this.props.history.push(`/noSuperviseList/detail/${record.id}/task/taskList`);
                    }}
                >
                    查看明细
                </a>
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
        const values = { ...formValues };
        const { bookTime, distributorName } = formValues;
        if (bookTime) {
            const [startTime, endTime] = bookTime;
            values.bookStartTime = startTime && startTime.format('YYYY/MM/DD');
            values.bookEndTime = endTime && endTime.format('YYYY/MM/DD');
            delete values.bookTime;
        }
        if (distributorName) {
            values.distributorName = distributorName.trim()
        }
        this.props.fetch(values, {
            pageNum: page || 1,
            pageSize: pageSize || 10,
        });
    };
    render() {
        const { match, list, loading, query } = this.props;
        const { selectedRowKeys } = this.state;
        return (
            <ViewWrapper>
                <FormArea>
                    <CCForm
                        onSearch={this.handleSearch}
                        path={match.path}
                        query={query}
                        onUpdateQuery={this.props.updateQuery}
                    />
                </FormArea>
                <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            if (!selectedRowKeys.length) {
                                message.error('请先选择数据！')
                                return
                            }
                            let self = this;
                            confirm({
                                title: '请确认是否下发任务?',
                                onOk() {
                                    return new Promise((resolve, reject) => {
                                        httpCommonClient
                                            .post('/UnsupervisedSpotDisAction_generateTask', { ids: selectedRowKeys.join(',') })
                                            .then(({ data = {} }) => {
                                                if (data.result === 0) {
                                                    self.setState({ selectedRowKeys: [] })
                                                    message.success(data.msg)
                                                    self.handleSearch(self.props.query.value)
                                                } else {
                                                    Modal.error({
                                                        title: '提示信息：',
                                                        content: data.msg,
                                                    });
                                                }
                                                resolve()
                                            }).catch(() => {
                                                reject()
                                                message.error('系统异常')
                                            });
                                    })

                                },
                            });
                        }}
                    >
                        下发任务
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        type="primary"
                        onClick={() => {
                            if (!selectedRowKeys.length) {
                                message.error('请先选择数据！')
                                return
                            }
                            let self = this;
                            confirm({
                                title: '请确认是否删除明细?',
                                onOk() {
                                    httpCommonClient
                                        .post('/UnsupervisedSpotDisAction_delSpotDistributors', { ids: selectedRowKeys.join(',') })
                                        .then(({ data = {} }) => {
                                            if (data.result === 0) {
                                                self.setState({ selectedRowKeys: [] })
                                                message.success(data.msg)
                                                self.handleSearch(self.props.query.value)
                                            } else {
                                                message.error(data.msg)
                                            }
                                        });
                                },
                            });
                        }}
                    >
                        删除明细
                    </Button>
                </div>
                <EwAuditTable
                    columns={this.columns}
                    loading={loading}
                    data={list}
                    paging={this.props.paging}
                    onChange={this.handlePageChange}
                    onPageChange={this.handlePageChange}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: (selectedRowKeys) => {
                            this.setState({ selectedRowKeys });
                        },
                        getCheckboxProps: record => ({
                            disabled: record.status == '已下发'
                        }),
                    }}
                />
                <OperationArea>
                    <Button type="primary" onClick={() => this.setState({ showManuSpotModal: true })}>生成明细</Button>
                </OperationArea>
                {this.state.showManuSpotModal && (
                    <ManuSpotModal
                        onCancel={() => this.setState({ showManuSpotModal: false })}
                        onOk={() => {
                            this.setState({ showManuSpotModal: false })
                            this.handleSearch(this.props.query.value)
                        }} />
                )}
            </ViewWrapper>
        );
    }
}
const mapStateToProps = store => ({
    loading: store.carDataUpload.loading,
    list: store.carDataUpload.SpotDis.list,
    paging: store.carDataUpload.SpotDis.paging,
    query: store.carDataUpload.SpotDis.query,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getSpotDis(data, paging)),
        updateQuery: data => {
            dispatch(updateSpotDis({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listView);
