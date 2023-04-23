import React, { Component, Fragment } from 'react';
import { FormArea, ViewWrapper } from 'layouts/ViewWrapper';
import { Button, message, Modal, Table, Tooltip } from 'antd';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import ewAuditTableColumn from 'components/EwAuditTableColumn';
import { httpCommonClient } from 'common/axios';
import GridList from 'components/GridList';
import MakeOutForm from './components/MakeOutForm';
import RemarkModalForm from './components/RemarkModalForm';
import RefundForm from './components/RefundForm';
import ModalForm from 'components/ModalForm';
import { formatTime } from 'common/utils';
const { confirm } = Modal;
export default class EwOrderList extends Component {
  state = {
    logModalVisible: false,
    logs: {
      list: [],
      loading: true,
    },
    invoiceInfoModalVisible: false,
    invoiceInfo: [],
    invoiceCompleteInfo: [],
    invoiceConfirmModalVisible: false,
    invoiceConfirmModalLoading: false,
    invoiceLogsModalVisible: false,
    invoiceLogs: {
      list: [],
      loading: true,
    },
    remarkModalVisible: false,
    remarkModalLoading: false,
    refundConfirmModalVisible: false,
    orderUpdOrderExpVisible: false,
  };

  logColumns = [
    {
      title: '操作时间',
      dataIndex: 'operTime',
      align: 'center',
    },
    {
      title: '操作内容',
      dataIndex: 'name',
    },
    {
      title: '操作人',
      dataIndex: 'operUserName',
    },
    {
      title: '描述',
      dataIndex: 'description',
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        };
      },
      render: text => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
  ];
  invoiceLogColumns = [
    {
      title: '描述',
      dataIndex: 'remark',
      align: 'left',
      onCell: () => {
        return {
          style: {
            maxWidth: 150,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          },
        };
      },
      render: text => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: '操作人',
      dataIndex: 'createUserName',
      align: 'left',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'left',
    },
  ];

  componentDidMount() {
    this.handleSearch(this.props.query.value);
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

  renderColumns = () => {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.path);

    columns.map(col => {
      if (col.dataIndex === 'orderAction') {
        col.render = (text, record) => {
          if (match.path.startsWith('/orderManagement/list')) {
            if (match.path === '/orderManagement/list/doneOrderList') {
              return (
                <Fragment>
                  <a href="javascript:;" onClick={this.orderUpdOrderExp(record)}>
                    修改开始时间
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a href="javascript:;" onClick={this.showLogModal(record)}>
                    操作日志
                  </a>
                </Fragment>
              );
            } else {
              return (
                <Fragment>
                  <a href="javascript:;" onClick={this.showLogModal(record)}>
                    操作日志
                  </a>
                </Fragment>
              );
            }
          } else if (match.path.startsWith('/invoiceManagement/list')) {
            if (match.path === '/invoiceManagement/list/todoInvoiceList') {
              return (
                <Fragment>
                  <a href="javascript:;" onClick={this.showInvoiceInfoModal(record)}>
                    查看开票信息
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a href="javascript:;" onClick={this.showInvoiceConfirmModal(record)}>
                    开票
                  </a>
                </Fragment>
              );
            } else {
              return (
                <Fragment>
                  <a href="javascript:;" onClick={this.showInvoiceInfoModal(record)}>
                    查看开票信息
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a href="javascript:;" onClick={this.showInvoiceLogsModal(record)}>
                    查看备注
                  </a>
                </Fragment>
              );
            }
          } else if (match.path.startsWith('/refundManagement/list')) {
            return (
              <Fragment>
                <a href="javascript:;" onClick={this.showRefundModal(record)}>
                  退款
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href="javascript:;" onClick={this.showRejectModal(record)}>
                  拒绝
                </a>
              </Fragment>
            );
          } else {
            return null;
          }
        };
      }
    });

    return columns;
  };
  //修改开始时间操作
  orderUpdOrderExp = record => () => {
    this.setState({
      orderUpdOrderExpVisible: true,
      invoiceCompleteInfo: record,
    });
  };
  //修改开始时间操作成功
  updOrderExpSubmitOk = () => {
    this.setState({ orderUpdOrderExpVisible: false });
    this.handlePageChange();
  };
  //修改开始时间操作确认
  updOrderExpSubmit = (formData, record) => {
    return httpCommonClient
      .post('/OrderAction_updOrderExp', {
        orderNo: record.orderNo,
        effectiveStartDate: formatTime(
          formData.effectiveStartDate
            .hour(0)
            .minute(0)
            .second(0)
        ),
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: data.msg || '操作失败，请重试',
            },
          });
        }
      });
  };
  // 订单操作记录弹窗
  showLogModal = record => () => {
    this.setState({
      logModalVisible: true,
    });
    let url = '/OrderAction_searchOrderRecordList';
    httpCommonClient
      .post(url, {
        orderNo: record.orderNo,
        pageNum: 1,
        pageSize: 10,
      })
      .then(respone => {
        console.log(respone);
        this.setState({
          logs: {
            loading: false,
            list: respone.data.list || [],
          },
        });
      })
      .catch(err => {
        message.error(err.msg || err);
        this.setState({
          logModalVisible: false,
        });
      });
  };

  // 开票信息弹窗
  showInvoiceInfoModal = record => () => {
    let data = [];
    data.push({ key: '开票方式', value: record['invoiceTypeStr'] });
    data.push({ key: '开票类型', value: record['invoicingMethodStr'] });
    data.push({ key: '抬头类型', value: record['titleType'] === 1 ? '个人' : '企业' });
    data.push({ key: '发票抬头', value: record['invoiceTitle'] });
    data.push({ key: '税号', value: record['invoiceTaxNo'] });
    data.push({ key: '收件人', value: record['name'] });
    data.push({ key: '收件人电话', value: record['mobile'] });
    data.push({ key: '收件地址', value: record['address'] });
    data.push({ key: '收件邮箱', value: record['email'] });
    data.push({ key: '开户银行', value: record['bankName'] });
    data.push({ key: '银行账号', value: record['bankAccount'] });
    data.push({ key: '企业地址', value: record['companyAddress'] });
    data.push({ key: '企业电话', value: record['telphone'] });

    this.setState({
      invoiceInfoModalVisible: true,
      invoiceInfo: data,
    });
  };

  // 开票弹窗
  showInvoiceConfirmModal = record => () => {
    this.setState({
      invoiceConfirmModalVisible: true,
      invoiceCompleteInfo: record,
    });
  };
  //退款确认弹窗
  showRefundModal = record => () => {
    this.setState({
      refundConfirmModalVisible: true,
      invoiceCompleteInfo: record,
    });
  };
  //退款拒绝确认弹窗
  showRejectModal = (record, page, pageSize) => () => {
    const self = this;
    confirm({
      title: '确认拒绝退款?',
      onOk() {
        let url = '/OrderAction_rejectRefund';
        httpCommonClient
          .post(url, {
            orderNo: record.orderNo,
          })
          .then(respone => {
            if (respone.data.result === 0) {
              message.success('操作成功');
              self.handleSearch(self.props.query.value, page, pageSize);
            } else {
              message.error(respone.data.msg);
            }
          })
          .catch(err => {
            message.error('网络错误');
          });
      },
    });
  };

  // 发票备注弹窗
  showInvoiceLogsModal = record => () => {
    console.log('查找备注');
    this.setState({
      invoiceLogsModalVisible: true,
      invoiceCompleteInfo: record,
    });
    let url = '/InvoiceAction_searchRemarkList';
    httpCommonClient
      .post(url, {
        invoiceId: record.id,
        pageNum: 1,
        pageSize: 10,
      })
      .then(respone => {
        console.log(respone);
        this.setState({
          invoiceLogs: {
            loading: false,
            list: respone.data.list || [],
          },
        });
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          logModalVisible: false,
        });
      });
  };

  // 开票确认
  confirmModalOk = () => {
    this.confirmForm && this.confirmForm.handleSubmit();
  };
  confirmFormOk = (value, page, pageSize) => {
    this.setState({
      invoiceConfirmModalLoading: true,
    });
    let url = '/InvoiceAction_completeInvoice';
    httpCommonClient
      .post(url, {
        id: this.state.invoiceCompleteInfo.id,
        invoiceAmount: value.amount,
      })
      .then(respone => {
        if (respone.data.result === 0) {
          message.success('操作成功');
          this.setState({
            invoiceConfirmModalLoading: false,
            invoiceInfo: [],
            invoiceConfirmModalVisible: false,
          });
          this.handleSearch(this.props.query.value, page, pageSize);
        } else {
          message.error(respone.data.msg || respone);
          this.setState({
            invoiceConfirmModalLoading: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          invoiceConfirmModalLoading: false,
          invoiceInfo: [],
          invoiceConfirmModalVisible: false,
        });
      });
  };
  // 退款确认
  refundHandleSubmit = (value, page, pageSize) => {
    this.setState({
      invoiceConfirmModalLoading: true,
    });
    let url = '/OrderAction_completeRefund';
    httpCommonClient
      .post(url, {
        orderNo: this.state.invoiceCompleteInfo.orderNo,
        endDate: value.endDate.format('YYYY-MM-DD HH:mm:ss'),
        refundAmount: +value.refundAmount,
      })
      .then(respone => {
        if (respone.data.result === 0) {
          message.success('操作成功');
          this.setState({
            refundConfirmModalVisible: false,
            invoiceConfirmModalLoading: false,
          });
          this.handleSearch(this.props.query.value, page, pageSize);
        } else {
          message.error(respone.data.msg || respone);
          this.setState({
            refundConfirmModalVisible: false,
            invoiceConfirmModalLoading: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          refundConfirmModalVisible: false,
          invoiceConfirmModalLoading: false,
        });
      });
  };

  // 新增备注
  showRemarkModal = () => {
    console.log('clicked');
    this.setState({
      remarkModalVisible: true,
    });
  };
  remarkModalOk = () => {
    this.remarkForm && this.remarkForm.handleSubmit();
  };
  remarkModalCancel = () => {
    this.setState({
      remarkModalVisible: false,
      remarkModalLoading: false,
    });
  };
  remarkFormOk = value => {
    this.setState({
      remarkModalLoading: true,
    });

    let url = '/InvoiceAction_addRemark';
    httpCommonClient
      .post(url, {
        invoiceId: this.state.invoiceCompleteInfo.id,
        remark: value.remark,
      })
      .then(respone => {
        if (respone.data.result === 0) {
          message.success('操作成功');
          this.setState({
            remarkModalVisible: false,
            remarkModalLoading: false,
          });
          this.showInvoiceLogsModal(this.state.invoiceCompleteInfo)();
        } else {
          message.error(respone.data.msg || respone);
          this.setState({
            remarkModalLoading: false,
          });
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          remarkModalVisible: false,
          remarkModalLoading: false,
        });
      });
  };

  handleCancel = () => {
    this.setState({
      logModalVisible: false,
      logs: {
        loading: true,
        list: [],
      },
      invoiceInfoModalVisible: false,
      invoiceInfo: [],
      invoiceConfirmModalVisible: false,
      invoiceLogsModalVisible: false,
      invoiceLogs: {
        list: [],
        loading: true,
      },
      remarkModalVisible: false,
      refundConfirmModalVisible: false,
      orderUpdOrderExpVisible: false,
    });
  };

  render() {
    const { match, query, loading, list, paging } = this.props;
    const {
      logModalVisible,
      logs,
      invoiceConfirmModalVisible,
      invoiceConfirmModalLoading,
      invoiceInfoModalVisible,
      invoiceInfo,
      invoiceLogsModalVisible,
      invoiceLogs,
      invoiceCompleteInfo,
      remarkModalVisible,
      remarkModalLoading,
      refundConfirmModalVisible,
      orderUpdOrderExpVisible,
    } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumns()}
            loading={loading}
            data={list}
            paging={paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            onSelectRow={this.handleSelectRow}
            onOperMultipleRow={this.handleExportRow}
          />
        </div>
        {/*订单操作日志*/}
        <Modal
          title="操作日志"
          visible={logModalVisible}
          onCancel={this.handleCancel}
          width={900}
          footer={null}
          destroyOnClose
        >
          <div>
            <Table
              dataSource={logs.list || []}
              columns={this.logColumns}
              loading={logs.loading}
              //scroll={{ y: 500 }}
              rowKey="id"
              pagination={false}
            />
          </div>
        </Modal>
        {/*修改开始时间*/}
        {orderUpdOrderExpVisible && (
          <ModalForm
            title="修改开始时间"
            onOk={this.updOrderExpSubmitOk}
            onCancel={this.handleCancel}
            onSubmit={this.updOrderExpSubmit}
            record={invoiceCompleteInfo}
            configList={[
              {
                label: '原开始时间',
                type: 'label',
                key: 'effectiveStartDate',
              },
              {
                label: '修改开始时间',
                type: 'datePicker',
                //showTime: true,
                key: 'effectiveStartDate',
                required: true,
                rules: [
                  {
                    required: true,
                    message: '请选择时间！',
                  },
                ],
              },
            ]}
          />
        )}
        {/*开票确认弹窗*/}
        <Modal
          title="开票"
          visible={invoiceConfirmModalVisible}
          onOk={this.confirmModalOk}
          onCancel={this.handleCancel}
          confirmLoading={invoiceConfirmModalLoading}
          okText="开票"
          cancelText="取消"
          destroyOnClose
        >
          <MakeOutForm
            wrappedComponentRef={form => (this.confirmForm = form)}
            max={invoiceCompleteInfo['orderAmount']}
            onSubmit={this.confirmFormOk}
          />
        </Modal>
        {/*退款确认弹窗*/}
        <Modal
          title="退款"
          visible={refundConfirmModalVisible}
          confirmLoading={invoiceConfirmModalLoading}
          onOk={this.confirmModalOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          destroyOnClose
        >
          <RefundForm
            wrappedComponentRef={form => (this.confirmForm = form)}
            max={invoiceCompleteInfo['orderAmountTotal']}
            onSubmit={this.refundHandleSubmit}
          />
        </Modal>
        {/*开票信息*/}
        <Modal
          title="开票信息"
          visible={invoiceInfoModalVisible}
          onCancel={this.handleCancel}
          width={780}
          footer={null}
          destroyOnClose
        >
          <div>
            <GridList data={invoiceInfo} />
          </div>
        </Modal>
        {/*发票备注*/}
        <Modal
          title="备注信息"
          visible={invoiceLogsModalVisible}
          onCancel={this.handleCancel}
          width={900}
          footer={null}
          destroyOnClose
        >
          <div style={{ display: 'flex', 'justify-content': 'flex-end' }}>
            <Button type="primary" htmlType="submit" onClick={this.showRemarkModal}>
              +新增备注
            </Button>
          </div>
          <div>
            <Table
              dataSource={invoiceLogs.list || []}
              columns={this.invoiceLogColumns}
              loading={invoiceLogs.loading}
              //scroll={{ y: 500 }}
              rowKey="id"
              pagination={false}
            />
            <Modal
              title="新增备注"
              onCancel={this.remarkModalCancel}
              onOk={this.remarkModalOk}
              confirmLoading={remarkModalLoading}
              visible={remarkModalVisible}
              width={780}
              okText="确定"
              cancelText="取消"
              destroyOnClose
            >
              <div>
                <RemarkModalForm wrappedComponentRef={form => (this.remarkForm = form)} onSubmit={this.remarkFormOk} />
              </div>
            </Modal>
          </div>
        </Modal>
      </ViewWrapper>
    );
  }
}
