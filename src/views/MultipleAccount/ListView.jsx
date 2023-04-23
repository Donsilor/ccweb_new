import React, { Component, Fragment } from 'react';
import CCForm from 'components/CCForm';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import { httpFormClient } from 'common/axios';
import { message, Button, Divider, Tooltip, Icon, Modal } from 'antd';
import OperationArea from 'components/OperationArea';
import AccountModalForm from './AccountModalForm';
import ResetPDModalForm from './ResetPDModalForm';
import EnterpriseModal from './EnterpriseModal';

export default class MultipleAccountView extends Component {
  state = {
    loading: true,
    list: [],
    paging: { current: 1, pageSize: 10, total: 10 },
    value: {},
    showAccountModal: false,
    showResetPDModal: false,
    showEnterpriseModal: false,
    record: {},
  };

  componentDidMount() {
    this.handleSearch(this.state.value);
  }

  handleCancel = () => {
    this.setState({
      showAccountModal: false,
      showResetPDModal: false,
      showEnterpriseModal: false,
    });
  };

  handleOk = () => {
    this.handleCancel();
    this.handleSearch(this.state.value);
  };

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.state.value, page, pageSize);
  };

  handleSearch = (formValues, page, pageSize) => {
    this.setState({
      loading: true,
    });
    return httpFormClient
      .formSubmit('/UserAction_searchDualUserVOByPage', 'user', this.state.value, {
        pageNum: page || this.state.paging.current,
        pageSize: pageSize || this.state.paging.pageSize,
      })
      .then(({ data = {} }) => {
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (error) {
            return Promise.reject(error.message);
          }
        }
        if (data.result === 0) {
          this.setState({
            list: data.list || [],
            paging: {
              current: data.page && data.page.pageNum,
              pageSize: data.page && data.page.pageSize,
              total: data.page && data.page.total,
            },
            loading: false,
          });
        } else {
          return Promise.reject(data.msg || '获取数据失败');
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          loading: false,
          list: [],
          paging: { current: 1, pageSize: 10, total: 10 },
        });
      });
  };

  removeAccount = record => () => {
    if (record && record.id) {
      const self = this;
      Modal.confirm({
        title: '确定要删除该账号？',
        onOk() {
          self.setState({
            loading: true,
          });
          return httpFormClient
            .formSubmit('/UserAction_deleteMoreUserByIds', '', { ids: record.id })
            .then(({ data = {} }) => {
              if (data.flag === 1) {
                self.setState({
                  loading: false,
                });
                self.handleSearch(self.state.value);
              } else {
                return Promise.reject(data.msg || '删除账号失败');
              }
            })
            .catch(err => {
              message.error(err.message || err);
              self.setState({
                loading: false,
              });
            });
        },
      });
    }
  };

  updateQuery = query => {
    const { value = {} } = query;
    this.setState({
      value,
    });
  };

  showAccountModal = record => e => {
    this.setState({
      showAccountModal: true,
      record,
    });
  };

  showEnterpriseModal = record => e => {
    this.setState({
      showEnterpriseModal: true,
      record,
    });
  };

  showResetPDModal = record => e => {
    this.setState({
      showResetPDModal: true,
      record,
    });
  };

  renderColumns = () => {
    const columnList = [...columns];
    columnList.push({
      title: '操作',
      width: 120,
      fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a href="javascript:;" className={'operButton'} onClick={this.showAccountModal(record)}>
            <Tooltip title="修改基本信息">
              <Icon type="edit" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
            </Tooltip>
          </a>
          <Divider type="vertical" />
          <a href="javascript:;" className={'operButton'} onClick={this.showEnterpriseModal(record)}>
            <Tooltip title="绑定企业">
              <Icon type="control" />
            </Tooltip>
          </a>
          <Divider type="vertical" />
          <a href="javascript:;" className={'operButton'} onClick={this.showResetPDModal(record)}>
            <Tooltip title="密码重置">
              <Icon type="undo" style={{ color: 'red' }} />
            </Tooltip>
          </a>
          <Divider type="vertical" />
          <a href="javascript:;" className={'operButton'} onClick={this.removeAccount(record)}>
            <Tooltip title="删除账号">
              <Icon type="delete" style={{ color: 'red' }} />
            </Tooltip>
          </a>
        </Fragment>
      ),
    });
    return columnList;
  };

  render() {
    const { match } = this.props;
    const { loading, list, paging, value, record } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            onUpdateQuery={this.updateQuery}
            query={{ value, expandForm: false }}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumns()}
            loading={loading}
            data={list}
            paging={paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey="id"
          />
        </div>
        {this.state.showAccountModal && (
          <AccountModalForm onOk={this.handleOk} onCancel={this.handleCancel} record={record} />
        )}
        {this.state.showResetPDModal && record && (
          <ResetPDModalForm onOk={this.handleOk} onCancel={this.handleCancel} record={record} />
        )}
        {this.state.showEnterpriseModal && record && (
          <EnterpriseModal onOk={this.handleOk} onCancel={this.handleCancel} record={record} />
        )}
        <OperationArea>
          <Button
            icon="plus"
            type="primary"
            onClick={() => {
              this.setState({ showAccountModal: true, record: {} });
            }}
          >
            新增
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}

const columns = [
  {
    title: '账号名称',
    dataIndex: 'employeename',
  },
  {
    title: '登录账号',
    dataIndex: 'accid',
  },
  {
    title: '企业类型',
    dataIndex: 'departtypeName',
  },
  {
    title: '企业名称',
    dataIndex: 'departname',
  },
  {
    title: '状态',
    dataIndex: 'statusName',
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
];
