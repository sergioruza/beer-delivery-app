import React from 'react';
import PropTypes from 'prop-types';
import { loginAPI } from '../services/requests';
import validateFields from '../utils/validateFields';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    invalidUser: false,
    errorMsg: '',
    loginBtnDisable: true,
  };

  componentDidMount() {
    const { history } = this.props;
    const user = getLocalStorage('user', 'default');
    const rote = user.role === 'customer' ? 'products' : 'orders';
    if (user !== 'default') {
      history.push(`/${user.role}/${rote}`);
    }
  }

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;

    const result = await loginAPI('/login', { email, password });
    const { error, role, token, name, id } = result;
    console.log(result);

    if (error) {
      return this.setState({ invalidUser: true, errorMsg: error });
    }
    const storageObj = { token, role, name, email, id };
    setLocalStorage('user', storageObj);
    const rote = role === 'customer' ? 'products' : 'orders';
    history.push(`/${role}/${rote}`);
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const invalidFieldsMessage = validateFields(email, password);
      if (invalidFieldsMessage !== true) {
        return this.setState({
          invalidUser: true, errorMsg: invalidFieldsMessage, loginBtnDisable: true });
      }
      this.setState({ invalidUser: false, loginBtnDisable: false });
    });
  };

  render() {
    const { email, password, invalidUser, errorMsg, loginBtnDisable } = this.state;
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
        <button
          type="button"
          onClick={ this.handleLogin }
          disabled={ loginBtnDisable }
          data-testid="common_login__button-login"
        >
          Login
        </button>
        <button
          type="button"
          onClick={ () => history.push('/register') }
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
        {
          invalidUser && (
            <span
              data-testid="common_login__element-invalid-email"
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
