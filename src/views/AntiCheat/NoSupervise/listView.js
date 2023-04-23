import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { message } from 'antd';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient } from 'common/axios';
import { exportFile } from 'common/utils';
export default class listView extends Component {
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
    const values = { ...formValues };
    const { bookTime, uploadTime } = formValues;
    if (bookTime) {
      const [startTime, endTime] = bookTime;
      values.bookStartTime = startTime && startTime.format('YYYY/MM/DD');
      values.bookEndTime = endTime && endTime.format('YYYY/MM/DD');
      delete values.bookTime;
    }
    if (uploadTime) {
      const [startTime, endTime] = uploadTime;
      values.uploadStartTime = startTime && startTime.format('YYYY/MM/DD');
      values.uploadEndTime = endTime && endTime.format('YYYY/MM/DD');
      delete values.uploadTime;
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
    const { value } = this.props.query;
    const { bookTime, uploadTime } = value;
    if (bookTime) {
      const [startTime, endTime] = bookTime;
      value.bookStartTime = startTime && startTime.format('YYYY/MM/DD');
      value.bookEndTime = endTime && endTime.format('YYYY/MM/DD');
      delete value.bookTime;
    }
    if (uploadTime) {
      const [startTime, endTime] = uploadTime;
      value.uploadStartTime = startTime && startTime.format('YYYY/MM/DD');
      value.uploadEndTime = endTime && endTime.format('YYYY/MM/DD');
      delete value.uploadTime;
    }
    httpBufferClient
      .submit(this.props.export, value)
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
    const { paging, match, list, loading, query, columns } = this.props;
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
          />
        </FormArea>
        <EwAuditTable
          columns={columns}
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