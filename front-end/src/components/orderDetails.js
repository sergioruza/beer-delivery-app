import PropTypes from 'prop-types';
import React from 'react';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';
import getTotalPrice from '../utils/getTotalPrice';

export default class OrderDetails extends React.Component {
  state = {
    carProducts: [],
    total: '',
  };

  componentDidMount() {
    const { orderProducts, totalOrder } = this.props;
    const newOrderProducts = orderProducts || getLocalStorage('carrinho', []);
    const total = totalOrder || getTotalPrice();
    this.setState({ carProducts: newOrderProducts, total });
  }

  removeItem(id) { // se o quantity for 0 ele remove
    const carProducts = getLocalStorage('carrinho', []);
    const newProducts = carProducts.filter((p) => p.id !== id);
    setLocalStorage('carrinho', newProducts);
    const total = getTotalPrice();
    this.setState({ carProducts: newProducts, total });
  }

  render() {
    const { history } = this.props;
    const { carProducts, total } = this.state;

    const pathName = history.location.pathname.split('/');

    //  faz o data-testid ficar dinamico
    const COSTUMER = pathName[2] === 'checkout'
      ? `${pathName[1]}_checkout__`
      : `${pathName[1]}_order_details__`;

    const ELEMENTORDER = 'element-order';

    const customerCheckoutPath = pathName[1] === 'customer' && pathName[2] === 'checkout';

    return (
      <div>
        <table>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {customerCheckoutPath && <th>Remover Item</th>}
          </tr>
          {carProducts?.map((product, index) => (
            <tr key={ index }>
              <td data-testid={ `${COSTUMER}${ELEMENTORDER}-table-item-number-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${COSTUMER}${ELEMENTORDER}-table-name-${index}` }>
                {product.title}
              </td>
              <td data-testid={ `${COSTUMER}${ELEMENTORDER}-table-quantity-${index}` }>
                {product.quantity}
              </td>
              <td data-testid={ `${COSTUMER}${ELEMENTORDER}-table-unit-price-${index}` }>
                {(+product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td data-testid={ `${COSTUMER}${ELEMENTORDER}-table-sub-total-${index}` }>
                {(+(product.price * product.quantity))
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              {customerCheckoutPath && (
                <td data-testid={ `${COSTUMER}${ELEMENTORDER}-table-remove-${index}` }>
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
            {(+total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

      </div>
    );
  }
}

OrderDetails.propTypes = {
  history: PropTypes.shape.isRequired,
  orderProducts: PropTypes.shape.isRequired,
  totalOrder: PropTypes.shape.isRequired,
};
