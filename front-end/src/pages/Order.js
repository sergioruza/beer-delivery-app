import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { OrderDetails, Header } from '../components';
import { getSalesByUserId } from '../services/requests';
import getLocalStorage from '../services/getLocalStorage';

const LASTITEM = 1;
const emTransito = 'Em Trânsito';
export default class Order extends Component {
  state = {
    order: {},
    renderDetails: false,
    userType: '',
    status: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const pathName = history.location.pathname.split('/');
    const userId = getLocalStorage('user', { id: 3 }).id;
    const newOrders = await getSalesByUserId(userId);
    const order = newOrders.find((o) => o.id === Number(pathName.at(-LASTITEM)));
    this.setState({ order, renderDetails: true, userType: pathName.at(1), status: order.status });
  }

  render() {
    const { history } = this.props;
    const { order, renderDetails, userType, status } = this.state;
    console.log(userType);
    const ROUTE = `${userType}_order_details__`;
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
            {userType === 'customer' && (
              <div>
                P. Vend:
                <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}seller-name` }>
                  {order.sellerName}
                </span>
              </div>
            )}
            <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}order-date` }>
              {formatedDate}
            </span>
            <span data-testid={ `${ROUTE}${ELEMENT_DETAILS}delivery-status` }>
              { status}
            </span>
            {userType === 'customer' && (

              <button
                type="button"
                disabled={ status !== emTransito }
                data-testid={ `${ROUTE}button-delivery-check` }
              >
                {status !== 'Entregue' ? 'Marcar como entregue' : 'Ja foi entregue'}
              </button>
            )}
            {userType === 'seller' && (
              <div>
                <button
                  type="button"
                  onClick={ () => this.setState({ status: 'Preparando' }) }
                  data-testid="seller_order_details__button-preparing-check"
                  disabled={ status !== 'Pendente' }
                >
                  PREPARAR PEDIDO
                </button>

                <button
                  type="button"
                  onClick={ () => this.setState({ status: emTransito }) }
                  data-testid="seller_order_details__button-dispatch-check"
                  disabled={ status !== 'Preparando' }
                >
                  SAIU PARA ENTREGA
                </button>
              </div>
            )}
          </div>
        </div>
        {
          renderDetails && <OrderDetails
            orderProducts={ order.products }
            totalOrder={ order.totalPrice }
            history={ history }
          />
        }

      </div>
    );
  }
}

Order.propTypes = {
  history: PropTypes.shape.isRequired,
};
