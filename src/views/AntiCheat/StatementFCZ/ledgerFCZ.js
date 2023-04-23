import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Tabs, Modal } from 'antd';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import _ from 'lodash'
const { TabPane } = Tabs;
export default class listView extends Component {
    state = {
        value: {},
        list: [],
        tabs: [],
        tabIndex: '虚出库',
        paging: { current: 1, pageSize: 10, total: 0 },
        loading: false
    };
    columns = [
        { title: '台账名称', dataIndex: 'ledgerName' },
        { title: '生成时间', dataIndex: 'generateTime' },
        { title: '累计下载', dataIndex: 'downloadTimes' },
        {
            title: '操作',
            render: (text, record) =>
                <a
                    onClick={() => {
                        if (!record.fileUrl) {
                            Modal.info({
                                title: '提示信息：',
                                content: '文件尚未生成，请稍后下载！',
                            });
                        } else {
                            httpCommonClient
                                .post(`/warning/v1.0/fangche/fangcheLedger/update/downloadTimes`, { id: record.id })
                                .then(({ data = {} }) => {
                                    if (data.code === 200) {
                                        this.handleSearch();
                                    }
                                });
                            let a = document.createElement('a')
                            a.href = `/warning${record.fileUrl}`
                            a.click()
                        }
                    }}>下载</a>
        }]
    componentDidMount() {
        httpCommonClient
            .post(`/warning/v1.0/fangche/fangcheLedger/tab/list`, {})
            .then(({ data = {} }) => {
                if (data.code === 200) {
                    this.setState({
                        tabs: data.data
                    });
                    this.handleSearch();
                }
            });
    }
    handlePageChange = (page, pageSize) => {
        this.handleSearch({}, page, pageSize);
    };
    handleSearch = (formValues, page, pageSize) => {
        this.setState({ loading: true });
        let values = this.state.value;
        const { generateTime } = values;
        if (generateTime) {
            const [startTime, endTime] = generateTime;
            values.generateTimeStart = startTime && startTime.format('YYYY/MM/DD');
            values.generateTimeEnd = endTime && endTime.format('YYYY/MM/DD');
            delete values.generateTime;
        }
        httpCommonClient
            .postWithPaging(`/warning/v1.0/fangche/fangcheLedger/list`, { ...values, ledgerName: this.state.tabIndex }, {
                pageNum: page || 1,
                pageSize: pageSize || 10,
            })
            .then(({ data = {} }) => {
                if (data.code === 200) {
                    this.setState({
                        loading: false, list: data.data.list, paging: {
                            current: data.data.pageNum,
                            pageSize: data.data.pageSize,
                            total: data.data.total,
                        }
                    });
                } else {
                    this.setState({ loading: false, list: [] });
                }
            });
    };
    render() {
        const { paging, list, loading, tabs } = this.state;
        return (
            <ViewWrapper>
                <Tabs defaultActiveKey="虚出库" onChange={(key) => {
                    this.form.handleFormReset()
                    this.setState({ tabIndex: key, value: {} }, () => this.handleSearch());
                }}>
                    {
                        tabs.map(item => (
                            <TabPane tab={item} key={item}></TabPane>
                        ))
                    }
                </Tabs>
                <FormArea>
                    <CCForm
                        onSearch={this.handleSearch}
                        path='/ledgerFCZ'
                        query={{
                            value: {},
                            expandForm: false,
                            aitiForm: true,
                        }}
                        onUpdateQuery={query => {
                            this.setState({ value: query.value });
                        }}
                        wrappedComponentRef={form => (this.form = form)}
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
            </ViewWrapper>
        );
    }
}