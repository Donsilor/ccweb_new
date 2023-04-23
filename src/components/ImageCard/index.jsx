import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './style.module.less';

export default class ImageCard extends PureComponent {
  static propTypes = {
    path: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.number,
    location: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    showPreview: PropTypes.func,
  };

  handlePreview = () => {
    this.props.showPreview && this.props.showPreview(this.props.cardId || 0);
  };

  render() {
    const { path, title, time, location, latitude, longitude, isVideo, noImage, hideDetail } = this.props;
    return (
      <div className={styles.imageCard}>
        {!noImage && (
          <div className={styles.image} style={{ backgroundImage: isVideo ? '' : `url(${path})` }}>
            <div onClick={this.handlePreview}>
              {isVideo && <video src={path} controls="controls" />}
              {!isVideo && <div className={styles.preview} />}
            </div>
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.title}>{title}</p>
            <p className={styles.subtitle}>
              拍摄时间：{time && moment.unix(time / 1000).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </div>
          {!hideDetail && (
            <div className={styles.detail}>
              <p className={styles.location}>拍摄地点：{location}</p>
              <p className={styles.latitude}>经度：{longitude}</p>
              <p className={styles.longitude}>纬度：{latitude}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
