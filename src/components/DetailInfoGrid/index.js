import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import { Row, Col } from 'antd';
import styles from './style.module.less';

export default function DetailInfoGrid(props) {
  const { list, col = 3, layout = 'horizonal' } = props;
  return (
    <div>
      {chunk(list, col).map((row, rowIndex) => (
        <Row gutter={24} key={rowIndex}>
          {row.map((item, index) => (
            <Col span={24 / col} key={index}>
              {layout === 'horizonal' ? (
                <div>
                  <span className={`${styles.label} ${!item.highlight ? '' : `${styles.bold}`}`}>{item.label}</span>
                  <span className={`${styles.value} ${!item.highlight ? '' : `${styles.bold}`}`}>{item.value}</span>
                </div>
              ) : (
                <div className={styles.wrapper}>
                  <div className={styles.title}>{item.label}</div>
                  <div className={styles.newValue}>{item.value || '-'}</div>
                </div>
              )}
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}
