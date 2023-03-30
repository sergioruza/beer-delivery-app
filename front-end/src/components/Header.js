import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getOrderType from '../utils/getOrderType';
import logout from '../utils/logout';

class Header extends Component {
  render() {
    const { userName, type, history } = this.props;
    const ROUTE = 'customer_products';
    const PRODUCTS = 'element-navbar-link-products';
    const ORDERS = 'element-navbar-link-orders';
    const LOGOUT = 'element-navbar-link-logout';
    const FULLNAME = 'element-navbar-user-full-name';
    const ORDERSTYPE = getOrderType(type);
    return (
      <div>
        {
          type === 'customer' && (
            <button
              type="button"
              data-testid={ `${ROUTE}__${PRODUCTS}` }
            >
              Produtos
            </button>

          )
        }
        <button
          type="button"
          data-testid={ `${ROUTE}__${ORDERS}` }
        >
          { ORDERSTYPE }
        </button>

        <span
          data-testid={ `${ROUTE}__${FULLNAME}` }
        >
          { userName }
        </span>

        <button
          type="button"
          data-testid={ `${ROUTE}__${LOGOUT}` }
          onClick={ () => logout(history) }
        >
          Sair
        </button>
      </div>
    );
  }
}

Header.propTypes = {
  type: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};

export default Header;
