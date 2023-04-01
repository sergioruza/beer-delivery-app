import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { OrderDetails, Header } from '../components';
import { getSalesByUserId } from '../services/requests';
import getLocalStorage from '../services/getLocalStorage';

export default class Order extends Component {
  state = {
    order: {},
  };

  async componentDidMount() {
    const { history } = this.props;
    const type = history.location.pathname.split('/')[3];
    const userId = getLocalStorage('user', { id: 3 }).id;
    const newOrders = await getSalesByUserId(userId);
    const order = newOrders.find((o) => o.id === Number(type));
    console.log(order);
    this.setState({ order });
  }

  render() {
    const { history } = this.props;
    const { order } = this.state;
    const ROUTE = 'customer_order_details__';
    const formatedDate = new Date(order.saleDate).toLocaleDateString('pt-BR');
    const ELEMENT_DETAILS = 'element-order-details-label-';
    return (
      <div>
        <Header history={ history } />
        <div>
          <div>
            <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}order-id` }>
              {order.id}
            </span>
            <div>
              P. Vend:
              <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}seller-name` }>
                {order.sellerName}
              </span>
            </div>
            <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}order-date` }>
              { formatedDate }
            </span>
            <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}delivery-status` }>
              {order.status}
            </span>
            <button
              type="button"
              disabled={ order.status !== 'Em Trânsito' }
              data-testid={ `${ROUTE}button-delivery-check` }
            >
              {order.status !== 'Entregue' ? 'Marcar como entregue' : 'Ja foi entregue'}
            </button>
          </div>
        </div>
        <OrderDetails
          orderProducts={ order.products }
          totalOrder={ order.totalPrice }
          history={ history }
        />
      </div>
    );
  }
}

Order.propTypes = {
  history: PropTypes.shape.isRequired,
};
