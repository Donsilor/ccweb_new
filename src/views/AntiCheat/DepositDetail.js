import React, { Component } from 'react';
import { connect } from 'react-redux';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { searchDisOddList, updateDisOddList } from 'redux/modules/spotEwBlack';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import moment from 'moment';
export class DepositDetail extends Component {
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
          <div style={{ fontWeight: 'bold' }}>保证金汇总：{this.props.location.state.total.toFixed(2)}元</div>
          <EwAuditTable
            columns={columnsList}
            loading={loading}
            data={list}
            paging={paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
        <OperationArea>
          <BackToList></BackToList>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const columnsList = [
  {
    title: '单号',
    dataIndex: 'oddNum',
  },
  {
    title: '单号下保证金金额（元）',
    dataIndex: 'oddAmout',
    render: text => text && text.toFixed(2),
  },
  {
    title: '单号类型',
    dataIndex: 'oddType',
    render: text => {
      if (text == 1) {
        return '定期';
      } else if (text == 2) {
        return '活期';
      } else {
        return '无';
      }
    },
  },
  {
    title: '是否续存',
    dataIndex: 'renewFlag',
    render: (text, record) => record.oddType == 1 && (text == 1 ? '是' : '否'),
  },
  {
    title: '录入计息起始日期',
    dataIndex: 'initInterestStartDate',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
  {
    title: '本轮计息起始日期',
    dataIndex: 'newInterestStartDate',
    render: (text, record) => record.oddType == 1 && text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
];
const mapStateToProps = store => ({
  loading: store.spotEwBlack.loading,
  list: store.spotEwBlack.disOdd.list,
  paging: store.spotEwBlack.disOdd.paging,
  query: store.spotEwBlack.disOdd.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      data.id = window.location.pathname.split('/').pop();
      dispatch(searchDisOddList(data, paging));
    },
    updateQuery: data => {
      data.id = window.location.pathname.split('/').pop();
      dispatch(updateDisOddList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositDetail);
