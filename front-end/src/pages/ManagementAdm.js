import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TableUsers from '../components/tableUsers';
import validateFields from '../utils/validateFields';
import Header from '../components/Header';
import { createUserAdm, getUsers } from '../services/requests';
import getLocalStorage from '../services/getLocalStorage';

export default class ManagementAdm extends Component {
  state = {
    roleSelect: 'customer',
    msg: '',
    btnDisable: true,
    inputPass: '',
    inputName: '',
    inputEmail: '',
    invalidRegister: false,
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const user = getLocalStorage('user', []);
    this.setState({ user });
    await this.fetchUsers();
  }

  fetchUsers = async () => {
    const users = await getUsers();
    if (users.error) {
      return this.setState({ errorMsg: users.error });
    }
    const filterAdm = users.filter((e) => e.role !== 'administrator');
    this.setState({ users: filterAdm, loading: true });
  };

  validate = () => {
    const { inputName, inputEmail, inputPass } = this.state;
    const result = validateFields(inputEmail, inputPass, inputName);
    if (result === false) {
      return this.setState({ btnDisable: false });
    }

    this.setState({ msg: result });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate());
  };

  onClickRegister = async () => {
    const { inputName, inputEmail, inputPass, roleSelect, user } = this.state;
    const payload = {
      email: inputEmail, password: inputPass, name: inputName, role: roleSelect,
    };

    const create = await createUserAdm(
      '/register',
      payload,
      user.token,
    );
    const { error } = create;
    if (error) {
      return this.setState({ invalidRegister: true });
    }

    this.setState({
      btnDisable: true,
      inputPass: '',
      inputName: '',
      inputEmail: '',
      msg: 'Usuário cadastrado com sucesso',
    });
  };

  render() {
    const ADMIN_MANAGE = 'admin_manage__';
    const { inputName, inputEmail, inputPass, roleSelect, msg, btnDisable,
      invalidRegister, users, errorMsg, loading } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />

        <div>

          <div>
            <h1>Cadastrar novo usuário</h1>
            <span>
              Nome
              <input
                value={ inputName }
                onChange={ this.handleChange }
                name="inputName"
                data-testid={ `${ADMIN_MANAGE}input-name` }
                placeholder="Nome e sobrenome"
              />
            </span>

            <span>
              Email
              <input
                value={ inputEmail }
                onChange={ this.handleChange }
                name="inputEmail"
                data-testid={ `${ADMIN_MANAGE}input-email` }
                placeholder="email@email.com"
              />
            </span>

            <span>
              Senha
              <input
                value={ inputPass }
                onChange={ this.handleChange }
                name="inputPass"
                type="password"
                data-testid={ `${ADMIN_MANAGE}input-password` }
                placeholder="*******"
              />
            </span>

            <select
              value={ roleSelect }
              onChange={ this.handleChange }
              name="roleSelect"
              data-testid={ `${ADMIN_MANAGE}select-role` }
            >
              <option value="customer">Cliente</option>
              <option value="seller">Vendedor</option>
            </select>

            <button
              type="button"
              disabled={ btnDisable }
              onClick={ this.onClickRegister }
              data-testid={ `${ADMIN_MANAGE}button-register` }
            >
              Cadastrar

            </button>

            {
              btnDisable && <p>{ msg }</p>
            }
            {
              invalidRegister
              && (
                <p
                  data-testid={ `${ADMIN_MANAGE}element-invalid-register` }
                >
                  Nome ou email já existe

                </p>
              )
            }
          </div>

          <div>
            {
              loading && <TableUsers errorMsg={ errorMsg } users={ users } />
            }

          </div>
        </div>

      </div>
    );
  }
}

ManagementAdm.propTypes = {
  history: PropTypes.shape(),
}.isRequired;
