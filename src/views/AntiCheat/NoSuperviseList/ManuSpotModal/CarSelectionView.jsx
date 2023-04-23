import React, { PureComponent } from 'react';
import { message } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
import _get from 'lodash/get';
import _forEach from 'lodash/forEach';

export default class CarSelectionView extends PureComponent {
  state = {
    list: [],
    selectedRowKeys: Array.isArray(this.props.record) ? this.props.record.map(item => item.id) : [],
  };
  componentDidMount() {
    this.handleSearch(this.props.query);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query, page, pageSize);
  };
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
    this.props.onSelectRow(selectedRowKeys, selectedRows);
  };
  handleSearch = (formValue, page, pageSize) => {
    httpCommonClient
      .post('/UnsupervisedSpotDisAction_listUnspotDistributors', {
        bookTime: this.props.bookTime,
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      })
      .then(({ data }) => {
        if (data.result == 0) {
          this.setState({
            list: data.list,
          });
          this.props.updateQuery(this.props.query, {
            current: _get(data, 'page.pageNum', 1),
            pageSize: _get(data, 'page.pageSize', 10),
            total: _get(data, 'page.total', 0),
          });
        } else {
          this.setState({
            list: [],
          });
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          list: [],
        });
      });
  };
  showTotal = total => {
    return `共 ${total} 条数据`;
  };
  render() {
    const { paging } = this.props;
    const { selectedRowKeys } = this.state;

    return (
      <div>
        <EwAuditTable
          columns={commonCarAddingColumns}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
          data={this.state.list}
          paging={{
            ...paging,
            pageSizeOptions: ['10', '30', '50', '100'],
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.props.onChange,
            onShowSizeChange: this.props.onPageChange,
            showTotal: this.showTotal,
          }}
          size="small"
          scroll={{ x: 'max-content' }}
          bordered={false}
          rowSelection={{
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
          }}
          rowKey="id"
        />
      </div>
    );
  }
}
const commonCarAddingColumns = [
  {
    title: '经销商',
    dataIndex: 'distributorName',
  },
  {
    title: '日常查车',
    dataIndex: 'dailyCarFlag',
    render: (text) => text ? '是' : '否'
  },
  {
    title: '盘证任务',
    dataIndex: 'dailyCertificateFlag',
    render: (text) => text ? '是' : '否'
  },
];