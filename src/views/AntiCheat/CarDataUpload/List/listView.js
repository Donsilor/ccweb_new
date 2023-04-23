import React, { Component, Fragment } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Button, message, Modal } from 'antd';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import { httpCommonClient } from 'common/axios';
const { confirm } = Modal;
export default class listView extends Component {
  state = {
    brandList: [],
    bankList: [],
    values: {},
  };
  columns = [
    this.props.fileType != '1' ? { title: '银行名称', dataIndex: 'bankName' } : {},
    this.props.fileType == '3'
      ? { title: '经销商名称', dataIndex: 'custname' }
      : { title: '经销商名称', dataIndex: 'distributorName' },
    {
      title: '品牌',
      dataIndex: 'tradername',
    },
    { title: '银行车架号', dataIndex: 'chassis' },
    {
      title: '还款时间',
      dataIndex: 'businessdate',
    },
    this.props.fileType == '2'
      ? {
        title: '状态',
        dataIndex: 'flagName',
      }
      : {
        title: '状态',
        dataIndex: 'statusName',
      },
    this.props.fileType == '2'
      ? {
        title: '品牌',
        dataIndex: 'brandName',
      }
      : {},
    { title: '录入时间', dataIndex: 'lrtime' },
    this.props.fileType == '2'
      ? { title: '最后处理时间', dataIndex: 'handleTime' }
      : { title: '最后处理时间', dataIndex: 'handletime' },
    {
      title: '导入方式',
      dataIndex: 'dataSource',
      render: (text) => {
        if (text == 'sync') {
          return '数据同步';
        } else if (text == 'manual') {
          return '手动导入';
        } else if (text == 'sync_cyt') {
          return '车银通对接';
        }
      },
    },
    { title: '备注', dataIndex: 'moveFailureReason', render: (text, item) => `${item.remark}${this.props.fileType == '2' ? text && '，' + text : ''}` },
  ];
  componentDidMount() {
    this.handleSearch();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch({}, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    this.props.fetch(
      { ...this.state.values, fileType: this.props.fileType },
      {
        pageNum: page || 1,
        pageSize: pageSize || 10,
      }
    );
  };
  render() {
    const { match, list, loading, query, fileType } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={query => {
              this.setState({ values: query.value });
            }}
            width={fileType != 2 ? true : false}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.columns}
            loading={loading}
            data={list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
        {fileType == '1' && <OperationArea>
          <Button
            type="primary"
            onClick={() => {
              let self = this;
              confirm({
                title: '请确认是否导入待处理车辆入库?',
                onOk() {
                  httpCommonClient.post(`/BanklinkAction_manualHandleBankCar`).then(({ data = {} }) => {
                    if (data.result === 0) {
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
            导入待处理车辆入库
          </Button>
        </OperationArea>}
      </ViewWrapper>
    );
  }
}
