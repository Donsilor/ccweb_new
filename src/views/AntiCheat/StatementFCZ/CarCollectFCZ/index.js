import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import { getFangcheCollect, updateFangcheCollect } from 'redux/modules/statementFCZ';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import { collectColumns } from '../Columns';
class CarCollectFCZ extends Component {
    state = {
        isExporting: false,
        supplyChain: [],
        supervisor: []
    };
    componentDidMount() {
        httpCommonClient.postWithPaging('/warning/v1.0/warning/supplyChain/list', {}, { pageNum: 1, pageSize: 1000 })
            .then(({ data = {} }) => {
                this.setState({ supplyChain: data.data.list })
            })
        httpCommonClient.post('/warning/v1.0/fangche/fangcheSupervisor/list', {})
            .then(({ data = {} }) => {
                this.setState({ supervisor: data.data })
            })
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
            .submit('/warning/v1.0/fangche/fangcheCarDetail/export', this.props.query.value)
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
    render() {
        const { match, query, list, loading } = this.props;
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
                        supplyChain={this.state.supplyChain}
                        supervisor={this.state.supervisor}
                    />
                </FormArea>
                <div>
                    <EwAuditTable
                        columns={collectColumns}
                        loading={loading}
                        data={list}
                        paging={this.props.paging}
                        onChange={this.handlePageChange}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </ViewWrapper>
        );
    }
}
const mapStateToProps = store => ({
    loading: store.statementFCZ.loading,
    list: store.statementFCZ.FangcheCollect.list,
    paging: store.statementFCZ.FangcheCollect.paging,
    query: store.statementFCZ.FangcheCollect.query,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getFangcheCollect(data, paging)),
        updateQuery: data => {
            dispatch(updateFangcheCollect({ ...data }));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CarCollectFCZ);
