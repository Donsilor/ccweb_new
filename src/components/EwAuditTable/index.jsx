import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, message } from 'antd';
import styles from './style.module.less';

export default class EwAuditTable extends PureComponent {
  static defaultProps = {
    paging: {
      current: 0,
      pageSize: 10,
      total: 1,
    },
    pagination: true,
  };
  static propTypes = {
    loading: PropTypes.bool,
    size: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    paging: PropTypes.shape({
      current: PropTypes.number.isRequired,
      pageSize: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }),
    // onChange: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onSelectRow: PropTypes.func,
    onOperMultipleRow: PropTypes.func,
    rowClassName: PropTypes.func,
    showTableOperArea: PropTypes.bool,
    pagination: PropTypes.bool,
  };

  state = {
    selectedRowKeys: [],
  };

  handleExportSelect = () => {};
  handleRowSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
    this.props.onSelectRow(selectedRowKeys);
  };

  cleanSelectedRows = () => {
    this.handleRowSelectChange([]);
  };

  exportSelectedRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      message.error('请至少选择一条数据进行操作', 2.5);
      return;
    }
    this.props.onOperMultipleRow(this.state.selectedRowKeys);
  };

  showTotal = total => {
    return `共 ${total} 条数据`;
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { operName = '批量导出' } = this.props;
    const content = (
      <p className={styles.selectInfo}>
        已选择 <b style={{ color: '#1890ff' }}>{selectedRowKeys.length}</b> 条记录{' '}
        <a href="javascript:;" onClick={this.cleanSelectedRows}>
          取消选择
        </a>
        <a href="javascript:;" onClick={this.exportSelectedRows}>
          {operName}
        </a>
      </p>
    );
    return (
      <div>
        {this.props.showTableOperArea && (
          <div className={styles.operArea}>
            <Alert message={content} type="info" showIcon />
          </div>
        )}
        <Table
          columns={this.props.columns}
          dataSource={this.props.data}
          rowKey={this.props.rowKey || 'id'}
          loading={this.props.loading}
          scroll={this.props.scroll ? this.props.scroll : { x: true }}
          pagination={
            this.props.pagination === false
              ? false
              : {
                  current: this.props.paging.current,
                  pageSize: this.props.paging.pageSize,
                  total: this.props.paging.total,
                  pageSizeOptions: ['10', '30', '50', '100'],
                  showSizeChanger: true,
                  showQuickJumper: true,
                  onChange: this.props.onChange,
                  onShowSizeChange: this.props.onPageChange,
                  showTotal: this.showTotal,
                }
          }
          size={this.props.size || 'default'}
          rowSelection={
            this.props.showTableOperArea
              ? {
                  selectedRowKeys,
                  onChange: this.handleRowSelectChange,
                  getCheckboxProps: this.getCheckboxProps,
                }
              : this.props.rowSelection
              ? this.props.rowSelection
              : null
          }
          bordered={this.props.bordered}
          onRow={this.props.onRow}
          rowClassName={this.props.rowClassName}
          type={this.props.type}
        />
      </div>
    );
  }
}
