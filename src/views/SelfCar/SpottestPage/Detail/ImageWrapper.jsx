import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import { httpCommonClient } from 'common/axios';
import _chunk from 'lodash/chunk';
import CarAuditPhoto from 'components/ImageCard/CarAuditPhoto';
import ModalForm from 'components/ModalForm';
import Viewer from 'react-viewer';

export default class ImageWrapper extends Component {
  state = {
    showModal: false,
    showPreviewModal: false,
    record: null,
    image: {},
  };
  handleSubmit = value => {
    const { record } = this.state;
    return httpCommonClient.submit('/self-car/v1.0/selfSpottestPhoto/update/retake', {
      id: record.id,
      remark: value.remark,
    });
  };
  handleShowModal = record => {
    this.setState({
      showModal: true,
      record,
    });
  };
  handleModalOk = () => {
    this.setState({
      showModal: false,
    });
    this.props.onSearch();
  };
  handleCancel = () => {
    this.setState({
      showModal: false,
      showPreviewModal: false,
    });
    this.container.style.display = 'none';
  };
  showPreview = (title, url) => {
    const parentNode = this.container.parentNode;
    parentNode.removeChild(this.container);
    document.getElementById('root').appendChild(this.container);
    this.container.style.display = 'block';
    this.setState({
      image: {
        alt: title,
        src: url,
      },
      showPreviewModal: !!url,
    });
  };
  render() {
    const { list, readOnly, url } = this.props;
    const { record } = this.state;
    return (
      <div>
        {_chunk(list, 4).map((group, index) => (
          <Row gutter={16} key={index}>
            {group.map((img, imgIndex) => (
              <Col lg={12} xl={6} key={imgIndex} style={{ minWidth: '320px' }}>
                <CarAuditPhoto
                  data={img}
                  onShowModal={this.handleShowModal}
                  showPreview={this.showPreview}
                  readOnly={readOnly}
                  url={url}
                />
              </Col>
            ))}
          </Row>
        ))}
        <div id="detailImageModal" ref={ref => (this.container = ref)}>
          <div className="detailImageSubContent" ref={ref => (this.subContainer = ref)} />
        </div>
        {this.state.showModal && (
          <ModalForm
            title="退回重拍"
            onOk={this.handleModalOk}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
            configList={[
              {
                label: '退回类型',
                type: 'label',
                value: record.name,
              },
              {
                label: '备注',
                type: 'input',
                key: 'remark',
                required: true,
              },
            ]}
          />
        )}
        <Viewer
          container={this.subContainer}
          visible={this.state.showPreviewModal}
          onClose={this.handleCancel}
          noNavbar
          images={[this.state.image]}
        />
      </div>
    );
  }
}
