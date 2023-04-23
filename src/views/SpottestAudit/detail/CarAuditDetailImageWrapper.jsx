import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import { httpFormClient, httpCommonClient } from 'common/axios';
import ModalWithForm from 'components/ModalForm';
import _chunk from 'lodash/chunk';
import CarAuditPhoto from 'components/ImageCard/CarAuditPhoto';
import ExcepTypeModal from '../../ExceptionTraceAction/ExcepTypeModal';
import Viewer from 'react-viewer';
import moment from 'moment';

export default class CarAuditDetailImageWrapper extends Component {
  state = {
    showModal: false,
    showPreviewModal: false,
    showUpdateCarSpot: false,
    record: null,
    image: {},
  };
  handleSubmit = (value, record) => {
    return httpFormClient.formSubmit('/SpotTestTaskAction_returnPhoto', '', {
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
      showUpdateCarSpot: false
    });
    this.props.onSearch();
  };
  handleCancel = () => {
    this.setState({
      showModal: false,
      showPreviewModal: false,
      showUpdateCarSpot: false
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
    const { list, readOnly, curSpottest, car } = this.props;
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
                  onShowCarSpot={(record) => {
                    this.setState({
                      showUpdateCarSpot: true,
                      record,
                    });
                  }}
                  showPreview={this.showPreview}
                  readOnly={readOnly}
                  curSpottest={curSpottest}
                  car={car}
                />
              </Col>
            ))}
          </Row>
        ))}
        {this.state.showModal && (
          <ExcepTypeModal
            title={'退回重拍'}
            visible={this.state.showModal}
            onOk={this.handleModalOk}
            onCancel={this.handleCancel}
            configList={[
              {
                label: '退回类型',
                key: 'codetypeDesc',
              },
              'remark',
            ]}
            onSubmit={this.handleSubmit}
            record={record}
            destroyOnClose
          />
        )}
        {/* 盘车盘证任务修改发车日期，排放标准 */}
        {
          this.state.showUpdateCarSpot && (
            <ModalWithForm
              title={`修改`}
              onOk={this.handleModalOk}
              onCancel={this.handleCancel}
              onSubmit={(value) => {
                return httpCommonClient.post('/SpotTestTaskAction_updateCarSpotPhoto',
                  { ...value, certificationDate: moment(value.certificationDate).format('YYYY-MM-DD'), id: record.id });
              }}
              configList={[
                {
                  type: 'datePicker',
                  key: 'certificationDate',
                  label: '发证日期',
                  required: true,
                  initialValue: record.certificationDate ? moment(record.certificationDate) : '',
                },
                curSpottest.brandName == '青岛解放' ? {
                  type: 'input',
                  key: 'emissionStandards',
                  label: '排放标准',
                  required: true,
                  initialValue: record.emissionStandards,
                } : {},
              ]}
            />
          )
        }
        <div id="detailImageModal" ref={ref => (this.container = ref)}>
          <div className="detailImageSubContent" ref={ref => (this.subContainer = ref)} />
        </div>
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
