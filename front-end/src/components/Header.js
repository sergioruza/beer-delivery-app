import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getOrderType from '../utils/getOrderType';
import getLocalStorage from '../services/getLocalStorage';
import logout from '../utils/logout';
import '../css/Header.css';

class Header extends Component {
  render() {
    const { history } = this.props;
    const actualRoute = history.location.pathname.split('/');
    const { name } = getLocalStorage('user', { name: 'Matheus' });
    const ROLETYPE = getOrderType(actualRoute[1]);

    //  data-test-ids
    const ROUTE = 'customer_products';
    const PRODUCTS = 'element-navbar-link-products';
    const ORDERS = 'element-navbar-link-orders';
    const LOGOUT = 'element-navbar-link-logout';
    const FULLNAME = 'element-navbar-user-full-name';
    //

    return (
      <div className="header-div">
        <div className="main-btns-div">
          {
            actualRoute[1] === 'customer' && (
              <button
                className="header-btn"
                type="button"
                disabled={ actualRoute[2] === 'products' }
                onClick={ () => history.push(`/${actualRoute[1]}/products`) }
                data-testid={ `${ROUTE}__${PRODUCTS}` }
              >
                Produtos
              </button>

            )
          }
          <button
            className="header-btn"
            type="button"
            disabled={ history.location.pathname === `/${actualRoute[1]}/orders`
            || actualRoute[1] === 'admin' }
            onClick={ () => history.push(`/${actualRoute[1]}/orders`) }
            data-testid={ `${ROUTE}__${ORDERS}` }
          >
            { ROLETYPE }
          </button>
        </div>
        <div className="logout-name-div">
          <div className="username-div">
            <span
              data-testid={ `${ROUTE}__${FULLNAME}` }
            >
              { name }
            </span>
          </div>

          <button
            className="logout-btn"
            type="button"
            data-testid={ `${ROUTE}__${LOGOUT}` }
            onClick={ () => logout(history) }
          >
            Sair
          </button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Header;
