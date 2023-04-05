import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { loginAPI } from '../services/requests';
import validateFields from '../utils/validateFields';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';
import '../css/Login.css';
import logo from '../images/logo.png';

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

    const rote = role === 'customer' ? 'products' : 'orders';
    history.push(`/${role}/${rote}`);
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
      <div className="login-div">
        <div className="all-login">
          <img className="logo-img" src={ logo } alt="logo" />
          <Box
            className="inputs-login"
            component="form"
            sx={ {
              '& > :not(style)': { m: 1, width: '25ch' },
            } }
            autoComplete="off"
          >

            <TextField
              variant="outlined"
              type="email"
              name="email"
              value={ email }
              placeholder="email"
              onChange={ this.handleChange }
              data-testid="common_login__input-email"
            />

            <TextField
              variant="outlined"
              type="password"
              name="password"
              value={ password }
              placeholder="senha"
              onChange={ this.handleChange }
              data-testid="common_login__input-password"
            />
          </Box>
          <div className="btns-div">

            <button
              className="btn-login"
              type="button"
              onClick={ this.handleLogin }
              disabled={ disableLoginBtn }
              data-testid="common_login__button-login"
            >
              Login
            </button>
            <button
              className="btn-create-count"
              type="button"
              onClick={ () => history.push('/register') }
              data-testid="common_login__button-register"
            >
              Ainda não tenho conta
            </button>
          </div>
          <div className="msg-div">
            {
              showMsg && (
                <span
                  className="msg"
                  data-testid="common_login__element-invalid-email"
                >
                  {message === 'User not found'
                    ? 'Usuário não encontrado ou senha incorreta!' : `${message}!`}
                </span>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Login;
