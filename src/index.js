/* eslint-disable no-undef */
/* eslint no-restricted-globals: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import './index.css';
import App from './App';
import { LocaleProvider } from 'antd';
import * as serviceWorker from './serviceWorker';
import menus from './common/menuConfig';

import 'ant-design-pro/dist/ant-design-pro.css';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import configureStore from './redux/store';

moment.locale('zh-cn');
document.getElementById('spinner').hidden = true;
let inIframe = false;
try {
  if (self !== top) {
    inIframe = true;
  }
} catch (error) {
  console.error('判断是否在iframe中失败', error.message);
}

const data = {
  common: {
    menus,
    inIframe,
  },
};

const store = configureStore(data);

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <App store={store} />
  </LocaleProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
