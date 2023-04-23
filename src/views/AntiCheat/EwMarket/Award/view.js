import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Button, message, Modal, Table, Divider, Alert } from 'antd';
import CCForm from 'components/CCForm';
import ModalForm from 'components/ModalForm';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import styles from '../style.module.less';
import { columnsItem } from '../Columns'
import moment from 'moment';
const { confirm } = Modal;
export default class listView extends Component {
  state = {
    list: [],
    isExporting: false,
    selectedRowKeys: [],
    selectedRows: []
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    this.props.fetch(formValues, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  itemSearch = (record) => {
    this.setState({ isExporting: true })
    httpCommonClient.post(`/yck/bonus/list/${record.id}`,
      { accountingId: record.id })
      .then(({ data = {} }) => {
        if (data.code === 200) {
          this.setState({ list: data.rows })
        } else {
          message.error(data.message)
        }
        this.setState({ isExporting: false })
      });
  };
  render() {
    const { paging, match, list, loading, query, columns } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
          />
        </FormArea>
        <div className={styles.operArea}>
          <Alert message={(
            <p className={styles.selectInfo}>
              已选择 <b style={{ color: '#1890ff' }}>{selectedRowKeys.length}</b> 条记录
              <a href="javascript:;" onClick={() => this.setState({ selectedRowKeys: [], selectedRows: [] })}>
                取消选择
              </a>
              <div style={{ float: 'right' }}>奖励金额合计(元)：{selectedRows.length > 0 && selectedRows.map(v => v.bonusAmount).reduce((n, m) => n + m)}</div>
            </p>
          )} type="info" showIcon />
        </div>
        <EwAuditTable
          columns={[...columns,
          {
            fixed: 'right',
            title: '操作',
            render: (text, record) => (
              <div>
                <a
                  href="javascript:;"
                  onClick={() => {
                    if (match.path == '/marketAwardCheck') {
                      this.props.history.push(`${match.path}/detail/${record.id}`);
                    } else {
                      this.itemSearch(record)
                      this.setState({ showModal: true })
                    }
                  }}
                >
                  查看
                </a>
              </div>
            ),
          }]}
          loading={loading}
          data={list}
          paging={paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({ selectedRowKeys, selectedRows });
            },
          }}
        />
        {/* 查看明细*/}
        {this.state.showModal && (
          <Modal
            title='查看明细'
            width='90%'
            onCancel={() => this.setState({ showModal: false })}
            visible
            footer={null}
          >
            <Table
              columns={columnsItem}
              dataSource={this.state.list}
              loading={this.state.isExporting}
              scroll={{ x: true }}
              pagination={false}
            />
          </Modal>
        )}
        <OperationArea>
          {match.path == '/marketAwardRemit/awardRemitTodo' &&
            <Button
              type="primary"
              onClick={() => {
                if (!selectedRowKeys.length) {
                  message.info('请先选择数据！');
                  return
                }
                let self = this;
                confirm({
                  title: '请确认是否放款?',
                  onOk() {
                    httpCommonClient.post(`/yck/bonus/approve`, { ids: selectedRowKeys }).then(({ data = {} }) => {
                      if (data.code === 200) {
                        self.setState({ selectedRowKeys: [], selectedRows: [] });
                        message.success(data.msg);
                        self.handleSearch();
                      } else {
                        message.error(data.msg);
                      }
                    });
                  },
                });
              }}
            >
              确认放款
            </Button>}
          {match.path == '/marketAwardCheck' &&
            <Button
              type="primary"
              onClick={() => {
                if (!selectedRowKeys.length) {
                  message.info('请先选择数据！');
                  return
                }
                let self = this;
                confirm({
                  title: '请确认是否审核通过?',
                  onOk() {
                    httpCommonClient.post(`/yck/vehicle/auditBonusApprove`, { ids: selectedRowKeys }).then(({ data = {} }) => {
                      if (data.code === 200) {
                        self.setState({ selectedRowKeys: [], selectedRows: [] });
                        message.success(data.msg);
                        self.handleSearch();
                      } else {
                        message.error(data.msg);
                      }
                    });
                  },
                });
              }}
            >
              审核通过
            </Button>}
          {match.path == '/marketAwardCheck' &&
            <Button
              onClick={() => {
                if (!selectedRowKeys.length) {
                  message.info('请先选择数据！');
                  return
                }
                this.setState({
                  showExcepModal: true,
                })
              }}
              type="danger"
            >
              批量驳回
            </Button>}
          <Button
            type="primary"
            onClick={() => {
              if (!selectedRowKeys.length) {
                message.info('请先选择数据！');
                return
              }
              this.setState({ modModal: true })
            }}
          >
            批量修改
          </Button>
        </OperationArea>
        {/*修改*/}
        {this.state.modModal && (
          <ModalForm
            title={`修改`}
            onOk={() => {
              this.setState({ modModal: false, selectedRowKeys: [] })
              this.handleSearch()
            }}
            onCancel={() => this.setState({ modModal: false })}
            onSubmit={formData => {
              let values = formData
              if (formData.bonusDate) {
                values.bonusDate = moment(formData.bonusDate).format('YYYY-MM-DD')
              }
              return httpCommonClient
                .post(match.path == '/marketAwardCheck' ? `/yck/vehicle/auditBonus` : '/yck/bonus/edit', { ids: selectedRowKeys, ...values })
                .then(({ data = {} }) => {
                  if (data.code === 200) {
                    return Promise.resolve({
                      data: {
                        result: 0,
                      },
                    });
                  } else {
                    return Promise.resolve({
                      data: {
                        result: 1,
                        msg: data.msg,
                      },
                    });
                  }
                });
            }}
            configList={
              match.path == '/marketAwardCheck' ?
                [{
                  label: '奖励金额(元)',
                  type: 'inputNumber',
                  key: 'bonusAmount',
                  required: true,
                }] :
                [{
                  label: '打款日期',
                  type: 'datePicker',
                  key: 'bonusDate',
                  required: true,
                },
                {
                  label: '备注',
                  type: 'input',
                  key: 'remark',
                }]}
          />
        )}
        {/*批量驳回*/}
        {this.state.showExcepModal && (
          <ModalForm
            title={`退回重拍`}
            onOk={() => {
              this.setState({ showExcepModal: false })
              this.handleSearch()
            }}
            onCancel={() => this.setState({ showExcepModal: false })}
            onSubmit={formData => {
              return httpCommonClient
                .post(`/yck/vehicle/auditBonus`, { ids: selectedRowKeys, ...formData })
                .then(({ data = {} }) => {
                  if (data.code === 200) {
                    this.setState({ selectedRowKeys: [], selectedRows: [] });
                    return Promise.resolve({
                      data: {
                        result: 0,
                      },
                    });
                  } else {
                    return Promise.resolve({
                      data: {
                        result: 1,
                        msg: data.msg,
                      },
                    });
                  }
                });
            }}
            configList={[
              {
                label: '退回到',
                type: 'radio',
                key: 'auditStatus',
                required: true,
                optionList: [{ label: '退回到二网', value: '3' }, { label: '退回到易查库', value: '4' }],
              },
              {
                label: '退回原因',
                type: 'textArea',
                key: 'remarks',
                required: true,
              },
            ]}
          />
        )}
      </ViewWrapper>
    );
  }
}
