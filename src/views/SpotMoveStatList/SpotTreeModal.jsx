import React, { Component, Fragment } from 'react';
import { Button, Divider, Icon, message, Modal, Table } from 'antd';
import { httpFormClient } from 'common/axios';
import styles from './style.module.less';
import { formatTime } from 'common/utils';
import _ from 'lodash';

export default class SpotTreeModal extends Component {
  state = {
    spotTree: [],
  };

  componentDidMount = async () => {
    await this.handleSearch();
    setTimeout(() => {
      this.drawLevel(1);
    }, 10);
  };

  getLevelNode = level => {
    if (!Array.isArray(this.state.spotTree)) {
      return null;
    }
    const node = this.state.spotTree.find(item => item.id === level);
    return node || { nodeList: [] };
  };

  handleSearch = async () => {
    const { record = {} } = this.props;
    const isMoveSpot = record.spotTestType === 5;
    const url = isMoveSpot ? '/SpotStatAction_getMoveTree' : '/SpotStatAction_getSpotTree';
    if (_.isEmpty(record)) {
      return;
    }
    const { data = {} } = await httpFormClient.formSubmit(url, '', {
      bookTime: formatTime(record.bookTime),
      spotTestType: isMoveSpot ? undefined : record.spotTestType,
    });
    if (data.result === 0) {
      this.setState({
        spotTree: isMoveSpot ? data.moveTree : data.spotTree,
      });
    }
  };

  drawLevel = level => {
    this.getLevelNode(level).nodeList.forEach(item => {
      const leftPoint = document.getElementById(`${item.parentId}-${item.id}-right`);
      this.getLevelNode(level + 1)
        .nodeList.filter(subItem => subItem.parentId === item.id)
        .forEach(subItem => {
          const rightPoint = document.getElementById(`${subItem.parentId}-${subItem.id}-left`);
          this.drawSingleLine(
            leftPoint.offsetLeft - 1,
            leftPoint.offsetTop - 1,
            rightPoint.offsetLeft + 1,
            rightPoint.offsetTop + 1,
            subItem.colorFlag
          );
        });
      this.drawLevel(level + 1);
    });
  };

  drawSingleLine = (x1, y1, x2, y2, colorFlag) => {
    const x0 = Math.min(x1, x2);
    const y0 = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    const node = document.createElement('div');
    const lineColor = colorFlag === 2 ? '#ff3322' : '#5192cd';
    if (height > 5) {
      var radina = Math.atan(height / width); //用反三角函数求弧度
      var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度
      node.style.cssText = `left: ${x0}px; top: ${y0}px; width: ${width}px; height: ${height}px; background: linear-gradient(${angle}deg, transparent 0, transparent calc(50% - 2px), ${lineColor} calc(50% - 1px), ${lineColor} calc(50%), transparent calc(50% + 1px), transparent 100%);${
        y2 > y1 ? 'transform: rotate(180deg);' : 'transform: rotateY(180deg)'
      }`;
    } else {
      node.style.cssText = `left: ${x0}px; top: ${y0}px; width: ${width}px; height: 2px; background: ${lineColor};`;
    }
    node.classList.add(styles.line);
    document.getElementById('container').appendChild(node);
  };

  renderNode = (level, parentId) => {
    return this.getLevelNode(level)
      .nodeList.filter(item => item.parentId === parentId || parentId === 0)
      .map(item => (
        <div className={styles.levelInner} key={item.id}>
          <div className={styles.column}>
            <div className={`${styles.cell} ${item.colorFlag === 2 ? styles.warn : styles.regular}`}>
              <div
                className={`${styles.point} ${styles.pointLeft} ${item.colorFlag === 2 ? styles.warn : styles.regular}`}
                id={`${parentId}-${item.id}-left`}
              />
              <span style={{ flex: 1, textAlign: 'center', fontSize: '12px' }}>{item.title}</span>
              <div
                className={`${styles.point} ${styles.pointRight} ${
                  item.colorFlag === 2 ? styles.warn : styles.regular
                }`}
                id={`${parentId}-${item.id}-right`}
              />
            </div>
          </div>
          <div className={styles.levelWrapper}>{this.renderNode(level + 1, item.id)}</div>
        </div>
      ));
  };

  render() {
    const { record = {}, onCancel } = this.props;
    const { spotTree = [] } = this.state;
    return (
      <Modal title={`${record.spotTestTypeName}树状图`} visible onCancel={onCancel} footer={null} width={800}>
        {Array.isArray(spotTree) && spotTree.length > 0 && (
          <div className={styles.container} id="container">
            <div className={styles.title}>
              {spotTree.map(item => (
                <div className={styles.titleColumn} key={item.id}>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.title}</span>
                </div>
              ))}
            </div>
            <div className={styles.content}>{this.renderNode(1, 0)}</div>
            {spotTree.map((item, index) => (
              <div className={styles.columnBg} key={index} style={{ left: `${150 * index}px` }}></div>
            ))}
          </div>
        )}
      </Modal>
    );
  }
}
