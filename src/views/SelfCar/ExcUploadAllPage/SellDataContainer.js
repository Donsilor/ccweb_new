import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Modal } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { FETCH_SELLDATA_LIST, UPDATE_SELLDATA_QUERY } from 'redux/modules/selfcar/exUploadAll';
import { sellDataColumns } from './Columns';
import { httpCommonClient } from 'common/axios';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
const { confirm } = Modal;
export class excUploadAllList extends Component {
  state = {
    selectedRowKeys: [],
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    let values = { ...formValues };
    values.batchno = this.props.match.params.id;
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //出售所选数据
  handleMultipleRow = () => () => {
    if (this.state.selectedRowKeys.length == 0) {
      message.error('请选择数据');
      return;
    }
    let self = this;
    confirm({
      title: '请确认是否出售所选数据?',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/carImports/find/all/Sold`, self.state.selectedRowKeys.map(Number))
          .then(res => {
            if (res.data.code === 200) {
              message.success('操作成功');
              self.handlePageChange();
            } else {
              message.error(res.data.message);
            }
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  //废弃已选择数据
  deleteMultipleRow = () => () => {
    if (this.state.selectedRowKeys.length == 0) {
      message.error('请选择数据');
      return;
    }
    let self = this;
    confirm({
      title: '请确认是否废弃已选择数据?',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/carImports/delete/all/sells`, self.state.selectedRowKeys.map(Number))
          .then(res => {
            if (res.data.code === 200) {
              message.success('操作成功');
              self.handlePageChange();
            } else {
              message.error(res.data.message);
            }
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  render() {
    const { match, query } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
      },
      getCheckboxProps: record => ({
        disabled: record.processStatusName === '处理完成',
      }),
    };
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
          <Button type="primary" onClick={this.handleMultipleRow()}>
            出售所选数据
          </Button>
          <Button type="primary" onClick={this.deleteMultipleRow()}>
            废弃已选择数据
          </Button>
        </FormArea>
        <br></br>
        <EwAuditTable
          columns={sellDataColumns}
          data={this.props.list}
          //rowKey={record => `${record.id}`}
          loading={this.props.loading}
          paging={this.props.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
          rowSelection={rowSelection}
          bordered
        />
        <OperationArea>
          <BackToList />
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.exUploadAll.loading,
  list: store.exUploadAll.params_sell.list,
  paging: store.exUploadAll.params_sell.paging,
  query: store.exUploadAll.params_sell.query,
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
