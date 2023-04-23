import React, { Component } from 'react';
import { Modal, message } from 'antd';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import DetailInfoGrid from 'components/DetailInfoGrid';
import { exportFile } from 'common/utils';

const FORMAT = 'YYYY-MM-DD';
export default class TaskSummary extends Component {
  state = {
    showModal: false,
    isExporting: false,
    userId: '',
    type: '',
  };
  componentDidMount() {
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
      values.beginDate = startTime && startTime.format(FORMAT);
      values.endDate = endTime && endTime.format(FORMAT);
      delete values.taskStartTimeRange;
    }
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
    this.props.fetchSummary && this.props.fetchSummary(values);
  };
  handleExport = () => {
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    const { value } = this.props.query;
    const { taskStartTimeRange } = value;
    if (taskStartTimeRange) {
      // 任务下发日期
      const [startTime, endTime] = taskStartTimeRange;
      value.beginDate = startTime && startTime.format(FORMAT);
      value.endDate = endTime && endTime.format(FORMAT);
      delete value.taskStartTimeRange;
    }
    this.props
      .exportData(value)
      .then(({ payload }) => {
        const result = exportFile(payload);
        result && message.warning(result, 2.5);
      })
      .catch(err => {
        console.error(err.message);
      })
      .then(() => {
        this.setState({
          isExporting: false,
        });
        hide();
      });
  };

  renderSummaryList = () => {
    const { summaryList, summaryData } = this.props;
    return (
      Array.isArray(summaryList) &&
      summaryList.map(item => {
        return {
          label: item.label,
          value: summaryData[item.value] || '-',
        };
      })
    );
  };

  handleSearchDetail = (userId, type, page, pageSize) => {
    const { value } = this.props.query;
    const { taskStartTimeRange } = value;
    if (taskStartTimeRange) {
      // 任务下发日期
      const [startTime, endTime] = taskStartTimeRange;
      value.beginDate = startTime && startTime.format(FORMAT);
      value.endDate = endTime && endTime.format(FORMAT);
      delete value.taskStartTimeRange;
    }
    return (
      userId &&
      type &&
      this.props.handleSearchDetail(
        { userId, type, ...value },
        {
          pageNum: page || this.props.detailPaging.current,
          pageSize: pageSize || this.props.detailPaging.pageSize,
        }
      )
    );
  };

  handleDetailPageChange = (page, pageSize) => {
    this.handleSearchDetail(this.state.userId, this.state.type, page, pageSize);
  };

  selectRow = (userId, type) => {
    if (userId && type) {
      this.handleSearchDetail(userId, type, 1, 10).then(() => {
        this.setState({
          showModal: true,
          userId: userId,
          type: type,
        });
      });
    }
  };

  onCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { match, query, columns, list, rowKey, detailColumns } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            enableExport
            isExporting={this.state.isExporting}
            onExport={this.handleExport}
            onUpdateQuery={this.props.updateQuery}
          />
        </FormArea>
        <OperArea>
          <DetailInfoGrid list={this.renderSummaryList()} />
        </OperArea>
        <div>
          <EwAuditTable
            columns={columns(this.selectRow)}
            loading={this.props.loading && !this.state.showModal}
            data={list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={rowKey}
            bordered
          />
        </div>
        <Modal title="抽查任务明细" visible={this.state.showModal} onCancel={this.onCancel} footer={null} width={1024}>
          <EwAuditTable
            loading={this.props.loading}
            data={this.props.detailList}
            columns={detailColumns}
            paging={this.props.detailPaging}
            onChange={this.handleDetailPageChange}
            onPageChange={this.handleDetailPageChange}
            scroll={{ x: 800 }}
            rowKey={record => `${record.spottestId},${record.chassis}`}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}
