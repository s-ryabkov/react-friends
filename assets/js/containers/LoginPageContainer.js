import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions/authentication';
import LoginPage from '../components/Auth/LoginPage/LoginPage';

function mapStateToProps(state, ownProps) {
  return {};
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
