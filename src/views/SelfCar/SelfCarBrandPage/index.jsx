import React, { Component } from 'react';
import { Button, Tooltip, Icon, Divider, Cascader, message, Modal } from 'antd';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import { httpCommonClient } from 'common/axios';
import styles from './style.module.less';
import ItemCell from './ItemCell';
import AddNewItem from './AddNewItem';
import _head from 'lodash/head';
const { confirm } = Modal;
export default class SelfCarBrandPage extends Component {
  state = {
    brandList: [],
    modelList: [],
    trimList: [],
    selectedBrandId: '',
    selectedTrimId: '',
    loading: true,
    isInit: true,
  };
  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    this.setState({
      loading: true,
    });
    return httpCommonClient
      .submit('/self-car/v1.0/brands/find/list')
      .then(({ data = {} }) => {
        if (data.code === 200) {
          const { brandList = [], modelList = [], trimList = [] } = data.data;
          this.setState(
            {
              brandList,
              modelList,
              trimList,
              loading: false,
            },
            this.selectHeadItem
          );
        } else {
          return Promise.reject(data.message || '获取品牌信息失败');
        }
      })
      .catch(error => {
        this.setState({
          brandList: [],
          modelList: [],
          trimList: [],
          selectedBrandId: '',
          selectedTrimId: '',
          loading: false,
        });
        message.error(error.message || error);
      });
  };

  selectHeadItem = () => {
    try {
      if (!this.state.isInit) {
        return;
      }
      const { brandList = [], trimList = [] } = this.state;
      const selectedBrandId = (_head(brandList) && _head(brandList).brandId) || '';
      let selectedTrimId = '';
      if (selectedBrandId) {
        const filterArray = trimList.filter(trim => trim.brandId === selectedBrandId);
        if (filterArray.length > 0) {
          selectedTrimId = _head(filterArray).trimId;
        }
      }
      this.setState({
        selectedBrandId,
        selectedTrimId,
        isInit: false,
      });
    } catch (error) {
      this.setState({
        selectedBrandId: '',
        selectedTrimId: '',
      });
    }
  };

  handleBrandClick = brandId => {
    const trimList = this.state.trimList.filter(trim => trim.brandId === brandId);
    const firstTrimId = (_head(trimList) && _head(trimList).trimId) || '';
    this.setState({
      selectedBrandId: brandId,
      selectedTrimId: firstTrimId,
    });
  };

  addNewItem = type => value => {
    let param = {};
    let url = '';
    let msg = '';
    if (type === 'brand') {
      param = {
        brandName: value,
      };
      url = '/self-car/v1.0/brands/add';
      msg = '添加品牌成功';
    } else if (type === 'trim' && this.state.selectedBrandId) {
      param = {
        brandId: this.state.selectedBrandId,
        trimName: value,
      };
      url = '/self-car/v1.0/trims/add';
      msg = '添加车系成功';
    } else if (type === 'model' && this.state.selectedBrandId && this.state.selectedTrimId) {
      try {
        const trim = this.state.trimList.find(trim => trim.trimId === this.state.selectedTrimId);
        if (trim.brandId !== this.state.selectedBrandId) {
          throw new Error('品牌和车系不匹配');
        }
      } catch (err) {
        return Promise.reject('请选择有关联的品牌和车系');
      }

      param = {
        brandId: this.state.selectedBrandId,
        trimId: this.state.selectedTrimId,
        modelName: value,
      };
      url = '/self-car/v1.0/models/add';
      msg = '添加车型成功';
    }
    return httpCommonClient.submit(url, param).then(({ data = {} }) => {
      if (data.code === 200) {
        message.success(msg);
        return this.handleSearch();
      } else {
        return Promise.reject(data.message || '操作失败');
      }
    });
  };

  handleDelete = type => id => {
    let url = '';
    if (!type || !id) {
      return;
    }
    if (type === '品牌') {
      url = `/self-car/v1.0/brands/delete/${id}`;
    } else if (type === '车系') {
      url = `/self-car/v1.0/trims/delete/${id}`;
    } else if (type === '车型') {
      url = `/self-car/v1.0/models/delete/${id}`;
    }
    const self = this;
    confirm({
      title: '删除确认',
      content: `确定要删除该${type}吗`,
      onOk() {
        httpCommonClient
          .deleteMeth(url)
          .then(({ data = {} }) => {
            if (data.code === 200) {
              message.success(`删除${type}成功`);
              self.handleSearch();
            } else {
              return Promise.reject(data.message || '操作失败');
            }
          })
          .catch(error => {
            message.error(error.message || error);
          });
      },
      onCancel() {},
    });
  };
  render() {
    const { brandList, modelList, trimList, selectedBrandId, selectedTrimId } = this.state;
    return (
      <ViewWrapper className={styles.container}>
        <div className={styles.column}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>品牌 {brandList.length}</span>
            {/* <Icon type="plus-circle" className={styles.newBtn} /> */}
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              {brandList.map(brand => (
                <ItemCell
                  key={brand.brandId}
                  id={brand.brandId}
                  name={brand.brandName}
                  onClick={() => this.handleBrandClick(brand.brandId)}
                  onDelete={this.handleDelete('品牌')}
                  active={selectedBrandId === brand.brandId}
                />
              ))}
              <AddNewItem onSubmit={this.addNewItem('brand')} />
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>车系 {trimList.length}</span>
          </div>
          <div className={styles.contentWrapper}>
            <div>
              {trimList
                .filter(trim => trim.brandId === selectedBrandId)
                .map(trim => (
                  <ItemCell
                    key={trim.trimId}
                    id={trim.trimId}
                    name={trim.trimName}
                    onClick={() =>
                      this.setState({
                        selectedTrimId: trim.trimId,
                      })
                    }
                    onDelete={this.handleDelete('车系')}
                    active={selectedTrimId === trim.trimId}
                  />
                ))}
              <AddNewItem onSubmit={this.addNewItem('trim')} />
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>车型 {modelList.length}</span>
          </div>
          <div className={styles.contentWrapper}>
            <div>
              {modelList
                .filter(model => model.trimId === selectedTrimId && model.brandId === selectedBrandId)
                .map(model => (
                  <ItemCell
                    key={model.modelId}
                    id={model.modelId}
                    name={model.modelName}
                    onDelete={this.handleDelete('车型')}
                  />
                ))}
              <AddNewItem onSubmit={this.addNewItem('model')} />
            </div>
          </div>
        </div>
      </ViewWrapper>
    );
  }
}
