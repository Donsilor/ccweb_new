import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import { moveRecordColumns } from './Columns';
const { confirm } = Modal;
const FORMAT = 'YYYY-MM-DD';
export default class TaskSummary extends Component {
  state = {
    isExporting: false,
  };
  componentDidMount() {
    this.handleSearch();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const { value } = this.props.query;
    const { statisDate } = value;
    if (statisDate) {
      const [startDate, endDate] = statisDate;
      value.startDate = startDate && startDate.format(FORMAT);
      value.endDate = endDate && endDate.format(FORMAT);
      delete value.statisDate;
    }
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //列表操作
  renderColumn = () => {
    const columns = [];
    columns.push({
      title: '操作',
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          {[1, 2, 0].indexOf(record.state) > 0 && (
            <a href="javascript:;" onClick={this.cancelMove(record)}>
              取消移动
            </a>
          )}
        </Fragment>
      ),
    });
    return this.props.columns.concat(columns);
  };
  cancelMove = record => () => {
    let self = this;
    confirm({
      title: '请再次确认是否取消移动',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/moveCars/selfMoveCars/cance-move/${record.id}`, {})
          .then(res => {
            if (res.data.code == 200) {
              message.success('操作成功');
              self.handlePageChange();
            }
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  //导出
  handleExport = () => {
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    const { value } = this.props.query;
    const { statisDate } = value;
    if (statisDate) {
      const [startDate, endDate] = statisDate;
      value.beginDate = startDate && startDate.format(FORMAT);
      value.endDate = endDate && endDate.format(FORMAT);
      delete value.statisDate;
    }
    httpCommonClient
      .post(`/self-car/v1.0/moveCars/selfMoveCars/export`, value)
      .then(payload => {
        const result = exportFile(payload.data);
        result && message.warning(result, 2.5);
      })
      .then(() => {
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
    const { match, query, list, enableExport } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            //isExporting={this.state.isExporting}
            onUpdateQuery={this.props.updateQuery}
            //enableExport={enableExport}
            //onExport={this.handleExport}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={record => `${record.id}`}
            bordered
          />
        </div>
      </ViewWrapper>
    );
  }
}
