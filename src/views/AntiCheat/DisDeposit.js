import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button, Modal } from 'antd';
import {
  searchDisDepositList,
  updateDisDepositList,
  updateDisOddList,
  updateDisFlowList,
} from 'redux/modules/spotEwBlack';
import { httpFormClient, httpBlobClient } from 'common/axios';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import ModalForm from 'components/ModalForm';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { exportFile } from 'common/utils';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD';
const { confirm } = Modal;
export class disDeposit extends Component {
  state = {
    isExporting: false,
    modVisible: false,
    outVisible: false,
    record: null,
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
  handleCancel = () => {
    this.setState({
      modVisible: false,
      outVisible: false,
    });
  };
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  //列表查询
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  //导出
  handleExport = () => {
    if (!this.props.list) {
      message.error('暂无数据,无法导出');
      return;
    }
    const hide = message.loading('导出中，请稍后。。。', 0);
    const { value } = this.props.query;
    this.setState({
      isExporting: true,
    });
    httpBlobClient
      .formSubmit(`/BondPrintAction_exportDistributorDepositList`, '', value)
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
      render: (text, record) => (
        <div>
          <a
            onClick={() => {
              this.props.setDetailOddQuery();
              this.props.history.push({
                pathname: `/disDeposit/detail/${record.id}`,
                state: { total: record.fixedDeposit + record.currentDeposit },
              });
            }}
          >
            查看
          </a>
          &nbsp;&nbsp;
          <a
            href="javascript:;"
            onClick={() => {
              this.setState({ record, modVisible: true });
            }}
          >
            补录转入
          </a>
          &nbsp;&nbsp;
          <a
            href="javascript:;"
            onClick={() => {
              this.props.setDetailFlowQuery();
              this.props.history.push(`/disDeposit/flow/${record.id}`);
            }}
          >
            交易明细
          </a>
          &nbsp;&nbsp;
          <a
            href="javascript:;"
            onClick={() => {
              this.setState({ record, outVisible: true });
            }}
          >
            利息转出
          </a>
        </div>
      ),
    });
    return columnsList.concat(columns);
  };
  updOrderExpSubmitOk = () => {
    this.setState({ modVisible: false, outVisible: false });
    this.handleSearch(this.props.query.value);
  };
  updOrderExpSubmit = (formData, record) => {
    return httpFormClient
      .formSubmit('/BondPrintAction_additionalRecordingDeposit', '', {
        id: record.id,
        ...formData,
        oddAmout: formData.oddAmout.replace(/,/g, ''),
        interestStartDate: moment(formData.interestStartDate).format(TIME_FORMAT),
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: data.msg || '操作失败，请重试',
            },
          });
        }
      });
  };
  render() {
    const { match, query, loading, list, paging } = this.props;
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
          <Button type="primary" loading={this.state.isExporting} icon="export" onClick={this.handleExport}>
            导出明细
          </Button>
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={loading}
            data={list}
            paging={paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
        {/*补录转入*/}
        {this.state.modVisible && (
          <ModalForm
            title="补录转入"
            onOk={this.updOrderExpSubmitOk}
            onCancel={this.handleCancel}
            onSubmit={this.updOrderExpSubmit}
            record={this.state.record}
            configList={[
              {
                label: '品牌',
                type: 'label',
                value: this.state.record.brandName,
              },
              {
                label: '单号类型',
                type: 'select',
                key: 'oddType',
                required: true,
                optionList: [{ name: `定期`, value: 1 }, { name: `活期`, value: 2 }],
              },
              {
                label: '保证金金额(元)',
                type: 'input',
                key: 'oddAmout',
                required: true,
              },
              {
                label: '维护单号',
                type: 'input',
                key: 'oddNum',
                rules: [
                  {
                    required: true,
                    message: '请填写单号！',
                  },
                  { pattern: /^\d{6}$/, message: '单号应为6位数字' },
                ],
              },
              {
                label: '开始计息日期',
                type: 'datePicker',
                key: 'interestStartDate',
                required: true,
              },
            ]}
          />
        )}
        {/*利息转出*/}
        {this.state.outVisible && (
          <ModalForm
            width={560}
            title={
              <div>
                <div>利息转出</div>
                <div style={{ fontSize: '14px', color: 'red', fontWeight: 'normal', marginTop: '5px' }}>
                  注意：本次操作只是利息转出，如要转出本金，请重新发起续作流程
                </div>
              </div>
            }
            onOk={this.updOrderExpSubmitOk}
            onCancel={this.handleCancel}
            onSubmit={(formData, record) => {
              return httpFormClient
                .formSubmit('/BondPrintAction_transferOutInterest', '', {
                  id: record.id,
                  oddNum: formData.oddNum,
                  oddAmout: formData.oddAmoutOut.replace(/,/g, ''),
                  transferOutInterestDate: moment(formData.transferOutInterestDate).format(TIME_FORMAT),
                })
                .then(({ data = {} }) => {
                  if (data.result === 0) {
                    return Promise.resolve({
                      data: {
                        result: 0,
                      },
                    });
                  } else {
                    return Promise.resolve({
                      data: {
                        result: 1,
                        msg: data.msg || '操作失败，请重试',
                      },
                    });
                  }
                });
            }}
            record={this.state.record}
            configList={[
              {
                label: '品牌',
                type: 'label',
                value: this.state.record.brandName,
              },
              {
                label: '转出利息金额(元)',
                type: 'input',
                key: 'oddAmoutOut',
                required: true,
              },
              {
                label: '维护单号',
                type: 'input',
                key: 'oddNum',
                rules: [
                  {
                    required: true,
                    message: '请填写单号！',
                  },
                  { pattern: /^\d{6}$/, message: '单号应为6位数字' },
                ],
              },
              {
                label: '转出利息日期',
                type: 'datePicker',
                key: 'transferOutInterestDate',
                required: true,
              },
            ]}
          />
        )}
      </ViewWrapper>
    );
  }
}
const columnsList = [
  {
    title: '银行名称',
    dataIndex: 'bankName',
  },
  {
    title: '经销商名称',
    dataIndex: 'distributorName',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '保证金账号',
    dataIndex: 'bondAccount',
  },
  {
    title: '保证金分账号',
    dataIndex: 'pointsAccount',
  },
  {
    title: '定期保证金（元）',
    dataIndex: 'fixedDeposit',
    render: text => text && text.toFixed(2),
  },
  {
    title: '活期保证金（元）',
    dataIndex: 'currentDeposit',
  },
  {
    title: '保证金汇总（元）',
    dataIndex: 'totalDeposit',
    render: (text, record) => (record.fixedDeposit + record.currentDeposit).toFixed(2),
  },
];
const mapStateToProps = store => ({
  loading: store.spotEwBlack.loading,
  list: store.spotEwBlack.disDeposit.list,
  paging: store.spotEwBlack.disDeposit.paging,
  query: store.spotEwBlack.disDeposit.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(searchDisDepositList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateDisDepositList(data));
    },
    setDetailOddQuery: () => {
      const query = {
        value: {},
        expandForm: false,
        aitiForm: true,
      };
      return dispatch(updateDisOddList(query));
    },
    setDetailFlowQuery: () => {
      const query = {
        value: {},
        expandForm: false,
        aitiForm: true,
      };
      return dispatch(updateDisFlowList(query));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(disDeposit);
