import LoginPageContainer from './containers/LoginPageContainer';
import AuthRequired from './components/Auth/AuthRequired/AuthRequired';
import FriendListContainer from './containers/FriendListContainer';
import NotFound from './components/NotFound';

const routes = [
  {
    path: '/login',
    component: LoginPageContainer,
    loadData: () => {},
  },
  {
    path: '/friends',
    component: AuthRequired(FriendListContainer),
    loadData: () => {},
  },
  {
    path: '*',
    component: NotFound,
    loadData: null,
  },
];
export default routes;
