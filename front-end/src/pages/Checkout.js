import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, OrderDetails } from '../components';
import { createSale } from '../services/requests';
import getLocalStorage from '../services/getLocalStorage';
import { AppConsumer } from '../context/appContext';
import getTotalPrice from '../utils/getTotalPrice';

export default class Checkout extends Component {
  state = {
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    sellerName: 'Fulana Pereira',
  };

  componentDidMount() {
    this.setState({ totalPrice: getTotalPrice() });
  }

  createNewSale = async (setCarValue) => {
    const { history } = this.props;

    const user = getLocalStorage('user', { name: 'romulo' });
    const products = getLocalStorage('carrinho', []);

    const saleBody = { ...this.state, user, products };

    const sale = await createSale(saleBody);

    localStorage.removeItem('carrinho');
    setCarValue(getTotalPrice().toFixed(2));

    history.push(`/customer/orders/${sale.id}`);
  };

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  render() {
    const { history } = this.props;
    const { deliveryAddress, deliveryNumber, sellerName } = this.state;

    return (
      <AppConsumer>
        {({ setCarValue }) => (
          <div>
            <Header history={ history } />
            <section>
              <h3>Finalizar Pedido</h3>
              <OrderDetails setCarValue={ setCarValue } history={ history } />
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
                onClick={ () => this.createNewSale(setCarValue) }
                data-testid="customer_checkout__button-submit-order"
              >
                FINALIZAR PEDIDO
              </button>
            </section>
          </div>
        )}
      </AppConsumer>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape.isRequired,
};
