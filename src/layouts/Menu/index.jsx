/*
 * @Author Osborn
 * @File index.tsx
 * @Created Date 2018-06-28 16-54
 * @Last Modified: 2018-06-28 16-54
 * @Modified By: Osborn
 */

import { Icon, Layout, Menu as AntMenu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuHeader from './MenuHeader';
import MenuRender from './MenuRender';
import { MenuProps } from 'antd/lib/menu';
const { Sider } = Layout;

interface State {
  collapsed: boolean;
  active: string;
}

class Menu extends React.Component<any, State> {
  renderedMenu: any;
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      active: 'home',
    };
    this.renderedMenu = (props.menus && props.menus.map(MenuRender)) || null;
  }

  onOpenChange = (openKeys: string[]) => {
    this.props.handleModuleSelect(openKeys);
  };

  render() {
    const { selectedMenuId, openKeys } = this.props;
    const menuProps: MenuProps = {
      theme: 'dark',
      defaultSelectedKeys: [this.state.active],
      onOpenChange: this.onOpenChange,
      selectedKeys: [selectedMenuId],
      mode: 'inline',
      style: { height: this.props.collapsed ? 'calc(100vh - 64px)' : 'calc(100vh - 128px)', paddingTop: '20px' },
    };
    if (!this.props.collapsed) {
      menuProps.openKeys = [...openKeys];
    }

    return (
      <Sider
        theme="dark"
        trigger={null}
        collapsible={true}
        collapsed={this.props.collapsed}
        style={{ height: '100vh', zIndex: 20 }}
      >
        <MenuHeader collapsed={this.props.collapsed} />
        <AntMenu
          {...menuProps}
          style={{ height: 'calc(100vh - 64px)', zIndex: 20, overflowY: 'auto', overflowX: 'hidden' }}
        >
          <AntMenu.Item key="home">
            <NavLink to={'/'}>
              <Icon type={'home'} />
              <span>主页</span>
            </NavLink>
          </AntMenu.Item>
          {this.renderedMenu && this.renderedMenu}
        </AntMenu>
      </Sider>
    );
  }
}

export default Menu;
