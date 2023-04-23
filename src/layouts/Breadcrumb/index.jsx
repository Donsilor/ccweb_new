import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb, Icon } from 'antd';
import menus, { subMenuMap } from 'common/menuConfig';

class BreadcrumbNew extends PureComponent {
  subMenus = menus.map(menu => menu.subMenu).reduce((a, b) => a.concat(b));

  getConfig = () => {
    const match = matchPath(this.props.location.pathname, {
      path: '/:menuPath/:subMenuPath?',
    });
    if (!match) {
      return null;
    }
    const { params: { menuPath, subMenuPath } = {} } = match;
    const menu = this.subMenus.find(subMenu => subMenu.link === menuPath);
    const module = menu && menus.find(item => item.id === menu.parentId);
    const subMenuName = (subMenuMap[menuPath] && subMenuMap[menuPath][subMenuPath]) || '';
    return {
      module,
      menu,
      subMenuName: subMenuName,
    };
  };
  render() {
    const config = this.getConfig();
    if (!config) {
      return null;
    }
    const { module, menu, subMenuName } = config;
    return (
      <AntBreadcrumb separator=">">
        {module.id && (
          <AntBreadcrumb.Item key={module.id}>
            <Icon type={module.icon} />
            <span>{module.name}</span>
          </AntBreadcrumb.Item>
        )}
        {menu.id && (
          <AntBreadcrumb.Item key={menu.id}>
            {!this.props.inIframe ? (
              <Link to={`/${menu.link}`}>
                <span>{menu.name}</span>
              </Link>
            ) : (
              <span>{menu.name}</span>
            )}
          </AntBreadcrumb.Item>
        )}
        {subMenuName && (
          <AntBreadcrumb.Item key={subMenuName}>
            <span>{subMenuName}</span>
          </AntBreadcrumb.Item>
        )}
      </AntBreadcrumb>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(BreadcrumbNew)
);
