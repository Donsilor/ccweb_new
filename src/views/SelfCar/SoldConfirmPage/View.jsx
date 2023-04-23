import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import { matchPath } from 'react-router';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
const { confirm } = Modal;
export default class TaskSummary extends Component {
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  jumpToDetail = id => {
    const path = this.props.match.path;
    if (!id) {
      return;
    }
    const link = {
      pathname: `/selfCarMgPage/detail/${id}`,
      query: { url: path },
    };
    this.props.history.push(link);
  };
  //列表操作
  renderColumn = () => {
    const path = this.props.match.path;
    let columns = [];
    columns = [...this.props.columns(this.jumpToDetail)];
    path === '/soldConfirm/todo' &&
      columns.push({
        title: '操作',
        fixed: 'right',
        width: 120,
        render: (text, record) => (
          <Fragment>
            <a href="javascript:;" onClick={this.readySell(record)}>
              确认已售
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" onClick={this.noSell(record)}>
              确认未售
            </a>
          </Fragment>
        ),
      });
    return columns;
  };
  //确认已售
  readySell = record => () => {
    let self = this;
    confirm({
      title: '确认已售将终止该车当前的车辆任务，请确认是否继续？',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/cars/sell/confirmed/${record.id}`, {})
          .then(respone => {
            message.success('操作成功');
            self.handlePageChange();
          })
          .catch(err => {
            message.success('操作失败');
          });
      },
    });
  };
  //确认未售
  noSell = record => () => {
    let self = this;
    confirm({
      title: '确认未售操作？',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/cars/sell/no-confirmed/${record.id}`, {})
          .then(respone => {
            message.success('操作成功');
            self.handlePageChange();
          })
          .catch(err => {
            message.success('操作失败');
          });
      },
    });
  };
  render() {
    const { match, query, list, enableExport, loading } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            enableExport={enableExport}
            onExport={this.handleExport}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={loading}
            data={list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            //rowKey={record => `${record.id}`}
            bordered
          />
        </div>
      </ViewWrapper>
    );
  }
}
