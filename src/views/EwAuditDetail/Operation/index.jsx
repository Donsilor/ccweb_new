import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Steps, Spin, message, Table } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import { operationFetch } from 'redux/modules/ewAuditDetail';
import moment from 'moment';

const columns = [
  {
    title: '操作时间',
    dataIndex: 'operTime',
    render: text => moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作内容',
    dataIndex: 'opDes',
  },
  {
    title: '操作人',
    dataIndex: 'operName',
  },
  {
    title: '描述',
    dataIndex: 'remark',
  },
];

export class Operation extends Component {
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
        <DetailWrapper title="任务日志">
          <Table
            dataSource={store}
            columns={columns}
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
  store: state.ewAuditDetail.operation,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(operationFetch(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Operation);
