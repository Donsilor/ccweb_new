import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSuperviseSetting, updateSuperviseSetting } from '../../redux/modules/supervise';
import { ViewWrapper } from '../../layouts/ViewWrapper';
import { Button, Checkbox, Row, message } from 'antd';
import NumberInput from '../../components/NumberInput';

const CheckboxGroup = Checkbox.Group;

class SuperviseParam extends Component {
  state = {
    canModify: false,
  };

  componentDidMount() {
    this.props.fetch().then(() => {
      this.setState({
        ...this.props.param,
      });
    });
  }

  save = () => {
    console.log(this.state);
    this.props
      .update({
        id: this.state.id,
        cntBoundary: this.state.cntBoundary,
        cntByDay: this.state.cntByDay,
        cntByDealerDay: this.state.cntByDealerDay,
        repetRate: this.state.repetRate,
        timesByDealerWeek: this.state.timesByDealerWeek,
        unwork: this.state.unwork,
      })
      .then(({ payload }) => {
        if (payload && payload.data && payload.data.result == 0) {
          this.setState({
            canModify: false,
          });
          message.success('修改成功');
        } else {
          message.error('修改失败');
        }
      })
      .catch(ex => {
        console.log(ex);
        message.error('修改失败');
      });
  };

  edit = () => {
    this.setState({
      canModify: true,
    });
  };

  render() {
    const { canModify } = this.state;
    const plainOptions = ['星期一', '星期二', '星期三', '星期四', '星期五'];
    let unworkDays = this.state.unwork ? this.state.unwork.split(',') : [];

    return (
      <ViewWrapper>
        <Row>
          <div style={{ float: 'right', marginBottom: 24, marginRight: 24 }} key="toggleForm">
            {!canModify && (
              <Button type="primary" htmlType="submit" onClick={this.edit}>
                修改
              </Button>
            )}
            {canModify && (
              <Button type="primary" htmlType="submit" onClick={this.save}>
                保存
              </Button>
            )}
          </div>
        </Row>
        <div>
          <p>
            每家经销商每周至少抽查
            <NumberInput
              style={{ width: 50 }}
              disabled={!canModify}
              onChange={value => {
                this.setState({ timesByDealerWeek: value });
              }}
              value={this.state.timesByDealerWeek}
            />
            次
          </p>
          <p>
            每天每户抽查台数不得超过
            <NumberInput
              style={{ width: 50 }}
              disabled={!canModify}
              onChange={value => {
                this.setState({ cntByDealerDay: value });
              }}
              value={this.state.cntByDealerDay}
            />
            台
          </p>
          <p>
            <NumberInput
              style={{ width: 50 }}
              disabled={!canModify}
              onChange={value => {
                this.setState({ cntBoundary: value });
              }}
              value={this.state.cntBoundary}
            />
            台及以下库存经销商每次抽查1台，以上库存经销商每次抽查2台
          </p>
          <p>
            保证每个月抽查车辆明细
            <NumberInput
              style={{ width: 50 }}
              disabled={!canModify}
              onChange={value => {
                this.setState({ repetRate: value });
              }}
              value={this.state.repetRate}
            />
            %以内重复率
          </p>
          <p>
            每天抽查不得低于
            <NumberInput
              style={{ width: 50 }}
              disabled={!canModify}
              onChange={value => {
                this.setState({ cntByDay: value });
              }}
              value={this.state.cntByDay}
            />
            台（包括特殊抽查名单抽查数）
          </p>
          <p>设置不查工作日</p>
          <CheckboxGroup
            options={plainOptions}
            value={unworkDays}
            disabled={!canModify}
            onChange={checkedValues => {
              this.setState({ unwork: checkedValues.toString() });
            }}
          />
        </div>
      </ViewWrapper>
    );
  }
}

function mapStateToProps(store) {
  return {
    loading: store.supervise.loading,
    param: store.supervise.param,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(fetchSuperviseSetting()),
    update: value => dispatch(updateSuperviseSetting(value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperviseParam);
