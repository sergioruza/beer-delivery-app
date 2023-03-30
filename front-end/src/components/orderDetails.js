import React, { Component } from 'react';
import { AppConsumer } from '../context/appContext';

export default class OrderDetails extends Component {
  render() {
    return (
      <AppConsumer>
        {(props) => (

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
              {props?.data.map((product, index) => (
                <tr key={ index }>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>0</td>
                  <td>{product.price}</td>
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
