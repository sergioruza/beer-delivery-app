import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CardOrder extends Component {
  render() {
    const customer = 'customer_';
    const order = 'orders__element-';
    const { idOrder, status, date, totalValue } = this.props;
    return (
      <div>
        <div>
          <p>Pedido</p>
          <p data-testid={ `${customer}${order}order-id-${idOrder}` }>{ idOrder }</p>
        </div>
        <Link
          to={ `/customer/order/${idOrder}` }
          data-testid={ `${customer}${order}delivery-status-${idOrder}` }
        >
          { status }
        </Link>
        <div>
          <p data-testid={ `${customer}${order}order-date-${idOrder}` }>{ date }</p>
          <p data-testid={ `${customer}${order}card-price-${idOrder}` }>{ totalValue }</p>
        </div>
      </div>
    );
  }
}

CardOrder.propTypes = {
  date: PropTypes.shape.isRequired,
  idOrder: PropTypes.shape.isRequired,
  status: PropTypes.shape.isRequired,
  totalValue: PropTypes.shape.isRequired,
};
