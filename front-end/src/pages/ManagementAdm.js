import React, { Component } from 'react';
import NavBarAdm from '../components/NavBarAdm';
import usersMock from '../utils/mocks/usersMock';
import TableUsers from '../components/tableUsers';

export default class ManagementAdm extends Component {
  render() {
    const ADMIN_MANAGE = 'admin_manage__';
    return (
      <div>
        <NavBarAdm />

        <div>

          <div>
            <h1>Cadastrar novo usuário</h1>
            <span>
              Nome
              <input
                data-testid={ `${ADMIN_MANAGE}input-name` }
                placeholder="Nome e sobrenome"
              />
            </span>

            <span>
              Email
              <input
                data-testid={ `${ADMIN_MANAGE}input-email` }
                placeholder="email@email.com"
              />
            </span>

            <span>
              Senha
              <input
                type="password"
                data-testid={ `${ADMIN_MANAGE}input-password` }
                placeholder="*******"
              />
            </span>

            <select data-testid={ `${ADMIN_MANAGE}select-role` }>
              <option value="seller">Vendedor</option>
              <option value="customer">Cliente</option>
            </select>

            <button
              type="button"
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
