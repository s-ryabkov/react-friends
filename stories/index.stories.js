import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import './../assets/styles/common.scss';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from './../assets/js/components/Auth/LoginForm/LoginForm';
import Header from './../assets/js/components/Common/Header/Header';
import { MemoryRouter } from 'react-router-dom';

storiesOf('Welcome', module)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('LoginForm', module)
  .add('LoginForm', () => <LoginForm onSubmit={() => {}} />);

storiesOf('Header', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Header', () => <Header onSubmit={() => {}} />);
