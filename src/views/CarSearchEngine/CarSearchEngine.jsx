import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import styles from './style.module.less';
import OperationArea from 'components/OperationArea';
import WrapperRouter from './wrapperRouter';
import SearchButton from './SearchButton';
import { fetchCarSearchManagement } from 'redux/modules/tabData';
import { fetchCarInfo, fetchCarTrackList, fetchCarChangeList } from 'redux/modules/carSearchEngine';
import { ViewWrapper, FormArea, OperArea } from 'layouts/ViewWrapper';

export class CarSearchEngine extends Component {
  state = {
    chassis: '',
    tab: '',
  };
  handleSearch = id => {
    if (this.props.match.params.tabName !== 'carInfo') {
      const link = `/carSearchEngine/result/carInfo`;
      this.props.history.push(link);
    } else {
      this.props.fetchTabCount({ id });
      this.props.fetchCarInfo({ id }).then(({ payload }) => {
        if (!payload || !payload.data || payload.data.result !== 0) {
          message.error((payload && payload.data && payload.data.msg) || '没有获取到该车架号的数据');
        }
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.tabName !== nextProps.match.params.tabName) {
      nextProps.chassis && this.props.fetchTabCount({ id: nextProps.carId });
    }
  }

  componentDidMount() {
    this.props.chassis && this.handleSearch(this.props.carId);
  }

  render() {
    return (
      <ViewWrapper>
        <FormArea>
          <WrapperRouter />
        </FormArea>
        <OperationArea center>
          <div className={`${styles.searchArea} ${styles.transformed}`}>
            <SearchButton type={'large'} onSearch={value => this.handleSearch(value.id)} />
          </div>
        </OperationArea>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.carSearchEngine.loading,
  chassis: store.carSearchEngine.chassis,
  carId: store.carSearchEngine.carId
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTabCount: data => dispatch(fetchCarSearchManagement(data)),
    fetchCarInfo: data => dispatch(fetchCarInfo(data)),
    fetchCarTrackList: data => dispatch(fetchCarTrackList(data)),
    fetchCarChangeList: data => dispatch(fetchCarChangeList(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarSearchEngine);
