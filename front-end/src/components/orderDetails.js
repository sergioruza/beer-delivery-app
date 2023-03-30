import React, { Component } from 'react';
import { AppConsumer } from '../context/appContext';

export default class OrderDetails extends Component {
  render() {
    const COSTUMER = 'customer_checkout__';
    const ELEMENTORDER = 'element-order';
    return (
      <AppConsumer>
        {({ listProducts }) => (
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
              {listProducts?.map((product, index) => (
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
                    {product.name}
                  </td>
                  <td
                    data-test-id={
                      `${COSTUMER}${ELEMENTORDER}-table-item-quantity-${index + 1}`
                    }
                  >
                    0
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
                    sub total aqui
                  </td>
                  <td
                    data-test-id={
                      `${COSTUMER}${ELEMENTORDER}-table-remove-${index + 1}`
                    }
                  >
                    <button type="button">Remover</button>
                  </td>
                </tr>
              ))}
            </table>
            <p>Total: R$ N.n</p>
          </div>
        )}
      </AppConsumer>
    );
  }
}
