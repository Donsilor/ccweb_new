import React, { Component, Fragment } from 'react';
import { Modal, Button, Tooltip, Input, Icon, message, Divider } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import saveAs from 'file-saver';
import ewAuditTableColumn, { ewInfoModalColumn } from 'components/EwAuditTableColumn';
import OperationArea from 'components/OperationArea';
import BrandSearchButton from './BrandSearchButton';
import AccountInfoForm from '../ConfirmReceipt/AccountInfoForm';
import { ViewWrapper } from 'layouts/ViewWrapper';

import last from 'lodash/last';

const confirm = Modal.confirm;

export default class PrintManagement extends Component {
  state = {
    showModal: false,
    exportLoading: false,
    showAccountModal: false,
    record: null,
  };
  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };

  handleModalPageChange = (page, pageSize) => {
    this.handleSearchEwList(page, pageSize);
  };

  onSearch = () => {
    this.handleSearch();
  };

  handleSearch = (page, pageSize) => {
    const { brandName, distributorName } = this.props.query;
    this.props.fetch(
      {
        brandName: brandName || undefined,
        distributorName: distributorName || undefined,
      },
      {
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      }
    );
  };

  handleSearchEwList = (page, pageSize) => {
    if (!this.state.record) return;
    const { bankId, brandId, distributorId } = this.state.record;
    return this.props.fetchEwDetail(
      {
        bankId,
        fldSerialid: brandId,
        distributorId,
      },
      {
        pageNum: page || this.props.modalPaging.current,
        pageSize: pageSize || this.props.modalPaging.pageSize,
      }
    );
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
      showAccountModal: false,
      modalLoading: false,
    });
  };

  handleAccountModalOk = e => {
    this.accountForm && this.accountForm.handleSubmit();
  };

  confirmAccount = value => {
    const { record } = this.state;
    if (!record || !value) return;
    this.setState({
      modalLoading: true,
    });
    const data = {
      bankId: record.bankId,
      fldSerailid: record.brandId,
      distributorId: record.distributorId,
      bondAccount: value.bondAccount,
      pointsAccount: value.pointsAccount,
      settlementAccount: value.settlementAccount,
      remittanceAccount: value.remittanceAccount,
    };
    this.props
      .accountUpdate(data)
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success('账号信息更新成功！', 2.5);
          this.handleCancel();
          this.props.fetchTabCount({
            brandName: this.props.query.brandName || undefined,
            distributorName: this.props.query.distributorName || undefined,
          });
          this.handleSearch();
        } else {
          return Promise.reject(new Error(payload.data.msg));
        }
      })
      .catch(err => {
        return message.error(err.message || '账号信息更新失败，请重试！', 2.5);
      });
  };

  onQuerySearch = value => {
    this.props.history.push('/printManagement');
  };

  searchEwDetail = record => e => {
    this.setState(
      {
        record: record,
      },
      () => {
        this.handleSearchEwList().then(() => {
          this.setState({
            showModal: true,
          });
        });
      }
    );
  };

  showAccountModal = record => e => {
    if (!record) return;
    this.setState({
      record,
      showAccountModal: true,
    });
  };

  handleExport = () => {
    const { brandName, distributorName } = this.props.query;
    const self = this;
    confirm({
      title: '确定要导出这些数据吗?',
      onOk() {
        const hide = message.loading('导出中，请稍后', 0);
        self.setState({
          exportLoading: true,
        });
        self.props
          .export({
            brandName: brandName || undefined,
            distributorName: distributorName || undefined,
          })
          .then(({ payload }) => {
            if (payload && payload.data && payload.data.result === 0) {
              message.success('导出成功', 2.5);
              let filePath = payload.data.filePath;
              const index = filePath.indexOf('.com/') + 4;
              if (!filePath.includes(window.location.origin)) {
                filePath = `${window.location.origin}${filePath.slice(index)}`;
              }
              saveAs(filePath, last(payload.data.filePath.split('/')));
            } else {
              throw new Error(payload.data.msg);
            }
          })
          .catch(err => {
            return message.error(err.message || '导出失败，请重试', 2.5);
          })
          .then(() => {
            hide();
            self.setState({
              exportLoading: false,
            });
          });
      },
    });
  };

  exportRow = record => e => {
    if (!record) return;
    const hide = message.loading('导出中，请稍后', 0);
    this.setState({
      exportLoading: true,
    });
    const {
      bankId,
      brandId,
      distributorId,
      distributorName,
      depositTotal,
      settlementAccount,
      bondAccount,
      pointsAccount,
    } = record;
    this.props
      .export({
        bankId,
        brandId,
        distributorId,
        distributorName,
        depositTotal,
        settlementAccount,
        bondAccount,
        pointsAccount,
      })
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success('导出成功', 2.5);
          let filePath = payload.data.filePath;
          const index = filePath.indexOf('.com/') + 4;
          if (!filePath.includes(window.location.origin)) {
            filePath = `${window.location.origin}${filePath.slice(index)}`;
          }
          saveAs(filePath, last(payload.data.filePath.split('/')));
        } else {
          throw new Error(payload.data.msg);
        }
      })
      .catch(err => {
        return message.error(err.message || '导出失败，请重试', 2.5);
      })
      .then(() => {
        hide();
        this.setState({
          exportLoading: false,
        });
      });
  };

  renderColumn = () => {
    const { match, transferOut, transferOutHis } = this.props;
    const columns = ewAuditTableColumn(match.url);
    if (!transferOut && !transferOutHis) {
      columns.push({
        title: '操作',
        align: 'center',
        fixed: 'right',
        width: 60,
        render: (text, record) => (
          <Fragment>
            <Tooltip title="查看">
              <a href="javascript:;" onClick={this.searchEwDetail(record)}>
                <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
              </a>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="账户设置">
              <a href="javascript:;" className={'operButton'} onClick={this.showAccountModal(record)}>
                <Icon type="user-add" style={{ color: '#40a9ff' }} />
              </a>
            </Tooltip>
          </Fragment>
        ),
      });
    } else if (transferOutHis) {
      columns.push({
        title: '导出',
        align: 'center',
        fixed: 'right',
        width: 60,
        render: (text, record) => (
          <Fragment>
            <Tooltip title="导出">
              <a href={record && record.filePath} target="_blank" download>
                <Icon type="export" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
              </a>
            </Tooltip>
          </Fragment>
        ),
      });
    } else {
      columns.push({
        title: '操作',
        align: 'center',
        fixed: 'right',
        width: 60,
        render: (text, record) => (
          <Fragment>
            <Tooltip title="查看">
              <a href="javascript:;" onClick={this.searchEwDetail(record)}>
                <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
              </a>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="账户设置">
              <a href="javascript:;" className={'operButton'} onClick={this.showAccountModal(record)}>
                <Icon type="user-add" style={{ color: '#40a9ff' }} />
              </a>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="导出">
              <a href="javascript:;" onClick={this.exportRow(record)}>
                <Icon type="export" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
              </a>
            </Tooltip>
          </Fragment>
        ),
      });
    }
    return columns;
  };

  componentDidMount() {
    this.props.fetchTabCount({
      brandName: this.props.query.brandName || undefined,
      distributorName: this.props.query.distributorName || undefined,
    });
    this.handleSearch();
  }

  render() {
    return (
      <ViewWrapper>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={this.props.rowKey}
          />
        </div>
        <OperationArea>
          <BrandSearchButton onSearch={this.onQuerySearch} />
          <Button icon="sync" className="customBtn" onClick={this.onSearch}>
            刷新
          </Button>
          <Button
            type="danger"
            className="customBtn"
            icon="export"
            onClick={this.handleExport}
            loading={this.state.exportLoading}
            disabled={this.props.list.length === 0 || this.props.transferOut || this.props.transferOutHis}
            style={{ width: '96px' }}
          >
            {this.state.exportLoading ? '导出中' : '导出'}
          </Button>
        </OperationArea>
        <Modal title="二网信息" visible={this.state.showModal} footer={null} onCancel={this.handleCancel} width={1100}>
          <EwAuditTable
            columns={ewInfoModalColumn}
            loading={this.props.loading}
            data={this.props.modalList}
            paging={this.props.modalPaging}
            onChange={this.handleModalPageChange}
            onPageChange={this.handleModalPageChange}
            rowKey={`id`}
          />
        </Modal>
        <Modal
          title="经销商保证金账号"
          visible={this.state.showAccountModal}
          onOk={this.handleAccountModalOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.modalLoading}
          destroyOnClose
        >
          <AccountInfoForm
            wrappedComponentRef={form => (this.accountForm = form)}
            onSubmit={this.confirmAccount}
            record={this.state.record}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}
