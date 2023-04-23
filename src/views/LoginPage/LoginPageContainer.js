import { connect } from 'react-redux';
import { login } from 'redux/modules/session';
import LoginPage from './LoginPage';

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data)),
  };
};

const LayoutContainer = connect(
  null,
  mapDispatchToProps
)(LoginPage);

export default LayoutContainer;
