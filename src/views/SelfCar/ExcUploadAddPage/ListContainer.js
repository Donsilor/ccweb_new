import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { exportFile } from 'common/utils';
import { httpBufferClient } from 'common/axios';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { FETCH_SELLDATA_LIST, UPDATE_SELLDATA_QUERY } from 'redux/modules/selfcar/exUploadAdd';
import { listColumns } from './Columns';
export class excUploadAllList extends Component {
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
    this.props.fetch(values, {
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
    httpBufferClient
      .submit(`/self-car/v1.0/carImports/export/inc/list`, { ...value })
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
    const { match, query } = this.props;
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
          columns={listColumns}
          data={this.props.list}
          loading={this.props.loading}
          paging={this.props.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.exUploadAdd.loading,
  list: store.exUploadAdd.reserved_list.list,
  paging: store.exUploadAdd.reserved_list.paging,
  query: store.exUploadAdd.reserved_list.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_SELLDATA_LIST(data, paging)),
    updateQuery: data => {
      dispatch(UPDATE_SELLDATA_QUERY({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(excUploadAllList);
