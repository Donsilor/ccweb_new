import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Button, message, Modal, Table } from 'antd';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
const { confirm } = Modal;
export default class listView extends Component {
  state = {
    value: {},
    isExporting: false,
    list: []
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    const { createDate, updateDate } = formValues
    if (createDate) {
      const [startTime, endTime] = createDate;
      values.createStartDate = startTime && startTime.format('YYYY-MM-DD');
      values.createEndDate = endTime && endTime.format('YYYY-MM-DD');
      delete values.createDate;
    }
    if (updateDate) {
      const [startTime, endTime] = updateDate;
      values.updateStartDate = startTime && startTime.format('YYYY-MM-DD');
      values.updateEndDate = endTime && endTime.format('YYYY-MM-DD');
      delete values.updateDate;
    }
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
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
            provCity
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
                  this.props.history.push(`${match.path}/detail/${record.id}`);
                }}
              >
                查看
              </a>
            ),
          }]}
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