import React, { Component } from 'react';
import { Form, Select, Button, Modal, Upload, message, Radio, DatePicker, TimePicker } from 'antd';
import { httpCommonClient, httpFormClient } from 'common/axios';
import _ from 'lodash';
import _range from 'lodash/range';
import moment from 'moment';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
@Form.create()
class uploadModal extends Component {
  state = {
    loading: false,
    fileList: [],
    bankList: [],
    bookType: false,
    startTime: new Date(+new Date() + 8 * 3600 * 1000)
      .toISOString()
      .split('T')[1]
      .split('.')[0],
  };
  componentDidMount() {
    httpFormClient.formSubmit(`/com/xhkj/depart/action/BankAction_findAllBankList`, '').then(({ data = {} }) => {
      this.setState({ bankList: JSON.parse(data) });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { fileList } = this.state;
        if (_.isEmpty(fileList)) {
          message.error('请上传文件');
          return false;
        }
        this.setState({ loading: true });
        const formData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('bankId', values.bankId);
        values.bookTime && formData.append('bookTime', moment(values.bookTime).format('YYYY-MM-DD HH:mm:ss'));
        httpCommonClient.post(`/SpotTestTaskAction_keyDistributorBatchSendTask`, formData).then(({ data = {} }) => {
          if (data.result === 0) {
            message.success(data.msg);
            this.setState({ fileList: [], loading: false });
            this.props.onSearch();
            this.props.onCancel();
          } else {
            Modal.error({
              title: '错误信息：',
              content: data.msg,
            });
            this.setState({ loading: false });
          }
        });
      }
    });
  };
  beforeUpload = file => {
    this.setState({
      fileList: [file],
    });
    return false;
  };
  disabledHours = () => {
    let hours = [];
    let time = this.state.startTime;
    let timeArr = time.split(':');
    for (var i = 0; i < parseInt(timeArr[0]); i++) {
      hours.push(i);
    }
    return hours;
  };
  disabledMinutes = selectedHour => {
    let { startTime } = this.state;
    let timeArr = startTime.split(':');
    let minutes = [];
    if (selectedHour == parseInt(timeArr[0])) {
      for (let i = 0; i < parseInt(timeArr[1]); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };
  //限制秒
  disabledSeconds = (selectedHour, selectedMinute) => {
    let { startTime } = this.state;
    let timeArr = startTime.split(':');
    let second = [];
    if (selectedHour == parseInt(timeArr[0]) && selectedMinute == parseInt(timeArr[1])) {
      for (var i = 0; i <= parseInt(timeArr[2]); i++) {
        second.push(i);
      }
    }
    return second;
  };
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { fileList, loading, bankList, bookType } = this.state;
    return (
      <Modal
        visible
        title="上传重点下发名单"
        confirmLoading={loading}
        onOk={this.handleSubmit}
        onCancel={() => this.props.onCancel()}
      >
        <Form {...layout}>
          <Form.Item label="上传文件">
            <Upload
              name="file"
              fileList={fileList}
              accept=".xls,.xlsx"
              showUploadList={true}
              beforeUpload={this.beforeUpload}
              onRemove={() => this.setState({ fileList: [] })}
            >
              <Button disabled={fileList.length > 0}>请选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="选择银行">
            {getFieldDecorator('bankId', {
              rules: [
                {
                  required: true,
                  message: '请选择银行',
                },
              ],
            })(
              <Select>
                {bankList.map((item, i) => (
                  <Option value={item.value} key={i}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="下发方式">
            {getFieldDecorator('bookType', {
              rules: [
                {
                  required: true,
                  message: '请选择下发方式',
                },
              ],
            })(
              <Radio.Group onChange={e => this.setState({ bookType: !!e.target.value })}>
                <Radio value={0}>立即下发</Radio>
                <Radio value={1}>预约下发(只能预约当天时间)</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          {bookType && (
            <Form.Item label="下发时间">
              {getFieldDecorator('bookTime', {
                rules: [
                  {
                    required: true,
                    message: '请选择下发时间',
                  },
                ],
              })(
                <TimePicker
                  disabledHours={this.disabledHours}
                  disabledMinutes={this.disabledMinutes}
                  disabledSeconds={this.disabledSeconds}
                />
              )}
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  }
}
export default uploadModal;
