import React, { Component } from 'react';
import { Modal, Spin, message, Card, Popconfirm, Collapse, Row, Col, Form, Input, Button, Icon, Empty } from 'antd';
import { httpFormClient } from 'common/axios';
import * as FormItems from 'components/CCForm/formItem';
import EwAuditTable from 'components/EwAuditTable';
import SimForm from 'components/SimForm';

const Panel = Collapse.Panel;
export default class EnterpriseModal extends Component {
  state = {
    loading: false,
    newAccountLoading: false,
    confirmLoading: false,
    list: [],
    showNewPanel: false,
    query: {},
    paging: { current: 1, pageSize: 10, total: 10 },
    newAccountList: [],
  };
  componentDidMount() {
    this.handleSearch();
  }

  onPanelChange = key => {
    if (Array.isArray(key) && key.includes('new') && !this.state.showNewPanel) {
      this.setState({
        showNewPanel: true,
      });
      this.handleNewSearch(this.state.query);
    }
  };

  handlePageChange = (page, pageSize) => {
    this.handleNewSearch(this.state.query, page, pageSize);
  };

  handleNewSearch = (formValue, page, pageSize) => {
    this.setState({
      newAccountLoading: true,
    });
    return httpFormClient
      .formSubmit(
        '/UserAction_searchHiddenUserVOByPage',
        'user',
        { ...formValue },
        {
          pageNum: page || this.state.paging.current,
          pageSize: pageSize || this.state.paging.pageSize,
        }
      )
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
            newAccountList: data.list || [],
            paging: {
              current: data.page && data.page.pageNum,
              pageSize: data.page && data.page.pageSize,
              total: data.page && data.page.total,
            },
            newAccountLoading: false,
          });
        } else {
          return Promise.reject(data.msg || '获取数据失败');
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          newAccountLoading: false,
          newAccountList: [],
          paging: { current: 1, pageSize: 10, total: 10 },
        });
      });
  };

  handleSearch = () => {
    const { id: mainuserid } = this.props.record;
    if (!mainuserid) {
      message.error('数据获取失败');
      return;
    }
    this.setState({
      loading: true,
    });
    return httpFormClient
      .formSubmit('/UserAction_getBindingList', '', { mainuserid })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          this.setState({
            list: data.list || [],
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
        });
      });
  };

  addAccount = record => e => {
    const { list } = this.state;
    if (!list.map(item => item.id).includes(record.id)) {
      list.push(record);
      this.setState({ list });
    }
  };

  renderColumns = () => {
    const { list = [] } = this.state;
    const columnList = [...columns];
    columnList.push({
      title: '操作',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        const idList = list.map(item => item.id);
        if (record.isBindingDualAccount === '1') {
          return (
            <Button icon="stop" type="danger" disabled>
              已绑定
            </Button>
          );
        } else if (!idList.includes(record.id)) {
          return (
            <Button icon="plus" onClick={this.addAccount(record)}>
              添加
            </Button>
          );
        } else {
          return (
            <Button icon="check" type="primary" disabled>
              已添加
            </Button>
          );
        }
      },
    });
    return columnList;
  };

  removeItem = index => e => {
    const { list } = this.state;
    if (index >= 0 && index < list.length) {
      list.splice(index, 1);
      this.setState({
        list,
      });
    }
  };
  handleOk = () => {
    const { list } = this.state;
    const { id: mainuserid } = this.props.record;
    if (!mainuserid) {
      message.error('数据异常，请重试');
      return;
    }
    this.setState({
      confirmLoading: true,
    });
    return httpFormClient
      .formSubmit('/UserAction_bindingUser', '', { mainuserid, subuserids: list.map(item => item.id).join() })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          this.setState({
            confirmLoading: false,
          });
          message.success(data.msg || '关联企业账号成功！');
          this.props.onOk();
        } else {
          return Promise.reject(data.msg || '关联数据失败');
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          confirmLoading: false,
        });
      });
  };
  render() {
    const { loading, confirmLoading, list, newAccountList, newAccountLoading, query, paging } = this.state;
    return (
      <Modal
        title="企业绑定"
        width={1100}
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
        visible
        confirmLoading={confirmLoading}
        destroyOnClose
      >
        <Spin spinning={loading}>
          <Collapse defaultActiveKey={['done']} onChange={this.onPanelChange}>
            <Panel header="已绑定" key="done">
              <div style={{ minHeight: '143px' }}>
                {list.length > 0 ? (
                  <Row gutter={16}>
                    {list.map((item, index) => (
                      <Col span={8} key={index}>
                        <Card
                          size="small"
                          title={item.departname}
                          extra={
                            <Popconfirm
                              title={`确定要删除该${item.departtypeName}？`}
                              onConfirm={this.removeItem(index)}
                              okText="确定"
                              cancelText="取消"
                            >
                              <Icon type="close" />
                            </Popconfirm>
                          }
                          style={{ width: 300, marginBottom: '10px' }}
                        >
                          <p>{`账号名称：${item.employeename}`}</p>
                          <p>{`企业类型：${item.departtypeName}`}</p>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty />
                )}
              </div>
            </Panel>
            <Panel header="新增绑定" key="new">
              <Spin spinning={newAccountLoading}>
                <SimForm
                  formItemList={[enterpriseNameFormItem, accountNameFormItem, FormItems.enterpriseTypeFormItem]}
                  query={query}
                  onUpdateQuery={query => {
                    this.setState({
                      query,
                    });
                  }}
                  onSearch={this.handleNewSearch}
                />
                <EwAuditTable
                  columns={this.renderColumns()}
                  loading={newAccountLoading}
                  data={newAccountList}
                  paging={paging}
                  onChange={this.handlePageChange}
                  onPageChange={this.handlePageChange}
                  rowKey="id"
                  scroll={{ x: 'max-content' }}
                  size="small"
                />
              </Spin>
            </Panel>
          </Collapse>
        </Spin>
      </Modal>
    );
  }
}

const enterpriseNameFormItem = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'departname'}>
      <Form.Item label="企业名称">{getFieldDecorator('departname')(<Input placeholder="请输入企业名称" />)}</Form.Item>
    </Col>
  );
};

const accountNameFormItem = getFieldDecorator => {
  return (
    <Col md={8} sm={24} key={'employeename'}>
      <Form.Item label="账号名称">
        {getFieldDecorator('employeename')(<Input placeholder="请输入账号名称" />)}
      </Form.Item>
    </Col>
  );
};

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
];
