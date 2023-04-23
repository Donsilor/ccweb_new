import React from 'react';
import styles from './style.module.less';

function WrapperCreator(wrapperName) {
  function WrapperName(props) {
    const { className } = props;
    return <div className={`${styles[wrapperName]} ${className || ''}`}>{props.children}</div>;
  }
  WrapperName.displayName = wrapperName;
  return WrapperName;
}

const ViewWrapper = WrapperCreator('ViewWrapper');
const FormArea = WrapperCreator('FormArea');
const OperArea = WrapperCreator('OperArea');

export { ViewWrapper, FormArea, OperArea };
