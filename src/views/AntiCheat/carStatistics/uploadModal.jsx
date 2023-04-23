import React, { Component } from 'react';
import { Form, Select, Button, Modal, Upload, message } from 'antd';
import { httpCommonClient } from 'common/axios';
import _ from 'lodash';
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
  };
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
        formData.append('fileType', values.fileType);
        formData.append('file', fileList[0]);
        httpCommonClient.post(`/BakDataMngAction_saveFile`, formData).then(({ data = {} }) => {
          if (data.result === 0) {
            message.success(data.msg);
            this.setState({ fileList: [], loading: false });
            this.props.onSearch({ fileType: values.fileType });
          } else {
            Modal.error({
              title: '错误信息：',
              content: data.errmsg,
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
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { fileList, loading } = this.state;
    return (
      <Modal
        visible
        title="上传文件"
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
          <Form.Item label="录入格式">
            {getFieldDecorator('fileType', {
              rules: [
                {
                  required: true,
                  message: '请选择导入类型',
                },
              ],
            })(
              <Select>
                <Option value={21} key={1}>
                  车辆导入-橙E格式
                </Option>
                <Option value={22} key={2}>
                  车辆导入-长安马自达
                </Option>
                <Option value={23} key={3}>
                  车辆导入-长安汽车
                </Option>
                <Option value={24} key={4}>
                  车辆导入-一汽大众
                </Option>
                <Option value={25} key={5}>
                  车辆导入-青岛解放
                </Option>
                <Option value={26} key={6}>
                  车辆导入-一汽解放
                </Option>
                <Option value={31} key={7}>
                  车辆还款-橙E格式
                </Option>
                <Option value={32} key={8}>
                  车辆还款-线下格式
                </Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default uploadModal;
