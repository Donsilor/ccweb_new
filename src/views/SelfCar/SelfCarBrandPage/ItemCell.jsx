import React, { Component } from 'react';
import { Badge, Icon, Tooltip } from 'antd';
import styles from './style.module.less';

export default class ItemCell extends Component {
  state = {
    isHover: false,
  };
  render() {
    const { isHover } = this.state;
    const { name, id, onClick, onDelete, active } = this.props;
    const isActive = active || isHover;
    return (
      <div
        onClick={() => typeof onClick === 'function' && onClick(id)}
        onMouseOver={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}
        className={styles.cellWrapper}
      >
        <Badge status={!isActive ? 'default' : 'success'} />
        <span className={`${styles.cell} ${active ? styles.active : ''}`}>
          <Tooltip placement="topLeft" title={name}>
            {name}
          </Tooltip>
        </span>
        <Tooltip title="删除">
          <Icon type="delete" onClick={() => onDelete(id)} className={styles.delBtn} />
        </Tooltip>
      </div>
    );
  }
}
