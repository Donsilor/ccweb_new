import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, matchPath } from 'react-router';
import * as R from 'ramda';
import { Button } from 'antd';

class BackToList extends PureComponent {
  goBack = () => {
    try {
      let menu = this.props.match.params.menu;
      const { search } = this.props.location;
      const [tab] = R.match(/tab=\w+/g, search || '');
      const [menuParam] = R.match(/menu=\w+/g, search || '');
      const [newMenuParam] = R.match(/newMenu=\w+/g, search || '');
      if (!menu) {
        const matchResult = matchPath(this.props.location.pathname, {
          path: '/:menu',
        });
        menu = matchResult.params.menu;
      }
      let link = `/${menu}`;
      if (tab) {
        const tabName = tab && tab.slice(4);
        link = `/${menu}/list/${tabName || 'todoList'}`;
      } else if (newMenuParam) {
        const newMenuParamName = newMenuParam && newMenuParam.slice(8);
        link = {
          pathname: `/${newMenuParamName}`,
          search: menuParam ? `?menu=${menuParam && menuParam.slice(5)}` : ``,
        };
      } else if (menuParam) {
        const menuParamName = menuParam && menuParam.slice(5);
        link = `/${menuParamName}`;
      }
      this.props.history.push(link);
    } catch (error) { }
  };
  render() {
    return <Button onClick={this.goBack}>返回列表</Button>;
  }
}

export default withRouter(
  connect(
    null,
    null
  )(BackToList)
);
