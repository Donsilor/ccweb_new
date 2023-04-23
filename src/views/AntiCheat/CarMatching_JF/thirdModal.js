import React, { Component } from 'react';
import { Button, Modal, message, Table, Input } from 'antd';
import { httpCommonClient } from 'common/axios';
import { thirdModalColumns } from './Columns';
import _ from 'lodash';
export default class thirdModal extends Component {
  state = {
    tableLoading: true,
    lists: [],
    selectedRows: [],
    searchBillNo: '',
    businessNo: '',
  };
  handleSearch = () => {
    httpCommonClient
      .post(`/warning/v1.0/matching/outboundJiefang/bill/list`, {
        amountCheck: this.props.record.amountCheck,
        dealerName: this.props.record.dealerName,
        totalAmount: this.props.record.totalAmount,
        billNo: this.props.record.billNo,
        searchBillNo: this.state.searchBillNo,
        businessNo: this.state.businessNo,
      })
      .then(({ data }) => {
        if (data.code == 200) {
          this.setState({
            lists: data.data,
            tableLoading: false,
          });
        }
      });
  };
  componentDidMount() {
    this.handleSearch();
  }
  addEwSave = () => {
    const { record } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows.length) {
      message.error('请选择一个票号');
      return;
    }
    httpCommonClient
      .post(`/warning/v1.0/matching/outboundJiefang/${record.type}`, {
        id: this.props.record.id,
        billId: selectedRows[0].id,
      })
      .then(({ data = {} }) => {
        if (data.code === 200) {
          message.success(data.message);
          this.props.searchList();
          this.props.onCancel();
        } else {
          message.error(data.message);
        }
      });
  };
  render() {
    const { record } = this.props;
    const { selectedRows, searchBillNo, businessNo } = this.state;
    return (
      <div>
        <Modal
          title={record.title}
          visible
          onOk={() => this.addEwSave()}
          onCancel={() => this.props.onCancel()}
          width={800}
        >
          <div style={{ marginBottom: '10px', lineHeight: '25px' }}>
            <div>
              <span style={{ fontWeight: 'bold' }}>经销商名称：</span>
              {record.dealerName}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>车架号：</span>
              {record.vin}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>合计金额：</span>
              {record.totalAmount}
            </div>
            {record.statusCode == 'assign_status_2' && (
              <div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>已分配票据号：</span>
                  {record.billNo}
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>已分配票据业务编号：</span>
                  {record.businessNo}
                </div>
              </div>
            )}
            <div>
              <span style={{ fontWeight: 'bold' }}>
                {record.statusCode == 'assign_status_2' ? '重新分配票据号：' : '实际分配票据号：'}
              </span>
              {!_.isEmpty(selectedRows) && selectedRows[0].billNo}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>
                {record.statusCode == 'assign_status_2' ? '重新分配票据的业务编号：' : '业务编号：'}
              </span>
              {!_.isEmpty(selectedRows) && selectedRows[0].businessNo}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              票号查询:&nbsp;&nbsp;
              <Input
                style={{ width: '200px' }}
                value={searchBillNo}
                placeholder="请输入票号"
                onChange={e => this.setState({ searchBillNo: e.target.value })}
              />
              &nbsp;&nbsp; 业务编号:&nbsp;&nbsp;
              <Input
                style={{ width: '200px' }}
                value={businessNo}
                placeholder="请输入业务编号"
                onChange={e => this.setState({ businessNo: e.target.value })}
              />
            </div>
            <div>
              <Button type="primary" onClick={() => this.handleSearch()}>
                查询
              </Button>
              &nbsp;&nbsp;
              <Button onClick={() => this.setState({ searchBillNo: '', businessNo: '' })}>重置</Button>
            </div>
          </div>
          <br />
          <Table
            size="small"
            loading={this.state.tableLoading}
            dataSource={this.state.lists}
            columns={thirdModalColumns}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRows });
              },
            }}
            style={{ height: '300px', overflow: 'scroll' }}
            pagination={false}
          />
        </Modal>
      </div>
    );
  }
}
