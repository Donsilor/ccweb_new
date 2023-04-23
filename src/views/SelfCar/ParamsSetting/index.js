import React, { Component } from 'react';
import { Radio, message, Input, Button, Modal } from 'antd';
import { httpCommonClient } from 'common/axios';
import styles from './style.module.less';
import OperationArea from 'components/OperationArea';
import _ from 'lodash';
const { confirm } = Modal;
export default class regionalism extends Component {
  state = {
    data: {},
  };
  handleSearch = () => {
    httpCommonClient
      .post(`/self-car/v1.0/selfDistributorParamItem/find/list`, {})
      .then(res => {
        let data = res.data.data;
        if (data) {
          this.setState({
            data,
          });
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
  onChange = name => e => {
    const { data } = this.state;
    const value = e.target.value;
    _.set(data, name, typeof value == 'number' ? value : value.replace(/[^\d]/g, ''));
    this.setState({ data });
  };
  saveData = () => {
    let self = this;
    let data = self.state.data;
    let arr = [data[1600], data[1700], data[1900], data[2000]];
    let item = arr.filter(v => v.confirmEndTimeType == 2 && !v.confirmEndTimeValue);
    if (item.length) {
      message.error(`${item[0].itemName}时效未填写 ！`);
      return;
    }
    confirm({
      title: '请确认是否保存?',
      onOk() {
        httpCommonClient
          .post(`/self-car/v1.0/selfDistributorParamItem/update`, data)
          .then(res => {
            if (res.data.code === 200) {
              message.success('保存成功');
              self.handleSearch();
            } else {
              message.error(res.data.message);
            }
          })
          .catch(err => {
            message.error('操作失败');
          });
      },
    });
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <OperationArea>
          <Button type="primary" onClick={this.saveData}>
            保存
          </Button>
        </OperationArea>
        <table border="1" width="100%" className={styles.table}>
          <thead></thead>
          <tbody>
            {_.get(data, '1100.useFlag', 1) && (
              <tr>
                <td width="30%" className={styles.tit}>
                  移至二网是否需要到店确认
                </td>
                <td colSpan="4" className={styles.center}>
                  <Radio.Group value={_.get(data, '1100.itemValue', 0)} onChange={this.onChange('1100.itemValue')}>
                    <Radio value={1}>是</Radio>
                    <br />
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </td>
              </tr>
            )}
            {_.get(data, '1600.useFlag', 1) && _.get(data, '1700.useFlag', 1) && (
              <tr>
                <td width="30%" rowSpan="2" className={styles.tit}>
                  抽查任务时效
                </td>
                <td width="10%" className={styles.titItem}>
                  新车
                </td>
                <td>
                  <Radio.Group value={_.get(data, '1600.endTimeType', 2)} onChange={this.onChange('1600.endTimeType')}>
                    <Radio value={1}>
                      任务下发时间后加&nbsp;
                      {_.get(data, '1600.endTimeType', 2) == 1 ? (
                        <Input
                          size="small"
                          value={_.get(data, '1600.endTimeValue', '')}
                          onChange={this.onChange('1600.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;小时有效
                    </Radio>
                    <br />
                    <Radio value={2}>
                      任务下发后&nbsp;
                      {_.get(data, '1600.endTimeType', 2) == 2 ? (
                        <Input
                          size="small"
                          value={_.get(data, '1600.endTimeValue', '')}
                          onChange={this.onChange('1600.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;自然日有效
                    </Radio>
                    <br />
                    <Radio value={3}>永久有效</Radio>
                  </Radio.Group>
                </td>
                <td width="10%" className={styles.titItem}>
                  看到车架号后时效
                </td>
                <td>
                  <Radio.Group
                    value={_.get(data, '1600.confirmEndTimeType', 1)}
                    onChange={this.onChange('1600.confirmEndTimeType')}
                  >
                    <Radio value={1}>任务原有时效</Radio>
                    <br />
                    <Radio value={2}>
                      看到车架号时间加&nbsp;
                      <Input
                        size="small"
                        value={_.get(data, '1600.confirmEndTimeValue')}
                        onChange={this.onChange('1600.confirmEndTimeValue')}
                      />
                      &nbsp;小时有效
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
            )}
            {_.get(data, '1600.useFlag', 1) && _.get(data, '1700.useFlag', 1) && (
              <tr>
                <td width="10%" className={styles.titItem}>
                  二手车
                </td>
                <td>
                  <Radio.Group value={_.get(data, '1700.endTimeType', 2)} onChange={this.onChange('1700.endTimeType')}>
                    <Radio value={1}>
                      任务下发时间后加&nbsp;
                      {_.get(data, '1700.endTimeType', 2) == 1 ? (
                        <Input
                          size="small"
                          value={_.get(data, '1700.endTimeValue')}
                          onChange={this.onChange('1700.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;小时有效
                    </Radio>
                    <br />
                    <Radio value={2}>
                      任务下发后&nbsp;
                      {_.get(data, '1700.endTimeType', 2) == 2 ? (
                        <Input
                          size="small"
                          value={_.get(data, '1700.endTimeValue')}
                          onChange={this.onChange('1700.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;自然日有效
                    </Radio>
                    <br />
                    <Radio value={3}>永久有效</Radio>
                  </Radio.Group>
                </td>
                <td width="10%" className={styles.titItem}>
                  看到车架号后时效
                </td>
                <td>
                  <Radio.Group
                    value={_.get(data, '1700.confirmEndTimeType', 1)}
                    onChange={this.onChange('1700.confirmEndTimeType')}
                  >
                    <Radio value={1}>任务原有时效</Radio>
                    <br />
                    <Radio value={2}>
                      看到车架号时间加&nbsp;
                      <Input
                        size="small"
                        value={_.get(data, '1700.confirmEndTimeValue')}
                        onChange={this.onChange('1700.confirmEndTimeValue')}
                      />
                      &nbsp;小时有效
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
            )}
            {_.get(data, '2100.useFlag', 1) && _.get(data, '2200.useFlag', 1) && (
              <tr>
                <td width="30%" rowSpan="2" className={styles.tit}>
                  移动任务时效
                </td>
                <td width="10%" className={styles.titItem}>
                  新车
                </td>
                <td colSpan="3">
                  <Radio.Group value={_.get(data, '2100.endTimeType', 2)} onChange={this.onChange('2100.endTimeType')}>
                    <Radio value={1}>
                      任务下发时间后加&nbsp;
                      {_.get(data, '2100.endTimeType', 2) == 1 ? (
                        <Input
                          size="small"
                          value={_.get(data, '2100.endTimeValue')}
                          onChange={this.onChange('2100.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;小时有效
                    </Radio>
                    <br />
                    <Radio value={2}>
                      任务下发后&nbsp;
                      {_.get(data, '2100.endTimeType', 2) == 2 ? (
                        <Input
                          size="small"
                          value={_.get(data, '2100.endTimeValue')}
                          onChange={this.onChange('2100.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;自然日有效
                    </Radio>
                    <br />
                    <Radio value={3}>永久有效</Radio>
                  </Radio.Group>
                </td>
              </tr>
            )}
            {_.get(data, '2100.useFlag', 1) && _.get(data, '2200.useFlag', 1) && (
              <tr>
                <td width="10%" className={styles.titItem}>
                  二手车
                </td>
                <td colSpan="3">
                  <Radio.Group value={_.get(data, '2200.endTimeType', 2)} onChange={this.onChange('2200.endTimeType')}>
                    <Radio value={1}>
                      任务下发时间后加&nbsp;
                      {_.get(data, '2200.endTimeType', 2) == 1 ? (
                        <Input
                          size="small"
                          value={_.get(data, '2200.endTimeValue')}
                          onChange={this.onChange('2200.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;小时有效
                    </Radio>
                    <br />
                    <Radio value={2}>
                      任务下发后&nbsp;
                      {_.get(data, '2200.endTimeType', 2) == 2 ? (
                        <Input
                          size="small"
                          value={_.get(data, '2200.endTimeValue')}
                          onChange={this.onChange('2200.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;自然日有效
                    </Radio>
                    <br />
                    <Radio value={3}>永久有效</Radio>
                  </Radio.Group>
                </td>
              </tr>
            )}
            {!!_.get(data, '1900.useFlag', 1) && !!_.get(data, '2000.useFlag', 1) && (
              <tr>
                <td width="30%" rowSpan="2" className={styles.tit}>
                  盘证抽查任务时效
                </td>
                <td width="10%" className={styles.titItem}>
                  新车
                </td>
                <td>
                  <Radio.Group value={_.get(data, '1900.endTimeType', 2)} onChange={this.onChange('1900.endTimeType')}>
                    <Radio value={1}>
                      任务下发时间后加&nbsp;
                      {_.get(data, '1900.endTimeType', 2) == 1 ? (
                        <Input
                          size="small"
                          value={_.get(data, '1900.endTimeValue')}
                          onChange={this.onChange('1900.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;小时有效
                    </Radio>
                    <br />
                    <Radio value={2}>
                      任务下发后&nbsp;
                      {_.get(data, '1900.endTimeType', 2) == 2 ? (
                        <Input
                          size="small"
                          value={_.get(data, '1900.endTimeValue')}
                          onChange={this.onChange('1900.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;自然日有效
                    </Radio>
                    <br />
                    <Radio value={3}>永久有效</Radio>
                  </Radio.Group>
                </td>
                <td width="10%" className={styles.titItem}>
                  接任务后时效
                </td>
                <td>
                  <Radio.Group
                    value={_.get(data, '1900.confirmEndTimeType', 1)}
                    onChange={this.onChange('1900.confirmEndTimeType')}
                  >
                    <Radio value={1}>任务原有时效</Radio>
                    <br />
                    <Radio value={2}>
                      接任务时间加&nbsp;
                      <Input
                        size="small"
                        value={_.get(data, '1900.confirmEndTimeValue')}
                        onChange={this.onChange('1900.confirmEndTimeValue')}
                      />
                      &nbsp;小时有效
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
            )}
            {!!_.get(data, '1900.useFlag', 1) && !!_.get(data, '2000.useFlag', 1) && (
              <tr>
                <td width="10%" className={styles.titItem}>
                  二手车
                </td>
                <td>
                  <Radio.Group value={_.get(data, '2000.endTimeType', 2)} onChange={this.onChange('2000.endTimeType')}>
                    <Radio value={1}>
                      任务下发时间后加&nbsp;
                      {_.get(data, '2000.endTimeType', 2) == 1 ? (
                        <Input
                          size="small"
                          value={_.get(data, '2000.endTimeValue')}
                          onChange={this.onChange('2000.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;小时有效
                    </Radio>
                    <br />
                    <Radio value={2}>
                      任务下发后&nbsp;
                      {_.get(data, '2000.endTimeType', 2) == 2 ? (
                        <Input
                          size="small"
                          value={_.get(data, '2000.endTimeValue')}
                          onChange={this.onChange('2000.endTimeValue')}
                        />
                      ) : (
                        <Input size="small" value=""></Input>
                      )}
                      &nbsp;自然日有效
                    </Radio>
                    <br />
                    <Radio value={3}>永久有效</Radio>
                  </Radio.Group>
                </td>
                <td width="10%" className={styles.titItem}>
                  接任务后时效
                </td>
                <td>
                  <Radio.Group
                    value={_.get(data, '2000.confirmEndTimeType', 1)}
                    onChange={this.onChange('2000.confirmEndTimeType')}
                  >
                    <Radio value={1}>任务原有时效</Radio>
                    <br />
                    <Radio value={2}>
                      接任务时间加&nbsp;
                      <Input
                        size="small"
                        value={_.get(data, '2000.confirmEndTimeValue')}
                        onChange={this.onChange('2000.confirmEndTimeValue')}
                      />
                      &nbsp;小时有效
                    </Radio>
                  </Radio.Group>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
