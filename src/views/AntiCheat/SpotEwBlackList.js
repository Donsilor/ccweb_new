import { connect } from 'react-redux';
import { spotEwBlackList, updateEwBlackList } from 'redux/modules/spotEwBlack';
import React, { Component, Fragment } from 'react';
import { Button, message, Modal } from 'antd';
import EwAuditTable from 'components/EwAuditTable';
import CCForm from 'components/CCForm';
import OperationArea from 'components/OperationArea';
import ModalForm from 'components/ModalForm';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';
import { httpCommonClient } from 'common/axios';
import moment from 'moment';
import AntiCheatForm from './AntiCheatForm';
import { updateEwList } from '../../redux/modules/spotEwBlack';
const FORMAT = 'YYYY-MM-DD';
export class spotEwBlack extends Component {
  state = {
    ewShowModal: false,
    modEwVisible: false,
    confirmLoading: false,
    selList: [],
  };
  handleCancel = () => {
    this.setState({
      ewShowModal: false,
      modEwVisible: false,
    });
  };
  modalOk = () => {
    this.confirmForm && this.confirmForm.handleSubmit();
  };
  modalSubmit = formData => {
    this.setState({ confirmLoading: true });
    if (moment(formData.startDate).format(FORMAT) > moment(formData.endDate).format(FORMAT)) {
      message.error('失效日期应大于生效日期');
      this.setState({ confirmLoading: false });
      return;
    }
    return httpCommonClient
      .post('/SpottestEwBlacklistAction_add', {
        ewId: this.state.selList.filter(item => item.text.replace(/\s*/g, '') == formData.ewId.replace(/\s*/g, ''))[0]
          .id,
        startDate: moment(formData.startDate).format(FORMAT),
        endDate: moment(formData.endDate).format(FORMAT),
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          message.success('操作成功');
          this.setState({ ewShowModal: false, confirmLoading: false });
          this.handleSearch(this.props.query.value);
        } else {
          message.error(data.msg);
          this.setState({ ewShowModal: false, confirmLoading: false });
        }
      });
  };

  //列表操作
  renderColumn = () => {
    const columns = [];
    columns.push({
      title: '操作',
      render: record => (
        <Fragment>
          <a
            href="javascript:;"
            onClick={() => {
              this.setState({
                infoItem: record,
                modEwVisible: true,
              });
            }}
          >
            修改
          </a>
        </Fragment>
      ),
    });
    return columnsList.concat(columns);
  };
  componentDidMount() {
    this.handleSearch(this.props.query.value);
    this.searchSelect();
  }
  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };
  //列表查询
  handleSearch = (formValues, page, pageSize) => {
    this.props.fetch(
      { ...formValues },
      {
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      }
    );
  };
  searchSelect = () => {
    if (this.props.ewList.length === 0) {
      const url = '/com/xhkj/depart/action/AjaxAction_getEwOptions?ewQuery.status=0';
      httpCommonClient.post(url).then(res => {
        if (res.data) {
          this.setState({ selList: res.data });
          this.props.updateEwList(res.data);
        }
      });
    } else {
      this.setState({ selList: this.props.ewList });
    }
  };
  updOrderExpSubmitOk = () => {
    this.setState({ modEwVisible: false });
    this.handleSearch(this.props.query.value);
  };
  updOrderExpSubmit = (formData, record) => {
    if (moment(formData.startDate).format(FORMAT) > moment(formData.endDate).format(FORMAT)) {
      return Promise.resolve({
        data: {
          result: 1,
          msg: '失效日期应大于生效日期',
        },
      });
    }
    return httpCommonClient
      .post('/SpottestEwBlacklistAction_update', {
        id: record.id,
        startDate: formData.startDate,
        endDate: formData.endDate,
      })
      .then(({ data = {} }) => {
        if (data.result === 0) {
          return Promise.resolve({
            data: {
              result: 0,
            },
          });
        } else {
          return Promise.resolve({
            data: {
              result: 1,
              msg: data.msg || '操作失败，请重试',
            },
          });
        }
      });
  };
  render() {
    const { match, query } = this.props;
    const { infoItem, modEwVisible, confirmLoading } = this.state;
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
            columns={this.renderColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>
        {/*添加二网*/}
        <Modal
          title="添加二网"
          visible={this.state.ewShowModal}
          confirmLoading={confirmLoading}
          onOk={this.modalOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          destroyOnClose
        >
          <AntiCheatForm
            selList={this.state.selList}
            wrappedComponentRef={form => (this.confirmForm = form)}
            onSubmit={this.modalSubmit}
          />
        </Modal>
        {/*修改二网*/}
        {modEwVisible && (
          <ModalForm
            title="修改二网"
            onOk={this.updOrderExpSubmitOk}
            onCancel={this.handleCancel}
            onSubmit={this.updOrderExpSubmit}
            record={infoItem}
            configList={[
              {
                label: '二网名称',
                type: 'label',
                key: 'ewName',
              },
              {
                label: '生效日期',
                type: 'datePicker',
                key: 'startDate',
                required: true,
                initialValue: moment(infoItem.startDate),
              },
              {
                label: '失效日期',
                type: 'datePicker',
                key: 'endDate',
                required: true,
                initialValue: moment(infoItem.endDate),
              },
            ]}
          />
        )}
        <OperationArea>
          <Button
            type="primary"
            icon="plus"
            onClick={() => {
              this.setState({
                ewShowModal: true,
              });
            }}
          >
            添加二网
          </Button>
        </OperationArea>
      </ViewWrapper>
    );
  }
}
const columnsList = [
  {
    title: '二网名称',
    dataIndex: 'ewName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTimeStr',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTimeStr',
  },
  {
    title: '生效日期',
    dataIndex: 'startDateStr',
  },
  {
    title: '失效日期',
    dataIndex: 'endDateStr',
  },
  {
    title: '是否有效',
    dataIndex: 'statusName',
  },
];

const mapStateToProps = store => ({
  loading: store.spotEwBlack.loading,
  list: store.spotEwBlack.todo.list,
  paging: store.spotEwBlack.todo.paging,
  query: store.spotEwBlack.todo.query,
  ewList: store.spotEwBlack.ewList,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => {
      dispatch(spotEwBlackList(data, paging));
    },
    updateQuery: data => {
      dispatch(updateEwBlackList(data));
    },
    updateEwList: data => {
      dispatch(updateEwList(data));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(spotEwBlack);
