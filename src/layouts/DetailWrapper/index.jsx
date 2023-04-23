import React from 'react';
import styles from './style.module.less';

export default function DetailWrapper(props) {
  const { title, height, style } = props;
  const fiStyle = { ...{ height: height || 'auto' }, ...style };
  if (!title) {
    return (
      <main className={styles.detailWrapper} style={fiStyle}>
        {props.children}
      </main>
    );
  }
  return (
    <main className={styles.detailWrapperWithTitle} style={fiStyle}>
      <div className={styles.detailHeader}>
        <div className={styles.detailTitle}>{title}</div>
      </div>
      <div className={styles.detailContent}>{props.children}</div>
    </main>
  );
}
