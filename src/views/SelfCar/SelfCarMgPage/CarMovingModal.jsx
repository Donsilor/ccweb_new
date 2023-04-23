import React, { Component } from 'react';
import { httpCommonClient } from 'common/axios';
import { Descriptions, Modal, Row, Col, Select, message, Tooltip } from 'antd';

const { Option } = Select;
export default class CarMovingModal extends Component {
  state = {
    loading: false,
    ewId: '',
    name: {},
  };
  handleOk = () => {
    if (!this.state.ewId) {
      message.warning('请选择要移入的二网');
      return;
    }
    const { record = {} } = this.props;
    if (record.locationName == this.state.name.props.ewname) {
      message.warning('当前位置和移入位置不能相同');
      return;
    }
    this.setState({ loading: true });
    httpCommonClient
      .submit('/self-car/v1.0/moveCars/add/move-to-ew', {
        carId: record.id,
        moveInId: this.state.ewId,
      })
      .then(({ data = {} }) => {
        if (data.code === 200) {
          message.success(data.message || '移入成功');
          this.props.onOk();
        } else {
          throw new Error(data.message);
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        message.error(err.message || err || '操作失败');
      });
  };
  renderColumn = () => {
    const { record = {} } = this.props;
    const columns = [
      {
        label: '车架号',
        value: record.chassis,
      },
      {
        label: '品牌',
        value: record.brandName,
      },
      {
        label: '车系',
        value: record.trimName,
      },
      {
        label: '车型',
        value: record.modelName,
      },
      {
        label: '车身颜色',
        value: record.color,
      },
      {
        label: '位置状态',
        value: record.statusName,
      },
      {
        label: '当前位置',
        value: record.locationName,
        span: 2,
      },
    ];
    return columns;
  };
  render() {
    const { ewList = [] } = this.props;
    const { name: { props } = {} } = this.state;
    return (
      <Modal
        title="车辆移动"
        width={800}
        onOk={this.handleOk}
        onCancel={this.props.onCancel}
        visible
        confirmLoading={this.state.loading}
        destroyOnClose
      >
        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <Descriptions title="车辆信息" layout="vertical" column={4}>
            {this.renderColumn().map((item, index) => (
              <Descriptions.Item label={item.label} span={item.span} key={index}>
                {item.value}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <Descriptions title="操作移动" layout="vertical" column={4}></Descriptions>
          <Row>
            <Col span={3}>
              <span style={{ lineHeight: '30px' }}>移入位置：</span>
            </Col>
            <Col span={16}>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="选择一个二网"
                onSelect={(value, ewname) => {
                  this.setState({
                    ewId: value,
                    name: ewname,
                  });
                }}
                filterOption={(input, option) => option.props.children.includes(input)}
              >
                {ewList.map(item => (
                  <Option value={item.ewId} ewname={item.ewName} ewaddress={item.ewAddress} key={item.ewId}>
                    {item.ewName}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <br></br>
          {props && (
            <Row>
              <Col span={3}>
                <span style={{ lineHeight: '30px' }}>详细地址: </span>
              </Col>
              <Col span={12} style={{ lineHeight: '30px' }}>
                {props.ewaddress}
              </Col>
            </Row>
          )}
        </div>
      </Modal>
    );
  }
}
