import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getbonusDone, updatebonusDone } from 'redux/modules/ewMarket';
import { awardRemitColumns, columnsItem } from '../Columns'
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { message, Modal, Table } from 'antd';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
class awardRemitDone extends Component {
    state = {
        isExporting: false,
    };
    componentDidMount() {
        this.handleSearch(this.props.query.value);
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch(this.props.query.value, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        this.props.fetch(formValues, {
            pageNum: page || this.props.paging.current,
            pageSize: pageSize || this.props.paging.pageSize,
        });
    };
    itemSearch = (record) => {
        this.setState({ isExporting: true })
        httpCommonClient.post(`/yck/bonus/list/${record.id}`,
            { accountingId: record.id })
            .then(({ data = {} }) => {
                if (data.code === 200) {
                    this.setState({ list: data.rows })
                } else {
                    message.error(data.message)
                }
                this.setState({ isExporting: false })
            });
    };
    render() {
        const { paging, match, list, loading, query, columns } = this.props;
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
                    columns={[...columns,
                    {
                        fixed: 'right',
                        title: '操作',
                        render: (text, record) => (
                            <a
                                href="javascript:;"
                                onClick={() => {
                                    this.itemSearch(record)
                                    this.setState({ showModal: true })
                                }}
                            >查看</a>
                        ),
                    }]}
                    loading={loading}
                    data={list}
                    paging={paging}
                    onChange={this.handlePageChange}
                    onPageChange={this.handlePageChange}
                />
                {/* 查看明细*/}
                {this.state.showModal && (
                    <Modal
                        title='查看明细'
                        width='90%'
                        onCancel={() => this.setState({ showModal: false })}
                        visible
                        footer={null}
                    >
                        <Table
                            columns={columnsItem}
                            dataSource={this.state.list}
                            loading={this.state.isExporting}
                            scroll={{ x: true }}
                            pagination={false}
                        />
                    </Modal>
                )}
            </ViewWrapper>
        );
    }
}
const mapStateToProps = store => ({
    loading: store.ewMarket.loading,
    list: store.ewMarket.bonusDone.list,
    paging: store.ewMarket.bonusDone.paging,
    query: store.ewMarket.bonusDone.query,
    columns: awardRemitColumns,
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getbonusDone(data, paging)),
        updateQuery: data => {
            dispatch(updatebonusDone({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(awardRemitDone);