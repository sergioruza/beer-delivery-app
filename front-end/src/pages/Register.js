import React from 'react';
import PropTypes from 'prop-types';
import { loginAPI } from '../services/requests';
import validateFields from '../utils/validateFields';
import setLocalStorage from '../services/setLocalStorage';

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    showMsg: false,
    message: '',
    disableLoginBtn: true,
  };

  handleRegister = async (event) => {
    event.preventDefault();
    const { email, password, name } = this.state;
    const { history } = this.props;

    const { error, token, id } = await loginAPI('/register', { name, email, password });
    if (error) return this.setState({ showMsg: true, message: error });

    const storageObj = { token, role: 'customer', name, email, id };
    setLocalStorage('user', storageObj);

    history.push('/customer/products');
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { name, email, password } = this.state;
      const authUser = validateFields(email, password, name);
      this.setState({ showMsg: authUser, message: authUser, disableLoginBtn: authUser });
    });
  };

  render() {
    const { name, email, password, message,
      showMsg, disableLoginBtn } = this.state;

    return (
      <div>
        <h1>Registro</h1>
        <input
          type="text"
          name="name"
          value={ name }
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
          disabled={ disableLoginBtn }
          onClick={ this.handleRegister }
          data-testid="common_register__button-register"
        >
          Cadastrar

        </button>
        {
          showMsg && (
            <span
              data-testid="common_register__element-invalid_register"
            >
              {message}
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
