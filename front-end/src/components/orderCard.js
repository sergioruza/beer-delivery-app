import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default class SaleCard extends React.Component {
  render() {
    const { details, history } = this.props;
    const { id, status, saleDate, totalPrice, deliveryAddress } = details;

    const userType = history.location.pathname.split('/')[1];
    const href = `/${userType}/orders/${id}`;
    const formatedDate = new Date(saleDate).toLocaleDateString('pt-BR');

    const ROUTE = `${userType}_orders__element-`;
    const FOUR = 4;
    return (
      <div>
        <Link to={ href }>
          <div>
            Pedido:
            <span data-testid={ `${ROUTE}order-id-${id}` }>
              {id.toString().padStart(FOUR, '0')}
            </span>
          </div>
          <span data-testid={ `${ROUTE}delivery-status-${id}` }>
            {status}
          </span>
          <div>
            <span data-testid={ `${ROUTE}order-date-${id}` }>
              {formatedDate}
            </span>
          </div>
          <div>
            R$:
            <span data-testid={ `${ROUTE}card-price-${id}` }>
              {Number(totalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          {
            userType === 'seller' && (
              <span data-testid={ `${ROUTE}card-address-${id}` }>
                {deliveryAddress}
              </span>
            )
          }
        </Link>
      </div>
    );
  }
}

SaleCard.propTypes = {
  history: PropTypes.shape.isRequired,
  details: PropTypes.shape.isRequired,
};
