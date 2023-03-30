import React, { Component } from 'react';
import { Header, OrderDetails } from '../components';

export default class Checkout extends Component {
  render() {
    return (
      <div>
        <Header />
        <section>
          <h3>Finalizar Pedido</h3>
          <OrderDetails />
        </section>
        <section>
          <h3>Detalhes e Endereço para Entrega</h3>
          <div>
            <div>
              <span>P.Vendedora Responsável</span>
              <select data-testid="customer_checkout__select-seller">
                {/* aqui vai um array de options */}
              </select>
            </div>
            <div>
              <span>Endereço</span>
              <input
                type="text"
                name="endereco"
                data-testid="customer_checkout__input-address"
              />
            </div>
            <div>
              <span>Número</span>
              <input
                type="text"
                name="numero"
                data-testid="customer_checkout__input-address-number"
              />
            </div>
          </div>
          <button
            type="submit"
            name="finishOrder"
            data-testid="customer_checkout__button-submit-order"
          >
            FINALIZAR PEDIDO
          </button>
        </section>
      </div>
    );
  }
}
