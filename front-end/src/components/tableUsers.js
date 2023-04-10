import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { deleteUsers } from '../services/requests';

export default class TableUsers extends Component {
  state = {

    usersState: [],
  };

  async componentDidMount() {
    const { users } = this.props;
    this.setState({ usersState: users });
  }

  deleteUserReq = async (id) => {
    await deleteUsers(id);

    const { usersState } = this.state;
    const deletePage = usersState.filter((user) => user.id !== id);
    this.setState({ usersState: deletePage });
  };

  render() {
    const { usersState } = this.state;
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

            usersState.map((user, index) => {
              counter += 1;
              return (
                <tr key={ user.name }>
                  <td
                    data-testid={ `${ADMIN_MANAGE__ELEMENT
                    }-user-table-item-number-${index}` }
                  >
                    {counter}

                  </td>
                  <td
                    data-testid={
                      `${ADMIN_MANAGE__ELEMENT}-user-table-name-${index}`
                    }
                  >
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
                    data-testid={
                      `admin_manage__element-user-table-remove-user-table-remove-${index}`
                    }
                  >
                    <button
                      onClick={ async () => this.deleteUserReq(user.id) }
                      type="button"
                    >
                      Excluir

                    </button>

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
