import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDisAction, updateDisAction } from 'redux/modules/carDataUpload';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Button, message, Modal } from 'antd';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient, httpBufferClient } from 'common/axios';
import { exportFile } from 'common/utils';
import moment from 'moment';
const { confirm } = Modal;
class listView extends Component {
    state = {
        statistic: {},
        isExporting: false,
        values: {}
    }
    columns = [
        { title: '经销商', dataIndex: 'distributorName' },
        { title: '文件名', dataIndex: 'uploadFileName' },
        { title: '最近处理时间', dataIndex: 'opTime' },
        {
            title: '是否上传', dataIndex: 'uploadImportStr',
            filterMultiple: false,
            filters: [
                {
                    text: '是',
                    value: '是',
                },
                {
                    text: '否',
                    value: '否',
                },
            ],
            onFilter: (value, record) => record.uploadImportStr == value
        },
        {
            title: '操作',
            render: (text, record) => (
                <a
                    href="javascript:;"
                    onClick={() => {
                        this.props.history.push(`/CarAction_Bank/detail/${record.distributorId}/${record.distributorName}`);
                    }}
                >
                    查看
                </a>
            ),
        },
    ];
    componentDidMount() {
        this.handleSearch(this.props.query.value);
    }
    handleStatistic = (values) => {
        httpCommonClient
            .post(`/CarUnsupervisedDisAction_statisticDistributorCarUpload `, values)
            .then(({ data = {} }) => {
                if (data.result === 0) {
                    this.setState({ statistic: data.data })
                }
            })
    }
    handleSearch = (formValues) => {
        let date = moment();
        let dow = date.day();
        let monday1 = date.subtract(dow - 2, 'days')//本周二
        let monday2 = moment(monday1).subtract(-6, 'days')//下周一
        const values = { ...formValues };
        const { opTimeDate = [monday1, monday2], distributorName } = formValues;
        if (opTimeDate) {
            const [startTime, endTime] = opTimeDate;
            values.opTimeStart = startTime && startTime.format('YYYY-MM-DD');
            values.opTimeEnd = endTime && endTime.format('YYYY-MM-DD');
            delete values.opTimeDate;
        }
        if (distributorName) {
            values.distributorName = distributorName.trim()
        }
        this.props.fetch(values, {
            pageNum: 1,
            pageSize: 1000,
        });
        this.handleStatistic(values)
        this.setState({ values })
    };
    render() {
        const { match, list, loading, query } = this.props;
        const { statistic, isExporting, values } = this.state
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
                <div style={{ margin: '10px 0', fontWeight: 'bold' }}>
                    <span>税控监管经销商数：{statistic.total}</span>
                    <span style={{ margin: '0 20px' }}>汇总周期已上传：{statistic.uploadCompleted}</span>
                    <span>汇总周期未上传：{statistic.uploadPending}</span>
                </div>
                <EwAuditTable
                    columns={this.columns}
                    loading={loading}
                    data={list}
                    pagination={false}
                />
                <OperationArea>
                    <Button type="primary" loading={isExporting} onClick={() => {
                        let self = this
                        confirm({
                            title: '请确认是否导出汇总文件?',
                            onOk() {
                                const hide = message.loading('导出中，请稍后。。。', 0);
                                self.setState({
                                    isExporting: true,
                                });
                                httpBufferClient
                                    .submit('/CarUnsupervisedDisAction_exportAllCar', values)
                                    .then(payload => {
                                        const result = exportFile(payload);
                                        result && message.warning(result, 2.5);
                                    })
                                    .then(res => {
                                        self.setState({
                                            isExporting: false,
                                        });
                                        hide();
                                    })
                                    .catch(err => {
                                        message.error('系统异常');
                                    });
                            },
                        })
                    }}>银行数据汇总导出</Button>
                </OperationArea>
            </ViewWrapper >
        );
    }
}
const mapStateToProps = store => ({
    loading: store.carDataUpload.loading,
    list: store.carDataUpload.DisAction.list,
    paging: store.carDataUpload.DisAction.paging,
    query: store.carDataUpload.DisAction.query,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getDisAction(data, paging)),
        updateQuery: data => {
            dispatch(updateDisAction({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listView);
