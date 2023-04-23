import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { clientInfoFetch, insertClient, updateClientQuery } from '../../redux/modules/clientManagement';
import { Button, Icon, message, Modal, Tooltip } from 'antd';
import { FormArea, ViewWrapper } from '../../layouts/ViewWrapper';
import CCForm from '../../components/CCForm';
import styles from './style.module.less';
import EwAuditTable from '../../components/EwAuditTable';
import OperationArea from '../../components/OperationArea';
import CameraInfoForm from './CameraInfoForm';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';

class ClientManagement extends Component {
  state = {
    showAddModal: false,
    newModel: null,
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  getColumn() {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.url);

    columns.map(col => {
      if (col.dataIndex === 'action') {
        col.render = (text, record) => {
          return (
            <Fragment>
              <Tooltip title="查看">
                <a href="javascript:;" onClick={this.goDetail(record)}>
                  <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }}/>
                </a>
              </Tooltip>
            </Fragment>
          );
        };
      }
    });

    return columns;
  }

  goDetail = record => () => {
    console.log(record);
  };

  addClient = () => {
    this.setState({
      showAddModal: true,
      newModel: {
        type: '0',
        code: '',
        name: '',
        brand: '',
        modelNumber: '',
        serialNumber: '',
      },
    });
  };

  addClientOk = () => {
    this.clientForm && this.clientForm.submit();
  };

  addClientCancel = () => {
    this.setState({
      showAddModal: false,
    });
  };

  confirmClientInfo = value => {
    console.log(value);
    if (!value) return;
    this.props
      .insert(value)
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success('增加成功！', 2.5);
          // 取消模态框，刷新页面
          this.addClientCancel();
          this.handleSearch(this.props.query.value);
        } else {
          return Promise.reject(new Error(payload.data.msg));
        }
      })
      .catch(err => {
        return message.error(err.message || '增加终端失败，请重试！', 2.5);
      });
  };

  render() {
    const { match, query, rowKey } = this.props;
    return (
      <ViewWrapper>
        <OperationArea>
          <Button type="primary" icon="plus" className="customBtn" onClick={this.addClient}>
            新增终端
          </Button>
        </OperationArea>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            wrappedComponentRef={form => (this.form = form)}
          />
        </FormArea>
        <div className={styles.wrapper}>
          <EwAuditTable
            columns={this.getColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={rowKey}
          />
        </div>
        <Modal
          title="新增终端"
          visible={this.state.showAddModal}
          onOk={this.addClientOk}
          onCancel={this.addClientCancel}
          destroyOnClose
        >
          <CameraInfoForm
            wrappedComponentRef={form => (this.clientForm = form)}
            onSubmit={this.confirmClientInfo}
            record={this.state.newModel}
            path={match.url}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.clientManagement.list,
    query: state.clientManagement.clientQuery,
    paging: state.clientManagement.paging,
    loading: state.clientManagement.loading,
    rowKey: record => `${record.id},${record.code}`,
  };
}

const mapDispatchToProps = {
  fetch: (data, paging) => clientInfoFetch(data, paging),
  updateQuery: data => updateClientQuery(data),
  insert: data => insertClient(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientManagement);
