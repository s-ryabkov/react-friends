import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions/authentication';
import LoginPage from '../components/Auth/LoginPage/LoginPage';

function mapStateToProps(state) {
  return {
    isAuth: !!state.authentication.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
