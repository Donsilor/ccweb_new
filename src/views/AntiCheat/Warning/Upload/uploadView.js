import React, { Component } from 'react';
import { Button, Modal, Upload, message, Spin } from 'antd';
import { ViewWrapper } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
const { confirm } = Modal;
export default class uploadView extends Component {
  state = {
    loading: false,
  };
  columns = [
    { title: '文件上传时间', dataIndex: 'uploadTime' },
    { title: '上传文件名', dataIndex: 'name' },
    {
      title: '处理状态',
      dataIndex: 'importStatusCode',
      render: text => {
        return text == 'import_status_1' ? '待导入' : '导入完成';
      },
    },
    { title: '最后处理时间', dataIndex: 'importTime' },
    {
      title: '操作',
      render: (text, record) => (
        <div>
          {record.importStatusCode == 'import_status_1' && (
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
        httpCommonClient.post(`/warning/v1.0/warning/importRecord/import`, { id: record.id }).then(respone => {
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
        httpCommonClient.post(`/warning/v1.0/warning/importRecord/delete`, { id: record.id }).then(respone => {
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
    values.sourceTypeCode = this.props.sourceType;
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  render() {
    let that = this;
    let uploadConfig = {
      name: 'file',
      action: '/warning/v1.0/warning/importRecord/upload',
      data: { sourceType: this.props.sourceType },
      accept: '.xls,.xlsx',
      beforeUpload(file) {
        that.setState({ loading: true });
      },
      onChange(info) {
        if (info.file.status === 'done') {
          if (info.file && info.file.response) {
            if (info.file.response.code === 200) {
              that.setState({ loading: false });
              message.success('上传成功');
              that.handleSearch();
            } else {
              that.setState({ loading: false });
              message.error(info.file.response.message);
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
        <Spin spinning={this.state.loading}>
          <Upload {...uploadConfig}>
            <Button type="primary">请选择一个excel文件</Button>
          </Upload>
          <br />
          <EwAuditTable
            columns={this.columns}
            data={this.props.list}
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
