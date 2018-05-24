import { connect } from 'react-redux';
import Header from './../components/Common/Header/Header';

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
  };
}

export default connect(
  mapStateToProps,
  {},
)(Header);
