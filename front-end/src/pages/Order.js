import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { OrderDetails, Header } from '../components';

const mock = {
  saleDate: '2023-03-31T21:27:01.493Z',
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 12.2,
  deliveryAddress: 'rua sla doq',
  deliveryNumber: '240',
  status: 'Pendente',
};

export default class Order extends Component {
  render() {
    const { history } = this.props;
    const ROUTE = 'customer_order_details__';
    const formatedDate = new Date(mock.saleDate).toLocaleDateString('pt-BR');
    const ELEMENT_DETAILS = 'element-order-details-label';
    return (
      <div>
        <Header history={ history } />
        <section>
          <div>
            <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}order-id=${mock.id}` }>
              {mock.id}
            </span>
            <div>
              P. Vend:
              <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}seller-name-${mock.id}` }>
                {mock.sellerId}
              </span>
            </div>
            <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}order-date-${mock.id}` }>
              { formatedDate }
            </span>
            <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}delivery-status-${mock.id}` }>
              {mock.status}
            </span>
            <button
              type="button"
              disabled={ mock.status !== 'Em Trânsito' }
              data-testid={ `${ROUTE}button-delivery-check${mock.id}` }
            >
              {mock.status !== 'Entregue' ? 'Marcar como entregue' : 'Ja foi entregue'}
            </button>
          </div>
          <OrderDetails history={ history } />
        </section>
      </div>
    );
  }
}

Order.propTypes = {
  history: PropTypes.shape.isRequired,
};
