import React, { Component } from 'react';
import { message, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { getDealer, updateDealer } from 'redux/modules/statementFCZ';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import OperationArea from 'components/OperationArea';
import ModalForm from 'components/ModalForm';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import moment from 'moment';
import _ from 'lodash'
const { confirm } = Modal
class view extends Component {
    state = {
        isExporting: false,
        brandList: [],
        showModal: false,
        record: {},
    };
    componentDidMount() {
        httpCommonClient.post(`/warning/v1.0/warning/brand/list/all`, {}).then(({ data = {} }) => {
            if (data.code === 200) {
                let arr = [];
                data.data.map(v => {
                    arr.push({ name: v.name, value: v.name })
                })
                this.setState({ brandList: arr });
            }
        });
        this.handleSearch(this.props.query.value);
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(this.props.query.value, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        let values = formValues;
        for (let i in values) {
            if (values[i]) {
                values[i] = values[i].trim()
            }
        }
        this.props.fetch(values, {
            pageNum: page || this.props.paging.current,
            pageSize: pageSize || this.props.paging.pageSize,
        });
    };
    //导出
    handleExport = () => {
        const hide = message.loading('导出中，请稍后。。。', 0);
        this.setState({
            isExporting: true,
        });
        httpBufferClient
            .submit('/warning/v1.0/fangche/fangcheUnsupervisedDealer/export', this.props.query.value)
            .then(payload => {
                const result = exportFile(payload);
                result && message.warning(result, 2.5);
            })
            .then(res => {
                this.setState({
                    isExporting: false,
                });
                hide();
            })
            .catch(err => {
                message.error('操作失败');
            });
    };
    //列表操作
    renderColumn = () => {
        const columns = [{
            title: '操作',
            render: record => (
                <div>
                    <a onClick={() => {
                        this.setState({
                            record,
                            showModal: true,
                        });
                    }}
                    >编辑</a>
                    &nbsp;&nbsp;
                    <a onClick={() => {
                        let self = this;
                        confirm({
                            title: '请确认是否删除该经销商?',
                            onOk() {
                                httpCommonClient
                                    .post(`/warning/v1.0/fangche/fangcheUnsupervisedDealer/delete`, { id: record.id })
                                    .then(({ data = {} }) => {
                                        if (data.code === 200) {
                                            message.success(data.message);
                                            self.handleSearch(self.props.query.value);
                                        } else {
                                            message.error(data.message);
                                        }
                                    });
                            },
                        });
                    }}
                    >删除</a>
                </div>
            ),
        }];
        return Columns.concat(columns);
    };
    render() {
        const { match, query, list, loading, } = this.props;
        const { record, brandList } = this.state
        return (
            <ViewWrapper>
                <FormArea>
                    <CCForm
                        onSearch={this.handleSearch}
                        path={match.path}
                        query={query}
                        onUpdateQuery={this.props.updateQuery}
                        enableExport={true}
                        onExport={this.handleExport}
                        isExporting={this.state.isExporting}
                        brandList={this.state.brandList}
                    />
                </FormArea>
                <EwAuditTable
                    columns={this.renderColumn()}
                    loading={loading}
                    data={list}
                    paging={this.props.paging}
                    onChange={this.handlePageChange}
                    onPageChange={this.handlePageChange}
                />
                {/*新增/修改*/}
                {this.state.showModal && (
                    <ModalForm
                        title={_.isEmpty(record) ? '新增' : '修改'}
                        onOk={() => {
                            this.setState({ showModal: false })
                            this.handleSearch(this.props.query.value);
                        }}
                        onCancel={() => this.setState({ showModal: false })}
                        onSubmit={(formData) => {
                            let data = formData;
                            if (!_.isEmpty(record)) {
                                data.id = record.id
                            }
                            return httpCommonClient
                                .post(`/warning/v1.0/fangche/fangcheUnsupervisedDealer/${_.isEmpty(record) ? 'add' : 'update'}`, data)
                                .then(({ data = {} }) => {
                                    if (data.code === 200) {
                                        return Promise.resolve({
                                            data: {
                                                result: 0,
                                            },
                                        });
                                    } else {
                                        return Promise.resolve({
                                            data: {
                                                result: 1,
                                                msg: data.message || '操作失败，请重试',
                                            },
                                        });
                                    }
                                });
                        }}
                        configList={[
                            {
                                label: '品牌',
                                type: 'select',
                                key: 'brandName',
                                optionList: brandList,
                                initialValue: record.brandName,
                                required: true
                            },
                            {
                                label: '经销商名称',
                                type: 'input',
                                key: 'dealerName',
                                initialValue: record.dealerName,
                                required: true
                            },
                        ]}
                    />
                )}
                <OperationArea>
                    <Button type="primary" onClick={() => {
                        this.setState({ showModal: true, record: {} })
                    }}>新增</Button>
                </OperationArea>
            </ViewWrapper>
        );
    }
}
const mapStateToProps = store => ({
    loading: store.statementFCZ.loading,
    list: store.statementFCZ.Dealer.list,
    paging: store.statementFCZ.Dealer.paging,
    query: store.statementFCZ.Dealer.query,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getDealer(data, paging)),
        updateQuery: data => {
            dispatch(updateDealer({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(view);
const Columns = [
    {
        title: '品牌名称',
        dataIndex: 'brandName',
    },
    {
        title: '经销商名称',
        dataIndex: 'dealerName',
    }
]