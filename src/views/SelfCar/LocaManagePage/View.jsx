import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import ModalForm from 'components/ModalForm';
const { confirm } = Modal;
const FORMAT = 'YYYY-MM-DD';
export default class TaskSummary extends Component {
  state = {
    locaModVisible: false,
    isExporting: false,
    locaManageInfo: [],
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
  onCancel = () => {
    this.setState({
      locaModVisible: false,
    });
  };
  //列表操作
  renderColumn = () => {
    const columns = [];
    columns.push({
      title: '操作',
      fixed: 'right',
      width: 120,
      render: (text, record) => (
        <Fragment>
          <a href="javascript:;" onClick={this.locaMod(record)}>
            修改
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="javascript:;" onClick={this.locaDel(record)}>
            删除
          </a>
        </Fragment>
      ),
    });
    return this.props.columns.concat(columns);
  };
  //修改定位点
  locaMod = record => () => {
    this.setState({ locaModVisible: true, locaManageInfo: record });
  };
  onOk = () => {
    this.setState({
      locaModVisible: false,
    });
    this.handleSearch();
  };
  //修改定位点提交
  locaManageSubmit = (formData, record) => {
    return httpCommonClient
      .post(`/self-car/v1.0/locations/update/${record.id}`, { locationNewName: formData.locationName })
      .then(res => {
        if (res.data.code === 200) {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: res.data.message,
            },
          });
        }
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  //删除定位点
  locaDel = record => () => {
    let self = this;
    confirm({
      title: '请再次确认是否删除该定位点？',
      onOk() {
        httpCommonClient.deleteMeth(`/self-car/v1.0/locations/delete/${record.id}`).then(respone => {
          if (respone.data.code === 200) {
            message.success('操作成功');
          } else {
            message.error('操作失败');
          }
          self.handlePageChange();
        });
      },
    });
  };
  render() {
    const { match, query, list, enableExport } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            enableExport={enableExport}
            onExport={this.handleExport}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={record => `${record.id}`}
            bordered
          />
        </div>
        {/*修改定位点名称*/}
        {this.state.locaModVisible && (
          <ModalForm
            title="修改定位点名称"
            onOk={this.onOk}
            onCancel={this.onCancel}
            onSubmit={this.locaManageSubmit}
            record={this.state.locaManageInfo}
            configList={[
              {
                label: '原名称',
                type: 'label',
                key: 'locationName',
              },
              {
                label: '新名称',
                type: 'input',
                key: 'locationName',
                required: true,
                rules: [
                  {
                    required: true,
                    message: '请填写新名称！',
                  },
                ],
              },
            ]}
          />
        )}
      </ViewWrapper>
    );
  }
}
