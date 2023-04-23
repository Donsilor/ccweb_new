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
  };
  handleSearch = () => {
    httpCommonClient
      .post(`/warning/v1.0/matching/outbound/bill/list`, {
        amountCheck: this.props.record.amountCheck,
        dealerName: this.props.record.dealerName,
        price: this.props.record.price,
        billNo: this.props.record.billNo,
        searchBillNo: this.state.searchBillNo,
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
      .post(`/warning/v1.0/matching/outbound/${record.type}`, {
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
    const { selectedRows, searchBillNo } = this.state;
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
              <span style={{ fontWeight: 'bold' }}>单价：</span>
              {record.price}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>解析票据号：</span>
              {record.analysisBillNo}
            </div>
            {record.statusCode == 'assign_status_2' && (
              <div>
                <span style={{ fontWeight: 'bold' }}>已分配票据号：</span>
                {record.billNo}
              </div>
            )}
            <div>
              <span style={{ fontWeight: 'bold' }}>
                {record.statusCode == 'assign_status_2' ? '重新分配票据号' : '实际分配票据号'}
              </span>
              {!_.isEmpty(selectedRows) && selectedRows[0].billNo}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              票号查询:&nbsp;&nbsp;
              <Input
                style={{ width: '300px' }}
                value={searchBillNo}
                placeholder="请输入票号"
                onChange={e => this.setState({ searchBillNo: e.target.value })}
              />
            </div>
            <div>
              <Button type="primary" onClick={() => this.handleSearch()}>
                查询
              </Button>
              &nbsp;&nbsp;
              <Button onClick={() => this.setState({ searchBillNo: '' })}>重置</Button>
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
