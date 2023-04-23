import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router';
import Breadcrumb from '../Breadcrumb';
import { tabList } from 'common/menuConfig';
import styles from './style.module.less';

class ActionArea extends Component {
  state = {
    menuId: '',
    mensubMenuIduId: '',
    id: '',
    tabList: [],
    tabId: '',
  };

  static getDerivedStateFromProps(props, state) {
    const match = matchPath(props.location.pathname, {
      path: '/:menuId/:subMenuId/:tabId/:id?',
    });
    const shortMatch = matchPath(props.location.pathname, {
      path: '/:menuId/:tabId?',
    });
    if (match && match.params) {
      const { params: { menuId, subMenuId, tabId, id } = {} } = match;
      return {
        ...state,
        tabList: menuId && tabList[subMenuId] ? tabList[subMenuId].filter(tab => tab.parentId.includes(menuId)) : [],
        menuId,
        subMenuId,
        tabId,
        id,
      };
    } else if (shortMatch && shortMatch.params) {
      const { params: { menuId, tabId } = {} } = shortMatch;
      return {
        ...state,
        tabList: menuId && tabList[menuId] ? tabList[menuId].filter(tab => tab.parentId.includes(menuId)) : [],
        menuId,
        subMenuId: '',
        tabId,
        id: '',
      };
    } else {
      return {
        ...state,
        tabList: [],
      };
    }
  }

  render() {
    const { inIframe, location, tabData } = this.props;
    const { menuId, subMenuId, tabId, id } = this.state;
    return (
      <div className={styles.actionArea}>
        <div className={`${styles.wrapper} ${inIframe ? inIframe : ''}`}>
          <div id="breadcrumb">
            <Breadcrumb inIframe={inIframe} />
          </div>
          <div className={styles.tabArea}>
            <ul>
              {this.state.tabList.map(tab => (
                <li key={tab.id} className={tab.id === tabId ? styles.active : ''}>
                  <Link
                    to={{
                      pathname: `/${menuId}${subMenuId ? `/${subMenuId}` : ``}/${tab.link}${id ? '/' + id : ''}`,
                      search: location.search,
                    }}
                  >
                    {`${tab.name}${tabData && tabData[tab.id] ? `(${tabData[tab.id]})` : ''}`}
                  </Link>
                </li>
              ))}
            </ul>
            <div id="operation-root-menu" />
          </div>
          <div id="operation-root" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  tabData: store.tabData,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(ActionArea)
);
