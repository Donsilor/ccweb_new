import React, { Component, Fragment } from 'react';
import { Button, Divider, Icon, message, Modal, Table } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { exportFile } from 'common/utils';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';
import { httpFormClient, httpBlobClient } from 'common/axios';
import { errColumns, shootColumns, columnsSpotform, normalColumns, moveColumns } from './Columns';
import moment from 'moment';
import { formatTime } from 'common/utils';
import SpotTreeModal from './SpotTreeModal';
const FORMAT = 'YYYY-MM-DD';
export default class Ledger extends Component {
  state = {
    showModalErr: false, //异常表
    showModal: false, //抽查表
    tableLoading: true,
    buttflag: true, //导出可点击状态
    list: [],
    ModalTit: '',
    columnsName: [], //异常明细表头
    spotTestType: 0,
    bookTime: '',
    type: 0,
    spotColumnsName: [], //抽查明细表头
    current: 1,
    pageSize: 10,
    total: 0,
    record: {},
  };
  onCancel = () => {
    this.setState({
      showModal: false,
      showModalErr: false,
      tableLoading: true,
      buttflag: true,
      list: [],
    });
  };
  reformatValue = formValues => {
    const values = { ...formValues };
    try {
      const { disApplyTimeRange } = formValues;
      if (disApplyTimeRange) {
        const [beginTime, endTime] = disApplyTimeRange;
        values.beginTime = beginTime && beginTime.format(FORMAT);
        values.endTime = endTime && endTime.format(FORMAT);
        delete values.disApplyTimeRange;
      }
    } catch (e) {
      console.error(e);
    }
    return values;
  };
  //列表查询
  handleSearch = (formValues, page, pageSize) => {
    this.props.fetch(this.reformatValue(formValues), {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //列表导出
  handleExport = () => {
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({ buttflag: false });
    this.form.updateQuery();
    this.props
      .export(this.reformatValue(this.props.query.value))
      .then(({ payload }) => {
        const result = exportFile(payload);
        result && message.warning(result, 2.5);
      })
      .then(() => {
        hide();
        this.setState({ buttflag: true });
      })
      .catch(err => {
        console.error(err.message);
      });
  };
  //列表操作
  renderColumn = () => {
    const columns = columnsSpotform(this.handleSearchDetail);
    columns.push({
      title: '操作',
      fixed: 'right',
      width: 120,
      render: (text, record) => (
        <Fragment>
          {record.spotTestTypeName !== '平台抽查' && (
            <a href="javascript:;" onClick={this.showTreeModal(record)}>
              树状图
            </a>
          )}
          {record.spotTestTypeName !== '平台抽查' && <Divider type="vertical" />}
          {record.spotTestTypeName !== '移动抽查' && (
            <a href="javascript:;" onClick={this.showDetailModal(record, '异常明细表')}>
              异常明细表
            </a>
          )}
          {record.spotTestTypeName !== '移动抽查' && <Divider type="vertical" />}
          {record.spotTestTypeName === '自动抽查' && (
            <a href="javascript:;" onClick={this.showDetailModal(record, '拍摄时间统计表')}>
              拍摄时间统计表
            </a>
          )}
        </Fragment>
      ),
    });
    return columns;
  };
  // 树状图弹窗
  showTreeModal = record => () => {
    this.setState({
      showSpotTask: true,
      record,
    });
  };
  //异常明细表弹窗
  showDetailModal = (record, tit) => () => {
    this.setState({
      showModalErr: true,
      ModalTit: tit,
      columnsName: tit == '异常明细表' ? errColumns : shootColumns,
    });
    let url = tit == '异常明细表' ? '/SpotStatAction_getSpotExcDetailStatList' : '/SpotStatAction_getTakeTimeStat';
    httpFormClient
      .formSubmit(url, '', {
        bookTime: formatTime(record.bookTime),
        spotTestType: record.spotTestType,
      })
      .then(respone => {
        this.setState({
          list: tit == '异常明细表' ? respone.data.list : [respone.data.takeTimeStat],
          tableLoading: false,
        });
      });
  };
  handleDetailPageChange = (page, pageSize) => {
    this.handleSearchDetail(
      this.state.record,
      this.state.spotTestType,
      this.state.bookTime,
      true,
      this.state.type,
      page,
      pageSize
    );
  };
  //抽查明细表查询
  handleSearchDetail = (record, spotTestType, bookTime, value, type, page, pageSize) => {
    if (!value) return;
    this.setState({ showModal: true, record: record });
    let data = {
      pageNum: page || 1,
      pageSize: pageSize || 10,
      bookTime: page ? this.state.bookTime : moment.unix(bookTime.time / 1000).format(FORMAT),
      spotTestType: spotTestType,
    };
    if (type) {
      data.status = type;
    }
    let url = spotTestType == 5 ? '/SpotStatAction_getMoveDetailList' : '/SpotStatAction_getSpotDetailList';
    httpFormClient.formSubmit(url, '', data).then(respone => {
      this.setState({
        spotTestType: spotTestType,
        bookTime: data.bookTime,
        type: type,
        spotColumnsName: spotTestType == 5 ? moveColumns : normalColumns,
        list: respone.data.list || [],
        tableLoading: false,
        current: respone.data.page.pageNum,
        pageSize: respone.data.page.pageSize,
        total: respone.data.page.total,
      });
    });
  };
  //抽查明细表导出
  spotHandleExport = () => {
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({ buttflag: false });
    let url =
      this.state.spotTestType == 5 ? '/SpotStatAction_exportMoveDetailList' : '/SpotStatAction_exportSpotDetailList';
    let data = {
      bookTime: this.state.bookTime,
      spotTestType: this.state.spotTestType,
    };
    if (this.state.type) {
      data.status = this.state.type;
    }
    httpBlobClient
      .formSubmit(url, '', data)
      .then(respone => {
        const result = exportFile(respone);
        result && message.warning(result, 2.5);
      })
      .then(() => {
        hide();
        this.setState({ buttflag: true });
      });
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  render() {
    const { match, query } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            wrappedComponentRef={form => (this.form = form)}
          />
        </FormArea>
        <OperArea>
          <Button disabled={!this.state.buttflag} type="primary" icon="export" onClick={this.handleExport}>
            导出报表
          </Button>
        </OperArea>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={record => `${formatTime(record.bookTime)},${record.spotTestType}`}
            bordered
          />
        </div>
        {/*异常明细表*/}
        <Modal
          title={this.state.ModalTit}
          visible={this.state.showModalErr}
          onCancel={this.onCancel}
          width={1100}
          footer={null}
          destroyOnClose
        >
          <div>
            <Table
              dataSource={this.state.list || []}
              columns={this.state.columnsName}
              rowKey={record => `${record.totUploadLt30m},${record.rowTitle}`}
              pagination={false}
              loading={this.state.tableLoading}
              bordered
              scroll={{ x: true }}
            />
          </div>
        </Modal>
        <Modal
          title={`${this.state.record.spotTestTypeName}明细表`}
          visible={this.state.showModal}
          onCancel={this.onCancel}
          footer={null}
          width={1024}
        >
          <Button disabled={!this.state.buttflag} type="primary" icon="export" onClick={this.spotHandleExport}>
            导出报表
          </Button>
          <EwAuditTable
            loading={this.state.tableLoading}
            data={this.state.list}
            columns={this.state.spotColumnsName}
            paging={{ current: this.state.current, pageSize: this.state.pageSize, total: this.state.total }}
            onChange={this.handleDetailPageChange}
            onPageChange={this.handleDetailPageChange}
            rowKey={record => `${record.ewId},${formatTime(record.taskSendTime)},${record.chassis}`}
          />
        </Modal>
        {this.state.showSpotTask && (
          <SpotTreeModal
            onCancel={() => {
              this.setState({
                showSpotTask: false,
              });
            }}
            record={this.state.record}
          />
        )}
      </ViewWrapper>
    );
  }
}
