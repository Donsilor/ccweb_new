import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Tooltip, Icon, Table, message } from 'antd';
import styles from './style.module.less';
import { ewInfoConfirmColumn } from 'components/EwAuditTableColumn';
import { ewDetailFetch as fetch, confirmException } from 'redux/modules/confirmReceipt';
import OperationArea from 'components/OperationArea';
import ExcepModalForm from '../EwAuditList/ExcepModalForm';

export class EwDetail extends Component {
  state = {
    showModal: false,
    modalLoading: false,
    record: null,
    excepList: [],
  };

  handleSearch = (page, pageSize) => {
    this.props.fetch(this.props.query);
  };

  handleExcepModalOk = e => {
    this.excepForm && this.excepForm.handleSubmit();
    this.excepForm && this.excepForm.reset();
  };

  confirmExcep = value => {
    const { record } = this.state;
    this.setState({
      modalLoading: true,
    });
    record &&
      this.props
        .confirmException({
          'ebQuery.id': record.ewBankId,
          'ebQuery.exceptionRemark': value.exceptionRemark,
          'beddQuery.id': record.id,
        })
        .then(({ payload }) => {
          if (payload && payload.data && payload.data.result === 0) {
            message.success('标记异常成功！');
            const { excepList } = this.state;
            if (!excepList.includes(record.ewBankId)) {
              this.setState({
                excepList: [...excepList, record.ewBankId],
              });
            }
          } else {
            return Promise.reject(new Error(payload));
          }
        })
        .catch(err => {
          return message.error('标记异常失败，请重试！');
        })
        .then(() => {
          this.setState({
            modalLoading: false,
            showModal: false,
          });
        });
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
    });
    this.excepForm && this.excepForm.reset();
  };

  handleException = record => e => {
    if (!record) return;
    this.setState({
      record,
      showModal: true,
    });
  };

  goBack = () => {
    this.props.history.push(`/confirmReceiptList/${this.props.match.params.tabName || 'todo'}`);
  };

  renderColumn = () => {
    const { excepList } = this.state;
    const columns = [...ewInfoConfirmColumn];
    if (this.props.query.confirmStatus === 0) {
      columns.push({
        title: '操作',
        align: 'center',
        fixed: 'right',
        width: 60,
        render: (text, record) => {
          return (
            !excepList.includes(record.ewBankId) &&
            record.businessType !== 2 && (
              <Fragment>
                <Tooltip title="标记异常">
                  <a href="javascript:;" onClick={this.handleException(record)}>
                    <Icon type="warning" style={{ color: '#f5222d' }} />
                  </a>
                </Tooltip>
              </Fragment>
            )
          );
        },
      });
    } else {
      columns.push({
        title: '操作',
        align: 'center',
        fixed: 'right',
        width: 60,
      });
    }
    return columns;
  };

  componentDidMount() {
    const { bankId, brandId, distributorId, exportHisId } = this.props.query;
    if (bankId && brandId && distributorId && exportHisId) {
      this.handleSearch();
    } else {
      this.props.history.push(`/confirmReceiptList/${this.props.match.params.tabName || 'todo'}`);
    }
  }

  render() {
    return (
      <div className={styles.printManagement}>
        <div className={styles.wrapper}>
          <Table
            dataSource={this.props.list}
            columns={this.renderColumn()}
            loading={this.props.loading}
            scroll={{ x: 800 }}
            rowKey={'id'}
            pagination={false}
          />
        </div>
        <Modal
          title="二网信息"
          visible={this.state.showModal}
          onOk={this.handleExcepModalOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.modalLoading}
        >
          <ExcepModalForm wrappedComponentRef={form => (this.excepForm = form)} onSubmit={this.confirmExcep} />
        </Modal>
        <OperationArea>
          <Button onClick={this.goBack}>返回</Button>
        </OperationArea>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.confirmReceipt.loading,
  list: store.confirmReceipt.ewDetailData.list,
  query: store.confirmReceipt.ewDetailQuery,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: paging => dispatch(fetch(paging)),
    confirmException: data => dispatch(confirmException(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EwDetail);
