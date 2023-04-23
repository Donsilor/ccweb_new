import React, { PureComponent } from 'react';
import { Modal, Button, message } from 'antd';
import { httpFormClient } from 'common/axios';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import styles from './style.module.less';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

export default class ReportModal extends PureComponent {
  state = {
    loading: false,
    report: {},
    list: [],
  };
  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    const {
      record: { id },
    } = this.props;
    return httpFormClient
      .formSubmit('/SpotTestTaskAction_getAuditReport', '', { id })
      .then(({ data }) => {
        if (data.result === 0) {
          const { report = {}, list = [] } = data;
          this.setState({
            report,
            list,
          });
        } else {
          return Promise.reject(data.reject(data.msg));
        }
      })
      .catch(err => {
        message.error(err.message || err);
      });
  };
  savePdf = () => {
    this.setState({
      loading: true,
    });
    try {
      const container = document.getElementById('pdfContainer');
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: [container.offsetWidth + 40, container.offsetHeight + 40],
      });
      html2canvas(document.getElementById('pdfContainer')).then(canvas => {
        document.getElementById('editor').append(canvas);
        const img = canvas.toDataURL('image/jpeg,1.0');
        doc.addImage(img, 'JPEG', 20, 20, container.offsetWidth, container.offsetHeight);
        doc.save(`${moment.now()}.pdf`);
        this.setState({
          loading: false,
        });
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }

    // window.html2canvas = html2canvas;
    // doc.html(document.getElementById('pdfContainer'), {
    //   callback: function(doc) {
    //     doc.save('abc.pdf');
    //   },
    // });
  };
  renderFooter = () => {
    return (
      <div>
        <Button type="primary" icon="download" onClick={this.savePdf} loading={this.state.loading}>
          下载PDF
        </Button>
        <Button onClick={() => this.props.onCancel()}>取消</Button>
      </div>
    );
  };
  render() {
    const { record } = this.props;
    const { report, list } = this.state;
    return (
      <Modal
        title="生成报告"
        visible={true}
        onOk={this.props.onCancel}
        onCancel={this.props.onCancel}
        width={1200}
        footer={this.renderFooter()}
      >
        <div style={{ display: 'none' }} className={styles.reportModal} id="editor" />
        {!_isEmpty(report) && (
          <div className={styles.reportModal} id="pdfContainer">
            <div className="box">
              <h1 className="title">抵/质押车辆抽查审核报告</h1>
              <h3 className="titleH3">一、委托信息</h3>
              <table className="tableBox01">
                <tbody>
                  <tr>
                    <td className="odd">委托方名称：</td>
                    <td className="even">
                      <font className="blue">
                        <Span value={`${record.bankName}`} />
                      </font>
                    </td>
                    <td className="odd">受托方名称：</td>
                    <td className="even">
                      <font className="blue">北京车车网络技术有限公司</font>
                    </td>
                  </tr>
                  <tr>
                    <td className="odd">委托方地址： </td>
                    <td className="even">
                      <font className="blue">
                        <Span value={`${report.bankAddress}`} />
                      </font>
                    </td>
                    <td className="odd">受托方地址： </td>
                    <td className="even">
                      <font className="blue">北京市朝阳区金蝉西路甲1号F223</font>
                    </td>
                  </tr>
                  <tr>
                    <td className="odd">联系人： </td>
                    <td className="even">
                      <font className="blue">
                        <Span value={`${report.bankContacts}`} />
                      </font>
                    </td>
                    <td className="odd">联系人： </td>
                    <td className="even">
                      <font className="blue">牛书亮</font>
                    </td>
                  </tr>
                  <tr>
                    <td className="odd">联系电话： </td>
                    <td className="even">
                      <font className="blue">
                        <Span value={`${report.bankTel}`} />
                      </font>
                    </td>
                    <td className="odd">联系电话： </td>
                    <td className="even">
                      <font className="blue">18811451155</font>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 className="titleH3">二、抽查对象</h3>
              <table className="tableBox">
                <tbody>
                  <tr>
                    <td width="350">
                      经销商名称：
                      <font className="blue">
                        <Span value={`${record.distributorName}`} />
                      </font>
                    </td>
                    <td width="350">
                      品牌：
                      <font className="blue">
                        <Span value={`${record.brandName}`} />
                      </font>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      经销商地址：
                      <font className="blue">
                        <Span value={`${report.dealerAddress}`} />
                      </font>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      联系人：
                      <font className="blue">
                        <Span value={`${report.dealerContacts}`} />
                      </font>
                    </td>
                    <td>
                      联系电话：
                      <font className="blue">
                        <Span value={`${report.dealerTel}`} />
                      </font>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 className="titleH3">三、抽查时间</h3>
              <table className="tableBox">
                <tbody>
                  <tr>
                    <td>
                      抽查任务下发时间为：
                      <font className="blue">
                        <Span value={`${formatTime(record.bookTime)}`} />
                      </font>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      报告生成日期为：
                      <font className="blue">
                        <Span value={`${formatTime(report.nowTime)}`} />
                      </font>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 className="titleH3">四、抽查目的</h3>
              <p>为确保银行抵/质押车辆资产安全，对经销商的在库及二网抵/质押车辆进行抽查。</p>
              <h3 className="titleH3">五、抽查方式及内容</h3>
              <p>
                针对经销商在库车辆进行梳理，使用受托方提供的《抵/质押车辆抽查》软件系统，实现在线抽查、审核并生成《抵/质押车辆抽查报告》。抽查内容包括车辆合格证（关单商检单）、车辆钥匙、车辆照片及视频、抽查时间、车辆所在地位置坐标等。针对状态异常车辆做出说明。
              </p>
              <h3 className="titleH3">六、抽查结论</h3>
              <p>
                本次抽查任务编号为
                <font className="blue">
                  <Span value={`${record.id}`} />
                </font>
                ；抽查车辆总数为
                <font className="blue">
                  <Span value={`${record.totalNum}`} />
                </font>
                辆；其中正常状态车辆
                <font className="blue">
                  <Span value={`${report.normalNum}`} />
                </font>
                辆；异常状态车辆
                <font className="blue">
                  <Span value={`${record.unnormalNum}`} />
                </font>
                辆。
              </p>
              <h3 className="titleH3">七、抵/质押车辆抽查报告明细</h3>
              <table className="listTalbe" style={{ textAlign: 'center', width: '100%', textIndent: 0 }}>
                <thead>
                  <tr className="listHead">
                    <td width="3%">序号</td>
                    <td width="10%">二网名称</td>
                    <td width="10%">品牌车系</td>
                    <td width="12%">车架号</td>
                    <td width="6%">发动机号</td>
                    <td width="6%">拍照时间</td>
                    <td width="8%">拍照地点</td>
                    <td width="6%">店面与车辆相距(米)</td>
                    <td width="3%">抽查次数</td>
                    <td width="6%">车辆状态</td>
                    <td width="6%">审核状态</td>
                    <td width="10%">异常状态描述</td>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => (
                    <tr className="listTr_a" key={index}>
                      <td align="center">
                        <Span value={`${index + 1}`} />
                      </td>
                      <td align="center">
                        <Span value={`${item.ewName}`} />
                      </td>
                      <td align="center">
                        <p style={{ width: '100%', textAlign: 'center' }}>
                          <Span value={`${item.carVO.fld_serial}`} />
                          &nbsp;
                          <Span value={`${item.carVO.fld_model}`} />
                          &nbsp;
                          <Span value={`${item.carVO.fld_trim}`} />
                        </p>
                      </td>
                      <td align="center">
                        <Span value={`${item.carVO.chassis}`} />
                      </td>
                      <td align="center">
                        <Span value={`${item.carVO.engine}`} />
                      </td>
                      <td align="center">
                        <Span value={`${formatTime(item.pzsj)}`} />
                      </td>
                      <td align="center">
                        <Span value={`${item.pzdd}`} />
                      </td>
                      <td align="center">
                        <Span value={`${item.distance}`} />
                      </td>
                      <td align="center">
                        <Span value={`${item.carVO.spotnum}`} />
                      </td>
                      <td align="center">
                        <Span value={`${item.carStatus}`} />
                      </td>
                      <td align="center">
                        <Span value={`${item.aduitState}`} />
                      </td>
                      <td align="center">
                        <p style={{ width: '100%', textAlign: 'center' }}>
                          <Span value={`${item.aduitRemark}`} />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    );
  }
}

function Span(props) {
  return <span>{props.value}</span>;
}

function formatTime(time) {
  if (time && time.time) {
    return moment.unix(time.time / 1000).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return '-';
  }
}
