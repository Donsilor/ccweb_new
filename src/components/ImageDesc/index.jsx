import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../ImageCard/style.module.less';

export default class ImageDesc extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    time: PropTypes.number,
    locaiton: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  };

  render() {
    const { title, time, location, latitude, longitude } = this.props;
    return (
      <div>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
          <p className={styles.subtitle}>拍摄时间：{time && moment.unix(time / 1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
        <div className={styles.detail}>
          <p className={styles.location}>拍摄地点：{location}</p>
          <p className={styles.latitude}>经度：{latitude}</p>
          <p className={styles.longitude}>纬度：{longitude}</p>
        </div>
      </div>
    );
  }
}
