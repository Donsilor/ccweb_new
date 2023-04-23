import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, message, Modal } from 'antd';
import { FormArea, ViewWrapper } from '../../layouts/ViewWrapper';
import OperationArea from '../../components/OperationArea';
import CameraInfoForm from './CameraInfoForm';
import {
  fetchCameraList,
  fetchDealerList,
  fetchEndPointList,
  insertCamera,
  updateCameraClientBind,
  updateCameraDealerBind,
  updateCameraInfo,
  updateCameraQuery,
} from '../../redux/modules/cameraList';
import EwAuditTable from '../../components/EwAuditTable';
import CCForm from '../../components/CCForm';
import styles from './style.module.less';
import CameraBindForm from './CameraBindForm';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';

class CameraList extends Component {
  state = {
    showAddModal: false,
    addModalTitle: '新增摄像头',
    record: null,
    newModel: null,
    showBindModal: false,
    bindType: '',
    optionList: [],
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
    this.getClientList();
    this.getDealerList();
  }

  getClientList() {
    this.props.fetchEndPointList();
  }

  getDealerList() {
    this.props.fetchDealerList();
  }

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  getColumn = () => {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.url);

    columns.map(col => {
      if (col.dataIndex === 'action') {
        col.render = (text, record) => {
          return (
            <Fragment>
              <a className={`${styles.action}`} onClick={this.addCamera(record)}>
                查看
              </a>
              <a
                className={`${styles.action}`}
                onClick={() => {
                  this.bindInfo(BIND_TYPE_DEALER, record);
                }}
              >
                分配用户
              </a>
              <a className={`${styles.action}`} onClick={this.realTimePicture(record)}>
                实时画面
              </a>
            </Fragment>
          );
        };
      }
    });

    return columns;
  };

  addCamera = record => () => {
    if (record == null) {
      this.setState({
        showAddModal: true,
        addModalTitle: '新增摄像头',
        newModel: {
          code: '',
          brand: '',
          modelNumber: '',
          // serialNumber: '',
          pixel: '',
          distance: '',
          token: '',
        },
      });
    } else {
      console.log(record);
      this.setState({
        showAddModal: true,
        addModalTitle: '修改信息',
        newModel: {
          ...record,
        },
      });
    }
  };

  addCameraOk = () => {
    this.cameraForm && this.cameraForm.submit();
  };

  addCameraCancel = () => {
    this.setState({
      showAddModal: false,
    });
  };

  confirmCameraInfo = value => {
    console.log(value);
    if (!value) return;

    if (!value.id) {
      this.props
        .insert(value)
        .then(({ payload }) => {
          if (payload && payload.data && payload.data.result === 0) {
            message.success('增加成功！', 2.5);
            this.addCameraCancel();
            this.handleSearch(this.props.query.value);
          } else {
            return Promise.reject(new Error(payload.data.msg));
          }
        })
        .catch(err => {
          return message.error(err.message || '增加摄像头失败，请重试！', 2.5);
        });
    } else {
      this.props
        .update(value)
        .then(({ payload }) => {
          if (payload && payload.data && payload.data.result === 0) {
            message.success('修改成功！', 2.5);
            this.addCameraCancel();
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

  bindInfo = (type, record) => {
    this.setState({
      showBindModal: true,
      bindType: type,
      record: record,
      optionList: type === BIND_TYPE_CLIENT ? this.props.endPointList : this.props.dealerList,
    });
  };

  bindFormOk = () => {
    this.bindForm && this.bindForm.submit();
  };

  bindFormCancel = () => {
    this.setState({
      showBindModal: false,
    });
  };

  confirmBind = data => {
    console.log(data);
    if (!data) return;

    data.cameraId = this.state.record.id;

    if (this.state.bindType === BIND_TYPE_CLIENT) {
      this.props.bindClient(data).then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success(payload.data.msg, 2.5);
          this.addCameraCancel();
          this.handleSearch(this.props.query.value);
        } else {
          return Promise.reject(new Error(payload.data.msg));
        }
      });
    } else if (this.state.bindType === BIND_TYPE_DEALER) {
      this.props.bindDealer(data).then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success(payload.data.msg, 2.5);
          this.addCameraCancel();
          this.handleSearch(this.props.query.value);
        } else {
          return Promise.reject(new Error(payload.data.msg));
        }
      });
    }
  };

  // 实时画面
  realTimePicture = record => () => {
    window.open(
      'http://e-chaku.com/resource/template/myparker.html' +
        '?token=' +
        record.token +
        '&code=' +
        record.code +
        '&id=' +
        record.serialNumber
    );
  };

  render() {
    const { match, rowKey, query } = this.props;
    const { addModalTitle, newModel } = this.state;
    return (
      <ViewWrapper>
        <OperationArea>
          <Button type="primary" icon="plus" className="customBtn" onClick={this.addCamera(null)}>
            新增摄像头
          </Button>
        </OperationArea>
        <div>
          <FormArea>
            <CCForm
              onSearch={this.handleSearch}
              path={match.path}
              query={query}
              onUpdateQuery={this.props.updateQuery}
              wrappedComponentRef={form => (this.form = form)}
            />
          </FormArea>
          <EwAuditTable
            columns={this.getColumn()}
            loading={this.props.loading}
            data={this.props.list}
            paging={this.props.paging}
            onChange={this.handlePageChange}
            onPageChange={this.handlePageChange}
            rowKey={rowKey}
          />
        </div>
        <Modal
          title={addModalTitle}
          visible={this.state.showAddModal}
          onOk={this.addCameraOk}
          onCancel={this.addCameraCancel}
          destroyOnClose
        >
          <CameraInfoForm
            wrappedComponentRef={form => (this.cameraForm = form)}
            onSubmit={this.confirmCameraInfo}
            record={newModel}
            path={match.url}
          />
        </Modal>
        <Modal
          visible={this.state.showBindModal}
          onOk={this.bindFormOk}
          okText="绑定"
          onCancel={this.bindFormCancel}
          destroyOnClose
        >
          <CameraBindForm
            wrappedComponentRef={form => (this.bindForm = form)}
            onSubmit={this.confirmBind}
            record={this.state.record}
            type={this.state.bindType}
            optionList={this.state.optionList}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.cameraList.loading,
    list: state.cameraList.list,
    paging: state.cameraList.paging,
    query: state.cameraList.query,
    dealerList: state.cameraList.dealerList,
    endPointList: state.cameraList.endPointList,
    rowKey: record => `${record.id},${record.code}`,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    insert: data => dispatch(insertCamera(data)),
    update: data => dispatch(updateCameraInfo(data)),
    fetch: (data, paging) => dispatch(fetchCameraList(data, paging)),
    fetchDealerList: () => dispatch(fetchDealerList()),
    fetchEndPointList: () => dispatch(fetchEndPointList()),
    bindClient: data => dispatch(updateCameraClientBind(data)),
    bindDealer: data => dispatch(updateCameraDealerBind(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraList);

export const BIND_TYPE_CLIENT = 'BIND_TYPE_CLIENT';
export const BIND_TYPE_DEALER = 'BIND_TYPE_DEALER';
