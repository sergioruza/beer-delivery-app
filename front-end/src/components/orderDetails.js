import React, { Component } from 'react';
// import { AppConsumer } from '../context/appContext';
import propTypes from 'prop-types';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';
import getTotalPrice from '../utils/getTotalPrice';

export default class OrderDetails extends Component {
  state = {
    carProducts: [],
  };

  componentDidMount() {
    const getstorage = getLocalStorage('carrinho', []);
    this.setState({ carProducts: getstorage });
  }

  removeItem(id) { // se o quantity for 0 ele remove
    const carProducts = getLocalStorage('carrinho', []);
    const newProducts = carProducts.filter((p) => p.id !== id);
    setLocalStorage('carrinho', newProducts);
    this.setState({ carProducts: newProducts });
  }

  render() {
    const { history } = this.props;
    const type = history.location.pathname;
    const COSTUMER = 'customer_checkout__';
    const ELEMENTORDER = 'element-order';
    const { carProducts } = this.state;
    const total = getTotalPrice();
    return (
      <div>
        <table>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {type === '/customer/checkout' && (
              <th>Remover Item</th>
            )}
          </tr>
          {carProducts?.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `${COSTUMER}${ELEMENTORDER}-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `${COSTUMER}${ELEMENTORDER}-table-name-${index}`
                }
              >
                {product.title}
              </td>
              <td
                data-testid={
                  `${COSTUMER}${ELEMENTORDER}-table-quantity-${index}`
                }
              >
                {product.quantity}
              </td>
              <td
                data-testid={
                  `${COSTUMER}${ELEMENTORDER}-table-unit-price-${index}`
                }
              >
                {Number(product.price)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td
                data-testid={
                  `${COSTUMER}${ELEMENTORDER}-table-sub-total-${index}`
                }
              >
                {Number(product.price * product.quantity)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              {type === '/customer/checkout' && (

                <td
                  data-testid={
                    `${COSTUMER}${ELEMENTORDER}-table-remove-${index}`
                  }
                >
                  <button
                    type="button"
                    onClick={ () => this.removeItem(product.id) }
                  >
                    Remover
                  </button>
                </td>
              )}
            </tr>
          ))}
        </table>
        <div>
          Total: R$
          <span data-testid={ `${COSTUMER}${ELEMENTORDER}-total-price` }>
            {Number(total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

      </div>
    );
  }
}

OrderDetails.propTypes = {
  history: propTypes.shape.isRequired,
};
