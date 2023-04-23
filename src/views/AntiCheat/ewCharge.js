import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button, Modal } from 'antd';
import { searchEwChargeList, updateEwChargeList } from 'redux/modules/spotEwBlack';
import { httpFormClient, httpBlobClient } from 'common/axios';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { exportFile } from 'common/utils';
import moment from 'moment';
const { confirm } = Modal;
export class ewCharge extends Component {
  state = {
    isExporting: false,
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }
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
      .formSubmit(`/EwChargeLedgerAction_exportEwChargeList`, '', value)
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
      render: (text, record) => {
        if (!record.unassociateFlag) {
          if (record.businessType != 2) {
            return (
              <a
                href="javascript:;"
                onClick={() => {
                  let self = this;
                  confirm({
                    title: '确定要标记解除关联？',
                    onOk() {
                      httpFormClient
                        .formSubmit('/EwChargeLedgerAction_markUnassociate', '', {
                          id: record.id,
                        })
                        .then(({ data = {} }) => {
                          if (data.result === 0) {
                            message.success(data.msg);
                            self.handlePageChange();
                          } else {
                            message.error(data.msg);
                          }
                        });
                    },
                  });
                }}
              >
                解除关联
              </a>
            );
          }
        }
      },
    });
    return columnsList.concat(columns);
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
        </FormArea>
        <div>
          <Button type="primary" loading={this.state.isExporting} icon="export" onClick={this.handleExport}>
            导出明细
          </Button>
          <EwAuditTable
            columns={this.renderColumn()}
            loading={loading}
            data={list}
            paging={paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
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
    title: '经销商',
    dataIndex: 'distributorName',
  },
  {
    title: '二网',
    dataIndex: 'ewName',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
  },
  {
    title: '复审通过时间',
    dataIndex: 'affectTime',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
  {
    title: '首次移动时间',
    dataIndex: 'firstMoveTime',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
  {
    title: '末次任务时间',
    dataIndex: 'lastSpotTime',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
  {
    title: '业务类型',
    dataIndex: 'businessTypeName',
  },
  {
    title: '标记解除关联',
    dataIndex: 'unassociateFlagName',
  },
];
const mapStateToProps = store => ({
  loading: store.spotEwBlack.loading,
  list: store.spotEwBlack.ewCharge.list,
  paging: store.spotEwBlack.ewCharge.paging,
  query: store.spotEwBlack.ewCharge.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(searchEwChargeList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateEwChargeList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ewCharge);
