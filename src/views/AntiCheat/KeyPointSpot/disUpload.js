import React, { Component } from 'react';
import { connect } from 'react-redux';
import OperationArea from 'components/OperationArea';
import { getDisList, updateDisList } from 'redux/modules/carStatistics';
import { Button, Modal, Upload, message, Spin } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import UploadModal from './uploadModal.jsx';
import _ from 'lodash';
import { formatTime } from 'common/utils';
const { confirm } = Modal;
class uploadView extends Component {
  state = {
    loading: false,
    showModal: false,
  };
  columns = [
    { title: '文件名', dataIndex: 'uploadFileName' },
    { title: '上传人', dataIndex: 'uploadUserName' },
    { title: '上传时间', dataIndex: 'uploadTime', render: text => formatTime(text) },
    { title: '任务生成进度', dataIndex: 'status', render: text => text==1?'生成中':'已生成'},
    {
      title: '操作',
      render: (text, record) => (
        <div>
          <a href="javascript:;" onClick={() => this.props.history.push(`/keyPointSpot/detail/${record.uploadFileId}`)}>
            查看
          </a>
        </div>
      ),
    },
  ];
  componentDidMount() {
    this.handleSearch();
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
  render() {
    return (
      <ViewWrapper>
        <Spin spinning={this.state.loading}>
          <EwAuditTable
            columns={this.columns}
            data={this.props.list}
            loading={this.props.loading}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
          {this.state.showModal && (
            <UploadModal onSearch={() => this.handleSearch()} onCancel={() => this.setState({ showModal: false })} />
          )}
          <OperationArea>
            <Button
              loading={this.state.loading}
              type="primary"
              onClick={() => {
                this.setState({ showModal: true });
              }}
            >
              上传重点下发名单
            </Button>
          </OperationArea>
        </Spin>
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.carStatistics.loading,
  list: store.carStatistics.disList.list,
  paging: store.carStatistics.disList.paging,
  query: store.carStatistics.disList.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(getDisList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateDisList({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(uploadView);
