import React, { Component } from 'react';
import { Icon, Tabs, Spin, message } from 'antd';
import { loadBMap } from 'common/utils';
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
    mapData: {},
    BMap: null,
  };
  componentDidMount() {
    const { photoList } = this.props;
    if (Array.isArray(photoList) && photoList.length > 0) {
      const firstList = [photoList[0], ...photoList[0].hisList];
      if (firstList.length > 0) {
        loadBMap().then(BMap => {
          const map = new BMap.Map('mapContainer');
          const firstTask = photoList[0];
          map.enableScrollWheelZoom(true);
          const top_left_control = new BMap.ScaleControl({ anchor: 'BMAP_ANCHOR_TOP_LEFT' });
          const top_left_navigation = new BMap.NavigationControl();
          map.addControl(top_left_navigation);
          map.addControl(top_left_control);
          const { marker, point, infoWindow } = this.markerMaker(firstTask, BMap, map, firstTask.locationTypeName);
          if (marker) {
            map.centerAndZoom(point, 15);
            map.addOverlay(infoWindow);
            marker.addEventListener('click', function() {
              map.openInfoWindow(infoWindow, point);
            });
          }

          const mapData = {};
          photoList.forEach(photo => {
            const fileList = [photo, ...photo.hisList].reverse().filter(item => item.file);
            fileList.forEach((subPhoto, index) => {
              const { marker, point, infoWindow } = this.markerMaker(subPhoto, BMap, map, subPhoto.locationTypeName);
              map.addOverlay(marker);
              mapData[`${subPhoto.name}-${index}`] = { marker, point, infoWindow };
            });
          });
          this.addResetControl(map, BMap);
          this.setState(
            {
              map,
              mapData,
              loading: false,
              BMap,
            },
            this.resetMap
          );
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
  markerMaker = (photo, BMap, map, locationTypeName) => {
    try {
      const carIcon = new BMap.Icon(asset_car, new BMap.Size(32, 32));
      const { file: { latitude, longitude, location, opStarttime } = {}, codetypeDesc: title, distance } = photo;
      const point = new BMap.Point(longitude, latitude);
      const marker = new BMap.Marker(point, { icon: carIcon });
      const opts = {
        width: 200,
        height: 100,
        title,
        enableMessage: true,
      };
      const infoWindow = new BMap.InfoWindow(
        `<p style="font-size: 12px;"><span>距离${locationTypeName}：<b style="font-size: 16px;">${distance}</b> 米</span><br /><span style="font-size: 12px;">拍摄时间：${formatTime(
          opStarttime
        )}</span><br /><span style="font-size: 12px;">地址：${location}</span>`,
        opts
      );
      marker.addEventListener('click', function() {
        map.openInfoWindow(infoWindow, point);
      });
      return { marker, point, infoWindow };
    } catch (error) {
      return {};
    }
  };
  onCardClick = (activeKey, photoId) => () => {
    const { mapData, map } = this.state;
    this.setState({
      activeKey,
    });
    if (!_isEmpty(mapData[photoId])) {
      const { point, infoWindow } = mapData[photoId];

      map.centerAndZoom(point, 15);
      map.setViewport([point], {
        margins: [100, 100, 0, 100],
      });
      map.openInfoWindow(infoWindow, point);
    }
  };
  addResetControl = (map, BMap) => {
    const self = this;
    function ResetControl() {
      this.defaultAnchor = window.BMAP_ANCHOR_TOP_RIGHT;
      this.defaultOffset = new BMap.Size(10, 10);
    }
    ResetControl.prototype = new BMap.Control();
    ResetControl.prototype.initialize = function(map) {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode('重置'));
      div.style.cursor = 'pointer';
      div.style.border = '1px solid gray';
      div.style.backgroundColor = 'white';
      div.onclick = function() {
        self.resetMap();
      };
      map.getContainer().appendChild(div);
      return div;
    };
    const myCtrl = new ResetControl();
    map.addControl(myCtrl);
  };
  resetMap = () => {
    const { mapData, map } = this.state;
    const pointArray = [...Object.keys(mapData).map(key => mapData[key].point)];
    map.setViewport(pointArray);
  };
  render() {
    const { photoList, url } = this.props;
    const { activeKey, loading, tabKey } = this.state;
    return (
      <Spin spinning={loading}>
        <div className={styles.infoWrapper}>
          {photoList.map((item, index) => (
            <div
              className={`${styles.infoCard} ${
                [item, ...item.hisList].filter(item => item.file).length <= 1 ? styles.hideNav : ''
              } ${activeKey === index ? styles.active : ''}`}
              key={index}
            >
              <Tabs
                type="card"
                onTabClick={key => this.onCardClick(index, `${item.name}-${key}`)()}
                defaultActiveKey={String([item, ...item.hisList].filter(item => item.file).length - 1)}
              >
                {[item, ...item.hisList]
                  .reverse()
                  .filter(item => item.file)
                  .map((photo, photoIndex) => (
                    <TabPane key={`${photoIndex}`} tab={photoIndex + 1}>
                      <a href="javascript:;" onClick={this.onCardClick(index, `${item.name}-${photoIndex}`)}>
                        <div className={styles.infoCardDiv}>
                          <p>{photo.codetypeDesc}</p>
                          {!String(url).startsWith('/certificateTask') && (
                            <span style={{ margin: '10px 0' }}>
                              距离{photo.locationTypeName}：<b>{photo.distance}</b> 米
                            </span>
                          )}
                          <span style={{ fontSize: '12px' }}>
                            <Icon type="clock-circle" style={{ marginRight: '5px' }} />
                            {formatTime(photo.file.opStarttime)}
                          </span>
                          <span style={{ fontSize: '12px' }}>
                            <Icon type="environment" style={{ marginRight: '5px' }} />
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
        <div id="mapContainer" style={{ width: '100%', height: '600px' }} />
      </Spin>
    );
  }
}
