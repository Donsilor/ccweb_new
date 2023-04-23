import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Steps, Spin, message, Table, Badge } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import { authHistoryFetch } from 'redux/modules/ewAuditDetail';
import {
  idColumn,
  isfirstColumn,
  statusNameColumn,
  ptAuditTimeColumn,
  firstTrialNameColumn,
  lastTrialNameColumn,
  bankAuditTimeColumn,
  operationColumn,
} from 'components/EwAuditTableColumn/columnItem';
import EBDic from 'common/constant';
import { tranBadgeStatus } from 'common/utils';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class AuthHistory extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      idColumn,
      {
        title: '经销商申请时间',
        dataIndex: 'applyTime',
        align: 'center',
        render: text => {
          return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
        },
      },
      isfirstColumn,
      {
        title: '业务状态',
        dataIndex: 'statusName',
        render: text => <Badge status={tranBadgeStatus(text, EBDic.statusDicList)} text={text} />,
      },
      ptAuditTimeColumn,
      firstTrialNameColumn,
      lastTrialNameColumn,
      bankAuditTimeColumn,
      operationColumn(props.location.pathname, false, '查看'),
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
        <DetailWrapper title="历史审核">
          <Table
            dataSource={store}
            columns={this.columns}
            loading={loading}
            scroll={{ x: 800 }}
            rowKey="id"
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
  store: state.ewAuditDetail.authHistory,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(authHistoryFetch(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthHistory);
