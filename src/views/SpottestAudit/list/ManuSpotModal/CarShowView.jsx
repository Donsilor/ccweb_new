import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Icon, Row, Col, Cascader, Table } from 'antd';
import chunk from 'lodash/chunk';
import styles from 'components/CCForm/style.module.less';
import * as FormItems from 'components/CCForm/formItem';
import * as ColItems from 'components/EwAuditTableColumn/columnItem';
import EwAuditTable from 'components/EwAuditTable';
import SimForm from 'components/SimForm';
import { httpFormClient } from 'common/axios';

export default class CarShowView extends PureComponent {
  state = {
    list: [],
    selectedRowKeys: this.props.record ? [`${this.props.record.id}`] : [],
  };
  componentDidMount() {
    this.handleSearch(this.props.query);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query, page, pageSize);
  };
  handleRowSelectChange = (selectedRowKeys, [record]) => {
    this.setState({ selectedRowKeys });
    record && this.props.onSelectRow(record);
  };
  selectRow = record => {
    this.handleRowSelectChange([`${record.id}`], [record]);
  };
  handleSearch = (values, page, pageSize) => {
    httpFormClient
      .formSubmit('/SpotTestTaskAction_getSpotCarShows', '', values, {
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      })
      .then(({ data }) => {
        if (data.result == 0) {
          this.setState({
            list: data.list,
          });
          this.props.updateQuery(this.props.query, {
            current: data.page && data.page.pageNum,
            pageSize: data.page && data.page.pageSize,
            total: data.page && data.page.total,
          });
        }
      });
  };
  showTotal = total => {
    return `共 ${total} 条数据`;
  };
  render() {
    const { query, updateQuery, paging } = this.props;
    const { selectedRowKeys } = this.state;

    return (
      <div>
        <SimForm
          formItemList={[FormItems.distributorNameFormItem, FormItems.carShowNameFormItem]}
          query={query}
          onUpdateQuery={value => updateQuery(value, paging)}
          onSearch={this.handleSearch}
        />
        <EwAuditTable
          columns={[
            ColItems.distributorNameColumn,
            {
              title: '车展名称',
              dataIndex: 'showName',
              align: 'center',
            },
            {
              title: '车展地址',
              dataIndex: 'showAddress',
              align: 'center',
            },
            {
              title: '开始时间',
              dataIndex: 'startTime',
              align: 'center',
            },
            {
              title: '结束时间',
              dataIndex: 'endTime',
              align: 'center',
            },
            {
              title: '抽查频率',
              dataIndex: 'spottestFeqName',
              align: 'center',
            },
            {
              title: '车辆数量',
              dataIndex: 'car_num',
              align: 'center',
            },
          ]}
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
          bordered={false}
          scroll={{ x: 'max-content' }}
          rowSelection={{
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            type: 'radio',
          }}
          onRow={record => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
          rowKey="id"
        />
      </div>
    );
  }
}
