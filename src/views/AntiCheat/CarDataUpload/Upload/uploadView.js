import React, { Component } from 'react';
import { Button, Modal, Upload, message, Spin } from 'antd';
import OperationArea from 'components/OperationArea';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
const { confirm } = Modal;
export default class uploadView extends Component {
  state = {
    loading: false,
  };
  columns = [
    { title: '批次号', dataIndex: 'batchno' },
    { title: '上传文件名', dataIndex: 'uploadFileName' },
    { title: '上传人', dataIndex: 'uploadUserName' },
    { title: '文件上传时间', dataIndex: 'uploadTime' },
    {
      title: '处理状态',
      dataIndex: 'status',
      render: text => {
        if (text == '1') {
          return '上传成功，待导入';
        } else if (text == '2') {
          return '导入成功';
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
                onClick={() => {
                  this.props.setDetailOddQuery();
                  this.props.history.push(`/${this.props.path}/detail/${record.batchno}`);
                }}
              >
                查看
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={record.file.absolutePath} download={record.file.fileName}>
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
          .post(`/CarDataUploadAction_importData`, { uploadFileId: record.uploadFileId })
          .then(({ data = {} }) => {
            if (data.result === 0) {
              self.setState({ loading: false });
              self.handleSearch();
              Modal.success({
                title: '提示信息：',
                content: data.msg,
              });
            } else {
              self.setState({ loading: false });
              Modal.error({
                title: '提示信息：',
                content: data.msg,
              });
            }
          }).catch(() => {
            message.error('系统异常');
            self.setState({ loading: false });
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
        httpCommonClient
          .post(`/CarDataUploadAction_del`, { uploadFileId: record.uploadFileId })
          .then(({ data = {} }) => {
            if (data.result === 0) {
              message.success(data.msg);
            } else {
              message.error(data.msg);
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
    values.fileType = this.props.fileType;
    this.props.fetch(values, {
      pageNum: page || 1,
      pageSize: pageSize || 10,
    });
  };
  render() {
    let that = this;
    let uploadConfig = {
      showUploadList: false,
      name: 'file',
      action: '/CarDataUploadAction_uploadFile',
      data: { fileType: this.props.fileType },
      accept: '.xls',
      beforeUpload(file) {
        that.setState({ loading: true });
      },
      onChange(info) {
        if (info.file.status === 'done') {
          if (info.file && info.file.response) {
            if (info.file.response.result === 0) {
              that.setState({ loading: false });
              message.success('上传成功');
              that.handleSearch();
            } else {
              that.setState({ loading: false });
              message.error(info.file.response.msg);
            }
          }
        } else if (info.file.status === 'error') {
          that.setState({ loading: false });
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    return (
      <ViewWrapper>
        <EwAuditTable
          columns={this.columns}
          data={this.props.list}
          loading={this.props.loading}
          paging={this.props.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
        <OperationArea>
          {this.props.fileType !== '2' &&
            <>
              <Button type="primary"
                onClick={() => {
                  let a = document.createElement('a');
                  a.href = `/resource/template/车辆赎回模板.xls`;
                  a.click();
                }}>下载模板</Button>&nbsp;&nbsp;&nbsp;&nbsp;
              <Upload {...uploadConfig}>
                <Button loading={this.state.loading} type="primary">请选择一个excel文件</Button>
              </Upload>
            </>
          }
        </OperationArea>
      </ViewWrapper>
    );
  }
}
