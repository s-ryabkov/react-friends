import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFriends } from '../actions/friends';
import FriendList from '../components/Friends/FriendsList/FriendList';

function mapStateToProps(state) {
  return {
    rows: state.friends.rows,
    total: state.friends.total,
    isAuth: !!state.authentication.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getFriends,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendList);
