import React from 'react';
import TestUtils from 'react-dom/test-utils';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {

  it('<LoginForm /> - on submit empty form', () => {

    const onSubmitMock = jest.fn();
    const loginForm = TestUtils.renderIntoDocument(
      <LoginForm onSubmit={onSubmitMock} />
    );

    expect(onSubmitMock).toHaveBeenCalledTimes(0);

    const submitButton = TestUtils.findRenderedDOMComponentWithTag(loginForm, 'form');
    TestUtils.Simulate.submit(submitButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ login: '', password: '' });
  });

  it('<LoginForm /> - on submit with data', () => {

    const onSubmitMock = jest.fn();

    const login = 'test@example.com';
    const password = 'password123';
    const loginForm = TestUtils.renderIntoDocument(
      <LoginForm onSubmit={onSubmitMock} />
    );

    expect(onSubmitMock).toHaveBeenCalledTimes(0);

    const submitButton = TestUtils.findRenderedDOMComponentWithTag(loginForm, 'form');

    const loginInput = loginForm.refs.login;
    loginInput.value = login;
    TestUtils.Simulate.change(loginInput);

    const passwordInput = loginForm.refs.password;
    passwordInput.value = password;
    TestUtils.Simulate.change(passwordInput);

    TestUtils.Simulate.submit(submitButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ login: login, password: password });
  });

});
