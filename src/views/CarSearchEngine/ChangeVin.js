import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EwAuditTable from 'components/EwAuditTable';
import { fetchVinChangeList as fetchData } from 'redux/modules/carSearchEngine';

export class view extends Component {
    columns = [
        {
            title: '变更前',
            dataIndex: 'vinBefore',
            align: 'center',
        },
        {
            title: '变更后',
            dataIndex: 'vinAfter',
            align: 'center',
        },
        {
            title: '操作人',
            dataIndex: 'userName',
            align: 'center',
        },
        {
            title: '操作方式',
            dataIndex: 'source',
            align: 'center',
        },
        {
            title: '操作时间',
            dataIndex: 'changeTime',
            align: 'center',
        },
    ];
    handlePageChange = (page, pageSize) => {
        this.handleSearch(page, pageSize);
    };

    handleSearch = (page, pageSize) => {
        this.props.chassis &&
            this.props.fetchData(
                { id: this.props.carId },
                {
                    pageNum: page || this.props.paging.current,
                    pageSize: pageSize || this.props.paging.pageSize,
                }
            );
    };

    componentDidMount() {
        this.handleSearch();
    }

    iframeJump = record => e => {
        record && record.id && window.parent && window.parent.jumpToTask && window.parent.jumpToTask(record.id);
    };
    render() {
        return (
            <div>
                <EwAuditTable
                    columns={this.columns}
                    loading={this.props.loading}
                    data={this.props.list}
                    paging={this.props.paging}
                    onChange={this.handlePageChange}
                    onPageChange={this.handlePageChange}
                    rowKey={'id'}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    loading: store.carSearchEngine.loading,
    chassis: store.carSearchEngine.chassis,
    list: store.carSearchEngine.flowList.list,
    paging: store.carSearchEngine.flowList.paging,
    carId: store.carSearchEngine.carId
});

function mapDispatchToProps(dispatch) {
    return {
        fetchData: (data, paging) => dispatch(fetchData(data, paging)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(view);
