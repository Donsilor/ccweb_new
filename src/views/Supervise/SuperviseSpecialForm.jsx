import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  fetchSuperviseAllDealer,
  fetchSuperviseSpecial,
  insertOrUpdateSpecialDealerInfo,
  updateSuperviseSpecialQuery,
} from '../../redux/modules/supervise';
import { FormArea, ViewWrapper } from '../../layouts/ViewWrapper';
import CCForm from '../../components/CCForm';
import EwAuditTable from '../../components/EwAuditTable';
import OperationArea from '../../components/OperationArea';
import { Button, message, Modal, Popconfirm } from 'antd';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';
import EBDic from '../../common/constant';
import SpecialDealerForm from './components/SpecialDealerForm';
import moment from 'moment';

class SuperviseSpecialForm extends Component {
  state = {
    showAddModal: false,
    addModalTitle: '新增特殊经销商',
    modifyType: 'add',
    specialDealerModal: {
      id: '',
      dealer: '',
      startTime: '',
      endTime: '',
    },
    dataSource: [],
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
    this.getAllDealer();
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };

    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  getColumns() {
    const { match } = this.props;
    const TIME_FORMAT = 'YYYY-MM-DD';
    const now = moment.unix(new Date(Date.now()).getTime() / 1000).format(TIME_FORMAT);
    const columns = ewAuditTableColumn(match.path);

    columns.map(col => {
      if (col.dataIndex === 'status') {
        col.render = (text, record) => {
          let content = '';
          if (now < moment.unix(new Date(record.startTime).getTime() / 1000).format(TIME_FORMAT)) {
            content = EBDic.statusTypeList[0].name;
          } else if (now > moment.unix(new Date(record.endTime).getTime() / 1000).format(TIME_FORMAT)) {
            content = EBDic.statusTypeList[2].name;
          } else {
            content = EBDic.statusTypeList[1].name;
          }
          return (
            <Fragment>
              <span>{content}</span>
            </Fragment>
          );
        };
      } else if (col.dataIndex === 'action') {
        col.render = (text, record) => {
          return (
            <Fragment>
              <a onClick={this.addDealer(record)}>修改</a>
              <Popconfirm
                title="确认删除这条特殊抽查记录？"
                onConfirm={this.deleteDealer(record)}
                okText="确认"
                cancelText="取消"
                placement="topRight"
              >
                <a href="javascript:;" style={{ margin: '0 10px' }}>
                  删除
                </a>
              </Popconfirm>
            </Fragment>
          );
        };
      }
    });

    return columns;
  }

  getAllDealer() {
    this.props
      .fetchAllDealer()
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          this.setState({
            dataSource: payload.data.list || [],
          });
        } else {
          return Promise.reject(new Error(payload.data.msg));
        }
      })
      .catch(err => {
        return message.error(err.message || '查找经销商信息失败，请重试！', 2.5);
      });
  }

  addDealer = value => () => {
    if (value == null) {
      this.setState({
        showAddModal: true,
        addModalTitle: '新增特殊经销商',
        modifyType: 'add',
        specialDealerModal: {
          id: '',
          dealer: '',
          startTime: '',
          endTime: '',
        },
      });
    } else {
      this.setState({
        showAddModal: true,
        addModalTitle: '查看修改',
        modifyType: 'modify',
        specialDealerModal: {
          ...value,
        },
      });
    }
  };

  addModalOk = () => {
    this.dealerForm && this.dealerForm.submit();
  };

  addModalCancel = () => {
    this.setState({
      showAddModal: false,
    });
  };

  confirmDealerInfo = value => {
    console.log(value);
    if (!value) return;

    if (!value.id) {
      this.props
        .insertOrUpdate(value)
        .then(({ payload }) => {
          if (payload && payload.data && payload.data.result === 0) {
            message.success(payload.data.msg, 2.5);
            this.addModalCancel();
            this.handleSearch(this.props.query.value);
          } else {
            return Promise.reject(new Error(payload.data.msg));
          }
        })
        .catch(err => {
          if (value.startTime) {
            return message.error(err.message || '增加特殊经销商失败，请重试！', 2.5);
          } else {
            return message.error(err.message || '删除特殊经销商失败，请重试！', 2.5);
          }
        });
    } else {
      this.props
        .insertOrUpdate(value)
        .then(({ payload }) => {
          if (payload && payload.data && payload.data.result === 0) {
            message.success('修改成功！', 2.5);
            this.addModalCancel();
            this.handleSearch(this.props.query.value);
          } else {
            return Promise.reject(new Error(payload.data.msg));
          }
        })
        .catch(err => {
          return message.error(err.message || '修改失败，请重试！', 2.5);
        });
    }
  };

  deleteDealer = record => () => {
    record.startTime = null;
    record.endTime = null;
    this.confirmDealerInfo(record);
  };

  render() {
    const { match, query } = this.props;
    const { addModalTitle, modifyType, specialDealerModal, dataSource } = this.state;
    return (
      <ViewWrapper>
        <OperationArea>
          <Button type="primary" icon="plus" className="customBtn" onClick={this.addDealer(null)}>
            添加经销商
          </Button>
        </OperationArea>

        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        </FormArea>
        <div>
          <EwAuditTable
            columns={this.getColumns()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
          />
        </div>

        <Modal
          title={addModalTitle}
          visible={this.state.showAddModal}
          onOk={this.addModalOk}
          onCancel={this.addModalCancel}
          destroyOnClose
        >
          <SpecialDealerForm
            wrappedComponentRef={form => (this.dealerForm = form)}
            onSubmit={this.confirmDealerInfo}
            record={specialDealerModal}
            path={match.url}
            modifyType={modifyType}
            dataSource={dataSource}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}

function mapStateToProps(store) {
  return {
    loading: store.supervise.loading,
    list: store.supervise.special.list,
    paging: store.supervise.special.paging,
    query: store.supervise.specialQuery,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (data, paging) => dispatch(fetchSuperviseSpecial(data, paging)),
    updateQuery: data => dispatch(updateSuperviseSpecialQuery(data)),
    insertOrUpdate: data => dispatch(insertOrUpdateSpecialDealerInfo(data)),
    fetchAllDealer: () => dispatch(fetchSuperviseAllDealer()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperviseSpecialForm);
