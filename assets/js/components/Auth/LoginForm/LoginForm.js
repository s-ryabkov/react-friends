import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const data = {
      login: this.state.login,
      password: this.state.password,
    };
    this.props.onSubmit(data);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    return <div className='friends-login'>
      <div className='container'>
    <form onSubmit={this.handleSubmit}>
      <div>
        <label>Email</label>
        <div>
          <input
            ref='login'
            name='login'
            type='text'
            placeholder='Email'
            onChange={this.onChange}
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <input
            ref='password'
            name='password'
            type='text'
            placeholder='Password'
            onChange={this.onChange}
          />
        </div>
      </div>
      <div>
        <button ref='submit' type='submit'>
          Submit
        </button>
      </div>
    </form></div></div>;
  }

}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
