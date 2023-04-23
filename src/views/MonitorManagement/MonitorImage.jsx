import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { imageListFetch } from '../../redux/modules/monitorImage';
import styles from './style.module.less';
import ewAuditTableColumn from '../../components/EwAuditTableColumn';
import { Button, Icon, Modal, Tooltip } from 'antd';
import EwAuditTable from '../../components/EwAuditTable';
import { ViewWrapper } from '../../layouts/ViewWrapper';
import OperationArea from '../../components/OperationArea';

class MonitorImage extends Component {
  state = {
    showImgModal: false,
    imgModal: {
      src: '',
      title: '',
      alt: '',
    },
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = (page, pageSize) => {
    const { serialNumber } = this.props;
    console.log(this.props);
    console.log(serialNumber);
    this.props.fetch(
      { cameraCode: serialNumber },
      {
        pageNum: page || this.props.paging.current,
        pageSize: pageSize || this.props.paging.pageSize,
      }
    );
  };

  handlePageChange = (page, pageSize) => {
    this.handleSearch(page, pageSize);
  };

  getColumn = () => {
    const { match } = this.props;
    const columns = ewAuditTableColumn(match.path);

    columns.map(col => {
      if (col.dataIndex === 'action') {
        col.render = (text, record) => {
          return (
            <Fragment>
              <Tooltip title="查看">
                <a href="javascript:;" onClick={this.goDetail(record)}>
                  模型训练
                  {/*<Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />*/}
                </a>
              </Tooltip>
            </Fragment>
          );
        };
      } else if (col.dataIndex === 'imageOriginUrl') {
        col.render = (text, record) => {
          const alt = record['imageCode'] + '缩略图';
          return (
            <img src={text} alt={alt} style={{ height: '40px' }} onClick={this.showImgModal('缩略图', text, alt)} />
          );
        };
      } else if (col.dataIndex === 'imageRecognitionUrl') {
        col.render = (text, record) => {
          const alt = record['imageRecognitionUrl'] + '识别结果图';
          return (
            <img
              src={text}
              alt={alt}
              style={{ height: '65px', margin: '-10px' }}
              onClick={this.showImgModal('识别结果图', text, alt)}
            />
          );
        };
      }
    });

    return columns;
  };

  showImgModal = (title, src, alt) => () => {
    this.setState({
      showImgModal: true,
      imgModal: {
        src: src,
        title: title,
        alt: alt,
      },
    });
  };

  goDetail = record => () => {};

  handleCancel = () => {
    this.setState({
      showImgModal: false,
      imgModal: {
        src: '',
        title: '',
        alt: '',
      },
    });
  };

  goBack = () => {
    this.props.history.push('/repositoryList/link');
  };

  render() {
    const { showImgModal, imgModal } = this.state;
    return (
      <ViewWrapper>
        <OperationArea>
          <Button onClick={this.goBack}>返回列表</Button>
        </OperationArea>
        <EwAuditTable
          columns={this.getColumn()}
          loading={this.props.loading}
          data={this.props.list}
          paging={this.props.paging}
          onChange={this.handlePageChange}
          onPageChange={this.handlePageChange}
        />

        <Modal
          title={imgModal.title}
          visible={showImgModal}
          onCancel={this.handleCancel}
          width={900}
          footer={null}
          destroyOnClose
        >
          <div style={{ height: '100%', width: '100%', overflow: 'scroll' }}>
            <img src={imgModal.src} alt={imgModal.alt} style={{ height: '600px' }} />
          </div>
        </Modal>
      </ViewWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.monitorImage.loading,
    list: state.monitorImage.list,
    paging: state.monitorImage.paging,
    serialNumber: state.repositoryList.serialNumber,
  };
}

const mapDispatchToProps = {
  fetch: (data, paging) => imageListFetch(data, paging),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorImage);
