import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import LoginForm from './../LoginForm/LoginForm';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuth) {
      return this.props.history.push('/friends');
    }
  }

  onSubmit(params) {
    return this.props.login(params, () => this.props.history.push('/friends'));
  }

  render() {
    return <div className='friends-login'>
      <div className='container'>
        <Row>
          <Col md={4} mdOffset={4}>
            <LoginForm onSubmit={this.onSubmit} />
          </Col>
        </Row>
      </div>

    </div>;
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
