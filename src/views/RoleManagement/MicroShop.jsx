import React, { Component, Fragment } from 'react';
import { FormArea, ViewWrapper } from '../../layouts/ViewWrapper';
import CCForm from '../../components/CCForm';
import EwAuditTable from '../../components/EwAuditTable';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';
import styles from './style.module.less';
import { Button, Col, message, Modal, Row, Spin } from 'antd';
import { httpCommonClient } from 'common/axios';

class MicroShop extends Component {
  state = {
    qrCodeModal: false,
    qrCodeUrl: '',
    qrCodeAccid: '',
    qrCodeLoading: false,
  };

  componentDidMount() {
    this.handleSearch(this.props.query.value);
  }

  handleSearch = (formValues, page, pageSize) => {
    const values = { ...formValues };
    console.log(values);
    this.props.fetch(values, {
      pageNum: page || this.props.paging.current,
      pageSize: pageSize || this.props.paging.pageSize,
    });
  };

  renderColumns = () => {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.path);

    columns.map(col => {
      if (col.dataIndex === 'action') {
        col.render = (text, record) => {
          return (
            <Fragment>
              <a className={`${styles.action}`} onClick={this.showQRCodeModal(record)}>
                查看微店
              </a>
            </Fragment>
          );
        };
      }
    });

    return columns;
  };

  handlePageChange = (page, pageSize) => {
    this.handleSearch(this.props.query.value, page, pageSize);
  };

  showQRCodeModal = record => () => {
    console.log(record);
    this.setState({
      qrCodeModal: true,
      qrCodeAccid: record.accid,
      qrCodeLoading: true,
    });

    const url = '/LinkAction_viewMiniQrCode?shopId=' + record.fileId;
    httpCommonClient.get(url).then(res => {
      if (res.data && res.data.result === 0 && res.data.data) {
        this.setState({
          qrCodeUrl: res.data.data,
          qrCodeLoading: false,
        });
      } else {
        message.error('图片获取失败');
        this.setState({
          qrCodeLoading: false,
        });
      }
    });
  };

  addShop = () => {
    const { match } = this.props;
    this.props.history.push('/storeManagement/add', {
      shopType: match.path === '/storeManagement/distributor' ? 1 : 2,
    });
  };

  handleCancel = () => {
    this.setState({
      qrCodeModal: false,
      qrCodeUrl: '',
    });
  };

  render() {
    const { match, query } = this.props;
    const { qrCodeModal, qrCodeUrl, qrCodeAccid, qrCodeLoading } = this.state;
    return (
      <ViewWrapper>
        <FormArea>
          <CCForm onSearch={this.handleSearch} path={match.path} query={query} onUpdateQuery={this.props.updateQuery} />
        </FormArea>
        <Row style={{ marginBottom: '15px' }}>
          <Col span={2}>
            <Button type="primary" htmlType="submit" onClick={this.addShop} loading={this.state.exportBtnLoading}>
              添加微店
            </Button>
          </Col>
        </Row>
        <EwAuditTable
          columns={this.renderColumns()}
          loading={this.props.loading}
          data={this.props.list}
          paging={this.props.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />
        <Modal
          title="查看微店"
          visible={qrCodeModal}
          onCancel={this.handleCancel}
          width={500}
          footer={null}
          destroyOnClose
        >
          <Spin spinning={qrCodeLoading}>
            <div style={{ overflow: 'hidden' }}>
              <img src={qrCodeUrl} alt="店铺二维码，右键保存" style={{ width: '200px', float: 'left' }} />
              <div style={{ width: '200px', float: 'right', paddingTop: '20px' }}>
                <span>
                  您的微店小程序已开启，可以在电脑上浏览访问以下地址：http://seller.car.dlsupporter.com/
                  管理您的微店，请使用账号：{qrCodeAccid}，初始密码：123456 登录。
                </span>
              </div>
            </div>
          </Spin>
        </Modal>
      </ViewWrapper>
    );
  }
}

export default MicroShop;
