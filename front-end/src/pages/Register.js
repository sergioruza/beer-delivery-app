import React from 'react';
import PropTypes from 'prop-types';
import { loginAPI } from '../services/requests';
import validateFields from '../utils/validateFields';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    invalidUser: false,
    errorMsg: '',
  };

  handleRegister = async (event) => {
    event.preventDefault();
    const { email, password, username } = this.state;
    const invalidFieldsMessage = validateFields(email, password, username);
    if (invalidFieldsMessage !== true) {
      return this.setState({ invalidUser: true, errorMsg: invalidFieldsMessage });
    }
    const { history } = this.props;

    const { error } = await loginAPI('/register', { username, email, password });
    if (error) {
      return this.setState({ invalidUser: true, errorMsg: error });
    }

    history.push('/login');
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password, invalidUser, errorMsg } = this.state;
    return (
      <div>
        <h1>Registro</h1>
        <input
          type="text"
          name="username"
          value={ username }
          placeholder="nome"
          onChange={ this.handleChange }
          data-testid="common_login__input-email"
        />
        <input
          type="email"
          name="email"
          required
          value={ email }
          placeholder="email"
          onChange={ this.handleChange }
          data-testid="common_login__input-email"
        />
        <input
          type="password"
          name="password"
          placeholder="senha"
          value={ password }
          onChange={ this.handleChange }
          data-testid="common_login__input-password"
        />
        <button
          type="button"
          value="Cadastrar"
          onClick={ this.handleRegister }
          data-testid="common_login__button-register"
        >
          Cadastrar

        </button>
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

Register.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Register;
