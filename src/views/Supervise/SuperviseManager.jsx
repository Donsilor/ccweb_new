import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Col, message, Modal, Row } from 'antd';
import { FormArea, ViewWrapper } from '../../layouts/ViewWrapper';
import CCForm from '../../components/CCForm';
import {
  confirmSupervision,
  createSupervision,
  fetchSuperviseLog,
  fetchSuperviseLogRecord,
  updateSuperviseLogQuery,
} from '../../redux/modules/supervise';
import OperationArea from '../../components/OperationArea';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';
import EwAuditTable from '../../components/EwAuditTable';
import * as ColList from '../../components/EwAuditTableColumn/columnItem.jsx';
import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import moment from 'moment';

class SuperviseManager extends Component {
  state = {
    generate: {
      list: [],
      normalCount: [],
      specialCount: [],
      loading: false,
      logRecordId: '',
      paging: { current: 1, pageSize: 10, total: 10 },
      createdTime: '',
      confirmBtn: false,
    },
    showExportModal: false,
    log: {
      logRecordId: '',
      list: [],
      loading: false,
      paging: { current: 1, pageSize: 10, total: 10 },
      createdTime: '',
    },
    showModal: false,
    exportBtnLoading: false,
    normalDealerCnt: '',
    normalVehicleCnt: '',
    specialDealerCnt: '',
    specialVehicleCnt: '',
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };

    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  getColumns() {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.path);

    columns.map(col => {
      if (col.dataIndex === 'action') {
        col.render = (text, record) => {
          return (
            <Fragment>
              <a onClick={this.getLog(record)}>查看</a>
            </Fragment>
          );
        };
      }
    });

