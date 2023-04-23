/*
 * @Author zhangjunjie
 * @File menu.tsx
 * @Created Date 2018-07-05 10-37
 * @Last Modified: 2018-07-05 10-37
 * @Modified By: zhangjunjie
 */

import { Icon, Menu as AntMenu } from 'antd';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
const SubMenu = AntMenu.SubMenu;

export default function MenuRender(menu) {
  if (!menu.subMenu) {
    return (
      <AntMenu.Item key={menu.id}>
        <NavLink to={`/${menu.link}`}>
          {menu.icon && <Icon type={menu.icon || ''} />}
          <span>{menu.name}</span>
        </NavLink>
      </AntMenu.Item>
    );
  } else {
    return (
      <SubMenu
        key={menu.id}
        title={
          <span>
            {menu.icon && <Icon type={menu.icon || ''} />}
            <span>{menu.name}</span>
          </span>
        }
      >
        {menu.subMenu.map(MenuRender)}
      </SubMenu>
    );
  }
}
