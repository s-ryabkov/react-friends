import LoginPage from './pages/LoginPage';
import FriendsPage from './pages/FriendsPage';
import NotFound from './components/Utils/NotFound';
import HomePage from './pages/HomePage';
import Roles from './../../api/utils/Roles';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/friends',
    exact: true,
    component: FriendsPage,
    auth: [Roles.USER],
  },
  {
    path: '*',
    component: NotFound,
  },
];
export default routes;
