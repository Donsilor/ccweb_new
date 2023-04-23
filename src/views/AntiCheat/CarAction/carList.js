import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCarlist, updateCarlist } from 'redux/modules/carDataUpload';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Button, message } from 'antd';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient } from 'common/axios';
import { exportFile } from 'common/utils';
class listView extends Component {
    state = {
        isExporting: false
    }
    columns = [
        { title: '经销商名称', dataIndex: 'custname' },
        { title: '标识', dataIndex: 'identification' },
        { title: '贷款编号或票号', dataIndex: 'billloanno' },
        { title: '业务编号', dataIndex: 'bizno' },
        { title: '凭证号', dataIndex: 'voucherno' },
        { title: '发车时间', dataIndex: 'outputdate' },
        { title: '创建时间', dataIndex: 'createtime' },
    ];
    componentDidMount() {
        this.handleSearch(this.props.query.value);
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(this.props.query.value, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        const values = { ...formValues };
        const { createDate } = formValues;
        if (createDate) {
            const [startTime, endTime] = createDate;
            values.createStartDate = startTime && startTime.format('YYYY/MM/DD');
            values.createEndDate = endTime && endTime.format('YYYY/MM/DD');
            delete values.createDate;
        }
        this.props.fetch({ ...values, custname: this.props.dealer.distributorName }, {
            pageNum: page || 1,
            pageSize: pageSize || 10,
        });
    };
    render() {
        const { match, list, loading, query, paging, dealer } = this.props;
        const { isExporting } = this.state
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
                <EwAuditTable
                    columns={this.columns}
                    loading={loading}
                    data={list}
                    paging={paging}
                    onChange={this.handlePageChange}
                    onPageChange={this.handlePageChange}
                />
                <OperationArea>
                    <Button type="primary" loading={isExporting} onClick={() => {
                        const hide = message.loading('导出中，请稍后。。。', 0);
                        this.setState({ isExporting: true });
                        const { value } = query;
                        const { createDate } = value;
                        if (createDate) {
                            const [startTime, endTime] = createDate;
                            value.createStartDate = startTime && startTime.format('YYYY/MM/DD');
                            value.createEndDate = endTime && endTime.format('YYYY/MM/DD');
                            delete value.createDate;
                        }
                        httpBufferClient
                            .submit('/warning/v1.0/sync/show/export/car/send/dealer', { ...value, custname: dealer.distributorName })
                            .then(payload => {
                                const result = exportFile(payload);
                                result && message.warning(result, 2.5);
                            })
                            .then(res => {
                                this.setState({ isExporting: false, });
                                hide();
                            })
                            .catch(err => {
                                message.error('系统异常');
                                this.setState({ isExporting: false, });
                                hide();
                            });
                    }}>报表导出</Button>
                </OperationArea>
            </ViewWrapper >
        );
    }
}
const mapStateToProps = store => ({
    loading: store.carDataUpload.loading,
    list: store.carDataUpload.Carlist.list,
    paging: store.carDataUpload.Carlist.paging,
    query: store.carDataUpload.Carlist.query,
    dealer: store.session.dealer,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getCarlist(data, paging)),
        updateQuery: data => {
            dispatch(updateCarlist({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listView);
