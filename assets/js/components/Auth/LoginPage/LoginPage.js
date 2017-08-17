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

  onSubmit(params) {
    return this.props.login(params, () => this.props.history.push('/friends'));
  }

  render() {
    return <div className='login'>
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
};

export default withRouter(LoginPage);
