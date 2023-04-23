import React, { Component, Fragment } from 'react';
import { FormArea, ViewWrapper } from '../../layouts/ViewWrapper';
import CCForm from '../../components/CCForm';
import EwAuditTable from '../../components/EwAuditTable';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';
import styles from './style.module.less';
import { message, Modal } from 'antd';
import RemoveWarningForm from './RemoveWarningForm';
import { httpCommonClient } from 'common/axios';

export default class RepoWarning extends Component {
  state = {
    showImgModal: false,
    imgModal: {
      src: '',
      title: '',
      alt: '',
    },
    showRemoveModal: false,
    selectedRows: [],
    selectRemoveModel: {},
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    console.log(values);
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  renderColumns = () => {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.path);

    columns.map(col => {
      if (col.dataIndex === 'action') {
        col.render = (text, record) => {
          const alt = record['imageRecognitionUrl'] + '识别结果图';
          if (match.path === '/repositoryWarning/todo') {
            return (
              <Fragment>
                {/*<a className={`${styles.action}`} onClick={this.showImgModal('识别结果图', text, alt)}>*/}
                {/*  图像*/}
                {/*</a>*/}
                <a className={`${styles.action}`} onClick={this.showRemoveModal([record.id])}>
                  解除
                </a>
              </Fragment>
            );
          } else {
            return (
              <Fragment>
                <a className={`${styles.action}`} onClick={this.showImgModal('识别结果图', text, alt)}>
                  图像
                </a>
              </Fragment>
            );
          }
        };
      }
    });

    return columns;
  };

  showImgModal = (title, src, alt) => () => {
    this.setState({
      showImgModal: true,
      imgModal: {
        src: src,
        title: title,
        alt: alt,
      },
    });
  };

  handleCancel = () => {
    this.setState({
      showImgModal: false,
      imgModal: {
        src: '',
        title: '',
        alt: '',
      },
      showRemoveModal: false,
    });
  };

  showRemoveModal = ids => () => {
    console.log(ids);
    const { list } = this.props;
    let selectRemoveModel = {};
    list.forEach(item => {
      if (item.id == ids[0]) {
        selectRemoveModel = item;
      }
    });
    this.setState({
      showRemoveModal: true,
      selectedRows: ids,
      selectRemoveModel: selectRemoveModel,
    });
  };

  // 复选框事件
  handleSelectRow = selectedRowKeys => {
    this.setState({ selectedRows: selectedRowKeys });
  };
  // 复选框批量解除
  handleMultipleRemove = selectedRowKeys => {
    const { list } = this.props;
    let whareHouseId = '';
    selectedRowKeys.forEach(tmp => {
      list.forEach(item => {
        if (item.id === tmp) {
          if (whareHouseId === '') {
            whareHouseId = item.whareHouseId;
          } else {
            if (whareHouseId != item.whareHouseId) {
              message.error('请选择相同二网批量解除');
              return;
            }
          }
        }
      });
    });
    this.showRemoveModal(selectedRowKeys)();
  };
  // form框确认
  onRemoveModalOk = () => {
    this.removeForm && this.removeForm.submit();
  };
  // 解除预警事件
  confirmRemoveModal = value => {
    console.log(value);
    if (!value) return;

    let url = '/WhareHouseAction_removeWarning';
    httpCommonClient
      .post(url, {
        ids: this.state.selectedRows,
        whareHouseId: value.whareHouseId,
        oldNumber: value.oldNumber,
        newNumber: value.newNumber,
        remark: value.remark,
      })
      .then(respone => {
        console.log(respone);
        if (respone && respone.data && respone.data.result === 0) {
          message.success(respone.data.msg, 2.5);
          this.handleCancel();
          this.handleSearch(this.props.query.value);
        } else {
          return Promise.reject(respone.data.msg);
        }
      })
      .catch(err => {
        message.error(err.msg || err);
      });
  };

  render() {
    const { match, query, loading, list, paging } = this.props;
    const { showImgModal, imgModal, showRemoveModal } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        </FormArea>
        <EwAuditTable
          loading={loading}
          data={list}
          paging={paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
          columns={this.renderColumns()}
          onSelectRow={this.handleSelectRow}
          showTableOperArea={match.path === '/repositoryWarning/todo'}
          operName="批量解除"
          onOperMultipleRow={this.handleMultipleRemove}
        />
        <Modal
          title={imgModal.title}
          visible={showImgModal}
          onCancel={this.handleCancel}
          width={900}
          footer={null}
          destroyOnClose
        >
          <img src={imgModal.src} alt={imgModal.alt} style={{ width: '850px' }} />
        </Modal>
        <Modal
          title="解除预警"
          visible={showRemoveModal}
          onOk={this.onRemoveModalOk}
          onCancel={this.handleCancel}
          destroyOnClose
        >
          <RemoveWarningForm
            wrappedComponentRef={form => (this.removeForm = form)}
            onSubmit={this.confirmRemoveModal}
            record={this.state.selectRemoveModel}
          />
        </Modal>
      </ViewWrapper>
    );
  }
}
