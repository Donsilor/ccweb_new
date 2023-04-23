import React, { Fragment } from 'react';
import { Badge, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import EBDic from 'common/constant';
import { translate, tranBadgeStatus, translatePureDic } from 'common/utils/';
import moment from 'moment';
import Trend from 'ant-design-pro/lib/Trend';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const carMoveApplyTimeColumn = {
  title: '车辆移动申请时间',
  dataIndex: 'moveApplyTime',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const provinceAndCityColumn = {
  title: '所在省市',
  dataIndex: 'provinceAndCity',
};
export const spottesttypeColumn = {
  title: '抽查类型',
  dataIndex: 'spottesttypeName',
};
export const orSubtaskColumn = {
  title: '是否子任务',
  dataIndex: 'parentSpotId',
  align: 'center',
  render: text =>
    Number(text) > 0 ? (
      <Icon type="check" style={{ color: 'green' }} />
    ) : (
      <Icon type="close" style={{ color: 'red' }} />
    ),
};
export const teskBuildTimeColumn = {
  title: '任务建立时间',
  dataIndex: 'createTime',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const spotConfirmTimeColumn = {
  title: '抽查确认时间',
  dataIndex: 'checkConfirmTime',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const spotConfirmTypeColumn = {
  title: '抽查确认类型',
  dataIndex: 'checkConfirmType',
};

export const bookTimeColumn = {
  title: '任务下发时间',
  dataIndex: 'bookTime',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const applyTimeColumn = {
  title: '任务申请时间',
  dataIndex: 'moveApplyTime',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const ptNotPassFlagColumn = {
  title: '异常原因_平台',
  dataIndex: 'ptNotPassFlag',
};
export const ptRemarkExcColumn = {
  title: '异常原因_最终',
  dataIndex: 'ptRemarkExc',
};
export const spottestIdColumn = {
  title: '任务编号',
  dataIndex: 'id',
};
export const moveSpottestIdColumn = {
  title: '移动编号',
  dataIndex: 'taskId',
};
export const idColumn = {
  title: '任务号',
  dataIndex: 'id',
  fixed: 'left',
};
export const ewBankIdColumn = {
  title: '任务号',
  dataIndex: 'ewBankId',
  fixed: 'left',
};
export const distributorNameColumn = {
  title: '经销商名称',
  dataIndex: 'distributorName',
};
export const dealerNameColumn = {
  title: '经销商名称',
  dataIndex: 'dealerName',
};
export const ewSalesNumColumn = {
  title: '二网销量',
  dataIndex: 'ewSalesNum',
  align: 'center',
};
export const ewLocationColumn = {
  title: '二网所在地区',
  dataIndex: 'ewLocation',
};
export const ewAreaIdColumn = {
  title: '二网名称编号',
  dataIndex: 'ewAreaId',
};
export const distributorLocationColumn = {
  title: '经销商所在地区',
  dataIndex: 'distributorLocation',
};
export const disAreaIdColumn = {
  title: '经销商所在地编号',
  dataIndex: 'disAreaId',
};
export const distributorIdColumn = {
  title: '经销商名称编号',
  dataIndex: 'distributorId',
};
export const fldSerialidColumn = {
  title: '品牌名称编号',
  dataIndex: 'fldSerialid',
};
export const bankIdColumn = {
  title: '银行名称编号',
  dataIndex: 'bankId',
};
export const bankNameColumn = {
  title: '银行名称',
  dataIndex: 'bankName',
};
export const fldSerialNameColumn = {
  title: '品牌名称',
  dataIndex: 'fldSerialName',
};
export const fldSerialName2Column = {
  title: '品牌名称',
  dataIndex: 'fldserialname',
};
export const brandNameColumn = {
  title: '品牌名称',
  dataIndex: 'brandName',
};
export const countSalesNumColumn = {
  title: '总销量',
  dataIndex: 'countSalesNum',
  align: 'center',
};
export const mainStoresalesNumColumn = {
  title: '主店销量',
  dataIndex: 'mainStoresalesNum',
  align: 'center',
};
export const ewSalesRatioColumn = {
  title: '二网销量占比',
  dataIndex: 'ewSalesRatio',
};
export const regionNameColumn = {
  title: '大区名称',
  dataIndex: 'regionName',
};
export const subRegionNameColumn = {
  title: '小区名称',
  dataIndex: 'regionSubName',
};
export const ewNameColumn = {
  title: '二网名称',
  dataIndex: 'ewName',
};
export const ewParentNameColumn = {
  title: '所属二网',
  dataIndex: 'parentEwName',
  render: text => text || '-',
};
export const ewTypeColumn = {
  title: '二网类型',
  dataIndex: 'ewId',
  align: 'center',
  render: text =>
    text.length === 7 ? (
      <span className="icon-span">
        <Icon type="branches" />
        分店
      </span>
    ) : (
      <span className="icon-span">
        <Icon type="home" />
        主店
      </span>
    ),
};
export const ewAreaColumn = {
  title: '二网区域',
  dataIndex: 'ewAreaName',
};
export const isChainStoreColumn = {
  title: '是否直营',
  dataIndex: 'isChainStore',
  align: 'center',
  render: text => translate(text, EBDic.commonDic),
};
export const moneyGetTypeColumn = {
  title: '保证金收取方式',
  dataIndex: 'moneyGetType',
  align: 'center',
  render: text => (text == 1 ? '按店' : text == 2 ? '按台' : '无'),
};
export const isEmptyColumn = {
  title: '是否有保证金',
  dataIndex: 'isBondZero',
  align: 'center',
  render: text => translate(text, EBDic.commonDic),
};

export const disApplyTimeColumn = {
  title: '经销商申请时间',
  dataIndex: 'applyTime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const ptAuditTimeColumn = {
  title: '初审通过时间',
  dataIndex: 'firstTime',
  align: 'center',
};
export const firstTrialNameColumn = {
  title: '初审操作人',
  dataIndex: 'firstTrialName',
};
export const bankAuditTimeColumn = {
  title: '复审通过时间',
  dataIndex: 'affectTime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const startTimeColumn = {
  title: '合同开始时间',
  dataIndex: 'startdate',
  align: 'center',
};
export const endTimeColumn = {
  title: '合同终止时间',
  dataIndex: 'enddate',
  align: 'center',
};
export const lastTrialNameColumn = {
  title: '复审操作人',
  dataIndex: 'lastTrialName',
};
export const exceptionTimeColumn = {
  title: '最新异常时间',
  dataIndex: 'exceptionTime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const ptAuditDepositTimeColumn = {
  title: '初审通过时间',
  dataIndex: 'ptAuditTime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const saveDateColumn = {
  title: '存入时间',
  dataIndex: 'saveDate',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const isfirstColumn = {
  title: '业务类型',
  dataIndex: 'isfirst',
  align: 'center',
  render: text => translate(text, EBDic.isfirstDicList),
};
export const businessTypeColumn = {
  title: '业务类型',
  dataIndex: 'businessType',
  align: 'center',
  render: text => translate(text, EBDic.isfirstDicList),
};
export const isSignColumn = {
  title: '是否签订三方协议',
  dataIndex: 'isSign',
  align: 'center',
  render: text => translate(text, EBDic.commonDic),
};
export const depositAmountColumn = {
  title: '保证金（万元）',
  align: 'center',
  dataIndex: 'adjustMoney',
  render: (text, record) => (
    <Trend flag={record.operationType === 2 ? 'down' : 'up'}>
      {record.operationType === 2 ? `-${text}` : `+${text}`}
    </Trend>
  ),
};
export const depositAmount2Column = {
  title: '保证金（万元）',
  align: 'center',
  dataIndex: 'depositAmount',
  render: (text, record) => {
    if (record.isfirst === 2) {
      return (
        <Trend flag={record.operationType === 2 ? 'down' : 'up'}>
          {record.operationType === 2 ? `-${record.depositAmount}` : `+${record.depositAmount}`}
        </Trend>
      );
    } else {
      return (
        <Trend flag={record.operationType === 2 ? 'down' : 'up'}>
          {record.operationType === 2 ? `-${record.adjustMoney}` : `+${record.adjustMoney}`}
        </Trend>
      );
    }
  },
};
export const inMoneyColumn = {
  title: '转入（万元）',
  align: 'center',
  dataIndex: 'inMoneyTotal',
};
export const depositAmountDisBondColumn = {
  title: '保证金（万元）',
  align: 'center',
  dataIndex: 'depositTotal',
};
export const depositAmountEwBondColumn = {
  title: '保证金（万元）',
  align: 'center',
  dataIndex: 'moneyTotal',
};
export const depositAmountBondDetailColumn = {
  title: '保证金（万元）',
  align: 'center',
  dataIndex: 'money',
};
export const outMoneyColumn = {
  title: '转出（万元）',
  align: 'center',
  dataIndex: 'outMoneyTotal',
};
export const moveNumColumn = {
  title: '移动台数',
  align: 'center',
  dataIndex: 'moveNum',
};
export const moveMoneyColumn = {
  title: '移动金额（万元）',
  align: 'center',
  dataIndex: 'moveMoney',
};
export const contractTypeColumn = {
  title: '声明类型',
  dataIndex: 'contractType',
  align: 'center',
  render: text => translate(text, EBDic.contractTypeDicList),
};
export const bondTypeColumn = {
  title: '保证金类型',
  dataIndex: 'operationType',
  align: 'center',
  render: text => translate(text, EBDic.bondTypeDicList),
};

export const isContractChangeColumn = {
  title: '合同是否变更',
  dataIndex: 'isContractChange',
  align: 'center',
  render: text => translate(text, EBDic.commonDic),
};
export const statementReceivedColumn = {
  title: '声明是否签收',
  dataIndex: 'statementReceived',
  align: 'center',
  render: text => (text === 1 ? '否' : text === 0 ? '是' : ''),
};
export const isExceptionColumn = {
  title: '是否存在异常',
  dataIndex: 'isException',
  align: 'center',
  render: text => translate(text, EBDic.commonDic),
};
export const isExportColumn = {
  title: '是否导出',
  dataIndex: 'isExport',
  align: 'center',
  render: text => translate(text, EBDic.commonDic),
};
export const statusNameColumn = {
  title: '业务状态',
  fixed: 'right',
  dataIndex: 'statusName',
  // width: 150,
  render: text => <Badge status={tranBadgeStatus(text, EBDic.statusDicList)} text={text} />,
};
export const status2Column = {
  title: '业务状态',
  fixed: 'right',
  dataIndex: 'status',
  width: 120,
  render: text => translatePureDic(text, EBDic.statusDicList, true),
};

// 台账表字段
export const firstTimesColumn = {
  title: '首次关联发起数',
  dataIndex: 'firstTimes',
};

export const firstPtPassTimesColumn = {
  title: '首次关联初审通过数',
  dataIndex: 'firstPtPassTimes',
};
export const firstBankPassTimesColumn = {
  title: '首次关联复审通过数',
  dataIndex: 'firstBankPassTimes',
};

export const continueTimesColumn = {
  title: '续作发起数',
  dataIndex: 'continueTimes',
};

export const continuePtPassTimesColumn = {
  title: '续作初审通过数',
  dataIndex: 'continuePtPassTimes',
};

export const continueBankPassTimesColumn = {
  title: '续作复审通过数',
  dataIndex: 'continueBankPassTimes',
};

export const exceptionTimesColumn = {
  title: '异常合计',
  dataIndex: 'exceptionTimes',
};
export const contractIdColumn = {
  title: '声明编号',
  dataIndex: 'contractId',
  render: (text, record) => (record.contractType === 1 ? text : record.effectiveId),
};
export const expressNumColumn = {
  title: '快递单号',
  dataIndex: 'expressNum',
};
export const contractSendTimeColumn = {
  title: '声明邮寄时间',
  dataIndex: 'contractSendData',
};
export const contractConfirmTimeColumn = {
  title: '签收日期',
  dataIndex: 'contractConfirmData',
  render: text => text && moment(text).format('YYYY-MM-DD'),
};
export const receivedUserNameColumn = {
  title: '签收人',
  dataIndex: 'receivedUserName',
};
export const bondAccountColumn = {
  title: '保证金账号',
  dataIndex: 'bondAccount',
  align: 'center',
};
export const pointsAccountColumn = {
  title: '保证金分账号',
  dataIndex: 'pointsAccount',
  align: 'center',
};
export const provinceColumn = {
  title: '省',
  dataIndex: 'province',
  align: 'center',
};
export const province2Column = {
  title: '省',
  dataIndex: 'provinceStr',
  align: 'center',
};
export const province3Column = {
  title: '省份',
  dataIndex: 'provinceName',
  align: 'center',
};
export const cityColumn = {
  title: '市',
  dataIndex: 'city',
  align: 'center',
};
export const city2Column = {
  title: '市',
  dataIndex: 'cityStr',
  align: 'center',
};
export const city3Column = {
  title: '城市',
  dataIndex: 'cityName',
  align: 'center',
};
export const countyNameColumn = {
  title: '地区',
  dataIndex: 'countyName',
  align: 'center',
};
export const allowMoveCarNumColumn = {
  title: '审批允许移动总台数',
  dataIndex: 'allowMoveCarNum',
  align: 'center',
};
export const ewFactMoveCarColumn = {
  title: '二网实际移动台数',
  dataIndex: 'ewFactMoveCar',
  align: 'center',
};
export const ewMoveCarRatioColumn = {
  title: (
    <div>
      <span style={{ paddingRight: '3px' }}>二网移动车辆比例</span>
      <Tooltip title="二网移动车辆比例 = 二网实际移动台数 / 抵质押车总数">
        <Icon type="info-circle" style={{ color: 'grey' }} />
      </Tooltip>
    </div>
  ),
  dataIndex: 'ewMoveCarRatio',
  align: 'center',
};
export const foreclosureCarNumColumn = {
  title: '赎回车辆数量',
  dataIndex: 'foreclosureCarNum',
  align: 'center',
};
export const salesNumColumn = {
  title: '销售总数量',
  dataIndex: 'salesNum',
  align: 'center',
};
export const ewSalesRatio2Column = {
  title: (
    <div>
      <span style={{ paddingRight: '3px' }}>二网销量占比</span>
      <Tooltip title="二网销量占比 = 二网销量 / 销售总数量">
        <Icon type="info-circle" style={{ color: 'grey' }} />
      </Tooltip>
    </div>
  ),
  dataIndex: 'ewSalesRatio',
  align: 'center',
};
export const rawMoveCarRatioColumn = {
  title: (
    <div>
      <span style={{ paddingRight: '3px' }}>原20%移车比例</span>
      <Tooltip title="原20%移车比例 = 抵质押车总数 * 20%（向上取整）">
        <Icon type="info-circle" style={{ color: 'grey' }} />
      </Tooltip>
    </div>
  ),
  dataIndex: 'rawMoveCarRatio',
  align: 'center',
};
export const ewMoveCarIncrementColumn = {
  title: (
    <div>
      <span style={{ paddingRight: '3px' }}>二网移车增量</span>
      <Tooltip title="二网移车增量 = 二网实际移动台数 - 原20%移车比例（负数计为0）">
        <Icon type="info-circle" style={{ color: 'grey' }} />
      </Tooltip>
    </div>
  ),
  dataIndex: 'ewMoveCarIncrement',
  align: 'center',
};
export const mortgageCarNumColumn = {
  title: '抵/质押车总数',
  dataIndex: 'mortgageCarNum',
  align: 'center',
};
export const fldModelColumn = {
  title: '车系',
  dataIndex: 'fld_model',
  align: 'center',
};
export const fldTrimInfoColumn = {
  title: '车型名称',
  dataIndex: 'fldTrimInfo',
  align: 'center',
};
export const chassisColumn = {
  title: '车架号',
  dataIndex: 'chassis',
  align: 'center',
};
export const moveintimeColumn = {
  title: '末次移动时间',
  dataIndex: 'moveintime',
  render: text => text && moment(text).format('YYYY-MM-DD'),
};
export const buytimeColumn = {
  title: '赎车时间',
  dataIndex: 'buytime',
  render: text => text && moment(text).format('YYYY-MM-DD'),
};
export const showtimeColumn = {
  title: '销售时间',
  dataIndex: 'showtime',
  render: text => text && moment(text).format('YYYY-MM-DD'),
};

export const ewNumColumn = {
  title: '二网数量',
  dataIndex: 'ewNum',
  align: 'center',
};
export const distriNumColumn = {
  title: '经销商数量',
  dataIndex: 'dealerNum',
};
export const isfirstNumColumn = {
  title: '发起首次关联',
  dataIndex: 'isfirstNum',
};
export const sequelNumColumn = {
  title: '发起续作',
  dataIndex: 'sequelNum',
};
export const relieveNumColumn = {
  title: '发起解除关联',
  dataIndex: 'relieveNum',
};
export const firstReviewPassNumColumn = {
  title: '首次复审通过数',
  dataIndex: 'firstReviewPassNum',
};
export const sequelReviewPassNumColumn = {
  title: '续作复审通过数',
  dataIndex: 'sequelReviewPassNum',
};
export const relieveReviewPassNumColumn = {
  title: '解除关联复审通过',
  dataIndex: 'relieveReviewPassNum',
};
export const jointEwNumColumn = {
  title: '已关联二网总数',
  dataIndex: 'jointEwNum',
};
export const repoNameColumn = {
  title: '仓库名称',
  dataIndex: 'name',
};
export const repoTypeColumn = {
  title: '仓库类型',
  dataIndex: 'locationTypeName',
};
export const repoStatusColumn = {
  title: '状态',
  dataIndex: 'statusName',
};

export const auditFistUserNameColumn = {
  title: '初审操作人',
  dataIndex: 'auditUserName',
  align: 'center',
};
export const auditFirstTimeColumn = {
  title: '初审时间',
  dataIndex: 'auditTime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};
export const auditLastUserNameColumn = {
  title: '复审操作人',
  dataIndex: 'reviewUserName',
  align: 'center',
};
export const auditLastTimeColumn = {
  title: '复审时间',
  dataIndex: 'reviewtime',
  align: 'center',
  render: text => {
    return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  },
};

// 抽查管理
export const companyColumn = {
  title: '监管公司',
  dataIndex: 'company',
  align: 'center',
  width: 120,
};
export const brandColumn = {
  title: '品牌',
  dataIndex: 'brand',
  width: 120,
};
export const dealerColumn = {
  title: '经销商',
  dataIndex: 'dealer',
  width: 100,
};
export const vinColumn = {
  title: '车架号',
  dataIndex: 'vin',
  width: 150,
};
export const createdTimeColumn = {
  title: '创建时间',
  dataIndex: 'createdTime',
  render: text => {
    return text && moment.unix(new Date(text).getTime() / 1000).format(TIME_FORMAT);
  },
};
export const updatedTimeColumn = {
  title: '更新时间',
  dataIndex: 'updatedTime',
  render: text => {
    return text && moment.unix(new Date(text).getTime() / 1000).format(TIME_FORMAT);
  },
};
export const startColumn = {
  title: '生效日期',
  dataIndex: 'startTime',
  render: text => {
    return text && moment.unix(new Date(text).getTime() / 1000).format('YYYY-MM-DD');
  },
};
export const endColumn = {
  title: '失效日期',
  dataIndex: 'endTime',
  render: text => {
    return text && moment.unix(new Date(text).getTime() / 1000).format('YYYY-MM-DD');
  },
};
export const statusColumn = {
  title: '是否有效',
  dataIndex: 'status',
};
export const isSpecialColumn = {
  title: '是否特殊名单',
  dataIndex: 'isSpecial',
  render: text => {
    return text === 1 ? '是' : '否';
  },
  width: 100,
  align: 'center',
};
export const cntByWeekColumn = {
  title: '本周抽查次数',
  dataIndex: 'cntByWeek',
};
export const cntByMonthColumn = {
  title: '本月抽查次数',
  dataIndex: 'cntByMonth',
};
export const actionColumn = {
  title: '操作',
  dataIndex: 'action',
};

export const logCreatedTimeColumn = {
  title: '抽查记录生成时间',
  dataIndex: 'createdTime',
  render: text => {
    return text && moment.unix(new Date(text).getTime() / 1000).format(TIME_FORMAT);
  },
};
export const dayForWeekColumn = {
  title: '星期',
  dataIndex: 'dayForWeek',
  render: (text, record) => {
    switch (record['createdTime'] && moment.unix(new Date(record['createdTime']).getTime() / 1000).day()) {
      case 1:
        return '星期一';
      case 2:
        return '星期二';
      case 3:
        return '星期三';
      case 4:
        return '星期四';
      case 5:
        return '星期五';
      case 6:
        return '星期六';
      case 7:
        return '星期日';
      default:
        return '';
    }
  },
};
export const dealerCntColumn = {
  title: '经销商数',
  dataIndex: 'superviseDealerCnt',
};
export const vehicleCntColumn = {
  title: '车辆数',
  dataIndex: 'superviseVehicleCnt',
};
export const rateColumn = {
  title: '占比',
  dataIndex: 'rate',
  render: text => {
    return text + '%';
  },
};
export const repoCntColumn = {
  title: '主库车数量',
  dataIndex: 'primaryRepoCnt',
};
export const countColumn = {
  title: '统计时间',
  dataIndex: 'createdTime',
};
export const dealerCountColumn = {
  title: '经销商数',
  dataIndex: 'dealerCnt',
};

export const uploadTimeColumn = {
  title: '文件上传时间',
  dataIndex: 'createdTime',
  render: text => {
    return text && moment.unix(new Date(text).getTime() / 1000).format(TIME_FORMAT);
  },
};
export const fileNameColumn = {
  title: '文件名',
  dataIndex: 'fileName',
};
export const actionStatusColumn = {
  title: '处理状态',
  dataIndex: 'actionStatus',
  render: text => {
    return text === '1' ? '导入完成' : '待导入';
  },
};

export const operationColumn = (path, fixed = 'right', name = '审核', rowKey) => {
  const match = matchPath(path, {
    path: '/:menuId/:subMenuId?/:tab?',
  });
  if (!match) {
    return {
      title: '操作',
      align: 'center',
      fixed,
      render: (text, record) => (
        <Fragment>
          <Link
            to={{
              pathname: `/`,
            }}
          >
            <Tooltip title={name}>
              <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
            </Tooltip>
          </Link>
        </Fragment>
      ),
    };
  }
  let { params: { menuId, subMenuId, tab } = {} } = match;
  if (menuId !== 'primaryAudit' && menuId !== 'lastAudit') {
    tab = menuId;
    menuId = 'primaryAudit';
  }
  return {
    title: '操作',
    align: 'center',
    fixed,
    render: (text, record) => (
      <Fragment>
        <Link
          to={{
            pathname: `/${menuId}/detail/authInfo/${record[rowKey || 'id']}`,
            search: `${subMenuId === 'list' ? `?tab=${tab}` : !subMenuId ? `?menu=${tab}` : ''}`,
          }}
        >
          <Tooltip title={name}>
            <Icon type="search" style={{ color: 'rgba(0, 0, 0, 0.65)' }} />
          </Tooltip>
        </Link>
      </Fragment>
    ),
  };
};
/*
idColumn, //任务号
distributorNameColumn,  // 经销商名称
dealerAreaColumn, //经销商所在地区
bankNameColumn, // 银行名称
fldSerialNameColumn,  // 品牌名称
ewNameColumn, // 二网名称
isChainStoreColumn, // 是否直营
disApplyTimeColumn, // 经销商申请时间
ptAuditTimeColumn,  // 初审通过时间
firstTrialNameColumn, // 初审操作人
bankAuditTimeColumn,  // 复审通过时间
lastTrialNameColumn,  // 复审操作人
exceptionTimeColumn,  // 最新异常时间
isfirstColumn,  // 业务类型 （是否续作）
depositAmountColumn,  // 保证金
moveNumColumn,  // 移动台数
contractTypeColumn, // 合同类型
isContractChangeColumn, // 是否变更
isExceptionColumn,  // 是否存在异常
statusNameColumn, // 业务状态
operationColumn   // 操作
countSalesNumColumn  //总销量
mainStoresalesNumColumn  //主店销量
ewSalesRatioColumn  //二网销量占比
regionNameColumn  //大区名称
province3Column  //省份
city3Column //城市
countyNameColumn  //地区
mortgageCarNumColumn //抵/质押车总数
allowMoveCarNumColumn //审批允许移动总台数
ewFactMoveCarColumn //二网实际移动台数
ewMoveCarRatioColumn //二网移动车辆比例
foreclosureCarNumColumn //赎回车辆数量
salesNumColumn //销售总数量
ewSalesNumColumn //二网销量
ewSalesRatio2Column //二网销量占比(居中)
rawMoveCarRatioColumn //原20%移车比例
ewMoveCarIncrementColumn //二网移车增量
fldModelColumn, // 车系
fldTrimInfoColumn, // 车型名称
chassisColumn, // 车架号
moveintimeColumn, // 末次移动时间
buytimeColumn, // 赎车时间
showtimeColumn, // 销售时间

*/

export const accidColumn = {
  title: '登录账号',
  dataIndex: 'accid',
};
export const operatorColumn = {
  title: '联系人',
  dataIndex: 'operatorName',
};
export const telNumColumn = {
  title: '电话',
  dataIndex: 'telNum',
};
export const actionTimeColumn = {
  title: '操作时间',
  dataIndex: 'createdTime',
  // render: text => {
  //   return text && text.time && moment.unix(text.time / 1000).format(TIME_FORMAT);
  // },
};
export const actionUserColumn = {
  title: '操作人',
  dataIndex: 'createdBy',
};
export const microShopStatusColumn = {
  title: '微店状态',
  dataIndex: 'status',
  render: text => {
    return text === 1 ? '开启中' : '已关闭';
  },
};
export const spotDescriptionColumn = {
  title: '抽查描述',
  dataIndex: 'description',
};
