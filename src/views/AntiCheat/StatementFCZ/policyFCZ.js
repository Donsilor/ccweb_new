import React, { Component } from 'react';
import { message, Button, Upload } from 'antd';
import { connect } from 'react-redux';
import { getPolicy, updatePolicy } from 'redux/modules/statementFCZ';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import OperationArea from 'components/OperationArea';
import ModalForm from 'components/ModalForm';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import moment from 'moment';
import _ from 'lodash'
import { policyColumns } from './Columns';
class view extends Component {
    state = {
        isExporting: false,
        impLoading: false,
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
            .submit('/warning/v1.0/fangche/fangchePolicy/export', this.props.query.value)
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
        return policyColumns.concat(columns);
    };
    render() {
        const { match, query, list, loading } = this.props;
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
                                modifySysDate: formData.modifySysDate && moment(formData.modifySysDate).format('YYYY-MM-DD'),
                            }
                            if (!_.isEmpty(record)) {
                                data.id = record.id
                            }
                            return httpCommonClient
                                .post(`/warning/v1.0/fangche/fangchePolicy/${_.isEmpty(record) ? 'add' : 'update'}`, data)
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
                                label: '客户经理',
                                type: 'input',
                                key: 'customerManager',
                                initialValue: record.customerManager,
                            },
                            {
                                label: '品牌',
                                type: 'select',
                                key: 'brandName',
                                optionList: brandList,
                                initialValue: record.brandName,
                            },
                            {
                                label: '经销商名称',
                                type: 'input',
                                key: 'dealerName',
                                required: true,
                                initialValue: record.dealerName,
                            },
                            {
                                label: '保证金比例',
                                type: 'select',
                                key: 'bondRate',
                                optionList: [{ name: '5%', value: 5 }, { name: '10%', value: 10 }, { name: '15%', value: 15 }, { name: '30%', value: 30 }, { name: '0保证金', value: '0' }],
                                initialValue: record.bondRate,
                                allowClear: true
                            },
                            {
                                label: '是否改系统',
                                type: 'select',
                                key: 'isModifySys',
                                optionList: [{ name: '定期保证金', value: '定期保证金' }, { name: '否', value: '否' }, { name: '是', value: '是' }],
                                initialValue: record.isModifySys,
                                allowClear: true
                            },
                            {
                                label: '池模式',
                                type: 'select',
                                key: 'poolModel',
                                optionList: [{ name: '半池', value: '半池' }, { name: '全池', value: '全池' }, { name: '全池不改系统', value: '全池不改系统' }, { name: '全池改单笔', value: '全池改单笔' }, { name: '全池改系统', value: '全池改系统' }, { name: '全池未改系统', value: '全池未改系统' }],
                                initialValue: record.poolModel,
                                allowClear: true
                            },
                            {
                                label: '改系统时间',
                                type: 'datePicker',
                                key: 'modifySysDate',
                                initialValue: record.modifySysDate ? moment(record.modifySysDate) : null,
                                allowClear: true
                            },
                            {
                                label: '换证政策',
                                type: 'input',
                                key: 'exchangeCertPolicy',
                                initialValue: record.exchangeCertPolicy,
                            },
                            {
                                label: '特殊还款政策',
                                type: 'select',
                                key: 'repaymentPolicy',
                                optionList: [{ name: '敞口还款', value: '敞口还款' }, { name: '初始保证金提前释放10%', value: '初始保证金提前释放10%' }, { name: '释放全部保证金', value: '释放全部保证金' }, { name: '释放一半保证金', value: '释放一半保证金' }, { name: '提前释放400万', value: '提前释放400万' }, { name: '提前释放5%', value: '提前释放5%' }],
                                initialValue: record.repaymentPolicy,
                                allowClear: true
                            },
                            {
                                label: '协定利率',
                                type: 'input',
                                key: 'agreedRate',
                                initialValue: record.agreedRate,
                            },
                            {
                                label: '特殊操作',
                                type: 'input',
                                key: 'specialOpt',
                                initialValue: record.specialOpt,
                            },
                            {
                                label: '费用减免',
                                type: 'select',
                                key: 'feeRelief',
                                optionList: [{ name: '基准利率', value: '基准利率' }, { name: '免监管费', value: '免监管费' }, { name: '手续费', value: '手续费' }],
                                initialValue: record.feeRelief,
                                allowClear: true
                            },
                            {
                                label: '贷款利率',
                                type: 'input',
                                key: 'interestRates',
                                initialValue: record.interestRates,
                            },
                            {
                                label: '备注',
                                type: 'input',
                                key: 'remark',
                                initialValue: record.remark,
                            },
                            {
                                label: '收益',
                                type: 'input',
                                key: 'income',
                                initialValue: record.income,
                            },
                            {
                                label: '申请满足条件1',
                                type: 'input',
                                key: 'applicationRequirement',
                                initialValue: record.applicationRequirement,
                            },
                            {
                                label: '申请满足条件2',
                                type: 'input',
                                key: 'applicationRequirement2',
                                initialValue: record.applicationRequirement2,
                            },
                            {
                                label: '申请满足条件3',
                                type: 'input',
                                key: 'applicationRequirement3',
                                initialValue: record.applicationRequirement3,
                            },
                        ]}
                    />
                )}
                <OperationArea>
                    <Button type="primary" onClick={() => {
                        const hide = message.loading('下载中，请稍后。。。', 0);
                        httpBufferClient
                            .submit('/warning/v1.0/fangche/fangchePolicy/export/templates', {})
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
                        action='/warning/v1.0/fangche/fangchePolicy/import'
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
    list: store.statementFCZ.Policy.list,
    paging: store.statementFCZ.Policy.paging,
    query: store.statementFCZ.Policy.query,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getPolicy(data, paging)),
        updateQuery: data => {
            dispatch(updatePolicy({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(view);
