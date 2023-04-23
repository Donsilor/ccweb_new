import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Divider, Row, Col } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { ewInfoFetch } from 'redux/modules/ewAuditDetail';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import ImageCard from 'components/ImageCard';
import { translate } from 'common/utils';
import { ewStatusDic } from 'common/constant';
import Viewer from 'react-viewer';

const { Description } = DescriptionList;

export class EwInfo extends Component {
  state = {
    modalVisible: false,
    startIndex: 0,
  };
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { urlParams: { id } = {} } = this.props;
    id && this.props.fetch({ id });
  };

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
  renderBasicInfo = () => {
    const { store } = this.props;
    const { ew, region } = store;
    const list = ew
      ? [
          {
            label: '公司名称',
            value: ew.ewName,
          },
          {
            label: '公司法人',
            value: ew.corporationName,
          },
          {
            label: '行政区域',
            value: store.region,
          },
          {
            label: '经营地址',
            value: ew.ewAddress,
          },
          {
            label: '注册地址',
            value: ew.businessAddress,
          },
          {
            label: '二网投资人',
            value: ew.ewManagerName,
          },
          {
            label: '投资人电话',
            value: ew.ewManagerTel,
          },
          {
            label: '投资人身份证',
            value: ew.ewManagerIdnum,
          },
          {
            label: '二网联系人',
            value: ew.ewOperatorName,
          },
          {
            label: '联系人电话',
            value: ew.ewOperatorTel,
          },
          {
            label: '二网类型',
            value: ew.id.length === 7 ? '二网分店' : '二网主店',
          },
          {
            label: '所属二网',
            value: ew.parentEwName || '',
          },
          {
            label: '是否直营',
            value: ew.chainStore === 1 ? '直营' : '非直营',
          },
          {
            label: '是否有营业执照',
            value: ew.license === 1 ? '有' : '没有',
          },
          {
            label: '所属经销商',
            value: Array.isArray(ew.belongDistributor) ? ew.belongDistributor.map(item => item.name).join() : '-',
          },
          {
            label: '二网状态',
            value: translate(ew.status, ewStatusDic, true),
          },
          {
            label: '移动台数据',
            value: ew.moveNum,
          },
        ]
      : [];
    return list;
  };
  renderOtherInfo = () => {
    const { store } = this.props;
    const { ew, brand } = store;
    const list = ew
      ? [
          {
            label: '公司类型',
            value: ew.cooperationNature === 1 ? '个体经营' : ew.cooperationNature === 0 ? '有限公司' : '',
          },
          {
            label: '主营品牌',
            value: brand,
          },
          {
            label: '土地性质',
            value: ew.landNature === 1 ? '租赁' : ew.landNature === 0 ? '自有' : '',
          },
          {
            label: '注册资本',
            value: ew.registeredCapital + '万',
          },
          {
            label: '所属集团',
            value: ew.ownedGroupId === -1 ? '' : ew.ownedGroupId,
          },
          {
            label: '成立日期',
            value: ew.foundDate,
          },
          {
            label: '统一社会信用代码',
            value: ew.businessLicense,
          },
          {
            label: '车位数量',
            value: ew.parkingNum,
          },
          {
            label: '展厅面积',
            value: ew.displayArea,
          },
        ]
      : [];
    return list;
  };
  render() {
    const { storeImg, storeVideo, business } = this.props.store;
    const images = [];
    business &&
      images.push({
        id: `business`,
        src: business.absolutePath,
      });
    storeImg &&
      images.push({
        id: `storeImg`,
        src: storeImg.absolutePath,
      });
    return (
      <div>
        <Spin spinning={this.props.loading}>
          <DetailWrapper>
            {this.renderBasicInfo().length > 0 && (
              <DescriptionList title="基础信息">
                {this.renderBasicInfo().map((item, index) => (
                  <Description term={item.label} key={index}>
                    {item.value}
                  </Description>
                ))}
              </DescriptionList>
            )}
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
              {business && (
                <Col span={6} key="business">
                  <ImageCard
                    title="营业执照"
                    hideDetail
                    path={business.absolutePath}
                    time={business && business.opStarttime && business.opStarttime.time}
                    {...storeImg}
                    showPreview={this.handlePreivew(0)}
                  />
                </Col>
              )}
              {storeImg && (
                <Col span={6} key="storeImg">
                  <ImageCard
                    title="门店照片"
                    path={storeImg.absolutePath}
                    time={storeImg && storeImg.opStarttime && storeImg.opStarttime.time}
                    {...storeImg}
                    showPreview={this.handlePreivew(1)}
                  />
                </Col>
              )}
              {storeVideo && (
                <Col span={6} key="video">
                  <ImageCard
                    title="门店视频"
                    isVideo
                    path={storeVideo.absolutePath}
                    time={storeVideo && storeVideo.opStarttime && storeVideo.opStarttime.time}
                    {...storeVideo}
                  />
                </Col>
              )}
            </Row>
            <Viewer
              visible={this.state.modalVisible}
              onClose={this.handleCancel}
              activeIndex={this.state.startIndex}
              images={images}
            />
          </DetailWrapper>
          <OperationArea>
            <BackToList />
          </OperationArea>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: state.ewAuditDetail.ewInfo,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(ewInfoFetch(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EwInfo);
