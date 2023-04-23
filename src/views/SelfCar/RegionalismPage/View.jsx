import React, { Component, Fragment } from 'react';
import { Modal, message, Tooltip, Icon, Button } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import ModalForm from 'components/ModalForm';
const { confirm } = Modal;
export default class TaskSummary extends Component {
  state = {
    addRegVisible: false,
    tit: '',
    id: 0,
    record: {},
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { name: formValues && formValues.regionName };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
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
          <a
            href="#"
            key="modify"
            onClick={() => {
              this.setState({ addRegVisible: true, tit: '修改大区', id: record.id, record: record });
            }}
          >
            <Tooltip title="修改">
              <Icon type="edit" />
            </Tooltip>
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="#" key="delete" onClick={this.delReg(record)}>
            <Tooltip title="删除">
              <Icon type="delete" style={{ color: 'red' }} />
            </Tooltip>
          </a>
        </Fragment>
      ),
    });
    return this.props.columns.concat(columns);
  };
  delReg = record => () => {
    let self = this;
    confirm({
      title: '请再次确认是否删除大区？',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfDistributorArea/delete/area`, { id: record.id })
          .then(respone => {
            message.success('操作成功');
            self.handlePageChange();
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  onCancel = () => {
    this.setState({
      addRegVisible: false,
    });
  };
  addRegSubmit = formData => {
    let url = '';
    let data = {
      name: formData.name,
      remark: formData.remark,
    };
    if (this.state.tit == '新增大区') {
      url = `/self-car/v1.0/selfDistributorArea/add/area`;
    } else {
      url = `/self-car/v1.0/selfDistributorArea/update/area`;
      data.id = this.state.id;
    }
    httpCommonClient
      .post(url, data)
      .then(res => {
        if (res.data.code === 200) {
          message.success('操作成功');
          this.setState({
            addRegVisible: false,
          });
          this.handlePageChange();
        } else {
          message.error(res.data.message);
          this.setState({
            addRegVisible: false,
          });
        }
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  render() {
    const { match, query, list } = this.props;
    const { record } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.setState({ addRegVisible: true, tit: '新增大区', record: {} })}
          >
            新增大区
          </Button>
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
          />
        </div>
        {this.state.addRegVisible && (
          <ModalForm
            title={this.state.tit}
            //onOk={this.updOrderExpSubmitOk}
            onCancel={this.onCancel}
            onSubmit={this.addRegSubmit}
            configList={[
              {
                label: '区域名称',
                type: 'input',
                key: 'name',
                required: true,
                initialValue: record.name,
                rules: [
                  {
                    required: true,
                    message: '请填写区域名称！',
                  },
                ],
              },
              {
                label: '区域备注',
                type: 'input',
                key: 'remark',
                required: true,
                initialValue: record.remark,
                rules: [
                  {
                    required: true,
                    message: '请填写区域备注！',
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
