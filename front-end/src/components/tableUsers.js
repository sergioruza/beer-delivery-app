import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getUsers, deleteUsers } from '../services/requests';

export default class TableUsers extends Component {
  state = {
    users: [],
    errorMsg: '',
  };

  async componentDidMount() {
    await this.fetchUsers();
  }

  fetchUsers = async () => {
    const users = await getUsers();
    if (users.error) {
      return this.setState({ errorMsg: users.error });
    }
    this.setState({ users });
  };

  deleteUserReq = async (id) => {
    const deleteUser = await deleteUsers(id);
    if (deleteUsers.error) {
      return this.setState({ errorMsg: deleteUser.erro });
    }
    this.setState({ errorMsg: deleteUser });
  };

  render() {
    // const { users } = this.props;
    const { users, errorMsg } = this.state;
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
            errorMsg !== '' ? <h2>{ errorMsg }</h2> : (
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
                        `${ADMIN_MANAGE__ELEMENT}-user-table-remove-${index}`
                      }
                    >
                      <button
                        onClick={ () => this.deleteUserReq(user.id) }
                        type="button"
                      >
                        Excluir

                      </button>

                    </td>
                  </tr>
                );
              }))
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
