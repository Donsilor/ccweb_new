import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import moment from 'moment';
const { confirm } = Modal;
export default class analyView extends Component {
  state = {
    isExporting: false,
    brandList: [],
  };
  componentDidMount() {
    this.getBrandList();
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    const { paramYearMonth, paramImportTime } = formValues;
    if (paramImportTime) {
      values.paramImportTime = paramImportTime.format('YYYY/MM/DD');
    }
    if (paramYearMonth) {
      values.paramYearMonth = paramYearMonth.format('YYYY/MM');
    }
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //查询品牌
  getBrandList() {
    httpCommonClient.post(`/warning/v1.0/warning/brand/list/all`, {}).then(respone => {
      if (respone.data.code === 200) {
        this.setState({ brandList: respone.data.data });
      }
    });
  }
  //导出
  handleExport = () => {
    if (!this.props.list.length) {
      message.error('暂无数据,无法导出');
      return;
    }
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    const { value } = this.props.query;
    const { paramYearMonth, paramImportTime } = value;
    if (paramImportTime) {
      value.paramImportTime = paramImportTime.format('YYYY/MM/DD');
    }
    if (paramYearMonth) {
      value.paramYearMonth = paramYearMonth.format('YYYY/MM');
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
    const { match, query, list, loading } = this.props;
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
            brandList={!['/statAnalysis/trade', '/statAnalysis/shiftA'].includes(match.path) && this.state.brandList}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.props.columns}
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
