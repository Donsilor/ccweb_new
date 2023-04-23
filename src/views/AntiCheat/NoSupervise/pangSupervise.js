import { connect } from 'react-redux';
import { getCarInspect, updateCarInspect } from 'redux/modules/noSupervise';
import View from './listView';
import { formatTime } from 'common/utils';
const mapStateToProps = store => ({
    loading: store.noSupervise.loading,
    list: store.noSupervise.CarInspect.list,
    paging: store.noSupervise.CarInspect.paging,
    query: store.noSupervise.CarInspect.query,
    export: '/SpotTestTaskAction_exportCarInspectSpotList',
    columns: columns,
});

function mapDispatchToProps(dispatch) {
    return {
        fetch: (data, paging) => dispatch(getCarInspect(data, paging)),
        updateQuery: data => {
            dispatch(updateCarInspect({ ...data }));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
const columns = [
    { title: '经销商', dataIndex: 'distributorName' },
    { title: '供应链', dataIndex: 'supplyChain' },
    { title: '标识', dataIndex: 'chassis' },
    { title: '任务类型', dataIndex: 'description' },
    { title: '业务编号', dataIndex: 'businessNo' },
    { title: '任务下发时间', dataIndex: 'bookTime', render: text => formatTime(text) },
    { title: '拍照时间', dataIndex: 'uploadTime', render: text => formatTime(text) },
    { title: '是否拍照', dataIndex: 'isTakePhoto' },
    { title: '审核状态', dataIndex: 'auditStatusName' },
];