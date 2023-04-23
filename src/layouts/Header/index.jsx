/*
 * @Author Osborn
 * @File index.tsx
 * @Created Date 2018-06-28 16-54
 * @Last Modified: 2018-06-28 16-54
 * @Modified By: Osborn
 */

import { Icon, Layout, Button } from 'antd';
import { withRouter, NavLink } from 'react-router-dom';
import * as React from 'react';
import styles from './style.module.less';
const { Header } = Layout;

class HeaderCustom extends React.Component {
  handleCollapse = e => {
    e && e.preventDefault();
    this.props.onCollapse(!this.props.collapsed);
  };
  logout = () => {
    this.props.history.push('/login');
  };
  render() {
    const { session } = this.props;
    return (
      <Header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Icon
            className={`${styles.icon} trigger`}
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.handleCollapse}
          />
          <div style={{ float: 'right' }}>
            <Icon className={styles.icon} type="user" style={{ padding: 0 }} />
            <span className={styles.userName}>{session.employeename}</span>
            <Icon className={styles.icon} type="logout" style={{ padding: 0, marginLeft: 10 }} onClick={this.logout} />
          </div>
        </div>
      </Header>
    );
  }
}

export default withRouter(HeaderCustom);
