import React from 'react';
import { BackTop, Layout as AntLayout, message } from 'antd';
import * as R from 'ramda';
import { withRouter, NavLink } from 'react-router-dom';
import { tabList, subMenuMap } from 'common/menuConfig';
import Header from './Header';
import Main from './Main';
import Menu from './Menu';
import ActionArea from './ActionArea';

const defaultPathConfig = {
  module: {
    id: 'home',
    name: '主页',
    icon: 'home',
  },
  menu: {
    id: '',
    name: '',
    link: '',
  },
  subMenu: {
    id: '',
    name: '',
  },
  tabMenu: {
    id: '',
    name: '',
    link: '',
  },
};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      openKeys: [''],
      pathConfig: defaultPathConfig,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { location, menus } = props;
    const [newMenuPath, newSubMenuPath, newTabMenuPath] = R.match(/(\/\w+)/g, location.pathname || '');
    const menuPath = (newMenuPath && newMenuPath.slice(1)) || '';
    const subMenuPath = (newSubMenuPath && newSubMenuPath.slice(1)) || '';
    const tabMenuPath = (newTabMenuPath && newTabMenuPath.slice(1)) || '';
    let newMenus = [];
    Array.isArray(menus) &&
      R.forEach(module => {
        newMenus = newMenus.concat(module.subMenu);
      }, menus);
    if (!menuPath || newMenus.findIndex(menu => menu.link === menuPath) == -1) {
      return {
        ...state,
        pathConfig: defaultPathConfig,
      };
    }
    const activeMenu = newMenus.find(menu => menu.link === menuPath) || {};
    const parentId = activeMenu && activeMenu.parentId;
    const activeModule = Array.isArray(menus) && menus.find(menu => menu.id === parentId);
    const tabMenu = Array.isArray(tabList[subMenuPath])
      ? tabList[subMenuPath].find(tab => tab.link === tabMenuPath) || {}
      : {};
    const pathConfig = {
      module: {
        id: activeModule.id,
        name: activeModule.name,
        icon: activeModule.icon,
      },
      menu: {
        id: activeMenu.id,
        name: activeMenu.name,
        link: activeMenu.link,
      },
      subMenu: {
        id: subMenuPath,
        name: subMenuMap[subMenuPath],
      },
      tabMenu,
    };
    if (activeModule.id === state.pathConfig.module.id) {
      return {
        ...state,
        pathConfig,
      };
    }
    return {
      ...state,
      openKeys: [activeModule.id],
      pathConfig,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLogin !== prevProps.isLogin && !this.props.inIframe) {
      if (this.props.isLogin === false) {
        message.error(
          <span>
            登录状态已过期，点击<a href="/ccweb_new/login">重新登录</a>
          </span>,
          0
        );
      } else if (this.props.isLogin === true) {
        message.success('登录成功');
      }
    }
    if (this.props.errorMsg !== prevProps.errorMsg && this.props.errorMsg !== '' && this.props.isLogin) {
      message.error(this.props.errorMsg);
    }
  }

  handleModuleSelect = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1) || '';
    if (this.props.menus.map(menu => menu.id).indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  handleCollapse = collapsed => {
    this.setState({ collapsed });
  };
  componentDidMount() {
    this.props.init();
    this.props.fetchAllRegionList();
  }

  render() {
    const { menus, session, location, inIframe, isLogin } = this.props;
    const { pathConfig, collapsed } = this.state;

    return R.isNil(menus) ? null : (
      <AntLayout style={{ height: '100vh' }}>
        {!inIframe && (
          <Menu
            collapsed={collapsed}
            menus={menus}
            handleModuleSelect={this.handleModuleSelect}
            openKeys={this.state.openKeys}
            selectedMenuId={pathConfig.menu.id || pathConfig.module.id}
          />
        )}
        <AntLayout
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          {!inIframe && <Header collapsed={collapsed} onCollapse={this.handleCollapse} session={session} />}
          <ActionArea inIframe={inIframe} pathConfig={pathConfig} location={location} />
          {isLogin && <Main inIframe={inIframe} collapsed={collapsed} />}
          <BackTop />
        </AntLayout>
      </AntLayout>
    );
  }
}
export default withRouter(Layout);
