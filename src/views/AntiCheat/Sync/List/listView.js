import React, { Component } from 'react';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { Button, message, Modal, Table } from 'antd';
import CCForm from 'components/CCForm';
import ModalForm from 'components/ModalForm';
import OperationArea from 'components/OperationArea';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
export default class listView extends Component {
  state = {
    value: {},
    showModal: false,
    isExporting: false,
    list: []
  };
  componentDidMount() {
    this.handleSearch();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch({}, page, pageSize);
  };
  formValues = () => {
    const { match } = this.props;
    const values = this.state.value;
    const { createDate, putintime, repaydate } = values;
    if (createDate) {
      const [startTime, endTime] = createDate;
      values.createStartDate = startTime && startTime.format('YYYY/MM/DD');
      values.createEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete values.createDate;
    }
    if (putintime) {
      const [startTime, endTime] = putintime;
      values.putintimeStart = startTime && startTime.format('YYYY/MM/DD');
      values.putintimeEnd = endTime && endTime.format('YYYY/MM/DD');
      delete values.putintime;
    }
    if (repaydate) {
      const [startTime, endTime] = repaydate;
      values.repaydateStart = startTime && startTime.format('YYYY/MM/DD');
      values.repaydateEnd = endTime && endTime.format('YYYY/MM/DD');
      delete values.repaydate;
    }
    if (match.path.includes('carIn')) {
      values.carType = 'sync_car_type_1'
    }
    if (match.path.includes('carOut')) {
      values.carType = 'sync_car_type_2'
    }
    return values
  }
  handleSearch = (formValues, page, pageSize) => {
    this.props.fetch(this.formValues(),
      {
        pageNum: page || 1,
        pageSize: pageSize || 10,
      }
    );
  };
  itemSearch = (record) => {
    this.setState({ isExporting: true })
    httpCommonClient.post(`/warning/v1.0/sync/show/list/distributor/accounting/detail`,
      { accountingId: record.id })
      .then(({ data = {} }) => {
        if (data.code === 200) {
          this.setState({ list: data.data })
        } else {
          message.error(data.message)
        }
        this.setState({ isExporting: false })
      });
  };
  //导出
  handleExport = () => {
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    httpBufferClient
      .submit(this.props.exportUrl, this.formValues())
      .then(payload => {
        const result = exportFile(payload);
        result && message.warning(result, 2.5);
      })
      .then(res => {
        this.setState({
          isExporting: false,
        });
        hide();
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  render() {
    const { paging, match, list, loading, query, columns, isExporting } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={query => {
              let values = query.value
              for (let i in values) {
                if (values[i] && typeof values[i] == 'string') {
                  values[i] = values[i].trim()
                }
              }
              this.setState({ value: values });
            }}
            enableExport={true}
            onExport={this.handleExport}
            isExporting={isExporting}
            width={['/carSync/carSend', '/carSync/carReturn', '/carSync/disAccounting', '/carSync/disExposure'].includes(match.path) ? true : false}
          />
        </FormArea>
        <EwAuditTable
          columns={[...columns,
          match.path.includes('disAccounting') ? {
            fixed: 'right',
            title: '操作',
            render: (text, record) => (
              <a
                href="javascript:;"
                onClick={() => {
                  this.itemSearch(record)
                  this.setState({ showModal: true })
                }}
              >
                查看明细
              </a>
            ),
          } : []]}
          loading={loading}
          data={list}
          paging={paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
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
        {match.path.includes('carSend') && <OperationArea>
          <Button
            type="primary"
            onClick={() => this.setState({ modModal: true })}
          >
            获取发车明细
          </Button>
        </OperationArea>}
        {match.path.includes('carReturn') && <OperationArea>
          <Button
            type="primary"
            onClick={() => this.setState({ modModal: true })}
          >
            获取退货明细
          </Button>
        </OperationArea>}
        {/*获取 发车/退货 明细*/}
        {this.state.modModal && (
          <ModalForm
            title={`获取明细`}
            onOk={() => {
              this.setState({ modModal: false })
              this.handleSearch()
            }}
            onCancel={() => this.setState({ modModal: false })}
            onSubmit={formData => {
              return httpCommonClient
                .post(`/warning/v1.0/sync/show/list${match.path.includes('carReturn') ? '/return' : ''}`, formData)
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
                        msg: data.message,
                      },
                    });
                  }
                });
            }}
            configList={[
              {
                label: '车架号',
                type: 'input',
                key: 'vin',
              }]}
          />
        )}
      </ViewWrapper>
    );
  }
}
const columnsItem = [
  { title: '票号', dataIndex: 'billloanno' },
  { title: '业务编号', dataIndex: 'bizno' },
  { title: '创建时间', dataIndex: 'createtime' },
  { title: '到期日', dataIndex: 'enddate' },
  { title: '借款金额', dataIndex: 'paperamount' },
  { title: '币种', dataIndex: 'paperccycode' },
  { title: '起始日期', dataIndex: 'startdate' },
  { title: '处理状态', dataIndex: 'status', render: (text) => text == '1' ? '已处理' : '待处理' },
  { title: '备注', dataIndex: 'remark' },
];