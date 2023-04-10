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
    showMsg: false,
    message: '',
    disableLoginBtn: true,
  };

  componentDidMount() {
    const { history } = this.props;
    const user = getLocalStorage('user', 'default');
    if (user !== 'default') {
      const rote = user.role === 'customer' ? 'products' : 'orders';
      history.push(`/${user.role}/${rote}`);
    }
  }

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;

    const user = await loginAPI('/login', { email, password });
    const { error, role, token, name, id } = user;
    if (error) return this.setState({ showMsg: true, message: error });

    const userToStorage = { token, role, name, email, id };
    setLocalStorage('user', userToStorage);

    const roleExact = role === 'administrator' ? 'admin' : role;
    const rote = role === 'customer' ? 'products' : 'manage';
    history.push(`/${roleExact}/${role === 'seller' ? 'orders' : rote}`);
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const authUser = validateFields(email, password);
      this.setState({ showMsg: authUser, message: authUser, disableLoginBtn: authUser });
    });
  };

  render() {
    const { history } = this.props;
    const { email, password, showMsg, message, disableLoginBtn } = this.state;
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
          disabled={ disableLoginBtn }
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
          showMsg && (
            <span
              data-testid="common_login__element-invalid-email"
            >
              {message}
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
