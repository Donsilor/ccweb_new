import React, { Component } from 'react';
import { Input, Radio, Tabs, message } from 'antd';
import { httpCommonClient } from 'common/axios';
import styles from './style.module.less';
import _ from 'lodash';
const { TabPane } = Tabs;
class SetFinForm extends Component {
  state = {
    ewName: '',
    ewShow: false,
    data: {},
  };

  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    httpCommonClient
      .post(`/self-car/v1.0/selfDistributorParamItem/find/product/list`, { financialProducts: this.props.record.code })
      .then(res => {
        if (res.data.code === 200) {
          this.setState({ data: res.data.data });
          this.props.onSubmit(res.data.data);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        message.error('操作失败');
      });
  };
  onChange = name => e => {
    const { data } = this.state;
    const value = e.target.value;
    _.set(data, name, typeof value == 'number' ? value : value.replace(/[^\d]/g, ''));
    this.setState({ data });
    this.props.onSubmit(data);
  };
  render() {
    const data = Object.values(this.state.data);
    const keys = Object.keys(this.state.data);
    return (
      <Tabs className={styles.table} defaultActiveKey="0">
        {data.length &&
          data.map((item, index) => (
            <TabPane tab={item.itemName} key={index}>
              <div className={styles.tit}>任务下发后时效 :</div>
              <Radio.Group value={item.endTimeType} onChange={this.onChange(`${keys[index]}.endTimeType`)}>
                <Radio value={1}>
                  任务下发时间后加&nbsp;
                  {item.endTimeType == 1 ? (
                    <Input
                      size="small"
                      value={item.endTimeValue}
                      onChange={this.onChange(`${keys[index]}.endTimeValue`)}
                    />
                  ) : (
                    <Input size="small" value=""></Input>
                  )}
                  &nbsp;小时有效
                </Radio>
                <br />
                <Radio value={2}>
                  任务下发后&nbsp;
                  {item.endTimeType == 2 ? (
                    <Input
                      size="small"
                      value={item.endTimeValue}
                      onChange={this.onChange(`${keys[index]}.endTimeValue`)}
                    />
                  ) : (
                    <Input size="small" value=""></Input>
                  )}
                  &nbsp;自然日有效
                </Radio>
                <br />
                <Radio value={3}>永久有效</Radio>
              </Radio.Group>
              <div className={styles.tit}>看到车架号后时效 :</div>
              <Radio.Group
                value={item.confirmEndTimeType}
                onChange={this.onChange(`${keys[index]}.confirmEndTimeType`)}
              >
                <Radio value={1}>任务原有时效</Radio>
                <br />
                <Radio value={2}>
                  看到车架号时间加&nbsp;
                  <Input
                    size="small"
                    value={item.confirmEndTimeValue}
                    onChange={this.onChange(`${keys[index]}.confirmEndTimeValue`)}
                  />
                  &nbsp;小时有效
                </Radio>
              </Radio.Group>
            </TabPane>
          ))}
      </Tabs>
    );
  }
}

export default SetFinForm;
