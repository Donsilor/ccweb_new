import React, { Component } from 'react';
import { Button, Tooltip, Icon, Divider, Cascader, message, Modal } from 'antd';
import { matchPath } from 'react-router';
import { ViewWrapper, FormArea } from 'layouts/ViewWrapper';
import EwAuditTable from 'components/EwAuditTable';
import OperationArea from 'components/OperationArea';
import CarAddingModal from './CarAddingModal';
import CarDeletingModal from './CarDeletingModal';
import CarMovingModal from './CarMovingModal';
import CCForm from 'components/CCForm';
import { httpCommonClient } from 'common/axios';
import { reservedColumns, removedColumns } from './Columns';

const confirm = Modal.confirm;
export default class View extends Component {
  state = {
    showCarAddingModal: false,
    showCarDeletingModal: false,
    showCarMovingModal: false,
    record: {},
    brandList: [],
    ewList: [],
    financialList: [],
  };

  componentDidMount() {
    this.handleSearch();
    //this.fetchBrandInfo();
    this.financialList();
    this.fetchEwInfo();
  }

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  handleSearch = (values, page, pageSize) => {
    this.props.fetch(values || this.props.query.value, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
    this.financialList();
  };

  fetchBrandInfo = async () => {
    const { data = {} } = await httpCommonClient.submit('/self-car/v1.0/brands/find/list');
    if (data.code === 200) {
      const { brandList = [], modelList = [], trimList = [] } = data.data;
      try {
        const _brandList = brandList.map(brand => ({
          label: brand.brandName,
          value: brand.brandId,
          children: trimList
            .filter(trim => trim.brandId === brand.brandId)
            .map(trim => ({
              label: trim.trimName,
              value: trim.trimId,
              children: modelList
                .filter(model => model.trimId === trim.trimId)
                .map(model => ({
                  label: model.modelName,
                  value: model.modelId,
                })),
            })),
        }));
        this.setState({
          brandList: _brandList,
        });
      } catch (err) {}
    } else {
      this.setState({
        brandList: [],
      });
    }
  };

  fetchEwInfo = async () => {
    const { data = {} } = await httpCommonClient.submit('/self-car/v1.0/moveCars/find/move-to-ew/list');
    if (data.code === 200) {
      this.setState({
        ewList: data.data,
      });
    } else {
      message.warning(data.message || '获取二网信息失败');
      this.setState({
        ewList: [],
      });
    }
  };

  jumpToDetail = id => {
    if (!id) {
      return;
    }
    const { match } = this.props;
    const matchResult = matchPath(match.path, {
      path: '/:menu/:tab',
    });
    const { params: { menu, tab } = {} } = matchResult;
    const link = {
      pathname: `/${menu}/detail/${id}`,
      search: `?tab=${tab}`,
    };
    this.props.history.push(link);
  };

  assembleColumn = () => {
    const { menuId } = this.props;
    let columns = [];
    if (menuId === 'reserved') {
      columns = [...reservedColumns(this.jumpToDetail)];
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <div>
              <a
                href="javascript:;"
                key="修改"
                onClick={() =>
                  this.setState({
                    showCarAddingModal: true,
                    record,
                  })
                }
              >
                修改
              </a>
              <Divider type="vertical" key="Divider1" />
              {record.status === 0 && [
                <a
                  key="删除"
                  href="javascript:;"
                  onClick={() =>
                    this.setState({
                      showCarDeletingModal: true,
                      record,
                    })
                  }
                >
                  删除
                </a>,
                <Divider type="vertical" key="Divider2" />,
              ]}
              {(record.status === 0 || record.status === 1) && [
                <a
                  key="移动"
                  href="javascript:;"
                  onClick={() =>
                    this.setState({
                      showCarMovingModal: true,
                      record,
                    })
                  }
                >
                  移动
                </a>,
                <Divider type="vertical" key="Divider3" />,
              ]}
              {record.status === 0 && [
                <a key="出售" href="javascript:;" onClick={this.sellCar(record)}>
                  出售
                </a>,
                <Divider type="vertical" key="Divider3" />,
              ]}
              {record.status === 1 && [
                <a key="移回主店" href="javascript:;" onClick={this.moveBack(record)}>
                  移回主店
                </a>,
                <Divider type="vertical" key="Divider3" />,
              ]}
            </div>
          );
        },
      });
    } else {
      columns = [...removedColumns];
    }
    return columns;
  };

  sellCar = record => () => {
    const self = this;
    confirm({
      title: '确定要出售该车?',
      onOk() {
        httpCommonClient
          .submit(`/self-car/v1.0/cars/sell/${record.id}`)
          .then(({ data = {} }) => {
            if (data.code === 200) {
              message.success('操作成功！');
              self.handleSearch();
            } else {
              throw new Error(data.message);
            }
          })
          .catch(err => {
            message.error(err.message || err || '出售失败');
          });
      },
    });
  };

  moveBack = record => () => {
    const self = this;
    const { id, distributorId, locationId } = record;
    confirm({
      title: '确定要将该车移回主店?',
      onOk() {
        httpCommonClient
          .submit(`/self-car/v1.0/moveCars/add/move-to-main`, { carId: id, distributorId, locationId })
          .then(({ data = {} }) => {
            if (data.code === 200) {
              message.success('操作成功！');
              self.handleSearch();
            } else {
              throw new Error(data.message);
            }
          })
          .catch(err => {
            message.error(err.message || err || '移回主店失败');
          });
      },
    });
  };
  // 金融产品类型列表
  financialList = () => {
    httpCommonClient.submit('/self-car/v1.0/selfFinancialProducts/find/list/all', {}).then(({ data }) => {
      if (data.code === 200) {
        let financialList = data.data;
        this.setState({ financialList });
      }
    });
  };
  render() {
    const { menuId, query, paging } = this.props;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm
            onSearch={this.handleSearch}
            path={this.props.location.pathname}
            onUpdateQuery={this.props.updateQuery}
            query={query}
            financialList={menuId === 'reserved' && this.state.financialList}
          />
        </FormArea>
        <EwAuditTable
          columns={this.assembleColumn()}
          loading={this.props.loading}
          data={this.props.list}
          paging={paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
        {this.state.showCarAddingModal && (
          <CarAddingModal
            onCancel={() =>
              this.setState({
                showCarAddingModal: false,
              })
            }
            onOk={() => {
              this.setState(
                {
                  showCarAddingModal: false,
                },
                this.handleSearch()
              );
            }}
            record={this.state.record}
            brandList={this.state.brandList}
            ewList={this.state.ewList}
            sellOnCreditFlag={this.props.sellOnCreditFlag}
            financialList={this.state.financialList}
          />
        )}
        {this.state.showCarDeletingModal && (
          <CarDeletingModal
            onCancel={() =>
              this.setState({
                showCarDeletingModal: false,
              })
            }
            onOk={() => {
              this.setState(
                {
                  showCarDeletingModal: false,
                },
                this.handleSearch()
              );
            }}
            record={this.state.record}
          />
        )}
        {this.state.showCarMovingModal && (
          <CarMovingModal
            onCancel={() =>
              this.setState({
                showCarMovingModal: false,
              })
            }
            onOk={() => {
              this.setState(
                {
                  showCarMovingModal: false,
                },
                this.handleSearch()
              );
            }}
            record={this.state.record}
            ewList={this.state.ewList}
          />
        )}
        <OperationArea>
          {menuId === 'reserved' && (
            <Button
              type="primary"
              icon="plus"
              onClick={() =>
                this.setState({
                  showCarAddingModal: true,
                  record: {},
                })
              }
            >
              新增车辆
            </Button>
          )}
        </OperationArea>
      </ViewWrapper>
    );
  }
}
