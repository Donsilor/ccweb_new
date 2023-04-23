import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Icon, Tooltip, Table } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import { bondHistoryFetch } from 'redux/modules/ewAuditDetail';
import {
  idColumn,
  bondTypeColumn,
  depositAmountColumn,
  operationColumn,
  saveDateColumn,
} from 'components/EwAuditTableColumn/columnItem';
import * as BFCol from 'components/EwAuditTableColumn/bondFlowColItem';
import Trend from 'ant-design-pro/lib/Trend';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class BondHistory extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '任务号',
        dataIndex: 'ewBankId',
        align: 'center',
      },
      {
        title: '经销商申请时间',
        dataIndex: 'disApplyDate',
        align: 'center',
        render: text => {
          return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
        },
      },
      bondTypeColumn,
      {
        title: '金额（万）',
        dataIndex: 'money',
        align: 'center',
        render: (text, record) => (
          <Trend flag={record.operationType === 1 ? 'up' : 'down'}>
            {record.operationType === 1 ? `+${record.money}` : `-${record.money}`}
          </Trend>
        ),
      },
      BFCol.curTotalMoneyColumn,
      BFCol.saveDateColumn,
      {
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <Fragment>
            <Link
              to={{
                pathname: `/${props.match.params.menu}/detail/authInfo/${record.ewBankId}`,
                search: `${props.location.search}`,
              }}
            >
              <Tooltip title="查看">
                <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
              </Tooltip>
            </Link>
          </Fragment>
        ),
      },
    ];
  }
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { urlParams: { id } = {} } = this.props;
    id && this.props.fetch({ id });
  };

  render() {
    const { loading, store } = this.props;
    return (
      <div>
        <DetailWrapper title="保证金历史">
          <Table
            dataSource={store}
            columns={this.columns}
            loading={loading}
            scroll={{ x: 800 }}
            rowKey="ewBankId"
            pagination={false}
          />
        </DetailWrapper>
        <OperationArea>
          <BackToList />
        </OperationArea>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: state.ewAuditDetail.bondHistory,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(bondHistoryFetch(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BondHistory);
