import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Steps, Spin, message, Divider, Timeline } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { expressInfoFetch } from 'redux/modules/ewAuditDetail';
import BackToList from 'components/BackToList';
import OperationArea from 'components/OperationArea';
import DetailWrapper from 'layouts/DetailWrapper';
import styles from './style.module.less';

const { Description } = DescriptionList;

export class ExpressInfo extends Component {
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { urlParams: { id } = {} } = this.props;
    id &&
      this.props.fetch({ id }).then(({ payload }) => {
        if (payload && payload.data && payload.data.status === '-1') {
          message.error(payload.data.msg);
        }
      });
  };

  render() {
    const { store } = this.props;
    const { expressNum = '', commitDate = '' } = store;
    return (
      <div>
        <Spin spinning={this.props.loading}>
          <DetailWrapper>
            <DescriptionList title="物流信息">
              <Description term="物流单号">{expressNum}</Description>
              <Description term="提交日期">{commitDate}</Description>
            </DescriptionList>
            <Divider />
            <DescriptionList title="物流详情">
              <div className={styles.error}>
                <div className={styles.imageWrapper}>
                  <div className={styles.image} />
                </div>
                <div className={styles.content}>
                  <h1>Not Found</h1>
                  <div>抱歉，未查到该物流信息</div>
                </div>
              </div>
            </DescriptionList>
          </DetailWrapper>
          <OperationArea>
            <BackToList />
          </OperationArea>
        </Spin>
      </div>
    );
  }
}

// ewBanId 745  expressNum 3941392450971

const mapStateToProps = (state, ownProps) => ({
  store: state.ewAuditDetail.expressInfo,
  urlParams: ownProps.match.params,
  loading: state.ewAuditDetail.loading,
});

function mapDispatchToProps(dispatch) {
  return {
    fetch: data => dispatch(expressInfoFetch(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpressInfo);
