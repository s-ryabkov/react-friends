import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(props) {
    if (props.isAuth) {
      props.loggedInRedirect('/');
    }
    return null;
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const data = {
      login: this.state.login,
      password: this.state.password,
    };
    return this.props.login(data);
  }

  render() {
    return (
      <div className='friends-login'>
        <div className='container'>
          <Row>
            <Col md={4} mdOffset={4}>
              <div className='friends-login'>
                <form onSubmit={this.onSubmit}>
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
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  loggedInRedirect: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default LoginForm;
