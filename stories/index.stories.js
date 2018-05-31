import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import './../assets/styles/common.scss';
import 'bootstrap/dist/css/bootstrap.css';
import FriendsList from '../assets/js/components/FriendsList/FriendsList';
import Friend from '../assets/js/components/FriendsList/Friend/Friend';
import Header from '../assets/js/components/Header/Header';
import LoginForm from '../assets/js/components/LoginForm/LoginForm';
import NotFound from '../assets/js/components/Utils/NotFound';
import { MemoryRouter } from 'react-router-dom';
import Utils from './../api/utils/Utils';

const noOpCallback = () => null;

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

const friends = Utils.createRandomFriends(10);
storiesOf('FriendsList', module)
  .add('FriendsList', () => <FriendsList getFriends={noOpCallback} rows={friends} total={20} />)
  .add('Friend', () => <table><Friend friend={friends[0]} /></table>);

storiesOf('Header', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('Header', () => <Header onSubmit={noOpCallback} />);

storiesOf('LoginForm', module)
  .add('LoginForm', () => <LoginForm onSubmit={noOpCallback} />);

storiesOf('NotFound', module)
  .add('NotFound', () => <NotFound />);
