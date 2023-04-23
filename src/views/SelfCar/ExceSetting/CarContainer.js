import React, { Component } from 'react';
import { httpCommonClient } from 'common/axios';
import { message } from 'antd';
import View from './View';
export default class carExce extends Component {
  state = {
    data: [],
  };
  handleSearch = () => {
    httpCommonClient
      .post(`/self-car/v1.0/selfExceptionType/find/list/used`, { spottesttype: 20 })
      .then(res => {
        if (res.data.code == 200) {
          let data = res.data.data;
          this.setState({ data });
        }
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  componentDidMount() {
    this.handleSearch();
  }
  render() {
    return (
      <div>
        {this.state.data.length > 0 && (
          <View spottesttype={20} data={this.state.data} handleSearch={this.handleSearch}></View>
        )}
      </div>
    );
  }
}
