import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFriends } from '../../actions/friends';
import FriendsList from './FriendsList';

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

const FriendListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendsList);

FriendListContainer.requiredActions = [getFriends];

export default FriendListContainer;
