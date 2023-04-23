import React, { Component } from 'react';
import { Button, Modal, Upload, message, Spin } from 'antd';
import { connect } from 'react-redux';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import { FETCH_RESERVED_LIST, UPDATE_RESERVED_QUERY } from 'redux/modules/selfcar/exUploadAll';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const { confirm } = Modal;
export class excUploadAll extends Component {
  state = {
    loading: false,
  };
  columns = [
    {
      title: '文件上传时间',
      dataIndex: 'uploadTime',
      key: '1',
      render: text => {
        return text && moment(text).format(TIME_FORMAT);
      },
    },
    { title: '操作人', dataIndex: 'uploadUserName', key: '2' },
    { title: '上传文件名', dataIndex: 'fileName', key: '3' },
    { title: '处理状态', dataIndex: 'statusName', key: '4' },
    { title: '批次号', dataIndex: 'batchno', key: '5' },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 250,
      render: (text, record) => (
        <div>
          {record.statusName === '待处理' && (
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
          {(record.statusName === '处理完成' || record.statusName === '处理异常') && (
            <div>
              <a href="javascript:;" onClick={this.sellData(record)}>
                出售数据
              </a>
            </div>
          )}
        </div>
      ),
    },
  ];
  //出售数据
  sellData = record => () => {
    this.props.history.push(`/excUploadAll/sellData/${record.batchno}`);
  };
  //导入
  importOper = record => () => {
    let self = this;
    confirm({
      title: '请确认是否导入该文件?',
      onOk() {
        self.setState({ loading: true });
        httpCommonClient.post(`/self-car/v1.0/excelUpload/importCars/all/${record.batchno}`, {}).then(respone => {
          if (respone.data.code === 200) {
            self.setState({ loading: false });
            message.success('导入成功');
            self.handleSearch();
          } else {
            self.setState({ loading: false });
            message.error(respone.data.message);
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
        httpCommonClient.deleteMeth(`/self-car/v1.0/excelUpload/delete/all/${record.fileId}`).then(respone => {
          if (respone.data.code === 200) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          self.handleSearch();
        });
      },
    });
  };
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
    let that = this;
    let uploadConfig = {
      name: 'file',
      action: '/self-car/v1.0/excelUpload/upload/all',
      accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      beforeUpload(file) {
        console.log(file.name);
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          if (info.file && info.file.response) {
            if (info.file.response.code === 200) {
              message.success('上传成功');
              that.handleSearch();
            } else {
              message.error(info.file.response.message);
            }
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    return (
      <ViewWrapper>
        <Upload {...uploadConfig}>
          <Button>请选择一个excel文件</Button>
        </Upload>
        <br></br>
        <Spin tip="导入中，请稍后。。。" spinning={this.state.loading}>
          <EwAuditTable
            columns={this.columns}
            data={this.props.list}
            rowKey={record => `${record.batchno}`}
            loading={this.props.loading}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </Spin>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.exUploadAll.loading,
  list: store.exUploadAll.params_excelUpload.list,
  paging: store.exUploadAll.params_excelUpload.paging,
  query: store.exUploadAll.params_excelUpload.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(FETCH_RESERVED_LIST(data, paging)),
    updateQuery: data => {
      dispatch(UPDATE_RESERVED_QUERY({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(excUploadAll);
