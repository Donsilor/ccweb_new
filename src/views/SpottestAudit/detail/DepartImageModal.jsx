import React, { Component } from 'react';
import { Spin, message, Row, Col, Modal } from 'antd';
import { httpFormClient } from 'common/axios';
import ImageCard from 'components/ImageCard';
import Viewer from 'react-viewer';

export default class DepartImageModal extends Component {
  state = {
    loading: true,
    showPreviewModal: false,
    photo: {},
    video: {},
    image: {},
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { id, isEw } = this.props;
    const url = isEw ? '/SpotTestTaskAction_getEwStorePhtoAndVedio' : '/SpotTestTaskAction_getDisStorePhtoAndVedio';
    return httpFormClient
      .formSubmit(url, '', !isEw ? { disId: id } : { ewId: id })
      .then(({ data } = {}) => {
        if (data.result === 0) {
          if (isEw) {
            this.setState({
              photo: calcImageCard(data.ewStorePhoto, '二网门店照片'),
              video: calcImageCard(data.ewStoreVedio, '二网门店视频'),
              loading: false,
            });
          } else {
            this.setState({
              photo: calcImageCard(data.disStorePhoto, '经销商门店照片'),
              video: calcImageCard(data.disStoreVedio, '经销商门店视频'),
              loading: false,
            });
          }
        } else {
          return Promise.reject(data.msg);
        }
      })
      .catch(err => {
        message.error(err.message || err);
        this.setState({
          loading: false,
        });
      });
  };
  handleCancel = () => {
    this.setState({
      showPreviewModal: false,
    });
    this.container.style.display = 'none';
  };
  showPreview = (title, url) => () => {
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
    const { isEw } = this.props;
    const { loading, photo, video } = this.state;
    return (
      <Modal
        title={isEw ? '二网店头信息' : '经销商店头信息'}
        visible
        onOk={() => this.props.onCancel()}
        onCancel={() => this.props.onCancel()}
        width={900}
        zIndex={10}
        footer={null}
        keyboard={false}
      >
        <Spin spinning={loading}>
          <Row gutter={16}>
            <Col lg={12} xl={12} key="image" style={{ minWidth: '320px' }}>
              <ImageCard {...photo} showPreview={this.showPreview(photo.title, photo.path)} />
            </Col>
            <Col lg={12} xl={12} key="video" style={{ minWidth: '320px' }}>
              <ImageCard {...video} isVideo />
            </Col>
          </Row>
        </Spin>
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
      </Modal>
    );
  }
}

const calcImageCard = (obj, title) => ({
  path: obj.absolutePath,
  title: title,
  time: obj.opEndtime.time,
  location: obj.location,
  latitude: obj.latitude,
  longitude: obj.longitude,
});

const columns = [
  {
    title: '位置',
    dataIndex: 'codeTypeDesc',
  },
  {
    title: '原路程',
    dataIndex: 'oldDistance',
  },
  {
    title: '新路程',
    dataIndex: 'newDistance',
  },
];
