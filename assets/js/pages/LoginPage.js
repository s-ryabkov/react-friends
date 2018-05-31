import React from 'react';
import EmptyLayout from './layouts/EmptyLayout';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <EmptyLayout className={'page-login'}>
      <LoginForm />
    </EmptyLayout>
  );
}

export default LoginPage;
