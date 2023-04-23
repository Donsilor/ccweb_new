import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Spin, Divider, Row, Col } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { distributorInfoFetch } from 'redux/modules/ewAuditDetail';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import ImageCard from 'components/ImageCard';
import ImageDesc from 'components/ImageDesc';
import { translate } from 'common/utils';
import { distributorStatusDic } from 'common/constant';
import Viewer from 'react-viewer';

const { Description } = DescriptionList;

export class DistributorInfo extends Component {
  state = {
    modalVisible: false,
    startIndex: 0,
  };
  componentDidMount() {
    this.handleSearch();
  }

  handlePreivew = index => () => {
    this.setState({
      modalVisible: true,
      startIndex: index,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  renderVideo = item => {
    return (
      <div className="image-gallery-image">
        <video src={item.original} controls="controls" />
      </div>
    );
  };

  handleSearch = () => {
    const { urlParams: { id } = {} } = this.props;
    id && this.props.fetch({ id });
  };
  renderBasicInfo = () => {
    const { store } = this.props;
    const { distrVO, automakerName, area, brandList } = store;
    const list = distrVO
      ? [
          {
            label: '公司名称',
            value: distrVO.distributorName,
          },
          {
            label: '公司类型',
            value: distrVO.distributorType === 0 ? '有限责任公司' : '1股份有限公司',
          },
          {
            label: '公司名称',
            value: distrVO.customerType === 1 ? '4S店' : distrVO.customerType,
          },
          {
            label: '所属集团',
            value: distrVO.ownedGroupName,
          },
          {
            label: '汽车厂商',
            value: automakerName,
          },
          {
            label: '融资联系人',
            value: distrVO.financingContactorName,
          },
          {
            label: '融资人电话',
            value: distrVO.financingContactorTel,
          },
          {
            label: '经营区域',
            value: area,
          },
          {
            label: '经营品牌',
            value: brandList.map(item => item.brandName).join(', '),
          },
          {
            label: '经营地址',
            value: distrVO.businessAddress,
          },
          {
            label: '经销商状态',
            value: translate(distrVO.status, distributorStatusDic, true),
          },
        ]
      : [];
    return list;
  };
  renderOtherInfo = () => {
    const { store } = this.props;
    const { distrVO } = store;
    const list = distrVO
      ? [
          {
            label: '总经理',
            value: distrVO.generalManagerName,
          },
          {
            label: '联系方式',
            value: distrVO.generalManagerTel,
          },
          {
            label: '二网经办人',
            value: distrVO.operatorName,
          },
          {
            label: '二网电话',
            value: distrVO.operatorPhone,
          },
          {
            label: '法人代表',
            value: distrVO.corporationName,
          },
          {
            label: '注册资本',
            value: distrVO.registeredCapital + '万',
          },
          {
            label: '成立日期',
            value: distrVO.foundDate,
          },
          {
            label: '统一社会信用代码',
            value: distrVO.distributorCode,
          },
          {
            label: '土地性质',
            value: distrVO.landType === 1 ? '租赁' : distrVO.landType === 0 ? '自有' : '',
          },
          {
            label: '注册地址',
            value: distrVO.registerAddress,
          },
        ]
      : [];
    return list;
  };
  render() {
    const { storeImg = {}, storeVideo = {} } = this.props.store;
    const images = [];
    storeImg &&
      images.push({
        src: storeImg.absolutePath,
      });
    return (
      <div>
        <Spin spinning={this.props.loading}>
          <DetailWrapper>
            <DescriptionList title="基础信息">
              {this.renderBasicInfo().map((item, index) => (
                <Description term={item.label} key={index}>
                  {item.value}
                </Description>
              ))}
            </DescriptionList>
            <Divider />
            <DescriptionList title="其他信息">
              {this.renderOtherInfo().map((item, index) => (
                <Description term={item.label} key={index}>
                  {item.value}
                </Description>
              ))}
            </DescriptionList>
          </DetailWrapper>
          <DetailWrapper title="照片信息">
            <Row gutter={16}>
              <Col span={6} key="photo">
                <ImageCard
                  title="门店照片"
                  path={storeImg.absolutePath}
                  time={storeImg && storeImg.opStarttime && storeImg.opStarttime.time}
                  showPreview={this.handlePreivew(0)}
                  {...storeImg}
                />
              </Col>
              <Col span={6} key="video">
                <ImageCard
                  title="门店视频"
                  isVideo
                  path={storeVideo.absolutePath}
                  showPreview={this.handlePreivew(1)}
                  time={storeVideo && storeVideo.opStarttime && storeVideo.opStarttime.time}
                  {...storeVideo}
                />
              </Col>
            </Row>
          </DetailWrapper>
          <Viewer
            visible={images.length > 0 && this.state.modalVisible}
            onClose={this.handleCancel}
            activeIndex={this.state.startIndex}
            images={images}
          />
          <OperationArea>
            <BackToList />
          </OperationArea>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: state.ewAuditDetail.distributorInfo,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(distributorInfoFetch(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorInfo);
