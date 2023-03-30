import PropTypes from 'prop-types';
import React from 'react';
import getLocalStorage from '../services/getLocalStorage';
import setLocalStorage from '../services/setLocalStorage';

class ProductCard extends React.Component {
  state = {
    counter: 0,
    carValue: 0,
  };

  updateCar = () => {
    const { price, img, title, id } = this.props;
    const { counter } = this.state;
    const newProduct = { price, img, title, id, quantity: counter };

    const carProducts = getLocalStorage('carrinho', []);
    const index = carProducts.findIndex((p) => p.id === id);

    if (counter === 0) { // se o quantity for 0 ele remove
      const newProducts = carProducts.filter((p) => p.id !== id);
      setLocalStorage('carrinho', newProducts);
    }

    const MENOS_UM = -1; // se nao existir retona -1
    if (index === MENOS_UM) {
      carProducts.push(newProduct);
    } else { // se ja existir ele atualiza o quantity
      carProducts[index] = newProduct;
    }

    if (counter > 0) {
      setLocalStorage('carrinho', carProducts);
    }

    this.sumProducts();
  };

  increment = () => {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 }, () => this.updateCar());
  };

  decrement = () => {
    const { counter } = this.state;
    if (counter <= 0) {
      return this.setState({ counter: 0 }, () => this.updateCar());
    }
    this.setState({ counter: counter - 1 }, () => this.updateCar());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.sumProducts();
    return this.setState({ [name]: Number(value) }, () => this.updateCar());
  };

  sumProducts = () => {
    const { setCarValue } = this.props;
    console.log(setCarValue);
    const products = getLocalStorage('carrinho', []);
    const valuesSum = products.map((e) => e.price * e.quantity);
    const total = valuesSum.reduce((cur, acc) => acc + cur, 0);
    setCarValue(total.toFixed(2));
  };

  render() {
    const { counter, carValue } = this.state;
    console.log(carValue);
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
  setCarValue: PropTypes.func.isRequired,
};

export default ProductCard;
