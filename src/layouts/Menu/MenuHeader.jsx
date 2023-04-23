/*
 * @Author zhangjunjie
 * @File header.tsx
 * @Created Date 2018-07-05 15-44
 * @Last Modified: 2018-07-05 15-44
 * @Modified By: zhangjunjie
 */

import * as React from 'react';
import logo from 'assets/logo.png';
import './style.less';

export default class MenuHeader extends React.PureComponent<any, any> {
  render() {
    const { collapsed } = this.props;
    return (
      <div className={`menu-header ${collapsed ? 'collapsed' : ''}`}>
        <img src={logo} />
        <span className="menu-head-title">易查库</span>
      </div>
    );
  }
}
