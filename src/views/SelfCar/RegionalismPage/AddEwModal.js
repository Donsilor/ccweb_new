import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import SimForm from 'components/SimForm';
import { httpCommonClient } from 'common/axios';
import { ewAddColumns } from './Columns';
import EwAuditTable from 'components/EwAuditTable';
import * as FormItems from 'components/CCForm/formItem';
import _get from 'lodash/get';
export default class regionalism extends Component {
  state = {
    addEwVisible: true,
    tableLoading: true,
    selectedRowKeys: [],
    selectedRows: [],
    ewList: [],
  };
  handleSearch = (formValue, page, pageSize) => {
    httpCommonClient
      .postWithPaging(
        `/self-car/v1.0/ew/find/list/unrelated-sub-area`,
        { ...formValue },
        {
          pageNum: page || 1,
          pageSize: pageSize || 10,
        }
      )
      .then(({ data }) => {
        if (data.code == 200) {
          this.setState({
            ewList: data.data.list,
            tableLoading: false,
          });
          this.props.updateQuery(this.props.query, {
            current: _get(data, 'data.pageNum', 1),
            pageSize: _get(data, 'data.pageSize', 10),
            total: _get(data, 'data.total', 1),
          });
        }
      });
  };

  componentDidMount() {
    this.handleSearch();
  }
  handleDetailPageChange = (page, pageSize) => {
    this.handleSearch(this.props.query, page, pageSize);
  };
  onCancel = () => {
    this.props.addEwvisible();
    this.setState({
      addEwVisible: false,
      tableLoading: true,
    });
  };
  addEwSave = () => {
    httpCommonClient
      .post(`/self-car/v1.0/selfDistributorAreaEw/add`, {
        areaId: this.props.ewId,
        ewIds: this.state.selectedRowKeys.join(),
      })
      .then(res => {
        this.props.addEwvisible();
        this.props.searchList();
      });
  };
  render() {
    const { query, updateQuery, paging } = this.props;
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRowKeys });
      },
    };
    return (
      <div>
        <Modal title="新增二网" visible={this.state.addEwVisible} onCancel={this.onCancel} footer={null} width={1024}>
          <SimForm
            formItemList={[FormItems.ewNameFormItem, FormItems.provinceNameFormItem, FormItems.cityNameFormItem]}
            query={query}
            onUpdateQuery={value => updateQuery(value, paging)}
            onSearch={this.handleSearch}
          />
          <EwAuditTable
            loading={this.state.tableLoading}
            data={this.state.ewList}
            columns={ewAddColumns}
            paging={paging}
            onChange={this.handleDetailPageChange}
            onPageChange={this.handleDetailPageChange}
            rowKey={record => `${record.id}`}
            rowSelection={rowSelection}
          />
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" onClick={this.addEwSave}>
              保存
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.onCancel}>
              取消
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
