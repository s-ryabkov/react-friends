import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, loggedInRedirect } from '../../actions/authentication';
import LoginForm from './LoginForm';

function mapStateToProps(state) {
  return {
    isAuth: !!state.authentication.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
    loggedInRedirect,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
