import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient, httpBufferClient } from 'common/axios';
import { exportFile } from 'common/utils';
const FORMAT = 'YYYY-MM-DD';
export default class TaskSummary extends Component {
  state = {
    excepList: [],
    financialList: [],
    isExporting: false,
  };
  componentDidMount() {
    const { menuId } = this.props;
    const spottesttype = menuId === 'car' ? 20 : 30;
    this.excReasonList(spottesttype);
    this.financialList();
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    const { taskStartTimeRange } = formValues;
    if (taskStartTimeRange) {
      // 任务下发日期
      const [startTime, endTime] = taskStartTimeRange;
      values.startDate = startTime && startTime.format(FORMAT);
      values.endDate = endTime && endTime.format(FORMAT);
      delete values.taskStartTimeRange;
    }
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
    this.financialList();
  };
  // 抽查任务异常类型列表
  excReasonList = spottesttype => {
    httpCommonClient
      .submit('/self-car/v1.0/selfExceptionType/find/list/used', { spottesttype: spottesttype })
      .then(({ data }) => {
        if (data.code === 200) {
          let excepList = data.data;
          this.setState({ excepList });
        }
      });
  };
  // 金融产品类型列表
  financialList = () => {
    httpCommonClient.submit('/self-car/v1.0/selfFinancialProducts/find/list/all', {}).then(({ data }) => {
      if (data.code === 200) {
        let financialList = data.data;
        this.setState({ financialList });
      }
    });
  };
  //导出
  handleExport = () => {
    if (!this.props.list.length) {
      message.error('暂无数据,无法导出');
      return;
    }
    const { menuId } = this.props;
    const spottesttype = menuId === 'car' ? 20 : 30;
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    const { value } = this.props.query;
    const { taskStartTimeRange } = value;
    if (taskStartTimeRange) {
      // 任务下发日期
      const [startTime, endTime] = taskStartTimeRange;
      value.startDate = startTime && startTime.format(FORMAT);
      value.endDate = endTime && endTime.format(FORMAT);
      delete value.taskStartTimeRange;
    }
    httpBufferClient
      .submit(`/self-car/v1.0/standingBook/export/spot/list`, { ...value, spottesttype })
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
    const { match, query, list, loading, columns } = this.props;
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
            excReasonList={this.state.excepList}
            financialList={this.state.financialList}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={columns}
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
