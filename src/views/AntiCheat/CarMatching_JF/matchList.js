import React, { Component } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { getJiefangList, updateJiefangList } from 'redux/modules/carMatching';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient } from 'common/axios';
import { exportFile } from 'common/utils';
import { matchListColumns } from './Columns';
class matchList extends Component {
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
    const value = { ...formValues };
    const { matchedDate, fcDate } = formValues;
    if (matchedDate) {
      const [startTime, endTime] = matchedDate;
      value.matchedStartDate = startTime && startTime.format('YYYY/MM/DD');
      value.matchedEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.matchedDate;
    }
    if (fcDate) {
      const [startTime, endTime] = fcDate;
      value.startDate = startTime && startTime.format('YYYY/MM/DD');
      value.endDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.fcDate;
    }
    this.props.fetch(value, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
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
    const { matchedDate, fcDate } = value;
    if (matchedDate) {
      const [startTime, endTime] = matchedDate;
      value.matchedStartDate = startTime && startTime.format('YYYY/MM/DD');
      value.matchedEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.matchedDate;
    }
    if (fcDate) {
      const [startTime, endTime] = fcDate;
      value.startDate = startTime && startTime.format('YYYY/MM/DD');
      value.endDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.fcDate;
    }
    httpBufferClient
      .submit('/warning/v1.0/matching/outboundJiefang/outboundJiefangBill/export', value)
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
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={matchListColumns}
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
const mapStateToProps = store => ({
  loading: store.carMatching.loading,
  list: store.carMatching.jiefangList.list,
  paging: store.carMatching.jiefangList.paging,
  query: store.carMatching.jiefangList.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getJiefangList(data, paging)),
    updateQuery: data => {
      dispatch(updateJiefangList({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(matchList);
