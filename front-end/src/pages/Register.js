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
    loginBtnDisable: true,
  };

  handleRegister = async (event) => {
    event.preventDefault();
    const { email, password, username } = this.state;

    const { history } = this.props;

    const { error, token } = await loginAPI(
      '/register',
      { name: username, email, password },
    );
    if (error) {
      return this.setState({ invalidUser: true, errorMsg: error });
    }
    const storageObj = { token, role: 'customer', name: username, email };
    localStorage.setItem('user', JSON.stringify(storageObj));
    history.push('/customer/products');
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      const { email, password, username } = this.state;
      const invalidFieldsMessage = validateFields(email, password, username);

      if (invalidFieldsMessage !== true) {
        return this.setState({
          invalidUser: true, errorMsg: invalidFieldsMessage, loginBtnDisable: true });
      }

      this.setState({ invalidUser: false, loginBtnDisable: false });
    });
  };

  render() {
    const { username, email, password, invalidUser,
      errorMsg, loginBtnDisable } = this.state;

    return (
      <div>
        <h1>Registro</h1>
        <input
          type="text"
          name="username"
          value={ username }
          placeholder="nome"
          onChange={ this.handleChange }
          data-testid="common_register__input-name"
        />
        <input
          type="email"
          name="email"
          required
          value={ email }
          placeholder="email"
          onChange={ this.handleChange }
          data-testid="common_register__input-email"
        />
        <input
          type="password"
          name="password"
          placeholder="senha"
          value={ password }
          onChange={ this.handleChange }
          data-testid="common_register__input-password"
        />
        <button
          type="submit"
          value="Cadastrar"
          disabled={ loginBtnDisable }
          onClick={ this.handleRegister }
          data-testid="common_register__button-register"
        >
          Cadastrar

        </button>
        {
          invalidUser && (
            <span
              data-testid="common_register__element-invalid_register"
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Register;
