import React, { Component } from 'react';
import { connect } from 'react-redux';
import OperationArea from 'components/OperationArea';
import { getCarList, updateCarList } from 'redux/modules/carStatistics';
import { Button, Modal, Upload, message, Spin } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import UploadModal from './uploadModal.jsx';
import _ from 'lodash';
const { confirm } = Modal;
class uploadView extends Component {
  state = {
    loading: false,
    showModal: false,
  };
  columns = [
    { title: '文件名', dataIndex: 'uploadFileName' },
    { title: '上传人', dataIndex: 'uploadUserName' },
    { title: '上传时间', dataIndex: 'uploadTime' },
    {
      title: '处理状态',
      dataIndex: 'status',
      render: text => {
        if (text == '1') {
          return '待导入';
        } else if (text == '2') {
          return '导入完成';
        } else {
          return '导入失败';
        }
      },
    },
    { title: '最后处理时间', dataIndex: 'opTime' },
    {
      title: '操作',
      render: (text, record) => (
        <div>
          {record.status == '1' && (
            <div>
              <a href="javascript:;" onClick={this.importOper(record)}>
                导入
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="javascript:;" onClick={this.deleOper(record)}>
                删除
              </a>
            </div>
          )}
          {record.status == '2' && (
            <div>
              <a
                href="javascript:;"
                onClick={() => this.props.history.push(`/carStatistics/detail/${record.batchno}/${record.fileType}`)}
              >
                查看
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={record.file.absolutePath} download={record.uploadFileName}>
                下载
              </a>
            </div>
          )}
        </div>
      ),
    },
  ];
  //导入
  importOper = record => () => {
    let self = this;
    confirm({
      title: '请确认是否导入该文件?',
      onOk() {
        self.setState({ loading: true });
        httpCommonClient
          .post(`/BakDataMngAction_importData`, { uploadFileId: record.uploadFileId })
          .then(({ data = {} }) => {
            if (data.result === 0) {
              self.setState({ loading: false });
              message.success(data.msg);
              self.handleSearch(self.props.query.value);
            } else {
              self.setState({ loading: false });
              message.error(data.msg);
            }
          });
      },
    });
  };
  //删除
  deleOper = record => () => {
    let self = this;
    confirm({
      title: '请确认是否删除该文件?',
      onOk() {
        httpCommonClient.post(`/BakDataMngAction_del`, { uploadFileId: record.uploadFileId }).then(({ data = {} }) => {
          if (data.result === 0) {
            message.success(data.msg);
          } else {
            message.error(data.msg);
          }
          self.handleSearch(self.props.query.value);
        });
      },
    });
  };
  componentDidMount() {
    this.handleSearch(_.isEmpty(this.props.query.value) ? { fileType: 21 } : this.props.query.value);
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
    const { match, query } = this.props;
    return (
      <ViewWrapper>
        <Spin spinning={this.state.loading}>
          <FormArea>
            <CCForm
              onSearch={this.handleSearch}
              path={match.path}
              query={query}
              onUpdateQuery={this.props.updateQuery}
              wrappedComponentRef={form => (this.form = form)}
            />
          </FormArea>
          <EwAuditTable
            columns={this.columns}
            data={this.props.list}
            loading={this.props.loading}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
          {this.state.showModal && (
            <UploadModal
              onSearch={fileType => {
                this.setState({ showModal: false });
                let self = this;
                self.form.props.form.setFieldsValue(fileType);
                this.handleSearch(fileType);
                self.props.updateQuery({ value: fileType });
              }}
              onCancel={() => this.setState({ showModal: false })}
            />
          )}
          <OperationArea>
            <Button loading={this.state.loading} type="primary" onClick={() => this.setState({ showModal: true })}>
              上传文件
            </Button>
          </OperationArea>
        </Spin>
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.carStatistics.loading,
  list: store.carStatistics.carList.list,
  paging: store.carStatistics.carList.paging,
  query: store.carStatistics.carList.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(getCarList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateCarList({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(uploadView);
