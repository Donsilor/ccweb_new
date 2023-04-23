import React, { Component } from 'react';
import { Radio, message, Input, Button, Select, Modal, Spin } from 'antd';
import { httpCommonClient } from 'common/axios';
import styles from './style.module.less';
import OperationArea from 'components/OperationArea';
import _ from 'lodash';
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
export default class carPhoTemp extends Component {
  state = {
    data: {},
  };
  saveData = () => {
    let data = _.isEmpty(this.state.data) ? this.props.data : this.state.data;
    let self = this;
    confirm({
      title: '请确认是否保存?',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfSpottestTemplate/update`, {
            id: self.props.id,
            templateContext: JSON.stringify(data),
          })
          .then(({ data }) => {
            if (data.code == 200) {
              message.success('保存成功');
            } else {
              message.error(data.message);
            }
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  onChange = name => e => {
    const { data } = this.props;
    _.set(data, name, e.target ? e.target.value : e.join(','));
    this.setState({ data });
  };
  render() {
    const { data } = this.props;
    const arr = _.get(data, 'settings[0].items[1].options', []);
    const isoptions = [{ label: '是', value: '1' }, { label: '否', value: '0' }];
    const children = [];
    for (let i in arr) {
      children.push(<Option key={arr[i].value}>{arr[i].label}</Option>);
    }
    return (
      <div className={styles.conBar}>
        <OperationArea>
          <Button type="primary" onClick={this.saveData}>
            保存
          </Button>
        </OperationArea>
        <Spin spinning={false}>
          <div className={styles.conflex}>
            <div>
              <p>照片</p>
              <div className={styles.conitem}>
                <div>
                  <span className={styles.tit}>车架号</span>
                  <Radio.Group
                    className={styles.radioGroup}
                    options={_.get(data, 'settings[0].items[0].options', [])}
                    value={_.get(data, 'settings[0].items[0].value', '5,8')}
                    onChange={this.onChange('settings[0].items[0].value')}
                  />
                </div>
                <br></br>
                <br></br>
                <div>
                  <span className={styles.tit} style={{ marginBottom: '20px' }}>
                    其他位置
                  </span>
                  <div>
                    <Select
                      style={{ width: '90%' }}
                      mode="multiple"
                      placeholder="请选择"
                      value={
                        _.get(data, 'settings[0].items[1].value', '')
                          ? _.get(data, 'settings[0].items[1].value', '').split(',')
                          : []
                      }
                      onChange={this.onChange('settings[0].items[1].value')}
                    >
                      {children}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p>视频</p>
              <div className={styles.conitem}>
                <div>
                  <span className={styles.tit}>是否拍摄视频</span>
                  <Radio.Group
                    options={isoptions}
                    value={_.get(data, 'settings[1].onoff.value', '0')}
                    className={styles.radioGroup}
                    onChange={this.onChange('settings[1].onoff.value')}
                  />
                </div>
                <br></br>
                <br></br>
                <div>
                  {_.get(data, 'settings[1].onoff.value') == '1' && (
                    <div>
                      <span className={styles.tit} style={{ marginBottom: '20px' }}>
                        拍摄内容
                      </span>
                      <Radio.Group
                        options={_.get(data, 'settings[1].items[0].options', [])}
                        className={styles.radioGroup}
                        value={_.get(data, 'settings[1].items[0].value')}
                        onChange={this.onChange('settings[1].items[0].value')}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <p>文本</p>
              <div className={styles.conitem}>
                <div>
                  <span className={styles.tit}>是否编辑文本</span>
                  <Radio.Group
                    options={isoptions}
                    className={styles.radioGroup}
                    value={_.get(data, 'settings[2].onoff.value', '0')}
                    onChange={this.onChange('settings[2].onoff.value')}
                  />
                </div>
                <br></br>
                {_.get(data, 'settings[2].onoff.value', '0') == '1' && (
                  <div>
                    <div className={styles.outFlex}>
                      <p>文本标签1</p>
                      <TextArea
                        rows={3}
                        value={_.get(data, 'settings[2].items[0].value', '')}
                        onChange={this.onChange('settings[2].items[0].value')}
                      ></TextArea>
                      <div>
                        是否必填
                        <Radio.Group
                          options={isoptions}
                          value={_.get(data, 'settings[2].items[0].properties[0].value', '1')}
                          onChange={this.onChange('settings[2].items[0].properties[0].value')}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className={styles.outFlex}>
                      <p>文本标签2</p>
                      <TextArea
                        rows={3}
                        value={_.get(data, 'settings[2].items[1].value', '')}
                        onChange={this.onChange('settings[2].items[1].value')}
                      ></TextArea>
                      <div>
                        是否必填
                        <Radio.Group
                          options={isoptions}
                          value={_.get(data, 'settings[2].items[1].properties[0].value', '1')}
                          onChange={this.onChange('settings[2].items[1].properties[0].value')}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}
