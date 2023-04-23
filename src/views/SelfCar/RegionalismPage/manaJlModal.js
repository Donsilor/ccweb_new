import React, { Component } from 'react';
import { Button, Modal, message } from 'antd';
import SimForm from 'components/SimForm';
import { httpCommonClient } from 'common/axios';
import { manaJlColumns } from './Columns';
import EwAuditTable from 'components/EwAuditTable';
import * as FormItems from 'components/CCForm/formItem';
import _get from 'lodash/get';
require('./style.less');
export default class regionalism extends Component {
  state = {
    addEwVisible: true,
    tableLoading: true,
    ewList: [],
    selectedRowKeys: [],
  };
  handleSearch = (formValue, page, pageSize) => {
    httpCommonClient
      .postWithPaging(
        `/self-car/v1.0/selfDistributorAreaManager/find/list`,
        { areaId: this.props.regList.id, ...formValue },
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
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length > 1) {
      message.error('只能添加一个区域经理');
      return;
    }
    httpCommonClient
      .post(`/self-car/v1.0/selfDistributorAreaManager/update`, {
        areaId: this.props.regList.id,
        userId: selectedRowKeys.join(),
      })
      .then(({ data }) => {
        if (data.code === 200) {
          this.props.addEwvisible();
          this.props.searchList();
        } else {
          message.error(data.message);
        }
      });
  };
  render() {
    const { query, updateQuery, paging, regList } = this.props;
    const rowSelection = {
      hideDefaultSelections: 'true',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
      },
      onSelect: record => {},
      getCheckboxProps: record => {
        return {
          defaultChecked: record.accid == (regList.manager ? regList.manager.accid : ''),
        };
      },
    };
    return (
      <div>
        <Modal
          className="manager"
          title="管理区域经理"
          visible={this.state.addEwVisible}
          onCancel={this.onCancel}
          footer={null}
          width={1024}
        >
          <SimForm
            formItemList={[FormItems.JlNameFormItem]}
            query={query}
            onUpdateQuery={value => updateQuery(value, paging)}
            onSearch={this.handleSearch}
          />
          <EwAuditTable
            loading={this.state.tableLoading}
            data={this.state.ewList}
            columns={manaJlColumns}
            paging={paging}
            onChange={this.handleDetailPageChange}
            onPageChange={this.handleDetailPageChange}
            rowKey={record => `${record.id}`}
            rowSelection={rowSelection}
            Pagination={false}
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
