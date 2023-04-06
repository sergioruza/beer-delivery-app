import React, { Component } from 'react';
import NavBarAdm from '../components/NavBarAdm';
import usersMock from '../utils/mocks/usersMock';
import TableUsers from '../components/tableUsers';
import validateFields from '../utils/validateFields';

export default class ManagementAdm extends Component {
  state = {
    roleSelect: 'customer',
    msg: '',
    btnDisable: true,
    inputPass: '',
    inputName: '',
    inputEmail: '',
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

  render() {
    const ADMIN_MANAGE = 'admin_manage__';
    const { inputName, inputEmail, inputPass, roleSelect, msg, btnDisable } = this.state;
    return (
      <div>
        <NavBarAdm />

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
              data-testid={ `${ADMIN_MANAGE}button-register` }
            >
              Cadastrar

            </button>
          </div>

          <div>

            <TableUsers users={ usersMock } />

          </div>
        </div>

      </div>
    );
  }
}
