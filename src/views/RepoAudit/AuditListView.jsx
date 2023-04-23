import React, { Component, Fragment } from 'react';
import { Modal, Tooltip, Icon, Divider, Table, Switch } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import ewAuditTableColumn from 'components/EwAuditTableColumn';
import moment from 'moment';

export default class AuditListView extends Component {
  state = {
    showModal: false,
  };

  hisTableColumn = [
    {
      title: '操作时间',
      dataIndex: 'opTime',
      align: 'center',
      width: 200,
      render: text => {
        return text && text.time && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作人',
      dataIndex: 'opUserName',
      align: 'center',
      width: 150,
    },
    {
      title: '操作内容',
      dataIndex: 'opContent',
      render: text => {
        return (
          <Tooltip title={text}>
            <span style={{ width: '350px', textOverflow: 'ellipsis', display: 'inline-block' }}>{text}</span>
          </Tooltip>
        );
      },
    },
  ];
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  changeStatus = (checked, e) => {
    console.log(checked, e);
  };

  showHisModal = record => e => {
    if (!record) return;
    this.setState({
      showModal: true,
    });
    this.props.fetchRepoHis({
      id: record.id,
    });
  };

  searchDetail = record => e => {
    if (!record || !record.id) return;
    this.props.history.push(`${this.props.match.path}/detail/${record.id}`);
  };

  renderColumn = () => {
    const { match, loading } = this.props;
    const columns = ewAuditTableColumn(match.url);
    if (match.url === '/repoAuditLast/all') {
      columns.push({
        title: '使用状态',
        align: 'center',
        fixed: 'right',
        width: 80,
        render: (text, record) => {
          if (record.status === 4) {
            return (
              <Fragment>
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="停用"
                  checked={record.additionStatus === 1}
                  onClick={this.changeStatus}
                  loading={loading}
                />
              </Fragment>
            );
          } else {
            return '--';
          }
        },
      });
    }
    columns.push({
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 80,
      render: (text, record) => (
        <Fragment>
          <Tooltip title="查看">
            <a href="javascript:;" onClick={this.searchDetail(record)}>
              <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
            </a>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="操作记录">
            <a href="javascript:;" className={'operButton'} onClick={this.showHisModal(record)}>
              <Icon type="solution" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
            </a>
          </Tooltip>
        </Fragment>
      ),
    });

    return columns;
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  render() {
    const { match, query } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            wrappedComponentRef={form => (this.form = form)}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={'id'}
          />
        </div>
        <Modal
          title="操作记录"
          visible={this.state.showModal}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          width={800}
        >
          <Table
            dataSource={this.props.hisList}
            columns={this.hisTableColumn}
            loading={this.props.loading}
            // scroll={{ y: 240 }}
            rowKey={'id'}
            pagination={false}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}
