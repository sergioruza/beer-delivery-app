import React, { Component } from 'react';
// import { AppConsumer } from '../context/appContext';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';

export default class OrderDetails extends Component {
  state = {
    carProducts: [],
  };

  componentDidMount() {
    const getstorage = getLocalStorage('carProducts', []);
    this.setState({ carProducts: getstorage });
  }

  removeItem(id) { // se o quantity for 0 ele remove
    const carProducts = getLocalStorage('carProducts', []);
    const newProducts = carProducts.filter((p) => p.id !== id);
    setLocalStorage('carProducts', newProducts);
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
                data-test-id={
                  `${COSTUMER}${ELEMENTORDER}-table-item-number-${index + 1}`
                }
              >
                {index + 1}
              </td>
              <td
                data-test-id={
                  `${COSTUMER}${ELEMENTORDER}-table-name-${index + 1}`
                }
              >
                {product.title}
              </td>
              <td
                data-test-id={
                  `${COSTUMER}${ELEMENTORDER}-table-item-quantity-${index + 1}`
                }
              >
                {product.quantity}
              </td>
              <td
                data-test-id={
                  `${COSTUMER}${ELEMENTORDER}-table-unit-price-${index + 1}`
                }
              >
                {product.price}
              </td>
              <td
                data-test-id={
                  `${COSTUMER}${ELEMENTORDER}-table-sub-total-${index + 1}`
                }
              >
                {(product.price * product.quantity).toFixed(2)}
              </td>
              <td
                data-test-id={
                  `${COSTUMER}${ELEMENTORDER}-table-remove-${index + 1}`
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
        <p>
          Total: R$
          {total.toFixed(2)}
        </p>
      </div>
    );
  }
}
