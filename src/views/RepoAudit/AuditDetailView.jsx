import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Modal, Button, Tooltip, Icon, Table, message, Divider, Row, Col } from 'antd';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import DetailInfoGrid from 'components/DetailInfoGrid';
import ModalForm from './ModalForm';
import ImageCard from 'components/ImageCard';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import Viewer from 'react-viewer';

const confirm = Modal.confirm;

export default class AuditDetailView extends Component {
  state = {
    showModal: false,
    showViewModal: false,
    modalLoading: false,
  };

  componentDidMount() {
    this.handleSearch();
  }

  authInfoPass = () => {
    const self = this;
    const { id } = this.props.store.info;
    confirm({
      title: '确定要通过该仓库的审批吗?',
      onOk() {
        self.props
          .auditRepo({
            id,
            status: self.props.auditProcess === 'first' ? 2 : 4,
          })
          .then(self.goBack);
      },
    });
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
      showViewModal: false,
      modalLoading: false,
    });
  };

  handleFormSubmit = value => {
    this.setState({
      modalLoading: true,
    });
    const { info } = this.props.store;
    let data = {};
    if (this.props.auditProcess === 'first') {
      data = {
        id: info.id,
        status: 3,
        remark: value.remark,
      };
    } else {
      data = {
        id: info.id,
        status: 5,
        reviewRemark: value.remark,
      };
    }

    this.props
      .auditRepo(data)
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result === 0) {
          message.success('仓库信息更新成功！', 2.5);
          this.goBack();
        } else {
          return Promise.reject(new Error(payload.data.msg));
        }
      })
      .catch(err => {
        return message.error(err.message || '仓库信息更新失败，请重试！', 2.5);
      });
  };

  judgetAuditBtn = () => {
    const { info } = this.props.store;
    const { auditProcess } = this.props;
    let result = false;
    if (auditProcess === 'first') {
      if (info.status === 1 || info.status === 5) {
        result = true;
      }
    } else {
      if (info.status === 2) {
        result = true;
      }
    }
    return result;
  };

  handleModalOk = e => {
    this.form && this.form.handleSubmit();
  };

  handlePreivew = () => {
    this.setState({
      showViewModal: true,
    });
  };

  showModal = e => {
    this.setState({
      showModal: true,
    });
  };

  renderBasicInfo = () => {
    const { store, auditProcess } = this.props;
    const { info } = store;
    let list = !isEmpty(info)
      ? [
          {
            label: '银行名称',
            value: info.bankName,
          },
          {
            label: '品牌名称',
            value: info.brandName,
          },
          {
            label: '经销商名称',
            value: info.distributorName,
          },
          {
            label: '仓库名称',
            value: info.name,
          },
          {
            label: '仓库类型',
            value: info.locationTypeName,
          },
          {
            label: '状态',
            value: info.statusName,
          },
        ]
      : [];
    list = [...list].concat([
      {
        label: '初审操作人',
        value: info.auditUserName,
      },
      {
        label: '初审时间',
        value:
          info.auditTime &&
          info.auditTime.time &&
          moment.unix(info.auditTime.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        label: '初审备注',
        value: (
          <span style={{ maxWidth: '350px', textOverflow: 'ellipsis', display: 'inline-block' }}>{info.remark}</span>
        ),
      },
      {
        label: '复审操作人',
        value: info.reviewUserName,
      },
      {
        label: '复审时间',
        value:
          info.reviewtime &&
          info.reviewtime.time &&
          moment.unix(info.reviewtime.time / 1000).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        label: '复审备注',
        value: (
          <span style={{ maxWidth: '350px', textOverflow: 'ellipsis', display: 'inline-block' }}>
            {info.reviewRemark}
          </span>
        ),
      },
    ]);
    return list;
  };

  handleSearch = () => {
    const { params: { id } = {} } = this.props.match;
    id && this.props.fetch({ id });
  };

  goBack = () => {
    this.props.history.push(
      `/${this.props.match.params.repoType || 'repoAuditFirst'}/${this.props.match.params.tabName || 'todo'}`
    );
  };

  render() {
    const { info, photoInfo, videoInfo } = this.props.store;
    const images = [];
    images.push({
      id: `photoInfo`,
      src: photoInfo.absolutePath,
    });
    return (
      <div>
        <Spin spinning={this.props.loading}>
          <DetailWrapper title="仓库信息">
            <DetailInfoGrid list={this.renderBasicInfo()} />
          </DetailWrapper>
          <DetailWrapper title="拍摄信息" height={'700px'}>
            {photoInfo && (
              <Col span={6} key="photoInfo">
                <ImageCard
                  title="仓库照片"
                  path={photoInfo.absolutePath}
                  time={photoInfo && photoInfo.time && moment.unix(photoInfo.time / 1000).format('YYYY-MM-DD HH:mm:ss')}
                  {...photoInfo}
                  showPreview={this.handlePreivew}
                />
              </Col>
            )}
            {videoInfo && (
              <Col span={6} key="video">
                <ImageCard
                  title="仓库视频"
                  isVideo
                  path={videoInfo.absolutePath}
                  time={videoInfo && videoInfo.time && moment.unix(videoInfo.time / 1000).format('YYYY-MM-DD HH:mm:ss')}
                  {...videoInfo}
                />
              </Col>
            )}
          </DetailWrapper>
        </Spin>
        <Modal
          title="审批不通过"
          visible={this.state.showModal}
          onOk={this.handleModalOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.modalLoading}
        >
          <ModalForm
            wrappedComponentRef={form => (this.form = form)}
            onSubmit={this.handleFormSubmit}
            record={this.state.record}
          />
        </Modal>
        <OperationArea>
          {info && this.judgetAuditBtn() && (
            <Button type="primary" onClick={this.authInfoPass}>
              审批通过
            </Button>
          )}
          {info && this.judgetAuditBtn() && (
            <Button type="danger" onClick={this.showModal}>
              审批不通过
            </Button>
          )}
          <Button onClick={this.goBack}>返回</Button>
        </OperationArea>
        <Viewer visible={this.state.showViewModal} onClose={this.handleCancel} images={images} />
      </div>
    );
  }
}
