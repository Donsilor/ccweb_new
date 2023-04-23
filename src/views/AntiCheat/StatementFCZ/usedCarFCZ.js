import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import { getUsedCar, updateUsedCar } from 'redux/modules/statementFCZ';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import { usedCarColumns } from './Columns'
class view extends Component {
    state = {
        isExporting: false,
        brandList: [],
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
            .submit('/warning/v1.0/fangche/fangcheUsedCar/export', this.props.query.value)
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
        const { match, query, list, loading, } = this.props;
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
                    columns={usedCarColumns}
                    loading={loading}
                    data={list}
                    paging={this.props.paging}
                    onChange={this.handlePageChange}
                    onPageChange={this.handlePageChange}
                />
            </ViewWrapper>
        );
    }
}
const mapStateToProps = store => ({
    loading: store.statementFCZ.loading,
    list: store.statementFCZ.UsedCar.list,
    paging: store.statementFCZ.UsedCar.paging,
    query: store.statementFCZ.UsedCar.query,
});
function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getUsedCar(data, paging)),
        updateQuery: data => {
            dispatch(updateUsedCar({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(view);