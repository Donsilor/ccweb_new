import React, { Component } from 'react';
import { Button, Table, Tag, Tooltip, Icon, Divider, Modal, message } from 'antd';
import { connect } from 'react-redux';
import _without from 'lodash/without';
import RegionForm from './RegionForm';
import RegionModal from './RegionModal';
import RegionEditModal from './RegionEditModal';
import FactoryAddingModal from './FactoryAddingModal';
import RegionOperLog from './RegionOperLog';
import ManagerModal from './ManagerModal';
import styles from '../style.module.less';
import {
  FETCH_FACTORY_LIST,
  SPECIFY_FACTORY_ID,
  SPECIFY_REGION_ID,
  FETCH_REGION_LIST,
  FETCH_SUBREGION_LIST,
  DELETE_REGION,
  DELETE_SUBREGION,
} from 'redux/modules/regionManagement';

const { confirm } = Modal;
export class RegionManagement extends Component {
  state = {
    showModal: false,
    showRegionEditModal: false,
    showManagerModal: false,
    showFacModal: false,
    showLogModal: false,
    modalLoading: false,
    expandedRow: [],
    expandedSubRow: {},
    factory: {},
    region: {},
    subRegion: {},
    readOnly: false,
  };
  columns = [
    { title: '汽车厂商名称', dataIndex: 'automakerName', key: 'automakerName', width: 250 },
    { title: '品牌名称', dataIndex: 'fldserialname', key: 'fldserialname', width: 250 },
    { title: '大区数量', dataIndex: 'regionNum', key: 'regionNum' },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'right',
      width: 250,
      render: (text, record) => (
        <div>
          <a href="#" key="new" onClick={this.handleFactoryClick(record, true)}>
            <Tooltip title="新增">
              <Icon type="plus" />
            </Tooltip>
          </a>
          <Divider type="vertical" key="Divider1" />
          <a href="#" key="modify" onClick={this.handleUpdateFactory(record)}>
            <Tooltip title="修改">
              <Icon type="edit" />
            </Tooltip>
          </a>
          <Divider type="vertical" key="Divider2" />
          <a href="#" key="log" onClick={this.handleLogModal(record)}>
            <Tooltip title="操作日志">
              <Icon type="project" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
            </Tooltip>
          </a>
        </div>
      ),
    },
  ];
  handleFactoryClick = (factory, isNew, region) => e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showRegionEditModal: true,
      factory,
      region,
    });
  };
  handleSubRegionClick = (region, readOnly, subRegion) => e => {
    e.preventDefault();
    e.stopPropagation();
    if (!subRegion) {
      this.handleSubExpand(region.masterId)(true, region);
    }
    this.setState({
      showModal: true,
      subRegion,
      readOnly,
      region,
    });
  };
  handleManager = subRegion => e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showManagerModal: true,
      subRegion,
    });
  };

  handleExpand = (expanded, record) => {
    const { expandedRow, expandedSubRow } = this.state;
    const { id } = record;
    if (expanded) {
      this.props.specifyFactoryId(id);
      !expandedRow.includes(record.id) && expandedRow.push(record.id);
      this.setState({
        factory: record,
        expandedRow,
        expandedSubRow: {
          ...expandedSubRow,
          [id]: [],
        },
      });
      this.props.fetchRegionList({
        id,
      });
    } else {
      this.setState({
        expandedRow: _without(expandedRow, record.id),
        expandedSubRow: {
          ...expandedSubRow,
          [id]: [],
        },
      });
    }
  };
  handleSubExpand = factoryKey => (expanded, region) => {
    if (!factoryKey) return;
    const { expandedSubRow } = this.state;
    if (expanded) {
      const { id } = region;
      this.props.specifyRegionId(id);
      if (Array.isArray(expandedSubRow[factoryKey]) && !expandedSubRow[factoryKey].includes(region.id)) {
        expandedSubRow[factoryKey].push(region.id);
      } else {
        expandedSubRow[factoryKey] = [region.id];
      }
      this.setState({
        region: region,
        expandedSubRow,
      });
      this.props.fetchSubRegionList({
        id,
      });
    } else {
      if (Array.isArray(expandedSubRow[factoryKey]) && expandedSubRow[factoryKey].includes(region.id)) {
        this.setState({
          expandedSubRow: {
            ...expandedSubRow,
            [factoryKey]: _without(expandedSubRow[factoryKey], region.id),
          },
        });
      }
    }
  };
  handleSearch = (page, pageSize) => {
    const { query } = this.props;
    return this.props.fetchList(
      {
        automakerId: query.factoryValue,
        fldSerialid: query.brandValue,
      },
      {
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      }
    );
  };
  handleInitSearch = () => {
    this.handleSearch().then(() => {
      this.setState({
        expandedRow: [],
      });
    });
  };
  handleUpdateFactory = (record = {}) => e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      factory: record,
      showFacModal: true,
    });
  };
  handleDeleteRegion = (id, factoryRecord) => e => {
    e.preventDefault();
    e.stopPropagation();
    if (id) {
      const self = this;
      const { id: factoryId } = factoryRecord;
      confirm({
        title: '确定要删除该大区吗？',
        onOk() {
          self.props
            .deleteRegion({
              id,
            })
            .then(({ payload } = {}) => {
              if (payload.data && payload.data.result == 0) {
                message.success(payload.data.msg || '删除成功');
                self.handleSearch();
                self.props.fetchRegionList({
                  id: factoryId,
                });
              } else {
                return Promise.reject(payload.data.msg);
              }
            })
            .catch(err => {
              message.error(err || '删除失败');
            });
        },
      });
    }
  };
  handleDeleteSubRegion = (regionId, subRegion) => e => {
    e.preventDefault();
    e.stopPropagation();
    if (subRegion) {
      const self = this;
      confirm({
        title: '确定要删除该小区吗？',
        onOk() {
          self.props
            .deleteSubRegion({
              id: subRegion.id,
            })
            .then(({ payload } = {}) => {
              if (payload.data && payload.data.result == 0) {
                message.success(payload.data.msg || '删除成功');
                self.props.fetchSubRegionList({
                  id: regionId,
                });
                self.props.fetchRegionList({
                  id: self.state.region.masterId,
                });
              } else {
                return Promise.reject(payload.data.msg);
              }
            })
            .catch(err => {
              message.error(err || '删除失败');
            });
        },
      });
    }
  };
  handleModalOk = () => {
    this.setState({
      showModal: false,
    });
  };
  handleLogModal = record => e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showLogModal: true,
      factory: record,
    });
  };
  handleCancel = ifRefresh => {
    this.setState({
      showModal: false,
      showManagerModal: false,
      showRegionEditModal: false,
    });
    ifRefresh && this.handleExpand(true, this.state.factory);
    ifRefresh && this.handleSearch();
  };
  handleSubRegionCancel = ifRefresh => {
    this.setState({
      showModal: false,
      showManagerModal: false,
      showRegionEditModal: false,
    });
    ifRefresh &&
      this.props.fetchRegionList({
        id: this.state.region.masterId,
      });
    ifRefresh &&
      this.props.fetchSubRegionList({
        id: this.state.region.id,
      });
  };
  handleFacCancel = ifRefresh => {
    this.setState({
      showFacModal: false,
    });
    ifRefresh && this.handleSearch();
  };
  handleLogCancel = () => {
    this.setState({
      showLogModal: false,
    });
  };

  componentDidMount() {
    this.handleSearch();
  }

  expandedRegionRender = factory => {
    const columns = [
      { title: '大区名称', dataIndex: 'regionName', key: 'regionName', width: 250 },
      {
        title: '省份数量',
        dataIndex: 'provinceNum',
        key: 'provinceNum',
        width: 250,
      },
      {
        title: '城市数量',
        dataIndex: 'cityNum',
        key: 'cityNum',
      },
      {
        title: '操作',
        key: 'state',
        align: 'right',
        width: 250,
        render: (text, region) => (
          <div>
            <a href="#" key="new" onClick={this.handleSubRegionClick(region, false)}>
              <Tooltip title="新增">
                <Icon type="plus" />
              </Tooltip>
            </a>
            <Divider type="vertical" key="divider1" />
            <a href="#" key="modify" onClick={this.handleFactoryClick(factory, false, region)}>
              <Tooltip title="修改">
                <Icon type="edit" />
              </Tooltip>
            </a>
            <Divider type="vertical" key="divider2" />
            <a href="#" key="delete" onClick={this.handleDeleteRegion(region.id, factory)}>
              <Tooltip title="删除">
                <Icon type="delete" style={{ color: 'red' }} />
              </Tooltip>
            </a>
          </div>
        ),
      },
    ];

    const factoryKey = factory.id;
    const data = this.props.regionData[factoryKey] || [];
    return (
      <div style={{ marginBottom: '5px', marginLeft: '-15px', marginRight: '-15px' }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={this.props.loading && factoryKey === this.state.factory.id}
          expandRowByClick
          expandedRowRender={this.expandedSubRegionRender}
          expandedRowKeys={this.state.expandedSubRow[factoryKey] || []}
          onExpand={this.handleSubExpand(factoryKey)}
          rowClassName={region => (region.provinceNum === 0 || region.cityNum === 0 ? 'noExpand' : '')}
          rowKey={'id'}
          indentSize={0}
          size="small"
        />
      </div>
    );
  };
  expandedSubRegionRender = region => {
    if (region && (region.provinceNum === 0 || region.cityNum === 0)) {
      return undefined;
    }
    const columns = [
      { title: '小区名称', dataIndex: 'regionSubName', key: 'regionSubName', width: 250 },
      {
        title: '省份',
        dataIndex: 'provinceName',
        key: 'provinceName',
        width: 250,
        render: text => (
          <span style={{ whiteSpace: 'normal' }}>
            {text.split(',').map((tag, index) => {
              return <Tag key={index}>{tag.toUpperCase()}</Tag>;
            })}
          </span>
        ),
      },
      {
        title: '城市',
        dataIndex: 'cityName',
        key: 'cityName',
        width: 350,
        render: text => (
          <span style={{ whiteSpace: 'normal' }}>
            {text.split(',').map((tag, index) => {
              return <Tag key={index}>{tag.toUpperCase()}</Tag>;
            })}
          </span>
        ),
      },
      {
        title: '区域经理',
        dataIndex: 'subRmUserName',
        key: 'subRmUserName',
      },
      {
        title: '操作',
        key: 'state',
        align: 'right',
        width: 250,
        render: (text, subRegion) => (
          <div>
            <a href="javascript:;" key="user" onClick={this.handleManager(subRegion)}>
              <Tooltip title="区域经理">
                <Icon type="user" />
              </Tooltip>
            </a>
            <Divider type="vertical" key="divider0" />
            <a href="javascript:;" key="view" onClick={this.handleSubRegionClick(region, true, subRegion)}>
              <Tooltip title="查看">
                <Icon type="search" />
              </Tooltip>
            </a>
            <Divider type="vertical" key="divider1" />
            <a href="#" key="modify" onClick={this.handleSubRegionClick(region, false, subRegion)}>
              <Tooltip title="修改">
                <Icon type="edit" />
              </Tooltip>
            </a>
            <Divider type="vertical" key="divider2" />
            <a href="#" key="delete" onClick={this.handleDeleteSubRegion(region.id, subRegion)}>
              <Tooltip title="删除">
                <Icon type="delete" style={{ color: 'red' }} />
              </Tooltip>
            </a>
          </div>
        ),
      },
    ];

    const regionId = region.id || '';
    const data = this.props.subRegionData[regionId] || [];
    return (
      <div style={{ marginBottom: '5px', marginLeft: '-15px', marginRight: '-15px' }}>
        <Table columns={columns} dataSource={data} pagination={false} rowKey={'id'} indentSize={0} size="small" />
      </div>
    );
  };
  render() {
    return (
      <div className={styles.ledger}>
        <div className={styles.formArea}>
          <RegionForm
            onSearch={this.handleInitSearch}
            onUpdateQuery={() => {}}
            wrappedComponentRef={form => (this.form = form)}
          >
            <Button type="primary" icon="plus" onClick={this.handleUpdateFactory()}>
              新增
            </Button>
          </RegionForm>
        </div>
        <div className={styles.wrapper}>
          <Table
            columns={this.columns}
            dataSource={this.props.list}
            expandedRowRender={this.expandedRegionRender}
            expandedRowKeys={this.state.expandedRow}
            expandRowByClick
            paging={null}
            onExpand={this.handleExpand}
            onChange={this.handleSearch}
            onPageChange={this.handleSearch}
            rowKey={'id'}
            indentSize={0}
          />
        </div>
        {this.state.showModal && (
          <RegionModal
            showModal={this.state.showModal}
            handleCancel={this.handleSubRegionCancel}
            factoryId={this.state.region && this.state.region.masterId}
            regionId={this.state.region && this.state.region.id}
            readOnly={this.state.readOnly}
            subRegion={this.state.subRegion}
          />
        )}
        {this.state.showRegionEditModal && (
          <RegionEditModal
            showModal={this.state.showRegionEditModal}
            handleCancel={this.handleCancel}
            factoryId={this.state.factory && this.state.factory.id}
            readOnly={this.state.readOnly}
            region={this.state.region}
          />
        )}
        {this.state.showFacModal && (
          <FactoryAddingModal
            showModal={this.state.showFacModal}
            handleCancel={this.handleFacCancel}
            factory={this.state.factory}
          />
        )}
        {this.state.showManagerModal && (
          <ManagerModal
            showModal={this.state.showManagerModal}
            subRegion={this.state.subRegion}
            onCancel={this.handleSubRegionCancel}
          />
        )}
        {this.state.showLogModal && (
          <RegionOperLog
            showModal={this.state.showLogModal}
            handleCancel={this.handleLogCancel}
            factory={this.state.factory}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.regionManagement.list,
  query: state.regionManagement.query,
  paging: state.regionManagement.paging,
  regionData: state.regionManagement.regionData,
  subRegionData: state.regionManagement.subRegionData,
  loading: state.regionManagement.loading,
});

const mapDispatchToProps = {
  specifyFactoryId: data => SPECIFY_FACTORY_ID(data),
  specifyRegionId: data => SPECIFY_REGION_ID(data),
  fetchList: (data, paging) => FETCH_FACTORY_LIST(data, paging),
  fetchRegionList: data => FETCH_REGION_LIST(data),
  fetchSubRegionList: data => FETCH_SUBREGION_LIST(data),
  deleteRegion: data => DELETE_REGION(data),
  deleteSubRegion: data => DELETE_SUBREGION(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionManagement);
