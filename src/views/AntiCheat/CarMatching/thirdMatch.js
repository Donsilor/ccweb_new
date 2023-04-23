import React, { Component, Fragment } from 'react';
import { Modal, message, Button, Spin, Divider } from 'antd';
import { connect } from 'react-redux';
import OperationArea from 'components/OperationArea';
import { getThirdMatch, updateThirdMatch } from 'redux/modules/carMatching';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import { thirdColumns } from './Columns';
import ThirdModal from './thirdModal';
const { confirm } = Modal;
class thirdMatch extends Component {
  state = {
    isExporting: false,
    modVisible: false,
    record: {},
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const value = { ...formValues };
    const { importDate, hxDate } = formValues;
    if (importDate) {
      const [startTime, endTime] = importDate;
      value.importStartDate = startTime && startTime.format('YYYY/MM/DD');
      value.importEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.importDate;
    }
    if (hxDate) {
      const [startTime, endTime] = hxDate;
      value.startDate = startTime && startTime.format('YYYY/MM/DD');
      value.endDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.hxDate;
    }
    this.props.fetch(value, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  //导出
  handleExport = () => {
    if (!this.props.list.length) {
      message.error('暂无数据,无法导出');
      return;
    }
    const hide = message.loading('导出中，请稍后。。。', 0);
    this.setState({
      isExporting: true,
    });
    const { value } = this.props.query;
    const { importDate, hxDate } = value;
    if (importDate) {
      const [startTime, endTime] = importDate;
      value.importStartDate = startTime && startTime.format('YYYY/MM/DD');
      value.importEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.importDate;
    }
    if (hxDate) {
      const [startTime, endTime] = hxDate;
      value.startDate = startTime && startTime.format('YYYY/MM/DD');
      value.endDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.hxDate;
    }
    httpBufferClient
      .submit('/warning/v1.0/matching/outbound/export', value)
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
  //列表操作
  renderColumn = () => {
    const columns = [];
    columns.push({
      title: '操作',
      fixed: 'right',
      render: record =>
        record.statusCode == 'assign_status_1' ? (
          <div>
            <a
              href="javascript:;"
              style={{ textAlign: 'center' }}
              onClick={() => {
                this.setState({
                  record: { ...record, amountCheck: 1, title: '手工分配', type: 'matchBill' },
                  modVisible: true,
                });
              }}
            >
              手工分配
            </a>
            <Divider type="vertical" key="Divider" />
            <a
              href="javascript:;"
              style={{ textAlign: 'center' }}
              onClick={() => {
                this.setState({
                  record: { ...record, amountCheck: 0, title: '强制分配', type: 'forceMatchBill' },
                  modVisible: true,
                });
              }}
            >
              强制分配
            </a>
            <Divider type="vertical" key="Divider2" />
            <a
              href="javascript:;"
              onClick={() => {
                let self = this;
                confirm({
                  title: '请确认是否无需分配?',
                  onOk() {
                    httpCommonClient
                      .post(`/warning/v1.0/matching/outbound/noMatch`, { id: record.id })
                      .then(({ data = {} }) => {
                        if (data.code === 200) {
                          message.success(data.message);
                          self.handlePageChange();
                        } else {
                          message.error(data.message);
                        }
                      });
                  },
                });
              }}
            >
              无需分配
            </a>
          </div>
        ) : (
          <div>
            <a
              href="javascript:;"
              onClick={() => {
                this.setState({
                  record: { ...record, amountCheck: 1, title: '重新分配', type: 'rematchBill' },
                  modVisible: true,
                });
              }}
            >
              重新分配
            </a>
            <Divider type="vertical" key="Divider1" />
            <a
              href="javascript:;"
              onClick={() => {
                let self = this;
                confirm({
                  title: '请确认是否取消分配?',
                  onOk() {
                    httpCommonClient
                      .post(`/warning/v1.0/matching/outbound/cancelMatched`, { id: record.id })
                      .then(({ data = {} }) => {
                        if (data.code === 200) {
                          message.success(data.message);
                          self.handlePageChange();
                        } else {
                          message.error(data.message);
                        }
                      });
                  },
                });
              }}
            >
              取消分配
            </a>
          </div>
        ),
    });
    return thirdColumns.concat(columns);
  };
  render() {
    const { match, query, list, loading } = this.props;
    const { modVisible, record, isExporting } = this.state;
    return (
      <ViewWrapper>
        <Spin spinning={isExporting} style={{ position: 'fixed' }}>
          <FormArea>
            <CCForm
              onSearch={this.handleSearch}
              path={match.path}
              query={query}
              onUpdateQuery={this.props.updateQuery}
              enableExport={true}
              onExport={this.handleExport}
              isExporting={isExporting}
            />
          </FormArea>
          <div>
            <EwAuditTable
              columns={this.renderColumn()}
              loading={loading}
              data={list}
              paging={this.props.paging}
              onChange={this.handlePageChange}
              onPageChange={this.handlePageChange}
            />
          </div>
          {modVisible && (
            <ThirdModal
              searchList={() => this.handlePageChange()}
              onCancel={() => this.setState({ modVisible: false })}
              record={record}
            />
          )}
          <OperationArea>
            <Button
              loading={isExporting}
              type="primary"
              onClick={() => {
                let self = this;
                confirm({
                  title: '请确认是否一键解析?',
                  onOk() {
                    const hide = message.loading('一键解析中，请稍后。。。', 0);
                    self.setState({
                      isExporting: true,
                    });
                    httpCommonClient
                      .post('/warning/v1.0/matching/outbound/batchAnalysisBill', {})
                      .then(({ data = {} }) => {
                        if (data.code === 200) {
                          message.success(data.message);
                          self.handlePageChange();
                        } else {
                          message.error(data.message);
                        }
                      })
                      .then(res => {
                        self.setState({
                          isExporting: false,
                        });
                        hide();
                      });
                  },
                });
              }}
            >
              一键解析
            </Button>
            <Button
              loading={isExporting}
              type="primary"
              onClick={() => {
                let self = this;
                confirm({
                  title: '请确认是否一键分配?',
                  onOk() {
                    const hide = message.loading('一键分配中，请稍后。。。', 0);
                    self.setState({
                      isExporting: true,
                    });
                    const value = { ...self.props.query.value };
                    const { importDate, hxDate } = value;
                    if (importDate) {
                      const [startTime, endTime] = importDate;
                      value.importStartDate = startTime && startTime.format('YYYY/MM/DD');
                      value.importEndDate = endTime && endTime.format('YYYY/MM/DD');
                      delete value.importDate;
                    }
                    if (hxDate) {
                      const [startTime, endTime] = hxDate;
                      value.startDate = startTime && startTime.format('YYYY/MM/DD');
                      value.endDate = endTime && endTime.format('YYYY/MM/DD');
                      delete value.hxDate;
                    }
                    httpCommonClient
                      .post('/warning/v1.0/matching/outbound/batchMatchBill', value)
                      .then(({ data = {} }) => {
                        if (data.code === 200) {
                          message.success(data.message);
                          self.handlePageChange();
                        } else {
                          message.error(data.message);
                        }
                      })
                      .then(res => {
                        self.setState({
                          isExporting: false,
                        });
                        hide();
                      });
                  },
                });
              }}
            >
              一键分配
            </Button>
            <Button
              loading={isExporting}
              type="primary"
              onClick={() => {
                let self = this;
                confirm({
                  title: '请确认是否一键推送?',
                  onOk() {
                    const hide = message.loading('一键推送中，请稍后。。。', 0);
                    self.setState({
                      isExporting: true,
                    });
                    httpCommonClient
                      .post('/warning/v1.0/matching/outbound/syncOutbound', { billbrand: 11 })
                      .then(({ data = {} }) => {
                        if (data.code === 200) {
                          message.success(data.message);
                          self.handlePageChange();
                        } else {
                          message.error(data.message);
                        }
                      })
                      .then(res => {
                        self.setState({
                          isExporting: false,
                        });
                        hide();
                      });
                  },
                });
              }}>
              一键推送
            </Button>
          </OperationArea>
        </Spin>
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.carMatching.loading,
  list: store.carMatching.thirdMatch.list,
  paging: store.carMatching.thirdMatch.paging,
  query: store.carMatching.thirdMatch.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getThirdMatch(data, paging)),
    updateQuery: data => {
      dispatch(updateThirdMatch({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(thirdMatch);
