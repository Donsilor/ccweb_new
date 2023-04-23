import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { getWarningMes, updateWarningMes } from 'redux/modules/warningInd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import CCForm from 'components/CCForm';
import EwAuditTable from 'components/EwAuditTable';
import { httpBufferClient, httpCommonClient } from 'common/axios';
import { exportFile } from 'common/utils';
import { warningMesColumns } from './Analy/Columns';
import moment from 'moment';
const { confirm } = Modal;
class warningMes extends Component {
  state = {
    isExporting: false,
    brandList: [],
  };
  componentDidMount() {
    this.getBrandList();
    this.handleSearch(this.props.query.value);
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    const { paramYearMonth } = formValues;
    if (paramYearMonth) {
      values.paramYearMonth = paramYearMonth.format('YYYY/MM');
    } else {
      values.paramYearMonth = moment()
        .subtract(1, 'months')
        .format('YYYY/MM');
    }
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };
  getBrandList() {
    httpCommonClient.post(`/warning/v1.0/warning/brand/list/all`, {}).then(respone => {
      if (respone.data.code === 200) {
        this.setState({ brandList: respone.data.data });
      }
    });
  }
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
    const { paramYearMonth } = value;
    if (paramYearMonth) {
      value.paramYearMonth = paramYearMonth.format('YYYY/MM');
    } else {
      value.paramYearMonth = moment()
        .subtract(1, 'months')
        .format('YYYY/MM');
    }
    httpBufferClient
      .submit('/warning/v1.0/warning/maturedNote/export/list/warningState', value)
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
    const { match, query, list, loading } = this.props;
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
            brandList={!match.path.includes('shiftA') && this.state.brandList}
          />
        </FormArea>
        <div>
          <EwAuditTable
            columns={warningMesColumns}
            loading={loading}
            data={list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
      </ViewWrapper>
    );
  }
}
const mapStateToProps = store => ({
  loading: store.warningInd.loading,
  list: store.warningInd.warningMes.list,
  paging: store.warningInd.warningMes.paging,
  query: store.warningInd.warningMes.query,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(getWarningMes(data, paging)),
    updateQuery: data => {
      dispatch(updateWarningMes({ ...data }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(warningMes);
