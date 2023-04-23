import React, { Component, Fragment } from 'react';
import { Modal, Tooltip, Icon, Divider, message, Table, Button } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import styles from './style.module.less';
import ewAuditTableColumn from 'components/EwAuditTableColumn';
import AccountInfoForm from './AccountInfoForm';
import AmountModal from './AmountModal';
import { translate } from 'common/utils';
import EBDic from 'common/constant';
import { httpFormClient } from 'common/axios';
import { columnsCSin, columnsZJin, columnsOut, columnsIn } from './columns';
import moment from 'moment';
import _ from 'lodash';
const confirm = Modal.confirm;
const TIME_FORMAT = 'YYYY-MM-DD';
export default class ConfirmReceipt extends Component {
  state = {
    showModal: false,
    showAccountModal: false,
    showAmountModal: false,
    showDetails: false,
    modalLoading: false,
    selectedRowKeys: [],
    record: null,
    dataSource: [],
  };

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

  handleCancel = () => {
    this.setState({
      showModal: false,
      showAccountModal: false,
      showAmountModal: false,
      showDetails: false,
      modalLoading: false,
    });
  };

  handleSelectRow = selectedRowKeys => {
    this.setState({ selectedRowKeys });
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
          this.handleSearch(this.props.query.value);
        } else {
          return Promise.reject(new Error(payload.data.msg));
        }
      })
      .catch(err => {
        return message.error(err.message || '账号信息更新失败，请重试！', 2.5);
      });
  };
  confirmAmount = value => {
    const { record } = this.state;
    if (!record || !value) return;
    this.setState({
      modalLoading: true,
    });
    if (record.exportType == 5) {
      const data = {
        exportDataId: record.id,
        outJsonList: value.outJsonList,
        inJsonList: value.inJsonList,
      };
      httpFormClient.formSubmit('/BondPrintAction_transferOutDeposit', '', data).then(({ data = {} }) => {
        if (data.result === 0) {
          message.success(data.msg);
          this.handleCancel();
          this.handleSearch(this.props.query.value);
        } else {
          this.setState({
            modalLoading: false,
          });
          message.error(data.msg);
        }
      });
    } else {
      const data = {
        exportDataId: record.id,
        oddType: record.exportType < 3 ? 1 : 2,
        oddNum: value.oddNum,
        interestStartDate: value.interestStartDate.format(TIME_FORMAT),
      };
      httpFormClient.formSubmit('/BondPrintAction_transferInDeposit', '', data).then(({ data = {} }) => {
        if (data.result === 0) {
          message.success(data.msg);
          this.handleCancel();
          this.handleSearch(this.props.query.value);
        } else {
          this.setState({
            modalLoading: false,
          });
          message.error(data.msg);
        }
      });
    }
  };

  handleAccountModalOk = e => {
    this.accountForm && this.accountForm.handleSubmit();
  };
  handleAmountModalOk = e => {
    this.amountForm && this.amountForm.handleSubmit();
  };
  showConfirmReceipt = record => {
    if (!record) {
      return;
    }
    const self = this;
    confirm({
      title: '确认回执，您要继续吗？',
      onOk() {
        self.props
          .confirmReceipt({
            id: record.id,
          })
          .then(({ payload }) => {
            if (payload && payload.data && payload.data.result === 0) {
              message.success('确认回执成功！', 2.5);
              self.handleSearch(self.props.query.value);
            } else {
              return Promise.reject(new Error(payload.data.msg));
            }
          })
          .catch(err => {
            return message.error(err.message || '确认回执失败，请重试！', 2.5);
          });
      },
    });
  };

  showAccountModal = record => e => {
    if (!record) return;
    this.setState({
      record,
      showAccountModal: true,
    });
  };

  handleMultipleRow = selectedRowKeys => {
    const hide = message.loading('批量确认回执中，请稍后', 0);
    this.props
      .confirmMultipleReceipt({
        ids: selectedRowKeys.join(),
      })
      .then(({ payload } = {}) => {
        hide();
        if (payload && payload.data && payload.data.result === 0) {
          message.success('批量确认成功', 2.5);
          this.handleSearch(this.props.query.value);
        } else {
          return Promise.reject(payload.data.msg);
        }
      })
      .catch(err => {
        hide();
        message.error(err || '批量确认回执失败，请重试', 2.5);
      });
  };

  searchEwDetail = record => e => {
    if (!record) return;
    const { bankId, brandId, distributorId, exportHisId, confirmStatus } = record;
    if (bankId && brandId && distributorId && exportHisId) {
      this.props.updateEwDetailQuery({
        bankId,
        brandId,
        distributorId,
        exportHisId,
        confirmStatus,
      });
      const { match } = this.props;
      this.props.history.push(`${match.path}/ewDetail`);
    }
  };

  renderColumn = () => {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.url);
    columns.push({
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: '90px',
      render: (text, record) => (
        <Fragment>
          <Tooltip title="查看">
            <a href="javascript:;" onClick={this.searchEwDetail(record)}>
              <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
            </a>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="账户设置">
            <a href="javascript:;" className={styles.operButton} onClick={this.showAccountModal(record)}>
              <Icon type="user-add" style={{ color: '#40a9ff' }} />
            </a>
          </Tooltip>
          {record.confirmStatus === 0 && <Divider type="vertical" />}
          {record.confirmStatus === 0 && (
            <Tooltip title="确认回执">
              <a
                href="javascript:;"
                className={styles.operButton}
                onClick={() => {
                  if (record.bankId == '0000101') {
                    httpFormClient
                      .formSubmit('/BondPrintAction_confirmReceiptCheck', '', { exportDataId: record.id })
                      .then(({ data = {} }) => {
                        if (data.result === 0) {
                          this.setState({ record, showAmountModal: true });
                        } else {
                          message.error(data.msg);
                        }
                      });
                  } else {
                    this.showConfirmReceipt(record);
                  }
                }}
              >
                <Icon type="check-circle" />
              </a>
            </Tooltip>
          )}
          {record.confirmStatus !== 0 && record.bankId == '0000101' && <Divider type="vertical" />}
          {record.confirmStatus !== 0 && record.bankId == '0000101' && (
            <Tooltip title="确认详情">
              <a
                href="javascript:;"
                className={styles.operButton}
                onClick={() => {
                  httpFormClient
                    .formSubmit('/BondPrintAction_getDepositFlow', '', { exportDataId: record.id, brandId: record.brandId })
                    .then(({ data = {} }) => {
                      if (data.result === 0) {
                        this.setState({ record, dataSource: data.list, showDetails: true });
                      } else {
                        message.error(data.msg);
                      }
                    });
                }}
              >
                <Icon type="file-search" />
              </a>
            </Tooltip>
          )}
        </Fragment>
      ),
    });
    return columns;
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  render() {
    const { match, query, showTableOperArea } = this.props;
    const { record, showAmountModal, dataSource } = this.state;
    const dataSourceOut = dataSource.filter(item => item.adjustType == 5);
    const dataSourceIn = dataSource.filter(item => item.adjustType != 5);
    return (
      <div className={styles.printManagement}>
        <div className={styles.formArea}>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            wrappedComponentRef={form => (this.form = form)}
          />
        </div>
        <div className={styles.wrapper}>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            showTableOperArea={showTableOperArea}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            onSelectRow={this.handleSelectRow}
            onOperMultipleRow={this.handleMultipleRow}
            operName={'批量确认回执'}
            rowKey={this.props.rowKey}
          />
        </div>
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
            pointsAccountRequired
          />
        </Modal>
        {showAmountModal && (
          <Modal
            title={record.exportType == 5 ? '维护单号' : translate(record.exportType, EBDic.exportTypeDicList)}
            width={record.exportType == 5 ? 800 : 500}
            visible={this.state.showAmountModal}
            onOk={this.handleAmountModalOk}
            onCancel={this.handleCancel}
            destroyOnClose
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                取消
              </Button>,
              <Button key="submit" loading={this.state.modalLoading} type="primary" onClick={this.handleAmountModalOk}>
                确认回执
              </Button>,
            ]}
          >
            <AmountModal
              wrappedComponentRef={form => (this.amountForm = form)}
              record={record}
              onSubmit={this.confirmAmount}
            />
          </Modal>
        )}
        <Modal title="确认详情" visible={this.state.showDetails} onCancel={this.handleCancel} footer={null}>
          {record && record.exportType == 5 && (
            <div>
              <Table dataSource={dataSourceOut} columns={columnsOut} pagination={false} />
              {!_.isEmpty(dataSourceIn) && <Table dataSource={dataSourceIn} columns={columnsIn} pagination={false} />}
            </div>
          )}
          {record && record.exportType != 5 && (
            <Table
              dataSource={dataSourceIn}
              columns={[3, 4].includes(record.exportType) ? columnsZJin : columnsCSin}
              pagination={false}
            />
          )}
        </Modal>
      </div>
    );
  }
}
