import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { getListItem, updateListItem } from 'redux/modules/carDataUpload';
import { httpBufferClient } from 'common/axios';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { exportFile } from 'common/utils';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { chengColumns, systemColumns, returnColumns } from './Columns';
export class Detail extends Component {
  state = {
    isExporting: false,
  };
  componentDidMount() {
    this.handleSearch();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  //列表查询
  handleSearch = (formValues = {}, page, pageSize) => {
    const value = { ...formValues, batchno: this.props.match.params.id };
    const { lrTime } = formValues;
    if (lrTime) {
      const [startTime, endTime] = lrTime;
      value.lrStart = startTime && startTime.format('YYYY-MM-DD');
      value.lrEnd = endTime && endTime.format('YYYY-MM-DD');
      delete value.lrTime;
    }
    this.props.fetch(value, {
      pageNum: page || 1,
      pageSize: pageSize || 10,
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
    const { lrTime } = value;
    if (lrTime) {
      const [startTime, endTime] = lrTime;
      value.lrStart = startTime && startTime.format('YYYY-MM-DD');
      value.lrEnd = endTime && endTime.format('YYYY-MM-DD');
      delete value.lrTime;
    }
    httpBufferClient
      .submit('/CarDataUploadAction_exportItem', { ...value, batchno: this.props.match.params.id })
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
    const { match, query, loading, list, paging } = this.props;
    let columns = chengColumns;
    if (match.path.indexOf('carSystemType') > -1) {
      columns = systemColumns;
    } else if (match.path.indexOf('carReturnType') > -1) {
      columns = returnColumns;
    }
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            wrappedComponentRef={form => (this.form = form)}
            enableExport={true}
            onExport={this.handleExport}
            isExporting={this.state.isExporting}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={columns}
            loading={loading}
            data={list}
            paging={paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
        <OperationArea>
          <BackToList />
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.carDataUpload.loading,
  list: store.carDataUpload.listItem.list,
  paging: store.carDataUpload.listItem.paging,
  query: store.carDataUpload.listItem.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(getListItem(data, paging));
    },
    updateQuery: data => {
      dispatch(updateListItem(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
