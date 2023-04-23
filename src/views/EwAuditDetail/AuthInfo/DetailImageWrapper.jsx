import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import ImageCard from 'components/ImageCard';
import Viewer from 'react-viewer';

export default class DetailImageWrapper extends PureComponent {
  state = {
    modalVisible: false,
    startIndex: 0,
  };

  componentDidMount() { }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
    this.container.style.display = 'none';
  };

  handlePreivew = index => () => {
    const parentNode = this.container.parentNode;
    parentNode.removeChild(this.container);
    document.getElementById('root').appendChild(this.container);
    this.container.style.display = 'block';
    this.setState({
      modalVisible: true,
      startIndex: index,
    });
  };
  findIndex = (id, images) => {
    const index = images.findIndex(item => item.id == id);
    return index === -1 ? 0 : index;
  };
  render() {
    const {
      eb,
      business,
      contractList,
      idFront,
      idBack,
      handIdPic,
      handSignPic,
      statementList,
      rentalList,
      addtionalPhotos,
    } = this.props;

    const isDirectSaleStore = this.props.isDirectSaleStore === 1;
    const images = [];
    business &&
      images.push({
        id: 'business',
        alt: '营业执照',
        src: business.path,
      });
    Array.isArray(contractList) &&
      contractList.forEach((item, index) => {
        images.push({
          id: `contractList${index + 1}`,
          alt: `合同照片 ${index + 1}`,
          src: item.path,
        });
      });
    if (!isDirectSaleStore) {
      idFront &&
        images.push({
          id: 'idFront',
          alt: '身份证正面',
          src: idFront.path,
        });
      idBack &&
        images.push({
          id: 'idBack',
          alt: '身份证背面',
          src: idBack.path,
        });
      handIdPic &&
        images.push({
          id: 'handIdPic',
          alt: '签署人手持身份证',
          src: handIdPic.path,
        });
      handSignPic &&
        images.push({
          id: 'handSignPic',
          alt: '签署声明照片',
          src: handSignPic.path,
        });
      Array.isArray(statementList) &&
        statementList.forEach((item, index) => {
          images.push({
            id: `statementList${index + 1}`,
            alt: `声明照片 ${index + 1}`,
            src: item.path,
          });
        });
      Array.isArray(rentalList) &&
        rentalList &&
        eb &&
        eb.ewId.length === 7 &&
        rentalList.forEach((item, index) => {
          images.push({
            id: `rentalList${index + 1}`,
            alt: `租赁协议 ${index + 1}`,
            src: item.path,
          });
        });
    } else {
      Array.isArray(addtionalPhotos) &&
        addtionalPhotos.forEach((item, index) => {
          images.push({
            id: `addtionalPhotos${index + 1}`,
            alt: `直营店担保承诺书 ${index + 1}`,
            src: item.path,
          });
        });
    }

    return (
      <div>
        <Row gutter={16}>
          {business && (
            <Col span={6} key={'business'}>
              <ImageCard
                {...business}
                title={'营业执照'}
                hideDetail
                showPreview={this.handlePreivew(this.findIndex('business', images))}
              />
            </Col>
          )}
          {contractList &&
            contractList.map(
              (item, index) =>
                item && (
                  <Col span={6} key={`contractList${index + 1}`}>
                    <ImageCard
                      {...item}
                      hideDetail
                      title={`合同照片 ${index + 1}`}
                      showPreview={this.handlePreivew(this.findIndex(`contractList${index + 1}`, images))}
                    />
                  </Col>
                )
            )}
          {!isDirectSaleStore && idFront && (
            <Col span={6} key={'idFront'}>
              <ImageCard
                {...idFront}
                hideDetail
                title={'身份证正面'}
                showPreview={this.handlePreivew(this.findIndex('idFront', images))}
              />
            </Col>
          )}
          {!isDirectSaleStore && idBack && (
            <Col span={6} key={'idBack'}>
              <ImageCard
                {...idBack}
                hideDetail
                title={'身份证背面'}
                showPreview={this.handlePreivew(this.findIndex('idBack', images))}
              />
            </Col>
          )}
          {!isDirectSaleStore && handIdPic && (
            <Col span={6} key={'handIdPic'}>
              <ImageCard
                {...handIdPic}
                hideDetail
                title={'签署人手持身份证'}
                showPreview={this.handlePreivew(this.findIndex('handIdPic', images))}
              />
            </Col>
          )}
          {!isDirectSaleStore && handSignPic && (
            <Col span={6} key={'handSignPic'}>
              <ImageCard
                {...handSignPic}
                hideDetail
                title={'签署声明照片'}
                showPreview={this.handlePreivew(this.findIndex('handSignPic', images))}
              />
            </Col>
          )}
          {!isDirectSaleStore &&
            statementList &&
            statementList.map(
              (item, index) =>
                item && (
                  <Col span={6} key={`statementList${index + 1}`}>
                    <ImageCard
                      {...item}
                      hideDetail
                      title={`声明照片`}
                      showPreview={this.handlePreivew(this.findIndex(`statementList${index + 1}`, images))}
                    />
                  </Col>
                )
            )}
          {!isDirectSaleStore &&
            rentalList &&
            eb &&
            eb.ewId.length === 7 &&
            rentalList.map(
              (item, index) =>
                item && (
                  <Col span={6} key={`rentalList${index + 1}`}>
                    <ImageCard
                      {...item}
                      hideDetail
                      title={`租赁协议 ${index + 1}`}
                      showPreview={this.handlePreivew(this.findIndex(`rentalList${index + 1}`, images))}
                    />
                  </Col>
                )
            )}
          {isDirectSaleStore &&
            addtionalPhotos &&
            addtionalPhotos.map(
              (item, index) =>
                item && (
                  <Col span={6} key={`addtionalPhotos${index + 1}`}>
                    <ImageCard
                      {...item}
                      hideDetail
                      title={`直营店担保承诺书 ${index + 1}`}
                      showPreview={this.handlePreivew(this.findIndex(`addtionalPhotos${index + 1}`, images))}
                    />
                  </Col>
                )
            )}
        </Row>
        <div id="detailImageModal" ref={ref => (this.container = ref)}>
          <div className="detailImageContent">
            {this.props.contentList.map((item, index) => (
              <h5 key={index}>{`${item.label}：${item.value}`}</h5>
            ))}
          </div>
          <div className="detailImageSubContent" ref={ref => (this.subContainer = ref)} />
        </div>
        <Viewer
          container={this.subContainer}
          visible={this.state.modalVisible}
          onClose={this.handleCancel}
          activeIndex={this.state.startIndex}
          images={images}
        />
      </div>
    );
  }
}
