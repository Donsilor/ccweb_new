import React, { Component } from 'react';
import { Icon, Tabs, Spin, message } from 'antd';
import { loadAMap } from 'common/utils';
import { httpFormClient } from 'common/axios';
import styles from './style.module.less';
import asset_home from 'assets/map-home.png';
import asset_car from 'assets/map-car.png';
import _isEmpty from 'lodash/isEmpty';
import { formatTime } from 'common/utils';

const TabPane = Tabs.TabPane;
export default class CarAuditMap extends Component {
  state = {
    loading: true,
    activeKey: '',
    tabKey: {},
    map: null,
    centerPoint: null,
    centerMarker: null,
    mapData: {},
    realLocMap: null,
    AMap: null,
    currentLine: null,
  };

  componentDidMount() {
    const { photoList } = this.props;
    if (Array.isArray(photoList) && photoList.length > 0) {
      const firstList = [photoList[0], ...photoList[0].hisList];
      if (firstList.length > 0) {
        loadAMap().then(AMap => {
          const map = new AMap.Map('mapContainer');
          AMap.plugin(['AMap.ToolBar'], function() {
            // 在图面添加工具条控件, 工具条控件只有缩放功能
            map.addControl(new AMap.ToolBar());
          });
          return httpFormClient
            .formSubmit('/SpotTestTaskAction_getMapLocation', '', { id: firstList[0].id })
            .then(({ data = {} } = {}) => {
              if (!_isEmpty(data.realLocMap)) {
                const { realLocMap } = data;
                const infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });

                function markerClick(e) {
                  infoWindow.setContent(e.target.content);
                  infoWindow.open(map, e.target.getPosition());
                }

                const homeIcon = new AMap.Icon({
                  size: new AMap.Size(32, 32),
                  image: asset_home,
                  imageSize: new AMap.Size(32, 32),
                });
                const centerMarker = new AMap.Marker({
                  position: [realLocMap.longitude, realLocMap.latitude],
                  icon: homeIcon,
                  anchor: 'center', //设置锚点
                });
                const centerCircle = new AMap.Circle({
                  center: new AMap.LngLat(realLocMap.longitude, realLocMap.latitude), // 圆心位置
                  radius: 2000, //半径
                  strokeColor: '#83CA7E', //线颜色
                  strokeOpacity: 2, //线透明度
                  strokeWeight: 3, //线粗细度
                  fillColor: '#fff', //填充颜色
                  fillOpacity: 0.35, //填充透明度
                  strokeStyle: 'dashed',
                });
                const content = [];
                content.push(`<span style="font-size:18px;font-weight: bold;">${realLocMap.locationTypeName}</span>`);
                content.push(`地址：${realLocMap.location}`);
                centerMarker.content = content.join('<br/>');
                centerMarker.on('click', markerClick);
                map.add(centerMarker);
                map.add(centerCircle);

                const mapData = {};
                photoList.forEach(photo => {
                  const fileList = [photo, ...photo.hisList].reverse().filter(item => item.file);
                  fileList.forEach((subPhoto, index) => {
                    const { file: { latitude, longitude, location } = {}, codetypeDesc: title, distance } = photo;
                    const marker = new AMap.Marker({
                      position: [longitude, latitude],
                      icon: asset_car,
                      anchor: 'center', //设置锚点
                    });
                    const content = [];
                    content.push(`<span style="font-size:18px;font-weight: bold;">${title}</span>`);
                    content.push(
                      `距离${realLocMap.locationTypeName} <span style="font-weight: bold;">${distance}</span> 米`,
                    );
                    content.push(`地址：${location}`);
                    marker.content = content.join('<br/>');
                    marker.on('click', markerClick);
                    map.add(marker);
                    mapData[`${subPhoto.codeType}-${index}`] = marker;
                  });
                });
                map.setFitView();
                this.setState({
                  map,
                  centerMarker,
                  realLocMap,
                  mapData,
                  loading: false,
                  AMap,
                });
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
        });
      } else {
        message.error('照片数据异常，无法在地图中渲染');
        this.setState({
          loading: false,
        });
      }
    } else {
      message.error('照片数据异常，无法在地图中渲染');
      this.setState({
        loading: false,
      });
    }
  }

  onCardClick = (activeKey, photoId) => () => {
    const { mapData, map, centerMarker, AMap, currentLine } = this.state;
    this.setState({
      activeKey,
    });
    if (!photoId) {
      map.setFitView([centerMarker]);
      map.removeOverlay(currentLine);
      centerMarker.emit('click', { target: centerMarker });
    } else if (!_isEmpty(mapData[photoId])) {
      const marker = mapData[photoId];
      const line = new AMap.Polyline({
        path: [
          centerMarker.getPosition(),
          marker.getPosition(),
        ],
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
        lineJoin: 'round', // 折线拐点连接处样式
      });
      currentLine && map.remove(currentLine);
      map.add(line);
      this.setState({
        currentLine: line,
      });
      map.setFitView([marker, centerMarker]);
      setTimeout(() => {
        marker.emit('click', { target: marker });
      }, 300);
    }
  };

  render() {
    const { photoList } = this.props;
    const { activeKey, realLocMap = {}, loading, tabKey } = this.state;
    return (
      <Spin spinning={loading}>
        <div className={styles.infoWrapper}>
          {!_isEmpty(realLocMap) && (
            <a
              href="javascript:;"
              className={`${styles.infoCard} ${styles.hideNav} ${activeKey === 'center' ? styles.active : ''}`}
              key={'center'}
              onClick={this.onCardClick('center')}
            >
              <div
                className={styles.infoCardDiv}
                style={{ backgroundColor: 'white', padding: '10px', minHeight: '175px' }}
              >
                <p>{realLocMap.locationName}</p>
                <span style={{ fontSize: '12px' }}>
                  位置类型：<b>{realLocMap.locationTypeName}</b>
                </span>
                <span style={{ fontSize: '12px' }}>地址：{realLocMap.location}</span>
              </div>
            </a>
          )}
          {photoList.map((item, index) => (
            <div
              className={`${styles.infoCard} ${_isEmpty(item.hisList) ? styles.hideNav : ''} ${
                activeKey === index ? styles.active : ''
              }`}
              key={index}
            >
              <Tabs
                type="card"
                onTabClick={key => this.onCardClick(index, `${item.codeType}-${key}`)()}
                defaultActiveKey={String([item, ...item.hisList].filter(item => item.file).length - 1)}
              >
                {[item, ...item.hisList]
                  .reverse()
                  .filter(item => item.file)
                  .map((photo, photoIndex) => (
                    <TabPane key={`${photoIndex}`} tab={photoIndex + 1}>
                      <a href="javascript:;" onClick={this.onCardClick(index, `${item.codeType}-${photoIndex}`)}>
                        <div className={styles.infoCardDiv}>
                          <p style={photo.codeType === 201 || photo.codeType === 202 ? { fontSize: '14px' } : {}}>
                            {photo.codetypeDesc}
                          </p>
                          <span style={{ margin: '10px 0' }}>
                            距离：
                            <b>{photo.distance}</b> 米
                          </span>

                          <span style={{ fontSize: '12px' }}>
                            <Icon type="clock-circle" style={{ marginRight: '5px' }}/>
                            {formatTime(photo.file.opStarttime)}
                          </span>
                          <span style={{ fontSize: '12px' }}>
                            <Icon type="environment" style={{ marginRight: '5px' }}/>
                            {photo.file.location}
                          </span>
                        </div>
                      </a>
                    </TabPane>
                  ))}
              </Tabs>
            </div>
          ))}
        </div>
        <div id="mapContainer" style={{ width: '100%', height: '600px' }}/>
      </Spin>
    );
  }
}
