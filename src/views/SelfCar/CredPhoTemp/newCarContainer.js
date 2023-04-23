import React, { Component } from 'react';
import { message } from 'antd';
import { httpCommonClient } from 'common/axios';
import View from './View';
import _ from 'lodash';
export default class carPhoTemp extends Component {
  state = {
    data: {},
    id: 0,
    templateName: '',
  };
  listSearch = id => {
    httpCommonClient
      .post(`/self-car/v1.0/selfSpottestTemplate/find/one`, { id: id })
      .then(res => {
        if (res.data.code == 200) {
          let data = res.data.data;
          this.setState({
            data: eval('(' + data.templateContext + ')'),
            id: data.id,
            templateName: data.templateName,
          });
          console.log(eval('(' + data.templateContext + ')'));
        }
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  handleSearch = () => {
    httpCommonClient
      .post(`/self-car/v1.0/selfSpottestTemplate/find/list`, { spottesttype: '30' })
      .then(res => {
        if (res.data.code == 200) {
          if (_.isEmpty(res.data.data)) return;
          let data = res.data.data;
          this.listSearch(data.filter(item => item.templateName == '新车')[0].id);
        } else {
          message.error(res.data.message);
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
      !_.isEmpty(this.state.data) && (
        <View data={this.state.data} id={this.state.id} templateName={this.state.templateName}></View>
      )
    );
  }
}
