import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, OrderDetails } from '../components';
import { createSale } from '../services/requests';
import getLocalStorage from '../services/getLocalStorage';
import getTotalPrice from '../utils/getTotalPrice';

export default class Checkout extends Component {
  state = {
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    sellerName: 'Fulana Pereira',
  };

  componentDidMount() {
    const carProducts = getLocalStorage('carrinho', []);
    this.setState({ totalPrice: getTotalPrice(carProducts) });
  }

  createNewSale = async () => {
    const user = getLocalStorage('user', { name: 'romulo' });
    const products = getLocalStorage('carrinho', []);
    const { history } = this.props;
    const saleDetails = {
      ...this.state,
      user,
      products,
    };
    console.log(products);
    const sale = await createSale(saleDetails);
    console.log(sale);

    history.push(`/customer/orders/${sale.id}`);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { history } = this.props;
    const { deliveryAddress, deliveryNumber, sellerName } = this.state;
    return (
      <div>
        <Header history={ history } />
        <section>
          <h3>Finalizar Pedido</h3>
          <OrderDetails history={ history } />
        </section>
        <section>
          <h3>Detalhes e Endereço para Entrega</h3>
          <div>
            <span>P.Vendedora Responsável</span>
            <select
              name="sellerName"
              value={ sellerName }
              onClick={ this.handleChange }
              data-testid="customer_checkout__select-seller"
            >
              <option value="Fulana Pereira">Fulana Pereira</option>
              {/* falta fazer require de sellers */}
            </select>
            <div>
              <span>Endereço</span>
              <input
                type="text"
                name="deliveryAddress"
                value={ deliveryAddress }
                onChange={ this.handleChange }
                data-testid="customer_checkout__input-address"
              />
            </div>
            <div>
              <span>Número</span>
              <input
                type="text"
                name="deliveryNumber"
                value={ deliveryNumber }
                onChange={ this.handleChange }
                data-testid="customer_checkout__input-address-number"
              />
            </div>
          </div>
          <button
            type="submit"
            name="finishOrder"
            onClick={ this.createNewSale }
            data-testid="customer_checkout__button-submit-order"
          >
            FINALIZAR PEDIDO
          </button>
        </section>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape.isRequired,
};
