import React from 'react';
import PropTypes from 'prop-types';
import { loginAPI } from '../services/requests';
import validateFields from '../utils/validateFields';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    invalidUser: false,
    errorMsg: '',
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, password, username } = this.state;
    const invalidFieldsMessage = validateFields(email, password, username);
    if (invalidFieldsMessage !== true) {
      return this.setState({ invalidUser: true, errorMsg: invalidFieldsMessage });
    }

    const { history } = this.props;
    const result = await loginAPI('/login', { email, password });
    const { error, role, token } = result;

    if (error) {
      return this.setState({ invalidUser: true, errorMsg: error });
    }
    // setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    history.push(`/${role}`);
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value, invalidUser: false });
  };

  render() {
    const { email, password, invalidUser, errorMsg } = this.state;
    const { history } = this.props;
    return (
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          onChange={ this.handleChange }
          data-testid="common_login__input-email"
        />
        <input
          type="password"
          name="password"
          value={ password }
          placeholder="senha"
          onChange={ this.handleChange }
          data-testid="common_login__input-password"
        />
        <input
          type="button"
          value="login"
          onClick={ this.handleLogin }
          data-testid="common_login__button-login"
        />
        <input
          type="button"
          value="Ainda não tenho conta"
          onClick={ () => history.push('/register') }
          data-testid="common_login__button-register"
        />
        {
          invalidUser && (
            <span
              data-testid="common_login__element-invalid-register"
            >
              {errorMsg}
            </span>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Login;
