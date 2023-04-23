import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Steps, Spin, message, Table } from 'antd';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import { trackRecordFetch, trackRecordAdd } from 'redux/modules/ewAuditDetail';
import ModalForm from './modalForm';
import moment from 'moment';

const columns = [
  {
    title: '反馈类型',
    dataIndex: 'feedBackType',
    render: text => {
      switch (text) {
        case 1:
          return '拍不了';
        case 2:
          return '不配合';
        case 3:
          return '联系不上';
        case 4:
          return '不会拍照';
        default:
          return text;
      }
    },
  },
  {
    title: '反馈备注',
    dataIndex: 'remark',
    width: 300,
  },
  {
    title: '沟通方',
    dataIndex: 'contact',
    render: text => (text === 1 ? '二网' : '经销商'),
  },
  {
    title: '客服姓名',
    dataIndex: 'opUserName',
  },
  {
    title: '沟通时间',
    dataIndex: 'opTime',
    render: text => moment.unix(text.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
];

export class TrackRecord extends Component {
  state = {
    modalVisible: false,
    modalLoading: false,
  };
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { urlParams: { id } = {} } = this.props;
    id && this.props.fetch({ id });
  };

  showInfoModal = () => {
    this.form && this.form.props.form.resetFields();
    this.setState({
      modalVisible: true,
    });
  };

  submitRecord = value => {
    this.setState({
      modalLoading: true,
    });
    const { urlParams: { id } = {} } = this.props;
    this.props
      .add({ ...value, id })
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success('新增跟踪记录成功');
        } else {
          return Promise.reject(new Error(payload));
        }
      })
      .catch(err => {
        message.error('新增跟踪记录失败');
      })
      .then(() => {
        this.setState({
          modalLoading: false,
          modalVisible: false,
        });
        this.handleSearch();
      });
  };

  handleModalOk = () => {
    this.form.handleSubmit();
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { loading, store, match, location } = this.props;
    const { modalLoading, modalVisible } = this.state;
    const menuName = match.params && match.params.menu;
    return (
      <div>
        <DetailWrapper title="客户跟踪记录">
          <Table dataSource={store} columns={columns} loading={loading} rowKey="id" />
        </DetailWrapper>
        <Modal
          title="新增跟踪记录"
          visible={modalVisible}
          onOk={this.handleModalOk}
          confirmLoading={modalLoading}
          onCancel={this.handleCancel}
        >
          <ModalForm wrappedComponentRef={form => (this.form = form)} onSubmit={this.submitRecord} />
        </Modal>
        <OperationArea>
          {menuName === 'primaryAudit' && location && location.search.includes('?tab=') && (
            <Button type="primary" onClick={this.showInfoModal}>
              新增跟踪记录
            </Button>
          )}
          <BackToList />
        </OperationArea>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: state.ewAuditDetail.trackRecord,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(trackRecordFetch(data)),
    add: data => dispatch(trackRecordAdd(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackRecord);
