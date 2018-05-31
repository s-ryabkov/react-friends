import React from 'react';
import CommonLayout from './layouts/CommonLayout';
import FriendList from '../components/FriendsList';

function FriendsPage() {
  return (
    <CommonLayout className={'page-friends'}>
      <FriendList />
    </CommonLayout>
  );
}

FriendsPage.requiredActions = [
  ...FriendList.requiredActions,
];

export default FriendsPage;
