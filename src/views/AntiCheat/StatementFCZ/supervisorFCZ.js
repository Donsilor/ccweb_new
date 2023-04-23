import React, { Component } from 'react';
import { message, Button, Upload } from 'antd';
import { connect } from 'react-redux';
import { getSupervisor, updateSupervisor } from 'redux/modules/statementFCZ';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import OperationArea from 'components/OperationArea';
import ModalForm from 'components/ModalForm';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import { supervisorColumns } from './Columns'
import moment from 'moment';
import _ from 'lodash'
class view extends Component {
    state = {
        isExporting: false,
        impLoading: false,
        brandList: [],
        supervisor: [],
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
        httpCommonClient.post('/warning/v1.0/fangche/fangcheSupervisor/list', {})
            .then(({ data = {} }) => {
                if (data.code === 200) {
                    let arr = [];
                    data.data.map(v => {
                        arr.push({ supervisorName: v.supervisorName, name: v.supervisorName, value: v.supervisorName })
                    })
                    this.setState({ supervisor: arr });
                }
            })
        this.handleSearch(this.props.query.value);
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(this.props.query.value, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        let values = formValues;
        for (let i in values) {
            if (values[i] && typeof values[i] == 'string') {
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
            .submit('/warning/v1.0/fangche/fangcheDealerSupervisor/export', this.props.query.value)
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
            fixed: 'right',
            render: record => (
                <a onClick={() => {
                    this.setState({
                        record,
                        showModal: true,
                    });
                }}
                >编辑</a>
            ),
        }];
        return supervisorColumns.concat(columns);
    };
    render() {
        const { match, query, list, loading, } = this.props;
        const { record, brandList, supervisor } = this.state
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
                        brandList={brandList}
                        supervisor={supervisor}
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
                        col={2}
                        width={1000}
                        title={_.isEmpty(record) ? '新增' : '修改'}
                        onOk={() => {
                            this.setState({ showModal: false })
                            this.handleSearch(this.props.query.value);
                        }}
                        onCancel={() => this.setState({ showModal: false })}
                        onSubmit={(formData) => {
                            let data = {
                                ...formData,
                                dispatchSupervisionDate: formData.dispatchSupervisionDate && moment(formData.dispatchSupervisionDate).format('YYYY-MM-DD'),
                                arrivalDate: formData.arrivalDate && moment(formData.arrivalDate).format('YYYY-MM-DD'),
                                deregulationDate: formData.deregulationDate && moment(formData.deregulationDate).format('YYYY-MM-DD'),
                            }
                            if (!_.isEmpty(record)) {
                                data.id = record.id
                            }
                            return httpCommonClient
                                .post(`/warning/v1.0/fangche/fangcheDealerSupervisor/${_.isEmpty(record) ? 'add' : 'update'}`, data)
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
                                label: '客户名称',
                                type: 'input',
                                key: 'custname',
                                initialValue: record.custname,
                                required: true
                            },
                            {
                                label: '客户经理',
                                type: 'input',
                                key: 'custManager',
                                initialValue: record.custManager,
                            },
                            {
                                label: '品牌',
                                type: 'select',
                                key: 'brandName',
                                optionList: brandList,
                                initialValue: record.brandName,
                            },
                            {
                                label: '监管方',
                                type: 'select',
                                key: 'supervisor',
                                optionList: supervisor,
                                initialValue: record.supervisor,
                            },
                            {
                                label: '派监管日期',
                                type: 'datePicker',
                                key: 'dispatchSupervisionDate',
                                initialValue: record.dispatchSupervisionDate ? moment(record.dispatchSupervisionDate) : null,
                                allowClear: true
                            },
                            {
                                label: '到店日期',
                                type: 'datePicker',
                                key: 'arrivalDate',
                                initialValue: record.arrivalDate ? moment(record.arrivalDate) : null,
                                allowClear: true
                            },
                            {
                                label: '是否撤监管',
                                type: 'select',
                                key: 'deregulationFlag',
                                optionList: [{ name: '是', value: '是' }, { name: '否', value: '否' }],
                                initialValue: record.deregulationFlag,
                            },
                            {
                                label: '撤监管日期',
                                type: 'datePicker',
                                key: 'deregulationDate',
                                initialValue: record.deregulationDate ? moment(record.deregulationDate) : null,
                                allowClear: true
                            },
                            {
                                label: '结算账号',
                                type: 'input',
                                key: 'settlementAccountNo',
                                initialValue: record.settlementAccountNo,
                            },
                            {
                                label: '保证金账号',
                                type: 'input',
                                key: 'depositAccountNo',
                                initialValue: record.depositAccountNo,
                            },
                            {
                                label: '应解汇款账号',
                                type: 'input',
                                key: 'remittanceAccountNo',
                                initialValue: record.remittanceAccountNo,
                            },
                            {
                                label: '变更监管',
                                type: 'input',
                                key: 'changeSupervisionNote',
                                initialValue: record.changeSupervisionNote,
                            },
                            {
                                label: '备注',
                                type: 'input',
                                key: 'remark',
                                initialValue: record.remark,
                            },
                        ]}
                    />
                )}
                <OperationArea>
                    <Button type="primary" onClick={() => {
                        const hide = message.loading('下载中，请稍后。。。', 0);
                        httpBufferClient
                            .submit('/warning/v1.0/fangche/fangcheDealerSupervisor/export/templates', {})
                            .then(payload => {
                                exportFile(payload);
                            })
                            .then(res => {
                                hide();
                            })
                            .catch(err => {
                                hide();
                                message.error('系统异常');
                            });
                    }}>下载模板</Button>
                    <Upload
                        showUploadList={false}
                        name='file'
                        action='/warning/v1.0/fangche/fangcheDealerSupervisor/import'
                        accept='.xls,.xlsx'
                        beforeUpload={() => this.setState({ impLoading: true })}
                        onChange={(info) => {
                            if (info.file.status === 'done') {
                                if (info.file && info.file.response) {
                                    if (info.file.response.code === 200) {
                                        message.success('上传成功');
                                        this.handleSearch();
                                    } else {
                                        message.error(info.file.response.message);
                                    }
                                    this.setState({ impLoading: false });
                                }
                            } else if (info.file.status === 'error') {
                                this.setState({ impLoading: false });
                                message.error(`系统异常 ！`);
                            }
                        }}><Button type="primary" loading={this.state.impLoading}>导入</Button>
                    </Upload>
                    &nbsp;&nbsp;&nbsp;
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
    list: store.statementFCZ.Supervisor.list,
    paging: store.statementFCZ.Supervisor.paging,
    query: store.statementFCZ.Supervisor.query,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getSupervisor(data, paging)),
        updateQuery: data => {
            dispatch(updateSupervisor({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(view);