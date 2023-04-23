import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { getCollectMatch, updateCollectMatch } from 'redux/modules/carMatching';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import ModalForm from 'components/ModalForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import { collectColumns } from './Columns';
class collect extends Component {
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
    const values = { ...formValues, billBrand: 11 };
    const { importDate, invoiceDate, dueDate } = formValues;
    if (importDate) {
      const [startTime, endTime] = importDate;
      values.importStartDate = startTime && startTime.format('YYYY/MM/DD');
      values.importEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete values.importDate;
    }
    if (invoiceDate) {
      const [startTime, endTime] = invoiceDate;
      values.invoiceStartDate = startTime && startTime.format('YYYY/MM/DD');
      values.invoiceEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete values.invoiceDate;
    }
    if (dueDate) {
      const [startTime, endTime] = dueDate;
      values.dueStartDate = startTime && startTime.format('YYYY/MM/DD');
      values.dueEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete values.dueDate;
    }
    this.props.fetch(values, {
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
    const { importDate, invoiceDate, dueDate } = value;
    if (importDate) {
      const [startTime, endTime] = importDate;
      value.importStartDate = startTime && startTime.format('YYYY/MM/DD');
      value.importEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.importDate;
    }
    if (invoiceDate) {
      const [startTime, endTime] = invoiceDate;
      value.invoiceStartDate = startTime && startTime.format('YYYY/MM/DD');
      value.invoiceEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.invoiceDate;
    }
    if (dueDate) {
      const [startTime, endTime] = dueDate;
      value.dueStartDate = startTime && startTime.format('YYYY/MM/DD');
      value.dueEndDate = endTime && endTime.format('YYYY/MM/DD');
      delete value.dueDate;
    }
    httpBufferClient
      .submit('/warning/v1.0/matching/bill/export', { ...value, billBrand: 11 })
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
      render: record => (
        <Fragment>
          <a
            href="javascript:;"
            onClick={() => {
              this.setState({
                record: record,
                modVisible: true,
              });
            }}
          >
            标记
          </a>
        </Fragment>
      ),
    });
    return collectColumns.concat(columns);
  };
  render() {
    const { match, query, list, loading } = this.props;
    const { modVisible, record } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={match.path}
            query={query}
            onUpdateQuery={this.props.updateQuery}
            enableExport={true}
            onExport={this.handleExport}
            isExporting={this.state.isExporting}
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
        {/* 标记*/}
        {modVisible && (
          <ModalForm
            title="标记"
            onOk={() => {
              this.setState({ modVisible: false });
              this.handleSearch(this.props.query.value);
            }}
            onCancel={() => this.setState({ modVisible: false })}
            onSubmit={formData => {
              return httpCommonClient
                .post('/warning/v1.0/matching/bill/update', {
                  id: record.id,
                  statusCode: formData.statusCode,
                })
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
                label: '状态',
                type: 'radio',
                key: 'statusCode',
                initialValue: record.statusCode,
                optionList: [{ label: '未结清', value: 'bill_status_1' }, { label: '已结清', value: 'bill_status_2' }],
              },
            ]}
          />
        )}
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.carMatching.loading,
  list: store.carMatching.collectMatch.list,
  paging: store.carMatching.collectMatch.paging,
  query: store.carMatching.collectMatch.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getCollectMatch(data, paging)),
    updateQuery: data => {
      dispatch(updateCollectMatch({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(collect);
