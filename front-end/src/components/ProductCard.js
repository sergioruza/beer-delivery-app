import PropTypes from 'prop-types';
import React from 'react';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';

class ProductCard extends React.Component {
  state = {
    counter: 0,
  };

  componentDidUpdate() {
    const { price, img, title, id } = this.props;
    const { counter } = this.state;
    const newProduct = { price, img, title, id, quantity: counter };

    const carProducts = getLocalStorage('carProducts', []);
    const index = carProducts.findIndex((p) => p.id === id);

    if (counter === 0) { // se o quantity for 0 ele remove
      const newProducts = carProducts.filter((p) => p.id !== id);
      setLocalStorage('carProducts', newProducts);
    }

    const MENOS_UM = -1; // se nao existir retona -1
    if (index === MENOS_UM) {
      carProducts.push(newProduct);
    } else { // se ja existir ele atualiza o quantity
      carProducts[index] = newProduct;
    }

    if (counter > 0) {
      setLocalStorage('carProducts', carProducts);
    }
  }

  increment = () => {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  };

  decrement = () => {
    const { counter } = this.state;
    if (counter <= 0) {
      return this.setState({ counter: 0 });
    }
    this.setState({ counter: counter - 1 });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    return this.setState({ [name]: Number(value) });
  };

  render() {
    const { counter } = this.state;
    const { price, img, title, id } = this.props;
    const ROUTE = 'customer_products';
    return (
      <div>
        <span
          data-testid={ `${ROUTE}__element-card-price-${id}` }
        >
          {Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
        <img
          width={ 200 }
          data-testid={ `${ROUTE}__img-card-bg-image-${id}` }
          src={ img }
          alt={ `${title}-img` }
        />
        <span data-testid={ `${ROUTE}__element-card-title-${id}` }>{title}</span>
        <div>
          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ this.decrement }
            type="button"
          >
            -
          </button>

          <input
            name="counter"
            onChange={ this.handleChange }
            min="0"
            type="number"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ counter }
          />

          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ this.increment }
            type="button"
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductCard;
