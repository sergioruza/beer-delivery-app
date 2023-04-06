import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TableUsers extends Component {
  render() {
    const { users } = this.props;
    const ADMIN_MANAGE = 'admin_manage__';
    const ADMIN_MANAGE__ELEMENT = 'admin_manage__element';
    let counter = 0;
    return (
      <div>

        <table>
          <tr>
            <th>item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Exluir</th>
          </tr>

          {
            users.map((user, index) => {
              counter += 1;
              return (
                <tr key={ user.name }>
                  <td
                    data-testid={ `${ADMIN_MANAGE__ELEMENT
                    }-user-table-item-number-${index}` }
                  >
                    {counter}

                  </td>
                  <td data-testid={ `$${ADMIN_MANAGE}input-email` }>
                    {user.name}

                  </td>
                  <td
                    data-testid={ `${ADMIN_MANAGE__ELEMENT}-user-table-email-${index}` }
                  >
                    {user.email}

                  </td>
                  <td
                    data-testid={ `${ADMIN_MANAGE__ELEMENT}-user-table-role-${index}` }
                  >
                    {user.role}

                  </td>
                  <td
                    data-testid={ `${ADMIN_MANAGE__ELEMENT}-user-table-remove-${index}` }
                  >
                    <button type="button">Excluir</button>

                  </td>
                </tr>
              );
            })
          }

        </table>

      </div>
    );
  }
}

TableUsers.propTypes = {
  map: PropTypes.func,
  users: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
}.isRequired;