    return columns;
  }

  perGenerate = () => {
    this.setState({
      generate: {
        loading: true,
      },
    });

    this.props
      .create()
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          this.setState({
            generate: {
              // list: (payload.data.list && payload.data.list.slice(0, 10)) || [],
              list: [],
              normalCount: payload.data.normalCount || [],
              specialCount: payload.data.specialCount || [],
              loading: true,
              logRecordId: payload.data.logRecordId || '',
              paging: { current: 1, pageSize: 10, total: 10 },
              createdTime: payload.data.createdTime,
            },
          });
          this.getGenerateLog();
        } else {
          message.error(payload.data.msg);
          this.setState({
            generate: {
              loading: false,
            },
          });
        }
      })
      .catch(err => {
        message.error(err.message);
        this.setState({
          generate: {
            loading: false,
          },
        });
      });
  };

  generateConfirm = () => {
    const { generate } = this.state;
    this.props
      .confirm({ id: generate.logRecordId })
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success(payload.data.msg);
          this.setState({
            generate: {
              ...generate,
              confirmBtn: true,
            },
          });
          this.handleSearch(this.props.query.value);
        } else {
          message.error(payload.data.msg);
        }
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  getGenerateLog = (page, pageSize) => {
    const { generate } = this.state;
    this.props
      .fetchLog(
        { logRecordId: generate.logRecordId },
        {
          pageNum: page || generate.paging.current,
          pageSize: pageSize || generate.paging.pageSize,
        }
      )
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          console.log(this.state.log);
          this.setState({
            generate: {
              ...generate,
              list: payload.data.list || [],
              loading: false,
              paging: {
                current: payload.data && payload.data.page && payload.data.page.pageNum,
                pageSize: payload.data && payload.data.page && payload.data.page.pageSize,
                total: payload.data && payload.data.page && payload.data.page.total,
              },
            },
            showModal: true,
          });
          console.log(this.state.log);
        } else {
          message.error(payload.data.msg);
        }
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  getLog = (record, page, pageSize) => () => {
    console.log(record);
    this.setState({
      showExportModal: true,
      log: {
        loading: true,
      },
    });
    const { log } = this.state;
    let logRecordId = '';
    let createdTime = '';
    if (record == null) {
      // 分页时候为null
      logRecordId = log.logRecordId;
      createdTime = log.createdTime;
    } else {
      logRecordId = record.id;
      createdTime = record.createdTime;
      this.setState({
        normalDealerCnt: record.normalDealerCnt,
        normalVehicleCnt: record.normalVehicleCnt,
        specialDealerCnt: record.specialDealerCnt,
        specialVehicleCnt: record.specialVehicleCnt,
      });
    }

    this.props
      .fetchLog(
        { logRecordId: logRecordId },
        {
          pageNum: page || log.paging.current,
          pageSize: pageSize || log.paging.pageSize,
        }
      )
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          console.log(this.state.log);
          this.setState({
            log: {
              list: payload.data.list || [],
              loading: false,
              paging: {
                current: payload.data && payload.data.page && payload.data.page.pageNum,
                pageSize: payload.data && payload.data.page && payload.data.page.pageSize,
                total: payload.data && payload.data.page && payload.data.page.total,
              },
              logRecordId: logRecordId,
              createdTime: createdTime,
            },
          });
          console.log(this.state.log);
        } else {
          message.error(payload.data.msg);
        }
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  logModalPageChange = (page, pageSize) => {
    this.getLog(null, page, pageSize)();
  };

  exportModalCancel = () => {
    this.setState({
      showExportModal: false,
      log: {
        id: '',
        list: [],
        loading: false,
        paging: { current: 1, pageSize: 10, total: 10 },
      },
      showModal: false,
      generate: {
        list: [],
        normalCount: [],
        specialCount: [],
        loading: false,
      },
      normalDealerCnt: '',
      normalVehicleCnt: '',
      specialDealerCnt: '',
      specialVehicleCnt: '',
    });
  };

  getModalColumns = type => {
    let columns = [
      ColList.companyColumn,
      ColList.brandColumn,
      ColList.dealerColumn,
      ColList.vinColumn,
      ColList.isSpecialColumn,
    ];
    return columns;
  };

  export = type => () => {
    this.setState({
      exportBtnLoading: true,
    });

    const { log, generate } = this.state;

    this.props
      .fetchLog(
        { logRecordId: type == 'log' ? log.logRecordId : generate.logRecordId },
        {
          pageNum: 1,
          pageSize: 10000,
        }
      )
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          const list = payload.data.list || [];
          let fileDate = '';
          if (type == 'log') {
            fileDate = moment.unix(new Date(log.createdTime).getTime() / 1000).format('YYYYMMDD');
          } else {
            fileDate = moment.unix(new Date(Date.now()).getTime() / 1000).format('YYYYMMDD');
          }
          this.exportExcel(list, fileDate);
        } else {
          message.error(payload.data.msg);
          this.setState({
            exportBtnLoading: false,
          });
        }
      })
      .catch(err => {
        message.error(err.message);
        this.setState({
          exportBtnLoading: false,
        });
      });
  };

  exportExcel(list, fileDate) {
    let aoa = [['抽查日期', '监管公司', '品牌', '经销商名称', '车架号', '是否特殊名单']];
    list.map(item => {
      aoa.push([fileDate, item.company, item.brand, item.dealer, item.vin, item.isSpecial === 1 ? '是' : '否']);
    });

    // const fileName = moment.unix(new Date(Date.now()).getTime() / 1000).format('YYYYMMDD') + '抽查名单.xlsx';
    const sheet = XLSX.utils.aoa_to_sheet(aoa);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, sheet, '抽查名单');
    const workBookOut = XLSX.write(workBook, { type: 'binary', bookType: 'xlsx' });
    saveAs(new Blob([this.s2ab(workBookOut)], { type: 'application/octet-stream' }), fileDate + '抽查名单.xlsx');
    this.setState({
      exportBtnLoading: false,
    });
  }

  s2ab(s) {
    // 字符串转字符流
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  render() {
    const { match, query } = this.props;
    const { log, generate, exportBtnLoading } = this.state;
    return (
      <ViewWrapper>
        <OperationArea>
          <Button
            type="primary"
            icon="plus"
            className="customBtn"
            onClick={this.perGenerate}
            loading={generate.loading}
          >
            预生成抽查记录
          </Button>
        </OperationArea>

        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        </FormArea>

        <div>
          <EwAuditTable
            columns={this.getColumns()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>

        <Modal
          visible={this.state.showExportModal}
          footer={null}
          width={1202}
          onCancel={this.exportModalCancel}
          destroyOnClose
        >
          <Row style={{ margin: '15px 0' }}>
            <Col span={11} style={{ border: '2px solid #1D9F2A', padding: 15, 'border-radius': 10 }}>
              <Row>本次普通抽查情况</Row>
              <Row>
                <Col span={4}>经销商数：</Col>
                <Col span={20}>{this.state.normalDealerCnt}</Col>
              </Row>
              <Row>
                <Col span={4}>车辆数：</Col>
                <Col span={20}>{this.state.normalVehicleCnt}</Col>
              </Row>
            </Col>
            <Col span={2} />
            <Col span={11} style={{ border: '2px solid #1D9F2A', padding: 15, 'border-radius': 10 }}>
              <Row>
                <Col span={12}>特殊名单抽查情况</Col>
              </Row>
              <Row>
                <Col span={4}>经销商数：</Col>
                <Col span={20}>{this.state.specialDealerCnt}</Col>
              </Row>
              <Row>
                <Col span={4}>车辆数：</Col>
                <Col span={20}>{this.state.specialVehicleCnt}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <div style={{ float: 'right', marginBottom: 24, marginRight: 24 }} key="toggleForm">
              <Button type="primary" htmlType="submit" onClick={this.export('log')} loading={exportBtnLoading}>
                导出
              </Button>
            </div>
          </Row>
          <EwAuditTable
            columns={this.getModalColumns('export')}
            loading={log.loading}
            data={log.list}
            paging={log.paging}
            onChange={this.logModalPageChange}
            onPageChange={this.logModalPageChange}
            scroll={{ x: 800 }}
          />
        </Modal>

        <Modal
          visible={this.state.showModal}
          footer={null}
          width={1200}
          onCancel={this.exportModalCancel}
          destroyOnClose
        >
          <Row style={{ margin: '15px 0' }}>
            <Col span={11} style={{ border: '2px solid #1D9F2A', padding: 15, 'border-radius': 10 }}>
              <Row>本次普通抽查情况</Row>
              <Row>
                <Col span={4}>经销商数：</Col>
                <Col span={20}>{generate.normalCount && generate.normalCount[0]}</Col>
              </Row>
              <Row>
                <Col span={4}>车辆数：</Col>
                <Col span={20}>{generate.normalCount && generate.normalCount[1]}</Col>
              </Row>
            </Col>
            <Col span={2} />
            <Col span={11} style={{ border: '2px solid #1D9F2A', padding: 15, 'border-radius': 10 }}>
              <Row>
                <Col span={12}>特殊名单抽查情况</Col>
              </Row>
              <Row>
                <Col span={4}>经销商数：</Col>
                <Col span={20}>{generate.specialCount && generate.specialCount[0]}</Col>
              </Row>
              <Row>
                <Col span={4}>车辆数：</Col>
                <Col span={20}>{generate.specialCount && generate.specialCount[1]}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={14}> </Col>
            <Col span={10}>
              <div style={{ float: 'right', marginBottom: 24, marginRight: 24 }} key="toggleForm">
                <Button type="primary" htmlType="submit" onClick={this.generateConfirm} disabled={generate.confirmBtn}>
                  确认生成
                </Button>
                <Button style={{ marginLeft: 24 }} type="primary" htmlType="submit" onClick={this.export('generate')}>
                  导出
                </Button>
              </div>
            </Col>
          </Row>
          <EwAuditTable
            columns={this.getModalColumns('add')}
            loading={generate.loading}
            data={generate.list}
            paging={generate.paging}
            onChange={this.getGenerateLog}
            onPageChange={this.getGenerateLog}
            scroll={{ x: 800 }}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}

function mapStateToProps(store) {
  return {
    loading: store.supervise.loading,
    list: store.supervise.logRecord.list,
    paging: store.supervise.logRecord.paging,
    query: store.supervise.logRecordQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchSuperviseLogRecord(data, paging)),
    updateQuery: data => dispatch(updateSuperviseLogQuery(data)),
    fetchLog: (data, paging) => dispatch(fetchSuperviseLog(data, paging)),
    create: () => dispatch(createSupervision()),
    confirm: data => dispatch(confirmSupervision(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperviseManager);
