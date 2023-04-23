import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Steps, Spin, message, Table, Link } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import EBDic from 'common/constant';
import { translate } from 'common/utils/';
import { excepRecordFetch, excepRecordConfirm } from 'redux/modules/ewAuditDetail';
import { idColumn, isfirstColumn, operationColumn } from 'components/EwAuditTableColumn/columnItem';
import ModalForm from './modalForm';
import moment from 'moment';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class ExcepRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
      showModal: false,
      modalLoading: false,
    };
    const menuName = props.match && props.match.params && props.match.params.menu;
    this.columns = [
      {
        title: '异常原因',
        dataIndex: 'excReason',
      },
      {
        title: '异常标记人',
        dataIndex: 'markUserName',
      },
      {
        title: '异常时间',
        dataIndex: 'markTime',
        align: 'center',
        render: text => {
          return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
        },
      },
      {
        title: '解决方式',
        dataIndex: 'solveSolutions',
        align: 'center',
        render: text => translate(text, EBDic.solveSolutionsDicList),
      },
      {
        title: '解决说明',
        dataIndex: 'solveDescription',
      },
      {
        title: '解决人',
        dataIndex: 'solveUserName',
      },
      {
        title: '解决时间',
        dataIndex: 'solveTime',
        align: 'center',
        render: text => {
          return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
        },
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          const solveSolutions = record.solveSolutions;
          return (
            <a href="javascript:;" onClick={this.handleClick(record)}>
              {solveSolutions || menuName === 'lastAudit' ? '查看' : '异常处理'}
            </a>
          );
        },
      },
    ];
  }
  componentDidMount() {
    this.handleSearch();
  }

  handleClick = record => e => {
    e.preventDefault();
    this.setState({
      record,
      showModal: true,
    });
  };

  handleSearch = () => {
    const { urlParams: { id } = {} } = this.props;
    id && this.props.fetch({ id });
  };

  handleException = value => {
    this.setState({
      modalLoading: true,
    });
    this.props
      .confirm(value)
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success('异常处理成功');
        } else {
          return Promise.reject(new Error(payload.data.msg));
        }
      })
      .catch(err => {
        message.error(err.message);
      })
      .then(() => {
        this.setState({
          modalLoading: false,
          showModal: false,
        });
        //this.handleSearch();
        this.props.history.push('/primaryAudit/list/todoList');
      });
  };

  handleOk = () => {
    const { record } = this.state;
    const { match } = this.props;
    const menuName = match.params && match.params.menu;
    !record.solveSolutions && menuName === 'primaryAudit' && this.form.handleSubmit();
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
      modalLoading: false,
    });
  };

  render() {
    const { loading, store, match } = this.props;
    const { showModal, modalLoading } = this.state;
    const menuName = match.params && match.params.menu;
    return (
      <div>
        <DetailWrapper title="异常记录">
          <Table
            dataSource={store}
            columns={this.columns}
            loading={loading}
            scroll={{ x: 800 }}
            rowKey="id"
            pagination={false}
          />
        </DetailWrapper>
        <Modal
          title="查看异常任务"
          visible={showModal}
          onOk={this.handleOk}
          okButtonProps={{
            disabled: this.state.record.solveSolutions || menuName === 'lastAudit',
          }}
          confirmLoading={modalLoading}
          onCancel={this.handleCancel}
        >
          <ModalForm
            wrappedComponentRef={form => (this.form = form)}
            onSubmit={this.handleException}
            record={this.state.record}
            readOnly={this.state.record.solveSolutions || menuName === 'lastAudit'}
          />
        </Modal>
        <OperationArea>
          <BackToList />
        </OperationArea>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: state.ewAuditDetail.excepRecord,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(excepRecordFetch(data)),
    confirm: data => dispatch(excepRecordConfirm(data)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExcepRecord);
