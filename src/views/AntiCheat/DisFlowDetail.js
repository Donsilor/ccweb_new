import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Button, Modal } from 'antd';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import { searchDisFlowList, updateDisFlowList } from 'redux/modules/spotEwBlack';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import moment from 'moment';
import { translate } from 'common/utils';
import EBDic from 'common/constant';
const { confirm } = Modal;
export class DisFlowDetail extends Component {
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
          <BackToList />
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
    title: '单号类型（调整前）',
    dataIndex: 'beforeOddType',
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
    title: '单号类型（调整后）',
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
    title: '调整前账户余额（元）',
    dataIndex: 'beforeOddAmout',
  },
  {
    title: '本次调整金额（元）',
    dataIndex: 'oddAmout',
    render: (text, record) => ([5, 7].includes(record.adjustType) ? `-${text}` : `+${text}`),
  },
  {
    title: '调整后账户余额（元）',
    dataIndex: 'oddAmout',
    render: (rext, record) =>
      [5, 7].includes(record.adjustType)
        ? (record.beforeOddAmout - record.oddAmout).toFixed(2)
        : (record.beforeOddAmout + record.oddAmout).toFixed(2),
  },
  {
    title: '调整类型',
    dataIndex: 'adjustType',
    render: text => {
      if (text == 1) {
        return '初始转入';
      } else if (text == 2) {
        return '追加转入';
      } else if (text == 3) {
        return '活期初始';
      } else if (text == 4) {
        return '活期追加';
      } else if (text == 5) {
        return '转出';
      } else if (text == 6) {
        return '本息续存';
      } else if (text == 7) {
        return '利息转出';
      } else {
        return '';
      }
    },
  },
  {
    title: '数据来源',
    dataIndex: 'sourceFrom',
    render: text => {
      if (text == 1) {
        return '确认回执';
      } else if (text == 2) {
        return '补录转入';
      } else if (text == 3) {
        return '本息续存';
      } else if (text == 4) {
        return '利息补扣';
      } else if (text == 5) {
        return '到期续存';
      } else if (text == 6) {
        return '利息转出';
      } else if (text == 90) {
        return '一马变长马';
      }
    },
  },
  {
    title: '转入日期',
    dataIndex: 'interestStartDate',
    render: (text, record) => record.adjustType != 5 && text && moment.unix(text.time / 1000).format('YYYY-MM-DD'),
  },
  {
    title: '转出日期',
    dataIndex: 'interestEndDate',
    render: (text, record) => {
      if (text && record.adjustType == 5) {
        return moment.unix(text.time / 1000).format('YYYY-MM-DD');
      } else if (record.adjustType == 7 && record.transferOutInterestDate) {
        return moment.unix(record.transferOutInterestDate.time / 1000).format('YYYY-MM-DD');
      } else {
        return '';
      }
    },
  },
  {
    title: '操作人',
    dataIndex: 'oddOptUserName',
  },
  {
    title: '操作时间',
    dataIndex: 'oddOptDate',
    render: text => text && moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
];
const mapStateToProps = store => ({
  loading: store.spotEwBlack.loading,
  list: store.spotEwBlack.disFlow.list,
  paging: store.spotEwBlack.disFlow.paging,
  query: store.spotEwBlack.disFlow.query,
});
function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      data.id = window.location.pathname.split('/').pop();
      dispatch(searchDisFlowList(data, paging));
    },
    updateQuery: data => {
      data.id = window.location.pathname.split('/').pop();
      dispatch(updateDisFlowList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisFlowDetail);
