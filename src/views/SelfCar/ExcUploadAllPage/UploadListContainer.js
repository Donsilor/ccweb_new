import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { exportFile } from 'common/utils';
import { httpBufferClient } from 'common/axios';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { FETCH_RECORD_LIST, UPDATE_RECORD_QUERY } from 'redux/modules/selfcar/exUploadAll';
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
      .submit(`/self-car/v1.0/carImports/export/all/list`, { ...value })
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
  loading: store.exUploadAll.loading,
  list: store.exUploadAll.params_carImports.list,
  paging: store.exUploadAll.params_carImports.paging,
  query: store.exUploadAll.params_carImports.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_RECORD_LIST(data, paging)),
    updateQuery: data => {
      dispatch(UPDATE_RECORD_QUERY({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(excUploadAllList);
