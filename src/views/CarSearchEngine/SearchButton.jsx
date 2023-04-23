import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, AutoComplete, Modal, message, Table } from 'antd';
import styles from './style.module.less';
import { updateCarChassis, searchCarChassisList, updateCarId } from 'redux/modules/carSearchEngine';

const Search = Input.Search;
const Option = AutoComplete.Option;
const columns = [
  {
    title: '车架号',
    dataIndex: 'chassis',
    key: 'chassis',
  },
  {
    title: '经销商',
    dataIndex: 'distributorName',
    key: 'distributorName',
  },
  {
    title: '品牌/车系/车型',
    dataIndex: 'brandModelTrim',
    key: 'brandModelTrim',
  },
];
export class SearchButton extends Component {
  autoComplete = null;
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      chassis: props.chassis,
      dataSource: [],
      showModal: false,
    };
  }

  selectRow = record => {
    if (record && record.chassis) {
      this.setState(
        {
          showModal: false,
        },
        () => {
          this.searchPrecisely(record);
        }
      );
    }
  };

  onCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  onSearch = value => {
    if (!/^([a-zA-Z0-9]{5,17})$/.test(value)) {
      this.setState(
        {
          showError: true,
        },
        () => {
          setTimeout(() => {
            this.setState({
              showError: false,
            });
          }, 2000);
        }
      );
    } else {
      this.props
        .searchCarChassisList({
          chassis: value,
        })
        .then(({ payload }) => {
          if (payload.data && payload.data.result === 0) {
            if (Array.isArray(payload.data.list) && payload.data.list.length === 1) {
              this.searchPrecisely(payload.data.list[0]);
            } else {
              this.setState({
                showModal: true,
              });
            }
          } else {
            return Promise.reject(payload.data.msg);
          }
        })
        .catch(err => {
          message.error(err, 2.5);
        });
    }
  };

  searchPrecisely = value => {
    const dataSource = [...this.state.dataSource];
    !dataSource.includes(value.chassis) && dataSource.push(value.chassis);
    this.setState(
      {
        showError: false,
        dataSource: [...dataSource],
      },
      () => {
        this.autoComplete && this.autoComplete.blur();
        this.props.updateCarChassis(value.chassis);
        this.props.updateCarId(value.id);
        this.props.onSearch(value);
        this.setState({
          chassis: value.chassis,
        });
      }
    );
  };

  componentDidMount() {
    const data = localStorage.getItem('carHis');
    const dataSource = (data && data.split(',').filter(value => value)) || [];
    this.setState({
      dataSource,
    });
  }

  componentWillUnmount() {
    const { dataSource } = this.state;
    localStorage.setItem('carHis', dataSource.join());
  }

  onChange = value => {
    this.setState({ chassis: value });
  };

  onBtnSearch = (value, e) => {
    e.preventDefault();
    e.stopPropagation();
    this.onSearch(value.trim());
  };

  getValue = () => {
    return this.state.value;
  };

  clearAll = () => {
    this.setState({
      dataSource: [],
    });
    localStorage.setItem('carHis', '');
  };

  renderOptions = () => {
    const { dataSource } = this.state;
    const options = dataSource.map(opt => (
      <Option key={opt} value={opt}>
        {opt}
      </Option>
    ));
    options.length > 0 &&
      options.push(
        <Option disabled key="clear" className="clear-all">
          <a href="javascript:;" className={styles.clearAll} onClick={this.clearAll} rel="noopener noreferrer">
            清除所有记录
          </a>
        </Option>
      );
    return options;
  };
  render() {
    return (
      <div className={styles.searchButton}>
        <AutoComplete
          allowClear={true}
          dataSource={this.renderOptions()}
          style={{ width: '350px' }}
          onSelect={this.onSearch}
          defaultValue={this.props.chassis}
          defaultActiveFirstOption={false}
          onChange={this.onChange}
          value={this.state.chassis}
          size={this.props.type || 'default'}
          placeholder="请输入车架号"
          ref={el => {
            this.autoComplete = el;
          }}
        >
          <Search
            enterButton="CC一下"
            size={this.props.type || 'default'}
            onSearch={this.onBtnSearch}
            style={{ width: '450px' }}
            maxLength={17}
          />
        </AutoComplete>

        {this.state.showError && <p className={styles.errMsg}>请至少输入5位合法的车架号</p>}
        <Modal title="车架号搜索结果" visible={this.state.showModal} onCancel={this.onCancel} footer={null} width={900}>
          <Table
            dataSource={this.props.chassisList}
            columns={columns}
            pagination={false}
            scroll={{ y: 500 }}
            onRow={record => ({
              onClick: () => {
                this.selectRow(record);
              },
            })}
            rowKey={'id'}
            scroll={{ x: true }}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.carSearchEngine.loading,
  chassis: store.carSearchEngine.chassis,
  chassisList: store.carSearchEngine.chassisList,
});

function mapDispatchToProps(dispatch) {
  return {
    updateCarChassis: data => dispatch(updateCarChassis(data)),
    searchCarChassisList: data => dispatch(searchCarChassisList(data)),
    updateCarId: data => dispatch(updateCarId(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchButton);
