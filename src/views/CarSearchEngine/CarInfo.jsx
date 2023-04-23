import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import isEmpty from 'lodash/isEmpty';
import DetailInfoGrid from 'components/DetailInfoGrid';
import { fetchCarInfo as fetchData } from 'redux/modules/carSearchEngine';
import styles from '../EwAuditDetail/ExpressInfo/style.module.less';

export class CarInfo extends Component {
  renderInfo = () => {
    const { data } = this.props;
    const list = !isEmpty(data)
      ? [
        {
          label: '车架号',
          value: data.chassis,
        },
        {
          label: '银行车架号',
          value: data.chassisBank,
        },
        {
          label: '银行名称',
          value: data.bankName,
        },
        {
          label: '经销商名称',
          value: data.distributorName,
        },
        {
          label: '品牌车系',
          value: data.fld_serial,
        },
        {
          label: '车辆价格（元）',
          value: data.carprice,
        },
        {
          label: '钥匙数量',
          value: data.carkeys,
        },
        {
          label: '发动机号',
          value: data.engine,
        },
        {
          label: '所属网点',
          value: data.locationName,
        },
        {
          label: '详细地址',
          value: data.locationAddress,
        },
        {
          label: '入库时间',
          value: data.lrtime,
        },
        {
          label: '位置状态',
          value: data.locationStatus,
        },
        {
          label: '车辆状态',
          value: data.carstatus,
        },
        {
          label: '申请赎车时间',
          value: data.buyApplyTime,
        },
        {
          label: '已赎时间',
          value: data.buytime,
        },
        {
          label: '销售时间',
          value: data.showtime,
        },
        {
          label: '销售确认时间',
          value: data.showConfirmTime,
        },
        {
          label: '发证日期',
          value: data.certificationDate,
        },
        {
          label: '排放标准',
          value: data.emissionStandards,
        },
        {
          label: '备注',
          value: data.remark,
        },
      ]
      : [];
    return list;
  };

  handleSearch = () => {
    this.props.chassis && this.props.fetchData({ id: this.props.carId });
  };

  componentDidMount() {
    this.props.chassis && this.handleSearch();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        {this.props.searchResult.result === 0 && <DetailInfoGrid list={this.renderInfo()} />}
        {this.props.searchResult.result !== 0 && (
          <div className={styles.error}>
            <div className={styles.imageWrapper}>
              <div className={styles.image} />
            </div>
            <div className={styles.content}>
              <h1>Not Found</h1>
              <div>抱歉，未查到该车辆信息</div>
            </div>
          </div>
        )}
      </Spin>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.carSearchEngine.loading,
  chassis: store.carSearchEngine.chassis,
  searchResult: store.carSearchEngine.searchResult,
  data: store.carSearchEngine.carInfo,
  carId: store.carSearchEngine.carId
});

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (data, paging) => dispatch(fetchData(data, paging)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarInfo);
