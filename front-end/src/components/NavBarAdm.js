import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export default class NavBarAdm extends Component {
  render() {
    const { name } = this.props;
    const CUSTOMER_PRODUCTS = 'customer_products__element';
    return (
      <div>
        <p data-testid={ `${CUSTOMER_PRODUCTS}-navbar-link-orders` }>
          GERENCIAR USUÁRIOS
        </p>

        <p data-testid={ `${CUSTOMER_PRODUCTS}-navbar-user-full-name` }>
          {name || 'nome do admin'}

        </p>
        <button
          type="button"
          data-testid={ `${CUSTOMER_PRODUCTS}-navbar-link-logout` }
        >
          Sair

        </button>
      </div>
    );
  }
}

NavBarAdm.propTypes = {
  name: PropTypes.string,
}.isRequired;
