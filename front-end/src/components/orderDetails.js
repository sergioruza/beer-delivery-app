import React, { Component } from 'react';
// import { AppConsumer } from '../context/appContext';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';

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
    const COSTUMER = 'customer_checkout__';
    const ELEMENTORDER = 'element-order';
    const { carProducts } = this.state;
    const total = carProducts.map(({ price, quantity }) => price * quantity)
      .reduce((acc, value) => {
        acc += value;
        return acc;
      }, 0);
    console.log(total);
    return (
      <div>
        <table>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
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
