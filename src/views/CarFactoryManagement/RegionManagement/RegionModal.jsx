import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Row, Col, Tree, Modal, message, Button } from 'antd';
import styles from './style.module.less';
import { UPDATE_SUBREGION } from 'redux/modules/regionManagement';

const { TreeNode } = Tree;
export class RegionModal extends Component {
  state = {
    modalLoading: false,
    editMode: false,
    subRegionName: (this.props.subRegion && this.props.subRegion.regionSubName) || '',
    checkedKeys: (this.props.subRegion && this.props.subRegion.cityId && this.props.subRegion.cityId.split(',')) || [],
  };

  handleEditClick = () => {
    this.setState({
      editMode: true,
    });
  };

  handleOk = () => {
    const { subRegionName, checkedKeys, editMode } = this.state;
    if (this.props.readOnly && !editMode) {
      this.props.handleCancel();
      return;
    }
    if (!subRegionName) {
      message.warning('请输入小区名称');
      return;
    } else if (checkedKeys.length == 0) {
      message.warning('请至少选择一个城市');
      return;
    }
    const { subRegion, regionId } = this.props;
    const value = {
      type: subRegion ? 'upDate' : 'add',
      id: subRegion ? subRegion.id : regionId,
      regionSubName: subRegionName,
      provinceId: [...new Set(checkedKeys.map(item => item.slice(0, 2)))].join(),
      cityId: checkedKeys.filter(item => item.length == 4).join(),
    };
    this.props
      .updateSubRegion(value)
      .then(({ payload }) => {
        if (payload.data && payload.data.result == '0') {
          message.success('更新小区成功');
          this.props.handleCancel(true);
        } else {
          return Promise.reject(payload.data.msg);
        }
      })
      .catch(err => {
        message.error(err || '更新小区失败');
      });
  };
  handleCancel = () => {
    this.props.handleCancel();
  };

  onCheck = checkedKeys => {
    console.log('checkedKeys', checkedKeys);
    this.setState({
      checkedKeys,
    });
  };

  handleNameChange = e => {
    this.setState({
      subRegionName: e.target.value,
    });
  };
  render() {
    const { rawRegionList, factoryId, readOnly, subRegion = {}, regionData, subRegionData } = this.props;
    const defaultCheckedList = (subRegion.cityId && subRegion.cityId.split(',')) || [];
    const regionGroupList = (factoryId && regionData[factoryId]) || [];
    let checkedCityFromOtherSubRegionsList = []; // 该厂商下其余小区选中的城市
    try {
      checkedCityFromOtherSubRegionsList = regionGroupList
        .map(item => subRegionData[item.id])
        .reduce((arrA, arrB) => arrA.concat(arrB), [])
        .filter(subRegionItem => (subRegionItem ? (subRegion ? subRegionItem.id !== subRegion.id : true) : false))
        .map(item => item.cityId)
        .join()
        .split(',');
    } catch (error) {
      console.error('区域数据异常', error.message);
    }
    return (
      <Modal
        title="小区设置"
        visible={this.props.showModal}
        onOk={this.handlelOk}
        onCancel={this.handleCancel}
        confirmLoading={this.state.modalLoading}
        footer={[
          readOnly && !this.state.editMode ? (
            <Button key="edit" type="danger" onClick={this.handleEditClick} style={{ float: 'left' }}>
              修改小区
            </Button>
          ) : null,
          <Button key="back" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={this.state.modalLoading} onClick={this.handleOk}>
            确定
          </Button>,
        ]}
        destroyOnClose
      >
        <div>
          <Row gutter={8}>
            <Col span={4}>
              <label htmlFor="subRegionName" style={{ lineHeight: '32px' }}>
                小区名称
              </label>
            </Col>
            <Col span={10}>
              <Input
                id="subRegionName"
                onChange={this.handleNameChange}
                defaultValue={this.state.subRegionName}
                disabled={readOnly && !this.state.editMode}
              />
            </Col>
          </Row>
          <div className={styles.regionContent}>
            <Tree
              checkable
              onSelect={this.onSelect}
              onCheck={this.onCheck}
              defaultCheckedKeys={defaultCheckedList}
              defaultExpandedKeys={defaultCheckedList}
              disabled={readOnly && !this.state.editMode}
            >
              {rawRegionList.map(province => (
                <TreeNode
                  title={province.label}
                  key={province.value}
                  disableCheckbox={province.list.every(city =>
                    checkedCityFromOtherSubRegionsList.includes(String(city.value))
                  )}
                >
                  {province.list.map(city => (
                    <TreeNode
                      title={city.label}
                      key={city.value}
                      disableCheckbox={checkedCityFromOtherSubRegionsList.includes(String(city.value))}
                    />
                  ))}
                </TreeNode>
              ))}
            </Tree>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  rawRegionList: state.session.regionList,
  regionData: state.regionManagement.regionData,
  subRegionData: state.regionManagement.subRegionData,
});

const mapDispatchToProps = {
  updateSubRegion: data => UPDATE_SUBREGION(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionModal);
